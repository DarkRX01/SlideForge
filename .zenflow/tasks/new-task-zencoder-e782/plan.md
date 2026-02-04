# Spec and build

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Comprehensive technical specification created in `spec.md` covering:
- Technology stack (React, Node.js, Electron, AI services)
- High-level architecture with ASCII diagram
- Implementation approach for all core features
- Complete data models and API interfaces
- Verification strategy and testing approach
- Performance, security, and extensibility considerations

---

### [ ] Step 1: Project Scaffolding and Environment Setup
<!-- chat-id: b862d924-ac29-4967-aa58-fc0809736603 -->

**Objective:** Initialize the monorepo structure, configure build tools, and create installation scripts for all dependencies.

**Tasks:**
- Initialize monorepo with npm workspaces
- Setup packages: frontend (Vite + React + TypeScript), backend (Express + TypeScript), electron, shared
- Configure Tailwind CSS, ESLint, Prettier, TypeScript strict mode
- Create `package.json` scripts for dev, build, lint, test
- Write setup scripts for:
  - Ollama installation and model download
  - Stable Diffusion WebUI setup (optional flag)
  - LibreTranslate installation
  - FFmpeg verification/installation
- Create `.gitignore` with common patterns
- Initialize SQLite database schema
- Add sample presentation data for testing

**Verification:**
- `npm run lint` passes with no errors
- `npm run typecheck` passes
- `npm run setup:all` successfully installs all services
- `npm run dev` starts both frontend and backend
- Database schema created correctly

---

### [ ] Step 2: Core Backend Infrastructure
<!-- chat-id: 064b18e6-bc28-432b-9081-75f294aef32c -->

**Objective:** Implement Express API server, SQLite models, WebSocket server, and core CRUD endpoints.

**Tasks:**
- Setup Express server with TypeScript
- Implement SQLite models (Presentation, Slide, Cache, Settings)
- Create database utility functions (CRUD helpers)
- Implement API routes for presentations and slides
- Setup Socket.io for WebSocket communication
- Add error handling middleware
- Add request validation middleware
- Implement caching service for AI responses
- Add optional password protection middleware
- Write unit tests for models and routes

**Verification:**
- `npm run test:backend` passes all tests
- API endpoints respond correctly (use Postman/curl)
- WebSocket connection establishes successfully
- Database operations perform CRUD without errors
- Error handling returns proper status codes

---

### [ ] Step 3: Frontend Foundation and State Management
<!-- chat-id: ee66a56f-7c44-4bc8-948f-c78f4faa4b65 -->

**Objective:** Build React app structure, Zustand stores, and basic UI components.

**Tasks:**
- Setup React app with Vite and TypeScript
- Configure Tailwind CSS with custom theme
- Create Zustand stores (presentation, editor, animation, settings)
- Build UI component library (Button, Modal, Input, etc.) using Radix UI
- Implement API client service with axios
- Implement WebSocket client integration
- Create basic layout (header, sidebar, main canvas, property panel)
- Add theme system (light/dark mode, color customization)
- Add i18next for internationalization
- Write unit tests for stores and components

**Verification:**
- `npm run test:frontend` passes all tests
- Theme switching works correctly
- Store state updates trigger re-renders
- API client successfully communicates with backend
- WebSocket receives real-time updates

---

### [ ] Step 4: Slide Editor Canvas with Drag-and-Drop
<!-- chat-id: 93bb82a9-e180-4763-9b85-e634a8ea8293 -->

**Objective:** Implement the main slide editing canvas using Fabric.js with full drag-and-drop capabilities.

**Tasks:**
- Integrate Fabric.js into React
- Implement SlideCanvas component with element rendering
- Add drag-and-drop for elements using dnd-kit
- Implement element types (text, image, shape)
- Add toolbar with element creation tools
- Implement property panel for element customization
- Add layer manager component
- Implement undo/redo functionality
- Add alignment guides and snapping
- Add keyboard shortcuts (Ctrl+C/V, Delete, etc.)
- Implement slide thumbnail navigation
- Add zoom/pan controls
- Write integration tests for editor interactions

