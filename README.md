# Handfall

A physics card-drop game: cards fall under gravity onto a table, and any 2–5 *touching* cards that form a valid poker hand (Match through Royal Flush) clear together for points. Clearing hands is your only real relief from the table overflowing — that tension between where you drop and what you're hoping to complete is the whole game.

Play it by opening `index.html` in a browser (or enable GitHub Pages on this repo to host it).

## Controls

- **Pointer/touch**: move to aim, tap/click to drop the current card.
- **Keyboard**: arrow keys or A/D to aim, Space or Enter to drop.

The next card up is always previewed; unlocking the Royal Flush achievement adds a second, fainter "Oracle" preview one card further out.

## How it plays

- Any 2–5 cards that are physically touching and form a poker hand clear together, even inside a larger jumbled pile — chip + rank-value scoring, with a combo multiplier for chaining clears.
- The **Joker** is a rare wild card that instantly completes a match and pays a large bonus.
- An occasional **Bonus Draw** window offers a free pick-of-3 for extra points — but it only opens during calm play; rapid spam-dropping freezes the countdown and actively degrades the cards you're offered, so spamming doesn't pay off.
- **Achievements** (15 total) unlock permanently, stored locally, and each grants a small permanent score multiplier on every future run.
- **Run history** (last 20 runs — score, best hand, duration, date) is kept locally and viewable in-game.

## Zen mode

An opt-in, live-toggleable practice mode that holds the difficulty ramp at 0 — no rising danger line, no escalating pace pressure. You can still see your score as you play, but any run Zen ever touched is excluded from Best and from achievement unlocking, so a practice run can never inflate the real record.

## Hard Mode

An opt-in, live-toggleable difficulty mode. It tightens the base matching economy (fewer Jokers, earlier rank-duplicate starvation, a smaller eligible-hand-size cap under heat) and layers on four independent hazards, each on its own uncorrelated timer:

- **Fog** — an irregular, randomly shaped and positioned cloud sweeps across a random section of the table, reducing card visibility. Purely visual; never changes a card's rank, suit, or match eligibility.
- **Roulette** — a brief suspenseful "spin" that resolves to safe most of the time, or a real but modest hit (a danger-timer jolt plus one extra unplanned card). Pure hazard, no upside.
- **Blank card** — a rare card that detonates once it lands, scattering and sometimes deleting a few nearby cards for zero points. A sparking fuse wire creeps toward it once it's up next; drop it yourself before the fuse runs out, or it auto-drops when the fuse reaches the end. Dropping it early snaps the wire loose, and it swings and falls away instead of just vanishing.
- **Knife** — the rarest hazard by design. It pins the most recently dropped in-flight card exactly where it is, permanently, with a plunge-in-and-stick animation. The pin is purely positional — it doesn't delete, descore, or otherwise affect the card beyond freezing it in place, and never touches any other card.

Unlike Zen, Hard Mode does **not** exclude a run from Best or achievements — it's strictly harder, never easier, so there's no fairness case for disqualifying it. History entries carry a `HARD` tag for transparency (same pattern as Zen's `ZEN` tag), and both can be active on the same run at once.

## Tech

Single self-contained `index.html`. Vanilla JS + HTML5 Canvas 2D, no build step, no external libraries beyond Google Fonts. Procedural audio (Web Audio oscillators) and procedurally drawn cards — no image or sound assets. Progress (best score, achievements, run history, Zen/Hard toggle state, onboarding) persists via `localStorage`.

## Status

Actively iterated prototype — mechanics, balance, and scope are still being tuned based on playtesting.
