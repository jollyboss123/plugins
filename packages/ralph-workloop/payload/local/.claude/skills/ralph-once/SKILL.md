---
name: ralph-once
description: Canonical ralph-once workflow from ralph-workloop.
canonical_plugin: ralph-workloop
canonical_version: 1.0.0
canonical_source: plugins/ralph-workloop/workflows/ralph-once.md
---

# Workflow: ralph-once

## Goal
Execute exactly one bounded automation iteration from a task packet.

## Inputs
- Task packet generated from PRD/plan handoff
- Recent commit context
- Validation command set

## Required Output
- One completed task iteration
- Validation evidence
- Commit with required summary format

## Behavior Contract
- One-task-per-iteration only.
- Must run required validation commands before commit.
- Must stop after one iteration regardless of remaining backlog.
- If task is already complete, emit deterministic completion sentinel: `<promise>NO MORE TASKS</promise>`.
