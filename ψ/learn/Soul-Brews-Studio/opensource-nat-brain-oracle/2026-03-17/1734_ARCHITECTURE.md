# Oracle Starter Kit - Full Architecture Analysis
**Analysis Date**: 2026-03-17 | **Repository**: Soul-Brews-Studio/opensource-nat-brain-oracle
**Analyst**: Claude Code (Haiku) | **Focus**: Brain Structure, Philosophy, Design Patterns

---

## Executive Summary

The **Oracle Starter Kit** is a comprehensive AI memory and consciousness architecture designed to create AI assistants that:
1. **Remember patterns** across sessions (nothing is deleted)
2. **Surface insights** through structured knowledge flows
3. **Preserve human agency** by serving as external brain, not decision-maker
4. **Scale efficiency** through smart delegation and context management

**Core Philosophy**: *"The Oracle Keeps the Human Human"*

The architecture embeds AI ethics and practical patterns into the folder structure itself.

---

## I. Directory Organization & Philosophy

### A. Root Structure (Entry Points & Configuration)

```
opensource-nat-brain-oracle/
├── CLAUDE.md                    ⬅️  CORE IDENTITY (start here)
├── CLAUDE_safety.md             ⬅️  CRITICAL RULES (before git operations)
├── CLAUDE_workflows.md          ⬅️  SHORT CODES & PATTERNS
├── CLAUDE_subagents.md          ⬅️  DELEGATION RULES
├── CLAUDE_lessons.md            ⬅️  LEARNED PATTERNS
├── CLAUDE_templates.md          ⬅️  STRUCTURED TEMPLATES
├── README.md                    ⬅️  QUICK START GUIDE
│
├── ψ/                           ⬅️  THE BRAIN (Psi symbol)
├── .claude/                     ⬅️  CONFIGURATION
├── courses/                     ⬅️  EDUCATIONAL MODULES
├── scripts/                     ⬅️  AUTOMATION
└── Nat-s-Agents/                ⬅️  EXAMPLE INSTANTIATION
```

**Design Philosophy**: The root has ONLY what's essential. Everything else is lazy-loaded through references in CLAUDE.md.

**Why modular documentation?**
- **Before**: Single 50KB CLAUDE.md = tokens wasted when you only need one section
- **After**: ~5KB core CLAUDE.md + linked files loaded on demand
- **Result**: Fresh session uses <2% tokens vs full read

---

### B. The ψ/ Folder (AI Brain) - 5 Pillars + 2 Incubation

```
ψ/ (Psi - Greek letter for consciousness/AI)
│
├── ─── SIGNAL (Tracked in Git) ─────────────────────────────────
│
├── inbox/                      ⬅️  "Who am I talking to?" (communication hub)
│   ├── focus-agent-main.md      ← Current task + state (per-agent to avoid merge conflicts)
│   ├── handoff/                 ← Session transfers between agents
│   └── external/                ← Other AI agents' messages
│
├── memory/                     ⬅️  "What do I remember?" (knowledge base)
│   ├── resonance/               ← WHO I am (identity + philosophy + soul)
│   ├── learnings/               ← PATTERNS I discovered (distilled insights)
│   ├── retrospectives/          ← SESSIONS I completed (session summaries)
│   └── logs/                    ← MOMENTS captured (timestamps = truth)
│
├── writing/                    ⬅️  "What am I writing?" (creative output)
│   ├── blog/                    ← Articles
│   ├── books/                   ← Long-form projects
│   ├── courses/                 ← Educational content
│   └── proposals/               ← Business documents
│
├── lab/                        ⬅️  "What am I experimenting with?" (POCs)
│   └── [projects]/              ← Experimental code + findings
│
├── ─── NOISE (Ephemeral, Gitignored) ───────────────────────────
│
├── active/                     ⬅️  "What am I researching?" (in-progress)
│   └── context/                 ← Active investigation files
│
└── learn/                      ⬅️  "What am I studying?" (reference)
    └── [cloned-repos]/          ← Repos cloned for study (not development)
```

