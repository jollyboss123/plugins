---
name: prd-to-issues
description: Canonical prd-to-issues workflow from prd-workflow.
canonical_plugin: prd-workflow
canonical_version: 1.3.0
canonical_source: plugins/prd-workflow/workflows/prd-to-issues.md
---

# Workflow: prd-to-issues (Alias)

## Goal
Provide a bridge from `prd-workflow` into the canonical `prd-to-issues` contract.

## Inputs
- PRD text or artifact
- Repo context

## Required Output
- Dependency-aware issue slices following the canonical `prd-to-issues` behavior.

## Behavior Contract
- This is an optional alias workflow.
- Canonical source of truth is `plugins/prd-to-issues/workflows/prd-to-issues.md`.
- Existing `write-a-prd`, `prd-to-plan`, and `do-work` behaviors remain unchanged.
