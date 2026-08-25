# FSA Money Ideas: Decisions Log

Append-only. One entry per human decision that binds future work.

**What belongs here.** A decision made by the owner that changes what gets written,
how it gets written, what the registry says, or how the institution operates. Not
observations (those go to `docs/fsa-production-observations-log.md`), not
recommendations, and not anything an AI pass decided on its own authority.

**Rules.**

1. Append only. Never edit or delete an existing entry. To change a decision, add a
   new entry and set the old one's status to `superseded`, naming the new ID.
2. One entry per decision. If a working session produced four decisions, that is four
   entries.
3. Every entry names the evidence: the file, audit, or artifact where the decision is
   recorded or applied. An entry with no evidence is not a decision, it is a memory.
4. IDs are permanent and never reused: `FSA-DEC-NNN`, allocated in order.
5. Status vocabulary: `active`, `superseded`, `withdrawn`, `expired`.
6. If a decision was made in conversation and applied to files, record it here at the
   time it is applied. The 2026-07-18 governance test found that decisions binding the
   work lived only in conversation; this file exists to close that gap (backlog item H2).

**Backfill note.** Entries FSA-DEC-001 through FSA-DEC-006 were reconstructed on
2026-08-20 from the accepted recovery report, which drew them from
`docs/fsa-article-002-draft-audit.md`, `docs/governance-test-001-report.md`,
`docs/fsa-pilot-collection-retrospective.md`,
`articles/sources/every-dollar-has-four-jobs.sources.md`, and the TSA institution layer.
They are recorded here as evidence, not as new decisions. Nothing was inferred: any
decision that could not be traced to a written artifact was left out.

---

## FSA-DEC-001

- **Date:** 2026-07-18
- **Decision:** FSA-ARTICLE-002 ("Every Dollar Has Four Jobs") is the next article to be
  written, in preference to beginning the Economic Thinking series.
- **Owner:** Dalia
- **Reason / evidence:** Three roadmap signals disagreed at intake. The pilot
  retrospective's closing recommendation said "only then begin Economic Thinking"; the
  registry's `initialCollection` flag and the existing proposed brief both pointed at
  FSA-ARTICLE-002. The production pass escalated the conflict rather than guessing.
  Recorded in `docs/fsa-article-002-draft-audit.md` (Provenance, item 1) and
  `docs/governance-test-001-report.md` (section 2, Roadmap selection).
- **Files / systems affected:** the 2026-07-18 production pass; no file records the
  choice itself, which is the gap this log closes.
- **Supersedes:** partially supersedes the sequencing recommendation in
  `docs/fsa-pilot-collection-retrospective.md` (Recommended next step), for this one
  article only. The retrospective's prior instruction (calibrate the pilot before
  starting Economic Thinking) still stands.
- **Status:** active

## FSA-DEC-002

- **Date:** 2026-07-18
- **Decision:** The Mode 1 editorial brief's proposed registry refinements for
  FSA-ARTICLE-002 are adopted: title, misconception, coreQuestion, mentalModel,
  learnerOutcome, supportingConcepts, and audiences.
