# Lesson: Scoring Engines Need Multi-Dimensional Card Routing + Diverse Persona Testing

**Date**: 2026-03-26
**Source**: FA Recruitment Quiz scoring engine — 4 QA rounds, 80 personas

## Pattern

Binary card assignment (single dimension split) creates monopoly cards. When second_job FA_PRIME only checked `market_capital >= 4` → Merchant vs Alchemist, 45% of all personas got Merchant. Adding soft_skill and discipline as secondary differentiators spread results across 4 cards naturally.

Similarly, gate/tier thresholds must be tuned alongside question scoring — raising gate1 from 4→6 had no practical effect because the minimum possible score from U1 was already goals=3.

## Key Takeaways

1. **Card routing needs 2-3 dimension differentiators** per branch, not binary splits
2. **Test with 40+ diverse personas minimum** — first 20 miss patterns that second 20 reveal
3. **"2 consecutive ALL PASS" standard** before declaring stable — catches false positives
4. **Transition/exploring work modes need separate paths** — lumping them with fulltime/second_job inflates tiers
5. **Negative-zero dimension gates** (grit≥1 for FA_PRIME) prevent ambition-only personas from reaching top tiers
6. **Question design constrains gate thresholds** — if all U1 choices give goals≥3, gate1 can't filter below that floor

## Applied In

- `fa-recruitment-quiz/src/engine/scoring.ts` — 10 fixes across commits 262e562 + 78f29f2
- QA thread #187 — full 80-persona test reports
