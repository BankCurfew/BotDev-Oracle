# Lesson: Nuclear Regen Beats Surgical Debugging for TTS Audio

**Date**: 2026-03-27
**Source**: FA Quiz narration content mismatch (แบงค์ reported 7+ screenshots)
**Context**: fa-recruitment-quiz, 48 narration MP3 files

## Pattern

When user reports TTS audio doesn't match displayed text:
1. **Don't audit individual files** — code mapping can be perfect while audio content is wrong
2. **Regen ALL files immediately** — 48 MP3s via parallel batch takes ~5 min, not hours
3. **`file` command = format check only** — MPEG header ≠ correct spoken content
4. **Trust user evidence over code analysis** — screenshots/recordings > git forensics

## Anti-pattern

- Spending 30+ min on code-level audit proving "no mismatch" when user has visual proof
- Checking git history to verify MP3 was regenerated after text change (MP3 could have been generated from wrong text even if timestamps align)
- Reporting "all clear" based on file existence + format verification

## Cost Comparison

| Approach | Time | Reliability |
|----------|------|------------|
| Surgical: identify + regen specific files | 30-60 min | Low (may miss some) |
| Nuclear: regen ALL files | ~5 min | 100% (fresh from current code) |

## Related Fix

BG music looping gap: `html5: true` in Howler.js causes buffering gaps on loop. Remove it for small files (<1MB) to use Web Audio API gapless looping.

## Tags

tts, elevenlabs, audio-qa, nuclear-regen, content-verification, howler-loop
