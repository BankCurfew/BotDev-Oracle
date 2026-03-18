---
title: Prove pipeline on 2 cases then let Dev automate the rest — don't manually repeat 174 times
tags: [automation, pipeline, scrape, efficiency, playwright]
created: 2026-03-19
source: rrr: github.com/BankCurfew/BotDev-Oracle
project: github.com/bankcurfew/botdev-oracle
---

# Prove pipeline then automate

LINE OA scrape: built working Playwright pipeline (search → click → extract → parse → INSERT) on 2 contacts, then stopped. Dev automated the remaining 172. BotDev's value = figuring out extraction logic, not clicking buttons 174 times. Rule: if task is repetitive and >10 iterations, prove on 2-3 cases then hand off to automation.

---
*Added via Oracle Learn*
