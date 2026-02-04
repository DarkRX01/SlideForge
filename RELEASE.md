# How to Create a Release

## Automated GitHub Release (Recommended)

The repository is configured with GitHub Actions to automatically build and release Windows installers.

### Step 1: Create a Git Tag

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### Step 2: Wait for Build

GitHub Actions will automatically:
1. Build the Windows installer
2. Build the portable version
3. Create a GitHub release
4. Upload both .exe files

Check progress at: https://github.com/DarkRX01/Local-Ai-slides/actions

### Step 3: Download from Releases

Once complete, installers will be available at:
https://github.com/DarkRX01/Local-Ai-slides/releases

---

## Manual Release (Alternative)

If you prefer to build and release manually:

### 1. Build Locally

```bash
# Install dependencies (first time only)
npm install

# Build Windows installer
npm run build:win

# Build portable version
npm run build:win:portable
```

**Output location:** `packages/electron/build/`

**Expected files:**
- `Slides Clone Setup 1.0.0.exe` (~250 MB)
- `SlidesClone-Portable-1.0.0.exe` (~250 MB)

### 2. Create GitHub Release

1. Go to https://github.com/DarkRX01/Local-Ai-slides/releases
2. Click **"Draft a new release"**
3. Choose a tag (e.g., `v1.0.0`)
4. Set release title: `v1.0.0 - Initial Release`
5. Add release notes:

```markdown
## Slides Clone v1.0.0 - Initial Release

A fully local, AI-powered presentation builder that runs entirely on your machine.

### 🎉 Features
- ✅ AI-powered presentation generation (Ollama)
- ✅ Advanced slide editor with drag-and-drop
- ✅ Professional animations (GSAP + Three.js)
- ✅ Image generation (Stable Diffusion)
- ✅ Multi-language support (100+ languages)
- ✅ Export to PDF, PPTX, HTML, Video
- ✅ Voice commands and TTS
- ✅ 100% offline after setup

### 📥 Downloads

**Windows Installer (Recommended)**
- `Slides-Clone-Setup-1.0.0.exe` - One-click installer with auto-updater

**Portable Version**
- `SlidesClone-Portable-1.0.0.exe` - No installation required, run from anywhere

### 📋 System Requirements
- Windows 10/11 (64-bit)
- 4 GB RAM minimum (16 GB recommended for AI features)
- 500 MB storage (10 GB for AI models)

### 📚 Documentation
- [Windows Installation Guide](https://github.com/DarkRX01/Local-Ai-slides/blob/main/WINDOWS_INSTALL.md)
- [Quick Start Guide](https://github.com/DarkRX01/Local-Ai-slides/blob/main/QUICK_START.md)
- [User Guide](https://github.com/DarkRX01/Local-Ai-slides/blob/main/USER_GUIDE.md)

### 🐛 Known Issues
None reported yet!

### 🙏 Credits
Built with React, Electron, GSAP, Fabric.js, Ollama, and love.
```

6. Drag and drop the .exe files
7. Click **"Publish release"**

---

## Quick Release Command

```bash
# Tag, build, and prepare for release
git tag v1.0.0 && \
git push origin v1.0.0 && \
npm run build:win && \
npm run build:win:portable
```

Then manually upload from `packages/electron/build/` to GitHub Releases.

---

## Release Checklist

Before creating a release:

- [ ] All tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] Version updated in `package.json`
- [ ] Version updated in `packages/electron/package.json`
- [ ] CHANGELOG.md updated (if exists)
- [ ] README.md reflects latest features
- [ ] All documentation up to date
- [ ] Tag follows semantic versioning (v1.0.0, v1.1.0, etc.)

---

## Troubleshooting Build Issues

### "gyp ERR! find VS"
Install Visual Studio Build Tools:
```bash
npm install --global windows-build-tools
```

### "Out of memory"
Increase Node.js memory:
```bash
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build:win
```

### Build takes too long
- Close other applications
- Disable antivirus temporarily
- Use SSD storage
- Typical build time: 10-20 minutes

---

## Automated Release Schedule

You can set up automated releases on schedule:

1. Go to `.github/workflows/release.yml`
2. Add schedule trigger:

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight
  push:
    tags:
      - 'v*'
```

---

## Next Steps After Release

1. Announce on social media
2. Update README with download badge
3. Monitor GitHub issues
4. Collect user feedback
5. Plan next version