- **Owner:** Dalia
- **Reason / evidence:** The brief
  (`docs/proposed-briefs/every-dollar-has-four-jobs.brief.md`, "Unresolved human
  decisions", item 1) proposed the refinements and explicitly did not apply them,
  because they carry the "income is already committed" nuance the article needs.
  Adoption recorded in `docs/fsa-article-002-draft-audit.md` (Provenance, item 2).
- **Files / systems affected:** `scripts/library_data.py` (FSA-ARTICLE-002 record),
  and by regeneration `articles/article-library.json` and
  `articles/money-decisions/every-dollar-has-four-jobs.html`. Article ID and slug were
  held stable through the title change.
- **Supersedes:** the prior FSA-ARTICLE-002 registry values (misconception "A budget is
  mainly about restricting spending."; mentalModel "A dollar spent on one job can't do
  the other three."; title "Every Dollar Has Four Jobs").
- **Status:** active

## FSA-DEC-003

- **Date:** 2026-07-18
- **Decision:** The four-jobs taxonomy is **Live / Prepare / Protect / Grow**.
- **Owner:** Dalia
- **Reason / evidence:** Her own naming, created for this library. It replaces both the
  brief's proposed "cover now / wait / repay / grow" and the old registry record's
  implied "cover / hold / protect / grow". The brief had reserved the naming as an
  explicit human decision ("Unresolved human decisions", item 3: "Lock one naming ...
  Pick one and use it consistently"). Recorded in
  `docs/fsa-article-002-draft-audit.md` (Provenance, item 3) and in the Review note of
  `articles/sources/every-dollar-has-four-jobs.sources.md`.
- **Files / systems affected:** `scripts/four_jobs_content.py` (article body),
  `scripts/library_data.py` (editorial brief text), the rendered article page, and the
  source file's review note. Binds every future article that refers to the four jobs.
- **Supersedes:** the brief's proposed naming and the registry's prior implied naming.
- **Status:** active
- **Open sub-question, not decided:** where "repay debt" sits within the taxonomy. The
  2026-07-18 draft maps it to **Protect** and flags that mapping as unresolved. See
  `docs/fsa-article-002-draft-audit.md`, "Unresolved human decisions", item 1. This
  remains a blocker on advancing FSA-ARTICLE-002 and must be recorded here as its own
  entry when decided.

## FSA-DEC-004

- **Date:** 2026-07-18
- **Decision:** The Tier B emergency-expense statistic contemplated by the editorial
  brief is **excluded** from FSA-ARTICLE-002. The scenario carries the point instead.
- **Owner:** Dalia
- **Reason / evidence:** Her stated rule, recorded verbatim in the draft audit:
  statistics are used only when they materially strengthen the lesson. The figure in
  question (Federal Reserve SHED) is time-bound, jurisdiction-specific,
  maintenance-heavy, and unnecessary for the principle. The brief had reserved this as
  a human decision ("Unresolved human decisions", item 4). Recorded in
  `docs/fsa-article-002-draft-audit.md` (Provenance, item 4) and in
  `articles/sources/every-dollar-has-four-jobs.sources.md` under "Statistics requiring
  future updates".
- **Files / systems affected:** `scripts/four_jobs_content.py`,
  `articles/sources/every-dollar-has-four-jobs.sources.md`. Consequence:
  FSA-ARTICLE-002 carries no dated numeric claim and does not go stale.
- **Supersedes:** the editorial brief's Tier B evidence plan for this article.
- **Status:** active
- **Scope note:** the general rule (statistics only when they materially strengthen the
  lesson) was stated in the context of one article. It has not been ratified as a
  library-wide standard. Promoting it to the writer standard would be a separate
  decision.

## FSA-DEC-005

- **Date:** 2026-07-17
- **Decision:** The Educational Publishing capability charter v0.1 is approved at
  **Proven** tier, and the Economic Thinking series is approved as **Pilot A**, the
  first project run under the TSA operating system.
- **Owner:** Dalia
- **Reason / evidence:** `TSA/institution/capabilities/charters/educational-publishing.md`
  (header: "Asset status: Approved (owner, 2026-07-17)") and
  `TSA/projects/economic-thinking/PROJECT-BRIEF.md` (status: "Approved (owner,
  2026-07-17); first-tranche article list pending").
- **Files / systems affected:** the TSA institution layer. Binds FSA article production
  through the charter's stated boundaries, in particular: drafts only, approval and
  publication are human acts, no invented sources, and a hard stop at
  `Drafted / human-review-required`.
- **Supersedes:** nothing recorded.
- **Status:** active

## FSA-DEC-006

- **Date:** 2026-07-17
- **Decision:** Do **not** generalize the build engine for the pilot. Extend the
  existing per-article pattern (one body module plus one parallel `elif` in
  `build.py`) so that the cost of the duplication becomes visible before the refactor
  is decided.
- **Owner:** Dalia
- **Reason / evidence:** Recorded in `docs/fsa-pilot-collection-retrospective.md`,
  "Engine recommendations": "Per your instruction, I did NOT generalize the build
  engine ... That was the minimal change to render real content, and it deliberately
  surfaces the cost so we can decide with evidence." The same section set the trigger
  for revisiting: "the moment we would write a third `elif`. Not before."
- **Files / systems affected:** `scripts/build.py`, `scripts/later_content.py`, and
  subsequently `scripts/four_jobs_content.py`.
- **Supersedes:** nothing recorded.
- **Status:** active
- **Trigger state:** the trigger condition **has been met**. The third body module and
  the third dispatch branch were added on 2026-07-18 (recorded in
  `docs/fsa-production-observations-log.md` and as backlog item H3 in
  `docs/governance-test-001-report.md`). The refactor decision is open and has not been
  made. When it is made, record it as a new entry that supersedes this one.

## FSA-DEC-007

- **Date:** 2026-08-20
- **Decision:** An anti-template audit is added to the writing process as **Lens 1B** of the
  Reader Experience Review. It imports the anti-template rules and the transplant test from
  Dalia's author reasoning profile (`my-writing-style`), scoped to educational articles, and
  runs on every article from now on.
- **Owner:** Dalia (instructed in session, 2026-08-20: "re-run the audit from a different
  lens to catch and rewrite typical ai words, sentences, or structures. my voice should be
  unique. add this to the process when writing future articles")
- **Reason / evidence:** The pilot voice audit and the author profile's banned-intensifier
  list independently converged on the same words (`quietly`, `simply`, `actually`,
  `genuinely`), which is evidence the list is right. A first run found 26 template hits in
  FSA-ARTICLE-000, 13 in 001 and 13 in 002, including one construction (a quoted
  self-blaming question followed immediately by its reframe) repeated six times across the
  three articles. Full findings: `docs/fsa-anti-template-audit-000-001-002.md`.
- **Files / systems affected:** new
  `skills/fsa-educational-writer/references/fsa-anti-template-audit.md`; Lens 1B registered
  in `references/fsa-reader-experience-review.md`; the writing-audit checklist in
  `docs/fsa-gold-standard-rubric.md`.
- **Supersedes:** in part, the pilot voice audit's ruling that the "it stops being X and
  becomes Y" frame should be kept in FSA-ARTICLE-001 and removed only from 000. Under Lens
  1B the frame is a template in either article. **This reversal is pending ratification
  (AT-3).**
- **Status:** active
- **Note on the v1.0 freeze.** The writer skill's constitution is frozen, and the default
  answer to "should the engine change?" is No. This change is made **by owner instruction,
  not on AI initiative**, and it is recorded here rather than applied quietly. Two genuine
  collisions between the new lens and the frozen 13-part structure are documented at the end
  of `fsa-anti-template-audit.md` and are unresolved: C-1 (the mandated mental model is an
  aphorism by construction) and C-2 (the misconception method is currently implemented as
  the exact question shape the lens bans).

## FSA-DEC-008

- **Date:** 2026-08-20
- **Decision:** An **economics concept audit** is added to the reviewers feeding the
  educational review gate. It reads a brief or draft as an economist in the Austrian
  tradition, and recommends improvements to how the economics is taught. It runs at Mode 1
  (editorial brief) and Mode 3 (finished draft), on every article.
- **Owner:** Dalia (instructed in session, 2026-08-20: "can you add a rule where an austrian
  economic expert agent audits and suggests improvements to the content when created?")
- **Reason / evidence:** The draft review gate in
  `TSA/standards/content-operating-system.md` runs three independent reviews:
  educational-effectiveness, Bitcoin technical audit, and content-and-context logic. For FSA
  Money Ideas the Bitcoin slot almost never applies, so **a library that teaches economics
  was reaching approval with nobody auditing it as economics**, while rubric dimension 1
  requires that "a specialist would not wince." The first run
  (`docs/fsa-austrian-audit-000-001-002.md`) found no concept error in any of the three
  drafted articles and five recommended precision improvements, two of which convert a
  dignity claim the article currently asserts into one it establishes.
- **Files / systems affected:** new
  `skills/fsa-educational-writer/references/fsa-austrian-economics-audit.md` (canonical spec);
  new `.claude/agents/austrian-economics-auditor.md` (invocable subagent); reviewers section
  added to `docs/fsa-article-editorial-workflow.md`.
- **Supersedes:** nothing. It fills an empty slot rather than replacing a reviewer.
- **Status:** active
- **Scope limits, which are the substance of this decision.** The reviewer is **advisory**
  and may not rewrite, score, or approve. It is barred from recommending policy positions,
  school-partisan framing, contested theory presented as settled, or any objection to a
  source based on who published it. FSA's preference for government and central-bank sources
  stands, and FSA-ARTICLE-002's Federal Reserve Education citation stands. Where the reviewer
  conflicts with the voice standard, the source standard, the dignity rule, or the frozen
  13-part structure, those win and the conflict is recorded. Governing test: would the change
  help a reader make a better decision this month, using only what is in front of them.
- **Note on the v1.0 freeze.** As with FSA-DEC-007, this changes the writing process by
  **owner instruction, not AI initiative**, and is recorded rather than applied quietly.
- **New directory.** `.claude/agents/` did not previously exist in this repo. Creating it
  establishes a convention. Reversible: delete the directory and the reviewer still runs from
  its reference spec.

---

## Open decisions awaiting the owner

Not decisions. Listed here so that the log shows what it is waiting for. Move each into
a numbered entry above at the moment it is decided, and delete its line from this
section.

| Ref | Question | Blocking | Evidence |
|---|---|---|---|
| OPEN-A | Where does "repay debt" sit in Live / Prepare / Protect / Grow? | FSA-ARTICLE-002 advancement | draft audit, unresolved item 1 |
| OPEN-B | Outcome of the manual YNAB similarity review, and whether the title stays | FSA-ARTICLE-002 advancement | draft audit, unresolved item 2; originality standard |
| OPEN-C | Gold Standard Rubric calibration verdict on FSA-ARTICLE-000 and FSA-ARTICLE-001 | all publication | `docs/fsa-pilot-collection-retrospective.md`, Recommended next step |
| OPEN-D | Canonical authority for article production (backlog item C1) | nothing today; every future session | `docs/governance-test-001-report.md`, C1 |
| OPEN-E | The `slug -> body` renderer refactor (backlog item H3), now that the trigger has fired | nothing today | observations log 2026-07-18; H3 |
| OPEN-F | Accept, reject or edit the Lens 1B rewrites of 000, 001 and 002 (AT-1, AT-2) | all three articles | `docs/fsa-anti-template-audit-000-001-002.md` |
| OPEN-G | Ratify removing the "it stops being X and becomes Y" frame from both articles, reversing the pilot voice audit (AT-3) | library-wide | same |
| OPEN-H | C-1: is the mandated mental model the article's one permitted compressed line? (AT-4) | frozen structure | `fsa-anti-template-audit.md` |
| OPEN-I | C-2: does the misconception method stop using the quoted-question-plus-reframe shape? Same question as CAL-6, now with a rule attached (AT-5) | frozen structure, all articles | same |
| OPEN-J | Accept or reject the five economics-audit findings AE-1 to AE-5 | 000, 001, 002 | `docs/fsa-austrian-audit-000-001-002.md` |
| OPEN-K | If time preference is named (AE-1), does 000 introduce it and 001 reuse it, or does each name it independently? | 000 and 001 | same, finding B1 |
