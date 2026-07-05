# FSA Layer-2 Base Typography Spec (v0.1)

Plan/execution spec only. **No code changes, no refactor, no commit.** Run after Layer 1 (graphite tokens) is complete and verified.

Authority split: **Token Sheet + Hub** = type roles (Playfair serif for major headings, Inter sans for body/cards/buttons/UI, JetBrains mono for labels/data/results, **and the emerald fade for selected signal text**). **Module 2 pilot** = proof of the typography correction. **Shared CSS** = where the reusable course typography lives.

Scope of Layer 2: **font families, weights, role assignment, and the selected-signal-text (emerald fade) role** — plus the card-heading consistency and label/result mono role. Font *sizes* keep the existing scale for now (see "what not to touch"). Component visuals (outline buttons, card surfaces) are Layer 3.

---

## Recommended approach: scope to a `.fsa-course` wrapper (not global)

Add `class="fsa-course"` to each **redesigned** module's `<main>` (one small markup line per module; Module 2 gets it during its Layer-1/2 re-point). All Layer-2 typography rules are scoped under `.fsa-course`.

**Why scoped is safer than global (risk note):**
- **Contained blast radius.** Global `body { font-family }` would change type on every page linking these stylesheets at once (calculators, institutional, homepage). Scoped changes only redesigned modules.
- **Avoids fighting `fsa-theme.css`.** `fsa-theme.css` sets a global `body { font-family: var(--font-family-base) }` (system stack). A `.fsa-course` wrapper overrides inheritance for its subtree cleanly, with no `!important`.
- **Incremental + reversible.** Modules opt in one at a time; rolls back by removing the class.
- **Enables retiring `!important`.** `.fsa-course .btn` (0,1,1) beats global `.btn` (0,1,0); scoped rules win without `!important`.

Trade-off: each redesigned module needs the `class="fsa-course"` line — the intended, controlled cost.

## Exact files likely touched
1. **NEW `css/fsa-course.css`** (typography section, scoped under `.fsa-course`).
2. **Per redesigned module HTML** — add `class="fsa-course"` to `<main>`. In Layer 2, only **Module 2** is wrapped and has its inline typography rules removed (parity proof).
3. **Not touched:** `css/fsa-theme.css`, `css/fsa-brand.css`, `css/interactive-components.css` (wrapper scoping makes edits unnecessary).

**Proposed shared file location:** `css/fsa-course.css`.
**Load order (per module):** `fsa-course-tokens.css` → `fsa-brand.css` → `fsa-theme.css` → `interactive-components.css` → **`fsa-course.css`** → `fsa-course-print.css` → `lab-guide.css`.

## Which typography rules move out of Module 2 (into shared, re-scoped)
From `modules/emergency-funds-saving.html` (inline) into `css/fsa-course.css` under `.fsa-course`:
- `body { font-family: var(--font-sans) }` → `.fsa-course { font-family: var(--font-sans) }`
- `h1, h2 { font-family: var(--font-serif) }` → `.fsa-course h1, .fsa-course h2 { font-family: var(--font-serif) }`
- the card-heading rule (`.content-block h3, .build-header h3, .quiz-question, .fsa-gate__title, .fsa-traps__title, .fsa-worksheet__title, .fsa-plan-summary__header h3` → sans, `--font-size-xl`, 600, neutral ink) → same selectors prefixed with `.fsa-course`, **without `!important`**
- `.result-label`/result number → `.fsa-course .result-label, .fsa-course .result-value { font-family: var(--font-mono) }` (switch result number Courier → JetBrains `--font-mono`)
- button font role (`.btn, .fsa-ws-btn, .fsa-plan-save-btn` → `--font-sans`, weight/letter-spacing) → `.fsa-course`-scoped (the outline visual stays Layer 3)
- **NEW — selected-signal-text role:** the emerald-fade helper (see below). Module 2 does **not** use it today (flat emerald); it is **adopted** from the established institutional pattern.

## Type-role assignment (Token Sheet)

| Element | Font / treatment | Notes |
|---|---|---|
| Major headings — `h1`, `h2` (module title, section titles) | **Playfair / `--font-serif`** | the only serif; editorial framing |
| `h3` and card headings | **Inter / `--font-sans`** | not serif; consistent size + weight + neutral ink |
| Body copy, cards, UI | **Inter / `--font-sans`** | |
| Buttons | **Inter / `--font-sans`** | family role here; outline visual in Layer 3 |
| Labels, data, calculation results, small system text | **JetBrains Mono / `--font-mono`** | e.g. `.result-label`, `.result-value`, eyebrows |
| **Selected signal text** (a short emphasized phrase inside a major heading) | **Emerald fade** (`--brand-gradient → --fsa-fade`), clipped to text, with solid-emerald fallback | see the dedicated role below |

- **Stays serif:** `h1`, `h2` only.
- **Becomes sans:** everything h3-and-below, body, cards, buttons, UI.
- **Stays/becomes mono:** labels, data, results, small system-like elements.
- **Uses the fade:** only a **selected** short phrase inside a major heading.

## Selected-signal-text role — emerald fade (NEW; the fourth type role)

**Decision:** selected signal text inside major headings may use the existing FSA emerald fade:
`linear-gradient(135deg, #0F766E 0%, #10B981 50%, #5EEAD4 100%)`,
mapped to the existing token path **`--brand-gradient → --fsa-fade`** (already vendored in `css/tsa-shared-tokens.css`; Layer 1 did not change it). This matches the established `institutional/cities.html` hero-title pattern (`.hero h1 span { background: var(--grad); background-clip: text; ... }`, where `--grad → --brand-gradient`), which is also used across the homepage, all institutional pages, all calculators, and `assessment.html`.

