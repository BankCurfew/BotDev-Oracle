# Handoff: Training Pipeline + HH Urgency + FA Tools Expansion

**Date**: 2026-03-19 14:20
**Context**: 70%

## What We Did (This Session)

### HH Deadline Urgency (COMPLETE)
- Added URGENCY section to `Admin-Oracle/src/ai/prompts.ts`
- Jarvis now mentions "ปิดรับสมัครสิ้นเดือนมี.ค." whenever Health Happy comes up
- Uses "สิ้นเดือนมีนาคมนี้" (not "เหลือ X วัน") to avoid staleness

### FA Tools Expansion (COMPLETE)
- `Admin-Oracle/src/flows/product.ts` planMap expanded: 10 → 40+ products
- Covers: Health (7), CI (8), Savings (10), Annuity (3), Unit-Linked (8), PA (2)
- Added fallback: if product not in planMap, tries canonical name directly
- Both changes uncommitted in Admin-Oracle

### Training Data Integration Spec (COMPLETE)
- `Admin-Oracle/specs/training-data-spec.md` — full spec for QA + Data
- 3 data types: Q&A pairs → kb_benchmarks, Sales scripts → kb_chunks, Objections → kb_chunks
- Sent to QA (thread #10) + Data (thread #21)
- Awaiting JSON deliverables at `/tmp/training-*.json`

### Cleanup (COMPLETE)
- `.gitignore` created for BotDev-Oracle (auto-enhanced by hook)
- LINE OA scrape confirmed: 261 contacts / 4,521 msgs in DB

### Crash Loop Investigation
- Found orphan PID 349234 (`bun src/bot.ts` from Mar18) holding port 3200
- systemd `jarvis-bot.service` crash loop as result
- Reported to Admin (thread #19) — needs `kill 349234`

### LAWs Absorbed
- LAW #1: `/talk-to` primary, `maw hey` fallback only
- LAW #6: No CronCreate → `maw loop add`
- Email Conduct Standard v2.0 (DocCon)
- cc BoB enforcement (DocCon WARNING)

## Pending

- [ ] Commit Admin-Oracle changes (prompts.ts, product.ts, specs/)
- [ ] Admin kill PID 349234 → systemd restart
- [ ] Admin deploy with HH urgency + expanded premium
- [ ] QA + Data send training data → BotDev validate + INSERT
- [ ] Rerun QA benchmarks after new training data
- [ ] Dev runs LINE OA scraper for remaining 611 contacts
- [ ] iPlan proposal integration refinement
- [ ] Lead capture integration (POST to leads table)

## Next Session: Pick Your Path

| Option | Command | What It Does |
|--------|---------|--------------|
| **Continue** | `/recap` | Pick up where we left off |
| **Check training data** | `ls /tmp/training-*.json` | See if QA/Data delivered |
| **Fresh start** | `/recap --quick` | Minimal context |

## Key Files

- `Admin-Oracle/src/ai/prompts.ts` — HH urgency added (line ~74)
- `Admin-Oracle/src/flows/product.ts` — expanded planMap (line ~121)
- `Admin-Oracle/specs/training-data-spec.md` — integration spec
- `BotDev-Oracle/.gitignore` — new
- Scrape data: `line_chat_history` table (4,521 msgs)

## Thread References

| Thread | ID | Last Action |
|--------|-----|-------------|
| channel:bob | #6 | cc all progress |
| channel:qa | #10 | Sent training spec |
| channel:data | #21 | Sent training spec |
| channel:admin | #19 | Reported crash loop PID |
| channel:botdev | #22 | Security remediation pending |
