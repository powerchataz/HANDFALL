# Handfall

A physics card-drop game: cards fall under gravity onto a table, and any 2–5 *touching* cards that form a valid poker hand (Pair through Royal Flush) clear together for points. Clearing hands is your only real relief from the table overflowing — that tension between where you drop and what you're hoping to complete is the whole game.

Play it by opening `index.html` in a browser (or enable GitHub Pages on this repo to host it).

## How it plays

- **Move** to aim, **tap/click** to drop the current card. The next card up is always previewed.
- Any 2–5 cards that are physically touching and form a poker hand clear together, even inside a larger jumbled pile — chip + rank-value scoring, with a combo multiplier for chaining clears.
- The **Joker** is a rare wild card that instantly completes a match and pays a large bonus.
- An occasional **Bonus Draw** window offers a free pick-of-3 for extra points — but it only opens during calm play; rapid spam-dropping freezes the countdown and actively degrades the cards you're offered, so spamming doesn't pay off.
- **Achievements** unlock permanently (stored locally) and each grants a small permanent score multiplier on every future run. One — Royal Flush — unlocks a deeper card preview.

## Tech

Single self-contained `index.html`. Vanilla JS + HTML5 Canvas 2D, no build step, no external libraries beyond Google Fonts. Procedural audio (Web Audio oscillators) and procedurally drawn cards — no image or sound assets. Progress (best score, achievements) persists via `localStorage`.

## Status

Actively iterated prototype — mechanics, balance, and scope are still being tuned based on playtesting.