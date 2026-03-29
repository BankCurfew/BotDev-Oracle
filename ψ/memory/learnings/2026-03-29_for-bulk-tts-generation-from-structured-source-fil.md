---
title: For bulk TTS generation from structured source files (e.g., TypeScript with narr
tags: [tts, elevenlabs, bulk-generation, automation, extraction]
created: 2026-03-29
source: rrr: BotDev-Oracle — 57 narration TTS regen session
project: github.com/bankcurfew/fa-recruitment-quiz
---

# For bulk TTS generation from structured source files (e.g., TypeScript with narr

For bulk TTS generation from structured source files (e.g., TypeScript with narration fields), use programmatic extraction (Python regex → JSON) then iterate with API calls. This is faster and more reliable than manual section-by-section reading. ElevenLabs API handles 57+ sequential calls without rate limiting when spaced 0.3s apart.

---
*Added via Oracle Learn*
