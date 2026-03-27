# Lesson: Thai TTS Numbers + Quiz Question Clarity

**Date**: 2026-03-26
**Source**: FA Recruitment Quiz TTS bug + Full Review
**Confidence**: High (verified in production)

## 1. Thai TTS: Always Write Numbers as Words

ElevenLabs eleven_v3 model reads Arabic numerals unpredictably in Thai context:
- `5:30` → reads as "ห้าจุดสามศูนย์" instead of "ตีห้าครึ่ง"
- `30 วัน` → may read as "สามศูนย์วัน" instead of "สามสิบวัน"
- `24 ชั่วโมง` → inconsistent

**Rule**: Convert ALL numbers in TTS narration text to Thai words before generation.
This applies to both `questions.ts` (display text) and `regen-narrations.sh` (TTS input).

## 2. Quiz Question Clarity = Narration Context + Choice Distinctness

A quiz question fails when:
- Narration asks a vague question ("คุณรู้สึกอย่างไร?") but choices test something specific (business background)
- Choices bundle multiple concepts into one option ("เรียนจบ / สอบผ่าน / ฝึกจนเก่ง")
- Two choices score identically — respondent feels "either works"

**Rule**: The narration's closing question must explicitly frame what dimension is being tested. Choices must be mutually exclusive and each test a distinct level/type.
