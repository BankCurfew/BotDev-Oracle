---
title: Test before overwriting production credentials — FA Tools key swap broke auth
tags: [credentials, env, testing, fa-tools, blocker]
created: 2026-03-18
source: rrr: github.com/BankCurfew/BotDev-Oracle
project: github.com/bankcurfew/botdev-oracle
---

# Test before overwriting production credentials

Overwrote working Supabase anon key (eyJ...) with new iag_ application key in .env without testing first. Result: FA Tools auth broken for the whole team, "Invalid API key" error. Fix was trivial (use both keys separately) but the blocker wasted time. Rule: always test new credentials in isolation before replacing production values. Keep old values commented out, not deleted.

---
*Added via Oracle Learn*
