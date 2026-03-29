# Soft-Delete Pattern in Supabase Admin Dashboards

**Date**: 2026-03-29
**Context**: fa-recruitment-quiz#2 — replacing hard delete with archived_at

## Pattern

For admin dashboards backed by Supabase, soft-delete via `archived_at timestamptz DEFAULT NULL` is cleaner than hard DELETE:

1. **DB**: Add nullable `archived_at` column + partial index `WHERE archived_at IS NULL`
2. **Queries**: Add `.is('archived_at', null)` to ALL list queries (main table + related lookups)
3. **UI**: Toggle button that sets `archived_at = now()` (archive) or `archived_at = null` (restore)
4. **UX**: Archive → navigate back to list (row disappears). Restore → reload detail (row reappears).

## Key Detail

Don't forget related queries — past sessions lookup by `visitor_id` also needs the archived filter, otherwise archived sessions appear in quiz history.

## Confirm Dialog

Always `confirm()` before archive/restore. Users clicking accidentally in admin dashboards is common.

## Rule

Prefer soft-delete over hard DELETE for any user-facing data. It's reversible, auditable, and costs almost nothing with a partial index.
