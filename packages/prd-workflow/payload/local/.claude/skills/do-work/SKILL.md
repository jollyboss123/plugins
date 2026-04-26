---
name: do-work
description: Canonical do-work workflow from prd-workflow.
canonical_plugin: prd-workflow
canonical_version: 1.3.0
canonical_source: plugins/prd-workflow/workflows/do-work.md
---

# Workflow: do-work

## Goal
Execute one unit of work end-to-end from implementation through validation.

## Inputs
- Task request (may include a PRD or plan)
- Existing codebase state

## Required Output
- Implemented change set
- Validation evidence (typecheck/tests or project-equivalent checks)
- Commit-ready summary (commit action only when explicitly requested by local policy)

## Behavior Contract
- Direct invocation is allowed; do not require `prd-to-plan` to run.
- If a plan exists, follow it.
- If no plan exists, do lightweight planning sufficient for safe execution.
- Backend tasks should prefer incremental red/green/refactor loops; frontend may implement directly.
- Run project-native validation commands; if unknown, discover and use standard typecheck/test equivalents.
