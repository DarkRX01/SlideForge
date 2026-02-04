#!/usr/bin/env node
/**
 * Ensures frontend/dist and backend/dist exist with minimal content so
 * electron-builder never fails on missing extraResources. Run from repo root.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const frontendDist = path.join(root, 'packages', 'frontend', 'dist');
const backendDist = path.join(root, 'packages', 'backend', 'dist');
const dataDir = path.join(root, 'data');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, '.gitkeep'), '');
    console.log('ensure-dist: created data/');
  }
}

function ensureFrontendDist() {
  const indexHtml = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexHtml)) {
    try {
      const stat = fs.statSync(frontendDist);
      if (stat.isDirectory()) {
        const files = fs.readdirSync(frontendDist);
        if (files.length > 0) return;
      }
    } catch (_) {}
  }
  fs.mkdirSync(frontendDist, { recursive: true });
  fs.writeFileSync(
    indexHtml,
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>SlideForge</title></head>
<body><div id="root"><p style="padding:2rem;font-family:sans-serif;">Loading SlideForge...</p></div></body>
</html>`
  );
  fs.mkdirSync(path.join(frontendDist, 'assets'), { recursive: true });
  console.log('ensure-dist: created minimal frontend/dist');
}

function ensureBackendDist() {
  const indexJs = path.join(backendDist, 'index.js');
  if (fs.existsSync(indexJs)) {
    try {
      const files = fs.readdirSync(backendDist);
      if (files.length > 0) return;
    } catch (_) {}
  }
  fs.mkdirSync(backendDist, { recursive: true });
  fs.writeFileSync(
    indexJs,
    "try { require('dotenv').config(); } catch (_) {} require('./server');"
  );
  const serverJs = path.join(backendDist, 'server.js');
  if (!fs.existsSync(serverJs)) {
    fs.writeFileSync(
      serverJs,
      `const http = require('http');
const port = process.env.PORT || 3001;
http.createServer((req, res) => { res.writeHead(200, {'Content-Type':'application/json'}); res.end(JSON.stringify({ok:true})); }).listen(port, () => console.log('Backend stub on', port));
`
    );
  }
  console.log('ensure-dist: created minimal backend/dist');
}

ensureDataDir();
ensureFrontendDist();
ensureBackendDist();
