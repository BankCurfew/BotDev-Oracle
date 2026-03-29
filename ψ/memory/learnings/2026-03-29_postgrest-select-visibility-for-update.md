# PostgREST Requires SELECT Visibility for UPDATE

**Date**: 2026-03-29
**Context**: fa-recruitment-quiz tracking bug — quiz_sessions UPDATE silently failing

## Pattern

In Supabase (PostgREST), a PATCH request to update a row requires the row to be **visible through SELECT RLS policies**, not just the UPDATE policy. If SELECT and UPDATE policies have different time windows, the narrower SELECT window becomes the effective limit for updates.

## Evidence

- `quiz_sessions` had SELECT policy: `created_at > now() - 5 min`
- UPDATE policy: `created_at > now() - 30 min`
- Quizzes taking >5 min: UPDATE returned 200 OK with `[]` (0 rows) — no error
- Quizzes completed in <5 min: everything worked

## Rule

**Always align SELECT and UPDATE RLS policy windows.** If anon needs to UPDATE within 30 minutes, anon must also be able to SELECT within 30 minutes.

## Gotcha

PostgREST returns HTTP 200 with empty array when RLS blocks the row — not 403 or any error. This makes the failure completely silent unless you check `data.length === 0`.
