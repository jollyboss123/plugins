# Prompt: do-work

Canonical bundle: `prd-workflow`
Canonical version: `1.0.0`
Workflow ID: `do-work`

## Prompt
Execute this task end-to-end in the current codebase.

Policy:
- You may run directly; do not require `prd-to-plan` first.
- If a plan is provided, follow it.
- If no plan is provided, create a lightweight execution plan first.

Requirements:
- Implement incrementally.
- Run project-native validation checks (typecheck/tests or equivalents).
- Provide a concise summary of changes and validation evidence.
