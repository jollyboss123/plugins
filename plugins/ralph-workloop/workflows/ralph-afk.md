# Workflow: ralph-afk

## Goal
Run bounded unattended automation iterations with explicit safety controls.

## Inputs
- Task packet generated from PRD/plan handoff
- Iteration budget (required)
- Environment capability declaration
- Validation command set

## Required Output
- Zero or more completed iterations up to iteration cap
- Validation evidence per iteration
- Deterministic stop outcome

## Behavior Contract
- Requires explicit environment capability declaration before execution.
- Must stop when either:
  - completion sentinel is emitted (`<promise>NO MORE TASKS</promise>`), or
  - max iterations is reached.
- One-task-per-iteration rule is mandatory.
- Validation failures block successful completion for that iteration.
