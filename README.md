# node-bridge-website

[**English**](README.md) · [中文](README_zh.md)

The project website for the Node Bridge family — five repositories that embed a **real Node.js
runtime in-process** on Android and HarmonyOS (`dlopen("libnode.so")` + `node::Start`, bridge +
runtime packages per platform, plus a version-matched node-pty addon on Android):

- [aosp-node-bridge](https://github.com/fellow99/aosp-node-bridge) / [aosp-node-runtime](https://github.com/fellow99/aosp-node-runtime) / [aosp-node-pty](https://github.com/fellow99/aosp-node-pty) — Kotlin/JNI, Maven Central / GitHub Release
- [ohos-node-bridge](https://github.com/fellow99/ohos-node-bridge) / [ohos-node-runtime](https://github.com/fellow99/ohos-node-runtime) — ArkTS/NAPI, ohpm

Live site: <https://fellow99.github.io/node-bridge-website/>

## Stack

Plain HTML, CSS and JavaScript — no frameworks, no build step, no external requests:

```
node-bridge-website/
├── index.html          # English
├── index_zh.html       # 简体中文
├── style.css           # token-driven light/dark theme
├── script.js           # theme toggle, nav highlight, reveal-on-scroll
├── images/logo.svg     # favicon / brand mark
└── .github/workflows/pages.yml
```

- **Theme**: `data-theme` on `<html>`, chosen before first paint (localStorage → OS preference),
  persisted per browser.
- **Language**: two static pages cross-linked (no JS routing, works on `file://`).
- **A11y**: skip link, ARIA labels, reduced-motion support, visible focus rings.

## Local preview

Just open `index.html` — or serve the directory:

```bash
npx serve .
```

Pushes to `main` deploy automatically via GitHub Pages (`.github/workflows/pages.yml`).

## License

[MIT](LICENSE)
