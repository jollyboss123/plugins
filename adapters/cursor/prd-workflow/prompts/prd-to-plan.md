# Prompt: prd-to-plan

Canonical bundle: `prd-workflow`
Canonical version: `1.0.0`
Workflow ID: `prd-to-plan`

## Prompt
Convert my PRD into a phased implementation plan using tracer-bullet vertical slices.

Requirements:
- Include durable architectural decisions first.
- Each phase must be an end-to-end slice across integration layers.
- Include acceptance criteria per phase.
- Avoid fragile function/file-level commitments unless needed for safety.
- Keep the plan implementation-ready.
