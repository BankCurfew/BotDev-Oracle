---
title: Nuclear regen beats surgical debugging for TTS audio. When user reports narratio
tags: [tts, elevenlabs, audio-qa, nuclear-regen, content-verification, howler-loop]
created: 2026-03-27
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# Nuclear regen beats surgical debugging for TTS audio. When user reports narratio

Nuclear regen beats surgical debugging for TTS audio. When user reports narration doesn't match displayed text: regen ALL files immediately (~5 min via parallel batch) rather than auditing individual files (30+ min, unreliable). Code-level mapping can be perfect while audio content is wrong — `file` command verifies format not spoken content. Trust user evidence (screenshots) over git forensics. Also: Howler.js `html5: true` causes looping gaps — remove for small files (<1MB) to use Web Audio API gapless looping.

---
*Added via Oracle Learn*
