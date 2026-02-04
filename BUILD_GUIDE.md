# Build Guide - Slides Clone

## Quick Build (Development)

```bash
# 1. Install dependencies (one-time setup)
npm install

# 2. Create environment file
copy .env.example .env

# 3. Start development servers
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

---

## Production Build

### Build All Packages

```bash
# Build frontend, backend, and electron
npm run build
```

### Build Windows Installer

```bash
# Full Windows installer with NSIS (one-click install)
npm run build:win

# Portable version (no installation)
npm run build:win:portable
```

**Output:** `packages/electron/build/`
- `Slides Clone Setup 1.0.0.exe` - Installer
- `SlidesClone-Portable-1.0.0.exe` - Portable

---

## Pre-Build Requirements

### Required Software

1. **Node.js 18+**
   - Download: https://nodejs.org/
   - Check: `node --version`

2. **Python 3.10+** (for AI services)
   - Download: https://www.python.org/
   - Check: `python --version`

3. **Visual Studio Build Tools** (Windows only)
   - Required for `better-sqlite3` native module
   - Download: https://visualstudio.microsoft.com/downloads/
   - Install "Desktop development with C++" workload

### Optional (for AI features)

4. **Ollama** (AI presentation generation)
   ```bash
   npm run setup:ollama
   ```

5. **Stable Diffusion WebUI** (image generation)
   ```bash
   npm run setup:sd
   ```

6. **LibreTranslate** (translation)
   ```bash
   npm run setup:translate
   ```

7. **FFmpeg** (video export)
   ```bash
   npm run setup:ffmpeg
   ```

---

## Build Process Explained

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Root dependencies
- All workspace packages (frontend, backend, electron, shared)
- Native modules (better-sqlite3, canvas, sharp)

**Time:** 5-10 minutes (first time)

### 2. Build Frontend

```bash
npm run build --workspace=packages/frontend
```

Creates:
- Optimized React bundle
- Minified CSS
- Static assets
- Output: `packages/frontend/dist/`

### 3. Build Backend

```bash
npm run build --workspace=packages/backend
```

Creates:
- Compiled TypeScript → JavaScript
- Output: `packages/backend/dist/`

### 4. Build Electron

```bash
npm run build --workspace=packages/electron
```

Creates:
- Electron main process (compiled TypeScript)
- Output: `packages/electron/dist/`

### 5. Package as Desktop App

```bash
npm run build:win
```

electron-builder:
1. Bundles frontend + backend + electron
2. Includes native dependencies
3. Creates installer with NSIS
4. Signs app (if configured)
5. Output: `packages/electron/build/`

**Time:** 10-15 minutes (includes native module rebuilding)

---

## Troubleshooting Build Issues

### Error: "gyp ERR! find VS"

**Cause:** Visual Studio Build Tools not installed

**Fix:**
```bash
# Install Visual Studio 2022 with C++ tools
# Or use:
npm install --global windows-build-tools
```

### Error: "Cannot find module 'better-sqlite3'"

**Cause:** Native module not built correctly

**Fix:**
```bash
cd packages/backend
npm rebuild better-sqlite3
```

### Error: "ENOSPC: System limit for number of file watchers"

**Cause:** Linux file watcher limit (development mode)

**Fix:**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Build Fails with "Out of Memory"

**Cause:** Large codebase + native modules

**Fix:**
```bash
# Increase Node.js memory limit
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Electron Build Fails

**Cause:** Missing dependencies or configuration

**Fix:**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

---

## Build Optimization

### Reduce Bundle Size

1. **Tree Shaking**
   - Already configured in Vite
   - Removes unused code automatically

2. **Code Splitting**
   - Lazy load routes and components
   - Configured in `vite.config.ts`

3. **Asset Optimization**
   - Images compressed with Sharp
   - Fonts subset automatically

### Faster Builds

1. **Incremental Builds**
   ```bash
   # Only rebuild changed packages
   npm run build --workspace=packages/frontend
   ```

2. **Skip Tests**
   ```bash
   # Build without running tests
   npm run build --workspace=packages/frontend -- --skip-tests
   ```

3. **Parallel Builds**
   ```bash
   # Build all packages in parallel (already default)
   npm run build
   ```

---

## CI/CD Build

### GitHub Actions

```yaml
name: Build Windows Installer
on: [push, pull_request]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build:win
      - uses: actions/upload-artifact@v3
        with:
          name: installer
          path: packages/electron/build/*.exe
```

---

## Distribution

### Sign Windows Installer (Optional)

1. Get code signing certificate
2. Configure in `electron-builder`:

```json
{
  "win": {
    "certificateFile": "cert.pfx",
    "certificatePassword": "password"
  }
}
```

### Upload to Release

```bash
# Create GitHub release
gh release create v1.0.0 packages/electron/build/*.exe

# Or use electron-builder auto-publish
npm run build:win -- --publish always
```

---

## Development Build vs Production Build

| Feature | Development | Production |
|---------|------------|------------|
| Minification | ❌ No | ✅ Yes |
| Source Maps | ✅ Full | ✅ Compressed |
| Hot Reload | ✅ Yes | ❌ No |
| Bundle Size | ~50 MB | ~15 MB |
| Build Time | 30s | 5-10 min |
| Debugging | ✅ Easy | ⚠️ Limited |

---

## Next Steps After Building

1. **Test the installer**
   - Run `Slides Clone Setup 1.0.0.exe`
   - Verify installation works
   - Test all features

2. **Test portable version**
   - Run portable .exe
   - Verify no installation required
   - Test on fresh system

3. **Create release**
   - Tag version: `git tag v1.0.0`
   - Push to GitHub
   - Upload installers to Releases page

4. **Update documentation**
   - Update version numbers
   - Document breaking changes
   - Update CHANGELOG.md
