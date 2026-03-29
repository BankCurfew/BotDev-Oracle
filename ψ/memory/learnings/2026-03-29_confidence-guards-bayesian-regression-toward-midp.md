---
title: Confidence guards (Bayesian regression toward midpoint) create threshold cascade
tags: [scoring, normalization, threshold, confidence-guard, bayesian, second-order-effects, quiz-engine]
created: 2026-03-29
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# Confidence guards (Bayesian regression toward midpoint) create threshold cascade

Confidence guards (Bayesian regression toward midpoint) create threshold cascades. When normalizing low-data dimensions with formula `score * 0.6 + midpoint * 0.4`, the guard introduces a floor value (0.6 for score=0) that invalidates all downstream thresholds assuming raw zero is possible. Rule: when adding any normalization layer, immediately audit every threshold against new floor/ceiling values. FA Quiz example: guard made 5/18 cards unreachable because thresholds like `<= 0.5` became impossible (min was 0.6) and `>= 2.5` was unreachable for single-question dims (max was 2.4).

---
*Added via Oracle Learn*
