# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# HeyBoop — Baby Learning Tap Game

**Name:** HeyBoop · **Live:** https://heyboop-449.netlify.app (Netlify, auto-deploys from `main`) · **Domain target:** heyboop.app

A PWA for babies/toddlers (12mo–3yr): tap anywhere on the screen and a giant number/letter/animal/shape pops up with a cheerful voice saying it aloud. Primary devices are iPad Safari and iPhone Safari; must be installable and fully offline-capable.

## Project Status

All 4 build phases (numbers-pack MVP → engine hardening → remaining packs → PWA polish) are shipped and deployed. The engine is frozen — remaining work is content-only: new packs (data file + illustrations + audio, zero engine changes), real voice recordings to replace the Windows-TTS placeholders under `public/audio/`, and the `heyboop.app` domain.

## Commands

```bash
npm run dev              # vite --host, http://localhost:5173 (also LAN — open from iPad on same wifi)
npm run build             # tsc -b && vite build → dist/
npm run preview           # serve dist/ locally to test PWA/offline behavior
npm test                  # vitest run — full suite
npx vitest run src/packs/packs.test.ts   # single test file
npx vitest run -t "name"  # single test by name pattern
npm run lint               # eslint .
npm run format             # prettier --write .
node scripts/generate-assets.mjs   # regenerate PWA icons + iOS splash PNGs from the Boop mascot SVG
netlify deploy --prod      # manual deploy (site already linked; pushes to main auto-deploy too)
```

## Architecture — Content Pack Engine

One generic, data-driven engine renders every category. Adding a pack requires **zero engine changes**: a data file implementing `ContentPack` (`src/packs/`), matching SVG illustrations registered in `src/assets/svg/illustrations.ts`, one line in `src/packs/index.ts`, and audio dropped at `public/audio/<pack>/`. The Home screen card and all tap/audio/animation behavior come for free. `src/packs/packs.test.ts` runs a generic schema check (`describe.each` over the `packs` registry) against every pack — unique ids, palette-only colors, no-repeat-consecutive backgrounds, resolvable illustration/audio paths — so a new pack is validated automatically without writing new assertions.

Key files, and why they matter beyond their own contents:

- **`src/engine/types.ts`** — `PackItem`/`ContentPack` shape. `bonusLabel`/`bonusAudio` on an item (used by Animals/Vehicles) triggers a second-tap payoff ("Cow!" → tap → "Moo!") before advancing.
- **`src/engine/useTapAdvance.ts`** — the pure state machine (`nextTapState`) driving play mode: `entered` → (if item has a bonus, or mode is `repeat`) `engaged` → advance to next index, wrapping if `pack.loop`. `tap()` wraps this in a debounce queue that collapses rapid mashing into at most one pending advance, so audio never overlaps. Read this before touching tap/advance/loop behavior — it's the one place that logic lives.
- **`src/engine/AudioProvider.tsx`** — singleton Web Audio engine. Recorded file (fetched + decoded per pack on load) is the primary path; `speechSynthesis` is a per-item fallback. Several non-obvious iOS Safari fixes live here and should not be "simplified" away: `navigator.audioSession.type = 'playback'` exempts the AudioContext from the hardware silent switch (speechSynthesis has no such exemption and stays muted); the TTS unlock utterance must fire synchronously inside the first user gesture; `speechSynthesis.cancel()` must never be called when nothing is queued (poisons the next `speak()` on iOS); a JS reference to the current `SpeechSynthesisUtterance` must be held or Safari GCs it mid-queue.
- **`src/assets/svg/illustrations.ts`** — registry mapping `PackItem.image` string keys to hand-coded SVG components. All illustrations share one visual contract (see `Animals.tsx`/`Fruits.tsx`/`Shapes.tsx`/`Vehicles.tsx`): `viewBox 0 0 200 200`, Ink (`#2D2A32`) outlines with round joins/caps, flat bright fills from the brand palette, a `Shine`/highlight accent. Match this contract exactly when adding illustrations for a new pack.
- **`src/screens/`** (`Home` → `Play` → `Settings`) — `App.tsx` is a plain screen-state shell (`home | play | settings`), no router.

## Core Design Principles (do not violate these)

1. **Tap-anywhere.** Any tap on the play area advances. No buttons/menus/small hit areas during play.
2. **One thing on screen at a time.** High contrast, bright, zero clutter.
3. **Voice is the product.** Every tap → a clear voice saying the item, felt as instant (respond on `pointerdown`, not `click`).
4. **Repetition is the feature.** Packs loop forever (10 → back to 1, Z → back to A). No win screens, streaks, or progression pressure.
5. **Kid-proof by design.** No links out; settings/exit locked behind the parent gate (press-and-hold 3s on the exit control, filling ring, quick taps do nothing).
6. **Zero data collection.** No analytics, no accounts, no network calls after initial load.

## Touch & Mobile Requirements (critical — get these right)

- `touch-action: manipulation` everywhere; prevent double-tap/pinch zoom.
- Prevent scroll/bounce: fixed positioning, `overscroll-behavior: none`, no scrollable areas in play mode.
- Handle `pointerdown`, not `click`.
- iOS requires a user gesture to unlock audio — `AudioEngine.unlock()` must be called synchronously from the pack-card tap on Home, which also kicks off pre-decoding that pack's audio.
- `viewport-fit=cover`, safe-area insets respected for the exit control placement.
- Disable text selection, long-press context menus, and image dragging.

## Brand

- **Palette:** Sunshine Yellow `#FFD23F` · Coral `#FF6B6B` · Sky Blue `#4ECDC4` · Grape `#8E7CC3` · Leaf Green `#7BC950` · Cream `#FFF8ED` (background) · Ink `#2D2A32` (text/outlines). Rotate item backgrounds through the first five so consecutive items never share a color.
- **Mascot:** Boop — a round yellow blob with big eyes (`BoopMascot.tsx`); appears on Home and bounces in a corner every 5th tap during play.
- **Font:** Fredoka Variable (`@fontsource-variable/fredoka`, self-hosted) for items; system sans for parent UI.
- **Motion:** spring/overshoot easing everywhere via Framer Motion (`stiffness: 420, damping: 17`); never linear. Soft, rounded shapes only.
- **Sound:** warm and gentle; tap feedback is a soft synthesized "boop" under the voice, never harsh or stacked with other audio.

## Accessibility & Wellbeing

- `prefers-reduced-motion` respected; settings toggle can override.
- No flashing/strobing effects.
- Audio ducking: never stack sounds — the current voice always stops before a new one starts.
- No timers, streaks, or notifications — session length is the parent's call.

## Non-Goals

- No accounts, login, backend, or database.
- No in-app purchases, monetization, or progress/analytics tracking.
- No native app packaging (code stays clean enough that React Native/Capacitor is possible later, but don't build for it now).
