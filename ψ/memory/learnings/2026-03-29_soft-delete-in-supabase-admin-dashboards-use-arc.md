---
title: Soft-delete in Supabase admin dashboards: use `archived_at timestamptz DEFAULT N
tags: [supabase, soft-delete, admin-dashboard, archived_at, react]
created: 2026-03-29
source: rrr: fa-recruitment-quiz
project: github.com/bankcurfew/fa-recruitment-quiz
---

# Soft-delete in Supabase admin dashboards: use `archived_at timestamptz DEFAULT N

Soft-delete in Supabase admin dashboards: use `archived_at timestamptz DEFAULT NULL` instead of hard DELETE. Add `.is('archived_at', null)` to ALL list queries including related lookups (e.g. past sessions by visitor_id). Partial index `WHERE archived_at IS NULL` for performance. UI: toggle button with confirm() dialog — archive navigates back, restore reloads detail. Always reversible, auditable, near-zero cost.

---
*Added via Oracle Learn*
