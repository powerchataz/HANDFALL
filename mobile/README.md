# Handfall — mobile wrapper

Packages the game (the repo-root `index.html` + `manifest.json` + icons) as a
native iOS and Android app via [Capacitor](https://capacitorjs.com), so it can
be submitted to the App Store and Google Play. The game itself is unchanged
and still works as a plain website/PWA — this is an additional packaging
layer, not a fork of it.

**The repo-root files are the only source of truth.** `mobile/www/` and the
native projects' bundled web-asset folders are pure derived copies —
regenerated, never hand-edited, and gitignored so they can't silently drift
out of sync with what's actually deployed to the website.

## One-time setup

```sh
cd mobile
npm install
```

## Workflow — after any change to the game

Any time `index.html`, `manifest.json`, or the icon files change at the repo
root:

```sh
cd mobile
npm run sync      # copies the repo-root files into www/, then pushes www/ into both native projects
```

(That's `sync-web` + `npx cap sync` chained — see `package.json` if you want
to run either step alone.)

CI (`.github/workflows/mobile-sync-check.yml`) runs the same steps on every
push/PR that touches the game or this directory, so a breakage here (a
renamed file, an invalid `capacitor.config.json`) is caught before it
reaches a real build.

## Building

Both of these need tooling this repo's automated environment doesn't have
(no Mac, no Xcode, no Android SDK/emulator) — they have to be run on your own
machine, or a cloud Mac build service for iOS specifically.

- **Android**: `npx cap open android` opens the project in Android Studio.
  Needs Android Studio installed; CocoaPods/Xcode aren't involved. Also
  buildable headlessly via `cd android && ./gradlew assembleDebug` once the
  Android SDK is set up, and to an AAB for Play Store upload via
  `./gradlew bundleRelease` (needs a signing key configured first).
- **iOS**: `npx cap open ios` opens `ios/App/App.xcworkspace` in Xcode. Needs
  a Mac with Xcode and CocoaPods (`sudo gem install cocoapods`, then
  `cd ios/App && pod install` — this wasn't run when the project was
  scaffolded here since CocoaPods isn't available in this environment).

## App icons & splash screens

Already generated for both platforms from `assets/icon.png` (1024×1024,
matches the game's own favicon/PWA icon) via `@capacitor/assets`. Regenerate
after changing the source icon:

```sh
npx capacitor-assets generate
```

## What's still needed before either store listing — none of this is code

- **Apple Developer Program** membership ($99/year) and a **Google Play
  Console** account ($25 one-time).
- Real device/simulator **screenshots** for each store's required device
  sizes — can't be produced without actually running the built app.
- Each store's listing form: description, category, content/age rating
  questionnaire, and the privacy policy URL (`/privacy.html` at the repo
  root, already written and deployed alongside the game).
- **Code signing**: an Apple signing certificate + provisioning profile
  (via Xcode or App Store Connect), and an Android upload keystore
  (`keytool -genkey ...`, then configure it in `android/app/build.gradle`).
  Never commit signing keys or credentials to this repo — see `.gitignore`.
- **App Store review risk**: Apple's Guideline 4.2 ("Minimum Functionality")
  can reject apps that read as a thin wrapper around a website. This app
  already clears the most common bar for that — it works fully offline,
  has a real native UI shell (not just an address bar), and isn't just an
  embedded iframe of the live site — but it's still worth a first-submission
  buffer in your timeline in case Apple asks for more.
