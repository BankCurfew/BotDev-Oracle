---
title: Exit card routing safety net: Gate checks and determineCard() are separate code 
tags: [routing, exit-cards, safety-net, quiz, gate-system, bug-fix]
created: 2026-03-27
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# Exit card routing safety net: Gate checks and determineCard() are separate code 

Exit card routing safety net: Gate checks and determineCard() are separate code paths. A card can be assigned an exit card ID inside determineCard() without going through the gate exit mechanism. Always add a fallback catch after determineCard() that routes exit card IDs to ExitPage regardless of how they were assigned. Principle: when multiple code paths produce the same category of output, the consumer needs a single unified check — don't rely on each producer setting the right flag.

---
*Added via Oracle Learn*
