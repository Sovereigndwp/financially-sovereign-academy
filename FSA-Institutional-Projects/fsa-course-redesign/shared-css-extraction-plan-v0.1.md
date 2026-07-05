# FSA Shared-CSS Extraction Plan (v0.1)

Plan only. **No code changes, no refactor, no commit.** This plan describes how the reusable styles proven in the Module 2 pilot should move into shared course CSS **before** Module 1 is redesigned.

Authority: **Token Sheet + Hub** = tokens and type roles. **Module 2 pilot** = the proof of which patterns are reusable. **Shared CSS** = the destination.

---

## 1. Goal

Turn the Module 2 pilot's local, one-file styles into a small, layered set of shared stylesheets, so every redesigned module inherits the same structure, typography, components, accessibility, and print behavior — without each module carrying its own `!important` overrides.

Success = Module 2 can drop its inline `<style id="fsa-hybrid-pilot-2">` block and look **value-identical** when driven only by the shared files. That parity proof is the gate before Module 1.

## 2. Proposed shared files (five layers)

| File | Layer | Contains |
|---|---|---|
| `css/fsa-course-tokens.css` | Tokens | course-scoped color/type/spacing/radius/focus/print variables (mostly aliases to `tsa-shared-tokens.css` graphite/paper + emerald signal) |
| `css/fsa-course.css` | Base + components | scoped-under-`.fsa-course` typography, gate, traps callout, worksheet block, neutral cards, outline/ghost buttons, calculator result panel |
| `css/fsa-course-a11y.css` | Accessibility | `:focus-visible`, `prefers-reduced-motion`, aria-live result styling, tap-target minimums (may fold into `fsa-course.css` if small) |
| `css/fsa-course-print.css` | Print | worksheet-only print behavior, hide nav/buttons/chrome, black-and-white paper surfaces, writing lines |

Note: tokens and a11y may be merged into `fsa-course.css` if they stay small; kept separate here for clarity of ownership. The **layer boundaries** (token vs typography vs component vs a11y vs print) matter more than the file count.

## 3. Load order (per redesigned module)

```
fsa-course-tokens.css
→ fsa-brand.css
→ fsa-theme.css
→ interactive-components.css
→ fsa-course.css        (scoped under .fsa-course, wins without !important)
→ fsa-course-print.css
→ lab-guide.css
```

`fsa-course.css` loads **after** the legacy globals so its `.fsa-course`-scoped rules (specificity 0,1,1+) beat bare global rules (0,1,0) and JS-injected `.btn` rules — this is how the pilot's `!important`s get retired.

## 4. What moves out of the pilot (into shared)

From `modules/emergency-funds-saving.html` inline `<style>` into shared CSS, re-scoped under `.fsa-course`:

- **Typography** (Layer 2): body → `--font-sans`; `h1,h2` → `--font-serif`; card-heading rule → sans + neutral ink; `.result-label`/`.result-value` → `--font-mono`; button font role. *(Detailed in the Layer-2 spec.)*
- **Gate**: `.fsa-gate`, `.fsa-gate__title`, `.fsa-gate__outcome`.
- **Traps callout**: `.fsa-traps`, `.fsa-traps__title`.
- **Worksheet block**: `.fsa-worksheet`, `.fsa-worksheet__actions`, `.fsa-worksheet__note`, `.fsa-worksheet__print`.
- **Buttons** (Layer 3): unified `.btn`/`.fsa-ws-btn`/`.fsa-plan-save-btn` outline/ghost treatment (transparent bg, emerald border/text, subtle hover tint, 2px radius).
- **Card surfaces** (Layer 3): neutral surface/elevated, quiet borders, small radii; neutralized `.highlight-tip`, `.fsa-live-banner`, `.build-item`, `.fsa-plan-widget`.
- **Calculator result** (Layer 4): `#calculator-results` aria-live/role=status pattern + result panel styling.
- **A11y** (Layer 4): `:focus-visible`, `prefers-reduced-motion`.
- **Print** (Layer 5): worksheet-only `@media print` block.

## 5. What stays in the module (does NOT move)

- Module 2 **content**: copy, gate outcomes, traps text, quiz, scenario, "My Plan" wording.
- Emergency-specific worksheet content ("Starter Cushion Tracker").
- Emergency-specific calculator language.
- Any temporary patch that exists only to override a legacy Module 2 widget — these should **disappear**, not migrate.

## 6. Sequencing (which layer extracts first)

Extraction follows the layer order so each step is independently verifiable:

1. **Layer 1 — tokens.** Graphite/paper alias in `tsa-shared-tokens.css`; neutralize `fsa-brand.css` + `fsa-theme.css` green surfaces. *(Done, uncommitted.)*
2. **Layer 2 — typography.** Create `fsa-course.css` typography section; wrap Module 2 `<main class="fsa-course">`; remove inline typography; prove parity.
3. **Layer 3 — components.** Move gate/traps/worksheet/cards/buttons into `fsa-course.css`; remove inline component styles; prove parity.
4. **Layer 4 — a11y.** Focus/reduced-motion/aria-live result pattern shared.
5. **Layer 5 — print.** Worksheet-only print shared.
6. **Parity gate.** Module 2 renders value-identical from shared CSS with inline block removed.
7. **Then Module 1.**

## 7. Risk controls

- **Scope everything under `.fsa-course`.** No global `body`/`.btn`/`h1` edits. Non-redesigned pages (homepage, calculators, institutional, other 9 modules) must render unchanged because they carry no wrapper.
- **One layer per branch**, own regression + rollback.
- **Served-mode verification only** (absolute `/css/` paths break under `file://`).
- **Value-identical proof required** before Module 1: diff the computed styles / visual before-after of Module 2 with vs without the inline block.
- **`!important` budget = 0** in shared CSS except where a legacy JS-injected rule genuinely cannot be beaten by specificity (documented case-by-case, ideally none once scoped + load-ordered).

## 8. Rollback

Each extraction layer is additive: remove the shared file from the module's load list and restore the module's inline block for that layer. No legacy global CSS is edited, so rollback never touches other pages.

---

*Plan only. Nothing implemented by this document. The extraction is executed layer-by-layer per the EXECUTION-RUNBOOK, gated on the Module 2 value-identical parity proof before Module 1.*
