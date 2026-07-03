# TypeSprint PWA ⌨️
[![Pages Deploy](https://img.shields.io/github/actions/workflow/status/BOSSincrypto/typing-trainer/deploy-pages.yml?branch=main&label=Pages%20Deploy)](https://github.com/BOSSincrypto/typing-trainer/actions/workflows/deploy-pages.yml)
[![Release Please](https://img.shields.io/github/actions/workflow/status/BOSSincrypto/typing-trainer/release-please.yml?branch=main&label=Auto%20Release)](https://github.com/BOSSincrypto/typing-trainer/actions/workflows/release-please.yml)
[![Latest Release](https://img.shields.io/github/v/release/BOSSincrypto/typing-trainer?sort=semver)](https://github.com/BOSSincrypto/typing-trainer/releases)
[![PWA Ready](https://img.shields.io/badge/PWA-installable-4ade80?logo=pwa)](https://web.dev/progressive-web-apps/)
[![Offline First](https://img.shields.io/badge/offline-first-0f1115?logo=googlechrome&logoColor=white)](https://developer.mozilla.org/docs/Web/Progressive_web_apps)

Mobile-first typing trainer with zero dependencies and full offline support.
Built as pure HTML/CSS/JS and tuned for Android “Add to Home Screen”.

## Live
- Demo: `https://bossincrypto.github.io/typing-trainer/`
- Repo: `https://github.com/BOSSincrypto/typing-trainer`

## Why this project feels premium
- ⚡ Fast startup and tiny footprint (no build tool required)
- 📱 Mobile UX first (works naturally with touch keyboard/IME)
- 🌍 RU/EN word packs with saved preferences
- 📴 Offline-first architecture via Service Worker cache
- 🧠 Session metrics + local history for progress tracking
- 🚀 CI/CD on GitHub Actions (Pages deploy + automatic releases)

## PWA for Android
The app is configured as installable PWA:
- valid `manifest.json` with app metadata
- 192x192 + 512x512 + maskable icons
- standalone display mode
- service worker caching core assets for offline use

Install on Android:
1. Open the app URL in Chrome.
2. Tap browser menu.
3. Choose **Add to Home Screen** / **Install app**.

## Local run
Use any static server (do not open with `file://`):

```bash
python -m http.server 8777
# or
npx serve .
```

Open `http://localhost:8777/`.

## GitHub Pages deployment
Pages is deployed automatically from `main` via `.github/workflows/deploy-pages.yml`.

On GitHub (one-time check):
1. `Settings` → `Pages`
2. Source: **GitHub Actions**

## Automatic releases
Release automation is configured with Release Please:
- workflow: `.github/workflows/release-please.yml`
- config: `release-please-config.json`
- manifest: `.release-please-manifest.json`

Recommended commit style for clean semver bumps:
- `feat: ...` → minor
- `fix: ...` → patch
- `feat!: ...` or `BREAKING CHANGE:` → major

## Project structure
```text
.
├─ index.html
├─ styles.css
├─ app.js
├─ sw.js
├─ manifest.json
├─ icons/
│  ├─ icon.svg
│  ├─ icon-192.png
│  ├─ icon-512.png
│  └─ maskable-512.png
└─ .github/workflows/
   ├─ deploy-pages.yml
   └─ release-please.yml
```

## Tech details
- Input handled by hidden `<input>` to keep native keyboard behavior.
- Metric: chars/min and accuracy with strict error accounting.
- Local storage keys: `tt_lang`, `tt_time`, `tt_hist`.
- Service worker cache versioning via `CACHE` constant in `sw.js`.

## Tags
#typing-trainer #pwa #javascript #github-pages #offline-first #mobile-web