**The standard is:**
- a **neutral ink** heading,
- with **one selected phrase** rendered in the emerald fade,
- and a **solid emerald fallback** if gradient text-clipping is unsupported (improves on cities.html, which has no fallback and would render invisible text where `background-clip:text` is unsupported).

**Proposed shared helper (illustrative; scoped, not yet implemented):**
```css
.fsa-course .fsa-signal {
  background: var(--brand-gradient);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--fsa-solid, #34D399);   /* solid-emerald fallback */
}
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .fsa-course .fsa-signal { color: var(--fsa-solid, #34D399); }
}
```
Usage: wrap a short emphasized phrase in a major heading, e.g. `<h1>… <span class="fsa-signal">a short phrase</span></h1>`.

**Do / do not:**
- ✅ Allowed for **selected signal/accent text** (a short heading phrase) and thin identity accents (borders/bars).
- ❌ **Never** apply the fade to **full headings**, **buttons**, **card surfaces**, **large backgrounds**, or **worksheet/print text**.
- ❌ **Do not** copy the gradient-border **button** pattern from `cities.html` (buttons remain solid-emerald outline per Layer 3; the fade is text-signal only).
- Compatible with the "neutralize headings to ink" decision: this is a **neutral ink heading + one fade phrase**, exactly the Token Sheet "neutral heading + fade em" model — it does not re-green headings.

## Old behavior → new behavior

| Element | Old (today) | New (Layer 2, scoped) |
|---|---|---|
| Body font | system stack on 9 modules; Inter on Module 2 (inline) | **Inter** course-wide (wrapped modules) |
| `h1/h2` | mixed | **Playfair serif** |
| `h3` / card headings | inherit body; inconsistent sizes | **Inter sans**, one size, 600, neutral ink |
| Buttons | inherit body font | **Inter sans** |
| Result number | theme Courier | **JetBrains mono** |
| Selected heading phrase | flat emerald (Module 2) / already-fade (institutional pages) | **emerald fade with solid fallback**, on a short phrase only |
| Non-redesigned pages | unchanged | **unchanged** (no wrapper) |

## Current font conflicts across the four sources
- **`fsa-theme.css` sets `body { font-family: var(--font-family-base) }` (system stack)** — the global body font; resolved by the `.fsa-course` wrapper (no edit to fsa-theme).
- **Two size scales:** `fsa-theme --font-size-*` vs `fsa-brand --fs-*`. Layer 2 keeps `--font-size-*` for sizes, standardizes families to `fsa-brand`/Token Sheet fonts. Size-scale unification deferred.
- **`interactive-components.css .btn` sets no `font-family`** → inherits body; `.fsa-course .btn` fixes to Inter.
- **`fsa-brand.css` `--font-body` (Crimson serif)** — unused once body is Inter; leave defined, don't apply to screen.
- **Module-local `!important`s** move to scoped shared CSS and drop the `!important`.

## Which `!important`s can be retired
Retired by `.fsa-course` scoping: the card-heading rule and the button-typography rule. Never used `!important`: body/h1,h2. Reduced-motion/print `!important`s are Layers 4/5.

## What NOT to touch yet
- **Font-size scale unification** (`--font-size-*` vs `--fs-*`) — deferred.
- **`fsa-theme.css` global `body` font** — left as-is (wrapper avoids editing it).
- **Calculators, institutional pages, homepage typography** — not wrapped in Layer 2.
- **Component visuals** — Layer 3.
- **`--font-body` (Crimson)** — leave defined; not applied to screen.
- **The emerald fade** — text-signal only; never on buttons/cards/backgrounds/worksheet-print; never on full headings; do not adopt cities.html's gradient-border buttons.
- **Do not apply Layer-2 rules globally** — scope everything under `.fsa-course`.

## Regression checklist (after Layer 2, before merge)
Served-mode, desktop + **375px**, before/after:
- [ ] **Homepage** — unchanged (no wrapper).
- [ ] **One regular module** (`banking-basics.html`) — unchanged (not wrapped).
- [ ] **Module 2** — visually identical, now driven by shared `fsa-course.css` with inline typography `!important`s removed (parity proof), **plus** the selected hero/section phrase now rendered in emerald fade with a solid fallback.
- [ ] **One calculator** / **one institutional** / **one viz-kit** page — unchanged (not wrapped).
- [ ] **Mobile 375px** on Module 2 — serif/sans/mono correct; fade phrase legible; no reflow.
- [ ] **Print preview of Module 2 worksheet** — unaffected; **fade text must NOT appear in the worksheet/print layer** (print is paper + solid ink).
- [ ] **Fade fallback** — with `background-clip:text` unsupported, the phrase shows solid emerald, never invisible.
- [ ] Module 2 checks: major headings Playfair serif; card headings Inter sans neutral ink; body Inter; buttons Inter; result number JetBrains mono; the one selected phrase in emerald fade; no serif leaking into body/cards/buttons; no fade on buttons/cards/surfaces.

Pass criteria: Module 2 identical (with the new fade phrase) and `!important`-free typography; every non-wrapped page unchanged; type roles correct; fade only on the selected phrase.

## Rollback path
Layer 2 is additive + scoped:
- Remove `css/fsa-course.css` (or its typography block) from the load list; remove `class="fsa-course"` from Module 2's `<main>`; restore Module 2's inline typography rules.
- Mechanically: revert `modules/emergency-funds-saving.html` and delete/unlink `css/fsa-course.css`. No global CSS changed. Branch: `feat/fsa-layer-2-typography`.

---

*Execution spec only. Nothing implemented. Layer 2 = shared scoped typography (incl. the emerald-fade selected-signal-text role) + wrap Module 2 + prove parity, with all other pages unchanged until they are redesigned.*
