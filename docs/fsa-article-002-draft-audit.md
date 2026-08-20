# Draft Audit: FSA-ARTICLE-002 "Every Dollar Has Four Jobs. Which One Is Yours Doing?"

Produced by the `fsa-educational-writer` skill in **Mode 3 (article audit)**, run as the
standards check before handoff, per the Mode 2 stopping point. Date: 2026-07-18.
Inputs: `scripts/four_jobs_content.py` (drafted body), the updated registry record in
`scripts/library_data.py`, `articles/sources/every-dollar-has-four-jobs.sources.md`,
and the rendered page `articles/money-decisions/every-dollar-has-four-jobs.html`.

**State at handoff: `status: drafted`, `reviewStatus: human-review-required`. Not approved.
This audit recommends; it does not approve.**

## Provenance of the human decisions this draft implements

Recorded 2026-07-18, decisions by Dalia (via working session):

1. FSA-ARTICLE-002 selected as the next article (over beginning Economic Thinking).
2. The Mode 1 brief's registry refinements adopted (title, misconception, coreQuestion,
   mentalModel, learnerOutcome, supportingConcepts, audiences).
3. Four-jobs taxonomy set by Dalia: **Live / Prepare / Protect / Grow** (her own naming,
   replacing both the brief's "cover now / wait / repay / grow" and the old record's
   implied "cover / hold / protect / grow").
4. Tier B emergency-expense statistic **excluded**; the scenario carries the point.
   Her rule, worth keeping: statistics are used only when they materially strengthen
   the lesson; the SHED figure is time-bound, jurisdiction-specific, maintenance-heavy,
   and unnecessary for the principle.

## Rubric scores (educational-review rubric, 1 to 5; below 4 blocks approval)

1. **Concept accuracy: 5.** Opportunity cost is described as the value of the best
   declined option, named once after the mechanism, then reused. No overclaim; the
   boundary section explicitly says the lens is not a ledger and money is fungible.
2. **Learner clarity: 5.** Grade 7 to 9 cadence, mechanism before label, each job named
   with a plain definition. Densest passage is the boundary paragraph on rates; it stays
   concrete (rates, cushion, match) and short of the "Later" compounding paragraph's load.
3. **Practical relevance: 5.** Opens on the paycheck and the standard advice; the decision
   taught (where one free dollar goes) is one many readers face this month.
4. **Mental-model strength: 5.** "A dollar holds one job at a time, and for many people
   most dollars already have one." Applies to decisions the article never mentions
   (a raise, a refund, a windfall).
5. **Scenario quality: 5.** Teresa, one figure (the freed forty dollars), arithmetic-free,
   labeled an FSA illustration in the source file. The neighbor variant shows the answer
   is situational without adding numbers.
6. **Nuance: 5.** Boundary case includes the required "obvious move is wrong for someone"
   cases: no-surplus (question does not apply yet; structure not character), high-rate debt
   beating savings, no-cushion beating debt payoff, employer match beating low-rate payoff.
   Framed as "check the numbers in front of you," including against this article's own lens.
7. **Evidence quality: 5.** No dated Tier B claim (per decision 4; matches the gold-standard
   preference for evergreen articles). Tier A rests on Federal Reserve Education
   (opportunity cost) and Thaler 1985/1999 (mental accounting). Nothing invented. One
   citation URL (Thaler 1999 DOI) could not be loaded by the drafting pass and is flagged
   for human confirmation.
8. **Tone and dignity: 5.** Names the structural reality (most dollars hired by Live before
   the month begins; "rent does not negotiate") without moralizing, and closes the shame
   loop explicitly: keeping a household running on a committed income "is the first job,
   done every month, under pressure."
9. **Originality: 4.** Framing (most dollars already have a job; decide the next free one),
   scenario, model wording, and exercises are original. Score is 4, not 5, because the
   title territory ("every dollar" + "jobs") remains adjacent to YNAB's well-known
   "give every dollar a job" slogan; the brief required a manual similarity review against
   YNAB language before this article advances, and that review is a human step that has
   not happened yet. Approvable at 4 only after that review passes.
