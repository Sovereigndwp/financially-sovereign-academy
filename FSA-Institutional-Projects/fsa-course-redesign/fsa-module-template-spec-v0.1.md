# FSA Module Template Spec (v0.1)

Phase 0 planning artifact. No module files, CSS, PDFs, or navigation edited. Defines the repeatable hybrid online + downloadable structure for the free FSA 10-module course, preserving the existing skeleton and educational intent. Sibling: `fsa-10-module-redesign-audit-v0.1.md`.

## Design principle

Keep what works. All 10 modules already share one skeleton (hero, teaching sections, calculator, branching scenario, six lab cards, 3-question quiz, completion, bridge). This spec preserves that and adds three missing pieces (an "is this for you" gate, a standardized traps callout, and a downloadable worksheet) plus accessibility defaults, without touching calculators or visual tokens.

## Standard module order

1. **Hero** — "Module N: Title" + one-line objective (as today).
2. **Is-this-for-you gate** (NEW) — who this helps and what the learner will leave able to do.
3. **Teaching sections** — 3 to 5 max; overflow detail goes in an optional "go deeper" toggle rather than a longer page.
4. **Interactive tool** — the module's calculator/simulator (unchanged; online-only).
5. **Real-life scenario** — a branching worked story (REQUIRED in every module).
6. **Watch out for** — a standardized scams / fees / traps callout.
7. **Check your understanding** — the 3-question quiz (unchanged).
8. **Worksheet / download** (NEW) — the paper takeaway for this module.
9. **Completion + bridge** — completion banner and "Continue to Module N+1" (Module 10 bridges to BSA).

## Required blocks (every module must have)

Hero, gate, at least 3 teaching sections, one interactive tool (except Module 9 whose Scam Detector is its tool), one branching scenario, the traps callout, the 3-question quiz, one downloadable worksheet, completion, and the next-module bridge. Accessibility defaults (see the a11y checklist) are required, not optional.

## Optional blocks

"Go deeper" toggles for advanced detail; extra lab cards beyond the standard six only where genuinely warranted (Module 7 should be normalized toward the standard); module-specific extras that already exist and work (Module 10's readiness checklist, priority matrix, and sovereignty ladder) stay.

## Naming conventions

- **Module files:** unchanged (`modules/<slug>.html`); do not rename in this redesign.
- **Section anchors/ids:** `mod-<slug>__<block>` (e.g. `mod-emergency-funds__gate`, `__scenario`, `__worksheet`) for stable in-page links and analytics.
- **New shared partials/classes:** prefix `fsa-` to match existing conventions (e.g. `.fsa-gate`, `.fsa-traps`, `.fsa-worksheet-cta`). No new visual tokens; consume existing `fsa-theme` / `fsa-brand` variables.
- **Worksheet artifacts:** see the worksheet/download system spec for file naming.

## What stays online-only

- All calculators and simulators (cash-flow, emergency-fund, banking-fee, credit simulator, debt payoff, paycheck, compound, life-insurance, the four investing sub-labs, the Scam Detector).
- Branching scenarios and quizzes (interactive state).
- Anything date-sensitive that updates (Module 6 tax brackets, Module 3 named institutions/fees).

## What becomes printable/downloadable

- One worksheet or checklist per module (the "paper takeaway"), listed per module in the audit's dimension 10.
- Static reference cards (scam red-flags card, coverage checklist, build-credit plan).
- Module 10's "Assembled Plan" as a printable one-page personal plan.
- Rule: a worksheet is a self-contained artifact that makes sense on paper with no interactivity. If a thing needs live calculation, it stays online and the worksheet captures the learner's result by hand.

## How worksheets should be introduced inside the module

- Placed as block 8, after the quiz, as a short "Take this with you" section.
- One or two sentences of framing: what the worksheet is for and when to use it.
- A clear download control plus a visible on-page print-friendly version of the same worksheet (so the learner can use it without downloading).
- Never gate the worksheet behind an email or signup (free-course principle).
- The worksheet restates only the minimum instructions needed to use it on paper; it does not duplicate the full lesson.

## How downloads should be labeled

- Button/link text names the artifact and format: "Download the worksheet (PDF)" or "Print this checklist."
- Include the module and a short title near the control: "Module 2 - Starter Cushion Tracker (PDF)."
- Show format and that it is free: "Free - PDF - one page."
- Avoid vague "Download" or "Learn more." Every download control says what it is and its format.

## How "provisional / educational only / not advice" language should appear

- The free course is live educational content, so it does not carry the reentry packet's "provisional / counsel-pending" banner. Do not import that banner here.
- Each worksheet (online and PDF) carries a short standard footer: "Educational information, not financial advice. Financially Sovereign Academy." Match the existing FSA footer convention.
- Where content is jurisdiction- or time-sensitive (taxes, named fees), add a dated note: "Example figures, current as of <year>; verify current rules."
- No outcome guarantees, no "proven," no personalized-advice phrasing anywhere in the free course.

## How the module-to-module bridge should work

- Keep the existing "Continue to Module N+1" pattern and the `completeModule()` completion state.
- The bridge is an honest next step, not a sales push: name the next module and what it unlocks.
- Module 10 continues to bridge into Bitcoin Sovereign Academy by design.
- The worksheet download does not replace the bridge; both appear (worksheet as block 8, bridge as block 9).

## Non-goals for this template

No calculator rewrites, no renaming module files, no new design tokens, no change to the completion/nav JS behavior beyond adding accessibility attributes, and no email gating.
