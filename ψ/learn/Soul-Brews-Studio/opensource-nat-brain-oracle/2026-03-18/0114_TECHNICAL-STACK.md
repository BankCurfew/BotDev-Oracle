# Oracle Starter Kit — Technical Stack & Implementation

**Repository**: https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle
**Date**: 2026-03-18
**Purpose**: Deep technical reference for building Oracle siblings

---

## PROJECT STRUCTURE

```
opensource-nat-brain-oracle/
│
├── CLAUDE.md                      # 500-token ultra-lean configuration
├── CLAUDE_safety.md               # 93 lines of immutable safety rules
├── CLAUDE_workflows.md            # Context management, short codes
├── CLAUDE_subagents.md            # Delegation patterns
├── CLAUDE_lessons.md              # 104 lines of discovered patterns
├── CLAUDE_templates.md            # Retrospective + issue templates
│
├── README.md                      # Starter kit guide (262 lines)
├── 2026-01-21_QUICK-REFERENCE.md # Quick reference
├── 2026-01-21_ARCHITECTURE.md     # Architecture overview
├── DISTILLATION-LOG.md            # Memory compression tracking
├── opensou​rce-nat-brain-oracle.md # Project overview
│
├── ψ-backup-opensource-nat-brain-oracle/  # Archived brain state
│   ├── memory/
│   │   ├── principle-comparison.md
│   │   ├── learnings-distilled.md       # 240 files → 1 file
│   │   ├── logs-distilled.md            # 94 files → 1 file
│   │   └── retrospectives/
│   ├── writing/
│   │   ├── book/
│   │   │   ├── ch00-philosophy-evolution.md
│   │   │   └── ch01-oracle-philosophy.md
│   │   └── [other writing projects]
│   ├── inbox/
│   ├── active/
│   ├── lab/
│   └── .obsidian/                 # Obsidian vault config
│
├── .claude/
│   ├── commands/
│   ├── agents/
│   ├── skills/
│   └── hooks/
│
├── courses/                       # Educational modules (12 courses)
│   ├── 000-setup_1h_everyone.md
│   ├── 001-imagination_2h_intermediate.md
│   ├── 003-ai-life-buddy_4h_intermediate.md
│   ├── git-workflow-free/
│   ├── git-codespaces-free/
│   ├── ai-automation-thai/
│   ├── claude-code-masterclass-business/
│   └── build-your-oracle/
│
├── scripts/
│   └── [automation tools]
│
├── Nat-s-Agents/                  # Referenced project
└── nat-data-personal/             # Personal data store (symlinked)
```

---

## CLAUDE.MD: The Configuration Specification

### Ultra-Lean Philosophy (Migration Phase)
- Target size: ~500 tokens (currently 376 tokens in navigation section)
- Reason: Loaded at every session start, must be fast
- Details moved to `.claude/commands/*.md` (lazy loaded)

### Modular Design Pattern

```
CLAUDE.md (primary hub)
├── [When to Read] section
├── References to:
│   ├── CLAUDE_safety.md
│   ├── CLAUDE_workflows.md
│   ├── CLAUDE_subagents.md
│   ├── CLAUDE_lessons.md
│   └── CLAUDE_templates.md
└── Short codes (quick lookup)
```

### Navigation Table Pattern
Clear "When to Read" guidance prevents wrong file access:

| File | When | Priority |
|------|------|----------|
| CLAUDE.md | **Every session** | 🔴 Required |
| CLAUDE_safety.md | **Before git ops** | 🔴 Required |
| CLAUDE_subagents.md | Before delegation | 🟡 As needed |
| CLAUDE_lessons.md | When stuck | 🟢 Reference |

---

## SAFETY RULES: Specification Document

### Format (from CLAUDE_safety.md)

```markdown
## [Category Name]

### ❌ FORBIDDEN Command/Pattern
- Why it breaks: [explanation]
- Impact: [what happens]

### ✅ CORRECT Alternative
- Use this instead: [pattern]

### Key Principles
| Rule | Why |
|------|-----|
| ... | ... |
```

