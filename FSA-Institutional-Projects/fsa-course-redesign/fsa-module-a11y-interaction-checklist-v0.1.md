# FSA Module Accessibility & Interaction Checklist (v0.1)

Phase 0 planning artifact. Target: WCAG 2.1 AA. Applies to every redesigned module and worksheet. Derived from the audit, which found only the capstone has `prefers-reduced-motion`, 8 of 10 have no `:focus` styling, and ARIA is sparse on interactive components. These become template defaults.

## Keyboard focus

- [ ] Every interactive element (inputs, buttons, quiz options, toggles, scenario choices, lab cards, download button) is reachable and operable by keyboard alone (Tab / Shift+Tab / Enter / Space).
- [ ] Visible focus indicator on all focusable elements via `:focus-visible` (currently absent in 8 of 10 modules). Do not rely on color alone; use an outline.
- [ ] Logical tab order matches visual order; no keyboard traps.
- [ ] Lab cards and scenario choices implemented as real buttons/links (or given `role="button"` + `tabindex="0"` + key handlers) so they are not mouse-only.

## Reduced motion

- [ ] A global `@media (prefers-reduced-motion: reduce)` block neutralizes the JS-driven reveal/animation transitions used by calculators, scenarios, and completion banners (currently present only in the capstone).
- [ ] No essential information conveyed by motion alone.

## ARIA requirements by component

- **Calculators:** inputs have associated `<label>` (or `aria-label`); results announced via an `aria-live="polite"` region so screen readers hear the updated number; the calculate button has a descriptive name.
- **Quizzes:** each question is a group (`role="group"` + `aria-labelledby`); options are real radio/button controls; correct/incorrect feedback is in an `aria-live` region and not color-only (add text/icon).
- **Toggles (mindset traps, bank items, "go deeper"):** use `aria-expanded` and `aria-controls`; state change announced; toggle is a `<button>`.
- **Scenarios (branching):** choice controls are buttons; the revealed outcome is in an `aria-live="polite"` region; a way to reset is keyboard-operable and labeled.
- **Lab cards:** each is a labeled link/button with an accessible name describing the lab; the active card is indicated by more than color (text or `aria-current`).
- **Completion banner:** announced via `aria-live`; not purely visual confetti.

## Mobile / tap-target checks

- [ ] `viewport` meta present (already true across all modules).
- [ ] Interactive targets at least 44 by 44 CSS px with adequate spacing (verify against the shared CSS at proof; not verifiable from markup alone).
- [ ] No horizontal scroll at 320 to 375 px; calculators and tables reflow or scroll within a contained region, not the page.
- [ ] Font size at least 16px for body to avoid mobile zoom; inputs use `font-size: 16px+` to prevent iOS auto-zoom.
- [ ] Tables (fee comparisons, tax brackets, debt inputs) are responsive or wrapped in an overflow container.

## Print-readability checks (for the on-page worksheet section)

- [ ] The worksheet print section prints cleanly in black and white (no reliance on background color for meaning).
- [ ] Interactive-only chrome (nav, calculators, quiz, completion, animations) is hidden in `@media print`; only the worksheet and essential context print.
- [ ] Fillable fields render as visible lines/boxes on paper.
- [ ] Links show meaningful text (avoid bare URLs) in print.
- [ ] Adequate contrast and font size for photocopy legibility.

## No-JS fallback expectations (where reasonable)

- [ ] Core teaching content, the scenario text, the worksheet section, and the download link work with JavaScript disabled (content is server-rendered HTML, not JS-injected).
- [ ] Calculators and branching interactions may require JS; when JS is off, show the static explanation and the worksheet so the learner still gets the lesson and the takeaway.
- [ ] The download button is a plain anchor to the PDF (works without JS).
- [ ] Do not hide essential content behind a toggle that only opens via JS without a no-JS fallback (use `<details>`/`<summary>` where possible, which works without JS).

## Completion / quiz state concerns

- [ ] Completion state (`completeModule()`) and any saved progress do not rely on browser storage in a way that breaks the page if storage is unavailable; degrade gracefully (the audit notes FSA uses `fsa_lab_completions` localStorage; confirm no hard dependency).
- [ ] Quiz feedback does not trap focus and is announced to assistive tech.
- [ ] Re-taking a quiz or resetting a scenario is possible and keyboard-operable.
- [ ] Completion is not required to access the worksheet or the bridge (no dark-pattern gating).
- [ ] Progress/completion never blocks content behind a login or email.

## Verification method (per module at proof)

- Keyboard-only pass through the whole module.
- Screen-reader smoke test on the calculator, one quiz question, one scenario.
- Reduced-motion emulation on.
- 320px and 375px viewport check.
- Print preview of the worksheet section.
- JS-disabled load: confirm lesson + worksheet + download still present.

## Guardrails

Checklist only. No modules, CSS, or JS edited in Phase 0. These requirements are applied per module during its redesign, on a branch, verified in served mode.
