import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pluginsRoot = path.join(root, 'plugins');
const packagesRoot = path.join(root, 'packages');
const repoUrl = 'https://github.com/jollyboss123/plugins';

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

function maybeCopyDir(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) return;
  copyDir(sourceDir, targetDir);
}

function generatePlugin(pluginName) {
  const pluginDir = path.join(pluginsRoot, pluginName);
  const generatedDir = path.join(pluginDir, 'generated');
  const packageDir = path.join(packagesRoot, pluginName);
  const payloadDir = path.join(packageDir, 'payload');

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
      name: manifest.interface?.developerName || 'jollyboss123',
      email: 'noreply@example.com',
      url: repoUrl
    },
    homepage: repoUrl,
    repository: repoUrl,
    license: manifest.license,
    keywords: manifest.keywords || [],
    skills: './skills/',
    interface: {
      displayName: manifest.interface?.displayName || manifest.name,
      shortDescription: manifest.interface?.shortDescription || manifest.description,
      longDescription: manifest.interface?.longDescription || manifest.description,
      developerName: manifest.interface?.developerName || 'jollyboss123',
      category: manifest.interface?.category || 'Productivity',
      capabilities: manifest.interface?.capabilities || ['Read', 'Write'],
      websiteURL: repoUrl,
      privacyPolicyURL: repoUrl,
      termsOfServiceURL: repoUrl,
      defaultPrompt: manifest.interface?.defaultPrompt || [],
      brandColor: manifest.interface?.brandColor || '#2563EB'
    }
  };
  writeJson(path.join(generatedDir, 'codex', '.codex-plugin', 'plugin.json'), codexManifest);

  for (const workflowId of manifest.workflows) {
    const body = workflowContents.get(workflowId);
    const frontmatter = `---\nname: ${workflowId}\ndescription: Canonical ${workflowId} workflow from ${manifest.name}.\ncanonical_plugin: ${manifest.name}\ncanonical_version: ${manifest.version}\ncanonical_source: plugins/${manifest.name}/workflows/${workflowId}.md\n---\n\n`;
    writeFile(path.join(generatedDir, 'codex', 'skills', workflowId, 'SKILL.md'), `${frontmatter}${body}\n`);
    writeFile(path.join(generatedDir, 'claude', '.claude', 'skills', workflowId, 'SKILL.md'), `${frontmatter}${body}\n`);

    const cursorPrompt = `# Prompt: ${workflowId}\n\nCanonical plugin: \`${manifest.name}\`  \nCanonical version: \`${manifest.version}\`  \nWorkflow ID: \`${workflowId}\`\n\n${body}\n`;
    writeFile(path.join(generatedDir, 'cursor', 'prompts', `${workflowId}.md`), cursorPrompt);
  }

  const claudePluginManifest = {
    name: manifest.name,
    version: manifest.version,
    description: manifest.description,
    author: {
      name: manifest.interface?.developerName || 'jollyboss123'
    },
    homepage: repoUrl,
    repository: repoUrl,
    license: manifest.license,
    keywords: manifest.keywords || []
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

  const runtimeDir = path.join(pluginDir, 'runtime');
  maybeCopyDir(runtimeDir, path.join(payloadDir, 'local', '.ralph', 'plugins', manifest.name, 'runtime'));

  const globalCodexTarget = path.join(payloadDir, 'global', '.codex', 'plugins', manifest.name);
  copyDir(path.join(generatedDir, 'codex'), globalCodexTarget);

  for (const workflowId of manifest.workflows) {
    const sourceSkill = path.join(generatedDir, 'claude', '.claude', 'skills', workflowId, 'SKILL.md');
    const globalClaudeSkill = path.join(payloadDir, 'global', '.claude', 'skills', workflowId, 'SKILL.md');
    writeFile(globalClaudeSkill, fs.readFileSync(sourceSkill, 'utf8'));
  }

  maybeCopyDir(runtimeDir, path.join(payloadDir, 'global', '.ralph', 'plugins', manifest.name, 'runtime'));

  console.log(`Generated artifacts for plugin ${manifest.name}@${manifest.version}`);
}

const pluginNames = fs
  .readdirSync(pluginsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const pluginName of pluginNames) {
  generatePlugin(pluginName);
}
