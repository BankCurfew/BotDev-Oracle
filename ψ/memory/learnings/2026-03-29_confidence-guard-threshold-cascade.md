# Confidence Guards Create Threshold Cascades

**Date**: 2026-03-29
**Source**: QA 500-persona simulation failure on fa-recruitment-quiz
**Severity**: P0 — made 5/18 cards unreachable

## Pattern

When you add a confidence guard (Bayesian regression toward midpoint) to normalize low-data dimensions, the guard introduces a **floor value** that invalidates all downstream thresholds assuming raw zero is possible.

## Specifics

Confidence guard formula: `score * 0.6 + midpoint * 0.4`

For a single-question dimension scoring 0:
- Raw: 0
- After guard: 0 * 0.6 + 1.5 * 0.4 = **0.6**

This means:
- `<= 0.5` checks become **impossible** for any answered dimension
- `<= 0.0` checks only match truly **unanswered** dimensions (count=0)
- `>= 2.5` is only reachable with 2+ data points (single max = 2.4)

## Impact

| Threshold | Before Guard | After Guard | Fix |
|-----------|-------------|-------------|-----|
| Gate1 exit ≤ 3.0 | Reachable (raw 0+0+0) | Min 1.8 (0.6×3) | Raised to 5.0 |
| Gate2 grit ≤ 0.5 | Reachable (raw 0) | Min 0.6 | Raised to 1.0 |
| Phoenix grit ≤ 0.5 | Reachable | Min 0.6 | Raised to 1.0 |
| FA_PRIME goals ≥ 2.5 | Reachable (raw 3) | Max 2.4 (single Q) | Lowered to 2.0 |

## Rule

**When adding a confidence guard or normalization layer, immediately audit every threshold in the system against the new floor and ceiling values.** Create a table mapping: dimension → min data points → min/max after normalization → affected thresholds. This is a mechanical check, not a judgment call.
