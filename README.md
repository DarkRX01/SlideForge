# 🎨 Slides Clone

[![GitHub release](https://img.shields.io/github/v/release/DarkRX01/Local-Ai-slides?include_prereleases)](https://github.com/DarkRX01/Local-Ai-slides/releases)
[![GitHub downloads](https://img.shields.io/github/downloads/DarkRX01/Local-Ai-slides/total)](https://github.com/DarkRX01/Local-Ai-slides/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **For End Users**: Want to install and start using the app? See [**🪟 Windows Install Guide**](WINDOWS_INSTALL.md) for super simple 3-step installation!

A fully local, AI-powered presentation builder that runs entirely on your machine. Create stunning presentations with AI assistance, advanced animations, multi-language support, and image generation.

## 🚀 Quick Start

### Windows Users (Easiest)
1. **Download** the latest `.exe` from [**Releases**](https://github.com/DarkRX01/Local-Ai-slides/releases)
2. **Double-click** to install
3. **Done!** App launches automatically

👉 **[Full Windows Install Guide](WINDOWS_INSTALL.md)**

**Latest Release:** [v1.0.0](https://github.com/DarkRX01/Local-Ai-slides/releases/latest)

### Developers
See the [Development Setup](#development) section below.

## Features

- 🤖 **AI-Powered Generation**: Create entire presentations from prompts using local LLM models
- 🎨 **Advanced Editor**: Drag-and-drop slide editor with Fabric.js
- ✨ **Animations**: Professional animations with GSAP and Three.js
- 🌍 **Multi-Language**: Full Unicode support with LibreTranslate integration
- 🖼️ **Image Generation**: Local image generation with Stable Diffusion
- 📤 **Export**: Export to PDF, PPTX, HTML, and Video formats
- 🔒 **Fully Local**: Works entirely offline after initial setup

## Architecture

This is a monorepo with the following packages:

```
packages/
├── frontend/      # React + Vite frontend
├── backend/       # Express + SQLite backend
├── electron/      # Electron desktop wrapper
└── shared/        # Shared TypeScript types
```

## Development

### Prerequisites

- Node.js 18+
- Python 3.10+ (for AI services)
- Visual Studio Build Tools (Windows only)

### Setup

```bash
# Clone the repository
git clone https://github.com/DarkRX01/Local-Ai-slides.git
cd Local-Ai-slides

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Start development servers
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

### Optional AI Services

```bash
# Install Ollama for AI generation
npm run setup:ollama

# Install Stable Diffusion for image generation
npm run setup:sd

# Install LibreTranslate for translation
npm run setup:translate

# Install FFmpeg for video export
npm run setup:ffmpeg
```

## Building

### Development Build

```bash
npm run build
```

### Production Builds

```bash
# Windows installer
npm run build:win

# Windows portable
npm run build:win:portable

# macOS
npm run build:mac

# Linux
npm run build:linux
```

Output will be in `packages/electron/build/`

## Testing

```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend

# Generate coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Documentation

- [Windows Installation Guide](WINDOWS_INSTALL.md) - For end users
- [Quick Start Guide](QUICK_START.md) - 5-minute setup
- [Build Guide](BUILD_GUIDE.md) - Building from source
- [User Guide](USER_GUIDE.md) - Complete feature walkthrough
- [API Documentation](API.md) - REST API reference
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues
- [Plugin Development](PLUGIN_DEVELOPMENT.md) - Creating plugins
- [Release Guide](RELEASE.md) - How to create releases

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- Fabric.js (canvas editing)
- GSAP + Three.js (animations)

### Backend
- Express
- SQLite (better-sqlite3)
- Socket.io (WebSocket)
- Sharp (image processing)
- Puppeteer (exports)
- FFmpeg (video export)

### AI Services
- Ollama (local LLM)
- Stable Diffusion (image generation)
- LibreTranslate (translation)
- Whisper.cpp (speech-to-text)
- eSpeak-ng (text-to-speech)

### Desktop
- Electron
- electron-builder

## Project Structure

```
.
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── packages/
│   ├── frontend/         # React application
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── stores/      # Zustand stores
│   │   │   ├── services/    # API client, WebSocket
│   │   │   └── workers/     # Web Workers
│   │   └── package.json
│   ├── backend/          # Express API server
│   │   ├── src/
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # AI, image, export services
│   │   │   ├── models/      # Database models
│   │   │   └── utils/       # Utilities
│   │   └── package.json
│   ├── electron/         # Desktop application
│   │   ├── src/
│   │   │   ├── main.ts      # Main process
│   │   │   ├── preload.ts   # Preload script
│   │   │   └── ipc-handlers.ts  # IPC handlers
│   │   └── package.json
│   └── shared/           # Shared types
│       ├── src/types/
│       └── package.json
├── scripts/              # Build and setup scripts
├── .env.example          # Environment variables template
├── package.json          # Root package.json
└── README.md
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:
- Code style
- Pull request process
- Development workflow
- Testing requirements

## License

MIT License - see [LICENSE](LICENSE) file for details

## Credits

Built with:
- [React](https://react.dev/) - UI framework
- [Electron](https://www.electronjs.org/) - Desktop framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Fabric.js](http://fabricjs.com/) - Canvas library
- [Three.js](https://threejs.org/) - 3D library
- [Ollama](https://ollama.ai/) - Local LLM
- [Stable Diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui) - Image generation
- [LibreTranslate](https://libretranslate.com/) - Translation
- And many more amazing open-source projects!

## Support

- **Issues**: [GitHub Issues](https://github.com/DarkRX01/Local-Ai-slides/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DarkRX01/Local-Ai-slides/discussions)
- **Wiki**: [GitHub Wiki](https://github.com/DarkRX01/Local-Ai-slides/wiki)

## Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Made with ❤️ by DarkRX01**

[Download Latest Release](https://github.com/DarkRX01/Local-Ai-slides/releases/latest) | [Report Bug](https://github.com/DarkRX01/Local-Ai-slides/issues/new) | [Request Feature](https://github.com/DarkRX01/Local-Ai-slides/issues/new)
