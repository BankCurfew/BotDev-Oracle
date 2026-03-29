# MCP Server Env Var Isolation

**Date**: 2026-03-29
**Source**: ElevenLabs TTS generation task

## Pattern

MCP servers inherit environment variables at launch time, not at call time. Running `export VAR=new_value` in bash does NOT propagate to an already-running MCP server process. If an API key is updated mid-session, the MCP server still uses the old key.

## Workaround

Use direct API calls via `curl` instead of MCP tools when the env var has changed. This bypasses the MCP abstraction but works reliably.

## Example

```bash
# MCP tool fails with 401 (old key)
# Direct curl works with new key:
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" \
  -H "xi-api-key: $NEW_KEY" ...
```

## Rule

When an API key changes mid-session, don't fight the MCP server — switch to direct curl calls. It's faster than trying to restart the MCP process.
