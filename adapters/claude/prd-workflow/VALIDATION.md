# Claude Adapter Validation Checklist

- [ ] `.claude/skills/` contains exactly `write-a-prd`, `prd-to-plan`, `do-work`.
- [ ] Each skill includes canonical metadata and version `1.0.0`.
- [ ] `do-work` is directly invokable and does not enforce `prd-to-plan`.
- [ ] Planning language preserves vertical-slice behavior for `prd-to-plan`.
