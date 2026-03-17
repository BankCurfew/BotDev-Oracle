# Oracle v2: Complete Architecture Analysis

**Date**: 2026-03-17
**Version**: 0.4.0-nightly
**Status**: Analyzed from origin source code
**Project**: github.com/Soul-Brews-Studio/oracle-v2

---

## Executive Summary

Oracle v2 is a **knowledge management and semantic search MCP server** built with Bun, SQLite, ChromaDB, and Drizzle ORM. It implements "Nothing is Deleted" philosophy by preserving all knowledge transformations through traced discovery sessions, threaded discussions, and pattern learning. The system operates as both an HTTP API and MCP tools for Claude integration.

**Core Architecture**: 3-layer stack
1. **Data Layer**: SQLite (Drizzle ORM) + ChromaDB vectors + Markdown source files
2. **Tool Layer**: 22 MCP tools for search, learning, tracing, forum discussions, and schedule management
3. **API Layer**: Hono HTTP server + MCP stdio server

---

## Directory Structure

```
src/
├── index.ts                 # MCP server entry (stdio protocol)
├── server.ts               # HTTP API server (Hono.js)
├── indexer.ts              # Knowledge indexer (ψ/memory → DB + vectors)
├── types.ts                # Global type definitions
├── config.ts               # Configuration (ports, paths, env vars)
│
├── db/                      # Database layer (Drizzle ORM)
│   ├── index.ts            # Database client factory + helpers
│   ├── schema.ts           # Drizzle table definitions (13 tables)
│   └── migrations/         # Schema migration history
│
├── tools/                   # MCP tool handlers (22 tools)
│   ├── search.ts           # oracle_search (hybrid FTS5 + vector)
│   ├── learn.ts            # oracle_learn (add patterns to KB)
│   ├── reflect.ts          # oracle_reflect (random wisdom)
│   ├── list.ts             # oracle_list (browse documents)
│   ├── stats.ts            # oracle_stats (DB statistics)
│   ├── concepts.ts         # oracle_concepts (concept tags)
│   ├── read.ts             # oracle_read (fetch file content)
│   ├── verify.ts           # oracle_verify (integrity check)
│   ├── trace.ts            # oracle_trace* (6 trace tools)
│   ├── forum.ts            # oracle_thread* (4 forum tools)
│   ├── schedule.ts         # oracle_schedule* (2 schedule tools)
│   ├── supersede.ts        # oracle_supersede (mark outdated docs)
│   ├── handoff.ts          # oracle_handoff (session context save)
│   ├── inbox.ts            # oracle_inbox (pending messages)
│   └── types.ts            # Tool input/output types
│
├── trace/                   # Trace system (discovery logging)
│   ├── handler.ts          # Trace CRUD operations
│   ├── types.ts            # Trace data structures
│   └── (database-agnostic, uses Drizzle)
│
├── forum/                   # Forum system (threaded Q&A)
│   ├── handler.ts          # Thread + message operations
│   ├── types.ts            # Forum data structures
│   └── (database-agnostic, uses Drizzle)
│
├── vector/                  # Vector store layer (pluggable)
│   ├── factory.ts          # VectorStoreAdapter factory
│   ├── types.ts            # Vector store interface
│   ├── embeddings.ts       # Embedding provider factory
│   └── adapters/
│       ├── chroma-mcp.ts   # ChromaMCP client
│       ├── sqlite-vec.ts   # sqlite-vec adapter
│       ├── lancedb.ts      # LanceDB adapter
│       ├── qdrant.ts       # Qdrant adapter
│       └── cloudflare-vectorize.ts
│
├── vault/                   # Vault system (global knowledge sync)
│   ├── cli.ts              # CLI entry point
│   ├── handler.ts          # Vault operations
│   └── (local symlink to external vault repo)
│
├── server/                  # HTTP server modules
│   ├── handlers.ts         # API endpoint handlers
│   ├── dashboard.ts        # Dashboard endpoints
│   ├── logging.ts          # Request logging
│   ├── context.ts          # Project context detection
│   ├── project-detect.ts   # ghq-style project detection
│   └── __tests__/
│
├── cli/                     # CLI utilities
├── integration/            # Integration with external systems
├── process-manager/        # Process management (graceful shutdown)
├── scripts/                # Utility scripts
└── chroma-mcp.ts           # ChromaDB MCP client (python bridge)
```

---

## 1. Database Schema (SQLite + FTS5 + Drizzle ORM)

### 1.1 Core Tables

#### `oracle_documents` (Main Index)
Metadata index for all indexed knowledge:
```typescript
{
  id: string (primary key)
  type: 'principle' | 'learning' | 'retro'
  sourceFile: string
  concepts: JSON array of concept tags
  createdAt: integer (timestamp)
  updatedAt: integer
  indexedAt: integer

  // "Nothing is Deleted" - supersede pattern
  supersededBy?: string (ID of newer doc)
  supersededAt?: integer
  supersededReason?: string

  // Provenance tracking
  origin?: 'mother' | 'arthur' | 'volt' | 'human'
  project?: string (ghq format: github.com/owner/repo)
  createdBy?: 'indexer' | 'oracle_learn' | 'manual'
}
```

**Indexes**: source_file, type, superseded_by, origin, project

