---
title: MCP servers inherit env vars at launch time, not call time. export VAR=new in ba
tags: [mcp, api-key, env-var, workaround, elevenlabs, tts]
created: 2026-03-29
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# MCP servers inherit env vars at launch time, not call time. export VAR=new in ba

MCP servers inherit env vars at launch time, not call time. export VAR=new in bash does NOT propagate to running MCP processes. When API keys change mid-session, switch to direct curl calls instead of fighting the MCP server. Example: ElevenLabs MCP returned 401 with old key, but curl with new key worked immediately.

---
*Added via Oracle Learn*
