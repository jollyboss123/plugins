# Prompt: improve-codebase-architecture

Canonical plugin: `improve-codebase-architecture`  
Canonical version: `1.0.0`  
Workflow ID: `improve-codebase-architecture`

# Workflow: improve-codebase-architecture

## Goal
Discover architectural friction and propose deep-module refactors that improve testability and AI navigability.

## Inputs
- Current codebase context
- Optional target area or module cluster

## Required Output
A Markdown RFC containing:
- Candidate cluster and coupling diagnosis
- Dependency category and risk assessment
- At least three interface design options
- Recommended option with trade-offs
- Migration/testing strategy

## Behavior Contract
- Explore the codebase from a friction-first perspective (where reasoning is costly across seams).
- Prefer deep modules: small stable interfaces that hide substantial implementation.
- Generate multiple interface options before recommending one.
- Output RFC as Markdown by default; no mandatory GitHub issue creation in canonical behavior.
