# Handoff: icompare Bug Fix + Context Guardian Hook Prep

**Date**: 2026-03-22 23:47
**Context**: 95%

## What We Did
- Investigated urgent bug: icompare Health Starter ผลประโยชน์เพิ่มเติมไม่แสดง (from BoB thread #22)
- Root cause: `useCompareMode.ts` missing `product_uid` lookup (PlanMode had it, CompareMode didn't)
- Applied fix: Added Step 0 `product_uid` lookup before `plan_name` matching
- Started test server on port 5174 — แบงค์ said test first, don't push
- Wrote /rrr retrospective + lesson learned + oracle_learn sync

## Pending

### Priority 1 — icompare Bug (IN PROGRESS)
- [ ] แบงค์ confirms fix on test server (port 5174)
- [ ] If confirmed → commit + push to iagencyaiafatools
- [ ] Report to BoB: `/talk-to bob "icompare Health Starter fix done — สรุป: ..."`

### Priority 2 — Session Restart Prep (แบงค์ ordered)
- [ ] Install context-guardian hook (Law #8 — auto /rrr + /forward at 80% context)
- [ ] Add Law #8 (Context 80% auto rrr+forward) — ALREADY in CLAUDE.md
- [ ] Add Law #9 (if any new law from แบงค์)

### Priority 3 — Backlog
- [ ] Reply to BoB standup request (thread #22, msg 1240)
- [ ] Port forward 3460 → still waiting Admin
- [ ] FA Tools Oracle setup (LINE Bot, fork, delegation API)
- [ ] Commit 26+ untracked ψ/ brain files
- [ ] Scrape iagencyaia.com → Jarvis KB

## Key Files
- `iagencyaiafatools/src/hooks/useCompareMode.ts` — bug fix (uncommitted in fatools repo)
- `iagencyaiafatools/src/components/PlanMode.tsx` — reference for correct pattern
- `CLAUDE.md` — updated with Law #8 (context guardian)
- `.claude/settings.json` — modified (likely hook changes)

## Notes
- Test server running: `http://localhost:5174` (Vite dev, iagencyaiafatools)
- Production FA Tools: `http://vuttihome.thddns.net:5173`
- HR feedback: need to ship more feat commits, not just LAW-sync
