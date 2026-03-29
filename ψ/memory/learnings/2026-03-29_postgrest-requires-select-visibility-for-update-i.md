---
title: PostgREST requires SELECT visibility for UPDATE: In Supabase, PATCH requests nee
tags: [supabase, rls, postgrest, silent-failure, debugging]
created: 2026-03-29
source: rrr: BotDev-Oracle (fa-recruitment-quiz tracking bug)
project: github.com/bankcurfew/fa-recruitment-quiz
---

# PostgREST requires SELECT visibility for UPDATE: In Supabase, PATCH requests nee

PostgREST requires SELECT visibility for UPDATE: In Supabase, PATCH requests need the row to be visible through SELECT RLS policies, not just UPDATE policies. Mismatched windows (e.g., SELECT 5-min vs UPDATE 30-min) cause silent 0-row updates — HTTP 200 OK with empty array, no error. Always align SELECT and UPDATE policy time windows. Discovered when quiz_sessions tracking failed silently for quizzes taking >5 minutes.

---
*Added via Oracle Learn*
