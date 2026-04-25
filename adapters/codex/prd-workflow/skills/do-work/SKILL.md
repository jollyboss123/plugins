---
name: do-work
description: Execute a unit of work end-to-end with validation and delivery summary. Use when implementing a feature, fix, or approved phase.
canonical_bundle: prd-workflow
canonical_version: 1.0.0
canonical_source: /Users/fusingvoon/IdeaProjects/plugins/core/prd-workflow/workflows/do-work.md
---

# Do Work

## Invocation Policy
- This skill is directly invokable.
- It does not require `prd-to-plan` to run.
- If an approved plan exists, follow it.

## Workflow
1. Understand task and relevant code paths.
2. Do lightweight planning if no plan is provided.
3. Implement incrementally.
4. Run project-native validation checks (typecheck/tests or equivalents).
5. Provide a commit-ready summary and evidence.

## Guardrails
- Backend: prefer red/green/refactor slices.
- Frontend: direct implementation is acceptable with strong validation.
- Never force a planning pre-step for small, clear tasks.
