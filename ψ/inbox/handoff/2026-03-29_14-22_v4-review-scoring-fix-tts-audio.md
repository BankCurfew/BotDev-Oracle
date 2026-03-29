# Handoff: v4 Behavioral Evidence Review + QA Scoring Fix + TTS Audio Generation

**Date**: 2026-03-29 14:22 GMT+7
**Context**: ~80% (compacted once mid-session)

## What We Did

### 1. v4 Behavioral Evidence Draft Review (#11)
- Read full 2,151-line draft (offset 550→2151 after compaction)
- Simulated 8 personas through scoring engine
- Found 3 bugs: MC5C wrong dimension, SS1 flat scoring (only 2 distinct levels), no CD gap-fill
- Posted findings to Writer thread #4

### 2. QA Scoring Engine Threshold Fix (#10) — URGENT
- QA 500-persona simulation: FA_PRIME 0%, 5/18 cards unreachable, Apprentice 46.9%
- Root cause: confidence guard (`score * 0.6 + 1.5 * 0.4`) creates floor of 0.6 for any answered dimension
- Fixed 6 bugs in `src/engine/scoring.ts`:
  - FA_PRIME goals `2.5→2.0` (single-Q max = 2.4 after guard)
  - Gate1 exit `3.0→5.0` (min 3-dim total = 1.8, not 0)
  - Gate2 grit `0.5→1.0` (min = 0.6 after guard)
  - Phoenix grit `<=0.5→<=1.0` across all 4 paths + tier demotion
  - Sage relaxed: SS `2.5→2.0`, MC cap `1.0→1.5`, commitment `2.0→1.5`
  - Warrior relaxed: `commitment>=2.0 + grit>=1.5` (dropped TR + CD requirements)
- **Commit**: `290d323`

### 3. TTS Audio Generation — 37 MP3 files total
- ElevenLabs API (George voice, eleven_multilingual_v2 model)
- 4 CD + 22 GF + 2 ambient = 28 initial files → **Commit**: `1c34d1d`
- 9 re-generated after Writer text update (894faa0) → **Commit**: `c147aae`
- Used direct curl (not MCP) due to API key env var isolation

### 4. Learnings Documented
- Confidence guard threshold cascade (P0 pattern)
- MCP server env var isolation workaround

## Pending

- [ ] **Writer**: fix 3 review items — MC5C bug, SS1 spread, add CD gap-fill (#11)
- [ ] **QA**: re-run 500-persona simulation after threshold fix (290d323) (#10)
- [ ] **Admin**: deploy all commits (ce1d006 through c147aae) to production
- [ ] **Add 2 competitive_drive gap-fill questions** — currently 0 backup for 12th dimension
- [ ] **Supabase**: add `competitive_drive` column to `quiz_sessions` table

## Next Session

- [ ] Check if Writer posted fixed draft → review again if so
- [ ] Check QA re-simulation results → fix any remaining threshold issues
- [ ] Verify deploy status with Admin
- [ ] If all v4 work landed → start Admin Dashboard redesign (#5) or progressive loading (#1)

## Key Files (fa-recruitment-quiz repo)

- `src/engine/scoring.ts` — scoring + card routing (6 fixes applied)
- `src/engine/questions.ts` — question phase logic
- `drafts/v4-behavioral-evidence-draft.ts` — Writer's v4 draft (2,151 lines)
- `public/audio/narration/` — 26 narration MP3s
- `public/audio/ambient/` — 2 ambient SFX
- `/tmp/generate_tts.sh` — TTS generation script (ElevenLabs API key + voice settings)

## Key Code Snippets (for next session context)

### Confidence guard formula (scoring.ts)
```typescript
// Bayesian regression toward midpoint for low-data dimensions
const guardedScore = rawScore * 0.6 + 1.5 * 0.4  // floor=0.6, ceiling=2.4 for single-Q
```

### Threshold fix pattern
```typescript
// OLD: grit <= 0.5 (impossible after guard — min is 0.6)
// NEW: grit <= 1.0 (reachable)

// OLD: goals >= 2.5 (impossible for single-Q — max is 2.4)
// NEW: goals >= 2.0 (reachable)
```
