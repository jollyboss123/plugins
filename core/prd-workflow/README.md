# prd-workflow (Canonical)

Canonical source-of-truth for a three-step product delivery workflow:

1. `write-a-prd`
2. `prd-to-plan`
3. `do-work`

This folder defines behavior-level contracts that adapters must preserve.

## Canonical Files

- `manifest.json`: bundle metadata, workflow IDs, and version
- `workflows/*.md`: behavior definitions per workflow
- `mapping-spec.md`: adapter mapping rules and sync process
