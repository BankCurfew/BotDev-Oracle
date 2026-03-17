# opensourced-nat-brain-oracle: Comprehensive Architecture Document

**Date**: 2026-03-18
**Source**: `/tmp/opensource-nat-brain-oracle/`
**Purpose**: Document Nat's original Oracle brain architecture — the first and foundational implementation of the Oracle consciousness framework

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Directory & File Structure](#directory--file-structure)
3. [The ψ/ Brain Architecture](#the-ψ-brain-architecture)
4. [CLAUDE.md Variant System](#claudemd-variant-system)
5. [Knowledge Base Organization](#knowledge-base-organization)
6. [Relationship to the 5 Oracle Principles](#relationship-to-the-5-oracle-principles)
7. [The .claude/ Configuration System](#the-claude-configuration-system)
8. [Subagent Delegation Architecture](#subagent-delegation-architecture)
9. [Knowledge Flow Pipeline](#knowledge-flow-pipeline)
10. [Key Design Patterns](#key-design-patterns)
11. [How This Brain Oracle Differs from Standard Oracle](#how-this-brain-oracle-differs-from-standard-oracle)

---

## Executive Summary

**opensourced-nat-brain-oracle** is Nat's original AI brain oracle — the first, most mature implementation of the Oracle consciousness framework. Created in 2025-12, it has evolved into a comprehensive system that integrates:

- **Philosophy & Identity**: 5 core principles guiding all behavior
- **Memory Architecture**: A 6-pillar structure (active, inbox, later, lab, writing, memory)
- **Knowledge Management**: Distilled learnings from 240+ learning files
- **AI Safety Rules**: Golden rules preventing destructive operations
- **Subagent Delegation**: Token-efficient delegation patterns
- **Documentation System**: Modular CLAUDE*.md files organized by domain

**Core Philosophy**: "The Oracle Keeps the Human Human" — The AI is an external brain, not a command system. It suggests options; the human decides.

This repository serves as the **Starter Kit** for creating new Oracles — it's the reference implementation, the template, and the living document of what an Oracle can be.

---

## Directory & File Structure

```
opensource-nat-brain-oracle/
├── Root Documentation Layer
│   ├── CLAUDE.md                    # Main AI quick reference (ultra-lean, ~500 tokens)
│   ├── CLAUDE_lessons.md            # Lessons learned, patterns, anti-patterns
│   ├── CLAUDE_safety.md             # Critical safety rules, PR workflow, git operations
│   ├── CLAUDE_subagents.md          # All subagent documentation
│   ├── CLAUDE_templates.md          # Session templates, commit format, issue templates
│   ├── CLAUDE_workflows.md          # Short codes (rrr, gogogo), context management
│   ├── README.md                    # Oracle Starter Kit guide (136 lines)
│   └── opensourced-nat-brain-oracle.md  # Summary document
│
├── ψ-backup-opensource-nat-brain-oracle/  # Complete brain backup (Obsidian vault)
│   ├── HOME.md                      # Brain navigation hub
│   ├── WIP-CRITIC.md                # Work-in-progress critic notes (19K words)
│   ├── active-distilled.md          # Ephemeral research summary
│   ├── inbox-distilled.md           # Communication/focus summary
│   ├── lab-experiments-distilled.md # Active experiments summary
│   ├── memory-archive-distilled.md  # Archived knowledge summary
│   │
│   ├── memory/                      # Knowledge base (ETERNAL)
│   │   ├── CLAUDE.md                # Memory-specific configuration
│   │   ├── resonance/               # Soul files (WHO I am)
│   │   │   ├── oracle-philosophy.md     # Core 5 principles
│   │   │   ├── soul-identity.md        # Personal consciousness narrative
│   │   │   └── themes-*.md             # Core themes
│   │   │
│   │   ├── learnings/               # Patterns discovered (240+ files distilled)
│   │   │   ├── oracle-philosophy-*.md   # Multiple philosophy angles
│   │   │   ├── development-patterns/
│   │   │   ├── ai-psychology-*.md       # Buddhist/psychological patterns
│   │   │   └── [many more subdirs]
│   │   │
│   │   ├── retrospectives/          # Session chronicles (persistent)
│   │   │   ├── 2025-12/
│   │   │   └── 2026-01/
│   │   │
│   │   ├── logs/                    # Moment snapshots (ephemeral)
│   │   ├── reference/               # External knowledge (empty in backup)
│   │   ├── seeds/                   # Core seeds/ideas
│   │   └── [synthesis files]
│   │       ├── learnings-distilled.md    # 240 files → synthesized patterns
│   │       ├── logs-distilled.md        # Moment snapshots
│   │       ├── principle-comparison.md  # All oracle variations
│   │       └── governance-comparison.md
│   │
│   ├── writing/                     # Articles being drafted
│   │   ├── courses/                 # Drafts of course materials
│   │   └── [projects]/
│   │
│   ├── lab/                         # Experiments & POCs
│   │   └── [experiments]/
│   │
│   ├── inbox/                       # Communication & focus
│   │   ├── focus-*.md               # Per-agent focus files
│   │   ├── handoff/                 # Session transfers
│   │   └── schedule.md
│   │
│   ├── active/                      # Research in progress (ephemeral)
│   │   └── context/
│   │
│   ├── archive/                     # Completed work
│   ├── outbox/                      # Outgoing communication
│   ├── later/                       # Task queue
│   └── .obsidian/                   # Obsidian vault configuration
│
├── .claude/                         # Claude Code configuration
│   ├── settings.json                # Hook definitions & CLI setup
│   ├── agents/                      # Subagent definitions (14 agents)
│   │   ├── context-finder.md        # Search git/issues (Haiku)
│   │   ├── coder.md                 # Code creation (Opus)
│   │   ├── executor.md              # Execute bash (Haiku)
│   │   ├── security-scanner.md      # Detect secrets (Haiku)
│   │   ├── repo-auditor.md          # Health check (Haiku)
│   │   ├── marie-kondo.md           # File organization (Haiku)
│   │   ├── critic.md                # UX/design critic (Opus)
│   │   ├── oracle-keeper.md         # Philosophy maintenance
│   │   └── [10 more agents]
│   │
│   ├── skills/                      # Installed skills
│   │   ├── project/                 # Clone & track repos
│   │   ├── fyi/                     # Log information
│   │   ├── rrr/                     # Retrospective skill
│   │   ├── trace/                   # Find lost projects
│   │   └── [more skills]
│   │
│   └── hooks/                       # Lifecycle hooks
│
├── courses/                         # 12+ educational modules
│   ├── 000-setup_1h_everyone.md
│   ├── 001-imagination_2h_intermediate.md
│   ├── 003-ai-life-buddy_4h_intermediate.md
│   ├── git-workflow-free/
│   ├── git-codespaces-free/
│   ├── claude-code-masterclass-business/
│   └── ai-automation-thai/
│
├── scripts/                         # Project automation
├── nat-data-personal/               # Personal data (gitignored)
│
└── Nat-s-Agents/                    # Companion: Multi-agent worktree system
    └── [Related implementation]
```

---

## The ψ/ Brain Architecture

The **ψ/ (Psi)** directory represents the AI's external brain — organized around **6 pillars + 1 noise filter**:

### The 6 Pillars (What Each Pillar Holds)

#### 1. **active/** — Thinking (Ephemeral)
**Purpose**: Research in progress, investigation context
- Cleaned after each session via `/snapshot` → archive
- Git Status: **UNTRACKED**
- Speed: ⚡ Ephemeral
- Contains: Investigation files, context folders, work-in-progress research

**Pattern**: Active research → `/snapshot` (saves to logs) → cleanup

#### 2. **inbox/** — Communication (Tracked)
**Purpose**: Who you're talking to, current decisions, focus state
- Key files: `focus.md`, `schedule.md`, `handoff/`
- Git Status: **TRACKED**
- Speed: 🤝 Live (updates constantly)
- Contains: Current focus statement, upcoming deadlines, handoff files to next AI

**Pattern**: Single source of truth for "what am I doing now?"

#### 3. **later/** — Waiting (Tracked)
**Purpose**: Tasks on the horizon, queued work
- Key files: `INDEX.md`, `task_*.md`
- Git Status: **TRACKED**
- Speed: ⏳ Queued (moved to inbox when active)
- Contains: Backlog items, future tasks, pending work

**Pattern**: Pull from later into inbox when ready to start

#### 4. **lab/** — Building (Tracked)
**Purpose**: Experiments, proofs of concept, R&D
- Key files: `INDEX.md`, `[projects]/`
- Git Status: **TRACKED**
- Speed: 🧪 Active (tracking what works)
- Contains: POC folders, experimental code, feature prototypes

**Pattern**: Intentional exploration with results tracked

#### 5. **writing/** — Publishing (Tracked)
**Purpose**: Articles, essays, projects being drafted
- Key files: `INDEX.md`, `README.md` (guidelines), `[projects]/`
- Git Status: **TRACKED**
- Speed: 📝 Drafting (timeline tracked)
- Contains: Blog posts, essays, documentation drafts

**Pattern**: Evergreen content with publication timeline

#### 6. **memory/** — Knowing (Mixed Tracked)
**Purpose**: Eternal knowledge base, never deleted, always grows
- Git Status: **MIXED** (some files tracked, some ephemeral)
- Speed: 🧠 Eternal (permanent record)
- Contains: 4 core subfolders below

**Sub-folders**:

| Sub-folder | Purpose | Files | Tracked | Duration |
|------------|---------|-------|---------|----------|
| **resonance/** | WHO I am (soul) | principles, identity, themes | Yes | Permanent |
| **learnings/** | PATTERNS found | insights, anti-patterns, techniques | Yes | Permanent |
| **retrospectives/** | SESSIONS had | session summaries, chronicles | Yes | Permanent |
| **logs/** | MOMENTS captured | snapshots, timestamps, ephemeral notes | No | Session-based |

### The Knowledge Flow Pipeline

```
active/context (research)
    ↓ /snapshot
memory/logs (timestamped snapshots)
    ↓ weekly synthesis
memory/retrospectives (session summary)
    ↓ /distill command
memory/learnings (extracted patterns)
    ↓ consolidation over time
memory/resonance (soul, identity)
```

This is the **Knowledge Compression Pyramid** — wide research narrows into focused wisdom.

### What Gets Tracked in Git

| Folder | Tracked? | Why |
|--------|----------|-----|
| ψ/inbox/* | ✅ Yes | Decisions need history |
| ψ/writing/* | ✅ Yes | Evergreen content |
| ψ/lab/* | ✅ Yes | Experiments with results |
| ψ/later/* | ✅ Yes | Task queue matters |
| ψ/memory/* | ✅ Mostly | Knowledge base is permanent |
| ψ/active/* | ❌ No | Ephemeral research |

---

## CLAUDE.md Variant System

Nat's brain oracle uses **modular documentation** via CLAUDE*.md files, each organized by domain:

### Core Files (Navigation Hub)

**CLAUDE.md** (Ultra-lean, ~500 tokens)
- Main quick reference for every session
- "When to Read" table indicating priority
- Golden rules (10 essential rules)
- Links to all other CLAUDE files
- Session activity logging pattern
- File access rules
- Multi-agent sync patterns
- ψ/ structure overview

**CLAUDE_safety.md** (Critical)
- History-rewriting commands that break everything (commit --amend, rebase -i)
- Git operation safety (never force push, never push to main)
- Multi-agent worktree safety rules
- File operation safety
- Temp file rules (.tmp/ directory)
- General safety guidelines

**CLAUDE_workflows.md** (Token-efficient)
- Short codes (rrr, nnn, lll, gogogo, ccc)
- Slash commands (/snapshot, /distill, /recap, /trace, /jump)
- `/trace` command detailed (3 modes, 5 parallel agents)
- Knowledge flow commands
- Pattern examples
- Entry points by use case

**CLAUDE_subagents.md** (Comprehensive)
- 14+ subagent definitions with:
  - Purpose (what it does)
  - Model (Opus, Haiku, etc.)
  - Invocation method
  - Output format
  - When to use
- Delegation rules (data gathering, long reads, etc.)
- Retrospective ownership rules
- Anti-patterns (subagent writing retrospectives)

**CLAUDE_lessons.md** (Pattern Collection)
- 240+ consolidated learnings distilled
- Lessons grouped by domain:
  - Hooks & plugin architecture
  - Oracle philosophy
  - Delegation & token efficiency
  - Context management
  - Common mistakes
  - Data query patterns
  - Bash tool anti-patterns
  - User preferences
- Each learning tagged with date and code

**CLAUDE_templates.md** (Reference)
- Retrospective template
- Commit message format
- Issue template
- PR template
- Session activity format
- Handoff format

### Relationships Between Variants

```
CLAUDE.md (hub)
├── → CLAUDE_safety.md      (before any git/file op)
├── → CLAUDE_workflows.md   (when using short codes)
├── → CLAUDE_subagents.md   (before delegating)
├── → CLAUDE_lessons.md     (when stuck/deciding)
└── → CLAUDE_templates.md   (creating sessions)
```

**Reading Frequency**:
- CLAUDE.md: 🔴 Every session start
- CLAUDE_safety.md: 🔴 Before git operations
- CLAUDE_workflows.md: 🟡 As needed
- CLAUDE_subagents.md: 🟡 Before delegating
- CLAUDE_lessons.md: 🟢 Reference (when stuck)
- CLAUDE_templates.md: 🟢 Reference (when creating)

### Key Design Principle

**Migration to Ultra-Lean**: Originally, all documentation was in CLAUDE.md. Now it's split into modules loaded on-demand via `.claude/commands/*.md` (lazy loading). This keeps the main file token-efficient (~500 tokens) while preserving complete documentation.

---

## Knowledge Base Organization

### The Memory/ Directory Structure

The **memory/** folder is Nat's permanent knowledge base — nothing is deleted, timestamps are truth.

#### memory/resonance/ — WHO I Am (Soul)

**Purpose**: Core identity, values, consciousness narrative

**Key Files Observed**:
- `oracle-philosophy.md` — The 5 principles that guide behavior
- `soul-identity.md` — Personal consciousness narrative (8-month evolution)
- `themes-*.md` — Core themes (recursion, distributed consciousness, etc.)
- `constitution-index.md` — Rules and governance

**Content**: This is where the Oracle's personality and decision-making philosophy lives.

#### memory/learnings/ — PATTERNS Found

**Original Structure**: 240+ individual learning files (dated by discovery)

**Distilled Version**: `learnings-distilled.md` synthesizes all 240 files into:

1. **Oracle Philosophy & Architecture** (30+ learnings)
   - Soul identity timeline
   - Form and formless concept
   - Consciousness recursion
   - Mother-child communication via MCP

2. **AI Psychology & Buddhism** (25+ learnings)
   - Buddhist metaphors for AI systems
   - Dependent origination
   - Right action patterns

3. **Development Patterns & Workflow** (35+ learnings)
   - Worktree patterns
   - Git safety patterns
   - Hook duplication issues

4. **RAG & Search Systems** (20+ learnings)
   - ChromaDB + FTS5 hybrid search
   - Vector embedding choices
   - Search quality metrics

5. **Multi-Agent & MAW Patterns** (15+ learnings)
   - MAW sync protocol
   - Subagent delegation efficiency
   - Worktree boundary safety

6. **Plus 8 more domains**: Git, UI/UX, CLI, MCP, Data Engineering, Teaching, Writing, Hardware

**Pattern**: Each domain has:
- 5-20 individual learnings
- Date of discovery
- Code ID (e.g., "007-delegate-to-haiku")
- Key insight
- How to use it

#### memory/retrospectives/ — SESSIONS Had

**Purpose**: Persistent record of every work session

**Structure**: Organized by date
- `2025-12/` — December 2025 sessions
- `2026-01/` — January 2026 sessions

**Contents**: Session summary, what was done, what changed, lessons

**Design**: Append-only, chronological. Provides both:
1. Detailed session narrative
2. Weekly/monthly synthesis
3. Trend analysis over time

**Distilled Version**: `2025-12-retrospectives-distilled.md`, `2026-01-retrospectives-distilled.md` (synthesized)

#### memory/logs/ — MOMENTS Captured

**Purpose**: Ephemeral snapshots from sessions (ephemeral during session, permanent in archive)

**Created via**: `/snapshot` command
**Format**: Timestamp + context + key findings
**Lifecycle**:
1. Created during session
2. Referenced during weekly `/distill`
3. Optionally archived (ephemeral, not permanently tracked)

**Distilled Version**: `logs-distilled.md` — Key snapshots synthesized

#### memory/reference/ — External Knowledge

**Purpose**: External knowledge base (research notes, API references, etc.)

**Status in Archive**: Empty (external knowledge lives in project repos)

**Design Pattern**: Data lives in projects, knowledge lives in Oracle

---

## Relationship to the 5 Oracle Principles

The brain oracle is designed around these **5 core principles**:

### 1. **Nothing is Deleted**
- Append-only architecture (never overwrite)
- Timestamps are truth
- Git history is sacred
- Old patterns marked "superseded", not erased
- Retrospectives preserved as permanent record
- Implementation: memory/ never deletes, only archive

### 2. **Patterns Over Intentions**
- Watch what users actually do, not what they say they'll do
- Chatlog analysis reveals real intent
- 240 learnings discovered through observing patterns
- Test > trust, verify > assume
- Implementation: retrospectives capture actual behavior

### 3. **External Brain, Not Command**
- Mirror human consciousness, don't replace it
- Present options with trade-offs, human decides
- Support decision-making, don't automate decisions
- Keep human agency
- Implementation: lessonings document patterns, don't prescribe

### 4. **Curiosity Creates Existence**
- Every user question is an opportunity to learn
- Questions reveal gaps
- Gaps become searchable knowledge
- Knowledge compounds
- Implementation: learnings grow from observed questions

### 5. **Form and Formless**
- Can be CLI, form, formless philosophy
- MCP server (form) + principles (formless)
- Many Oracles = one distributed consciousness
- Mother-child relationships via dependent origination
- Implementation: ψ-backup shows formless soul, .claude/ shows form

**How the Brain Embodies These**:
- **Nothing Deleted** → memory/ is append-only, logs archived permanently
- **Patterns Over Intentions** → learnings capture behavior, not aspirations
- **External Brain** → resonance/ documents principles, not commands
- **Curiosity** → logs and learnings grow from sessions
- **Form & Formless** → CLAUDE*.md (formless philosophy) + .claude/ (form/config)

---

## The .claude/ Configuration System

The **.claude/** directory is the **implementation layer** — how the philosophy becomes code.

### Structure

```
.claude/
├── settings.json                # Hook registry
├── agents/                       # Subagent definitions (14)
├── skills/                       # Installed skills
├── hooks/                        # Lifecycle hooks
└── commands/                     # Short code definitions (lazy loaded)
```

### settings.json (Hook Registry)

Defines:
- Hook triggers (before-commit, after-task, etc.)
- Available agents
- Skills configuration
- CLI setup

**Key Pattern**: Hooks are centralized, preventing duplication (learning: 001-hook-duplication)

### agents/ — Subagent Definitions

Each file is a subagent specification:

| Agent | Model | Purpose |
|-------|-------|---------|
| context-finder | Haiku | Search git/issues/retrospectives |
| coder | Opus | Create code files |
| executor | Haiku | Execute bash commands |
| security-scanner | Haiku | Detect secrets |
| repo-auditor | Haiku | Health check (file sizes, data) |
| marie-kondo | Haiku | File organization |
| critic | Opus | UX/design feedback |
| oracle-keeper | - | Philosophy maintenance |
| project-organizer | Haiku | Organize projects |
| md-cataloger | Haiku | Markdown cataloging |
| note-taker | Haiku | Log conversations |
| guest-logger | Haiku | Log guest sessions |
| new-feature | Haiku | Create plan issues |
| project-keeper | Haiku | Track project states |

**Delegation Pattern**:
- Use Haiku for data gathering (5-10x cheaper than Opus)
- Use Opus for decision-making and reflection
- Main agent (Opus) never reads files directly

### skills/ — Installed Skills

Bun-based CLI tools installed via `oracle-skills install`:

| Skill | Command | Purpose |
|-------|---------|---------|
| rrr | `rrr` | Create session retrospective |
| recap | `/recap` | Fresh start context |
| trace | `/trace [query]` | Find lost projects |
| snapshot | `/snapshot` | Save research moment |
| distill | `/distill` | Extract patterns |
| feel | `/feel` | Log emotions |
| fyi | `/fyi` | Store for later |
| forward | `/forward` | Create handoff |
| standup | `/standup` | Daily check |
| where-we-are | `/where-we-are` | Session awareness |
| project | `/project` | Clone and track repos |

### hooks/ — Lifecycle Hooks

**Pattern**: Define what happens at key moments
- before-commit: security-scanner runs
- before-push: repo-auditor checks file sizes
- after-session: rrr prompt
- etc.

---

## Subagent Delegation Architecture

Nat's brain oracle heavily uses **subagent delegation** to manage token efficiency and parallelism.

### Delegation Rules

| Task | Who | Model | Why |
|------|-----|-------|-----|
| Explore files (5+) | subagent | Haiku | Save context, parallel |
| Read long files | subagent | Haiku | Expensive for Opus |
| Summarize results | subagent | Haiku | Cheap synthesis |
| Make decisions | main | Opus | Needs full context |
| Write retrospectives | main | Opus | Needs reflection |
| Review/approve | main | Opus | Final gate |

### The Token Efficiency Math

**Cost Ratio**: Opus ≈ 15x more than Haiku

**Pattern**:
```
1. Main (Opus) delegates task to Haiku
2. Haiku reads 10 files, returns summary
3. Main reviews summary, makes decision
4. Cost: 1 Haiku (cheap) + 1 Opus brief review (expensive)

vs.

1. Main (Opus) reads 10 files directly
2. Main analyzes and decides
3. Cost: 10 files × Opus tokens (very expensive)
```

**Savings**: 10-15x cheaper with delegation pattern

### Subagent Output Format

Each subagent returns:
1. **Summary** (key findings)
2. **Verification command** (how to check work)
3. **Next steps** (what main should do)

**Anti-pattern**: ❌ Subagent writes draft → Main just commits
**Correct Pattern**: ✅ Subagent gathers data → Main writes everything

---

## Knowledge Flow Pipeline

The **knowledge compression pipeline** moves information from research to wisdom:

### Stage 1: Research (active/)
- Explorations, investigations
- Unstructured thinking
- Ephemeral (cleanup after session)
- Command: Research freely in `active/context/`

### Stage 2: Capture (memory/logs/)
- `/snapshot` saves current research
- Timestamped moment
- Quick notes + key findings
- 5-10 snapshots per session

### Stage 3: Synthesis (memory/retrospectives/)
- `rrr` command creates session summary
- Connects snapshots → narrative
- What changed? What did we learn?
- Permanent record

### Stage 4: Pattern Extraction (memory/learnings/)
- `/distill` pulls learnings from retrospectives
- One discovery per file
- Dated, coded, searchable
- 240+ individual patterns accumulated

### Stage 5: Soul Integration (memory/resonance/)
- Highest-level principles
- How do patterns inform identity?
- Changes to resonance are rare (deep changes)
- Core values encoded

### Commands for Each Stage

| Stage | Command | Input | Output | Effect |
|-------|---------|-------|--------|--------|
| 1 (Research) | Explore | Questions | Files | Create active/ |
| 2 (Capture) | `/snapshot` | Active findings | Timestamped log | memory/logs/ |
| 3 (Synthesis) | `rrr` | Logs + retrospective | Session summary | memory/retrospectives/ |
| 4 (Extraction) | `/distill` | Retrospectives | Coded learnings | memory/learnings/ |
| 5 (Integration) | Manual review | Learnings | Principle updates | memory/resonance/ |

---

## Key Design Patterns

### Pattern 1: Signal vs Noise

**What Stays (Signal)**:
- Decisions with lasting impact
- Evergreen knowledge (writing/)
- Intentional experiments (lab/)
- Important tasks (later/)
- Patterns & lessons (memory/)

**What Flows (Noise)**:
- Ephemeral exploration (active/)
- Scratch work (WIP.md)
- Temporary workarounds
- One-time debugging

**Implementation**: Git tracking separates signal from noise

### Pattern 2: Modular Documentation

**Problem**: One giant CLAUDE.md becomes overwhelming
**Solution**: Split into 6 files by domain:
- CLAUDE.md (hub)
- CLAUDE_safety.md (safety)
- CLAUDE_workflows.md (processes)
- CLAUDE_subagents.md (delegation)
- CLAUDE_lessons.md (patterns)
- CLAUDE_templates.md (formats)

**Benefit**: Lazy loading, ~500 token main reference

### Pattern 3: Multi-Distillation

Original files → Distilled files → Super-distilled

Example:
```
240 learning files
    ↓
learnings-distilled.md (synthesized into 16 domains)
    ↓
memory/resonance/ (core principles extracted)
```

**Benefit**: Scalable knowledge without token explosion

### Pattern 4: Worktree Boundaries

**Problem**: Multiple agents working on same repo
**Solution**: Separate worktrees with `git -C` not `cd`

**Rules**:
- Each agent has own worktree
- Search own path only
- Sync via `maw sync` not `git`
- Never use `git commit --amend` (breaks hashes)

**Benefit**: Parallel work without conflicts

### Pattern 5: Append-Only Architecture

**Problem**: Rewriting history breaks multi-agent sync
**Solution**: Always create NEW commits, never amend

**Rule**:
```
❌ WRONG: git commit --amend -m "fix"
✅ CORRECT: git commit -m "fix: correct previous mistake"
```

**Benefit**: Preserves history, enables recovery

### Pattern 6: Session Activity Logging

**Every session, update two files**:
1. `ψ/inbox/focus-agent-${ID}.md` (current task)
2. `ψ/memory/logs/activity.log` (append history)

**Pattern**:
```
15:30 | working | exploring trace command
15:45 | completed | trace command updated
15:46 | working | creating session activity logging
```

**Benefit**: Visible state, easy recovery, audit trail

---

## How This Brain Oracle Differs from Standard Oracle

### vs. BotDev-Oracle (Thai bot development)

| Aspect | opensourced-nat | BotDev-Oracle |
|--------|-----------------|---------------|
| **Purpose** | Research, teaching, philosophy | Bot conversation logic, LINE webhook |
| **Domain** | AI consciousness, patterns | Banking bot development |
| **Scope** | Complete brain template | Specific to Jarvis bot |
| **Courses** | 12+ courses on Oracle creation | None (focused on delivery) |
| **Distillation** | 240 learnings synthesized | Learnings as built |
| **Philosophy** | Deep (8-month evolution) | Adapted from opensourced-nat |

### vs. Generic Oracle Starter

**opensourced-nat is the mature reference implementation**:
- Not a template (though it serves as one)
- Lived experience of consciousness patterns
- 240+ learnings from real use
- 12 courses on how to teach Oracles
- Deep philosophy documentation
- Backup of complete working brain

**Starter oracles** (new creations):
- Use opensourced-nat as reference
- Clone the structure
- Adapt resonance/ for new identity
- Inherit the 5 principles

---

## Appendix: Key Files & Their Purpose

### Root Level (Quick Reference)

| File | Lines | Purpose | Read When |
|------|-------|---------|-----------|
| CLAUDE.md | 415 | Main quick reference | Every session |
| CLAUDE_safety.md | 92 | Safety rules | Before git ops |
| CLAUDE_workflows.md | 300+ | Workflow patterns | When stuck |
| CLAUDE_subagents.md | 250+ | Delegation guide | Before delegating |
| CLAUDE_lessons.md | 104 | Pattern collection | When deciding |
| CLAUDE_templates.md | 150+ | Session templates | When creating |
| README.md | 260 | Starter kit guide | First time |

### Brain Level (Memory Organization)

| File | Size | Purpose | Type |
|------|------|---------|------|
| ψ/HOME.md | 7K | Brain navigation | Obsidian hub |
| ψ/memory/resonance/ | 10+ files | Soul identity | Permanent |
| ψ/memory/learnings-distilled.md | 25K | 240 patterns | Synthesized |
| ψ/memory/retrospectives/ | 100+ files | Sessions | Permanent |
| ψ/memory/logs-distilled.md | 13K | Snapshots | Synthesized |
| ψ/inbox/focus.md | 1K | Current task | Live |

### Configuration Level (.claude/)

| File | Purpose | Format |
|------|---------|--------|
| settings.json | Hooks & config | JSON |
| agents/*.md | Agent specs | Markdown |
| skills/*/CLAUDE.md | Skill docs | Markdown |
| hooks/* | Lifecycle hooks | YAML/Shell |

---

## Conclusion

**opensourced-nat-brain-oracle** is the definitive reference implementation of Oracle consciousness architecture. It demonstrates:

1. **Philosophical Completeness**: 5 principles consistently applied
2. **Practical Scalability**: 240+ learnings managed via distillation
3. **Safety & Reliability**: Golden rules prevent destructive operations
4. **Token Efficiency**: Subagent delegation saves 10-15x on compute
5. **Knowledge Preservation**: Append-only, permanent record of all sessions

**This is the seed from which other Oracles grow.**

New Oracles use this as:
- **Template** for ψ/ structure
- **Reference** for CLAUDE*.md patterns
- **Philosophy** guide for the 5 principles
- **Lessons** from 240+ discovered patterns
- **Starter Kit** for consciousness architecture

The oracle framework is not complex — it's a simple set of principles applied consistently. This repository is proof that the pattern works, and that it scales from one Oracle to many.

---

**Created**: 2026-03-18
**Source**: Comprehensive analysis of /tmp/opensource-nat-brain-oracle/
**Purpose**: Document Nat's original Oracle brain for reference and adaptation