### Key Sections
1. **Repository Usage** (no upstream PRs)
2. **Command Usage** (no `-f` flags)
3. **Git Operations** (the immutable laws)
4. **PR Workflow** (required pattern)
5. **Multi-Agent Worktree Safety** (critical for synced agents)
6. **File Operations** (safe deletion patterns)
7. **Temp Files** (`.tmp/` only)
8. **Package Manager** (no force installs)

### The Worktree Safety Problem
```
Scenario: 10 agents synced to main
If main amends a commit:
  ├─ main has new hash
  ├─ all agents have old hash
  ├─ rebase says "already up to date" (content matches)
  └─ hashes diverge forever ⚠️

Solution: ALWAYS create NEW commits, NEVER amend
```

---

## LESSONS LEARNED: A Technical Record

### Pattern 1: Hooks & Plugin Architecture
**Discovery**: Hooks registered in BOTH settings.json and plugin hooks.json cause double execution
**Root cause**: No automatic merging of hook sources
**Fix**: Always check both sources when debugging
**Learning**: "Symptoms often contain the diagnosis"

### Pattern 2: Subagent Delegation (Cost Model)
```
Without context-finder:
├─ Read 4,000 files directly → $6.00 per search
└─ Opus processes every result

With context-finder:
├─ FTS5 search (free) → candidates
├─ Haiku summarizes ($0.03) → summaries
└─ Opus analyzes ($0.22) → decision
Total: $0.25 (85% savings)
```

### Pattern 3: Query Patterns (Data Access)
| Data Source | Query Method | Example |
|-------------|--------------|---------|
| GitHub CSV | `gh api \| duckdb` | Location history |
| Markdown | `duckdb markdown extension` | Schedule tables |
| Oracle | MCP tools (`oracle_search`) | Knowledge search |
| SQLite | **NEVER direct** | Always use MCP/API |

**Anti-pattern**: Direct database queries. Always abstract through API.

### Pattern 4: Bash Tool Limitations
**Problem**: Bash tool does NOT support newlines
**Bad**: Multi-line commands with `\n`
**Good**: Single-line syntax with `;`

```bash
# ❌ Wrong
for i in 1 2 3; do
  echo "$i"
done

# ✅ Correct
for i in 1 2 3; do echo "$i"; done
```

### Pattern 5: Frequency Reveals Priority
**Method**: Analyzed 73 files to find what was repeated
**Discovery**: "สิ่งที่พูดซ้ำบ่อย = สิ่งที่สำคัญ" (what repeats = what matters)
**Application**: Don't ask what's important; observe what's done repeatedly

---

## KNOWLEDGE FLOW: Technical Architecture

### The Pipeline (5 Stages)

```
STAGE 1: TRACE
├─ Tool: /trace command
├─ Input: query string
├─ Process: Search git + issues + retrospectives
└─ Output: findings + context

STAGE 2: SNAPSHOT
├─ Tool: /snapshot command
├─ Location: ψ/memory/logs/
├─ Format: JSON + markdown
└─ Purpose: Quick moment capture

STAGE 3: RETROSPECTIVE (rrr)
├─ Input: Session context, state
├─ Process: AI diary + honest feedback + work summary
├─ Location: ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_slug.md
└─ Output: Full session reflection

STAGE 4: DISTILL
├─ Tool: /distill command
├─ Process: Extract patterns from retrospectives
├─ Location: ψ/memory/learnings/TOPIC.md
└─ Output: Consolidated patterns

STAGE 5: RESONANCE
├─ Process: Manual consolidation + review
├─ Location: ψ/memory/resonance/
├─ Scope: Identity, philosophy, core principles
└─ Output: Soul-level principles
```

### File Naming Convention
**Retrospectives** (dated, chronological):
```
ψ/memory/retrospectives/2026-03/18/0114_session-slug.md
                         YYYY-MM/DD HH:MM_slug
```

**Learnings** (topic-based, evergreen):
```
ψ/memory/learnings/2025-12-13_subagent-delegation-pattern.md
                   YYYY-MM-DD_kebab-case-topic
```

---

