# 🎨 SlideForge - Your AI-Powered Presentation Sidekick

[![Build and Release](https://github.com/DarkRX01/SlideForge/actions/workflows/release.yml/badge.svg)](https://github.com/DarkRX01/SlideForge/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/DarkRX01/SlideForge?include_prereleases)](https://github.com/DarkRX01/SlideForge/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/DarkRX01/SlideForge/total)](https://github.com/DarkRX01/SlideForge/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Just want to use it?** Grab the [**🪟 Windows installer**](https://github.com/DarkRX01/SlideForge/releases) and you're good to go in 3 clicks!

**What's this?** Think PowerPoint meets AI magic, but everything runs on *your* computer. No cloud BS, no subscriptions, no tracking. Just you, your ideas, and some seriously cool AI tech working together.

---

## 🚀 Get Started (Like, Right Now)

### For Regular Folks (Windows)
1. [**Download the installer**](https://github.com/DarkRX01/SlideForge/releases) 
2. Double-click it
3. That's it. Seriously.

The app opens automatically and you can start making presentations immediately.

👉 **Need help?** Check out the [Windows Install Guide](WINDOWS_INSTALL.md) - it's got screenshots and everything.

**Latest version:** [v1.0.0](https://github.com/DarkRX01/SlideForge/releases/latest)

### Demo

📹 **To add a 30–60s demo:** put your clip in the repo (e.g. `docs/demo.mp4` or `docs/demo.gif`), then add a line here: `[![Demo](docs/demo.gif)](docs/demo.mp4)`. Until then, use the [Ultimate Prompt](docs/ULTIMATE_PROMPT.md) in the AI assistant to see the full stack in action.

### For Developers (Let's Build!)
Jump to the [Development section](#-for-developers) below.

---

## ✨ What Makes This Special?

Here's what you get out of the box:

- **🤖 AI That Actually Helps** - Type "make me a pitch deck about AI ethics" and watch it generate slides with real content. Uses Llama3/Mistral running locally on your machine. Try the **[Ultimate Prompt](docs/ULTIMATE_PROMPT.md)** for a full-stack demo (slides + images + animations + exports).

- **🎨 Editing That Doesn't Suck** - Drag, drop, resize, rotate. Layer management that makes sense. Undo/redo that actually works. You know, the basics done right.

- **✨ Animations That Slap** - Fade, slide, zoom, 3D transitions, particle effects - the works. Built with GSAP and Three.js so everything is buttery smooth.

- **🌍 Speaks All Languages** - Unicode everything. Translate presentations on the fly. RTL support for Arabic/Hebrew. Works with literally any language.

- **🖼️ Generate Images with AI** - Need a picture of "a cat riding a unicorn in space"? The built-in Stable Diffusion has you covered. Or just search Google if you're feeling lazy.

- **📤 Export to Anything** - PDF, PowerPoint (PPTX), HTML, or even MP4 video with animations. Your presentations, your format.

- **🔒 Actually Private** - Everything runs locally. Your data never leaves your computer. No telemetry, no tracking, no cloud nonsense.

---

## 🎯 Real Talk - How Good Is It?

**The good:**
- Actually works offline after setup
- AI is fast (when you have the models downloaded)
- Export quality is legit professional
- No monthly fees or account required

**The honest:**
- First time setup takes ~30 mins (downloading AI models)
- Needs 16GB RAM if you want all AI features
- Windows only for now (Mac/Linux coming soon)

---

## 💻 For Developers

Want to hack on this? Hell yeah.

### Quick Setup

```bash
# Clone it
git clone https://github.com/DarkRX01/SlideForge.git
cd SlideForge

# Install everything
npm install

# Set up env vars
copy .env.example .env

# Fire it up
npm run dev
```

Now hit `http://localhost:3000` and start building.

### What You're Working With

This is a monorepo, organized like this:

```
packages/
├── frontend/    → React app (the UI)
├── backend/     → Express API (handles AI, exports, etc.)
├── electron/    → Desktop wrapper
└── shared/      → TypeScript types shared across packages
```

### Optional: Enable AI Features

```bash
# AI presentation generation (3GB download)
npm run setup:ollama

# AI image generation (7GB download, needs GPU)
npm run setup:sd

# Translation service
npm run setup:translate

# Video export
npm run setup:ffmpeg
```

### Build It Yourself

```bash
# Windows installer
npm run build:win

# Portable version (no install needed)
npm run build:win:portable

# macOS (coming soon)
npm run build:mac

# Linux (coming soon)
npm run build:linux
```

Files end up in `packages/electron/build/`

### Testing

```bash
npm run test              # All tests
npm run test:frontend     # Just React stuff
npm run test:backend      # Just API stuff
npm run test:e2e          # Full integration tests
npm run test:coverage     # See what's covered
```

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (for that fast HMR)
- Tailwind CSS (because utility classes are life)
- Zustand (state management without the headache)
- Fabric.js (canvas editing)
- GSAP + Three.js (animations)

**Backend:**
- Express + TypeScript
- SQLite (via better-sqlite3)
- Socket.io (real-time stuff)
- Sharp (image processing)
- Puppeteer (for exports)
- FFmpeg (video rendering)

**AI Services (all local):**
- Ollama → LLM (Llama3, Mistral, etc.)
- Stable Diffusion → Image generation
- LibreTranslate → Translation
- Whisper.cpp → Speech-to-text
- eSpeak-ng → Text-to-speech

**Desktop:**
- Electron (cross-platform desktop apps)
- electron-builder (packaging)

---

## 📚 Documentation

- [Windows Install Guide](WINDOWS_INSTALL.md) - For end users, super simple
- [Quick Start Guide](QUICK_START.md) - Get running in 5 minutes
- [Build Guide](BUILD_GUIDE.md) - Compile from source
- [User Guide](USER_GUIDE.md) - Complete walkthrough of features
- [**Ultimate Prompt**](docs/ULTIMATE_PROMPT.md) - One prompt to exercise the full stack (slides, images, animations, exports)
- [API Docs](API.md) - REST API reference
- [Troubleshooting](TROUBLESHOOTING.md) - When things go wrong
- [Plugin Development](PLUGIN_DEVELOPMENT.md) - Build your own features
- [Release Guide](RELEASE.md) - How to cut a new release
- [Roadmap](ROADMAP.md) - What's next (Mac/Linux, demo, plugins, etc.)
- [Repo setup](REPO_SETUP.md) - One-time: GitHub description & topics

---

## 🤝 Want to Contribute?

Pull requests welcome! Just:
1. Fork it
2. Make your changes
3. Test it (`npm run test`)
4. Submit a PR

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for the full details.

---

## 📄 License

MIT - do whatever you want with it. See [LICENSE](LICENSE) for the legal stuff.

---

## 🙏 Built With Love Using

- [React](https://react.dev/) - Because it just works
- [Electron](https://www.electronjs.org/) - Desktop apps with web tech
- [GSAP](https://greensock.com/gsap/) - Best animation library, period
- [Fabric.js](http://fabricjs.com/) - Canvas made easy
- [Three.js](https://threejs.org/) - 3D in the browser
- [Ollama](https://ollama.ai/) - Local LLM that doesn't suck
- [Stable Diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui) - AI art generator
- [LibreTranslate](https://libretranslate.com/) - Free translation API
- Plus a ton of other amazing open-source projects

---

## 💬 Get Help

- **Something broken?** [Open an issue](https://github.com/DarkRX01/SlideForge/issues/new)
- **Got questions?** [Start a discussion](https://github.com/DarkRX01/SlideForge/discussions)
- **Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## ⭐ Like This?

If you find this useful, throw it a star! It helps more people discover the project.

---

**Made with ❤️ by [DarkRX01](https://github.com/DarkRX01)**

[Download](https://github.com/DarkRX01/SlideForge/releases/latest) • [Report Bug](https://github.com/DarkRX01/SlideForge/issues/new) • [Request Feature](https://github.com/DarkRX01/SlideForge/issues/new)
