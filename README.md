# Cross-Agent Plugin Monorepo (NPM-Only)

This repository is a vendor-neutral monorepo for agent workflows that supports:

- Codex
- Claude
- Cursor

The canonical source lives once per plugin in `plugins/<plugin-id>/`.
Agent/platform artifacts are generated from that single source and committed.

## Structure

- `plugins/`: canonical plugin sources and generated artifacts
- `packages/`: npm packages (one package per plugin)
- `tools/`: generation and validation scripts
- `schemas/`: manifest/reference schemas

## Current Plugins

- `prd-workflow`
  - `write-a-prd`
  - `prd-to-plan`
  - `do-work`
  - `handoff-to-ralph` (optional bridge)
  - `prd-to-issues` (optional alias to canonical plugin)
  - `write-a-prd` includes module-awareness + deep-module planning and optional GitHub publication mode
- `prd-to-issues`
  - `prd-to-issues` (canonical source for issue-slicing contract)
- `improve-codebase-architecture`
  - `improve-codebase-architecture` (Markdown RFC output)
- `ralph-workloop`
  - `ralph-once`
  - `ralph-afk`

## Authoring Workflow

1. Edit canonical files in `plugins/<plugin-id>/`.
2. Regenerate artifacts:
   - `npm run generate`
3. Validate consistency/drift checks:
   - `npm run validate`
4. Run full build gate:
   - `npm run build`

Do not hand-edit generated artifacts.

## Distribution

NPM-only in v1. Install a specific plugin package:

```bash
npm install @jollyboss123/prd-workflow
npm install @jollyboss123/prd-to-issues
npm install @jollyboss123/improve-codebase-architecture
npm install @jollyboss123/ralph-workloop
```

Optional explicit installer commands:

```bash
npx @jollyboss123/prd-workflow install --local
npx @jollyboss123/prd-to-issues install --local
npx @jollyboss123/improve-codebase-architecture install --local
npx @jollyboss123/ralph-workloop install --local
```

Postinstall defaults to safe behavior (local install only).
Global writes require explicit opt-in.

## Release Automation

Publishing is handled by GitHub Actions release workflows. Before cutting a release:

1. Bump canonical plugin version(s) in `plugins/<plugin-id>/manifest.json`.
2. Run `npm run build` and commit generated artifacts.
3. Publish via the configured release workflow.
