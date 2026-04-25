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

## v1 Plugin

- `prd-workflow`
  - `write-a-prd`
  - `prd-to-plan`
  - `do-work`

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
```

Optional explicit installer commands:

```bash
npx @jollyboss123/prd-workflow install --local
npx @jollyboss123/prd-workflow install --global
npx @jollyboss123/prd-workflow verify
```

Postinstall defaults to safe behavior (local install only).
Global writes require explicit opt-in.

## Release Checklist

1. Bump canonical plugin version in `plugins/<plugin-id>/manifest.json`.
2. Run `npm run generate`.
3. Run `npm run build`.
4. Commit generated changes.
5. Publish selected package(s).
