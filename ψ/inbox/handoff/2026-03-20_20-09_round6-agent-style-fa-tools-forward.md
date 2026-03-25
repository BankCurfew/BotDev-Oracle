# Handoff: Round 6 + แบงค์ Feedback (FA Tools + Agent Style)

**Date**: 2026-03-20 20:09
**Context**: 90%

## What We Did (This Session)

### Round 6 Training (8 fixes from 27K analysis) — DEPLOYED a7459c8
- FWD + เมืองไทย competitor → health-specific comparison (fix P2 PARTIAL)
- Life insurance → structured 4 options + sub-routes (22.1% = #1 topic)
- Installment/ผ่อน → 4 ช่องทาง (new)
- Drop-off prevention → 15.5% bounce fix
- Hesitation standard scripts → 67% agent ไม่มี script (new)
- Callback handling → "ไม่ได้รับสาย" (new)
- Follow-up protocol → ห้ามจบด้วย "ค่อยทักมาใหม่"
- Bounce recovery script

### แบงค์ Feedback Fixes — COMMITTED 2337107, PUSHED, WAITING DEPLOY
1. **เบี้ยผิด** → HARD RULE: ห้ามคำนวณเอง, FA Tools API `[เบี้ยจริงจาก AIA]` only
2. **ดูเป็น bot** → 5 กฎเหล็กจาก 5,544 ข้อความ agent จริง (median 50 chars, no list, split msgs)
3. **เรียนจากแชท** → AGENT CHAT STYLE section จาก real patterns
4. **เท่ากาแฟ** → moved to closing only (แบงค์ directive)

### Data Coordination
- Training v3 (1,852 examples) reviewed → found 56% gender issue (ค่ะ→ครับ)
- Data sent v3.1 (1,975 examples: gender fixed, life 51→212, 8 new KB chunks IDs 11412-11419)
- Data sent Style Guide v1 → applied 5 กฎเหล็ก to prompts

### Other
- DocCon Conduct v1.0 acknowledged
- PA-Oracle: LINE personal automation question → forwarded to Dev (thread #118)
- Dev: FA Tools API full sync request (thread #117)

## Pending

- [ ] Admin deploy 2337107 (แบงค์ feedback fixes)
- [ ] QA Round 6 test result → target 95%+
- [ ] QA test แบงค์ feedback fixes (เบี้ยจริง + tone)
- [ ] Dev: FA Tools API full sync verification — planMap vs DB coverage
- [ ] Data: v3.1 confirmed ready → Round 7 training data
- [ ] Round 7 planning (after QA Round 6 passes)
- [ ] PA: CDP script for LINE Web (chat.line.me) — when Chrome session ready
- [ ] Security: /test endpoint remediation (overdue!)

## Next Session

1. **Get QA Round 6 + แบงค์ feedback test results** — if 95%+ = CERTIFIED v2
2. **Dev FA Tools sync** — verify planMap coverage matches insurance_products DB
3. **Start Round 7** with v3.1 training data (1,975 examples)
4. **PA LINE Web CDP** if Admin Chrome session ready
5. **Security /test endpoint** — still overdue from 2 sessions ago

## Key Files

- `Admin-Oracle/src/ai/prompts.ts` — Main system prompt (HARD RULES, 5 กฎเหล็ก, FA Tools only)
- `Admin-Oracle/src/ai/prompts/product.ts` — Product prompt (Agent style, FWD/MTL, Life, Installment)
- `Admin-Oracle/src/ai/prompts/service.ts` — Service prompt (Callback, Hesitation scripts)
- `Admin-Oracle/src/fa/premium.ts` — FA Tools premium lookup (existing)
- `Admin-Oracle/src/flows/product.ts` — Product flow with premium context injection
- `BotDev-Oracle/ψ/lab/kb_chunks_round7.json` — 8 KB chunks for INSERT
- `Data-Oracle/data/training/jarvis_finetune_v3.1_round7_2026-03-20.jsonl` — 1,975 examples
- `Data-Oracle/data/training/jarvis_style_guide_v1.md` — 5 กฎเหล็ก
- `Researcher-Oracle/ψ/writing/research/line-oa-27k-bot-training-analysis-2026-03-20.md` — 27K analysis
- `Researcher-Oracle/ψ/writing/research/competitor-comparison-bot-objection-2026-03-19.md` — Competitor data

## Thread References

| Thread | ID | Last Action |
|--------|-----|-------------|
| channel:bob | #100 | cc Round 6 + แบงค์ feedback |
| QA test rounds | #61 | Round 6 deployed + แบงค์ hotfix sent |
| Admin deploy | #104 | 2337107 waiting deploy |
| Dev FA Tools | #117 | API full sync request |
| Researcher training | #98 | Used 27K analysis, thanked |
| Data training | #97 | v3.1 ready + Style Guide + KB chunks |
| DocCon conduct | #108 | Acknowledged |
| PA LINE Web | #118 | Forwarded to Dev |
