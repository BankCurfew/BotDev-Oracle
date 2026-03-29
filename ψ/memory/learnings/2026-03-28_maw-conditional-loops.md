# maw-js Conditional Loops

**Date**: 2026-03-28
**Source**: maw-js update notification

## Feature

`maw loop` now supports conditional triggers (when/if/until):

1. **when** — fire once when condition met
   ```bash
   maw loop when "condition" --oracle X --do "prompt"
   ```

2. **if** — cron + guard (only fires if condition true)
   ```bash
   maw loop if "condition" --schedule cron --oracle X --do "prompt"
   ```

3. **until** — fire on schedule until condition met, then auto-disable
   ```bash
   maw loop until "condition" --schedule cron --oracle X --do "prompt"
   ```

## Condition Types
- `oracle:name idle/busy` — check oracle state
- `loop:id done` — check if another loop completed
- `file:path exists` — check file existence
- `cmd:shell` — run arbitrary shell command as condition

## Reference
Full docs: `~/.claude/skills/loop-conditional/SKILL.md`

## Tags
maw, loops, conditional, scheduling, automation