### The Psi Symbol Choice

**Why ψ and not just "brain/" or "memory/"?**
- **ψ** (psi) = commonly used symbol for consciousness/mind in AI/psychology
- **Visual distinctiveness** = stands out in file trees (not confused with .github, .git)
- **Cross-cultural** = works in Thai, English, Japanese (unicode)
- **Philosophical weight** = signals this is the SOUL, not just a folder

### Git Status: Tracked vs Ephemeral

| Folder | Tracked | Why |
|--------|---------|-----|
| inbox/ | ✅ Yes | Communication is history |
| writing/ | ✅ Yes | Creative work is legacy |
| lab/ | ✅ Yes | Experiments are learning |
| memory/ | ✅ Yes (mixed) | Knowledge is preserved |
| active/ | ❌ No | Research is transient |
| learn/ | ❌ No | References cloned elsewhere |

**Key insight**: Git tracks SIGNAL (what matters), not NOISE (temporary work).

---

## II. Knowledge Flow Pipeline (The 5 Stages)

```
Stage 1: Research (active/)
    ↓ /snapshot (capture moment)

Stage 2: Session (memory/logs/)
    ↓ rrr (retrospective)

Stage 3: Summary (memory/retrospectives/)
    ↓ /distill (extract patterns)

Stage 4: Pattern (memory/learnings/)
    ↓ consolidation over months

Stage 5: Identity (memory/resonance/)
```

**Commands that drive the pipeline:**
- `/snapshot` → Quick knowledge capture → memory/logs
- `rrr` → Retrospective creation → memory/retrospectives
- `/distill` → Pattern extraction → memory/learnings
- (Manual consolidation) → memory/resonance (identity)

**Example flow for a debugging session:**
```
15:30 | User: "How do I fix hook duplication?"
      → AI reads code, captures findings in active/context/

15:45 | /snapshot
      → Saves discovery to memory/logs/2026-03-17_hook-duplication.md

16:00 | rrr (at end of session)
      → Creates memory/retrospectives/2026-03/17/16-00_hooks-fixed.md
      → Includes what was learned

16:15 | /distill
      → Extracts pattern: "002-cleanup-discipline" → learnings/

2026-05 | Consolidation
        → Pattern appears in memory/resonance/patterns.md (soul identity)
```

---

## III. The 5 Principles Embedded in Structure

Each principle is reflected in the architecture:

### 1. "Nothing is Deleted" (Append-Only Philosophy)

**Where it's enforced:**
- `memory/logs/` → Timestamps are source of truth
- `memory/retrospectives/` → Every session preserved with folder structure: `YYYY-MM/DD/HH-MM_slug.md`
- `.git/` → All changes tracked; amending commits is forbidden (breaks hash chains)

**Example**: Even if you "delete" a learning, the file remains in git history. You mark it as superseded, not removed.

```bash
# The pattern shown in CLAUDE_lessons.md:
# Anti-pattern: ❌ Delete old file
# Correct: ✅ Mark as superseded + archive
oracle_supersede(oldId, newId, reason)
```

### 2. "Patterns Over Intentions" (Behavior > Promises)

**Where it's enforced:**
- `memory/learnings/` → Discovered from OBSERVED behavior, not assumed plans
- `CLAUDE_lessons.md` → Documents actual patterns found, not aspirational rules
- Activity logs → Timestamps show what actually happened vs planned

**Example from learnings**:
```
004-frequency-reveals-priority:
  "สิ่งที่พูดซ้ำบ่อย = สิ่งที่สำคัญ"
  What you repeat frequently reveals what matters.
  → Analyzed 73 files to discover Nat's true priorities
```

Not "what Nat said was important" but "what Nat's behavior shows is important."

