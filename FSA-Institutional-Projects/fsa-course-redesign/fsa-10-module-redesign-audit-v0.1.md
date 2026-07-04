# FSA Free 10-Module Course — Redesign Audit (v0.1)

Scope: audit only. No content rewrites, no edits, no commits, no design-token changes, no calculator changes. The correctional/reentry packet, the provisional preview, and all PDFs are untouched. Goal: propose a repeatable hybrid online + downloadable-worksheet structure without breaking functionality or changing educational intent.

Repo: `~/projects/financially-sovereign-academy/modules/`. The course is 10 modules; module 7 (Investing) also owns four sub-lab tools (`investing-dca-simulator`, `investing-fee-simulator`, `investing-risk-tolerance`, `investing-scorecard-lab`).

---

## Headline findings

1. **There is already one shared hand-built template** across all 10: hero + one-line objective, 4 to 6 teaching sections, one calculator, a branching Scenario block, six lab-guide cards (one active), a 3-question quiz, a completion banner, and a "Continue to Module N+1" bridge. Consistency is a strength to preserve, not rebuild.
2. **Zero downloadable or printable anything.** No `@media print`, no download links, no worksheets across all 14 files, even where the content clearly produces a takeaway ("Your Assembled Plan," "Reusable Scorecard"). This is the single biggest gap and the core of the requested hybrid format.
3. **Zero images/diagrams** anywhere (matches the known "no graphics" gap). No alt-text debt, but no visual scaffolding either.
4. **Accessibility drift:** only the capstone has `prefers-reduced-motion`; 8 of 10 define no `:focus` styles; ARIA is sparse on interactive calculators/quizzes.
5. **Template drift in four places:** no "is this for you" gate anywhere; Scenario block missing from credit-scores and debt-strategy; consumer-protection has no calculator; investing hub has 30 lab-cards vs 6; two modules reuse another module's lab card.
6. **CSS bundle is inconsistent:** modules 2 to 6 and 10 link `fsa-viz-kit.css`; modules 1, 7, 8, 9 omit it.

---

## Part 1 — Per-module audit (dimensions 1 to 14)

Legend for dimension 6: L=too long, T=too thin, A=too advanced, I=inconsistent.

### Module 1 — Money Mindset & Cash Flow
1. **Path:** `modules/money-mindset-cash-flow.html` (3590 words)
2. **Structure:** hero → Money Avoidance Trap → Cash Flow: The One Number → Reality Check → Pay Yourself First → Scenario (paycheck-to-paycheck) → Mindset Traps → quiz → completion → bridge.
3. **Objective:** understand where money goes and build healthy habits.
4. **Tools:** Monthly Cash Flow Calculator (3 inputs); mindset-trap toggles; branching scenario; 6 lab cards (`budget-tracker`); 3-Q quiz.
5. **Worksheets/downloads:** none.
6. **Fit:** solid; slight L in the mindset-traps tail.
7. **Unclear instructions:** calculator prompt is light ("enter your...").
8. **Scenario need:** already strong ("Sunday night anxiety").
9. **Scams/fees/traps:** names 4 mindset traps; no fees/scams (appropriate here).
10. **Worksheet candidate:** one-week cash-flow map + "pay yourself first" auto-transfer setup card.
11. **Online-only:** the live calculator.
12. **Paper-friendly:** the cash-flow map, mindset-trap self-check.
13. **A11y/mobile:** best ARIA of the set (15); no reduced-motion; only 1 `:focus`.
14. **Design inconsistency:** omits `fsa-viz-kit.css`.

### Module 2 — Emergency Funds & Saving
1. `modules/emergency-funds-saving.html` (3208)
2. hero → Why → How Much → Where → Scenario (unexpected repair) → How to Build (Steps 1 to 4) → quiz → completion → bridge.
3. Build resilience against surprises.
4. Emergency Fund Calculator (1 input); scenario; 6 lab cards (`emergency-fund-calc`); quiz.
5. none.
6. Balanced.
7. Clear (explicit numbered steps).
8. Present (repair-cost scenario).
9. Inflation-erosion caveat; no scams.
10. **Worksheet:** "starter cushion" tracker (rung by rung with a date); "where to keep it" comparison sheet.
11. Live calculator.
12. Cushion tracker, build-it checklist.
13. no reduced-motion; 0 `:focus`; 5 ARIA.
14. links `fsa-viz-kit` (consistent with 3 to 6).

