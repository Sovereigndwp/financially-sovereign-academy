# FSA Module 2 Pilot Implementation Plan (v0.1)

Phase 0 planning artifact. Plan only. `modules/emergency-funds-saving.html`, worksheet files, CSS, PDFs, and navigation are NOT edited here. This is the plan to redesign Module 2 as the template proof, on a branch, for review.

Target file: `modules/emergency-funds-saving.html` (Module 2, "Emergency Funds & Saving", ~3208 words). Chosen as pilot: balanced length, already has a clean scenario and explicit build steps, simplest high-value worksheet, early in the course.

## Exact intended changes to Module 2

1. **Add the "Is this for you" gate** (block 2, new) directly after the hero: 2 to 3 lines naming who this helps and what the learner will leave able to do. No teaching content moved.
2. **Add accessibility defaults** (per the a11y checklist): `prefers-reduced-motion` block, `:focus-visible` styles, ARIA on the Emergency Fund Calculator (label + `aria-live` result), the quiz (group roles + live feedback), and the scenario (live outcome region). No behavior change to the calculator math.
3. **Standardize the traps callout** (block 6): wrap the existing inflation-erosion caveat and add a short "watch out for" note (raiding the cushion, keeping it too accessible to spend, using a credit card as the emergency fund). Uses existing content and tone; no new claims.
4. **Add the worksheet block** (block 8, new) after the quiz: a "Take this with you" section embedding the Starter Cushion Tracker print section plus a download button.
5. **Add the CSS parity link** only if needed for the gate/traps/worksheet styling; prefer existing `fsa-theme`/`fsa-brand` classes. (No new tokens. If `fsa-viz-kit.css` parity is wanted it is a one-line link add, flagged, not required for this pilot.)
6. **Fix the lab-card topic match** if trivial (Module 2 already uses `emergency-fund-calc`, which is correct here; no change needed).

## What content stays untouched

- All existing teaching sections (Why Emergency Funds Matter, How Much, Where to Keep It, How to Build It Steps 1 to 4).
- The Emergency Fund Calculator (inputs, math, JS) - unchanged.
- The branching scenario (unexpected repair) - unchanged content; only ARIA/live-region added.
- The 3-question quiz content - unchanged; only roles/live feedback added.
- Completion (`completeModule()`) and the "Continue to Module 3" bridge - unchanged.
- Visual tokens, colors, fonts - unchanged.

## Where the "Is this for you" gate goes

Immediately after the hero (`mod-emergency-funds__gate`), before "Why Emergency Funds Matter." Content shape:
- "This module is for you if: you have little or no savings, a surprise bill would put you in debt, or money in is irregular."
- "By the end you will: know your target cushion, know where to keep it, and have a tracker to build it rung by rung."

## Where the worksheet block goes

After the quiz, before the completion/bridge (`mod-emergency-funds__worksheet`). Contains:
- One-line framing: "Take this with you: a simple tracker to build your starter cushion, one rung at a time."
- The embedded print-friendly worksheet section (generated from the markdown source).
- The download button.

## Proposed worksheet title

**"Module 2 - Starter Cushion Tracker"**
- Source: `worksheets/src/module-02-starter-cushion-tracker.md`
- PDF: `worksheets/pdf/FSA-Module-02-Starter-Cushion-Tracker.pdf`

## Proposed worksheet sections (one page)

1. **Purpose line:** "A cushion is a small shock absorber, not a wealth plan. Build it one rung at a time."
2. **My target cushion:** a single line to write the target amount (from the calculator result).
3. **Where I keep it:** one line (account/place) and one line for why it is separate from spending money.
4. **Cushion rungs table:** small table with columns Rung / Target amount / Date / Done. A few blank rows (for example $25, $100, one month of essentials), editable by hand.
5. **My next automatic transfer:** amount + date + from/to.
6. **If I have to use it:** one line to note what counts as a real emergency (the learner's own definition) and a reminder to rebuild the next rung.
7. **Footer:** "Educational information, not financial advice. Financially Sovereign Academy."

Content is illustrative; amounts are examples, labeled as such. No outcome claims.

## Download button language

- Button text: "Download the tracker (PDF)"
- Nearby label: "Module 2 - Starter Cushion Tracker - Free - PDF - one page"
- Also offer: "Print this page's tracker" (uses the on-page print section, no download needed).
- Plain anchor to `/worksheets/pdf/FSA-Module-02-Starter-Cushion-Tracker.pdf` (works with JS off).

## Verification steps (served-mode only, never file://)

- Serve the FSA repo; load `modules/emergency-funds-saving.html`.
- Confirm the Emergency Fund Calculator still calculates correctly (unchanged math).
- Confirm the scenario, quiz, completion, and "Continue to Module 3" bridge all still work.
- Confirm the new gate renders and reads correctly.
- Confirm the worksheet section renders on-page and the download button returns the PDF (200).
- Accessibility pass (from the a11y checklist): keyboard-only, screen-reader smoke test on calculator/quiz/scenario, reduced-motion on, 320/375px, print preview of the worksheet, JS-disabled load shows lesson + worksheet + download.
- Confirm no visual-token or color change versus the current live page (before/after screenshots).
- `git diff` limited to: `modules/emergency-funds-saving.html`, the new `worksheets/src/...md`, the generated `worksheets/pdf/...pdf`, and (if built) the shared `worksheets/build/...` header/script. No other files.

## Rollback plan

- Single-module scope on a branch (`feat/fsa-module-2-hybrid`). Rollback = `git checkout modules/emergency-funds-saving.html` and remove the new `worksheets/` files (the worksheet system is additive; deleting the new files and the module edit fully reverts).
- No shared CSS or JS changed beyond additive accessibility attributes and optional scoped styles, so revert is clean.
- Not merged until served-mode verification passes and you approve the diff.

## What this pilot proves before any other module is touched

The full new template end to end on one real module: the gate, the required scenario (Module 2 already has one), the standardized traps block, the first downloadable worksheet with aligned online/paper versions, and the accessibility defaults, all without changing the calculator or the visual system. If it verifies clean, the low-risk batch (Modules 3, 8, then 1, 6, 9) follows the same pattern.

## Guardrails honored

Plan only. No edits to `modules/emergency-funds-saving.html`, worksheet files, CSS, PDFs, or navigation. Nothing committed.