**Verification:**
- Elements can be added, moved, resized, rotated
- Undo/redo works correctly
- Copy/paste functionality works
- Layer z-index can be reordered
- Property changes reflect immediately
- Performance test: 50+ elements on canvas with no lag

---

### [ ] Step 5: AI Integration - Ollama LLM
<!-- chat-id: 9569bf3c-5789-425b-9c46-cfa1e0764c62 -->

**Objective:** Integrate Ollama for AI-powered presentation generation and content enhancement.

**Tasks:**
- Create AI service in backend to communicate with Ollama API
- Implement structured prompts for presentation generation
- Add streaming response support for real-time output
- Implement caching for AI responses in SQLite
- Create AI Assistant UI component in frontend
- Add prompt builder with templates
- Implement slide enhancement (suggest content, improve text)
- Add animation suggestion based on content analysis
- Handle errors gracefully (model not available, timeout)
- Add model selection (Llama3, Mistral, etc.)
- Write tests for AI service with mocked responses

**Verification:**
- `POST /api/ai/generate` creates presentation from prompt
- AI suggestions appear in real-time (streaming)
- Cached responses return instantly
- Error handling shows user-friendly messages
- Multiple models can be selected and used

---

### [ ] Step 6: Image Generation and Fetching
<!-- chat-id: 112188a6-2343-4685-820a-e05f8486101a -->

**Objective:** Implement image generation via Stable Diffusion and image search via Google API.

**Tasks:**
- Create image service in backend
- Integrate Stable Diffusion WebUI API (Automatic1111)
- Implement image generation with queue management
- Add Google Custom Search API integration
- Implement web scraping fallback (Puppeteer) with rate limiting
- Use Sharp for image processing (resize, compress, filters)
- Create image search UI component
- Add image library/browser component
- Implement drag-and-drop for image insertion
- Add background removal feature
- Handle large images (compression, lazy loading)
- Write tests for image service

**Verification:**
- Images generate via Stable Diffusion successfully
- Google search returns relevant images
- Images can be uploaded and processed
- Background removal works on test images
- Large images (>10MB) are compressed automatically

---

### [ ] Step 7: Translation Service Integration
<!-- chat-id: 5987e956-a188-4106-b0b5-bd118282ad43 -->

**Objective:** Integrate LibreTranslate for multi-language support and presentation translation.

**Tasks:**
- Create translation service in backend
- Integrate LibreTranslate API
- Implement text translation endpoint
- Implement full presentation translation
- Add language detection
- Create translation UI component
- Add RTL/LTR auto-detection and CSS handling
- Implement dynamic font loading for exotic scripts
- Cache translations in database
- Write tests for translation service

**Verification:**
- Text translates correctly to target languages
- Full presentation translation preserves layout
- RTL languages (Arabic, Hebrew) render correctly
- Non-Latin scripts (Chinese, Hindi) display properly
- Cached translations return instantly

---

### [ ] Step 8: Animation System with GSAP
<!-- chat-id: 2b3bff81-12a5-4ce1-8d75-4dd6016af8c7 -->

**Objective:** Build comprehensive animation system with timeline editor and presets.

**Tasks:**
- Integrate GSAP and Three.js into frontend
- Create animation store and data models
- Implement animation types (fade, slide, zoom, rotate, 3D)
- Build timeline editor component
- Add keyframe editing functionality
- Create animation preset library
- Implement animation playback controls
- Add animation chaining (sequence, parallel)
- Integrate particle effects system
- Add animation preview mode
- Implement animation export to formats
- Write tests for animation engine

**Verification:**
- All animation types work correctly
- Timeline editor allows drag-and-drop keyframes
- Animations preview smoothly in real-time
- Presets apply correctly
- 3D transitions render without performance issues
- Performance test: 20+ animations on single slide

---

### [ ] Step 9: Export Functionality (PDF, PPTX, HTML, Video)
<!-- chat-id: c07e4154-d2b6-48fe-85ce-c11472e85ba8 -->

**Objective:** Implement comprehensive export system for all supported formats.

