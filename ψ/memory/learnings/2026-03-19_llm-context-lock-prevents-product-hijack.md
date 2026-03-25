# Lesson: LLM Prompt ต้องมี Context Lock ป้องกัน Product Hijack

**Date**: 2026-03-19
**Source**: Jarvis Bot Training Round 3 regression (77% → 53%)
**Tags**: prompt-engineering, context-lock, llm-behavior, jarvis

## Pattern

เมื่อ system prompt ยาวขึ้น (เพิ่ม patterns, rules, examples) LLM มี tendency สลับ product category โดยไม่ตั้งใจ โดยเฉพาะ product ที่ดู "safe" สำหรับทุกสถานการณ์ (เช่น Saving Sure = สะสมทรัพย์)

## Evidence

- Round 3: เพิ่ม radical honesty + combo pricing → Saving Sure hijack 5+ answers
- "เสียเงินฟรี" (บริบทสุขภาพ) → bot แนะนำ Saving Sure แทน UDR
- "ปรึกษาสามีก่อน" → bot แนะนำ Saving Sure แทนให้ข้อมูลเพิ่ม

## Solution

1. CONTEXT LOCK: ถ้าคุยหมวด X → stay หมวด X ห้ามกระโดด
2. NEVER DO explicit: ระบุชัดว่าห้ามแนะนำ product Y ในบริบท X
3. Trigger words: ระบุว่า product Y แนะนำเฉพาะเมื่อลูกค้าพูด keyword Z
4. Competitor context lock: เปรียบเทียบบริษัทอื่นต้อง stay ในหมวดเดิม

## Takeaway

Prompt ยาวขึ้น ≠ ดีขึ้น ต้องมี guardrails เพิ่มตาม เหมือนเขียน code — ยิ่ง feature เยอะ ยิ่งต้อง test เยอะ
