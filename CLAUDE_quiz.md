# Quiz Engine Reference — FA Recruitment Quiz

> Load this module ONLY when working on `fa-recruitment-quiz` repo tasks.

**Repo:** `~/repos/github.com/BankCurfew/fa-recruitment-quiz`
**Stack:** React 19 + TypeScript + Vite + Supabase
**Supabase:** `tekvqbbjsfncwbdsvrfw.supabase.co`

## Architecture

```
src/engine/
├── questions.ts   — 63 questions across 7 pools (2467 lines)
├── scoring.ts     — Gates, tier calc, card assignment (510 lines)
├── types.ts       — Dimensions, tiers, interfaces
└── tracking.ts    — Supabase analytics

src/components/
├── QuizApp.tsx    — Master state machine / reducer
├── SceneView.tsx  — Question display (fantasy RPG UI)
└── ResultPage.tsx — Tier + card result display
```

## Scoring Engine

| Component | File:Line | Function |
|-----------|-----------|----------|
| Gate 1 (motivation) | `scoring.ts:20` | `checkGate1()` — goals + motivation + commitment > 5.0 |
| Gate 2 (track record) | `scoring.ts:34` | `checkGate2()` — grit + track_record thresholds |
| Adaptive cutoff | `scoring.ts:52` | `checkAdaptiveCutoff()` |
| Gate 3 (action gap) | `scoring.ts:84` | `checkGate3()` — action_gap + ghost flags |
| Normalize | `scoring.ts:184` | `normalizeScores()` — confidence guard regression |
| Tier calc | `scoring.ts:203` | `determineTier()` — score-based, NO work mode caps |
| Card assign | `scoring.ts:299` | `determineCard()` — 20 cards across 5 tiers |
| Question select | `scoring.ts:103` | `selectAdaptiveQuestions()` |

## 5 Tiers (NEW — score-based, work mode = badge)

| Tier | Key Thresholds |
|------|---------------|
| `FA_PRIME` | goals ≥ 2.0 + market_capital ≥ 2.0 + track_record ≥ 2.0 + grit ≥ 1.0 |
| `FA_STANDARD_PRIME` | goals ≥ 2.0 + (mc ≥ 1.5 OR tr ≥ 2.0) + **commitment ≥ 2.0** |
| `FA_STANDARD` | goals ≥ 2.0 + (mc ≥ 1.5 OR tr ≥ 2.0) + commitment < 2.0 |
| `POTENTIAL` | goals ≥ 2.0 OR motivation ≥ 1.5 |
| `NOT_SUITABLE` | Gate failures / disqualifiers |

Work mode (fulltime/second_job/transition/exploring) = display badge only, never caps tier.

## 12 Dimensions

`goals` · `motivation` · `commitment` · `discipline` · `market_capital` · `soft_skill` · `track_record` · `grit` · `resilience` · `situation` · `financial_literacy` · `competitive_drive`

## 7 Question Pools

| Pool | Count | Array Name |
|------|-------|-----------|
| Gate 1 (Universal) | 3 | `GATE1_QUESTIONS` |
| Gate 1.5 (Work Mode) | 10 | `GATE1_5_QUESTIONS` |
| Gate 2 (Track Record) | 4 | `GATE2_QUESTIONS` |
| Adaptive | 15 | `ADAPTIVE_POOL` |
| Gap-Fill | 24 | `GAP_FILL_QUESTIONS` |
| Need Matching | 2 | `NEED_QUESTIONS` |
| Prospect Ranking | 1 | `PROSPECT_QUESTIONS` |

## 20 Career Cards

| Group | Tier | Cards |
|-------|------|-------|
| A | FA_PRIME | Commander(1), Sage(2), Maverick(3), Architect(4) |
| B | FA_STANDARD_PRIME / FA_STANDARD | Prodigy(5), Warrior(6), Phoenix(7), Apprentice(8) |
| C | FA_STANDARD | Alchemist(9), Merchant(10), Moonlighter(11), Scout(12), Seedling(13) |
| D | POTENTIAL | Wanderer(14), Spark(15), Dreamer(16) |
| E | NOT_SUITABLE | Sleeper(17), Mirror(18), Watcher(19), Ghost(20) |

## Question Format

```typescript
{
  id: string,
  phase: 'gate1' | 'gate1_5' | 'gate2' | 'adaptive' | 'gap_fill' | 'need' | 'prospect',
  dimension: keyof DimensionScores,
  title: string,
  scene: { mood: string, audio: string },
  narration: string,  // Thai fantasy RPG tone
  choices: {
    id: string,
    text: string,
    scores: Partial<DimensionScores>,
    sets?: Record<string, string>,  // flags like work_mode, action_gap
  }[]
}
```

## Language Rules (for narration)

- ห้ามใช้: "ประกัน", "ขาย", "เบี้ย"
- ใช้: "เส้นทาง", "อาชีพ", "รายได้"
- 2nd person ("คุณ"), active voice, present tense
- Fantasy RPG tone — honest, not hype

## Scoring Weight by Work Mode

| Dimension | Full Time | Part Time / 2nd Job |
|-----------|----------|-------------------|
| Discipline | 25% | 30% |
| Market base | 20% | 30% |
| Sales skills | 25% | 20% |
| Goals | 15% | 10% |
| Attitude | 15% | 10% |

## Key Implementation Notes

- `normalizeScores()` uses confidence guard: single-answer dims regressed toward midpoint (0.7/0.3)
- Work mode set by W1 question, stored in `state.workMode`
- Flags stored in `state.flags` Set — `action_gap`, `ghost_risk`, etc.
- Diamond indicator: `track_record <= 1.0 && grit >= 1.5`
- Supabase tracking: `quiz_sessions` table, `quiz_events` table
