# CLAUDE.md — HeyBoop (Baby Learning Tap Game)

**Name:** HeyBoop · **Domain target:** heyboop.app (or heyboop.com)

## Project Overview

A responsive web app for babies and toddlers (roughly 12 months – 3 years). The core interaction: the child taps anywhere on the screen, and something delightful happens — a big number/letter/animal appears with a cheerful voice saying it aloud. This replaces passive cartoon watching with interactive, cause-and-effect learning.

This is a **web-first MVP**. It must work beautifully on iPad Safari and iPhone Safari (primary devices), plus Android Chrome. It should be installable as a PWA so it can run fullscreen from the home screen. A native app may come later — do not over-engineer for that now.

## Core Design Principles (do not violate these)

1. **Tap-anywhere.** Babies cannot hit targets. ANY tap on the play area advances to the next item. No buttons, no menus, no small hit areas during play.
2. **One thing on screen at a time.** One giant number/letter/animal fills the screen. High contrast, bright, friendly. No clutter.
3. **Voice is the product.** Every tap triggers a clear, warm voice saying the item ("Three!", "B!", "Elephant!"). Audio must feel instant (<100ms perceived latency).
4. **Repetition is the feature.** Loops forever: 1→10 then back to 1. A→Z then back to A. No win screens, no progression pressure, no ads, no dark patterns.
5. **Kid-proof by design.** Avoid interactions near screen edges (iOS edge gestures). No links out. Parent controls locked behind a parent gate.
6. **Zero data collection.** No analytics, no accounts, no network calls at runtime after load. Fully offline-capable.

## Brand Direction

- **Name usage:** "HeyBoop" one word, capital H and B. The tap sound/word "boop!" is part of the brand voice — the app can occasionally say a soft "boop!" as tap feedback.
- **Mascot:** a simple round, bouncy blob character ("Boop") with big eyes and a happy face. Appears on the home screen and as a subtle cheerleader in play mode (e.g., bounces in a corner on every 5th tap). Keep it as a simple SVG — a circle with eyes is enough for v1.
- **Palette (bright, high-contrast, baby-friendly):**
  - Sunshine Yellow `#FFD23F`
  - Coral `#FF6B6B`
  - Sky Blue `#4ECDC4`
  - Grape `#8E7CC3`
  - Leaf Green `#7BC950`
  - Cream background `#FFF8ED`, Ink text `#2D2A32`
  - Rotate item backgrounds through the first five; use Cream/Ink for parent-facing screens.
- **Typography:** a chunky, rounded display font for letters/numbers (e.g., Baloo 2 or Fredoka from Google Fonts — self-host, no runtime CDN calls) + a clean sans (system font stack) for parent UI.
- **Motion feel:** everything bounces. Spring/overshoot easing on pops, never linear. Soft, rounded shapes only — no sharp corners anywhere.
- **Sound feel:** warm and gentle. Tap feedback = soft pop/boop sound at low volume under the voice. Never harsh, loud, or startling.

## Tech Stack

- **Vite + React + TypeScript** — single-page app
- **Plain CSS or CSS modules** — no heavy UI library needed; this app is custom visuals
- **Framer Motion** (or CSS animations) for the pop/bounce animations on each tap
- **Web Audio API** for playback (NOT `<audio>` tags — Web Audio gives lower latency and allows pre-decoding). Pre-load and decode all sounds for the active pack on pack selection.
- **Audio content**: Start with browser `speechSynthesis` (Web Speech API) as a fallback, but the primary path is **pre-recorded MP3/OGG files** per item (e.g., `/audio/numbers/3.mp3`). TTS quality varies wildly across devices and sounds robotic on some — pre-recorded is the goal. Structure the code so an `AudioProvider` abstracts this (recorded file if present, TTS fallback).
- **PWA**: vite-plugin-pwa, service worker caching all assets, `display: fullscreen` in manifest, proper icons and splash screens.

## Architecture — Content Pack Engine

Build ONE generic tap engine, and treat each category as a data-driven content pack:

```ts
interface PackItem {
  id: string;          // "3", "b", "elephant"
  display: string;     // "3", "B" — or empty if image-only
  label: string;       // spoken/displayed word: "Three", "B", "Elephant"
  image?: string;      // path to SVG/PNG (animals, fruits)
  audio?: string;      // path to recorded audio file
  color?: string;      // background or accent color for this item
  countVisual?: number; // for numbers: show N apples/stars popping in
}

interface ContentPack {
  id: string;          // "numbers-1-10"
  title: string;       // "Numbers"
  icon: string;
  items: PackItem[];
  loop: boolean;       // true — wraps around at the end
}
```

