# SlideForge Roadmap

High-level plan to level SlideForge from “solid Windows app” to a full cross-platform, community-ready product. Priorities are privacy-first, offline AI, and polish.

---

## Short-term (1–2 weeks)

- **Cross-platform: macOS** – Build and test Mac version (DMG/ZIP). Use a Mac or VM; update [BUILD_GUIDE.md](BUILD_GUIDE.md) with Apple Silicon notes and hardware reqs.
- **Published releases** – Tag `v0.1.0` (or `v1.0.0`), ensure [GitHub Actions](.github/workflows/release.yml) upload Windows installer + portable to [Releases](https://github.com/DarkRX01/SlideForge/releases). Add checksums for installers.
- **Demo content** – Add a 30–60 second demo (GIF or MP4) to README showing prompt → slides → export. Before/after screenshots for canvas, AI image gen, and exports.

---

## Medium-term (≈1 month)

- **Linux builds** – Add Debian/RPM (and optionally AppImage) in electron-builder; document in BUILD_GUIDE. Run CI on `ubuntu-latest` for Linux artifacts.
- **CI badges & tests on PRs** – Add workflow that runs `npm run test` (and optionally lint/typecheck) on push/PR. Add status + coverage badges to README.
- **Plugin example** – Ship one concrete example (e.g. custom theme or small AI helper) and document it in [PLUGIN_DEVELOPMENT.md](PLUGIN_DEVELOPMENT.md).
- **Performance & hardware docs** – Benchmarks (e.g. time to generate a 10-slide deck on CPU vs GPU). Troubleshooting for low-spec machines and fallback without Stable Diffusion.

---

## Long-term

- **UI/UX** – Templates gallery, theme picker, better undo/redo (e.g. cap at 50 actions). Drag-and-drop from file explorer; high-DPI and animation tuning (web workers where it helps).
- **AI depth** – Support more models (e.g. Phi-3), prompt helpers in the UI, clearer errors when models fail or aren’t installed.
- **Export quality** – Better animation preservation for PPTX; ODP for LibreOffice; voiceover in MP4 via TTS.
- **Setup experience** – Progressive model downloads (core LLM first, SD optional), in-app setup wizard with progress.
- **Docs & community** – Optional `docs/` site (e.g. MkDocs or GitHub Pages), API docs (e.g. Swagger). Promote on r/LocalLLaMA, r/opensource, Hacker News; gather feedback via issues/Discord.
- **Accessibility** – ARIA on canvas (Fabric.js), color contrast, keyboard nav.
- **Security** – Keep [SECURITY.md](SECURITY.md) and dependency audits up to date; document model trust (e.g. only use trusted Ollama/SD sources).

---

## How to use this

- **Contributors**: Pick an item, open an issue to discuss, then a PR. Check [CONTRIBUTING.md](CONTRIBUTING.md).
- **Users**: Vote with reactions on issues or open new ones; we prioritize what the community needs most.

Goal: **1.0** = Windows + Mac + Linux installers, solid docs, one plugin example, and a clear “anti-Canva” story: local, private, no subscription.
