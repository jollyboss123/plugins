import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pluginDir = path.join(root, 'plugins', 'prd-workflow');
const generatedDir = path.join(pluginDir, 'generated');
const packageDir = path.join(root, 'packages', 'prd-workflow');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listNames(dirPath, ext) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((name) => (ext ? name.endsWith(ext) : true))
    .map((name) => (ext ? name.slice(0, -ext.length) : name))
    .sort();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const manifest = readJson(path.join(pluginDir, 'manifest.json'));
const packageJson = readJson(path.join(packageDir, 'package.json'));
const codexPlugin = readJson(path.join(generatedDir, 'codex', '.codex-plugin', 'plugin.json'));
const claudePlugin = readJson(path.join(generatedDir, 'claude', '.claude-plugin', 'plugin.json'));

const workflowIds = [...manifest.workflows].sort();
const sourceWorkflows = listNames(path.join(pluginDir, 'workflows'), '.md');
const codexSkills = listNames(path.join(generatedDir, 'codex', 'skills'));
const claudeSkills = listNames(path.join(generatedDir, 'claude', '.claude', 'skills'));
const cursorPrompts = listNames(path.join(generatedDir, 'cursor', 'prompts'), '.md');

assert(manifest.name === 'prd-workflow', 'Canonical plugin name must be prd-workflow in v1.');
assert(manifest.invocationPolicy?.doWorkRequiresPrdToPlan === false, 'do-work must remain directly invokable.');
assert(manifest.parityMode === 'behavioral', 'Parity mode must remain behavioral.');

assert(JSON.stringify(sourceWorkflows) === JSON.stringify(workflowIds), 'Source workflow files do not match manifest workflow IDs.');
assert(JSON.stringify(codexSkills) === JSON.stringify(workflowIds), 'Codex generated skills do not match manifest workflow IDs.');
assert(JSON.stringify(claudeSkills) === JSON.stringify(workflowIds), 'Claude generated skills do not match manifest workflow IDs.');
assert(JSON.stringify(cursorPrompts) === JSON.stringify(workflowIds), 'Cursor generated prompts do not match manifest workflow IDs.');

assert(packageJson.name === `${manifest.scope}/${manifest.name}`, 'Package name must match scope/plugin ID.');
assert(packageJson.version === manifest.version, 'Package version must match canonical manifest version.');
assert(codexPlugin.version === manifest.version, 'Codex plugin version must match canonical manifest version.');
assert(claudePlugin.version === manifest.version, 'Claude plugin version must match canonical manifest version.');
assert(codexPlugin.name === manifest.name, 'Codex plugin name mismatch.');
assert(claudePlugin.name === manifest.name, 'Claude plugin name mismatch.');

const localPayloadRoot = path.join(packageDir, 'payload', 'local');
const globalPayloadRoot = path.join(packageDir, 'payload', 'global');
assert(fs.existsSync(localPayloadRoot), 'Local payload is missing. Run npm run generate.');
assert(fs.existsSync(globalPayloadRoot), 'Global payload is missing. Run npm run generate.');

console.log(`Validation passed for ${manifest.name}@${manifest.version}`);
