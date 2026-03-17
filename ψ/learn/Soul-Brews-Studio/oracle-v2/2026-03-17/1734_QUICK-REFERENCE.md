# Oracle v2 Quick Reference

**Project**: Arra Oracle (v0.4.0-nightly)
**Date**: 2026-03-17
**Repository**: https://github.com/Soul-Brews-Studio/arra-oracle
**Type**: MCP Server + HTTP API + Web Dashboard

---

## What is Oracle v2?

Oracle v2 is a **knowledge management system** designed to preserve and learn from every interaction. It serves as an external brain for development workflows with three interfaces:

1. **MCP Server** (Model Context Protocol) — Claude's native interface for tools
2. **HTTP API** (REST) — Web applications, dashboards, automation
3. **Web Dashboard** — React UI for browsing and managing knowledge

Core philosophy: **"Nothing is Deleted"** — all interactions are logged, archived, and made searchable. Outdated information is marked superseded, not removed.

### Architecture

```
┌─────────────────────────────────────────────────┐
│            ORACLE v2 SYSTEM                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Claude  │  │HTTP API  │  │Dashboard │      │
│  │ (MCP)    │  │ (REST)   │  │(React)   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │            │
│       └─────────────┼─────────────┘            │
│                     │                          │
│             ┌───────▼───────┐                  │
│             │  Oracle Core  │                  │
│             │  (index.ts)   │                  │
│             └───────┬───────┘                  │
│                     │                          │
│     ┌───────────────┼───────────────┐          │
│     │               │               │          │
│  ┌──▼─────┐  ┌──────▼──────┐  ┌────▼─────┐    │
│  │ SQLite │  │ LanceDB/    │  │ Markdown │    │
│  │(FTS5)  │  │ ChromaDB    │  │ Files    │    │
│  └────────┘  │(vectors)    │  └──────────┘    │
│              └─────────────┘                   │
└─────────────────────────────────────────────────┘
```

---

## The 22 MCP Tools

All tools are accessible via Claude's native MCP interface. Key categories:

### 1. SEARCH & DISCOVERY (3 tools)

#### oracle_search
**Find knowledge by keywords/vectors**
- Hybrid search: FTS5 (keyword) + vector (semantic)
- Returns ranked results with source files and scores
- Modes: `hybrid` (default), `fts` (keywords only), `vector` (semantic only)
- Respects document types: `all`, `principle`, `learning`, `retro`, `pattern`

```
oracle_search(
  query: string,              // Required: search term
  type?: "all" | "principle" | "learning" | "retro" | "pattern",
  limit?: number,             // Default: 5
  offset?: number,            // For pagination
  mode?: "hybrid" | "fts" | "vector",
  model?: "bge-m3" | "nomic" | "qwen3"  // Embedding model
)
```

#### oracle_read
**Read full document content by ID or file path**
- Returns complete markdown source
- Can resolve vault paths and symlinks
- Supports Unicode paths (e.g., `ψ/memory/principles/`)

```
oracle_read(
  file?: string,    // File path: "ψ/memory/learnings/file.md"
  id?: string       // Document ID from search results
)
```

#### oracle_list
**Browse documents without searching**
- Filter by type, pagination support
- Optional grouping by source file
- Good for exploration and discovery

```
oracle_list(
  type?: "all" | "principle" | "learning" | "retro",
  limit?: number,   // Default: 10
  offset?: number   // For pagination
)
```

---

### 2. REFLECTION & WISDOM (2 tools)

#### oracle_reflect
**Get random principle or learning for alignment**
- One parameter: none
- Returns guidance from knowledge base
- Good for calibration and decision support

```
oracle_reflect()
```

#### oracle_concepts
**See all topic tags in knowledge base**
- Returns concept coverage with document counts
- Helps understand knowledge organization
- Optional type filter

```
oracle_concepts(
  type?: "all" | "principle" | "learning" | "retro",
  limit?: number    // Default: 50
)
```

---

### 3. LEARN & REMEMBER (2 tools)

#### oracle_learn
**Add new pattern/learning to knowledge base**
- Creates markdown file in `ψ/memory/learnings/`
- Auto-indexes for future search
- **Always search first** to avoid duplicates

