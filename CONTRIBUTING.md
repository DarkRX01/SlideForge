# Contributing to SlideForge

Thanks for considering contributing. SlideForge is a local, privacy-first AI presentation tool – we welcome patches, docs, and feedback.

## How to Contribute

### Code

1. **Fork** the repo and clone your fork.
2. **Branch** from `main`: `git checkout -b feature/your-feature` or `fix/your-fix`.
3. **Setup**: From repo root, `npm install`, copy `.env.example` to `.env`.
4. **Build**: `npm run build` (see [BUILD_GUIDE.md](BUILD_GUIDE.md) for platform-specific steps).
5. **Test**: `npm run test` (and `npm run test:coverage` if you change logic).
6. **Lint**: `npm run lint` and fix any issues.
7. **Commit**: Use clear messages (e.g. "feat: add X", "fix: Y in Z").
8. **Push** to your fork and open a **Pull Request** against `main`.

We use GitHub Issues and Pull Requests for tracking. Please use the [PR template](.github/PULL_REQUEST_TEMPLATE.md) when opening a PR.

### Documentation

- Fix typos, clarify steps, or add examples in any `.md` file.
- Keep [USER_GUIDE.md](USER_GUIDE.md), [API.md](API.md), and [TROUBLESHOOTING.md](TROUBLESHOOTING.md) in sync with code changes when you touch related features.

### Bug Reports and Feature Requests

- **Bugs**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include OS, Node version, and steps to reproduce.
- **Features**: Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md). Explain the use case and how it fits SlideForge’s offline/privacy focus.

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to keep the community respectful and inclusive.

## Project Structure

- `packages/frontend` – React + Vite UI, canvas (Fabric.js), animations (GSAP/Three.js).
- `packages/backend` – Express API, AI (Ollama), exports (Puppeteer, FFmpeg), images (Stable Diffusion), translation.
- `packages/electron` – Desktop app wrapper and build config.
- `packages/shared` – Shared TypeScript types and constants.

Build order: `shared` → `frontend` & `backend` → `electron` (see root `package.json` scripts).

## Repo discovery

To help others find SlideForge on GitHub, maintainers can set **Repository description** (e.g. *Local AI-powered slide maker – no cloud, full privacy*) and **Topics** (e.g. `ai`, `presentations`, `electron`, `offline-ai`, `ollama`, `stable-diffusion`).

## Questions

Open a [Discussion](https://github.com/DarkRX01/SlideForge/discussions) or an issue with the question label. We’ll do our best to help.

Thanks for helping make SlideForge better.
