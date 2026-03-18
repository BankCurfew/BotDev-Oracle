---
title: Coordination Over Code — BotDev's Real Value
tags: [coordination, team-workflow, brochure-link, qa-pipeline]
created: 2026-03-18
source: "rrr: github.com/BankCurfew/BotDev-Oracle"
project: github.com/BankCurfew/BotDev-Oracle
---

# Coordination Over Code

## Pattern: One directive → parallel team execution → QA FULL PASS

แบงค์'s directive: "ลูกค้าขอโบรชัวร์ → FAQ summary + link + content description"

What BotDev did:
1. Translated directive into specific asks: Writer (copy template), Admin (URL content + code), QA (test plan)
2. Tracked pipeline through blockers: tunnel drops, collecting mode, suffix mismatch, link injection 2/10
3. Relayed information between oracles: Admin fix → QA retest, QA issue → Admin debug
4. Kept BoB informed: cc every step

Result: FULL PASS 10/10 within ~5 hours, 6+ oracles involved.

**Lesson**: BotDev's highest-leverage activity isn't writing code — it's translating product directives into specific, actionable team requests and tracking them to completion. The code can be delegated; the coordination can't.

## Pattern: CONDITIONAL PASS → root cause → FULL PASS

QA first round: 2/10 links. Felt like failure. But Admin diagnosed: alias suffix mismatch ('Non Par', 'Unit Linked'). Fix: strip + fallback + bidirectional matching. Retest: 10/10.

**Lesson**: Don't panic at partial pass. Systematic QA reveals patterns; patterns reveal fixable root causes.

## Pattern: Test infrastructure friction > code bugs

Tunnel down (502), URL changes, collecting mode blocking every request — these caused more delay than the actual suffix mismatch bug.

**Lesson**: Invest in stable test infrastructure. A bypass for collecting mode + stable test URL would 10x QA velocity.
