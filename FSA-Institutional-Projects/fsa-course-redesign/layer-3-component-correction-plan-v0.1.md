# FSA Layer-3 Global Component-Correction Plan (v0.1)

Plan/execution spec only. **No code changes, no commit.** Runs after Layer 1 (tokens) and Layer 2 (typography) are complete and verified. Branch (later): **feat/fsa-layer-3-components**.

Scope: move the Module 2 pilot's **component** styles (gate, traps callout, worksheet block, neutral cards, outline/ghost buttons, calculator result panel) into shared `css/fsa-course.css`, scoped under `.fsa-course`, and retire the pilot's `!important` overrides.

Authority: **Token Sheet + Hub** = component visual language (neutral surfaces, small radii, emerald as signal/outline, no fills/gradients/pills). **Module 2 pilot** = proof of the components. **Shared CSS** = destination.

**Especially careful with:** `.btn`, `.btn-primary`, `.btn-secondary`, `.highlight*`, `.fsa-plan-widget`, `.fsa-plan-save-btn`, `.fsa-ws-btn`, and **JS-injected styles**.

---

## Guiding rule: specificity, not `!important`

All Layer-3 rules are scoped under `.fsa-course` and loaded **after** the legacy globals + JS-injected styles. `.fsa-course .btn` (0,1,1) beats bare global `.btn` (0,1,0) and JS-injected `.btn` rules **regardless of injection order**, because specificity wins before source order. This is how every pilot `!important` is retired.

## Component set to extract

### 1. Buttons (highest care)
Unify `.btn`, `.btn-primary`, `.btn-secondary`, `.fsa-ws-btn`, `.fsa-plan-save-btn` to the **outline/ghost** standard:
- transparent/neutral background, **emerald border + emerald text**, subtle emerald hover tint
- Inter/sans, ~0.95rem, weight 600
- **2px radius** (no pills)
- no fills, no gradients (never copy cities.html gradient-border buttons)
- visible `:focus-visible`, ≥44px tap target

Scoped: `.fsa-course .btn { … }` etc. **Watch:** `interactive-components.css .btn` sets no `font-family` and some feature stylesheets (e.g. `safety-assessment.css`) define global `.btn`/`.btn-primary`; grep before finalizing, and rely on `.fsa-course` scope so global button styling elsewhere is untouched.

### 2. Cards / surfaces
Neutralize and standardize `.content-block`, `.build-item`, `.highlight-tip`, `.fsa-live-banner`, `.fsa-plan-widget`:
- graphite surface/elevated, quiet borders, **8px** card radius, **4px** callout radius
- no colored/green/gradient card fills; emerald only as thin accent/border/marker
**Watch `.highlight*`:** the pilot recolored a blue reflection card to emerald/neutral — preserve that; ensure no `.highlight-*` variant reintroduces blue/green-wash.

### 3. Gate
`.fsa-gate`, `.fsa-gate__title`, `.fsa-gate__outcome` — neutral surface, quiet emerald accent, sans heading.

### 4. Traps / pressure callout
`.fsa-traps`, `.fsa-traps__title` — neutral callout, emerald signal, 4px radius, no emoji-led headings.

### 5. Worksheet block (visual only)
`.fsa-worksheet`, `.fsa-worksheet__actions`, `.fsa-worksheet__note` — neutral block, outline download button; download button text and the "planning worksheet, not financial advice" note stay content. (Print behavior is Layer 5.)

### 6. `.fsa-plan-widget` / `.fsa-plan-save-btn` (JS-injected care)
This widget mounts/injects styles at runtime. **Do not** fight it with `!important`; instead scope `.fsa-course .fsa-plan-widget`/`.fsa-course .fsa-plan-save-btn` and load after injection. Verify the "Save My Decisions" button matches the outline standard and the widget surface is neutral. Confirm no injected rule out-specifies the scoped rule (if one uses an ID or inline style, document and handle narrowly).

### 7. Calculator result panel (visual)
`#calculator-results` panel surface + `.result-label`/`.result-value` mono. (aria-live is Layer 4.) Note `#calculator-results` is an **ID** (0,1,0 for the id selector on the element) — scoped `.fsa-course #calculator-results` (1,1,0) is safe; avoid relying on it to beat inline styles.

## What moves vs stays

**Moves to `fsa-course.css`:** all component visual rules above (re-scoped, `!important` dropped).
**Stays in Module 2:** all content, emergency-specific worksheet, calculator language, quiz/scenario. **Disappears:** any pilot override that existed only to defeat a legacy rule (once specificity handles it).

## Parity proof (the Layer-3 gate)

After extraction, remove Module 2's inline **component** styles and confirm the page is **value-identical** driven by shared CSS: buttons outline/2px/emerald, cards neutral, gate/traps/worksheet/plan-widget correct, no `!important` remaining for these components, no blue/green-wash. This — combined with the Layer-2 typography parity — is the **value-identical proof** required before Module 1.

## Regression checklist (served, desktop + 375px)

- [ ] Module 2: buttons unified (outline, 2px, Inter, emerald), incl. "Save My Decisions", "Steps to Build" actions, worksheet download.
- [ ] Module 2: cards/gate/traps/plan-widget neutral; no blue reflection card; no green-wash.
- [ ] Module 2: `!important` count for these components = 0.
- [ ] Homepage, one calculator, one institutional page, one non-redesigned module: **buttons/cards unchanged** (no `.fsa-course` wrapper → not affected).
- [ ] JS-injected plan widget: scoped rule wins without `!important`.
- [ ] `git diff --stat`: only `css/fsa-course.css` + `modules/emergency-funds-saving.html`.

## Rollback

Remove the component block from `fsa-course.css` (or its load link) and restore Module 2's inline component styles. No legacy global CSS edited.

## Deferred: Layer 3b (global component correction)

Correcting the **global** `.btn`/card defaults site-wide (so non-wrapped pages also improve) is a separate, gated step (**Layer 3b**), **not** part of this plan. It is higher-risk (touches every page) and only considered after several modules are redesigned and the scoped standard is proven stable.

---

*Plan only. Layer 3 = scoped component extraction + parity proof; global `.btn`/card defaults are deferred to gated Layer 3b.*