10. **FSA integration: 5.** Correct series and order (money-decisions, 2), canonical module
    names (Mindset & Cash Flow, Emergency Funds, Debt, Investing), real related slugs,
    education-only footer, DRAFT banner and `robots: noindex` confirmed on the rendered
    page, all 13 parts present in order. `validate_articles.py`, the source-persistence
    suite, and the public-visibility suite all pass.

## Writing-audit checklist

- Em dashes: **none** (verified mechanically over the module and the rendered page).
- Decorative emoji: **none.**
- Banned phrases: **none found.**
- Rhetorical questions: three question marks in body prose: the quoted self-blaming
  question and its reframe in the opening, and the quoted "which job does my next free
  dollar need most?" in Why This Matters. This exactly matches the pattern the two pilot
  articles shipped with (a quoted belief-question plus a reframe), which the pilot
  writing audits recorded as passing. Flagged here so the human reviewer can judge the
  precedent rather than inherit it silently.
- Hidden access assumptions: exercises need pencil, paper, and attention only; no bank
  account, app, balance disclosure, or internet. The scenario's phone installment is part
  of Teresa's story, not a requirement on the reader.
- Repetition / symmetry / uniform paragraphs: varied lengths; one deliberate echo
  ("hired") reused as a through-line rather than repeated filler.
- Moralizing: none found; the no-surplus case is framed as arithmetic and structure.

## Originality note (per the originality standard)

- **Concept source:** general economics (opportunity cost; scarcity of allocation) and
  established behavioral research on mental accounting (Thaler 1985, 1999).
- **FSA framing:** the reversal is the article's own: instead of "assign every dollar a
  job" (a budgeting instruction that assumes a surplus), FSA teaches "most dollars are
  already assigned; the skill is choosing the job of the next free dollar." The
  Live / Prepare / Protect / Grow naming is Dalia's, created for this library.
- **Original scenario:** Teresa, the paid-off phone installment, and the freed forty
  dollars were created for this article and are labeled as an FSA illustration.
- **Original activity:** both exercises (the ten-then-forty free-dollar thought test and
  the crowded/thin/empty column) were designed for this article.
- **Potential similarity risk:** YNAB's "give every dollar a job" slogan. Mitigations:
  the article never uses the phrase "give every dollar a job"; its title asks which job a
  dollar is already doing; the core move (constraint first, assignment second) is the
  opposite of the slogan's instruction. Residual risk is the title's noun phrase
  territory. **Required before advancing:** the manual similarity review against YNAB
  language that the brief reserved for a human.
- **Review result:** Original after differentiation; one named residual risk, held for
  human review.

## Reader Experience Review (advisory pass)

Friction: one candidate, "Grow will matter someday, and it politely says so," is
personification that briefly shows the writing; judged to earn its place because the
scenario's engine is the four jobs "applying" for the freed dollar. Left unchanged for
the human to strike if it reads as visible writing. Anchor: "a weight with no handle"
and "rent does not negotiate" are the lines most likely to survive six months; neither
was manufactured. Publisher test: the reframe (the dollars are already working; decide
the next free one) is genuinely new to the target reader. Conclusion: change nothing.

## Unresolved human decisions (preserved for the review gates)

1. **Protect mapping.** Dalia named the taxonomy Live / Prepare / Protect / Grow but did
   not specify where "repay debt" lives. This draft maps repaying debt under **Protect**
   (defending what you have from interest running against you, alongside keeping
   coverage). Confirm or reassign; if Protect is meant as insurance-only, the body's
   job definitions and the boundary case need one edit each.
2. **YNAB similarity review** (originality dimension 9): run the manual check and confirm
   the title stays.
3. **Thaler 1999 URL** in the source file: confirm the DOI resolves to "Mental Accounting
   Matters."
4. **Rhetorical-question precedent** (writing audit): confirm the two-quoted-questions
   pattern remains acceptable, or set a stricter line for the series.
5. **Boundary framing sign-off** (carried from the brief): confirm the no-surplus case
   reads as structural reality, not personal failing, and that nothing crosses into
   individualized advice.

## Recommendation

`drafted` / `human-review-required`, ready for fact-check confirmation (three Tier A
citations, no dated Tier B claims) and then the educational review gate. Not approvable
until unresolved decisions 1 and 2 are closed by a human.