Launch packs (v1):
1. **Numbers 1–10** — giant numeral + that many objects (apples/stars) popping in one by one, voice counts
2. **ABC (A–Z)** — giant letter, voice says letter name; optionally "A — Apple" with a small illustration
3. **Animals** — big friendly animal illustration, voice says name, plus the animal sound as a bonus second tap ("Cow!" … tap again … "Moo!")
4. **Fruits & Vegetables** — big illustration, voice says name

Adding a pack later must require ONLY a new data file + assets. No engine changes.

### Visual assets
- Use simple, chunky, high-contrast SVG illustrations (flat style, thick outlines). Generate them as inline SVG components or source from an open-license set (e.g., OpenMoji, CC-licensed). Keep a consistent style across packs.
- Each item gets a distinct bright background color from a fixed palette; rotate through the palette so consecutive taps feel visually different.

## Screens / Flow

1. **Home screen (parent-facing, simple):** big cards for each pack. Tapping a card enters play mode immediately.
2. **Play mode (fullscreen):**
   - Item fills the screen, tap anywhere → bounce/pop animation + audio → advance to next item on the following tap (or advance immediately per tap — make this a settings toggle: "repeat on tap" vs "advance on tap"; default = advance)
   - Small, semi-transparent exit control in a corner that requires **press-and-hold 3 seconds** (parent gate) to leave play mode. Show a filling ring during the hold.
   - Debounce rapid mashing: queue at most one pending advance; never overlap audio (stop current audio, start new).
3. **Settings (behind parent gate):** volume, voice repeat mode, reduced motion toggle. Nothing else in v1.

## Touch & Mobile Requirements (critical — get these right)

- `touch-action: manipulation` on everything; prevent double-tap zoom and pinch zoom
- Prevent scroll/bounce: fixed positioning, `overscroll-behavior: none`, no scrollable areas in play mode
- Handle `pointerdown`, not `click` — respond on finger DOWN for perceived instant feedback
- iOS Safari requires a user gesture to unlock audio: unlock/resume the AudioContext on the first tap of the home screen (the pack selection tap), and pre-decode that pack's audio right then
- Support both portrait and landscape; the big item scales with `min(vw, vh)` sizing
- Test target: iPhone (small), iPad (large), and desktop browser (for development)
- `viewport-fit=cover`, safe-area insets respected for the exit control placement
- Disable text selection, context menus (long-press callout on iOS), and image dragging

## Accessibility & Wellbeing

- `prefers-reduced-motion` respected (settings toggle overrides)
- No flashing/strobing effects
- Audio ducking: never stack sounds
- No timers, streaks, notifications, or anything designed to maximize engagement — this is a parent-controlled tool, session length is the parent's call

## Project Structure

```
src/
  engine/          # TapStage, useTapAdvance, AudioProvider, ParentGate
  packs/           # numbers.ts, abc.ts, animals.ts, fruits.ts (data only)
  assets/          # svg illustrations, audio files per pack
  screens/         # Home, Play, Settings
  App.tsx
```

## Build Phases (work in this order, keep each phase shippable)

1. **Phase 1 — Numbers pack, end to end.** Home screen with one card, play mode, tap-anywhere advance, TTS audio, pop animation, parent-gate exit. Deployable and testable on a real iPad.
2. **Phase 2 — Engine hardening.** Audio pre-decode + recorded-file support with TTS fallback, mash debouncing, orientation handling, reduced motion, settings.
3. **Phase 3 — Remaining packs.** ABC, Animals (with animal sounds on second tap), Fruits & Vegetables. Consistent SVG illustration style.
4. **Phase 4 — PWA polish.** Offline caching, installability, icons/splash, Lighthouse PWA pass.

## Non-Goals (v1)

- No accounts, login, backend, or database
- No in-app purchases or monetization
- No progress tracking or "learning analytics"
- No native app packaging (structure code cleanly so React Native/Capacitor is possible later)

## Testing Notes

- Manual test protocol: hand device to an actual toddler; watch for accidental exits, unresponsive taps, audio overlap
- Unit test the pack engine (advance/loop logic, debounce) with Vitest
- Verify audio unlock flow on real iOS Safari — this is the #1 place web baby apps break