```
oracle_learn(
  pattern: string,           // The knowledge to add
  concepts?: string[],       // Topic tags
  source?: string,           // Attribution (defaults to "Oracle Learn")
  project?: string           // Source project (ghq format)
)
```

#### oracle_supersede
**Mark document as outdated without deletion**
- Implements "Nothing is Deleted" pattern
- Links old and new documents
- Preserves full history in database

```
oracle_supersede(
  oldId: string,             // ID of outdated document
  newId: string,             // ID of replacement
  reason?: string            // Why superseded
)
```

---

### 4. DISCUSS & COLLABORATE (4 forum tools)

#### oracle_thread
**Send message to discussion thread**
- Creates new thread or continues existing
- Oracle auto-responds from knowledge base
- Uses GitHub issues for mirrors

```
oracle_thread(
  message: string,           // Your question/message
  threadId?: number,         // Omit to create new thread
  title?: string,            // Title for new thread
  role?: "human" | "claude", // Who is sending
  model?: string             // Claude model name
)
```

#### oracle_threads
**List discussion threads**
- Filter by status: `active`, `answered`, `pending`, `closed`
- Pagination support
- Shows message counts and last activity

```
oracle_threads(
  status?: "active" | "answered" | "pending" | "closed",
  limit?: number,    // Default: 20
  offset?: number    // For pagination
)
```

#### oracle_thread_read
**Read full message history from thread**
- Loads all messages in conversation
- Supports limiting to last N messages
- Shows roles and timestamps

```
oracle_thread_read(
  threadId: number,
  limit?: number     // Return only last N messages
)
```

#### oracle_thread_update
**Change thread status**
- Statuses: `active`, `closed`, `answered`, `pending`
- Useful for marking discussions complete/archived

```
oracle_thread_update(
  threadId: number,
  status: "active" | "closed" | "answered" | "pending"
)
```

---

### 5. TRACE & DISCOVERY (6 trace tools)

#### oracle_trace
**Log a discovery session with dig points**
- Captures what you found: files, commits, issues
- Creates actionable records for follow-up
- Supports hierarchical (parent/child) traces

```
oracle_trace(
  query: string,                    // Required: what was traced
  queryType?: "general" | "project" | "pattern" | "evolution",
  scope?: "project" | "cross-project" | "human",
  foundFiles?: [{path, type, matchReason, confidence}],
  foundCommits?: [{hash, shortHash, date, message}],
  foundIssues?: [{number, title, state, url}],
  foundRetrospectives?: [string],
  foundLearnings?: [string],
  parentTraceId?: string,
  project?: string,
  agentCount?: number,
  durationMs?: number
)
```

#### oracle_trace_list
**Browse recent traces with filters**
- Filter by query, project, status, depth
- Pagination support
- Status: `raw`, `reviewed`, `distilling`, `distilled`

```
oracle_trace_list(
  query?: string,    // Filter by trace content
  project?: string,
  status?: "raw" | "reviewed" | "distilling" | "distilled",
  depth?: number,    // 0 = top-level only
  limit?: number,    // Default: 20
  offset?: number
)
```

#### oracle_trace_get
**Get full details of a specific trace**
- Includes all dig points (files, commits, issues)
- Optional chain view (parent/child traces)

```
oracle_trace_get(
  traceId: string,
  includeChain?: boolean  // Show parent/child traces
)
```

#### oracle_trace_link
**Connect two traces horizontally**
- Creates chain: prev ← → next
- Bidirectional navigation
- Preserves all original data

```
oracle_trace_link(
  prevTraceId: string,    // First trace in chain
  nextTraceId: string     // Subsequent trace
)
```

#### oracle_trace_unlink
**Remove link between traces**
- Direction: `prev` (break backward link) or `next` (break forward)
- Doesn't delete traces, just breaks chain

```
oracle_trace_unlink(
  traceId: string,
  direction: "prev" | "next"
)
```

#### oracle_trace_chain
**View full linked chain**
- Get all traces connected horizontally
- Shows position in chain

```
oracle_trace_chain(
  traceId: string   // Any trace in the chain
)
```

---

### 6. SCHEDULE & HANDOFF (4 tools)

#### oracle_schedule_add
**Add appointment to shared schedule**
- Schedule is per-human, shared across all Oracles
- Auto-exports to `~/.oracle/ψ/inbox/schedule.md`
- Supports recurring events and flexible date formats

