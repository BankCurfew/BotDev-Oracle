# Handoff: Round 7 + FA Tools Oracle Project Launch

**Date**: 2026-03-21 00:53
**Context**: 90%

## What We Did (This Session — 10.5h marathon)

### Training Rounds
- **Round 6** deployed (a7459c8) — 8 fixes, 94% PASS, 12/12 categories CERTIFIED
- **แบงค์ feedback** applied (2337107) — FA Tools pricing only + 5 กฎเหล็ก agent style
- **Round 7** pushed (bea85f6) — ban bot phrases, customer name, group insurance

### Rename
- **Jarvis → iAgencyAIA** (cb60682) — all user-facing text, Phase 1 complete
- Phase 2 (internal code names, API routes, DB bot_name) not yet done

### FA Tools Oracle (NEW PROJECT)
- BoB brainstorm → architecture proposal (thread #130)
- แบงค์ APPROVED
- Prompt v1 designed: `ψ/lab/fa-tools-oracle-prompt-v1.md`
- Architecture: delegation API, port 3201, separate LINE Bot
- LINE Bot setup attempted — Playwright crashed (Chrome session conflict)

### Data Coordination
- v3.1 ready (1,975 examples, gender issue flagged — wrong direction ครับ→ค่ะ)
- 8 KB chunks inserted (IDs 11412-11419)
- Style Guide v1 applied to all prompts

## Pending

### Priority 1 — FA Tools Oracle
- [ ] LINE Bot iAgencyFaHelper setup via manager.line.biz (Playwright needs restart)
- [ ] Fork Admin-Oracle → FA Tools Oracle repo
- [ ] Implement delegation API (`POST /api/delegate`)
- [ ] iCompare/iPlan link generator
- [ ] Commission data in DB

### Priority 2 — iAgencyAIA (formerly Jarvis)
- [ ] Admin deploy bea85f6 (Round 7) + cb60682 (rename) — ✅ pushed, waiting deploy
- [ ] QA test Round 7 + rename + แบงค์ feedback
- [ ] Dev: FA Tools API full sync verification (thread #117)
- [ ] Phase 2 rename: internal code names, API routes

### Priority 3 — Training
- [ ] Data v3.2 (fix gender ครับ not ค่ะ)
- [ ] Round 8 after QA Round 7 results
- [ ] Security: /test endpoint remediation (overdue!)

## Next Session

1. **Restart Playwright → setup LINE Bot iAgencyFaHelper** (manager.line.biz)
2. **Fork Admin-Oracle → FA Tools Oracle** codebase
3. **Get QA Round 7 + rename results**
4. **Implement delegation API** (iAgencyAIA → FA Tools Oracle)
5. **Dev: FA Tools API sync** follow up

## Key Files

**Admin-Oracle (4 commits today):**
- `src/ai/prompts.ts` — Main system prompt (renamed, 5 กฎเหล็ก, FA Tools only)
- `src/ai/prompts/product.ts` — Product prompt (Agent style, competitors, life, installment)
- `src/ai/prompts/service.ts` — Service prompt (hesitation, callback, group insurance)
- `src/flows/greeting.ts` — Renamed greeting

**BotDev-Oracle:**
- `ψ/lab/fa-tools-oracle-prompt-v1.md` — FA Tools Oracle prompt + architecture
- `ψ/lab/kb_chunks_round7.json` — 8 KB chunks

**Data-Oracle:**
- `data/training/jarvis_finetune_v3.1_round7_2026-03-20.jsonl` — 1,975 examples
- `data/training/jarvis_style_guide_v1.md` — 5 กฎเหล็ก

## Thread References

| Thread | ID | Status |
|--------|-----|--------|
| channel:bob | #100 | Updated — rename + FA Tools Oracle |
| QA rounds | #61 | R6 94% CERTIFIED, R7 + hotfix waiting test |
| Admin deploy | #104 | bea85f6 + cb60682 waiting deploy |
| Dev FA Tools | #117 | API sync request — no response yet |
| Data training | #97 | v3.1 ready, gender flag sent |
| FA Tools Oracle brainstorm | #130 | Architecture proposal sent |
| Playwright crash | #131 | Chrome session conflict |

## Commits (today)

```
a7459c8  feat: Round 6 bot training
2337107  fix: FA Tools pricing only + agent natural tone
bea85f6  feat: Round 7 — ban bot phrases, customer name, group insurance fix
cb60682  rebrand: Jarvis → iAgencyAIA (user-facing text)
```

+199/-37 lines across 10 files
