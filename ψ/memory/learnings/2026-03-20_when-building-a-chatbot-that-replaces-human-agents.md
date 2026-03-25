---
title: When building a chatbot that replaces human agents, analyze how those agents act
tags: [chatbot-design, agent-style, LINE, UX, insurance, tone, training]
created: 2026-03-20
source: rrr: BotDev-Oracle
project: github.com/bankcurfew/botdev-oracle
---

# When building a chatbot that replaces human agents, analyze how those agents act

When building a chatbot that replaces human agents, analyze how those agents actually write. Data analysis of 5,544 LINE OA insurance agent messages revealed: median 50 chars, 99.2% no newline, almost no bullet lists. The bot was writing 300+ char template responses. Real agents write one-liners. 5 rules: short (50-80 chars), no lists, split 2-3 messages, real numbers from API, ask before answering. Match the medium — LINE is mobile chat, not email.

---
*Added via Oracle Learn*
