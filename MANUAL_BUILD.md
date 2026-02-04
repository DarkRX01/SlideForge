# 🔨 Manual Build Instructions - Windows .exe

Since GitHub Actions is being annoying, here's how to build the Windows installer yourself.

## Prerequisites (One-Time Setup)

### 1. Install Node.js
- Download: https://nodejs.org/en/download
- Get the LTS version (18.x or 20.x)
- Just click through the installer

### 2. Install Visual Studio Build Tools
This is needed for `better-sqlite3` (native module).

**Option A: Full Visual Studio (Recommended)**
- Download: https://visualstudio.microsoft.com/downloads/
- Get "Visual Studio 2022 Community" (free)
- During install, select: **"Desktop development with C++"**
- Size: ~7 GB

**Option B: Build Tools Only (Smaller)**
- Download: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
- Select: **"Desktop development with C++"**
- Size: ~4 GB

### 3. Install Python
- Download: https://www.python.org/downloads/
- Get Python 3.10 or 3.11
- **Important:** Check "Add Python to PATH" during install

## Build Steps

### 1. Clone the Repo (if you haven't)

```bash
git clone https://github.com/DarkRX01/Local-Ai-slides.git
cd Local-Ai-slides
```

### 2. Install Dependencies

```bash
npm install
```

This takes 5-10 minutes. You'll see some warnings - that's normal.

If you get errors about `better-sqlite3`, run:
```bash
npm install --build-from-source
```

### 3. Build Windows Installer

```bash
npm run build:win
```

**Time:** 15-25 minutes
**Output:** `packages/electron/build/Slides Clone Setup 1.0.0.exe`

### 4. Build Portable Version (Optional)

```bash
npm run build:win:portable
```

**Output:** `packages/electron/build/SlidesClone-Portable-1.0.0.exe`

## Troubleshooting

### "gyp ERR! find VS"

**Problem:** Can't find Visual Studio

**Fix:**
```bash
npm install --global windows-build-tools
```

Or manually set the path:
```bash
npm config set msvs_version 2022
```

### "Python not found"

**Fix:**
```bash
# Check Python is installed
python --version

# If not found, add to PATH or reinstall Python with "Add to PATH" checked
```

### "Out of memory"

**Fix:** Increase Node.js memory limit
```bash
set NODE_OPTIONS=--max-old-space-size=4096
npm run build:win
```

### Build is super slow

**Normal.** Building Electron apps takes time:
- Install dependencies: 5-10 min
- Build frontend/backend: 5-10 min
- electron-builder: 10-15 min
- **Total: 20-30 minutes**

Close other apps, grab a coffee.

### "UnhandledPromiseRejectionWarning"

Usually safe to ignore unless build actually fails.

## Where Are the Files?

After successful build:

```
packages/electron/build/
├── Slides Clone Setup 1.0.0.exe     (~250 MB)
└── win-unpacked/                     (unpacked files)
```

Or for portable:
```
packages/electron/build/
└── SlidesClone-Portable-1.0.0.exe   (~250 MB)
```

## Upload to GitHub Releases

### Option 1: Via Web Interface

1. Go to: https://github.com/DarkRX01/Local-Ai-slides/releases
2. Click **"Draft a new release"**
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Drag and drop the `.exe` files
6. Click **"Publish release"**

### Option 2: Via GitHub CLI

```bash
# Install GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Create release
gh release create v1.0.0 \
  packages/electron/build/*.exe \
  --title "v1.0.0 - Initial Release" \
  --notes "First release of Slides Clone!"
```

## Quick Reference

```bash
# Full build process
git clone https://github.com/DarkRX01/Local-Ai-slides.git
cd Local-Ai-slides
npm install
npm run build:win

# Output
packages/electron/build/Slides Clone Setup 1.0.0.exe
```

**That's it!** 

Share the `.exe` file with users, or upload to GitHub Releases.

---

## Performance Tips

- Use SSD storage (much faster than HDD)
- Close browsers and heavy apps
- Disable antivirus temporarily (it scans every file electron-builder creates)
- First build is slowest, rebuilds are faster

---

**Questions?** Open an issue: https://github.com/DarkRX01/Local-Ai-slides/issues