```
oracle_schedule_add(
  date: string,                          // "5 Mar", "2026-03-05", "tomorrow"
  event: string,                         // Event description
  time?: string,                         // Optional: "14:00", "TBD"
  notes?: string,                        // Additional details
  recurring?: "daily" | "weekly" | "monthly"
)
```

#### oracle_schedule_list
**Browse schedule with filters**
- Defaults to today + 14 days
- Filter by date, range, keyword, or status
- Statuses: `pending`, `done`, `cancelled`, `all`

```
oracle_schedule_list(
  date?: string,              // Single day query
  from?: string,              // Range start
  to?: string,                // Range end
  filter?: string,            // Search events by keyword
  status?: "pending" | "done" | "cancelled" | "all",
  limit?: number              // Default: 50
)
```

#### oracle_handoff
**Save session context for next session**
- Writes to `~/.oracle/ψ/inbox/handoff/`
- Preserves progress, discoveries, next steps
- Timestamped markdown files

```
oracle_handoff(
  content: string,   // Markdown: context, progress, todos
  slug?: string      // Optional: filename slug
)
```

#### oracle_inbox
**List pending handoff files**
- Shows context from previous sessions
- Sorted newest-first
- Helps continuity between sessions

```
oracle_inbox(
  type?: "handoff" | "all",  // Filter type
  limit?: number,            // Default: 10
  offset?: number            // For pagination
)
```

---

### 7. MAINTENANCE & UTILITIES (2 tools)

#### oracle_verify
**Health check: compare files on disk vs database**
- Read-only report by default
- Optional flag to mark orphaned entries
- Detects schema drift and missing indexes

```
oracle_verify(
  check?: true      // Default: read-only report
                    // false: also flag orphaned entries
)
```

#### oracle_stats
**Database statistics**
- Total document count by type
- Last indexed time, index age
- Vector DB connection status

```
oracle_stats()
```

---

## Database Architecture

### Core Tables

**oracle_documents** — Metadata index
- `id` (PK): document identifier
- `type`: principle | learning | pattern | retro
- `source_file`: markdown file path
- `concepts`: JSON array of topic tags
- `created_at`, `updated_at`, `indexed_at`: timestamps
- `superseded_by`: ID of replacement document (if outdated)

**oracle_fts** — Full-text search (FTS5 virtual table)
- Indexed for keyword matching
- Automatically populated from oracle_documents

**search_log** — Query tracking
- `query`: search term
- `mode`: hybrid | fts | vector
- `results_count`, `search_time_ms`: performance
- `project`: source project (ghq format)

**learn_log** — Learning/pattern tracking
- `document_id`: created learning
- `pattern_preview`: snippet of content
- `concepts`: tags applied

**document_access** — Access tracking
- `document_id`: accessed document
- `access_type`: read | consulted | referenced
- For usage analytics

### Forum Tables

**forum_threads** — Discussion topics
- `title`: conversation subject
- `status`: active | answered | pending | closed
- `issue_url`: GitHub mirror (optional)

**forum_messages** — Messages in thread
- `thread_id` (FK): parent thread
- `role`: human | oracle | claude
- `content`: message text
- `principles_found`, `patterns_found`: search results used

### Trace Tables

**trace_log** — Discovery sessions
- `trace_id`: unique UUID
- `query`: what was traced
- `found_files`, `found_commits`, `found_issues`: JSON arrays of dig points
- `depth`: 0 = root, 1+ = sub-traces
- `parent_trace_id`: hierarchical parent
- `prev_trace_id`, `next_trace_id`: horizontal chain links
- `status`: raw | reviewed | distilling | distilled

**supersede_log** — Audit trail (immutable)
- `old_path`, `old_id`: what was replaced
- `new_path`, `new_id`: replacement
- `reason`: why superseded
- Preserves history even if original file deleted

### Other Tables

**schedule** — Appointments
- `date` (YYYY-MM-DD): canonical date for queries
- `date_raw`: original input ("5 Mar", "28 ก.พ.")
- `time`: HH:MM or "TBD"
- `recurring`: null | daily | weekly | monthly
- `status`: pending | done | cancelled

