# prd-workflow (Canonical Plugin Source)

Single-source canonical plugin definition.

- Workflows authored once in `workflows/`
- Agent-specific artifacts generated into `generated/`
- NPM package payload assembled from canonical + generated outputs

This plugin includes an optional bridge workflow (`handoff-to-ralph`) for interoperability with the `ralph-workloop` plugin.
It also includes an optional alias workflow (`prd-to-issues`) whose canonical source lives in `plugins/prd-to-issues/`.
The `write-a-prd` workflow includes module-awareness and deep-module planning guidance, with optional GitHub issue publication mode.

Do not hand-edit files in `generated/`.
