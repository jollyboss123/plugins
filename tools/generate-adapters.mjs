import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pluginDir = path.join(root, 'plugins', 'prd-workflow');
const generatedDir = path.join(pluginDir, 'generated');
const packageDir = path.join(root, 'packages', 'prd-workflow');
const payloadDir = path.join(packageDir, 'payload');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeFile(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function cleanDir(targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
}

function copyDir(sourceDir, targetDir) {
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
}

const manifest = readJson(path.join(pluginDir, 'manifest.json'));

const workflowContents = new Map();
for (const workflowId of manifest.workflows) {
  const workflowPath = path.join(pluginDir, 'workflows', `${workflowId}.md`);
  workflowContents.set(workflowId, fs.readFileSync(workflowPath, 'utf8').trim());
}

cleanDir(generatedDir);

const codexManifest = {
  name: manifest.name,
  version: manifest.version,
  description: manifest.description,
  author: {
    name: 'jollyboss123',
    email: 'noreply@example.com',
    url: 'https://github.com/jollyboss123/plugins'
  },
  homepage: 'https://github.com/jollyboss123/plugins',
  repository: 'https://github.com/jollyboss123/plugins',
  license: manifest.license,
  keywords: ['prd', 'planning', 'execution', 'workflow'],
  skills: './skills/',
  interface: {
    displayName: 'PRD Workflow',
    shortDescription: 'Write PRDs, plan phases, execute work.',
    longDescription: 'Cross-agent workflow bundle for PRD authoring, phased planning, and execution.',
    developerName: 'jollyboss123',
    category: 'Productivity',
    capabilities: ['Read', 'Write', 'Planning'],
    websiteURL: 'https://github.com/jollyboss123/plugins',
    privacyPolicyURL: 'https://github.com/jollyboss123/plugins',
    termsOfServiceURL: 'https://github.com/jollyboss123/plugins',
    defaultPrompt: [
      'Create a PRD for this feature.',
      'Turn this PRD into phased tracer-bullet plan.',
      'Execute phase 1 using do-work.'
    ],
    brandColor: '#2563EB'
  }
};
writeJson(path.join(generatedDir, 'codex', '.codex-plugin', 'plugin.json'), codexManifest);

for (const workflowId of manifest.workflows) {
  const body = workflowContents.get(workflowId);
  const codexSkill = `---\nname: ${workflowId}\ndescription: Canonical ${workflowId} workflow from ${manifest.name}.\ncanonical_plugin: ${manifest.name}\ncanonical_version: ${manifest.version}\ncanonical_source: plugins/${manifest.name}/workflows/${workflowId}.md\n---\n\n${body}\n`;
  writeFile(path.join(generatedDir, 'codex', 'skills', workflowId, 'SKILL.md'), codexSkill);

  const claudeSkill = `---\nname: ${workflowId}\ndescription: Canonical ${workflowId} workflow from ${manifest.name}.\ncanonical_plugin: ${manifest.name}\ncanonical_version: ${manifest.version}\ncanonical_source: plugins/${manifest.name}/workflows/${workflowId}.md\n---\n\n${body}\n`;
  writeFile(path.join(generatedDir, 'claude', '.claude', 'skills', workflowId, 'SKILL.md'), claudeSkill);

  const cursorPrompt = `# Prompt: ${workflowId}\n\nCanonical plugin: \`${manifest.name}\`  \nCanonical version: \`${manifest.version}\`  \nWorkflow ID: \`${workflowId}\`\n\n${body}\n`;
  writeFile(path.join(generatedDir, 'cursor', 'prompts', `${workflowId}.md`), cursorPrompt);
}

const claudePluginManifest = {
  name: manifest.name,
  version: manifest.version,
  description: manifest.description,
  author: {
    name: 'jollyboss123'
  },
  homepage: 'https://github.com/jollyboss123/plugins',
  repository: 'https://github.com/jollyboss123/plugins',
  license: manifest.license
};
writeJson(path.join(generatedDir, 'claude', '.claude-plugin', 'plugin.json'), claudePluginManifest);

const cursorPromptList = manifest.workflows.map((workflowId) => `- prompts/${workflowId}.md`).join('\n');
writeFile(
  path.join(generatedDir, 'cursor', 'README.md'),
  `# Cursor Adapter: ${manifest.name}\n\nGenerated prompt pack for Cursor.\n\n## Prompts\n${cursorPromptList}\n\n## Parity\nBehavior parity is sourced from \`plugins/${manifest.name}/workflows/*.md\`.\n`
);

const packageJsonPath = path.join(packageDir, 'package.json');
const packageJson = readJson(packageJsonPath);
packageJson.name = `${manifest.scope}/${manifest.name}`;
packageJson.version = manifest.version;
packageJson.description = manifest.description;
packageJson.license = manifest.license;
writeJson(packageJsonPath, packageJson);

cleanDir(payloadDir);

const localCodexTarget = path.join(payloadDir, 'local', '.codex', 'plugins', manifest.name);
copyDir(path.join(generatedDir, 'codex'), localCodexTarget);

for (const workflowId of manifest.workflows) {
  const sourceSkill = path.join(generatedDir, 'claude', '.claude', 'skills', workflowId, 'SKILL.md');
  const localClaudeSkill = path.join(payloadDir, 'local', '.claude', 'skills', workflowId, 'SKILL.md');
  writeFile(localClaudeSkill, fs.readFileSync(sourceSkill, 'utf8'));
}

const localCursorTarget = path.join(payloadDir, 'local', '.cursor', 'plugins', manifest.name);
copyDir(path.join(generatedDir, 'cursor'), localCursorTarget);

const globalCodexTarget = path.join(payloadDir, 'global', '.codex', 'plugins', manifest.name);
copyDir(path.join(generatedDir, 'codex'), globalCodexTarget);

for (const workflowId of manifest.workflows) {
  const sourceSkill = path.join(generatedDir, 'claude', '.claude', 'skills', workflowId, 'SKILL.md');
  const globalClaudeSkill = path.join(payloadDir, 'global', '.claude', 'skills', workflowId, 'SKILL.md');
  writeFile(globalClaudeSkill, fs.readFileSync(sourceSkill, 'utf8'));
}

console.log(`Generated artifacts for plugin ${manifest.name}@${manifest.version}`);
