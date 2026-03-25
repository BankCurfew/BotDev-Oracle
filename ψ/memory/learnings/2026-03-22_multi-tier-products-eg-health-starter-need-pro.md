---
title: Multi-tier products (e.g. Health Starter) need product_uid lookup before plan_na
tags: [fa-tools, icompare, supabase, product_benefits, multi-tier, data-fetching]
created: 2026-03-22
source: rrr: BotDev-Oracle
project: github.com/bankcurfew/iagencyaiafatools
---

# Multi-tier products (e.g. Health Starter) need product_uid lookup before plan_na

Multi-tier products (e.g. Health Starter) need product_uid lookup before plan_name when fetching from product_benefits table. plan_name is ambiguous for multi-tier products → wrong/missing benefits data. Always: Step 0 product_uid → Step 1 plan_name → Step 2 family fallback.

---
*Added via Oracle Learn*
