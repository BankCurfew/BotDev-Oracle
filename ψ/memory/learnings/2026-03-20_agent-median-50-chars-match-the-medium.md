# Agent median = 50 chars — match the medium

**Date**: 2026-03-20
**Source**: Data-Oracle Style Guide v1, analysis of 5,544 real agent messages

## Pattern

When building a chatbot that replaces human agents, analyze how those agents actually write — not how you think they should write. Data analysis of 5,544 LINE OA messages from real insurance agents revealed:

- **Median message length: 50 characters** (not 300+ like the bot was doing)
- **99.2% of messages contain no newline** — single continuous sentence
- **Bullet lists, numbered lists: almost never used** by real agents
- **2-3 short messages** beat 1 long message every time

The bot was writing like an email. Real agents write like a chat. The medium is LINE — mobile, small screen, fast scrolling. Match the medium.

## 5 Rules Derived

1. Short: 50-80 chars target, never exceed 200
2. No lists: write continuous sentences, no bullets
3. Split: 2-3 short messages > 1 long message
4. Real numbers: give actual premium from FA Tools, not general principles
5. Ask first: don't dump information, ask one question at a time

## Anti-pattern

```
"สำหรับลูกค้าอายุ 35 ปี เพศชาย มี 3 แผนแนะนำดังนี้ครับ:
1. Health Happy 5 ล้านบาท เบี้ย 18,300 บาท/ปี
2. Health Happy 15 ล้านบาท เบี้ย 32,500 บาท/ปี
3. Health Happy 25 ล้านบาท เบี้ย 44,150 บาท/ปี"
```

## Correct pattern

```
"อายุ 35 ปี ดูแผน 5 ล้านน่าสนใจเลยครับ เบี้ย 18,300/ปี"

"ถ้าอยากวงเงินมากขึ้น แผน 15 ล้านก็มีครับ"
```
