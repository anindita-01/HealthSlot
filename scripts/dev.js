#!/usr/bin/env node
const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const projects = [
  { name: 'backend', script: 'dev' },
  { name: 'frontend', script: 'dev' },
  { name: 'admin', script: 'dev' },
];

const npmEnv = {
  ...process.env,
  FORCE_COLOR: 'true',
  npm_config_cache: path.join(root, '.npm-cache'),
  npm_config_audit: 'false',
  npm_config_fund: 'false',
  TMP: path.join(root, '.tmp'),
  TEMP: path.join(root, '.tmp'),
};

const children = new Set();

function writePrefixed(projectName, data, write) {
  const prefix = `[${projectName}]`;
  const text = data.toString();
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (line.trim().length === 0) continue;
    write(`${prefix} ${line}\n`);
  }
}

function startProject(project) {
  const child = spawn(npmCommand, ['run', '--workspace', project.name, project.script], {
    cwd: root,
    env: npmEnv,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  });

  children.add(child);

  child.stdout.on('data', (data) => {
    writePrefixed(project.name, data, process.stdout.write.bind(process.stdout));
  });

  child.stderr.on('data', (data) => {
    writePrefixed(project.name, data, process.stderr.write.bind(process.stderr));
  });

  child.on('exit', (code, signal) => {
    children.delete(child);
    if (signal) {
      console.error(`[${project.name}] stopped by ${signal}`);
      return;
    }
    if (code !== 0) {
      console.error(`[${project.name}] exited with code ${code}`);
      return;
    }
    console.log(`[${project.name}] exited`);
  });
}

function stopAll() {
  for (const child of children) {
    child.kill('SIGTERM');
  }
}

for (const project of projects) {
  startProject(project);
}

process.on('SIGINT', () => {
  stopAll();
  process.exit(130);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(143);
});
