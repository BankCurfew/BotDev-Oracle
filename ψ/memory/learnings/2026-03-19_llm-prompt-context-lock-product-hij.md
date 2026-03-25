---
title: LLM Prompt ต้องมี Context Lock ป้องกัน Product Hijack — เมื่อ system prompt ยาวข
tags: [prompt-engineering, context-lock, llm-behavior, jarvis, regression-prevention]
created: 2026-03-19
source: rrr: BotDev-Oracle — Jarvis Training 5 Rounds
project: github.com/bankcurfew/botdev-oracle
---

# LLM Prompt ต้องมี Context Lock ป้องกัน Product Hijack — เมื่อ system prompt ยาวข

LLM Prompt ต้องมี Context Lock ป้องกัน Product Hijack — เมื่อ system prompt ยาวขึ้น LLM มี tendency สลับ product category (เช่น Saving Sure hijack ในบริบทสุขภาพ). Fix: CONTEXT LOCK (stay ในหมวดเดิม) + explicit NEVER DO + trigger words (product Y เฉพาะเมื่อลูกค้าพูด keyword Z). Evidence: Round 3 regression 77%→53% จาก Saving Sure hijack 5+ answers.

---
*Added via Oracle Learn*
