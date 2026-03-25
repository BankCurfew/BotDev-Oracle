# Multi-tier products need product_uid lookup, not just plan_name

**Date**: 2026-03-22
**Source**: Bug fix — icompare Health Starter ผลประโยชน์เพิ่มเติมไม่แสดง
**Tags**: fa-tools, icompare, supabase, product_benefits, data-fetching

## Pattern

Products like Health Starter have multiple tiers (1M, 2M, 3M SA) sharing the same `plan_name` but with different `product_uid`. When fetching benefits from `product_benefits` table:

- `plan_name` match → ambiguous for multi-tier products → wrong/missing data
- `product_uid` match → specific to exact tier → correct benefits

## Fix Pattern

Always try `product_uid` first (Step 0), then fall back to `plan_name` (Step 1), then `family` (Step 2). PlanMode.tsx had this right; useCompareMode.ts was missing Step 0.

## Applies To

Any Supabase query against `product_benefits` table for health/multi-tier products.
