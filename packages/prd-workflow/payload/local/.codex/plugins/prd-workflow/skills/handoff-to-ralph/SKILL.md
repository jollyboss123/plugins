---
name: handoff-to-ralph
description: Canonical handoff-to-ralph workflow from prd-workflow.
canonical_plugin: prd-workflow
canonical_version: 1.1.0
canonical_source: plugins/prd-workflow/workflows/handoff-to-ralph.md
---

# Workflow: handoff-to-ralph

## Goal
Create an execution handoff packet from an approved PRD/plan slice for Ralph-style workloop automation.

## Inputs
- Approved PRD and phase/slice selection
- Current repo context and recent commit history summary
- Iteration budget and completion conditions

## Required Output
A handoff packet that includes:
- Task scope (single slice only)
- Validation commands
- Stop conditions and max iterations
- Commit message requirements
- Completion sentinel token

## Behavior Contract
- This workflow is optional and does not alter default `do-work` behavior.
- It does not execute automation loops; it only prepares interop artifacts.
- Enforce one-task-per-iteration scope.
- Require explicit stop conditions and iteration cap.