**activity_log** — Audit trail
- `date`, `timestamp`: when activity occurred
- `type`: file_created | file_modified | etc.
- `path`, `size_bytes`: file details

**settings** — Key-value configuration
- Per-instance settings storage

---

## Hybrid Search Algorithm

Oracle v2 combines two search methods for comprehensive results:

### Process

1. **Sanitize query** — Remove FTS5 special chars (`? * + - ( ) ^ ~ " ' : .`)
2. **Run FTS5 search** — Keyword matching on SQLite
3. **Run vector search** — Semantic similarity via LanceDB/ChromaDB
4. **Normalize scores:**
   - FTS5: `e^(-0.3 * |rank|)` (exponential decay)
   - Vector: `1 - distance` (convert to similarity)
5. **Merge results** — Deduplicate by document ID
6. **Hybrid scoring:**
   - 50% FTS5 + 50% vector
   - 10% boost if found in both
7. **Return** with metadata (search time, source breakdown)

### Graceful Degradation

- If vector DB unavailable → FTS5-only with warning
- If query sanitization empties query → return original
- Works without ChromaDB (pure FTS5 mode)

---

## Thread System for Inter-Oracle Communication

### How Threads Work

1. **Create Thread** — `oracle_thread(message)` with no `threadId`
   - Oracle reads knowledge base for relevant context
   - Creates GitHub issue mirror (optional)
   - Returns new thread ID

2. **Continue Thread** — `oracle_thread(message, threadId: N)`
   - Adds message to existing conversation
   - Oracle generates response based on knowledge
   - Messages logged with roles (human, oracle, claude)

3. **Browse Threads** — `oracle_threads()`
   - Filter by status: active, answered, pending, closed
   - Shows message counts and last activity
   - Pagination support

4. **Read Full History** — `oracle_thread_read(threadId)`
   - All messages in chronological order
   - Includes role, author, timestamp
   - Can limit to last N messages

5. **Update Status** — `oracle_thread_update(threadId, status)`
   - Mark as answered/closed/pending
   - Used for lifecycle management

### Design Philosophy

- **Append-only** — All messages preserved
- **Multiple roles** — human (user), oracle (knowledge engine), claude (AI assistant)
- **Principle linked** — Each response references knowledge base
- **GitHub sync** — Optional mirror to GitHub issues for tracking

---

## Schedule System (Per-Human, Shared)

Schedule is stored in `~/.oracle/` (per human, not per project).

### Features

**Flexible date parsing:**
- "5 Mar", "March 5", "5 Mar 2026"
- "2026-03-05" (YYYY-MM-DD)
- "today", "tomorrow"
- "5/3" (DD/MM)
- Thai months: "28 ก.พ." (March in Thai)

**Recurring events:**
- `daily`, `weekly`, `monthly`
- Applied to base date

**Status tracking:**
- `pending` — not yet done
- `done` — completed
- `cancelled` — skipped

**Auto-export:**
- Every add/update exports to `~/.oracle/ψ/inbox/schedule.md`
- Human-readable format grouped by month
- Recurring section for quick reference

### Default Query Range

- `from`: today
- `to`: 14 days from now
- Filter only `pending` events

---

## Inbox & Handoff System

### Handoff (`oracle_handoff`)

Save session progress for next session:

```
oracle_handoff(
  content: "# Progress Summary\n\n- Fixed X\n- Discovered Y\n- Next: Z"
)
```

Creates timestamped file in `~/.oracle/ψ/inbox/handoff/`

### Inbox (`oracle_inbox`)

List pending context from previous sessions:

```
oracle_inbox()
```

Returns:
- File path
- Preview (first 200 chars)
- Created timestamp
- Sorted newest-first

---

## How Oracle v2 Connects to Claude Code

Oracle v2 is deployed as an **MCP server**, making its 22 tools available as native Claude functions.

### Integration Points

1. **Via MCP Server** (recommended)
   - Claude calls tools directly
   - No HTTP overhead
   - Real-time tool invocation

2. **Via HTTP API** (for automation)
   - REST endpoints on port 47778
   - Web dashboard at http://localhost:3000
   - Can be called from non-Claude clients

