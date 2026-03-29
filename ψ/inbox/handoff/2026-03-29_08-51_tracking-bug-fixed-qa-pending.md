# Handoff: Tracking UPDATE Bug Fixed — QA Pending

## What Happened

**URGENT tracking bug** — `trackQuizComplete()` and `trackInfoFill()` silently failed to UPDATE `quiz_sessions` in Supabase. Events INSERT worked, but UPDATE returned 200 OK with 0 rows.

**Root cause found and fixed**: RLS SELECT policy had 5-min window, UPDATE policy had 30-min. PostgREST needs SELECT visibility to UPDATE. Quizzes taking >5 min = row invisible = silent fail.

**Fix**: Changed SELECT policy from 5-min to 30-min window — live in Supabase.

## What's Pushed

- `ce1d006` (fa-recruitment-quiz) — error logging for tracking UPDATE calls (`.select('id')` + `console.error`)
- Supabase RLS fix — `quiz_sessions` SELECT policy: `created_at > now() - 30 min OR share_token IS NOT NULL`

## Who's Been Notified

- **Bob** (thread #204) — full root cause report
- **QA** (thread #22) — testing instructions, asked to test quiz >5 min

## Pending / Next Steps

1. **Wait for QA test results** — they should test a full quiz flow taking >5 min and confirm tracking data saves
2. **Error logging cleanup** — after confirming fix works, consider removing verbose `console.log` statements from tracking.ts (keep `console.error` for actual errors)
3. **Answer Timing bar colors** — user reported colors still not differentiated; code is correct but may need deploy/cache bust verification
4. **Monitor** — check Supabase for new sessions with `completed_at` populated

## Key Files (fa-recruitment-quiz repo)

Key code: `src/engine/tracking.ts` lines 69-131 — trackQuizComplete with `.update().select('id')` pattern and error/success logging.

## Other Completed Work (from prior sessions, all pushed)

- PDPA consent modal (page-level, sessionStorage persist)
- Phone + LINE ID fields in ShareModal + admin
- Short share token via DB (`#Xk9mQ2`)
- WebP images + scene-based preloading
- Career Path gold gradient highlight
- ShareModal contact overflow fix
- LINE share `window.open` fix

## Critical Learning

**PostgREST SELECT-for-UPDATE**: Supabase PATCH needs row visible via SELECT RLS, not just UPDATE RLS. Mismatched windows = silent 0-row update (200 OK, `[]`). Always align SELECT/UPDATE windows.