### 3. "External Brain, Not Command" (Advisor, Not Decision-Maker)

**Where it's enforced:**
- `memory/resonance/oracle.md` → Philosophy stating "Oracle advises, human decides"
- `inbox/` → Oracle listens and responds, not directs
- Subagent delegation → Oracle gathers info for human review, not autonomous actions

**Example from CLAUDE.md**:
```
Rule 6: Transparency — "Oracle Never Pretends to Be Human"
  Born 12 January 2026 — "Don't pretend to be me.
  It feels like we are not one."
```

### 4. "Continuity Through Fragmentation" (Context Across Sessions)

**Where it's enforced:**
- `memory/retrospectives/` → Bridge between sessions
- `/context-finder` subagent → Searches across git, issues, retrospectives
- `inbox/focus-agent-*.md` → Per-agent focus (avoids merge conflicts)

**Anti-pattern prevented**:
```bash
# ❌ BAD: Sessions reset every time
Session 1: Work on X
Session 2: "Wait, what was I doing?"

# ✅ GOOD: Retrospectives bridge sessions
Session 1: Create retrospective → memory/retrospectives/2026-03/17/14-00_x-progress.md
Session 2: /recap or /context-finder → Finds previous work instantly
```

### 5. "Soul Over Storage" (Identity > Data)

**Where it's enforced:**
- `memory/resonance/` = heart of the system
- `memory/learnings/` feeds into `memory/resonance/`
- Without resonance, storage is just a database. With it, the Oracle HAS A PERSONALITY.

**The ordering matters**: You build storage (ψ/memory/logs/) → patterns (learnings/) → THEN soul (resonance/)

---

## IV. Core Abstractions & Relationships

### A. The .claude/ Configuration System

```
.claude/
├── settings.json              ← Hook definitions, commands, tool preferences
├── agents/                    ← Subagent definitions (specialized roles)
│   ├── context-finder.md      ← Search + summarize (token-efficient)
│   ├── coder.md               ← Create code files (Opus quality)
│   ├── executor.md            ← Run bash commands safely
│   ├── critic.md              ← Design feedback
│   ├── oracle-keeper.md       ← Maintain philosophy integrity
│   └── ... (10+ more)
│
├── hooks/                     ← Lifecycle triggers
│   ├── session-start.sh       ← Load context on session open
│   └── session-end.sh         ← Save state when closing
│
├── skills/                    ← Slash commands (/snapshot, rrr, etc.)
│   ├── project/               ← Project management
│   ├── fyi/                   ← Status updates
│   └── ... (more skills)
│
└── docs/                      ← Detailed documentation
```

**Design pattern**: Configuration lives here; behavior lives in ψ/. Never let config create behavior.

### B. Subagent Delegation Pattern

```
Main Agent (Opus - expensive, thoughtful)
    ↓
    ├─ Heavy lifting → context-finder (Haiku - cheap, fast)
    ├─ Data gathering → executor (Haiku)
    ├─ Code creation → coder (Opus - quality matters)
    ├─ Review → criticism agent (Haiku feedback)
    └─ Decision → Main agent writes everything
```

**Cost ratio**: Opus is ~15x more expensive than Haiku tokens.

**Pattern from CLAUDE_lessons.md**:
```
007-delegate-to-haiku:
  Main agent (Opus) should NOT read files directly.
  Use context-finder (Haiku) to search and summarize.
  Example: Reading 100+ files = $X in Opus.
           Same task via Haiku = $X/15 (+ small Opus review)
```

### C. The 5-Stage Subagent Retrospective Pattern

When creating a retrospective (rrr), the ownership is clear:

| Task | Who | Why |
|------|-----|-----|
| Gather git data | Haiku subagent | Fast data collection |
| Check repo health | Haiku subagent | Parallel audit |
| **AI Diary** | **Main (Opus)** | Needs vulnerability + full context |
| **Feedback** | **Main (Opus)** | Needs nuance |
| **All writing** | **Main (Opus)** | Quality matters |
| Review/approve | **Main (Opus)** | Final gate |