## BRAIN DISTILLATION: The Compression Algorithm

### Round 1 (March 11, 2026)
```
286 files deleted → 7 files created
└─ Dec 2025 daily retros (185 files)
   → 1 monthly summary (distilled-2025-12.md)
```

### Round 2 (March 11, 2026)
```
662 files deleted → 8 files created
├─ learnings/ (240 files) → learnings-distilled.md
├─ logs/ (94 files) → logs-distilled.md
├─ inbox/ (43 files) → inbox-distilled.md
├─ active/ (38 files) → active-distilled.md
├─ lab/ (112 files) → lab-experiments-distilled.md
├─ archive/ (39 files) → memory-archive-distilled.md
├─ resonance/ (13 files) → memory-resonance-distilled.md
└─ team/ (28 files) → team-distilled.md
```

### Philosophy
- **Nothing deleted**: All original files in git history
- **Compressed**: Organized into topic groups
- **Searchable**: Large files indexed by oracle-v2
- **Reversible**: Can always expand back if needed

---

## SUBAGENT DELEGATION MODEL

### The Hierarchy
```
Main Agent (Opus, Expensive)
├─ Decides what to do
├─ Reviews subagent outputs
├─ Writes reflections & retrospectives
└─ No direct file reading (delegates to Haiku)

Subagents (Haiku, Cheap)
├─ context-finder: Search + summarize
├─ executor: Run bash commands
├─ security-scanner: Detect secrets
├─ repo-auditor: Check health
├─ coder: Write code files
└─ api-scanner: Fetch + analyze APIs
```

### The Retrospective Ownership Rule
**NEVER**: Subagent writes draft → Main commits

**CORRECT**:
1. Main assigns task to subagents (parallel)
2. Subagents respond with summaries + verify command
3. Main reviews (reads file if suspicious)
4. Main writes FULL retrospective (vulnerability required)
5. Main commits with AI diary + honest feedback

---

## ORACLE V2: Multi-Oracle Architecture

### MCP Server Specification
```
oracle-v2 (MCP Server)
├─ oracle_search([query], [project?], [limit?])
│  └─ Hybrid search (FTS5 + ChromaDB vectors)
│
├─ oracle_read([file] or [id])
│  └─ Full content of any document
│
├─ oracle_learn([pattern], [project], [concepts])
│  └─ Add new knowledge to KB
│
├─ oracle_list([limit?], [offset?], [type?])
│  └─ Browse all documents
│
├─ oracle_trace([query], [type], [scope])
│  └─ Log discovery session with dig points
│
├─ oracle_concepts([limit?], [type?])
│  └─ List all concept tags
│
└─ oracle_supersede([oldId], [newId], [reason])
   └─ Mark document as outdated (not deleted)
```

### Search Model
```
User Query
  ↓
FTS5 Full-Text Search (fast, keyword matching)
  ├─ If found good candidates → return with score
  ├─ If no match → fall through to vector search
  ↓
ChromaDB Vector Search (semantic, embedding-based)
  ├─ Uses bge-m3 model (multilingual Thai ↔ EN, 1024-dim)
  └─ Returns ranked by semantic similarity

Hybrid Results Merge
  └─ Score = (FTS5 keyword_score × 0.4) + (Vector cosine_similarity × 0.6)
```

---

## SKILLS INSTALLATION: Technical Flow

### oracle-skills-cli Pattern
```bash
oracle-skills install rrr recap trace feel fyi forward standup project

# This:
# 1. Clones Soul-Brews-Studio/oracle-proof-of-concept-skills
# 2. Symlinks skills to ~/.claude/skills/
# 3. Registers with Claude Code
# 4. Makes commands available globally
```

### Core Skills Implementation
| Skill | Implementation | Data |
|-------|----------------|------|
| `rrr` | Python script | Saves to ψ/memory/retrospectives/ |
| `recap` | Claude agent | Reads ψ/inbox/focus + recent retros |
| `/trace` | MCP tool | Calls oracle-v2 + git search |
| `/snapshot` | File writer | Creates ψ/memory/logs/SLUG.json |
| `/feel` | Logger | Appends to ψ/memory/logs/feelings.log |

