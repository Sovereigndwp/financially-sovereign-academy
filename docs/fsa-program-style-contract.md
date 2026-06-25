# FSA Program Style Contract

**Authoritative rules for building any new Financially Sovereign Academy (FSA) program or brand-sensitive page.** If a build conflicts with this contract, this contract wins.

## Canonical source of truth

- The FSA brand system is **`css/fsa-brand.css`**.
- The living visual reference is **`styleguide.html`** (open it before building; it demonstrates every component).
- Start every new program page from **`templates/fsa-program-page.html`**.

FSA is a **neutral-dark** surface system with **emerald/mint used only as accents** — it is NOT a broad green theme.

## Hard rules

1. **Link `/css/fsa-brand.css`** (absolute path, so it works at any folder depth).
2. **Do not link `css/fsa-theme.css`.** It is the legacy/deprecated green theme.
3. **Do not define a page-local `:root` brand system** (or redefine `--fsa-*` / `--color-*`) unless explicitly approved by the maintainer.
4. **Page background → `var(--color-bg)`.**
5. **Cards / panels → `var(--color-surface)` or `var(--color-elevated)`.**
6. **Borders → `var(--color-border)`**, unless a restrained emerald accent border is intentional.
7. **Emerald / mint** (`var(--color-brand)`, `var(--color-mint)`, `var(--brand-gradient)`) are for **accents only**: badges, focus rings, small highlights, one heading fade word, and semantic positive states.
8. **Primary buttons → the FSA gradient-outline treatment** (`.fsa-btn--primary`). Never hue-fill a button.
9. **Broad green backgrounds are forbidden** (see Forbidden patterns).
10. **Semantic colors may remain semantic**: `var(--color-success)`, `var(--color-warning)`, `var(--color-error)`, positive/negative numeric outputs, and meaningful chart colors.
11. **Do not copy styles from the old correctional Program 1 landing pages** (`institutional/correctional/banking-credit/`). They use the legacy green theme and a page-local `:root` — they are not a style source.
12. **Build from components, not raw CSS.** Use the `.fsa-*` classes below before writing custom rules.

## Allowed tokens

| Purpose | Token |
|---|---|
| Page background | `var(--color-bg)` |
| Section/panel surface | `var(--color-surface)` |
| Card surface | `var(--color-elevated)` |
| Dramatic / CTA band | `var(--color-deepest)` |
| Borders | `var(--color-border)` (`--color-border-strong` for emphasis) |
| Body / heading text | `var(--color-text)` / `var(--color-text-strong)` |
| Muted text | `var(--color-muted)` |
| Accent (emerald) | `var(--color-brand)` |
| Bright accent (mint) | `var(--color-mint)` |
| Signature fade | `var(--brand-gradient)` |
| Semantic | `var(--color-success)` / `var(--color-warning)` / `var(--color-error)` |
| Type | `var(--font-serif)` (h1/h2), `var(--font-sans)` (UI/h3), `var(--font-body)` (body), `var(--font-mono)` (data) |
| Spacing / radius | `--space-*`, `--radius-*` |

## Preferred components (from `fsa-brand.css`)

`.fsa-wrap`, `.fsa-section` (`--alt` / `--deep` / `--glow`), `.fsa-h1` / `.fsa-h2` / `.fsa-h3`, `.fsa-lede`, `.fsa-eyebrow`, `.fsa-section-tag`, `.fsa-card` (`--hover` / `--gradient`), `.fsa-panel`, `.fsa-badge`, `.fsa-btn--primary` / `.fsa-btn--secondary`, `.fsa-chip`, `.fsa-list`, `.fsa-skip-link`, `.fsa-legal-footer`. For one heading accent word, wrap it in `<em>` inside a `.fsa-h1`/`.fsa-h2` (the gradient + solid fallback are built in).

## Forbidden patterns

- Linking `fsa-theme.css`.
- Dark-green surfaces: `#0a1f1a`, `#0f2922`, `#1a3a2e`, `#234a3c`.
- Green-tinted broad backgrounds: any `background` using `rgba(16,185,129, …)`.
- Green gradients built from the old dark-green values.
- Defining `--fsa-green:` or greening `--fsa-bg-*`.
- Page-local `:root { … }` brand blocks in a program page (review-gated).
- Hue-filled primary buttons (`background: var(--fsa-green)` / `#10b981`).

## Approved-exception process

A page-local `:root`, a hue-filled button, or any other deviation requires explicit maintainer sign-off, recorded in the PR description. Default answer is no.

## Before you finish

Run the audit and resolve every hit:

```
scripts/fsa-style-check.sh <path-to-your-new-page-or-folder>
```

> **Scope:** this gate is for **new** pages built clean from `fsa-brand.css`. Bridge-migrated legacy pages (e.g. some calculators and `my-journey.html`) intentionally keep `fsa-theme.css` plus token fallbacks like `var(--fsa-bg-dark, #0a1f1a)`; they will report hits and are out of scope for this gate.

Then eyeball the page against `styleguide.html` on desktop and mobile, and complete the PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`).
