<!-- Describe the change. For new FSA program / brand-sensitive pages, complete the brand checklist below. -->

## Summary

<!-- What does this PR do and why? -->

## FSA brand checklist (required for new program / brand-sensitive pages)

See `docs/fsa-program-style-contract.md`. N/A for back-end-only or non-visual PRs.

- [ ] Links `/css/fsa-brand.css`
- [ ] Does **not** link `fsa-theme.css`
- [ ] No page-local brand `:root` (or maintainer-approved, noted below)
- [ ] No broad green surfaces (`#0a1f1a` / `#0f2922` / `#1a3a2e` / `#234a3c`, green gradients, `rgba(16,185,129,…)` fills)
- [ ] Neutral backgrounds/cards/panels (`var(--color-bg)` / `--color-surface)` / `--color-elevated)`)
- [ ] Emerald/mint used as accents only
- [ ] Primary buttons use the gradient-outline treatment (`.fsa-btn--primary`)
- [ ] Semantic colors preserved (success/warning/error, +/- outputs, meaningful chart colors)
- [ ] `scripts/fsa-style-check.sh <path>` run and passes
- [ ] Checked against `styleguide.html` on desktop and mobile

## Approved exceptions (if any)

<!-- List any maintainer-approved deviations (e.g., a page-local :root) and who approved them. -->