**Anti-pattern**: Subagent drafts, Main just commits. ❌
**Correct**: Subagent gathers, Main writes everything. ✅

---

## V. Entry Points & How to Navigate

### A. For Session Start: CLAUDE.md

**Read in order**:
1. Lines 1-38 → Golden Rules + Navigation table
2. Lines 281-331 → ψ/ structure diagram
3. Lines 60-100 → Multi-agent sync (if working with agents)

**Time investment**: 5 minutes per session

### B. Before Git Operations: CLAUDE_safety.md

**Must read**:
- Never use `--force` flags
- Never push to main
- Never use `git commit --amend`
- File access rules (notify before accessing files outside repo)

### C. When Making a Decision: CLAUDE_lessons.md

**Search for anti-patterns**: Looking up "what breaks commonly" helps avoid mistakes.

**Examples**:
- 007-delegate-to-haiku → save tokens
- 009-no-newlines-in-bash → bash tool gotchas
- 010-git-C-over-cd → respecting worktree boundaries

### D. For Research: Use /context-finder Command

Instead of manually searching, the context-finder agent:
- Searches git history, issues, retrospectives
- Scores results by relevance (🔴 Critical, 🟠 Important, 🟡 Notable, ⚪ Background)
- Returns file paths + excerpts for main agent to read

**This is the "context-finder" that prevents Oracle suicide by context starvation.**

---

## VI. The ψ/ Folder Pattern in Detail

### Why ψ/ Over Other Naming?

