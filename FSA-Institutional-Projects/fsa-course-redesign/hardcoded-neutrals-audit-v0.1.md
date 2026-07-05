# FSA Hard-coded Neutrals Audit (v0.1)

Read-only audit. **No code changes, no commit.** Working assumption: **Option A** (Token Sheet graphite becomes the canonical FSA web skin, consumed via token aliases).

Purpose: find where neutral surface/text/border colors are hard-coded (raw hex/rgba) instead of consuming tokens, so Layer 1 knows what it fixes now vs. what is deferred.

---

## Method

Grepped `css/` and `modules/` for raw neutral hex and green-tinted "neutral" surfaces (e.g. `#0a1f1a`, `#0f2922`, `#1a3a2e`, near-black `#0E…`/`#08…`, pure `#FFFFFF`/`#000000`), plus rgba neutrals. Classified each by: token-able now (Layer 1), component-level (Layer 3), or leave (out of scope / print).

## Findings by file

### `css/fsa-brand.css` — token definitions
The 10 `--color-*` neutrals are defined as **raw hex**. These are the canonical definitions, so "hard-coded" here is expected — Layer 1 re-points them to `var(--n-*, <literal>)`. **Action: Layer 1 (alias).**

### `css/fsa-theme.css` — green-tinted surfaces
`--fsa-bg-dark #0a1f1a`, `--fsa-bg-secondary #0f2922`, `--fsa-bg-card #1a3a2e`, `--fsa-bg-hover #234a3c`, plus green `--fsa-gradient-bg`/`--fsa-gradient-card`. These are **green-wash neutrals** — the main source of the "green cards" problem. **Action: Layer 1 (neutralize to `var(--n-*, <literal>)`).** Leave `--fsa-green*`, `--fsa-gradient-primary`, status colors, and emerald borders (signal — not neutral).

### `css/tsa-shared-tokens.css`
Now holds the raw `--n-*`/`--p-*` scales (correct — this is the source-of-truth token file). **Action: none beyond Layer 1 addition.**

### `modules/emergency-funds-saving.html` (Module 2 pilot)
Inline neutralizations already applied to `.highlight-tip`, `.fsa-live-banner`, `.build-item`, `.fsa-plan-widget` and card backgrounds. These reference tokens/neutral values in the pilot's scoped block. **Action: Layer 3 (migrate to shared `fsa-course.css`), not Layer 1.**

### Other 9 modules + calculators + institutional + homepage
Contain their own hard-coded neutrals and (in some cases) green surfaces via `fsa-theme.css`. **Action: out of scope until each is redesigned.** Layer 1 only changes the shared token/theme files; because those pages consume `--fsa-bg-*`, they will inherit the neutralization automatically — this must be checked in Layer-1 regression (they should look *better*, never broken).

## Layer-1 target set (what Layer 1 touches)

Only three files:
1. `css/tsa-shared-tokens.css` — **add** `--n-*` + `--p-*`.
2. `css/fsa-brand.css` — **alias** 10 `--color-*` → `var(--n-*, <literal>)`.
3. `css/fsa-theme.css` — **neutralize** 4 `--fsa-bg-*` + 2 green surface gradients → `var(--n-*, <literal>)`.

Everything else is deferred to Layer 3 (Module 2 migration) or to per-module redesign.

## Deferred (explicitly NOT Layer 1)

- Module-level inline neutrals (Layer 3 migration).
- The other 9 modules' own hex (per-module redesign).
- Calculators / institutional / homepage neutrals (not redesigned yet).
- Paper `--p-*` application (Layer 5 print only).
- Any emerald/status/signal color (never neutralized).

## Risk note

`fsa-theme.css` neutralization changes surface color on **every page that links it**, not just redesigned modules — because those are global custom properties, not scoped. Expected effect: green-tinted surfaces become graphite everywhere. This is desired (kills green-wash) but **must be regression-checked** on homepage + one calculator + one institutional page + one non-redesigned module in served mode before commit. If any page depended on the green tint for meaning, flag it — none is expected to.

---

*Read-only audit. Confirms the Layer-1 target is exactly the 3 shared token/theme files; all module- and page-level neutrals are deferred.*
