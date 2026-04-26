import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pluginsRoot = path.join(root, 'plugins');
const packagesRoot = path.join(root, 'packages');

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

function validatePlugin(pluginName) {
  const pluginDir = path.join(pluginsRoot, pluginName);
  const generatedDir = path.join(pluginDir, 'generated');
  const packageDir = path.join(packagesRoot, pluginName);

  const manifest = readJson(path.join(pluginDir, 'manifest.json'));
  const packageJson = readJson(path.join(packageDir, 'package.json'));
  const codexPlugin = readJson(path.join(generatedDir, 'codex', '.codex-plugin', 'plugin.json'));
  const claudePlugin = readJson(path.join(generatedDir, 'claude', '.claude-plugin', 'plugin.json'));

  const workflowIds = [...manifest.workflows].sort();
  const sourceWorkflows = listNames(path.join(pluginDir, 'workflows'), '.md');
  const codexSkills = listNames(path.join(generatedDir, 'codex', 'skills'));
  const claudeSkills = listNames(path.join(generatedDir, 'claude', '.claude', 'skills'));
  const cursorPrompts = listNames(path.join(generatedDir, 'cursor', 'prompts'), '.md');

  assert(JSON.stringify(sourceWorkflows) === JSON.stringify(workflowIds), `${pluginName}: source workflow files do not match manifest IDs.`);
  assert(JSON.stringify(codexSkills) === JSON.stringify(workflowIds), `${pluginName}: Codex skills do not match manifest IDs.`);
  assert(JSON.stringify(claudeSkills) === JSON.stringify(workflowIds), `${pluginName}: Claude skills do not match manifest IDs.`);
  assert(JSON.stringify(cursorPrompts) === JSON.stringify(workflowIds), `${pluginName}: Cursor prompts do not match manifest IDs.`);

  assert(packageJson.name === `${manifest.scope}/${manifest.name}`, `${pluginName}: package name must match scope/plugin ID.`);
  assert(packageJson.version === manifest.version, `${pluginName}: package version must match canonical manifest version.`);
  assert(codexPlugin.version === manifest.version, `${pluginName}: Codex plugin version must match canonical manifest version.`);
  assert(claudePlugin.version === manifest.version, `${pluginName}: Claude plugin version must match canonical manifest version.`);
  assert(codexPlugin.name === manifest.name, `${pluginName}: Codex plugin name mismatch.`);
  assert(claudePlugin.name === manifest.name, `${pluginName}: Claude plugin name mismatch.`);

  const localPayloadRoot = path.join(packageDir, 'payload', 'local');
  const globalPayloadRoot = path.join(packageDir, 'payload', 'global');
  assert(fs.existsSync(localPayloadRoot), `${pluginName}: local payload is missing. Run npm run generate.`);
  assert(fs.existsSync(globalPayloadRoot), `${pluginName}: global payload is missing. Run npm run generate.`);

  if (pluginName === 'prd-workflow') {
    assert(manifest.invocationPolicy?.doWorkRequiresPrdToPlan === false, 'prd-workflow: do-work must remain directly invokable.');
    assert(manifest.workflows.includes('handoff-to-ralph'), 'prd-workflow: optional handoff-to-ralph workflow is required.');
  }

  if (pluginName === 'ralph-workloop') {
    assert(manifest.workflows.includes('ralph-once'), 'ralph-workloop: ralph-once workflow is required.');
    assert(manifest.workflows.includes('ralph-afk'), 'ralph-workloop: ralph-afk workflow is required.');
    assert(Array.isArray(manifest.environmentCapabilities) && manifest.environmentCapabilities.length > 0, 'ralph-workloop: environmentCapabilities declaration is required.');
    assert(fs.existsSync(path.join(pluginDir, 'runtime', 'once.sh')), 'ralph-workloop: runtime once.sh template is required.');
    assert(fs.existsSync(path.join(pluginDir, 'runtime', 'afk.sh')), 'ralph-workloop: runtime afk.sh template is required.');
  }

  console.log(`Validation passed for ${manifest.name}@${manifest.version}`);
}

const pluginNames = fs
  .readdirSync(pluginsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const pluginName of pluginNames) {
  validatePlugin(pluginName);
}
