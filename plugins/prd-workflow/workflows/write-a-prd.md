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
- Before finalizing, sketch the major modules to build or modify.
- Prefer deep modules: simple, stable, testable interfaces that encapsulate substantial implementation complexity.
- Confirm module boundaries and preferred test boundaries with the user before final output.
- Avoid unstable implementation details (for example exact file-level code snippets) unless explicitly required.
- Keep wording actionable for handoff to planning.

## Publication Mode
- Default: output PRD as a structured repo-agnostic artifact/body.
- Optional: when GitHub integration is available, provide issue-ready output or create an issue only if requested.
- Do not require `gh` as a hard dependency in canonical behavior.
