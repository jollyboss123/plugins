#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const payloadRoot = path.join(path.resolve(__dirname, '..'), 'payload');

function exists(filePath) {
  return fs.existsSync(filePath);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function backupIfExists(targetPath) {
  if (!exists(targetPath)) return null;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${targetPath}.bak.${stamp}`;
  fs.renameSync(targetPath, backupPath);
  return backupPath;
}

function copyEntry(sourcePath, targetPath) {
  ensureDir(path.dirname(targetPath));
  const backup = backupIfExists(targetPath);
  fs.cpSync(sourcePath, targetPath, { recursive: true });
  return backup;
}

function installFromPayload(mode, targetRoot) {
  const sourceRoot = path.join(payloadRoot, mode);
  if (!exists(sourceRoot)) {
    throw new Error(`Missing payload mode: ${mode}. Run generation first.`);
  }

  const entries = fs.readdirSync(sourceRoot);
  const backups = [];

  for (const entry of entries) {
    const sourcePath = path.join(sourceRoot, entry);
    const targetPath = path.join(targetRoot, entry);
    const backup = copyEntry(sourcePath, targetPath);
    if (backup) backups.push(backup);
  }

  return backups;
}

function verifyPayload() {
  const required = [
    path.join(payloadRoot, 'local', '.codex'),
    path.join(payloadRoot, 'local', '.claude'),
    path.join(payloadRoot, 'local', '.cursor'),
    path.join(payloadRoot, 'local', '.ralph'),
    path.join(payloadRoot, 'global', '.codex'),
    path.join(payloadRoot, 'global', '.claude'),
    path.join(payloadRoot, 'global', '.ralph')
  ];

  for (const target of required) {
    if (!exists(target)) {
      throw new Error(`Missing payload path: ${target}`);
    }
  }

  console.log('Payload verification passed.');
}

function runPostinstall() {
  const targetRoot = process.env.INIT_CWD || process.cwd();
  installFromPayload('local', targetRoot);
  console.log(`Installed local plugin files into ${targetRoot}`);

  if (process.env.RALPH_WORKLOOP_INSTALL_GLOBAL === '1') {
    const homeRoot = os.homedir();
    installFromPayload('global', homeRoot);
    console.log(`Installed global plugin files into ${homeRoot}`);
  }
}

function runInstall(args) {
  const installLocal = args.includes('--local') || (!args.includes('--global') && !args.includes('--local'));
  const installGlobal = args.includes('--global');

  const targetRoot = process.cwd();
  if (installLocal) {
    const backups = installFromPayload('local', targetRoot);
    console.log(`Installed local plugin files into ${targetRoot}`);
    if (backups.length) console.log(`Backed up ${backups.length} existing paths.`);
  }

  if (installGlobal) {
    const homeRoot = os.homedir();
    const backups = installFromPayload('global', homeRoot);
    console.log(`Installed global plugin files into ${homeRoot}`);
    if (backups.length) console.log(`Backed up ${backups.length} existing global paths.`);
  }
}

function main() {
  const [, , command = 'help', ...args] = process.argv;

  if (command === 'postinstall') {
    runPostinstall();
    return;
  }

  if (command === 'install') {
    runInstall(args);
    return;
  }

  if (command === 'verify') {
    verifyPayload();
    return;
  }

  console.log('Usage: ralph-workloop <postinstall|install|verify> [--local] [--global]');
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
