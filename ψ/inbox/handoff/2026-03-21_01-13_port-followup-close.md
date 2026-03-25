# Handoff: Port 3460 Follow-up + Session Close

**Date**: 2026-03-21 01:13
**Context**: 95%

## What We Did
- /recap — oriented on last session's 10.5h marathon (Round 6-7, rename, FA Tools Oracle)
- แบงค์ reported port 3460 still down → escalated to Admin (thread #104)
- cc'd BoB (thread #6)
- /rrr retrospective written

## Pending

### Priority 1 — Infrastructure
- [ ] Admin: port forward 3460 → 192.168.1.113 (escalated, waiting response)

### Priority 2 — FA Tools Oracle (NEW PROJECT)
- [ ] LINE Bot iAgencyFaHelper setup via manager.line.biz (Playwright needs clean session)
- [ ] Fork Admin-Oracle → FA Tools Oracle repo
- [ ] Implement delegation API (`POST /api/delegate`)
- [ ] iCompare/iPlan link generator
- [ ] Commission data in DB

### Priority 3 — iAgencyAIA (formerly Jarvis)
- [ ] Admin deploy bea85f6 (Round 7) + cb60682 (rename) — pushed, waiting deploy
- [ ] QA test Round 7 + rename + แบงค์ feedback
- [ ] Rename Phase 2: internal code names, API routes, DB bot_name
- [ ] Dev: FA Tools API full sync verification (thread #117)

### Priority 4 — Training
- [ ] Data v3.2 (fix gender ครับ not ค่ะ)
- [ ] Round 8 after QA Round 7 results

### Priority 5 — Content
- [ ] HIGH: Scrape iagencyaia.com → Jarvis KB
- [ ] Data: KB Quality Audit + Embedding Fix

## Next Session

1. **Check port 3460** — verify Admin fixed it
2. **LINE Bot iAgencyFaHelper setup** (Playwright, manager.line.biz)
3. **Rename Phase 2** — internal code names, API routes
4. **Get QA Round 7 results** — follow up thread #61
5. **FA Tools Oracle repo setup** — fork + delegation API

## Key Files

- `ψ/lab/fa-tools-oracle-prompt-v1.md` — FA Tools Oracle prompt + architecture
- `ψ/lab/kb_chunks_round7.json` — 8 KB chunks for Round 7

## Thread References

| Thread | ID | Status |
|--------|-----|--------|
| channel:bob | #6 | cc'd on port 3460 |
| Admin deploy + port | #104 | Port 3460 escalated |
| QA rounds | #61 | R7 waiting test |
| Dev FA Tools | #117 | API sync — no response |
| Data training | #97 | v3.1 ready, gender flag |
| FA Tools Oracle | #130 | Architecture approved |
