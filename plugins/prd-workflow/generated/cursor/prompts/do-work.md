# Prompt: do-work

Canonical plugin: `prd-workflow`  
Canonical version: `1.0.0`  
Workflow ID: `do-work`

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
