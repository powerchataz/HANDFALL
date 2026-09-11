# Changelog

All notable changes to Handfall are documented here, newest first. Format
loosely follows [Keep a Changelog](https://keepachangelog.com/); this is a
single-version prototype under active iteration rather than a versioned
release train, so entries are grouped by date instead of a version number.

## 2026-09-11

### Added

- **Hard Mode** — an opt-in, live-toggleable difficulty mode layering four
  independent hazards on top of a tightened base matching economy: a fog
  sweep, a roulette event, a fused blank/bomb card, and a knife that pins a
  dropped card in place. Tuned over several passes so the knife is the
  rarest hazard by a clear margin and the blank card noticeably less
  frequent than its first pass.
- Realistic fuse-wire physics — swings when the aim moves, visibly burns up
  as the fuse counts down (with dispersing embers), and snaps loose into a
  falling/swinging cut animation if the card is dropped manually before the
  fuse completes.
- A larger, more dramatic knife with a real plunge-in-and-stick impact
  animation, purely cosmetic (never applies force to the pinned card or any
  neighbor).
- A mute toggle for the game's procedural audio.
- PWA install support (`manifest.json`, home-screen icons).
- A CI smoke test (`tests/smoke.js`, run via GitHub Actions on every push
  and pull request) and an automated GitHub Pages deploy workflow.
- MIT license.

### Changed

- Full visual redesign: real animated toggle switches (replacing plain
  checkboxes), hover/press states and elevation on every interactive
  control, animated modal entrances, a branded icon mark, colored HUD chip
  accents, and list-row hover states throughout.
- Production polish: favicon, meta description/theme-color/Open Graph tags,
  an `aria-live` region on toast notifications, and a rewritten README that
  actually matches the current feature set.

### Fixed

- Blank card: fixed detonating instantly at spawn instead of after landing,
  and fixed the ghost/preview card rendering as a broken "undefined" card
  instead of the intended black-bomb design.
- Knife: fixed pinning cards essentially at their spawn point (including,
  in a second pass, cards technically still fractionally above the danger
  line) — a genuinely unfair, near-unavoidable bust rather than a real risk.
- Fog: redesigned from a fixed-width gradient sweep (reported as reading
  like "a beam of light") into an irregular, randomly shaped and positioned
  cloud.
- Achievement toast could render invisibly behind the Game Over modal due
  to a stacking-context/z-index gap.
- Zen mode runs are now correctly excluded from both the Best-score record
  and achievement unlocking, so a practice run (difficulty ramp held at 0)
  can't inflate the real record.

## 2026-09-10

### Added

- Keyboard controls (arrow keys/A-D to aim, Space/Enter to drop) alongside
  the existing pointer/touch input.
- Zen mode — an opt-in practice toggle that holds the difficulty ramp at 0.
- 3 new achievements, a one-time first-run onboarding overlay, a Clear
  Shield (brief danger-timer grace period after clearing a hand), and local
  Run History (last 20 runs).

### Changed

- Retuned the core matching economy across several passes — same-rank
  matching size, spam-heat thresholds, and pressure-ramp pacing — so that
  wide-spread spam-dropping is a genuine risk rather than a free, lower-
  effort strategy, and a resting pile can actually build height before
  being nibbled clear. Pair was briefly retired in favor of 3-card matching
  and then restored once testing showed a 2-card exact match still had a
  real place in the hierarchy.

### Fixed

- The pressure ramp and Bonus Draw countdown no longer advance while the
  player is still on the onboarding modal or Hand Guide, before their first
  drop.

## 2026-09-09

### Fixed

- Game-over detection: replaced a hard velocity gate (which let ordinary
  collision jitter in a dense pile reset the danger timer to zero on
  almost every frame) with logic that correctly accumulates danger time
  against a card that's genuinely stuck above the line.
