# Prompt: prd-to-plan

Canonical plugin: `prd-workflow`  
Canonical version: `1.3.0`  
Workflow ID: `prd-to-plan`

# Workflow: prd-to-plan

## Goal
Convert a PRD into a phased implementation plan using tracer-bullet vertical slices.

## Inputs
- A PRD in conversation or as a file
- Current repo architecture context

## Required Output
A plan document containing:
- Durable architectural decisions
- Multiple end-to-end phases
- Acceptance criteria per phase

## Behavior Contract
- Prefer thin vertical slices that cross schema/API/UI/tests over layer-by-layer slices.
- Keep durable decisions explicit (routes, model shape, service boundaries).
- Avoid fragile file/function-level prescriptions.
- Request approval on phase granularity before finalizing when interactive.
