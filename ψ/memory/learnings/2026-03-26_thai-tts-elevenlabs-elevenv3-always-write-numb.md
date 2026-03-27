---
title: Thai TTS (ElevenLabs eleven_v3): Always write numbers as Thai words in narration
tags: [tts, elevenlabs, thai, quiz-design, narration, fa-recruitment-quiz]
created: 2026-03-26
source: rrr: BotDev-Oracle
project: github.com/bankcurfew/fa-recruitment-quiz
---

# Thai TTS (ElevenLabs eleven_v3): Always write numbers as Thai words in narration

Thai TTS (ElevenLabs eleven_v3): Always write numbers as Thai words in narration text. Arabic numerals read unpredictably — 5:30 becomes "ห้าจุดสามศูนย์" not "ตีห้าครึ่ง". Convert ALL numbers before TTS generation in both display text and TTS script.

Quiz question design: Narration's closing question must explicitly frame what dimension is being tested. Vague endings like "คุณรู้สึกอย่างไร?" fail when choices secretly test something specific (e.g., business background). Choices must be mutually exclusive — bundling multiple concepts ("เรียนจบ/สอบผ่าน/ฝึกจนเก่ง") into one option creates overlap. Two choices with identical scores feel interchangeable to respondents.

---
*Added via Oracle Learn*
