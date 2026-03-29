# Exit Card Routing Safety Net

**Date**: 2026-03-28
**Context**: fa-recruitment-quiz — Dreamer bug where exit card bypassed ExitPage
**Source**: rrr: fa-recruitment-quiz

## Pattern

Gate checks (`checkGate1`, `checkGate2`, `checkAdaptiveCutoff`) and `determineCard()` are separate code paths. A card can be assigned an exit card ID (e.g., cardId=16 for Dreamer in `exploring` + `STANDARD_AGENT`) inside `determineCard()` without going through the gate exit mechanism that sets `state.exitCard`.

**Fix**: Always add a fallback after `determineCard()` that catches exit card IDs regardless of how they were assigned:

```tsx
// After determineCard() returns
if (card.id === 14 || card.id === 15 || card.id === 16 || card.id === 17 || card.id === 18) {
  return <ExitPage exitCard={card.id as GateExitCard} ... />
}
```

**Principle**: When a system has multiple paths that produce the same category of output (exit cards), the consumer must have a single, unified check — not rely on each producer setting the right flag. Belt and suspenders.

## Tags
routing, exit-cards, safety-net, quiz, bug-fix, gate-system
