# FSA 10-Module Hybrid Redesign — Structure Index (v0.1)

Branch: `feat/fsa-course-hybrid-scaffolding`. Everything here is **additive and non-live**: no `modules/`, `css/`, navigation, PDF-packet, correctional/reentry, or provisional-preview files were edited. Nothing committed. This index ties together the designed structure so it can be reviewed before any live migration.

## What exists now

### Planning (the design) — all now in this folder
- `fsa-10-module-redesign-audit-v0.1.md` — the current-state audit of all 10 modules.
- `fsa-module-template-spec-v0.1.md` — the repeatable module template.
- `fsa-worksheet-download-system-v0.1.md` — worksheet source/PDF system and naming.
- `fsa-module-a11y-interaction-checklist-v0.1.md` — accessibility + interaction requirements.
- `fsa-module-2-pilot-plan-v0.1.md` — the Module 2 live-pilot plan (not started).
- `phase-0-scaffolding-build-report-v0.1.md` — build report for the scaffolding.

The full redesign record now lives in one place (this folder in the FSA repo).

### Reusable snippets (reference only, not imported)
- `snippets/module-gate-snippet-v0.1.html` — the "Is this for you" gate (template block 2).
- `snippets/traps-callout-snippet-v0.1.html` — standardized "Watch out for" callout (block 6).
- `snippets/worksheet-download-snippet-v0.1.html` — worksheet + download block (block 8).
- `snippets/a11y-css-snippet-v0.1.css` — focus-visible, reduced-motion, tap-target, print defaults.

### Working prototype (reference only)
- `prototype/module-template-demo-v0.1.html` — a **self-contained, clickable prototype** of the full 9-block template, using Module 2 as the worked example: hero, gate, teaching, a working accessible calculator, branching scenario, traps callout, accessible quiz, worksheet block with a real PDF download + print, and completion/bridge. It imports no live CSS/JS, so it cannot affect the live course. Serve the repo and open `/FSA-Institutional-Projects/fsa-course-redesign/prototype/module-template-demo-v0.1.html`.

### Worksheet library (in `../../worksheets/`)
Ten worksheet sources (markdown) and ten generated PDFs, one per module:

| Module | Worksheet | Source | PDF |
|---|---|---|---|
| 1 Money Mindset | Cash-flow map | `module-01-cash-flow-map-v0.1.md` | `module-01-...pdf` |
| 2 Emergency Funds | Starter cushion tracker | `module-02-starter-cushion-tracker-v0.1.md` | `module-02-...pdf` |
| 3 Banking | Account-shopping checklist | `module-03-account-shopping-checklist-v0.1.md` | `module-03-...pdf` |
| 4 Credit | Build-credit 12-month plan | `module-04-build-credit-plan-v0.1.md` | `module-04-...pdf` |
| 5 Debt | Debt inventory | `module-05-debt-inventory-v0.1.md` | `module-05-...pdf` |
| 6 Taxes | Paycheck decoder + W-4 | `module-06-paycheck-decoder-v0.1.md` | `module-06-...pdf` |
| 7 Investing | Reusable scorecard + allocation | `module-07-investing-scorecard-v0.1.md` | `module-07-...pdf` |
| 8 Risk/Insurance | Coverage checklist | `module-08-coverage-checklist-v0.1.md` | `module-08-...pdf` |
| 9 Consumer Protection | Scam red-flags card + action checklist | `module-09-scam-red-flags-card-v0.1.md` | `module-09-...pdf` |
| 10 Master Plan | One-page personal plan | `module-10-personal-plan-v0.1.md` | `module-10-...pdf` |

All worksheets: plain language, no em dashes, example figures labeled, learner-safe (no advice/outcome claims), one source rendered to PDF via the shared build script.

## Decisions recorded

1. **Worksheet page count: keep 2 pages for now.** They are fill-in tools and need handwriting space; not trimmed to 1 page.
2. **PDF naming: standardized only.** All PDFs use `module-NN-slug-v0.1.pdf` (matches the source 1:1 and the prototype link). The earlier orphan `FSA-Module-02-...pdf` has been deleted.
3. **Planning docs: relocated.** All five planning/audit docs now live in this folder (see above); the redesign record is in one place.

## Open item (deferred to the Module 2 pilot)

- **On-page worksheet embed:** the prototype hard-codes a small worksheet preview; the real build step (markdown source injected into block 8) is wired during the Module 2 pilot.

## What has NOT happened (guardrails)

No live module file, CSS file, navigation, or live page was created or edited. No calculators changed. No visual tokens changed. The correctional/reentry packet, provisional investor preview, and their PDFs were untouched. Nothing committed. The Module 2 live pilot is the next step and has not been started.

## Next step

Review the prototype and the worksheet library. On approval, the Module 2 live pilot (per `fsa-module-2-pilot-plan-v0.1.md`) applies this exact structure to `modules/emergency-funds-saving.html` only, on a branch, verified in served mode, with the calculator and tokens untouched.
