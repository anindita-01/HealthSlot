#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmEnv = {
  ...process.env,
  npm_config_cache: path.join(root, '.npm-cache'),
  npm_config_audit: 'false',
  npm_config_fund: 'false',
  TMP: path.join(root, '.tmp'),
  TEMP: path.join(root, '.tmp'),
};
const projects = [
  { name: 'frontend', dir: path.join(root, 'frontend'), script: 'build' },
  { name: 'admin', dir: path.join(root, 'admin'), script: 'build' },
  { name: 'backend', dir: path.join(root, 'backend'), script: 'build' },
];

let successCount = 0;
let failureCount = 0;

for (const project of projects) {
  const pkgPath = path.join(project.dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.log(`[skip] ${project.name}: package.json not found`);
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const hasScript = Boolean(pkg.scripts && pkg.scripts[project.script]);

  if (!hasScript) {
    console.log(`[skip] ${project.name}: script "${project.script}" not defined`);
    continue;
  }

  console.log(`[build] ${project.name}`);
  const result = spawnSync(npmCommand, ['run', '--workspace', project.name, project.script], {
    cwd: root,
    env: npmEnv,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status === 0) {
    successCount += 1;
    console.log(`[success] ${project.name}`);
  } else {
    failureCount += 1;
    console.error(`[failure] ${project.name}`);
  }
}

console.log(`\nBuild summary: ${successCount} succeeded, ${failureCount} failed.`);
if (failureCount > 0) process.exit(1);
