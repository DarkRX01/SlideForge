# Deployment Guide

## Prerequisites

### System Requirements
- **OS**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB minimum (20GB with AI models)
- **GPU**: Optional but recommended for image generation

### External Dependencies
- **Ollama**: For AI-powered presentation generation
- **Stable Diffusion Web UI**: For image generation (optional)
- **LibreTranslate**: For multi-language translation
- **FFmpeg**: For video export

## Installation Methods

### Method 1: Electron Desktop App (Recommended)

#### Windows
1. Download `Slides-Clone-Setup-1.0.0.exe`
2. Run the installer
3. Follow the setup wizard
4. Launch the app from Start Menu

#### macOS
1. Download `Slides-Clone-1.0.0.dmg`
2. Open the DMG file
3. Drag the app to Applications folder
4. Launch from Applications

#### Linux
1. Download `Slides-Clone-1.0.0.AppImage`
2. Make it executable: `chmod +x Slides-Clone-1.0.0.AppImage`
3. Run: `./Slides-Clone-1.0.0.AppImage`

### Method 2: Web Application

#### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/slides-clone.git
cd slides-clone
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Setup External Services
```bash
# Setup all services at once
npm run setup:all

# Or setup individually
node scripts/setup-ollama.js      # AI models
node scripts/setup-sd.js           # Image generation (optional)
node scripts/setup-translate.js    # Translation service
node scripts/setup-ffmpeg.js       # Video export
```

#### Step 4: Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

#### Step 5: Build Application
```bash
npm run build
```

#### Step 6: Start Services

**Option A: Development Mode**
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

**Option B: Production Mode**
```bash
# Start backend
cd packages/backend
npm start

# In another terminal, serve frontend
cd packages/frontend
npm run preview
```

## Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DB_PATH=./data/presentations.sqlite

# AI Configuration
OLLAMA_API_URL=http://localhost:11434
AI_DEFAULT_MODEL=llama3

# Image Generation
SD_API_URL=http://localhost:7860
IMAGE_CACHE_DIR=./data/images

# Translation
LIBRETRANSLATE_API_URL=http://localhost:5000

# Export
EXPORT_OUTPUT_DIR=./data/exports
EXPORT_QUALITY=high

# Security
PASSWORD_PROTECTION=false
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Configuration

Edit `packages/frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## Reverse Proxy (Optional)

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name slides.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /socket.io {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Database Management

### Backup Database
```bash
# Stop the application first
cp data/presentations.sqlite data/presentations.backup.sqlite
```

### Restore Database
```bash
# Stop the application first
cp data/presentations.backup.sqlite data/presentations.sqlite
```

### Reset Database
```bash
rm data/presentations.sqlite
# Database will be recreated on next startup
```

## Monitoring

### Logs

**Backend Logs**
```bash
# Development
npm run dev:backend

# Production (with PM2)
pm2 logs slides-clone-backend
```

**Frontend Logs**
- Open browser DevTools (F12)
- Check Console tab

### Health Check
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process or change PORT in .env
```

#### Database Locked
```bash
# Stop all instances
# Remove WAL files
rm data/presentations.sqlite-wal
rm data/presentations.sqlite-shm
```

#### AI Service Not Responding
```bash
# Check Ollama status
curl http://localhost:11434/api/tags

# Restart Ollama
# Windows: Restart from System Tray
# macOS/Linux: 
systemctl restart ollama
```

#### Build Errors
```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Updates

### Update Application
```bash
git pull origin main
npm install
npm run build
```

### Update AI Models
```bash
node scripts/setup-ollama.js
# Follow prompts to download new models
```

## Performance Tuning

### Production Optimizations

1. **Enable compression**
   ```javascript
   // In server.ts
   import compression from 'compression';
   app.use(compression());
   ```

2. **Database optimization**
   ```sql
   PRAGMA journal_mode = WAL;
   PRAGMA synchronous = NORMAL;
   PRAGMA cache_size = -64000;
   ```

3. **Cache static assets**
   - Set appropriate Cache-Control headers
   - Use CDN for assets (if applicable)

4. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start packages/backend/dist/index.js --name slides-clone-backend
   pm2 startup
   pm2 save
   ```

## Security Hardening

1. **Enable HTTPS** (recommended for network access)
2. **Set strong password protection** (if enabled)
3. **Keep dependencies updated**: `npm audit fix`
4. **Restrict CORS origins**: Set `CORS_ORIGIN` in `.env`
5. **Enable rate limiting**: Configure in `.env`

## Backup Strategy

### Automated Backups
```bash
# Create backup script (backup.sh)
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp data/presentations.sqlite backups/presentations_$TIMESTAMP.sqlite
# Retain last 7 days
find backups/ -name "presentations_*.sqlite" -mtime +7 -delete

# Setup cron job
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

## Support

For issues and questions:
- Check `TROUBLESHOOTING.md`
- Review logs
- Open an issue on GitHub
- Consult the user guide
