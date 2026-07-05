# FSA Layer-1 Token Change Spec (v0.1)

Execution spec for **Layer 1 only**. Branch: **feat/fsa-layer-1-graphite-tokens**. **No commit until regression is reported and approved.**

Scope: adopt the Token Sheet graphite scale as the canonical FSA web skin, via **token aliases with literal fallbacks**. This is a **paired change**: (a) add the graphite/paper scales to the shared token file, (b) re-point FSA's neutrals to them. Nothing outside the three token/theme files is touched.

Authority: **Token Sheet** = graphite `--n-*` (web) + paper `--p-*` (print). Option A is the decided direction (see token-reconciliation-ab).

---

## Files touched (exactly 3)

1. `css/tsa-shared-tokens.css`
2. `css/fsa-brand.css`
3. `css/fsa-theme.css`

No module, JS, component, or other CSS file is edited in Layer 1.

## Change 1 — `css/tsa-shared-tokens.css` (add scales)

Add the graphite `--n-*` (web skin) and paper `--p-*` (print surface) raw scales to `:root`. These are raw values (the source of truth). No FSA page references them bare, so adding them is non-breaking.

```
/* Graphite neutral scale — canonical FSA web skin */
--n-bg:#121316; --n-surface:#191B1F; --n-elevated:#212429; --n-deepest:#0C0D0F;
--n-border:#2C2F36; --n-border-strong:#3C4047;
--n-ink:#ECECE6; --n-ink-strong:#FBFBF7; --n-muted:#A7ABB3; --n-faint:#6E727A;

/* Paper scale — print/worksheet only; never applied to the web skin */
--p-bg:#FDFCF9; --p-surface:#F5F3EE; --p-border:#D9D6CE; --p-border-strong:#B9B6AE;
--p-ink:#1A1C1F; --p-ink-soft:#3F434B; --p-muted:#5A5E66; --p-faint:#8A8D93;
```

## Change 2 — `css/fsa-brand.css` (alias 10 neutrals)

Re-point the 10 `--color-*` neutrals to the graphite scale, each with its **former literal as fallback** (so a missing import can never collapse the color). Old value shown in comment.

```
--color-bg: var(--n-bg, #121316);                       /* was #0E1013 */
--color-surface: var(--n-surface, #191B1F);             /* was #16181C */
--color-elevated: var(--n-elevated, #212429);           /* was #1C1F24 */
--color-deepest: var(--n-deepest, #0C0D0F);             /* was #08090B */
--color-border: var(--n-border, #2C2F36);               /* was #2A2E35 */
--color-border-strong: var(--n-border-strong, #3C4047); /* was #3A3F47 */
--color-text: var(--n-ink, #ECECE6);                    /* was #F4F6F7 */
--color-text-strong: var(--n-ink-strong, #FBFBF7);      /* was #FFFFFF */
--color-muted: var(--n-muted, #A7ABB3);                 /* was #A8B0B8 */
--color-faint: var(--n-faint, #6E727A);                 /* was #6B7280 */
```

Requires `@import url('tsa-shared-tokens.css')` present in `fsa-brand.css` (already at line ~22). Emerald/gradient/signal tokens unchanged.

## Change 3 — `css/fsa-theme.css` (neutralize green surfaces)

Re-point the 4 green surface tokens and 2 green surface gradients to graphite, with literal fallbacks. Old value in comment. **Leave** `--fsa-green*`, `--fsa-gradient-primary`, status colors, emerald borders (these are signal, not neutral).

```
--fsa-bg-dark: var(--n-bg, #121316);            /* was #0a1f1a */
--fsa-bg-secondary: var(--n-surface, #191B1F);  /* was #0f2922 */
--fsa-bg-card: var(--n-elevated, #212429);      /* was #1a3a2e */
--fsa-bg-hover: var(--n-border, #2C2F36);       /* was #234a3c */
--fsa-gradient-bg: var(--n-bg, #121316);        /* was green gradient */
--fsa-gradient-card: var(--n-surface, #191B1F); /* was rgba emerald gradient */
```

Requires `@import url('tsa-shared-tokens.css')` in `fsa-theme.css` (added at line ~10). `--fsa-green: var(--fsa-emerald,#10b981)` and `--fsa-green-light: var(--fsa-solid,#34d399)` stay bridged to the vendored accent subset.

## Why alias-with-fallback (not raw replacement)

- Single source of truth: values live once in `tsa-shared-tokens.css`.
- Resilience: `var(--n-bg, #121316)` renders correctly even if the import fails to load — impossible to collapse to transparent.
- Reversibility: revert = restore the old literals; the graphite scale can stay defined and unused.

## Regression checklist (served mode, before commit)

Run `python3 -m http.server`; check before/after, desktop + 375px:

- [ ] `--color-bg` resolves to `#121316` (graphite), text/surface/border resolve to graphite scale.
- [ ] Emerald-on-graphite contrast ≥ 4.5:1 (measured ~7.3:1); ink-on-bg ~15.7:1; ink-on-card ~6.1:1.
- [ ] **No green surface survives** anywhere `--fsa-bg-*`/`--fsa-gradient-bg`/`--fsa-gradient-card` is consumed.
- [ ] Homepage — renders (served), surfaces graphite not green, nothing broken.
- [ ] One calculator, one institutional page, one non-redesigned module — render, no green-wash, no breakage.
- [ ] Module 2 — unchanged in structure; surfaces graphite; emerald signal intact.
- [ ] `git diff --stat` shows **only** the 3 token/theme files changed.

## Rollback

`git checkout css/tsa-shared-tokens.css css/fsa-brand.css css/fsa-theme.css` on the branch, or restore the literal values in Changes 2–3 and remove the added scales in Change 1. No other file is affected.

## Current status

All three changes are **applied and uncommitted** on `feat/fsa-layer-1-graphite-tokens`. Regression measured and passing (graphite resolves; contrasts pass; no green surface survives; diff scope = 3 files). Awaiting owner approval of the visual pass before commit. Paired change is complete.

---

*Execution spec. Layer 1 = the three token/theme edits above, nothing more. Layer 2 must not begin until Layer 1 is verified and committed separately.*