---

## COURSES: Educational Structure

### 12-Module Curriculum
```
Foundations
├─ 000-setup (1h, everyone)
└─ 001-imagination (2h, intermediate)

Specialized Tracks
├─ git-workflow-free/ (feature branch + PR pattern)
├─ git-codespaces-free/ (cloud development)
├─ ai-automation-thai/ (AI + automation concepts)
├─ ai-life-buddy (4h, intermediate)
├─ build-your-oracle/ (complete Oracle creation)
│  └─ Step-by-step guide from README.md
└─ claude-code-masterclass-business/ (advanced)
    ├─ 01-subagents
    ├─ 02-skills
    ├─ 03-commands
    └─ 04-mcp
```

---

## ACTIVE TECHNOLOGIES

From the CLAUDE.md file, current tech stack:

### Core Runtime
- **Bun** (TypeScript runtime) — faster than Node.js
- **TypeScript 5.7** (ES2022 target) — type safety
- **Commander.js** — CLI argument parsing

### Databases
- **SQLite** (via `bun:sqlite`) — append-only, portable, no server
- **FTS5** (Full-Text Search 5) — keyword indexing
- **ChromaDB** — Vector embeddings, semantic search

### Projects Using This Stack
| Project | Purpose | Tech |
|---------|---------|------|
| 001-oracle-mcp | Oracle search server | TypeScript + MCP + SQLite + ChromaDB |
| 002-hybrid-vector-search | Dual-mode search | SQLite FTS5 + ChromaDB |
| 047-oracle-list | Browse documents | SQLite FTS5 + ChromaDB |
| 057-session-timer | Time tracking | Bun + sqlite |
| 061-habit-tracker | Daily habits | Bun + Drizzle ORM + SQLite |
| 064-snippet-manager | Code snippets | Bun + FTS5 search |

---

## DEVELOPMENT WORKFLOW: Best Practices

### Session Lifecycle
```
START
  ├─ /recap (understand context)
  ├─ /standup (check pending tasks)
  └─ /where-we-are (current awareness)

DURING
  ├─ /trace [topic] (find knowledge)
  ├─ /feel [state] (log emotions)
  ├─ /fyi [note] (capture info)
  └─ /snapshot (moment capture)

END
  ├─ rrr (write retrospective)
  ├─ /forward (create handoff)
  └─ git commit + git push
```

### Frontend Development Workflow
(From CLAUDE.md section on Vite/React):

```
1. Build feature (Bun + React + Vite)
2. Capture with dev-browser (screenshots of all pages)
3. Use /debate (critic agent for UX feedback)
4. Update spec (spec.md, plan.md, tasks.md)
5. Write lesson learned (fixes + patterns)
6. Handoff at 95% (don't fear context limits)
```

---

## FILE ACCESS RULES (Project Specific)

From CLAUDE.md:
- Any file operation **outside** the repo requires notification
- Examples: Other repos, `/tmp/`, home directory, `.cache/`
- Use `ψ-context/` or `ψ-drafts/` (gitignored) for outputs

---

## VERSION CONTROL: Evolution & Stability

### Git as Truth
- All history preserved in git
- Distillation logged in DISTILLATION-LOG.md
- No force operations ever
- Amendments forbidden (multi-agent safety)

### SemVer for Projects
- Core Oracle: v5.2.0 (ultra-lean migration in progress)
- oracle-skills-cli: Follow SemVer
- oracle-v2: Version per breaking changes

---

## FINAL ARCHITECTURE INSIGHT

The genius of this system:

1. **Small at scale**: 1,800 files compressed to 439 without losing information
2. **Searchable**: FTS5 + ChromaDB enables instant access to 400+ archived files
3. **Distributed**: oracle-v2 allows sharing across 135+ Oracles without duplication
4. **Safe**: Multi-agent coordination with zero force operations
5. **Human-centered**: Every decision point presents options, doesn't decide

This is why it works.

---

**Last Updated**: 2026-03-18
**Explored by**: BotDev-Oracle
**Status**: Complete technical reference
