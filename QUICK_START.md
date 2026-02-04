# 🚀 Quick Start - Get Running in 5 Minutes

## For End Users (Just Want to Use the App)

### Windows

1. **Download** `Slides-Clone-Setup-1.0.0.exe` from [Releases](https://github.com/DarkRX01/Local-Ai-slides/releases)
2. **Double-click** the installer
3. **Done!** App launches automatically

👉 **[Detailed Windows Guide](WINDOWS_INSTALL.md)**

---

## For Developers (Want to Modify/Build)

### Prerequisites Check

```bash
node --version  # Should be 18+
npm --version   # Should be 9+
python --version # Should be 3.10+
```

Don't have them? Install:
- **Node.js**: https://nodejs.org/ (LTS version)
- **Python**: https://www.python.org/downloads/

### 3-Command Setup

```bash
# 1. Install everything
npm install

# 2. Setup environment
copy .env.example .env

# 3. Start development servers
npm run dev
```

**That's it!** Open http://localhost:3000

---

## What Just Happened?

After running `npm run dev`, you now have:
- ✅ **Frontend** running on http://localhost:3000
- ✅ **Backend API** running on http://localhost:3001
- ✅ **WebSocket** server for real-time collaboration
- ✅ **SQLite database** initialized with demo presentation

---

## First Steps After Starting

### 1. Explore the Demo

A demo presentation loads automatically. Try:
- Adding new slides
- Dragging elements around
- Changing themes (top-right menu)
- Exporting to PDF (File → Export)

### 2. Enable AI Features (Optional)

Want AI-powered presentations? Setup takes 5 minutes:

```bash
# Install Ollama for AI
npm run setup:ollama

# Wait for download (~3 GB)
# Then restart dev server: npm run dev
```

Now you can:
- Generate presentations from prompts
- AI-suggest content and animations
- Auto-improve slide text

### 3. Enable Image Generation (Optional)

Want to generate custom images with AI?

```bash
npm run setup:sd
```

⚠️ **Warning:** Downloads ~7 GB, requires GPU

---

## Common First-Time Issues

### ❌ "gyp ERR! find VS"

**Problem:** Missing C++ build tools (Windows)

**Fix:**
```bash
# Install Visual Studio Build Tools
# Download from: https://visualstudio.microsoft.com/downloads/
# Select "Desktop development with C++"
```

### ❌ "EADDRINUSE: Port 3000 already in use"

**Problem:** Something else is using port 3000

**Fix:**
```bash
# Option 1: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use different port
# Edit .env: PORT=3002
```

### ❌ Frontend shows "Cannot connect to backend"

**Problem:** Backend didn't start

**Fix:**
```bash
# Check if backend is running
curl http://localhost:3001/health

# If not, start manually
cd packages/backend
npm run dev
```

---

## Development Workflow

### Making Changes

```bash
# Frontend changes
cd packages/frontend
npm run dev
# Auto-reloads on file save

# Backend changes
cd packages/backend
npm run dev
# Auto-restarts on file save
```

### Testing

```bash
# Run all tests
npm run test

# Run specific tests
npm run test:frontend
npm run test:backend
```

### Building for Production

```bash
# Build everything
npm run build

# Build Windows installer
npm run build:win
```

---

## Project Structure

```
slides-clone/
├── packages/
│   ├── frontend/       # React UI (what you see)
│   ├── backend/        # API + database (where data lives)
│   ├── electron/       # Desktop wrapper
│   └── shared/         # Shared TypeScript types
├── data/               # SQLite database + cached files
├── scripts/            # Setup scripts for AI services
└── package.json        # Root package (runs everything)
```

### Where to Edit What

| Want to change... | Edit files in... |
|-------------------|------------------|
| UI/Design | `packages/frontend/src/components/` |
| API endpoints | `packages/backend/src/routes/` |
| Database schema | `packages/backend/src/utils/database.ts` |
| AI prompts | `packages/backend/src/services/aiService.ts` |
| Themes/Colors | `packages/frontend/tailwind.config.ts` |

---

## Next Steps

### 1. Read the Docs

- **[User Guide](USER_GUIDE.md)** - How to use all features
- **[API Documentation](API.md)** - Backend API reference
- **[Build Guide](BUILD_GUIDE.md)** - Building production releases
- **[Plugin Development](PLUGIN_DEVELOPMENT.md)** - Creating plugins

### 2. Join the Community

- GitHub Issues: Report bugs, request features
- Discussions: Ask questions, share presentations
- Wiki: Community guides and tips

### 3. Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guide
- Pull request process
- Development best practices

---

## Stuck?

1. **Check Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. **Search Issues**: https://github.com/DarkRX01/Local-Ai-slides/issues
3. **Ask for Help**: Open a new issue with:
   - What you tried to do
   - What happened instead
   - Error messages (full text)
   - Your OS and Node version

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start everything
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Building
npm run build            # Build all
npm run build:win        # Windows installer

# Testing
npm run test             # All tests
npm run lint             # Check code style
npm run typecheck        # Check TypeScript

# Database
npm run db:reset         # Reset database (deletes data!)
npm run db:seed          # Add demo data

# AI Services
npm run setup:ollama     # Setup AI generation
npm run setup:sd         # Setup image generation
npm run setup:translate  # Setup translation
```

### Important URLs (when running)

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **WebSocket**: ws://localhost:3001

### Key Files

- `.env` - Environment configuration
- `data/presentations.sqlite` - Your presentation data
- `data/images/` - Uploaded/generated images
- `data/exports/` - Exported presentations

---

## What Makes This Special?

✨ **Fully Local** - No cloud, no tracking, works offline
🤖 **AI-Powered** - Generate presentations from text prompts
🎨 **Beautiful** - Modern UI with smooth animations
🚀 **Fast** - Optimized for performance
🔧 **Extensible** - Plugin system for custom features
📦 **Self-Contained** - Everything in one app

---

**Ready? Run `npm run dev` and start creating!** 🎉
