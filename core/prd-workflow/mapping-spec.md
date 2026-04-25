# Mapping Spec: core -> adapters

Canonical source: `core/prd-workflow/`
Canonical version source: `core/prd-workflow/manifest.json`

## Adapter Mapping

- `write-a-prd` ->
  - Codex: `adapters/codex/prd-workflow/skills/write-a-prd/SKILL.md`
  - Claude: `adapters/claude/prd-workflow/.claude/skills/write-a-prd/SKILL.md`
  - Cursor: `adapters/cursor/prd-workflow/prompts/write-a-prd.md`
- `prd-to-plan` ->
  - Codex: `adapters/codex/prd-workflow/skills/prd-to-plan/SKILL.md`
  - Claude: `adapters/claude/prd-workflow/.claude/skills/prd-to-plan/SKILL.md`
  - Cursor: `adapters/cursor/prd-workflow/prompts/prd-to-plan.md`
- `do-work` ->
  - Codex: `adapters/codex/prd-workflow/skills/do-work/SKILL.md`
  - Claude: `adapters/claude/prd-workflow/.claude/skills/do-work/SKILL.md`
  - Cursor: `adapters/cursor/prd-workflow/prompts/do-work.md`

## Sync Rules

1. Edit only canonical files in `core/prd-workflow/`.
2. Preserve behavior parity, not text parity.
3. Keep workflow IDs exactly identical across adapters.
4. Ensure adapter artifacts reference canonical version `1.0.0` (update when manifest changes).
5. Confirm invocation policy is unchanged:
   - `do-work` is directly invokable.
   - `prd-to-plan` is explicit, optional support path.
   - `write-a-prd` is explicit.

## Drift Check Procedure

For each workflow ID:
- Compare goal, required output, and invocation policy between canonical and adapter files.
- Verify no adapter introduces a mandatory `do-work -> prd-to-plan` chain.
- Verify metadata points to canonical version in adapter docs/frontmatter.