### Module 3 — Banking Without Getting Robbed
1. `modules/banking-basics.html` (3536)
2. hero → Hidden Cost → Checking vs Savings → FDIC → Scenario (frozen account) → How to Choose → quiz → completion → bridge.
3. Navigate checking/savings and hidden fees.
4. Banking Fee Calculator (3 inputs); bank-item toggles; scenario; 6 lab cards (`net-worth-snapshot`); quiz.
5. none.
6. Solid.
7. Clear on the fee tool.
8. Present (frozen-account).
9. Strong: overdraft/maintenance/wire/paper-statement fees; "Red Flags to Avoid."
10. **Worksheet:** "account-shopping checklist" (fee traps to ask about); fee-audit worksheet for a current account.
11. Live fee calculator.
12. Account-shopping checklist.
13. no reduced-motion; 0 `:focus`; 5 ARIA.
14. lab card `net-worth-snapshot` is not banking-specific.

### Module 4 — Credit Scores Decoded
1. `modules/credit-scores.html` (3017)
2. hero → What is a Score → How Calculated (5 FICO factors) → Simulator → How to Check → Myths → Build From Zero → quiz → completion → bridge.
3. Understand, build, maintain credit.
4. Credit Score Simulator (3 inputs); 6 lab cards (`credit-score-check`); quiz. **No branching Scenario.**
5. none.
6. I (no Scenario block; myth list is definitional).
7. Simulator ok; myth section is passive.
8. Slightly A in the factor-weighting detail without a worked example.
9. 4 named myths; no scam/fee framing (a predatory-credit trap could be added).
10. **Worksheet:** "build-credit-from-zero" 12-month plan; dispute-a-report checklist.
11. Live simulator.
12. Build-credit plan, myth-vs-fact card.
13. no reduced-motion; 0 `:focus`; 3 ARIA.
14. missing a real scenario (template drift).

### Module 5 — Debt Strategy
1. `modules/debt-strategy.html` (2888)
2. hero → Good vs Bad Debt → Avalanche vs Snowball → Payoff Calculator → Pay Off vs Invest → Consolidation → quiz → completion → bridge.
3. Eliminate debt, build wealth.
4. Debt Payoff Calculator (richest form, ~10 inputs, multi-debt); 6 lab cards (`debt-avalanche`); quiz. **No branching Scenario.**
5. none.
6. I (no Scenario; otherwise strong).
7. Clear (labeled inputs, priority order).
8. Fine.
9. Consolidation "when it hurts"; gray-zone APR caveat; could add debt-relief/settlement scams.
10. **Worksheet:** debt inventory sheet (balance/APR/min) + avalanche vs snowball plan printout.
11. Live payoff calculator (best candidate to stay online).
12. Debt inventory worksheet.
13. no reduced-motion; 0 `:focus`; 3 ARIA.
14. missing scenario.

### Module 6 — Taxes & Paychecks
1. `modules/taxes-paychecks.html` (3423)
2. hero → Where Paycheck Goes → Breakdown Calculator → Tax Brackets → W-4 → Deductions (worth it?) → Scenario (tax-time surprise) → accounts → quiz → completion → bridge.
3. Understand your paycheck, keep more.
4. Paycheck Breakdown Calculator (4 inputs); scenario; 6 lab cards (`tax-withholding-check`); quiz.
5. none.
6. Solid.
7. Clear.
8. Fine.
9. "Refund trap"; deduction verdicts. **Date-sensitive: hard-codes 2026 tax brackets — verify at publish.**
10. **Worksheet:** paycheck-decoder worksheet; W-4 adjustment checklist.
11. Live paycheck calculator (must stay online; brackets update).
12. Paycheck-decoder, W-4 checklist.
13. no reduced-motion; 0 `:focus`; 3 ARIA.
14. consistent.

### Module 7 — Investing Fundamentals (+ 4 sub-labs)
1. `modules/investing-fundamentals.html` (3245) + sub-labs.
2. hero → Why Invest → Compound Calculator → Vehicles → Allocation → Mistakes → Scenario (market crash) → quiz → completion → bridge (also a "Sound Money: Gold and Bitcoin" BSA seam).
3. Build wealth that outpaces inflation.
4. Compound Interest Calculator (4 inputs); scenario; **30 lab-cards** including a Practice-Labs cluster linking the 4 sub-labs; quiz.
5. none. Sub-labs: DCA sim (682w), Fee sim (667w), Risk tolerance (556w, thinnest), Scorecard lab (1757w, 8 inputs, implies a "Reusable Scorecard" worksheet but no print/download).
6. I (30 vs 6 lab cards); sub-labs are T; scorecard-lab is A relative to the rest.
7. Hub ok; sub-labs are tool-first with light framing.
8. Scorecard lab is the most advanced content in the course.
9. 4 named mistakes; could add "hot tip"/pump-and-dump and high-fee-advisor traps.
10. **Worksheet:** the "Reusable Scorecard" is a ready-made downloadable; an allocation-by-age worksheet; a fee-drag one-pager.
11. Compound calculator, DCA/fee simulators (inherently online).
12. Reusable scorecard, allocation worksheet.
13. weakest ARIA (1); no reduced-motion; sub-labs equally sparse.
14. omits `fsa-viz-kit`; 30-lab-card outlier; sub-labs use a different CSS bundle (`investing-labs.css` + `fsa-glossary.css`).

