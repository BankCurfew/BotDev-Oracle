---
title: Write integration spec before receiving data — define schema, format, quality rules upfront
tags: [integration, pipeline, spec, data-quality, process]
created: 2026-03-19
source: rrr: github.com/BankCurfew/BotDev-Oracle
project: github.com/bankcurfew/botdev-oracle
---

# Write integration spec before receiving data

When expecting data from other teams (QA, Data, Researcher), write a full spec BEFORE they start work: schema fields, data types, JSON format with copy-paste examples, quality rules, delivery method. Like an API contract — agree on interface before implementation. Prevents back-and-forth reformatting and bad data entering the system.

Applied: training-data-spec.md for QA (Q&A pairs → kb_benchmarks) + Data (sales scripts → kb_chunks). Queried existing table schemas first, then wrote spec that matches exactly.

---
*Added via Oracle Learn*
