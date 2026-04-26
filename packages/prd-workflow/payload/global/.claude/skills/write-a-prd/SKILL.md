---
name: write-a-prd
description: Canonical write-a-prd workflow from prd-workflow.
canonical_plugin: prd-workflow
canonical_version: 1.1.0
canonical_source: plugins/prd-workflow/workflows/write-a-prd.md
---

# Workflow: write-a-prd

## Goal
Create a structured PRD from a problem statement and solution direction.

## Inputs
- Problem context and desired outcome
- Constraints and non-goals
- Existing system context from repo exploration

## Required Output
A PRD document that includes at minimum:
- Problem Statement
- Solution
- User Stories
- Implementation Decisions
- Out of Scope
- Further Notes

## Behavior Contract
- Clarify ambiguous product intent with focused questions.
- Verify assumptions against repo context when available.
- Avoid unstable implementation details (for example exact file-level code snippets) unless explicitly required.
- Keep wording actionable for handoff to planning.
