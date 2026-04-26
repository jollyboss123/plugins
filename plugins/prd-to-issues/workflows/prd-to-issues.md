# Workflow: prd-to-issues

## Goal
Convert a PRD into independently executable, dependency-aware issue slices using thin vertical tracer bullets.

## Inputs
- PRD text or PRD artifact
- Repo architecture context
- Optional execution preference (HITL vs AFK)

## Required Output
A numbered issue-slice set that includes:
- Slice title
- Type (`HITL` or `AFK`)
- Blocked-by relationships
- User stories addressed
- "What to build" scope
- Acceptance criteria checklist

## Behavior Contract
- Use thin vertical slices that cross data/API/UI/tests where applicable.
- Prefer AFK slices where safe; mark HITL when human approval/review is required.
- Always include a final QA/HITL verification slice blocked by all implementation slices.
- Keep output repo-agnostic: do not require direct `gh` execution in the canonical contract.
