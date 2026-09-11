// Lightweight smoke test for CI: loads index.html in headless Chromium and
// checks the game boots cleanly and its core UI actually works. Not a
// replacement for real playtesting — just enough to catch "the page is
// broken" before it ships (a bad edit, a JS syntax error, a dead button).
const { chromium } = require('playwright');
const path = require('path');

function fail(msg) {
  console.error('FAIL: ' + msg);
  process.exitCode = 1;
}
function ok(msg) {
  console.log('OK: ' + msg);
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 420, height: 800 } });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push('CONSOLE: ' + msg.text());
  });

  const fileUrl = 'file://' + path.resolve(__dirname, '..', 'index.html');
  await page.goto(fileUrl);
  await page.waitForSelector('#game');
  ok('page loaded and canvas is present');

  const onboardHidden = await page.getAttribute('#onboardOverlay', 'hidden');
  if (onboardHidden === null) {
    await page.click('#onboardStart');
  }
  await page.waitForTimeout(100);
  const onboardHiddenAfter = await page.getAttribute('#onboardOverlay', 'hidden');
  if (onboardHiddenAfter === null) fail('onboarding overlay did not close after clicking Let\'s play');
  else ok('onboarding dismissed correctly');

  // Drop a card and confirm the score chip is still a valid number (not
  // NaN/undefined — the most common symptom of a broken scoring change).
  const canvas = await page.$('#game');
  const box = await canvas.boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + 20);
  await page.waitForTimeout(150);
  const scoreText = await page.textContent('#scoreVal');
  if (!/^\d[\d,]*$/.test(scoreText.trim())) fail('score display is not a valid number after a drop: "' + scoreText + '"');
  else ok('score display valid after a drop: ' + scoreText.trim());

  // Toggle switches should flip state without throwing.
  await page.check('#zenToggle');
  await page.check('#hardToggle');
  const zenChecked = await page.isChecked('#zenToggle');
  const hardChecked = await page.isChecked('#hardToggle');
  if (!zenChecked || !hardChecked) fail('Zen/Hard toggles did not register as checked');
  else ok('Zen and Hard toggles both engage correctly');
  await page.uncheck('#zenToggle');
  await page.uncheck('#hardToggle');

  // Mute button should flip aria-pressed/label without throwing.
  const mutedBefore = await page.getAttribute('#muteBtn', 'aria-pressed');
  await page.click('#muteBtn');
  const mutedAfter = await page.getAttribute('#muteBtn', 'aria-pressed');
  if (mutedBefore === mutedAfter) fail('mute button did not change aria-pressed state');
  else ok('mute button toggles correctly');
  await page.click('#muteBtn'); // leave it unmuted for a clean end state

  // Each modal should open and close cleanly.
  for (const [openBtn, overlay, closeBtn] of [
    ['#guideBtn', '#guideOverlay', '#guideClose'],
    ['#achvBtn', '#achvOverlay', '#achvClose'],
    ['#historyBtn', '#historyOverlay', '#historyClose'],
  ]) {
    await page.click(openBtn);
    await page.waitForTimeout(80);
    const hidden = await page.getAttribute(overlay, 'hidden');
    if (hidden !== null) fail(overlay + ' did not open from ' + openBtn);
    await page.click(closeBtn);
    await page.waitForTimeout(80);
    const hiddenAfter = await page.getAttribute(overlay, 'hidden');
    if (hiddenAfter === null) fail(overlay + ' did not close from ' + closeBtn);
  }
  ok('all three modals (Guide, Achievements, History) open and close correctly');

  if (errors.length) {
    console.log('--- JS errors/console errors encountered ---');
    errors.forEach((e) => console.log(e));
    process.exitCode = 1;
  } else {
    console.log('No JS errors during smoke test.');
  }

  await browser.close();
  process.exit(process.exitCode || 0);
})();
