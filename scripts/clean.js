#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const retryDelayMs = 250;

const targets = [
  'node_modules',
  '.tmp',
  '.turbo',
  '.cache',
  '.parcel-cache',
  path.join('backend', 'node_modules'),
  path.join('frontend', 'node_modules'),
  path.join('admin', 'node_modules'),
  path.join('backend', 'dist'),
  path.join('frontend', 'dist'),
  path.join('admin', 'dist'),
  path.join('backend', 'build'),
  path.join('frontend', 'build'),
  path.join('admin', 'build'),
  path.join('backend', '.cache'),
  path.join('frontend', '.cache'),
  path.join('admin', '.cache'),
];

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function removeTarget(target) {
  const absoluteTarget = path.join(root, target);
  if (!absoluteTarget.startsWith(root + path.sep)) {
    throw new Error(`Refusing to remove path outside workspace: ${absoluteTarget}`);
  }

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      fs.rmSync(absoluteTarget, { recursive: true, force: true, maxRetries: 3, retryDelay: retryDelayMs });
      return;
    } catch (error) {
      if (attempt === 3) {
        console.warn(`[clean] unable to remove ${absoluteTarget}: ${error.code || error.message}`);
        return;
      }
      sleep(retryDelayMs);
    }
  }
}

for (const target of targets) {
  removeTarget(target);
}

console.log('Workspace cleaned.');
