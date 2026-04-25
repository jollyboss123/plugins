---
name: prd-to-plan
description: Convert a PRD into a phased tracer-bullet implementation plan. Use when the user wants vertical-slice phase breakdowns and acceptance criteria.
canonical_bundle: prd-workflow
canonical_version: 1.0.0
canonical_source: /Users/fusingvoon/IdeaProjects/plugins/core/prd-workflow/workflows/prd-to-plan.md
---

# PRD to Plan

## Outcome
Produce a phased implementation plan with:
- Durable architectural decisions
- Vertical-slice phases
- Acceptance criteria for each phase

## Workflow
1. Confirm PRD source (chat context or file).
2. Explore repo architecture and integration boundaries.
3. Define durable decisions (routes, models, boundaries).
4. Draft thin vertical slices that are independently verifiable.
5. Finalize as a Markdown plan artifact.

## Guardrails
- Prefer end-to-end slices over layer-by-layer plans.
- Avoid brittle file/function commitments in early phases.