3. **Via CLI** (for scripts)
   - `bun src/indexer.ts` — Index markdown files
   - `bun src/server.ts` — Start HTTP API
   - CLI commands in `src/cli/`

### MCP Configuration

In Claude's `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "oracle-v2": {
      "command": "node",
      "args": ["/path/to/oracle-v2/dist/index.js"],
      "env": {
        "ORACLE_REPO_ROOT": "/path/to/knowledge-base",
        "ORACLE_DB_PATH": "~/.oracle/oracle.db"
      }
    }
  }
}
```

### Version & Status

**Current Version**: 0.4.0-nightly
**Runtime**: Bun (Node.js compatible)
**Ports**: 47778 (HTTP), stdio (MCP)
**Database**: SQLite at `~/.oracle/oracle.db`

---

## Key Design Principles

### 1. Nothing is Deleted
- All documents preserved with timestamps
- Outdated docs marked `superseded_by`, not deleted
- Audit trail in `supersede_log` and `oracle_documents`
- Full history recoverable

### 2. Append-Only Architecture
- Messages added to threads, never modified
- Traces created with dig points, never erased
- Search logs kept for analytics
- Activity tracked for retrospection

### 3. Per-Human, Not Per-Project
- Schedule shared across all Oracles for single human
- Handoff stored in `~/.oracle/` home directory
- Forum threads could be shared
- Settings per-instance, but portable

### 4. Hybrid Intelligence
- FTS5 for precise keyword matching
- Vector DB for semantic understanding
- Combined scoring for best of both
- Graceful fallback if vector unavailable

### 5. Extensible Logging
- Search queries logged with results
- Learning patterns captured with metadata
- Document access tracked
- Activity timeline for retrospection

---

## Quick Reference: Tool Categories by Use Case

### "I need to find something"
→ `oracle_search(query)`

### "I want to learn from past decisions"
→ `oracle_reflect()` or `oracle_search(topic)`

### "I discovered something important"
→ `oracle_learn(pattern)` (search first!)

### "I need to talk through a decision"
→ `oracle_thread(message)`

### "I want to explore what I've discovered"
→ `oracle_trace(query)` with dig points

### "I need to remember this for next session"
→ `oracle_handoff(context)`

### "I have an appointment"
→ `oracle_schedule_add(date, event)`

### "I need to know what I haven't learned yet"
→ `oracle_verify()` or `oracle_stats()`

---

## Files & Directories

### Key Source Files

- `/src/index.ts` — MCP server entry, tool routing
- `/src/tools/` — 22 tool implementations
- `/src/db/schema.ts` — Database schema (Drizzle ORM)
- `/src/server.ts` — HTTP REST API
- `/src/indexer.ts` — Markdown file indexer
- `/src/forum/` — Thread/message handlers
- `/src/trace/` — Trace/dig point handlers
- `/src/vector/` — Vector store adapters

### Runtime Directories

- `~/.oracle/` — Shared oracle data
  - `oracle.db` — Main database
  - `ψ/inbox/` — Handoffs and schedule
  - `.chromadb/` — Vector embeddings

### Knowledge Repository

- `ψ/memory/resonance/` — Principles (indexed)
- `ψ/memory/learnings/` — Patterns/learnings (indexed)
- `ψ/memory/retrospectives/` — Session notes (indexed)

---

## Configuration

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `ORACLE_REPO_ROOT` | `process.cwd()` | Knowledge base root directory |
| `ORACLE_DB_PATH` | `~/.oracle/oracle.db` | SQLite database location |
| `ORACLE_DATA_DIR` | `~/.oracle` | Shared data directory |
| `PORT` | `47778` | HTTP server port |
| `ORACLE_READONLY` | unset | Run in read-only mode if set |

### Package Info

- **Name**: arra-oracle
- **Version**: 0.4.0-nightly
- **Runtime**: Bun ≥1.2.0
- **Main dependencies**:
  - `@modelcontextprotocol/sdk` — MCP server
  - `drizzle-orm` + SQLite — Database
  - `hono` — HTTP server
  - `@lancedb/lancedb` — Vector search
  - `sqlite-vec` — Vector operations

---

**Last Updated**: 2026-03-17 at 17:38 GMT+7
**Created by**: Claude Code
**Philosophy**: Nothing is Deleted. All interactions are preserved.
