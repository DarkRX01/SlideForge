#!/usr/bin/env node
/**
 * Writes minimal placeholder icon.png so electron-builder doesn't fail.
 * Run from repo root: node scripts/generate-placeholder-icons.js
 * For .ico (Windows): npx to-ico packages/electron/resources/icon.png -o packages/electron/resources/icon.ico
 */

const fs = require('fs');
const path = require('path');

const RESOURCES = path.join(__dirname, '..', 'packages', 'electron', 'resources');
// Minimal 32x32 PNG (valid PNG file)
const MINIMAL_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYhe3OMQEAAAjDMMC/52ECPhBI0+bMAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8YDIAABbN0bQgAAAABJRU5ErkJggg==',
  'base64'
);
fs.mkdirSync(RESOURCES, { recursive: true });
fs.writeFileSync(path.join(RESOURCES, 'icon.png'), MINIMAL_PNG);
console.log('Wrote packages/electron/resources/icon.png');
console.log('For Windows .ico run: npx to-ico packages/electron/resources/icon.png -o packages/electron/resources/icon.ico');
