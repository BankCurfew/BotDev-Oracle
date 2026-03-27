# Lesson: ElevenLabs Parallel Batching + MCP Fallback

**Date**: 2026-03-27
**Source**: Quiz narration MP3 generation session
**Context**: fa-recruitment-quiz, 12 TTS files + 2 SFX

## Pattern

When generating multiple audio files via ElevenLabs API:
1. **Batch 4 parallel curl calls** — safe rate for ElevenLabs, cuts time by 75%
2. **MCP tool may have stale/different API key** — always have curl fallback ready with project `.env` key
3. **Verify with `file` command** after generation — confirms MPEG headers, catches corrupted downloads
4. **Use `git add -f`** for MP3s when `.gitignore` blocks them

## Anti-pattern

- Sequential API calls (12 files × ~10s each = 2 min vs parallel 3 batches × ~10s = 30s)
- Trusting MCP tool auth without fallback plan
- Trusting HTTP 200 without verifying file format

## Audio QA Gap

`file` command verifies format (MPEG, bitrate, sample rate) but NOT content quality. Thai text narrated by English-tuned voices needs human listening QA. Always flag this in QA requests — don't mark audio as "verified" when only format was checked.

## Tags

elevenlabs, tts, audio-generation, parallel-api, mcp-fallback, qa-gap