### Module 8 — Risk & Insurance
1. `modules/risk-insurance.html` (2455 — leanest)
2. hero → Why Insurance → Essential (NEED) → Optional → AVOID → Life Insurance Calculator → Scenario (medical emergency) → quiz → completion → bridge.
3. Protect against catastrophe.
4. Life Insurance Calculator (4 inputs); scenario; 6 lab cards (**reuses `emergency-fund-calc`**); quiz.
5. none.
6. Slightly T but complete.
7. Clear directives.
8. Fine.
9. Explicit AVOID list (extended warranties, credit-card insurance, whole life, disease-specific).
10. **Worksheet:** coverage checklist (what you need vs what to skip); policy-comparison sheet.
11. Life-insurance calculator.
12. Coverage checklist.
13. no reduced-motion; 0 `:focus`; 1 ARIA.
14. lab card reused from Module 2 (not insurance-specific); omits `fsa-viz-kit`.

### Module 9 — Consumer Protection
1. `modules/consumer-protection.html` (2829)
2. hero → Common Scams → Scam Detector (interactive) → How to Protect → Your Rights (FCRA/FDCPA) → Scenario (identity theft) → quiz → completion → bridge.
3. Avoid scams, predatory lenders, traps.
4. **Scam Detector** (8-item `checkScam`, unique interactive); scenario; 6 lab cards (**reuses `credit-score-check`**); quiz. **No calculator.**
5. none.
6. Solid; I (no calculator — acceptable here).
7. Clear (scam-detector is strong practice).
8. Fine.
9. Strongest scam/fee coverage: IRS-imposter, payday/predatory lenders, gift-card, wire fraud, phishing; "Golden Rule of Scams"; "Where to Report."
10. **Worksheet:** "scam red-flags" wallet card; "if you've been scammed" action checklist; reporting-contacts sheet.
11. Scam Detector (online).
12. Red-flags card, action checklist.
13. no reduced-motion; 0 `:focus`; 1 ARIA.
14. reuses another module's lab card; omits `fsa-viz-kit`.

### Module 10 — Financial Master Plan (capstone)
1. `modules/financial-master-plan.html` (4192 — longest)
2. hero → Readiness Checklist → Assembled Plan → Action Priority Matrix → Goal & Next Action → 7-Stage Roadmap → Big Decisions Lab (4 popups) → Mistakes → Final Thoughts → Sovereignty Path → accounts → quiz → completion → bridge to **Bitcoin Sovereign Academy**.
3. Complete roadmap to financial sovereignty.
4. Readiness checklist (branching); Action Priority Matrix; 4 `PopupLabs`; 7-stage Sovereignty Ladder; 6 lab cards (`net-worth-snapshot`); quiz.
5. "Your Assembled Plan" reads like a personalized worksheet but no print/download.
6. L (heaviest single page; justified as capstone but a lot on one screen).
7. Strong, directive (checklist + matrix + next action).
8. Fine.
9. 4 named mistakes.
10. **Worksheet (highest value):** the "Assembled Plan" as a printable one-page personal plan; the readiness checklist; the priority matrix.
11. Branching checklist, popups, ladder.
12. The assembled plan + checklist (the clearest paper takeaway in the whole course).
13. best a11y: only module with `prefers-reduced-motion`; 17 ARIA; 2 `:focus`.
14. adds `sovereignty-ladder.css`; bridge leaves the FSA course (into BSA) by design.

---

## Part 2 — Proposals

### A. One standard module template (hybrid online + downloadable)

Preserve the existing skeleton, add two missing blocks and a paper artifact. Proposed canonical order:

