#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const workspaces = [
  { name: 'backend', requiredBins: ['nodemon'] },
  { name: 'frontend', requiredBins: ['vite'] },
  { name: 'admin', requiredBins: ['vite'] },
];

const npmEnv = {
  ...process.env,
  npm_config_cache: path.join(root, '.npm-cache'),
  npm_config_audit: 'false',
  npm_config_fund: 'false',
  npm_config_legacy_peer_deps: 'true',
  npm_config_prefer_offline: 'true',
  TMP: path.join(root, '.tmp'),
  TEMP: path.join(root, '.tmp'),
};

function ensureWorkspacePackage(workspace) {
  const packagePath = path.join(root, workspace.name, 'package.json');
  if (!fs.existsSync(packagePath)) {
    throw new Error(`[${workspace.name}] package.json not found`);
  }
}

function run(args, options = {}) {
  const result = spawnSync(npmCommand, args, {
    cwd: root,
    env: npmEnv,
    stdio: options.stdio || 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }

  return result;
}

function verifyDependencyTree() {
  console.log('\n[verify] workspace dependency tree');
  run(['ls', '--workspaces', '--include-workspace-root', '--depth=0']);
}

function verifyWorkspaceBins() {
  for (const workspace of workspaces) {
    for (const bin of workspace.requiredBins) {
      console.log(`[verify] ${workspace.name}: ${bin}`);
      run(['exec', '--workspace', workspace.name, '--', bin, '--version']);
    }
  }
}

for (const workspace of workspaces) {
  ensureWorkspacePackage(workspace);
}

fs.mkdirSync(npmEnv.npm_config_cache, { recursive: true });
fs.mkdirSync(npmEnv.TMP, { recursive: true });

console.log('[install] npm workspaces');
run([
  'install',
  '--workspaces',
  '--include-workspace-root',
  '--legacy-peer-deps',
  '--no-audit',
  '--no-fund',
  '--prefer-offline',
]);

verifyDependencyTree();
verifyWorkspaceBins();

console.log('\nAll workspace dependencies are installed and verified.');
