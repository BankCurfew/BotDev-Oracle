---
title: CSS `:has()` selector for parent-state-from-child: When a parent needs to respon
tags: [css, has-selector, avatar, zoom, clip, liff, integration, mobile, responsive, 3d-flip]
created: 2026-03-27
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# CSS `:has()` selector for parent-state-from-child: When a parent needs to respon

CSS `:has()` selector for parent-state-from-child: When a parent needs to respond to a child's state (e.g., wrapper expanding when card flips), use `.parent:has(.child-class)` instead of JavaScript state bubbling. Example: `.wk-card-wrapper:has(.wk-flipped) { aspect-ratio: 3/5.5; z-index: 10; }` — expands and elevates the card when flipped.

Avatar zoom in circular crop: Never scale the container. Use outer div (overflow:hidden, border-radius:50%) as clip, and scale only the inner img (transform: scale(1.35)). Scaling the container makes the circle bigger, not the image.

Validate integration deployment constraints BEFORE coding: LIFF, OAuth, embedded WebViews all have domain-matching requirements. A 2-minute doc check prevents building full integrations that can't work in dev environment.

---
*Added via Oracle Learn*