1. **Hero** — Module number, title, one-line objective (as today).
2. **"Is this for you" gate** (NEW, currently absent everywhere) — 2 to 3 lines: who this helps, what you will leave able to do.
3. **Teaching sections** — 3 to 5 max; cap the longest modules (10, and the mindset tail of 1) by moving detail into an optional "go deeper" toggle.
4. **One interactive tool** (online-only) — the module's calculator/simulator, unchanged.
5. **Real-life scenario** (branching) — REQUIRED in every module; add to credit-scores (#4) and debt-strategy (#5), which lack one.
6. **Scams / fees / traps callout** — a consistent "watch out for" block; several modules have this informally, standardize it.
7. **Check your understanding** — the 3-Q quiz (as today).
8. **Downloadable worksheet / checklist** (NEW everywhere) — the paper takeaway for that module (see dimension 10 per module), delivered as a print-friendly section plus a generated PDF, using the reentry packet's proven pandoc/print approach.
9. **Completion + honest bridge** — completion banner and "Continue to Module N+1" (module 10 bridges to BSA).

Template rules: every module links the same CSS bundle (add `fsa-viz-kit.css` to 1, 7, 8, 9 for parity); each lab card is topic-matched (fix the reuse in 8 and 9); each module ships exactly one worksheet; `prefers-reduced-motion`, `:focus-visible`, and ARIA on interactive components become template defaults (only the capstone has them today).

### B. Module-by-module restructuring map

| # | Module | Keep | Add | Trim | Worksheet |
|---|---|---|---|---|---|
| 1 | Money Mindset | calculator, scenario | gate, viz-kit parity | mindset-trap tail | one-week cash-flow map |
| 2 | Emergency Funds | steps, scenario | gate, worksheet | — | starter-cushion tracker |
| 3 | Banking | fee calc, red flags | gate, topic-matched lab | — | account-shopping checklist |
| 4 | Credit | simulator | **scenario (missing)**, gate | myth passivity | build-from-zero 12-mo plan |
| 5 | Debt | payoff calc | **scenario (missing)**, gate | — | debt-inventory worksheet |
| 6 | Taxes | paycheck calc | gate; **verify 2026 brackets** | — | paycheck-decoder + W-4 checklist |
| 7 | Investing | compound calc, sub-labs | gate; normalize 30→6 lab cards; viz-kit parity | thin sub-labs framing | reusable scorecard, allocation sheet |
| 8 | Risk/Insurance | AVOID list, calc | gate; **insurance-specific lab**; viz-kit | — | coverage checklist |
| 9 | Consumer Protection | scam detector, rights | gate; **topic-matched lab**; viz-kit | — | scam red-flags card + action checklist |
| 10 | Master Plan | checklist, matrix, ladder | gate; **make "Assembled Plan" downloadable** | split the single long page | printable one-page personal plan |

### C. Best pilot module to redesign first

**Module 2 — Emergency Funds & Saving.** Reasons: mid-length and balanced (not the heaviest), already has a clean scenario and explicit steps, its worksheet (a starter-cushion tracker) is simple and high-value, and it is early in the sequence so the new template sets the pattern learners meet first. It exercises every new block (gate, required scenario, standardized traps, and the first downloadable worksheet) without the complexity of the investing hub or the capstone. Lowest risk, clearest template proof.

Runner-up: **Module 3 (Banking)** if you would rather pilot on a fee/scam-heavy module; strongest existing "red flags" content to convert into a checklist.

### D. Risk level of redesigning each module

| Risk | Modules | Why |
|---|---|---|
| **Low** | 2 Emergency Funds, 3 Banking, 8 Risk/Insurance | balanced length, simple single-calculator, clean worksheet target |
| **Low-Med** | 1 Money Mindset, 6 Taxes, 9 Consumer Protection | 6 is date-sensitive (brackets); 9 has the unique scam-detector to preserve |
| **Medium** | 4 Credit, 5 Debt | need a new scenario block added, not just reformatting |
| **High** | 7 Investing (+4 sub-labs), 10 Master Plan | 7 has 5 files, 30 lab cards, and the richest tool; 10 is the longest page, has popups, the ladder, and the BSA bridge |

Note: no calculator is rewritten in any tier; risk is about structural change and worksheet wiring, not the tools.

### E. Phased rollout plan

- **Phase 0 (no module edits):** approve template A; build one reusable worksheet/print mechanism (print CSS + pandoc PDF, reusing the reentry-packet approach); build the shared "gate" and "traps" partial and the a11y defaults (`prefers-reduced-motion`, `:focus-visible`, ARIA) as a snippet.
- **Phase 1 (pilot):** redesign Module 2 only, end to end, on a branch. Served-mode verify: calculator still works, scenario intact, quiz/completion/bridge intact, worksheet prints and downloads, mobile + a11y checks. This is the template proof.
- **Phase 2 (low-risk batch):** Modules 3 and 8, then 1, 6, 9. Add gate + traps + worksheet + a11y; 6 gets a bracket-freshness check.
- **Phase 3 (scenario-add batch):** Modules 4 and 5 — add the missing scenario block plus the standard changes.
- **Phase 4 (high-risk, last):** Module 7 (normalize the 30 lab cards, wire the reusable scorecard as a real download, keep sub-labs) and Module 10 (make the Assembled Plan a printable personal plan, split the long page). Do these only after the template is proven on 8 modules.
- **Per phase:** one module (or small batch) per branch; no calculator rewrites; no visual-token changes; served-mode verification; nothing merged without review.

---

## Guardrails honored

Audit only. No module files edited, no content removed, no calculators changed, no visual tokens touched. The correctional/reentry packet, the provisional investor preview, and all PDFs were not touched. Nothing committed.
