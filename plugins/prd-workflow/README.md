# prd-workflow (Canonical Plugin Source)

Single-source canonical plugin definition.

- Workflows authored once in `workflows/`
- Agent-specific artifacts generated into `generated/`
- NPM package payload assembled from canonical + generated outputs

This plugin includes an optional bridge workflow (`handoff-to-ralph`) for interoperability with the `ralph-workloop` plugin.

Do not hand-edit files in `generated/`.
