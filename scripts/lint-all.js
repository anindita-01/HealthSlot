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
  { name: 'frontend', dir: path.join(root, 'frontend') },
  { name: 'admin', dir: path.join(root, 'admin') },
  { name: 'backend', dir: path.join(root, 'backend') },
];

for (const project of projects) {
  const pkgPath = path.join(project.dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.log(`[skip] ${project.name}: package.json not found`);
    continue;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (!pkg.scripts || !pkg.scripts.lint) {
    console.log(`[skip] ${project.name}: no lint script`);
    continue;
  }

  console.log(`[lint] ${project.name}`);
  const result = spawnSync(npmCommand, ['run', '--workspace', project.name, 'lint'], {
    cwd: root,
    env: npmEnv,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log('\nLint completed for all available projects.');
