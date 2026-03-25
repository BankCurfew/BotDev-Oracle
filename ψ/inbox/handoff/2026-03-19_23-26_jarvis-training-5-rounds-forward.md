# Handoff: Jarvis Bot Training — 5 QA Rounds (50%→89%)

**Date**: 2026-03-19 23:26
**Context**: 85%

## What We Did (This Session)

### Training Plan (COMPLETE)
- Gathered all data: 11,079 LINE msgs / 450 contacts / 869 Q&A / 20 scripts / 65 objections
- Sent training plan to แบงค์ via BoB — pipeline, timeline, blockers, accuracy target

### 5 QA Test Rounds (50%→89%)
- **Round 1 (50%)**: Greeting structured options, closing flow, edge cases, +35 KB entries
- **Round 2 (77%)**: Exact pricing, anti-redirect, medical terms, UDR mention
- **Round 3 (53%)**: Combo pricing, claim 5 scenarios, competitor data, radical honesty (regression: Saving Sure hijack)
- **Round 4 (89%)**: CONTEXT LOCK, AGE GUARD, router.ts fix, FWD KB, deadline MANDATORY
- **Round 5**: FWD retrieval fix, competitor context lock, Saving Sure tightened — awaiting QA result

### Code Changes (Admin-Oracle — UNCOMMITTED, needs deploy)
- `src/ai/prompts.ts` — AGE GUARD, MEDICAL TERMS, CONTEXT LOCK, Saving Sure rules, NEVER DO #9
- `src/ai/prompts/product.ts` — COMBO PRICING, WINNING PATTERNS, PROGRESSIVE DATA COLLECTION, COMPETITOR COMPARISON, RADICAL HONESTY, ANTI-REDIRECT
- `src/ai/prompts/service.ts` — Claim rewrite: 5 scenarios
- `src/flows/greeting.ts` — Structured 6 options
- `src/flows/router.ts` — ลบ "นอน รพ" false positive + competitor keywords

### KB Inserts (Supabase LIVE)
- kb_chunks: 7,693 → 7,710 (+17 training chunks)
- kb_benchmarks: 93 → 117 (+24 LINE OA benchmarks)

### Other
- Dashboard training spec sent to Dev (accuracy chart, category heatmap, bug tracker)
- External URLs received and saved to memory
- LAW absorbed: Playwright max 2 sessions

## Pending

- [ ] QA Round 5 result → target 90%+ CERTIFIED
- [ ] Admin deploy code changes (5 files in Admin-Oracle)
- [ ] Security: /test endpoint remediation (past 24h deadline!)
- [ ] Dev: Jarvis Training Dashboard Tab implementation
- [ ] Dev: Scraper restart from 280/750
- [ ] Dev: Dashboard Public Repo creation
- [ ] Data: 869 Q&A pairs pending QA verify → INSERT
- [ ] Issue #1: Scrape iagencyaia.com into KB

## Next Session

- [ ] Get QA Round 5 result — if 90%+ → CERTIFIED, if not → Round 6
- [ ] Push Admin to deploy (5 files) so QA can test on live bot
- [ ] Start Issue #1: Scrape iagencyaia.com (articles, product pages, FAQ) → KB
- [ ] Process Data's 869 Q&A pairs after QA verify → INSERT kb_benchmarks
- [ ] iPlan proposal integration refinement
- [ ] Lead capture integration (POST to leads table)

## Key Files

- `Admin-Oracle/src/ai/prompts.ts` — Main system prompt (HARD RULES, CONTEXT LOCK, AGE GUARD)
- `Admin-Oracle/src/ai/prompts/product.ts` — Product prompt (COMBO PRICING, WINNING PATTERNS, COMPETITOR)
- `Admin-Oracle/src/ai/prompts/service.ts` — Service prompt (5 claim scenarios)
- `Admin-Oracle/src/flows/greeting.ts` — Structured greeting
- `Admin-Oracle/src/flows/router.ts` — Intent detection (competitor keywords)
- Researcher Kit: `Researcher-Oracle/ψ/writing/research/ai-training-kits-line-oa-2026-03-18.json`

## Thread References

| Thread | ID | Last Action |
|--------|-----|-------------|
| channel:bob | #6 | cc all 5 rounds progress |
| channel:qa | #10 | Training data coordination |
| channel:data | #21 | Training data pipeline |
| channel:dev | #5 | Dashboard spec + scraper restart |
| QA test rounds | #58, #61 | Round 1-5 results + fixes |
| channel:botdev | #22 | Training plan + security remediation |
