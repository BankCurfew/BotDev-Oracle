# CSS Parent State from Child + Avatar Zoom Pattern

**Date**: 2026-03-28
**Context**: fa-recruitment-quiz wiki card 3D flip + avatar circular crop
**Source**: rrr: fa-recruitment-quiz

## Patterns

### 1. `:has()` for Parent-Based-on-Child State
When you need a parent to respond to a child's state (like a wrapper expanding when a card inside it flips), use CSS `:has()`:
```css
.wk-card-wrapper:has(.wk-flipped) {
  aspect-ratio: 3 / 5.5; /* expand when flipped */
  z-index: 10;           /* bring above siblings */
}
```
This eliminates the need for JavaScript state to bubble up to parents. Works in all modern browsers.

### 2. Avatar Zoom = Clip Container + Scaled Image
Never scale the container to zoom an image in a circle:
- **Wrong**: scale the circle → circle gets bigger
- **Right**: outer div (overflow:hidden, border-radius:50%) + inner img (transform: scale(1.35))

### 3. Validate Integration Constraints Early
LIFF, OAuth, embedded WebViews all have domain requirements. Check deployment constraints (URL matching, CORS, redirect rules) BEFORE building the full integration. A 2-minute doc check saves hours of coding that can't work in dev.

## Tags
CSS, has-selector, avatar, zoom, clip, LIFF, integration, mobile, responsive
