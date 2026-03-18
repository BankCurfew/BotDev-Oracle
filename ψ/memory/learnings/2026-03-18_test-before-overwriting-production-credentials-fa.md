---
title: Test before overwriting production credentials. FA Tools key swap broke auth — o
tags: [credentials, env, testing, blocker, fa-tools]
created: 2026-03-18
source: rrr: github.com/BankCurfew/BotDev-Oracle
project: github.com/bankcurfew/botdev-oracle
---

# Test before overwriting production credentials. FA Tools key swap broke auth — o

Test before overwriting production credentials. FA Tools key swap broke auth — overwrote working Supabase anon key with iag_ application key without testing. Always test new credentials in isolation before replacing production values. Keep old values commented out, not deleted.

---
*Added via Oracle Learn*
