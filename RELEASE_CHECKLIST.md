# Release Checklist

## Pre-Release Verification

### Code Quality
- [ ] All linting passes (`npm run lint`)
- [ ] All type checking passes (`npm run typecheck`)
- [ ] All tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Code coverage meets threshold (>80%)

### Security
- [ ] Security headers configured properly
- [ ] Rate limiting enabled
- [ ] Input sanitization active
- [ ] No exposed secrets in code
- [ ] Dependencies scanned for vulnerabilities (`npm audit`)
- [ ] SQL injection vulnerabilities checked
- [ ] XSS vulnerabilities checked

### Performance
- [ ] Bundle size optimized (<1MB gzipped)
- [ ] Lazy loading implemented
- [ ] Service worker configured
- [ ] Images optimized
- [ ] Code splitting enabled
- [ ] Startup time <5s verified

### Accessibility
- [ ] ARIA labels added to all interactive elements
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus indicators visible

### Features
- [ ] All core features working:
  - [ ] Slide editor with drag-and-drop
  - [ ] AI presentation generation (Ollama)
  - [ ] Image generation (Stable Diffusion)
  - [ ] Image search (Google/fallback)
  - [ ] Translation (LibreTranslate)
  - [ ] Animations (GSAP/Three.js)
  - [ ] Export (PDF, PPTX, HTML, Video)
  - [ ] Voice commands (optional)
  - [ ] Voice-over generation (optional)
  - [ ] Collaboration (WebSocket)
  - [ ] Theme customization
  - [ ] Multi-language support

### Documentation
- [ ] README.md up to date
- [ ] API documentation complete
- [ ] User guide complete
- [ ] Setup instructions tested on clean system
- [ ] Troubleshooting guide updated
- [ ] Plugin development guide complete

## Build Process

### Backend
```bash
cd packages/backend
npm run build
npm run test
```

### Frontend
```bash
cd packages/frontend
npm run build
npm run test:e2e
```

### Electron
```bash
# Build for Windows
npm run build:electron:win

# Build for macOS
npm run build:electron:mac

# Build for Linux
npm run build:electron:linux
```

## Release Package Contents

### Required Files
- [ ] `package.json` with correct version
- [ ] `README.md`
- [ ] `LICENSE`
- [ ] `.env.example`
- [ ] Setup scripts (`scripts/setup-*.js`)
- [ ] Built frontend (`packages/frontend/dist`)
- [ ] Built backend (`packages/backend/dist`)
- [ ] Electron installer

### Optional Files
- [ ] Demo presentation data
- [ ] Example presentations
- [ ] Video tutorials
- [ ] Screenshots

## Post-Release

### Testing
- [ ] Fresh install on Windows tested
- [ ] Fresh install on macOS tested
- [ ] Fresh install on Linux tested
- [ ] All setup scripts work correctly
- [ ] AI services integrate properly
- [ ] Database initializes correctly
- [ ] Demo presentation loads

### Distribution
- [ ] Release notes written
- [ ] Version tag created in Git
- [ ] Installers uploaded
- [ ] Documentation published
- [ ] Changelog updated

## Rollback Plan

If critical issues are found:
1. Document the issue
2. Roll back to previous version
3. Notify users
4. Fix the issue
5. Re-release

## Version Numbering

Follow Semantic Versioning (semver):
- **Major**: Breaking changes
- **Minor**: New features, backwards compatible
- **Patch**: Bug fixes

Current version: `1.0.0`
