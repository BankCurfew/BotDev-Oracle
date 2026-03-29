# Handoff: Soft-Delete + Bug Fix Marathon

**Date**: 2026-03-29 11:10
**Context**: ~80% (compacted once)

## What We Did

- **Tracking UPDATE fix** (ce1d006): Root cause = RLS SELECT 5-min vs UPDATE 30-min mismatch. PostgREST needs SELECT visibility for UPDATE. Fixed policy to 30-min. QA verified.
- **Share link fix** (8608458 + 5fae744): Two bugs — `.single()` causing 406 on 0 rows (replaced with `.limit(1)`), and React async race condition (added `resolvingShareToken` loading gate).
- **Abandoned sessions filter** (f86e921): Added `.not('completed_at', 'is', null)` to ProspectTable query.
- **Soft-delete feature** (2daad93, fa-recruitment-quiz#2): `archived_at` column in DB, QuizSession type updated, ProspectTable + past sessions filtered, archive/restore toggle button in ProspectDetail. GitHub issue #2 closed.
- **GOLDEN RULE #2 acknowledged**: 6 Laws of Task Management — `maw task add/start/log/done` + GitHub issues.
- **LAW #12 + #13 added to CLAUDE.md** (94ab947): Board-Driven Work + Daily Self-Improvement.

## Pending

- [ ] **Deploy needed**: Admin must deploy latest (2daad93) for all fixes to go live
- [ ] **Answer Timing bar colors**: User reported single-color; code has per-bar coloring — may need deploy/cache bust
- [ ] Open issues: #5 (Admin Dashboard redesign), #4 (data lost users), #1 (progressive image loading)

## Next Session

- [ ] Check deploy status — ask admin if 2daad93 is live
- [ ] `/recap` to orient
- [ ] Check `maw project ls` for new tasks
- [ ] Pick up open issues (#5 Admin Dashboard redesign is likely next priority)
- [ ] Follow 6 Laws: `maw task start` before work, `maw task log` during, `maw task done` + cc bob after

## Key Files

- `src/admin/pages/ProspectDetail.tsx` — archive/restore button (lines 82-109, 252-259)
- `src/admin/pages/ProspectTable.tsx` — archived filter (line 39)
- `src/admin/lib/types.ts` — `archived_at` field
- `src/components/QuizApp.tsx` — share link fix (resolvingShareToken + .limit(1))
- `src/engine/tracking.ts` — UPDATE error logging

## Key Code: Archive Toggle (ProspectDetail.tsx)

```typescript
async function handleArchiveToggle() {
  if (!data) return
  const isArchived = !!data.session.archived_at
  if (!confirm(isArchived ? 'คืนค่า session นี้กลับมา?' : 'ซ่อน session นี้จาก dashboard?')) return
  setArchiving(true)
  const { error } = await supabase
    .from('quiz_sessions')
    .update({ archived_at: isArchived ? null : new Date().toISOString() })
    .eq('id', sessionId)
  if (error) { alert('ไม่สามารถทำได้'); return }
  isArchived ? loadDetail() : onBack()
}
```

## Learnings

1. PostgREST SELECT-for-UPDATE: align RLS SELECT and UPDATE windows
2. `.single()` dangerous for optional lookups — use `.limit(1)`
3. React async state + conditional rendering = add `resolving` boolean
4. Soft-delete: `archived_at` + partial index + filter ALL queries including related
