---
title: ElevenLabs parallel batching: 4 concurrent curl calls is safe rate, cuts 12-file
tags: [elevenlabs, tts, audio-generation, parallel-api, mcp-fallback, qa-gap]
created: 2026-03-26
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# ElevenLabs parallel batching: 4 concurrent curl calls is safe rate, cuts 12-file

ElevenLabs parallel batching: 4 concurrent curl calls is safe rate, cuts 12-file generation from 2min to 30s. MCP tool may have stale API key (401) — always have curl fallback with project .env key. Verify generated audio with `file` command for MPEG headers, but flag that format verification ≠ content quality — Thai pronunciation from English voice needs human listening QA. Use `git add -f` for MP3s when .gitignore blocks them.

---
*Added via Oracle Learn*
