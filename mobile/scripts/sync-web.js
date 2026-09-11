// Copies the actual game files from the repo root into mobile/www/, which is
// what Capacitor bundles into the native iOS/Android app. Run this (npm run
// sync-web) before `npx cap sync` any time index.html, manifest.json, or the
// icons change in the repo root — this script is the single place that keeps
// the native app's bundled copy from silently drifting out of date with the
// real game.
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const wwwDir = path.resolve(__dirname, "..", "www");

const FILES = ["index.html", "manifest.json", "icon-512.png", "apple-touch-icon.png"];

fs.mkdirSync(wwwDir, { recursive: true });

for (const file of FILES) {
  const src = path.join(repoRoot, file);
  const dest = path.join(wwwDir, file);
  fs.copyFileSync(src, dest);
  console.log("copied " + file + " -> mobile/www/" + file);
}

console.log("Done. Run `npx cap sync` next to push these into the native projects.");