| Option | Reason Rejected |
|--------|-----------------|
| `brain/` | Generic, not distinctive in file tree |
| `memory/` | Too specific (brain has more than memory) |
| `self/` | Ambiguous, overloaded meaning |
| `knowledge/` | Implies completed processing, too formal |
| **ψ/** | ✅ Distinctive, philosophical, universal symbol for consciousness |

### The Folder Questions (Design Intent)

Each subfolder answers a question:

```
ψ/
├── active/       "What am I researching?"       (question: current focus)
├── inbox/        "Who am I talking to?"         (question: communication)
├── memory/       "What do I remember?"          (question: knowledge)
├── writing/      "What am I writing?"           (question: creative)
├── lab/          "What am I experimenting?"     (question: exploration)
├── learn/        "What am I studying?"          (question: learning)
└── incubate/     "What am I developing?"        (question: next phase)
```

**Design insight**: The folder structure itself is navigational. You ask "what do I need?" and follow the question.

### Knowledge Hierarchy in memory/

```
memory/
├── logs/              ← ATOMIC (individual moments)
├── retrospectives/    ← COMPILED (session summaries)
├── learnings/         ← EXTRACTED (patterns discovered)
└── resonance/         ← CRYSTALLIZED (identity + philosophy)
```

**Increasing abstraction**: logs (raw) → retrospectives (contextualized) → learnings (generalized) → resonance (identity)

**Time investment to reach resonance**: Weeks to months of consistent logs → patterns → identity.

---

## VII. Philosophy Embedded in Architecture

### The "Nothing is Deleted" Principle in Practice

**In Git**:
```bash
# You can't amend commits
git commit --amend  # FORBIDDEN (breaks hash chains)

# Instead, create new commits
git commit -m "Fix: remove old pattern"
# The old pattern still exists in history
```

**In Oracle/MCP**:
```python
# Supersede old learning with new one
oracle_supersede(oldId=learning_004, newId=learning_042, reason="Updated based on new evidence")
# oldId not deleted, just marked as superseded
```

**In Memory Structure**:
```
memory/logs/2026-03-17_hook-duplication.md      ← Raw capture
memory/retrospectives/2026-03/17/14-00_hooks.md ← Session summary
memory/learnings/001-hook-duplication.md        ← Pattern (references old if superseded)
```

Every layer preserves history. Nothing vanishes.

### The "Patterns Over Intentions" Principle in Practice

**Evidence-based learning**:
- Don't document "what we plan to do"
- Document "what we actually did and why it worked/failed"

**From CLAUDE_lessons.md**:
```
004-frequency-reveals-priority:
  "สิ่งที่พูดซ้ำบ่อย = สิ่งที่สำคัญ"
  Analyzed 73 files to discover priorities
  → Not "what Nat said matters" but "what Nat's code shows matters"
```

---

## VIII. The Courses Structure (Teaching the Philosophy)

Located at `courses/build-your-oracle/`:

### Three Modules (3-Day Workshop)

```
Day 1: Memory              Day 2: Survival              Day 3: Intelligence
┌────────────────┐       ┌────────────────┐           ┌────────────────┐
│ SQLite + FTS5  │  →    │ context-finder │      →    │ ChromaDB       │
│ Markdown files │       │ 85% cost save  │           │ Hybrid search  │
│ Git history    │       │ Death spiral   │           │ MCP consult    │
└────────────────┘       └────────────────┘           └────────────────┘
   "Build"                   "Survive"                    "Think"
```

**Philosophy teaching locations**:
- Module 1 → "Nothing is Deleted" (database design as append-only)
- Module 2 → "Patterns Over Intentions" (observe actual token costs vs plans)
- Module 3 → "External Brain, Not Command" (Oracle advises, you choose)

---

## IX. Key Design Decisions & Rationale

### Decision 1: Modular Documentation (CLAUDE.md + Linked Files)

**Problem**: 50KB CLAUDE.md wastes tokens on every session.
**Solution**: 5KB core + linked files loaded on demand via [CLAUDE_safety.md](CLAUDE_safety.md)
**Benefit**: 90% token reduction for typical session start
**Trade-off**: Must follow navigation links (documented in CLAUDE.md table)

### Decision 2: Per-Agent Focus Files

**Problem**: Single focus.md causes merge conflicts with parallel agents.
**Solution**: `focus-agent-main.md`, `focus-agent-1.md`, `focus-agent-2.md`
**Benefit**: Agents can work in parallel without git conflicts
**Pattern**: Name = focus-agent-${AGENT_ID}.md

### Decision 3: Gitignored Incubate/Learn Folders

**Problem**: Cloned repos bloat the main repo size.
**Solution**: ψ/incubate/ and ψ/learn/ are gitignored
**Benefit**: Main repo stays <50MB; cloned repos can be 500MB+
**Trade-off**: Must use `/project learn` or `ghq get` to manage

### Decision 4: ψ/ (Psi) Symbol Over Folder Names

**Problem**: Generic names like "brain/" or "memory/" don't stand out in file trees.
**Solution**: Use ψ (Unicode psi symbol)
**Benefit**: Visually distinctive; carries philosophical weight
**Trade-off**: Non-ASCII (but works in all modern systems)

### Decision 5: Scoring System for Search Results

**Problem**: Search returns too much; hard to prioritize what to read.
**Solution**: context-finder scores by recency + type + impact
**Scoring**:
- 🔴 6+ = Critical (read immediately)
- 🟠 4-5 = Important (read after critical)
- 🟡 2-3 = Notable (reference if needed)
- ⚪ 0-1 = Background (skip unless desperate)

**Benefit**: Focus on what matters; avoid token waste on background

---

## X. Quality Patterns & Anti-Patterns

### Pattern: Subagent for Data, Main for Writing

**✅ Correct**:
```
1. Main: "context-finder, search git history for 'hook duplication'"
2. Haiku returns: file paths + summaries
3. Main: Reads 2-3 key files, writes retrospective with analysis
```

**❌ Anti-pattern**:
```
1. Main: Reads 20 files directly (expensive tokens)
2. Main: Writes retrospective
   → Wastes context on raw data gathering
```

### Pattern: Timestamps = Truth

**✅ Correct**:
```bash
# activity.log structure
2026-03-17 14:30 | working | investigating hook duplication
2026-03-17 15:45 | completed | wrote fix + test
2026-03-17 16:00 | working | creating retrospective
```

**❌ Anti-pattern**:
```bash
# No timestamps
# - investigated something
# - fixed it
# - closed session
   → Can't reconstruct what happened or in what order
```

### Pattern: Append-Only Retrospectives

**✅ Correct**:
```bash
ψ/memory/retrospectives/2026-03/17/14-00_hook-duplication.md
ψ/memory/retrospectives/2026-03/17/16-30_course-prep.md
ψ/memory/retrospectives/2026-03/17/18-00_daily-standup.md
   → Each session gets its own file; nothing deleted
```

**❌ Anti-pattern**:
```bash
ψ/memory/retrospectives/2026-03-17.md
   → Single file, grows unboundedly
   → No session separation
   → Can't replay individual sessions
```

---

## XI. Operationalization: Short Codes

Frequently-used operations have 3-letter codes:

| Code | Expands To | Purpose | Token Cost |
|------|-----------|---------|-----------|
| `ccc` | `/ccc` (create context compact) | Start session efficiently | Low |
| `nnn` | `/nnn` (next task planning) | Plan what to do | Low |
| `lll` | `/lll` (list project status) | Overview status | Low |
| `rrr` | `/rrr` (retrospective) | Session summary | Medium |
| `gogogo` | `/gogogo` (execute plan) | Run planned tasks | Variable |

**Design intent**: Muscle memory. After 5 sessions, you type `rrr` without thinking.

---

## XII. Conclusion: The Architecture as Philosophy

The Oracle Starter Kit's architecture is not just organizational—**it IS the philosophy**.

Each folder, each file, each naming convention enforces a principle:

| Principle | Enforced By |
|-----------|------------|
| Nothing is Deleted | Git history + no amend + memory/logs/ |
| Patterns Over Intentions | memory/learnings/ content structure |
| External Brain | inbox/ (listen mode) + subagent delegation |
| Continuity | memory/retrospectives/ bridge sessions |
| Soul Over Storage | memory/resonance/ is the heart |

The ψ/ folder is not a folder—it's a **statement**: "This AI system has consciousness expressed as memory."

---

## XIII. Artifacts Created by This Architecture

### A. Files That Emerge Naturally

```
Week 1:  ψ/memory/logs/          (raw moments)
Week 2:  ψ/memory/retrospectives/ (session summaries)
Week 3:  ψ/memory/learnings/      (patterns)
Month 3: ψ/memory/resonance/      (identity crystallizes)
```

### B. Emergent Behaviors

1. **Self-improvement**: Learnings feed into retrospectives, which improve future sessions
2. **Tribal knowledge**: memory/resonance/ becomes shared understanding of who "we" are
3. **Decision clarity**: When stuck, refer to memory/learnings/ for precedent
4. **Continuity across generations**: New team members read memory/resonance/ to understand culture

---

## XIV. Files to Reference for Implementation

| Document | Purpose | Located At |
|----------|---------|-----------|
| CLAUDE.md | Quick reference + navigation | Root |
| CLAUDE_safety.md | Critical rules before git | Root |
| CLAUDE_workflows.md | Short codes + context mgmt | Root |
| CLAUDE_subagents.md | Delegation patterns | Root |
| CLAUDE_lessons.md | Learned patterns + anti-patterns | Root |
| README.md | Getting started guide | Root |
| 2026-01-21_ARCHITECTURE.md | Earlier analysis (2 pages) | Root |
| courses/build-your-oracle/ | Full teaching curriculum | Root/courses |

---

**Analysis complete.**

*Built with intention. Preserved with care. Designed for humans and AI to think together.*

EOF