#### `oracle_fts` (Full-Text Search - Virtual Table)
```sql
CREATE VIRTUAL TABLE oracle_fts USING fts5(
  id UNINDEXED,
  content,
  concepts
)
```
- Managed via raw SQL (Drizzle doesn't support FTS5 natively)
- Content is markdown text for keyword search
- Concepts are space-separated tags

---

### 1.2 Logging & Tracking Tables

#### `search_log`
Records every search query for analytics:
```typescript
{
  id: integer (auto-increment)
  query: string
  type: string (filter type used)
  mode: string ('hybrid', 'fts', 'vector')
  resultsCount: integer
  searchTimeMs: integer
  createdAt: integer
  project?: string
  results: JSON (top 5 results snapshot)
}
```

#### `learn_log`
Tracks pattern creation:
```typescript
{
  id: integer
  documentId: string (oracle_documents.id)
  patternPreview: string
  source: string
  concepts: JSON array
  createdAt: integer
  project?: string
}
```

#### `document_access`
Tracks which documents were referenced:
```typescript
{
  id: integer
  documentId: string
  accessType: string ('search', 'read', 'consult')
  createdAt: integer
  project?: string
}
```

---

### 1.3 Forum System

#### `forum_threads`
Threaded Q&A conversations:
```typescript
{
  id: integer (primary key)
  title: string
  createdBy: string (default: 'human')
  status: 'active' | 'answered' | 'pending' | 'closed'
  issueUrl?: string (GitHub mirror)
  issueNumber?: integer
  project?: string
  createdAt: integer
  updatedAt: integer
  syncedAt?: integer
}
```

#### `forum_messages`
Individual messages in threads:
```typescript
{
  id: integer
  threadId: integer (FK to forum_threads)
  role: 'human' | 'oracle' | 'claude'
  content: string (markdown)
  author?: string (GitHub username)
  principlesFound?: integer (from search)
  patternsFound?: integer (from search)
  searchQuery?: string
  commentId?: integer (GitHub comment ID if synced)
  createdAt: integer
}
```

**Use Case**: Oracle learns from human questions; questions logged if unanswered.

---

### 1.4 Trace System

#### `trace_log`
Capture discovery sessions ("dig deeper into X") with actionable dig points:
```typescript
{
  id: integer
  traceId: string (UUID) UNIQUE
  query: string (what was traced)
  queryType: 'general' | 'project' | 'pattern' | 'evolution'

  // Dig Points (JSON arrays)
  foundFiles: [{ path, type, matchReason, confidence: 'high'|'medium'|'low' }]
  foundCommits: [{ hash, shortHash, date, message }]
  foundIssues: [{ number, title, state, url }]
  foundRetrospectives: [paths]
  foundLearnings: [paths]
  foundResonance: [paths]

  // Counts
  fileCount: integer
  commitCount: integer
  issueCount: integer

  // Recursion (vertical: parent/child traces)
  depth: integer (0 = initial, 1+ = dig from parent)
  parentTraceId?: string
  childTraceIds: JSON array

  // Linked list (horizontal: chain of related traces)
  prevTraceId?: string
  nextTraceId?: string

  // Context
  project?: string
  scope: 'project' | 'cross-project' | 'human'
  sessionId?: string (Claude session ID)
  agentCount: integer
  durationMs: integer

  // Distillation (convert trace → learning)
  status: 'raw' | 'reviewed' | 'distilling' | 'distilled'
  awakening?: string (extracted insight in markdown)
  distilledToId?: string (learning ID if promoted)
  distilledAt?: integer

  createdAt: integer
  updatedAt: integer
}
```

**Philosophy**: Every discovery is preserved, never deleted. Traces can be linked horizontally (sequence of discoveries) and vertically (recursive digs). Status tracks distillation progress.

---

### 1.5 Supersede Log (Audit Trail)

#### `supersede_log`
Explicit audit trail for document supersessions:
```typescript
{
  id: integer

  // What was superseded
  oldPath: string
  oldId?: string (may not exist in index)
  oldTitle?: string
  oldType?: 'learning' | 'principle' | 'retro'

  // What replaced it
  newPath?: string
  newId?: string
  newTitle?: string

  // Why and when
  reason: string ('duplicate', 'outdated', 'merged', etc.)
  supersededAt: integer
  supersededBy: string ('user', 'claude', 'indexer')

  project?: string

  Indexes: old_path, new_path, superseded_at, project
}
```

**Purpose**: Preserves history of document changes even if originals are deleted.

---

### 1.6 Utility Tables

#### `schedule` (Per-Human, Shared Across Oracles)
```typescript
{
  id: integer
  date: string (YYYY-MM-DD, canonical for queries)
  dateRaw?: string (original input: "5 Mar", "28 ก.พ.")
  time?: string (HH:MM or "TBD")
  event: string (description)
  notes?: string
  recurring?: 'daily' | 'weekly' | 'monthly'
  status: 'pending' | 'done' | 'cancelled'
  createdAt: integer
  updatedAt: integer
}
```

#### `settings` (Key-Value Configuration)
```typescript
{
  key: string (primary key)
  value?: string
  updatedAt: integer
}
```

#### `indexing_status` (Progress Tracking)
```typescript
{
  id: integer (always 1 — singleton)
  isIndexing: integer (0 or 1)
  progressCurrent: integer
  progressTotal: integer
  startedAt?: integer
  completedAt?: integer
  error?: string
  repoRoot?: string
}
```

#### `activity_log` (Activity Tracking)
```typescript
{
  id: integer
  date: string (YYYY-MM-DD)
  timestamp: string (ISO)
  type: string ('file_created', 'file_modified', etc.)
  path?: string
  sizeBytes?: integer
  project?: string
  metadata?: JSON
  createdAt: string
}
```

---

## 2. Knowledge Indexing Pipeline

### 2.1 Indexer Architecture

**File**: `src/indexer.ts`

The `OracleIndexer` class orchestrates:

1. **Source Discovery**: Scans `ψ/memory/` directories
   - `ψ/memory/resonance/` → principles (identity, values)
   - `ψ/memory/learnings/` → patterns discovered
   - `ψ/memory/retrospectives/` → session retrospectives

2. **Vault-First Pattern**:
   - Scans local `ψ/memory/` (project-scoped)
   - Also scans `github.com/org/repo/ψ/memory/` (project-first vault)
   - Deduplicates by content hash

3. **Granular Document Creation**:
   - Resonance: Split by `###` headers + bullet points
   - Learnings: Split by `##` headers
   - Retrospectives: Split by `##` headers
   - Each chunk becomes a separate vector embedding

4. **Dual Storage**:
   - SQLite: Metadata index (`oracle_documents` + `oracle_fts`)
   - ChromaDB: Vector embeddings (via MCP) for semantic search

### 2.2 Indexing Flow

```
Markdown Files
      ↓
[Content Read & Parse]
      ↓
[Extract Frontmatter: concepts, project, tags]
      ↓
[Split by Headers/Bullets]
      ↓
[Content Deduplication]
      ↓
┌─────────────────────┐
│ SQLite              │  ChromaDB (Vector Store)
│ oracle_documents ──→├→ Embeddings
│ oracle_fts       ──→├→ Collections by model
└─────────────────────┘
      ↓
[Index Status: complete]
```

### 2.3 Provenance Tracking

Each indexed document carries:
- **Project**: ghq-style path (github.com/owner/repo)
- **Origin**: source oracle or system
- **CreatedBy**: how it was indexed (indexer, oracle_learn, manual)
- **Concepts**: topic tags from frontmatter

---

## 3. The 22 MCP Tools

All tools are defined in `src/tools/` and exposed via MCP protocol.

### 3.1 Search & Discovery (3 tools)

#### 1. `oracle_search`
**Description**: Hybrid keyword + semantic search
**File**: `src/tools/search.ts`

**Algorithm**:
1. Sanitize FTS5 query (remove special chars)
2. Run parallel FTS5 + vector search
3. Normalize scores:
   - FTS5: `e^(-0.3 * |rank|)` (exponential decay)
   - Vector: `1 - distance` (similarity)
4. Merge results, deduplicate by ID
5. Hybrid scoring: 50% FTS + 50% vector + 10% boost if in both

**Input**:
```typescript
{
  query: string (required)
  type?: 'principle' | 'learning' | 'retro' | 'all' (default)
  limit?: number (default 5)
  offset?: number (default 0)
  mode?: 'hybrid' | 'fts' | 'vector' (default 'hybrid')
  project?: string (filter by project)
  cwd?: string (auto-detect project from working directory)
  model?: 'bge-m3' | 'nomic' | 'qwen3' (embedding model)
}
```

**Output**:
```typescript
{
  results: [{
    id: string
    type: string
    content: string
    source_file: string
    concepts: string[]
    score: number
    fts_score?: number
    vector_score?: number
  }]
  metadata: {
    searchTimeMs: number
    ftsMatches: number
    vectorMatches: number
    merged: boolean
  }
}
```

**Graceful Degradation**:
- If ChromaDB unavailable → FTS5-only with warning
- Logs query to `search_log` table for analytics

#### 2. `oracle_reflect`
**Description**: Random wisdom (principle or learning)
**File**: `src/tools/reflect.ts`

Returns a random document from knowledge base. Simple query without parameters.

#### 3. `oracle_list`
**Description**: Browse documents by type
**File**: `src/tools/list.ts`

**Input**:
```typescript
{
  type?: 'principle' | 'learning' | 'retro' | 'all'
  limit?: number (default 10)
  offset?: number (for pagination)
  project?: string (filter by project)
  sort?: 'created' | 'updated' | 'random'
}
```

---

### 3.2 Learning & Knowledge Capture (5 tools)

#### 4. `oracle_learn`
**Description**: Add a new pattern to knowledge base
**File**: `src/tools/learn.ts`

**Process**:
1. Normalize project input (accepts `owner/repo`, URLs, ghq paths)
2. Create markdown file in `ψ/memory/learnings/{date}_{slug}.md`
3. Add frontmatter: title, tags, created date, source, project
4. Insert into `oracle_documents` + `oracle_fts`
5. Automataically indexed if indexer running

**Input**:
```typescript
{
  pattern: string (required, can be multi-line)
  source?: string (attribution, default "Oracle Learn")
  concepts?: string[] (concept tags)
  project?: string (normalized to github.com/owner/repo)
}
```

**Output**: Success message with file path and document ID

#### 5. `oracle_supersede`
**Description**: Mark a document as outdated
**File**: `src/tools/supersede.ts`

Implements "Nothing is Deleted" by recording supersessions:
- Sets `oracle_documents.supersededBy` = new doc ID
- Writes audit trail to `supersede_log`
- Original document remains indexed but marked obsolete

#### 6. `oracle_verify`
**Description**: Integrity check (disk files vs DB index)
**File**: `src/tools/verify.ts`

**Categories**:
- **Healthy**: In DB and on disk, timestamps match
- **Missing**: In DB but file deleted
- **Orphaned**: File exists but not in DB (untracked)
- **Drifted**: File modified after indexing
- **Untracked**: Not indexed at all

Can optionally flag orphans with `superseded_by="_verified_orphan"`.

#### 7. `oracle_stats`
**Description**: Database statistics
**File**: `src/tools/stats.ts`

Returns:
- Document counts by type
- Concept frequency
- Indexing status
- Last indexed timestamp

#### 8. `oracle_concepts`
**Description**: List all concept tags with counts
**File**: `src/tools/concepts.ts`

Tags extracted from document metadata, used for filtering and discovery.

---

### 3.3 Session & Context Management (4 tools)

#### 9. `oracle_read`
**Description**: Fetch file content
**File**: `src/tools/read.ts`

Reads markdown file content with path traversal protection using `fs.realpathSync()`.

#### 10. `oracle_handoff`
**Description**: Save session context for future sessions
**File**: `src/tools/handoff.ts`

Writes to `ψ/inbox/handoff/{timestamp}_{slug}.md` for carrying context between sessions.

#### 11. `oracle_inbox`
**Description**: List pending handoffs
**File**: `src/tools/inbox.ts`

Lists files in `ψ/inbox/handoff/` sorted by recency.

#### 12. `oracle_schedule_add` & `oracle_schedule_list`
**Description**: Appointment management
**File**: `src/tools/schedule.ts`

- **Add**: Create schedule entry with date, time, event, optional recurrence
- **List**: Query schedule by date range, filter by status or keyword

Shared across all Oracles (per-human, not per-project).

---

### 3.4 Forum System (4 tools)

#### 13-16. `oracle_thread`, `oracle_threads`, `oracle_thread_read`, `oracle_thread_update`
**File**: `src/tools/forum.ts`

Threaded Q&A system:

- **oracle_thread**: Send message in thread
  - Creates thread if needed
  - Logs message with role (human, oracle, claude)
  - Optional: runs search + logs results

- **oracle_threads**: List all threads
  - Filter by status, project
  - Returns thread summaries

- **oracle_thread_read**: Get full thread conversation
  - Returns all messages with timestamps

- **oracle_thread_update**: Change thread status
  - `active`, `answered`, `pending`, `closed`

**Use Case**: Learn from human questions; unanswered Q's logged for oracle improvement.

---

### 3.5 Trace System (6 tools)

#### 17. `oracle_trace`
**Description**: Log a discovery session
**File**: `src/tools/trace.ts`

Records "dig deeper into X" with structured dig points:
- Found files (with confidence levels)
- Commits (from git history)
- GitHub issues (linked)
- Learning files created
- Retrospectives found
- Resonance/principle references

**Input**:
```typescript
{
  query: string (required, e.g., "safety mechanisms in force push")
  queryType?: 'general' | 'project' | 'pattern' | 'evolution'
  foundFiles?: [{ path, type, matchReason, confidence }]
  foundCommits?: [{ hash, shortHash, date, message }]
  foundIssues?: [{ number, title, state, url }]
  foundLearnings?: string[] (file paths or text snippets)
  foundRetrospectives?: string[]
  scope?: 'project' | 'cross-project' | 'human'
  parentTraceId?: string (for recursive digs)
  project?: string
  agentCount?: integer
  durationMs?: integer
}
```

**Output**: Trace ID, summary of dig points found

#### 18. `oracle_trace_list`
**Description**: Browse recent traces
**File**: `src/tools/trace.ts`

Filter by query, project, status (raw/distilled), recursion depth. Paginated results.

#### 19. `oracle_trace_get`
**Description**: Get full trace details
**File**: `src/tools/trace.ts`

Returns all dig points, metadata, distillation status.

#### 20. `oracle_trace_link`
**Description**: Chain traces horizontally
**File**: `src/tools/trace.ts`

Creates `prevTraceId` ↔ `nextTraceId` links for related discoveries.

#### 21. `oracle_trace_unlink`
**Description**: Break trace chain
**File**: `src/tools/trace.ts`

Remove prev/next link in specified direction.

#### 22. `oracle_trace_chain`
**Description**: Get full linked chain
**File**: `src/tools/trace.ts`

Traverses prev/next links to show sequence of related traces.

---

## 4. Vector Store Layer (Pluggable)

**File**: `src/vector/factory.ts`

The system supports multiple vector backends via a factory pattern:

### 4.1 Supported Backends

#### 1. ChromaDB (Default)
- **Adapter**: `ChromaMcpAdapter`
- **Transport**: MCP (Python `chroma-mcp` via stdio)
- **Config**: Data dir at `~/.chromadb/`
- **Use Case**: Simple, batteries-included

#### 2. SQLite-vec
- **Adapter**: `SqliteVecAdapter`
- **Embedding**: Pluggable (Ollama, OpenAI, etc.)
- **Config**: SQLite DB at `~/.oracle/vectors.db`
- **Use Case**: Self-contained, no external services

#### 3. LanceDB
- **Adapter**: `LanceDBAdapter`
- **Embedding**: Pluggable (Ollama, OpenAI)
- **Config**: Data dir at `~/.oracle/lancedb`
- **Use Case**: Fast, Apache Arrow-based

#### 4. Qdrant
- **Adapter**: `QdrantAdapter`
- **Embedding**: Pluggable
- **Config**: HTTP endpoint (default `http://localhost:6333`)
- **Use Case**: Self-hosted vector database

#### 5. Cloudflare Vectorize
- **Adapter**: `CloudflareVectorizeAdapter`
- **Embedding**: Cloudflare AI Embeddings
- **Config**: Cloudflare credentials
- **Use Case**: Zero-egress (same platform)

### 4.2 Model-Based Registry

For advanced searches, Oracle supports multi-index with different embedding models:

```typescript
{
  'bge-m3': {
    collection: 'oracle_knowledge_bge_m3',
    model: 'bge-m3',
    dataPath: '~/.oracle/lancedb',
    // Multilingual (Thai↔EN), 1024-dim, default
  },
  'nomic': {
    collection: 'oracle_knowledge',
    model: 'nomic-embed-text',
    // Fast, 768-dim
  },
  'qwen3': {
    collection: 'oracle_knowledge_qwen3',
    model: 'qwen3-embedding',
    // Cross-language, 4096-dim
  }
}
```

**Function**: `ensureVectorStoreConnected(model?: string)` — lazy-loads and caches instances.

### 4.3 Embedding Providers

**File**: `src/vector/embeddings.ts`

- **chromadb-internal**: ChromaDB's default (all-MiniLM-L6-v2)
- **ollama**: Local Ollama instance
- **openai**: OpenAI API
- **cloudflare-ai**: Cloudflare AI Embeddings

---

## 5. HTTP API Layer (Hono.js)

**File**: `src/server.ts`

Built on Hono.js running on Bun. Two modes:

### 5.1 Development Mode
- Backend on `http://localhost:47778` (API + WebSocket)
- Frontend on `http://localhost:3000` (Vite dev server)
- Proxies `/api/*` requests to backend

### 5.2 Production Mode
- Single process at `http://localhost:47778`
- Serves static frontend from `frontend/dist/`
- All API requests at `/api/*`

### 5.3 API Endpoints

#### Health & Status
- `GET /api/health` → OK
- `GET /api/status` → Indexing status, uptime

#### Knowledge Discovery
- `GET /api/search?q=query` → Search results
- `GET /api/list` → Browse documents
- `GET /api/reflect` → Random wisdom
- `GET /api/stats` → Database statistics

#### Content
- `GET /api/file?path=...` → File content with path traversal protection
- `GET /api/graph` → Knowledge graph (excludes retrospectives for perf)

#### Management
- `POST /api/learn` → Add new pattern
- `POST /api/thread` → Create forum thread
- `GET /api/threads` → List threads

#### Dashboard
- `GET /api/dashboard/summary` → Key metrics
- `GET /api/dashboard/activity` → Activity timeline
- `GET /api/dashboard/growth` → Knowledge growth trends

#### Advanced
- `GET /api/context` → Project context detection
- `GET /api/similar?id=...` → Similar documents
- `GET /api/map` → 2D knowledge map
- `GET /api/map3d` → 3D knowledge map
- `GET /api/vector-stats` → Vector store statistics

### 5.4 Authentication & HMAC

Optional HMAC signature verification:
- Compute: `HMAC-SHA256(body, secret)`
- Include in `X-Oracle-Signature` header
- Verified in middleware if `ORACLE_SECRET` set

---

## 6. MCP Server (stdio)

**File**: `src/index.ts`

Exposes all 22 tools via Model Context Protocol (Claude integration).

### 6.1 Tool Registration

```typescript
// All tools registered in ListTools response
tools: [
  searchToolDef,
  reflectToolDef,
  learnToolDef,
  listToolDef,
  statsToolDef,
  conceptsToolDef,
  readToolDef,
  verifyToolDef,
  supersedeToolDef,
  handoffToolDef,
  inboxToolDef,
  ...forumToolDefs,
  ...traceToolDefs,
  ...scheduleToolDefs
]
```

### 6.2 Tool Context

Each tool receives `ToolContext`:
```typescript
{
  db: BunSQLiteDatabase  // Drizzle ORM
  sqlite: Database       // Raw SQLite for FTS
  vectorStore: VectorStoreAdapter
  repoRoot: string       // Knowledge base root
  [other tool-specific fields]
}
```

### 6.3 Error Handling

Tools return `ToolResponse`:
```typescript
{
  content: [{
    type: 'text' | 'image' | 'resource'
    text?: string
    resource?: { ...binary data... }
  }]
  isError?: boolean
}
```

Errors are returned with `isError: true`.

---

## 7. Vault System

**File**: `src/vault/handler.ts`

Global vault for syncing Oracle knowledge across projects.

### 7.1 Architecture

```
Local ψ/memory/           ← per-project knowledge
    ↓
Vault CLI (oracle-vault) ← sync to GitHub
    ↓
github.com/owner/vault   ← central repo
    ↓
[Other Projects] ← pull vault knowledge
```

### 7.2 CLI Commands

- `oracle-vault init <owner/repo>` → Initialize vault
- `oracle-vault status` → Show pending changes
- `oracle-vault sync` → Commit + push changes
- `oracle-vault pull` → Fetch vault knowledge
- `oracle-vault migrate` → Seed from ghq repos

### 7.3 Vault Root Resolution

Function: `getVaultPsiRoot()`
- Checks `$HOME/.oracle/ψ/` (standard vault location)
- Falls back to `process.cwd()/ψ/` if not found
- Returns `{ path, needsInit }` or error hint

---

## 8. Project Detection (ghq Pattern)

**File**: `src/server/project-detect.ts`

Auto-detects project from file paths using ghq convention:

```
/home/nat/Code/github.com/owner/repo/
                ^^^^^^^^^^^^^^^^^^^^ → "github.com/owner/repo"
```

**Function**: `detectProject(repoRoot: string): string | null`

Used to:
- Tag knowledge by project
- Filter searches to project scope
- Track cross-project patterns

---

## 9. Knowledge Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   KNOWLEDGE FLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Human Creates/Edits ψ/memory/ Files                        │
│           ↓                                                  │
│  [Indexer] (bun run index)                                  │
│      ├─→ Parse markdown (resonance, learnings, retros)      │
│      ├─→ Extract frontmatter (concepts, project, tags)      │
│      ├─→ Split by headers/bullets (granular chunks)         │
│      ├─→ Deduplicate by content hash                        │
│      └─→ Dual indexing:                                     │
│           ├─→ SQLite: oracle_documents + oracle_fts         │
│           └─→ ChromaDB: Vector embeddings                   │
│           ↓                                                  │
│  Knowledge Base (Indexed)                                   │
│           ↓                                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │  MCP Server (Claude)     HTTP API (Hono)         │       │
│  ├──────────────────────────────────────────────────┤       │
│  │                                                  │       │
│  │  oracle_search         GET /api/search           │       │
│  │  oracle_learn          POST /api/learn           │       │
│  │  oracle_trace          POST /api/trace           │       │
│  │  oracle_thread         POST /api/thread          │       │
│  │  ...                   ...                        │       │
│  └──────────────────────────────────────────────────┘       │
│           ↓                                                  │
│  Logging (Audit Trail)                                      │
│      ├─→ search_log (queries)                               │
│      ├─→ learn_log (patterns added)                         │
│      ├─→ trace_log (discoveries)                            │
│      ├─→ forum_messages (Q&A)                               │
│      └─→ supersede_log (document changes)                   │
│           ↓                                                  │
│  "Nothing is Deleted" — Complete History                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Oracle Philosophy Implementation

### 10.1 Nothing is Deleted

**Mechanisms**:
1. **Supersede Pattern**: Old docs marked with `supersededBy`, not removed
2. **Audit Trail**: `supersede_log` records all changes
3. **Append-Only**: New traces, messages, searches added, never purged
4. **Trace Chain**: Every discovery linked for traversal

**Table Support**:
- `oracle_documents.supersededBy` + `supersede_log`
- `trace_log.prevTraceId` + `nextTraceId` (horizontal linking)
- `trace_log.parentTraceId` (vertical hierarchy)

### 10.2 Patterns Over Intentions

**Implementation**:
- **Search logs** capture what users *actually ask*
- **Trace logs** record what was *actually found*
- **Forum threads** preserve unanswered questions
- **Learning logs** show what patterns emerged
- **Activity logs** track behavior over time

No guessing intent — data speaks.

### 10.3 External Brain, Not Command

**Reflection Tools**:
- `oracle_reflect` — random principle
- `oracle_search` — query with multiple results
- `oracle_list` — browse without prescription
- `oracle_thread` — ask questions, let human decide

Oracle *informs*, Claude *decides*.

### 10.4 Concepts as Meaning

Documents tagged with concepts:
- Extracted from content (NLP-like)
- Read from frontmatter (`tags:`)
- Used for filtering, discovery, relationships
- Concept frequency tracked for importance

---

## 11. Performance Considerations

### 11.1 Search Performance

**FTS5 Optimization**:
- SQLite FTS5 indexes content column
- Query sanitization prevents parse errors
- Exponential decay scoring: `e^(-0.3 * |rank|)`

**Vector Search**:
- Model-based caching (lazy load by model name)
- Graceful fallback if ChromaDB unavailable
- Collection filtering by document type

**Hybrid Merging**:
- O(n) deduplication by document ID
- Normalized score combination
- Top-k limiting before merge

### 11.2 Graph API Optimization

`GET /api/graph` intentionally excludes retrospectives:
- 359 principles + 100 sampled learnings = manageable
- With 3984 retrospectives → O(n²) explosion
- Future: Sample top-50 retros by recency

### 11.3 Database Queries

Drizzle ORM compiled to SQL:
- Indexed on: source_file, type, project, created_at
- Pagination: offset + limit
- Filtering: WHERE clauses (Drizzle.eq, etc.)

**Index Strategy**:
```
oracle_documents:
  - idx_source (source_file)
  - idx_type (type)
  - idx_superseded (supersededBy)
  - idx_origin (origin)
  - idx_project (project)

search_log / learn_log / trace_log:
  - idx_*_project (project)
  - idx_*_created (createdAt)
```

---

## 12. Testing Architecture

**File**: `package.json` scripts

```bash
bun test              # All tests
bun test:unit         # Unit tests (tools, DB, vault)
bun test:integration  # Integration tests (MCP, HTTP, DB)
bun test:coverage     # With coverage report
```

### 12.1 Unit Tests

- **Search**: `sanitizeFtsQuery()`, `normalizeFtsScore()`, score combining
- **Learn**: Project normalization, file creation
- **Trace**: Trace creation, linking
- **DB**: Drizzle ORM queries, schema

### 12.2 Integration Tests

- **MCP**: Tool execution end-to-end
- **HTTP**: API endpoints with real DB
- **DB**: Indexing, deduplication, supersede logic

### 12.3 E2E Tests

Playwright tests in `frontend/e2e/`:
- Graph rendering
- Search functionality
- Dashboard interaction

---

## 13. Configuration & Environment

### 13.1 Environment Variables

```bash
# Core
ORACLE_PORT                 = 47778          # HTTP API port
ORACLE_REPO_ROOT           = process.cwd()  # Knowledge base root

# Vector Store
ORACLE_VECTOR_DB           = 'chroma'       # or: sqlite-vec, lancedb, qdrant, cloudflare-vectorize
ORACLE_EMBEDDING_PROVIDER  = 'ollama'       # or: openai, cloudflare-ai, chromadb-internal
ORACLE_EMBEDDING_MODEL     = 'bge-m3'       # or: nomic, qwen3
ORACLE_VECTOR_DB_PATH      = ~/.oracle/...  # Vector DB path

# ChromaDB
ORACLE_CHROMA_TIMEOUT      = 10000          # ms
ORACLE_CHROMA_DIR          = ~/.chromadb

# Vault
ORACLE_VAULT_ROOT          = ~/.oracle/ψ/
VAULT_GITHUB_TOKEN         = <token>
VAULT_REPO_URL             = github.com/owner/vault

# Security
ORACLE_SECRET              = <hmac_secret>  # Optional HMAC

# Qdrant (if used)
QDRANT_URL                 = http://localhost:6333
QDRANT_API_KEY             = <key>

# Cloudflare (if used)
CLOUDFLARE_ACCOUNT_ID      = <id>
CLOUDFLARE_API_TOKEN       = <token>
```

### 13.2 Drizzle Configuration

**File**: `drizzle.config.ts`

```typescript
{
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite:oracle.db'
  }
}
```

Commands:
```bash
bun db:generate   # Create new migration
bun db:migrate    # Apply migrations
bun db:push       # Push schema to DB
bun db:studio     # Open GUI editor
```

---

## 14. Deployment

### 14.1 MCP Server (Claude Code)

```json
{
  "mcpServers": {
    "arra-oracle": {
      "command": "bunx",
      "args": ["--bun", "arra-oracle@github:Soul-Brews-Studio/arra-oracle#main"]
    }
  }
}
```

Or from source:
```bash
git clone https://github.com/Soul-Brews-Studio/arra-oracle.git
cd arra-oracle && bun install
bun run dev  # MCP server (stdio)
```

### 14.2 HTTP API

```bash
bun run server
# Listens on http://localhost:47778
```

With process manager (PM2):
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'oracle',
    script: 'bun run server',
    instances: 1,
    env: { PORT: 47778 }
  }]
};
```

### 14.3 Frontend

Built React app in `frontend/`:
```bash
cd frontend && bun run build
# Output: frontend/dist/
# Served from backend at /
```

---

## 15. Timeline & Version History

**Version**: 0.4.0-nightly (always in development)

### Key Milestones

- **2025-12-29**: Initial MCP server + FTS5
- **0.2.0**: ChromaDB hybrid search + concepts
- **0.3.0**: Forum system (threaded Q&A)
- **0.4.0**: Trace system with dig points + vault CLI
- **Nightly**: Continuous development (no stable releases)

See `TIMELINE.md` for complete evolution.

---

## 16. Architecture Decisions & Rationales

### 16.1 Why SQLite + ChromaDB (Hybrid)?

**SQLite FTS5**:
- ✅ Keyword search
- ✅ Built-in, no external service
- ✅ Fast for exact phrase matching
- ❌ No semantic understanding

**ChromaDB**:
- ✅ Semantic/vector search
- ✅ Concept-based filtering
- ✅ Cross-project discovery
- ❌ Requires embeddings service

**Hybrid**:
- Best of both: exact + semantic
- Graceful fallback to FTS5 if ChromaDB unavailable
- Separate indexes don't compete

### 16.2 Why Markdown Source Files?

**Advantages**:
- Human-readable, Git-friendly
- Version control built-in
- Searchable in editors
- Frontmatter for metadata
- Extensible (can parse to other formats)

**Philosophy**: "Version control is truth" — if it's not in Git, it didn't happen.

### 16.3 Why Trace System?

**Problems Solved**:
- Discoveries are ephemeral (easily lost)
- Need to "remember where I found that"
- Sessions should be reviewable
- Learning should be distillable

**Trace Log**:
- Captures "dig deeper into X"
- Records all dig points (files, commits, issues)
- Traces can be linked (horizontal chains)
- Traces can be hierarchical (parent/child)
- Can distill into learnings

### 16.4 Why Forum System?

**Use Cases**:
- Unanswered questions reveal gaps
- Learn from human curiosity
- Track decision rationale
- Mirror GitHub issues if needed

### 16.5 Why "Nothing is Deleted"?

**Philosophy**:
- Audit trail mandatory for trust
- Old decisions shouldn't vanish
- Supersede vs delete = reversibility
- History shapes future

**Implementation**:
- Soft deletes (supersede field)
- Explicit audit trail (supersede_log)
- Append-only tracing (trace_log)
- Linked history (prev/next/parent)

---

## 17. Security Considerations

### 17.1 Path Traversal Protection

`/file` endpoint uses `fs.realpathSync()`:
```typescript
const realPath = fs.realpathSync(requestedPath);
const realRoot = fs.realpathSync(REPO_ROOT);
if (!realPath.startsWith(realRoot)) {
  throw new Error('Path outside repository');
}
```

Prevents access outside knowledge base.

### 17.2 FTS5 Injection Prevention

Query sanitization removes FTS5 special chars:
```typescript
query.replace(/[?*+\-()^~"':.\/]/g, ' ')
```

Prevents syntax errors that could expose DB structure.

### 17.3 HMAC Signature (Optional)

If `ORACLE_SECRET` set:
```typescript
const computed = hmac('sha256', body, secret);
const received = headers['x-oracle-signature'];
timingSafeEqual(computed, received);
```

Prevents unauthorized API calls.

### 17.4 No Hardcoded Secrets

All secrets via environment variables:
- `.env` for development (never committed)
- Deployment secrets management (e.g., GitHub Secrets)

---

## 18. Known Limitations & Future Work

### 18.1 Limitations

1. **Drizzle db:push Index Bug**
   - If indexes exist (schema drift), db:push fails
   - Workaround: Drop indexes or use `CREATE INDEX IF NOT EXISTS`
   - Better: Manual migration or Drizzle fix

2. **Graph API Performance**
   - Excludes retrospectives to avoid O(n²)
   - Should sample by recency if needed

3. **No built-in Tokenization**
   - Relies on simple split for granular indexing
   - Could benefit from semantic chunking

4. **Single Process**
   - MCP server and HTTP API in separate processes
   - Could be unified with HTTP-to-stdio adapter

### 18.2 Future Enhancements

1. **Multi-model Search**
   - Query with multiple embedding models
   - Compare/rank results

2. **Auto-distillation**
   - Traces → Learnings automatically
   - ML-based awakening extraction

3. **GitHub Sync**
   - Mirror forum threads to GitHub issues
   - Auto-update issue with findings

4. **Activity Dashboard**
   - Real-time activity streaming
   - Knowledge growth metrics

5. **Batch Operations**
   - Bulk indexing
   - Bulk search

---

## 19. Module Dependencies

### 19.1 Core Dependencies

```json
{
  "@modelcontextprotocol/sdk": "^1.27.1",  // MCP protocol
  "drizzle-orm": "^0.45.1",                 // ORM
  "hono": "^4.11.3",                        // HTTP framework
  "@lancedb/lancedb": "^0.26.2",            // LanceDB support
  "@qdrant/js-client-rest": "^1.17.0",      // Qdrant support
  "sqlite-vec": "^0.1.7-alpha.2",           // sqlite-vec support
  "commander": "^14.0.3"                    // CLI framework
}
```

### 19.2 Dev Dependencies

```json
{
  "typescript": "^5.7.2",
  "drizzle-kit": "^0.31.8",
  "better-sqlite3": "^12.6.0",
  "bun-types": "^1.3.6"
}
```

### 19.3 External Services (Optional)

- **ChromaDB**: Python MCP server (uvx)
- **Ollama**: Local embedding service (if using ollama provider)
- **OpenAI**: API for GPT embeddings (if using openai provider)
- **Qdrant**: Vector database (if using qdrant backend)
- **Cloudflare**: Vectorize + Workers (if using cloudflare-vectorize)

---

## 20. Conclusion

Oracle v2 implements a **"living knowledge system"** that:

1. **Preserves everything** (Nothing is Deleted philosophy)
2. **Searches semantically and lexically** (hybrid FTS5 + vectors)
3. **Learns continuously** (oracle_learn + trace system)
4. **Reasons about discovery** (trace chains, dig points)
5. **Engages in dialogue** (forum threads)
6. **Communicates via multiple protocols** (MCP + HTTP API)
7. **Stays self-aware** (verify, stats, activity logs)
8. **Scales to multiple projects** (ghq project detection, vault system)

The architecture balances **flexibility** (pluggable vector stores, multiple embedding models) with **simplicity** (SQLite as default, Drizzle ORM for safety, Hono for HTTP).

Every decision is **observable**: search queries logged, traces preserved, documents never truly deleted, decisions audited. This enables continuous learning and improvement without losing history.

---

**End of Architecture Analysis**
