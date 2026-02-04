const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting release build process...\n');

const ROOT_DIR = path.join(__dirname, '..');

function exec(command, cwd = ROOT_DIR) {
  console.log(`> ${command}`);
  try {
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    return false;
  }
}

function checkPrerequisites() {
  console.log('📋 Checking prerequisites...');
  
  const checks = [
    { cmd: 'node --version', name: 'Node.js' },
    { cmd: 'npm --version', name: 'npm' },
  ];

  for (const check of checks) {
    try {
      execSync(check.cmd, { stdio: 'pipe' });
      console.log(`  ✓ ${check.name} is installed`);
    } catch (error) {
      console.error(`  ✗ ${check.name} is not installed`);
      process.exit(1);
    }
  }
  
  console.log('');
}

function cleanBuildArtifacts() {
  console.log('🧹 Cleaning previous build artifacts...');
  
  exec('npm run clean');
  
  const dirsToClean = [
    'packages/frontend/dist',
    'packages/backend/dist',
    'packages/electron/dist',
    'packages/electron/build',
  ];
  
  for (const dir of dirsToClean) {
    const fullPath = path.join(ROOT_DIR, dir);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`  Removed ${dir}`);
    }
  }
  
  console.log('');
}

function runTests() {
  console.log('🧪 Running tests...');
  
  if (!exec('npm run test')) {
    console.error('❌ Tests failed. Aborting build.');
    process.exit(1);
  }
  
  console.log('✅ All tests passed\n');
}

function runLinting() {
  console.log('🔍 Running linting...');
  
  if (!exec('npm run lint')) {
    console.error('❌ Linting failed. Aborting build.');
    process.exit(1);
  }
  
  console.log('✅ Linting passed\n');
}

function runTypeCheck() {
  console.log('🔍 Running type check...');
  
  if (!exec('npm run typecheck')) {
    console.error('❌ Type check failed. Aborting build.');
    process.exit(1);
  }
  
  console.log('✅ Type check passed\n');
}

function buildPackages() {
  console.log('🔨 Building packages...');
  
  const packages = [
    { name: 'shared', path: 'packages/shared' },
    { name: 'backend', path: 'packages/backend' },
    { name: 'frontend', path: 'packages/frontend' },
  ];
  
  for (const pkg of packages) {
    console.log(`\n📦 Building ${pkg.name}...`);
    const pkgPath = path.join(ROOT_DIR, pkg.path);
    
    if (!exec('npm run build', pkgPath)) {
      console.error(`❌ Failed to build ${pkg.name}`);
      process.exit(1);
    }
    
    console.log(`✅ ${pkg.name} built successfully`);
  }
  
  console.log('\n✅ All packages built successfully\n');
}

function buildElectron(platform) {
  console.log(`🖥️  Building Electron app for ${platform || 'all platforms'}...\n`);
  
  const commands = {
    win: 'npm run build:electron:win',
    mac: 'npm run build:electron:mac',
    linux: 'npm run build:electron:linux',
    all: 'npm run build:electron',
  };
  
  const command = commands[platform] || commands.all;
  
  if (!exec(command)) {
    console.error('❌ Failed to build Electron app');
    process.exit(1);
  }
  
  console.log('✅ Electron app built successfully\n');
}

function createReleaseNotes() {
  console.log('📝 Creating release notes...');
  
  const pkg = require(path.join(ROOT_DIR, 'package.json'));
  const version = pkg.version;
  
  const releaseNotes = `# Slides Clone v${version}

## Release Date
${new Date().toISOString().split('T')[0]}

## What's New
- AI-powered presentation generation with Ollama
- Advanced drag-and-drop slide editor
- Multi-language translation support
- Advanced animations with GSAP and Three.js
- AI image generation with Stable Diffusion
- Export to PDF, PPTX, HTML, and Video
- Voice commands and text-to-speech
- Real-time collaboration via WebSocket
- Comprehensive accessibility features
- Local analytics and telemetry

## Installation

### Desktop App (Recommended)
Download the installer for your platform:
- **Windows**: Slides-Clone-Setup-${version}.exe
- **macOS**: Slides-Clone-${version}.dmg
- **Linux**: Slides-Clone-${version}.AppImage

### Web Application
See DEPLOYMENT.md for installation instructions.

## Requirements
- Node.js 18.0.0+
- 8GB RAM (16GB recommended)
- 10GB disk space (20GB with AI models)

## Setup
1. Install the application
2. Run setup scripts for AI services
3. Start using!

For detailed instructions, see README.md and USER_GUIDE.md.

## Known Issues
None at this time.

## Support
For issues and questions, please check:
- README.md
- USER_GUIDE.md
- TROUBLESHOOTING.md
- GitHub Issues

---

Built with ❤️ using React, Node.js, Electron, and AI
`;

  const notesPath = path.join(ROOT_DIR, 'RELEASE_NOTES.md');
  fs.writeFileSync(notesPath, releaseNotes);
  
  console.log(`  Release notes written to RELEASE_NOTES.md`);
  console.log('');
}

function printSummary() {
  const pkg = require(path.join(ROOT_DIR, 'package.json'));
  
  console.log('═══════════════════════════════════════════════════');
  console.log('🎉 RELEASE BUILD COMPLETED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Version: ${pkg.version}`);
  console.log(`Build Date: ${new Date().toISOString()}`);
  console.log('');
  console.log('📦 Build Artifacts:');
  console.log('  - Frontend: packages/frontend/dist/');
  console.log('  - Backend: packages/backend/dist/');
  console.log('  - Electron: packages/electron/build/');
  console.log('');
  console.log('📋 Next Steps:');
  console.log('  1. Review RELEASE_CHECKLIST.md');
  console.log('  2. Test installers on target platforms');
  console.log('  3. Update CHANGELOG.md');
  console.log('  4. Create Git tag: git tag v' + pkg.version);
  console.log('  5. Push tag: git push origin v' + pkg.version);
  console.log('  6. Publish release');
  console.log('═══════════════════════════════════════════════════');
}

function main() {
  const args = process.argv.slice(2);
  const skipTests = args.includes('--skip-tests');
  const skipLint = args.includes('--skip-lint');
  const platform = args.find(arg => ['win', 'mac', 'linux'].includes(arg));
  
  checkPrerequisites();
  cleanBuildArtifacts();
  
  if (!skipLint) {
    runLinting();
    runTypeCheck();
  }
  
  if (!skipTests) {
    runTests();
  }
  
  buildPackages();
  buildElectron(platform);
  createReleaseNotes();
  printSummary();
}

main();