**Tasks:**
- Create export service in backend
- Implement PDF export using jsPDF
- Implement PPTX export using PptxGenJS
- Implement HTML export (static, self-contained)
- Implement video export using Puppeteer + FFmpeg
- Add export quality presets (draft/standard/HD)
- Create export progress tracking (WebSocket updates)
- Build export dialog UI component
- Add background job processing with worker threads
- Implement export queue management
- Add export history and re-download
- Write tests for each export format

**Verification:**
- PDF export preserves fonts, images, layout
- PPTX opens correctly in Microsoft PowerPoint
- HTML export is portable and self-contained
- Video export includes animations
- Export progress updates in real-time
- Performance test: 50-slide deck exports in <60s

---

### [ ] Step 10: Electron Desktop Application
<!-- chat-id: 55371cdf-de68-4999-adca-94c2cd44de46 -->

**Objective:** Package the application as a cross-platform Electron desktop app.

**Tasks:**
- Setup Electron main process
- Configure Electron builder for Windows/Mac/Linux
- Implement IPC handlers for file system operations
- Add native menus and shortcuts
- Implement auto-updater (optional)
- Add app icon and branding
- Configure CSP headers for security
- Implement window state persistence
- Add native notifications
- Build platform-specific installers
- Test on Windows, macOS, Linux

**Verification:**
- Electron app launches on all platforms
- File operations work via IPC
- App installs and uninstalls cleanly
- Native menus function correctly
- Window state persists across sessions

---

### [ ] Step 11: Voice and TTS Integration (Optional)
<!-- chat-id: 577d0223-ae5f-416d-a595-3ebe6f823810 -->

**Objective:** Add voice command support with Whisper and text-to-speech with eSpeak.

**Tasks:**
- Integrate Whisper.cpp for speech-to-text
- Create voice command service
- Add voice command UI controls
- Integrate eSpeak-ng for TTS
- Implement voice-over generation for slides
- Add voice-over playback in presentation mode
- Support multiple languages and accents
- Write tests for voice services

**Verification:**
- Voice commands correctly transcribe
- TTS generates audio for slide text
- Voice-overs play during presentation
- Multiple languages supported

---

### [ ] Step 12: Performance Optimization and Testing
<!-- chat-id: 6566d176-b484-4336-a444-dd4352cb6299 -->

**Objective:** Optimize application performance and conduct comprehensive testing.

**Tasks:**
- Implement virtual scrolling for slide thumbnails
- Add lazy loading for slide content
- Optimize bundle size with code splitting
- Implement IndexedDB for asset caching
- Add Web Workers for heavy computations
- Profile and optimize render performance
- Conduct load testing (100+ slide presentations)
- Run memory leak detection
- Write E2E tests with Playwright
- Test on low-end hardware
- Generate coverage reports
- Fix performance bottlenecks

**Verification:**
- `npm run test:coverage` shows >80% coverage
- `npm run test:e2e` passes all E2E tests
- 100-slide presentation loads in <3s
- No memory leaks detected after 30min usage
- Smooth 60fps animations on mid-range hardware

---

### [ ] Step 13: Documentation and Setup Guide

**Objective:** Create comprehensive documentation for users and developers.

**Tasks:**
- Write README.md with feature overview
- Create installation guide for all platforms
- Document AI service setup (Ollama, SD, LibreTranslate)
- Write API documentation
- Create user guide with screenshots
- Document plugin development
- Add troubleshooting section
- Create video tutorials (optional)
- Add code comments for complex logic
- Generate TypeDoc API documentation

**Verification:**
- New user can install and run app following README
- All API endpoints documented
- Plugin development guide is clear
- Troubleshooting covers common issues

---

### [ ] Step 14: Final Integration and Polish

**Objective:** Final integration testing, bug fixes, and UI polish.

**Tasks:**
- Conduct full integration testing
- Fix remaining bugs and edge cases
- Polish UI animations and transitions
- Add loading states and error messages
- Implement accessibility features (ARIA labels, keyboard navigation)
- Add telemetry opt-in (local analytics only)
- Create demo presentation showcasing features
- Optimize startup time
- Final security audit
- Prepare release build

**Verification:**
- All critical bugs resolved
- WCAG 2.1 AA accessibility compliance
- App starts in <5s
- Security vulnerabilities addressed
- Demo presentation showcases all features
- Release build works on clean system
