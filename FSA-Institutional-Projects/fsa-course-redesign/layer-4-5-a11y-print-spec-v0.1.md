# FSA Layer-4 (Accessibility) + Layer-5 (Print) Spec (v0.1)

Plan/execution spec only. **No code changes, no commit.** Runs after Layers 1–3 are complete and verified. Branch (later): **feat/fsa-layer-4-5-a11y-print**.

Authority: **Token Sheet** = paper `--p-*` is the canonical print surface, graphite is web only. **Module 2 pilot** = proof of the a11y + print patterns. **Shared CSS** = `css/fsa-course-a11y.css` (or an a11y section of `fsa-course.css`) and `css/fsa-course-print.css`.

---

# Layer 4 — Accessibility

Move the pilot's accessibility patterns into shared, scoped course CSS so every redesigned module inherits them.

## What moves (scoped under `.fsa-course` where it's course-specific; global a11y stays in `fsa-theme.css`)

1. **`:focus-visible`** — visible emerald focus ring on interactive elements; ≥3px outline + offset. (Global `*:focus-visible` already exists in `fsa-theme.css`; the course adds any component-specific focus treatment, not a duplicate global rule.)
2. **`prefers-reduced-motion`** — respect reduced motion for course animations/transitions. (A global reduced-motion block already exists in `fsa-theme.css`; the course rule covers course-component motion only.)
3. **aria-live result pattern** — `#calculator-results` carries `aria-live="polite" role="status"` so calculator updates are announced. This is **markup + a small styling hook**, shared as the standard for every module calculator.
4. **Tap targets** — ≥44px for buttons/links/controls (global rule exists; course confirms components comply).
5. **Labels** — interactive tools have clear labels/`aria-label`; documented as a per-module authoring requirement.

## Notes
- Prefer **not** duplicating the global `fsa-theme.css` a11y rules; the course layer only adds what is course-component-specific, to avoid conflicting `!important`s.
- Any a11y `!important` (e.g. reduced-motion) is acceptable — it's the standard defensive pattern — and is the only place `!important` is expected in the course layers.

## Layer-4 regression
- [ ] Keyboard tab through Module 2: visible emerald focus on every control.
- [ ] `prefers-reduced-motion: reduce`: course animations suppressed.
- [ ] Calculator update announced (aria-live polite / role=status present and firing).
- [ ] All controls ≥44px at 375px.

---

# Layer 5 — Print (worksheet-only)

Make printing a module output a clean **paper worksheet**, not the web page. Uses the paper `--p-*` scale (print only; never on the web skin).

## What moves — `css/fsa-course-print.css`, `@media print`

1. **Hide site chrome:** nav, header, footer, buttons, live banners, plan widget, reflection widgets, and all non-worksheet content → `display:none` / visibility-hidden.
2. **Show only the worksheet:** `.fsa-worksheet__print` (or the worksheet block) is the only visible region; positioned to the page top.
3. **Paper surfaces:** background `--p-bg #FDFCF9`, ink `--p-ink #1A1C1F`, borders `--p-border` — black-and-white readable; no graphite web surfaces in print.
4. **Writing lines / fields:** worksheet fields render as printable lines/boxes for hand completion.
5. **No fade / no signal color text in print:** the emerald fade selected-signal-text role is **web only** — print is solid ink on paper (reaffirms the Layer-2 rule).

## Why visibility-based print-only
The pilot originally printed the nav; fix was a **visibility-based print-only-worksheet** approach (hide everything, reveal the worksheet subtree) rather than trying to `display:none` each chrome element individually — more robust to new page elements.

## Layer-5 regression
- [ ] Print preview of Module 2: **only** the Starter Cushion Tracker worksheet prints — no nav, buttons, banners, widgets.
- [ ] Paper surfaces (warm white bg, dark ink), black-and-white readable.
- [ ] Writing lines present and usable by hand.
- [ ] **No emerald fade text** in print; all worksheet text is solid ink.
- [ ] Non-redesigned pages' print behavior unchanged (course print CSS only loads on wrapped modules).

## Rollback (both layers)
Remove `fsa-course-a11y.css` / `fsa-course-print.css` from the module load list and restore Module 2's inline a11y/print blocks. No global CSS edited. `fsa-theme.css` global a11y/print rules are untouched throughout.

---

*Plan only. Layer 4 = shared scoped a11y (focus, reduced-motion, aria-live results, tap targets); Layer 5 = worksheet-only paper print using `--p-*`. Both gated behind Layers 1–3.*
