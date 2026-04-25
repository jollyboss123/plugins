# Cross-Agent Workflow Plugin Monorepo

This repository is a vendor-neutral monorepo for workflow skills/prompts that are adapted to multiple agent ecosystems:

- Codex
- Claude
- Cursor

## Structure

- `core/`: canonical, agent-agnostic workflow definitions
- `adapters/`: agent-specific adapters generated/synced from `core/`

## Current Bundle (v1)

- `prd-workflow`
  - `write-a-prd`
  - `prd-to-plan`
  - `do-work`

## Authoring Rule

Edit only `core/` for behavior changes. Then sync each adapter using the mapping instructions in:

- `core/prd-workflow/mapping-spec.md`

## Validation

Run the per-adapter manual checklist files:

- `adapters/codex/prd-workflow/VALIDATION.md`
- `adapters/claude/prd-workflow/VALIDATION.md`
- `adapters/cursor/prd-workflow/VALIDATION.md`
