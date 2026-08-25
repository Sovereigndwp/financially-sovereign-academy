# FSA Money Ideas — Recovered State and Growth-Engine Decision Package

Recovery pass run 2026-08-20 against `~/projects/financially-sovereign-academy`.
No production edits were made. No files were restored, reset, discarded, refactored,
reformatted, approved, published, committed, merged, or pushed.

---

## 1. Executive finding

**What was built.** Between 2026-07-16 and 2026-07-18, five commits produced a complete
educational publishing institution: a 26-record registry with a single source of truth
(`scripts/library_data.py`), a deterministic generator, an 11-state editorial lifecycle
with two hard human gates, a source-governance system with evidence tiers and stub
detection, an originality standard, a public-visibility rule enforced by three passing
test suites, a 100+ file writer skill frozen at v1.0, an append-only production
observations log, a pilot retrospective, and a self-audit that scored the institution at
13 of 16 stations without guessing. All three suites still pass today, and the build is
still byte-for-byte deterministic. **This system is in better condition than the brief
assumed. Preserve it.**

**Where work stopped.** On 2026-07-18, mid-way through the third article. The work did not
stop because something broke. It stopped exactly where the institution is designed to stop:
`status: drafted` / `reviewStatus: human-review-required`, with two decisions reserved for
a human that were never made. The two July 18 audit documents were written, filed, and never
committed. Then attention moved to the Trump Account / kits MVP on 2026-07-25 and never
came back.

**Three findings that change the framing of the request.**

1. **Money Ideas is not stranded on a feature branch. It is already merged to `main` and
   live in production.** PR #104 merged `feat/kits-mvp-001` (which carries all five Money
   Ideas commits) into `main` on 2026-07-26, and Vercel deployed it to
   `financiallysovereign.academy`. Verified live today: the library index says "Nothing is
   published yet," and the individual article pages are reachable at their direct URLs
   serving `robots: noindex` with a visible DRAFTED banner. **Deployment and publication are
   already decoupled, and the gating works in production.** That is the single most valuable
   property this system has, and it makes the launch experiment cheap: shipping a draft to
   production is already safe.

2. **The only Money Ideas work outside version control is Article 002 and its two audit
   documents.** There is no Trump Account work in the uncommitted set at all. The
   "accidentally embedded in `feat/kits-mvp-001`" problem is real but far smaller than
   feared — the two branches touch disjoint file sets, so separation is mechanical.

3. **The local repository has not fetched from GitHub since 2026-07-17 17:59 UTC.** Every
   local `origin/*` ref is 34 days stale, and `git status -b` reports the branch as in sync
   when it is not. Nothing in this recovery depends on those refs, but **any Git operation
   must begin with `git fetch`.**

**What is actually blocking.** Not the third-elif refactor, not the governance backlog, and
not the article. The retrospective's own "recommended next step" — Dalia's editorial
calibration review of Articles 000 and 001 against the Gold Standard Rubric — was requested
on 2026-07-17 and has never happened. Everything downstream (approving 000, approving 001,
folding calibration into the standard, then Economic Thinking) waits on one sitting.

---

## 2. Preservation record

| Item | Value |
|---|---|
| Repository | `/Users/dalia/projects/financially-sovereign-academy` |
| Branch | `feat/kits-mvp-001` |
| HEAD | `85fce0591e456cc3b857770a1018409ae63570b0` |
| HEAD commit | "Narrow free-vs-paid copy so paid kits don't read as bait-and-switch", 2026-08-19 08:42:14 -0400 |
| Staged changes | none (`staged-modifications.patch` is 0 bytes) |
| Modified tracked | 8 files |
| Untracked | 4 paths |
| Index locks present at start | none |

**Snapshot location:** `financially-sovereign-academy/_recovery/2026-08-20-money-ideas/`

```
MANIFEST.sha256                       20 files, all verified
tracked-modifications.patch           475 lines, HEAD -> working tree
staged-modifications.patch            0 bytes (nothing staged)
meta/HEAD.sha  meta/branch.txt  meta/recent-commits.txt
meta/git-status.porcelain.txt  meta/diff-stat.txt  meta/untracked-files.txt
modified-current/<8 files>            byte copies of the current dirty files
untracked/<4 files>                   byte copies of the untracked files
```

**Reversibility verified, not assumed.** The eight HEAD blobs were extracted to a scratch
directory, `tracked-modifications.patch` was applied, and each result was compared with
`cmp` against the live working tree. All eight matched. `git apply --check` passed cleanly
first. Result: **HEAD + patch reconstructs the working tree byte-for-byte.**

**One repo-local change was made, and it is disclosed here.** `_recovery/` was appended to
`.git/info/exclude` so the snapshot does not dirty `git status`. This file is not tracked by
Git and no tracked file was touched. Remove the line if you would rather see the folder in
`status`.

**Modified tracked files (8):**

| File | Δ |
|---|---|
| `articles/article-library.json` | 32 |
| `articles/money-decisions/every-dollar-has-four-jobs.html` | 110 |
| `articles/money-decisions/hidden-cost-of-free.html` | 2 |
| `articles/money-decisions/why-saving-money-feels-so-hard.html` | 4 |
| `articles/sources/every-dollar-has-four-jobs.sources.md` | 45 |
| `docs/fsa-production-observations-log.md` | 27 |
| `scripts/build.py` | 36 |
| `scripts/library_data.py` | 24 |

**Untracked (4):** `docs/fsa-article-002-draft-audit.md`,
`docs/governance-test-001-report.md`, `scripts/four_jobs_content.py`,
`modules/.claude/settings.local.json` (tooling — leave untracked per the repo's
untracked-items policy).

**Committed July baseline.** `ac99ceb` (07-16) → `93b4fec` (07-16) → `99000eb` (07-16) →
`5d8411d` (07-17) → `a2fbaaf` (07-17, "establish FSA publishing engine v1 and complete pilot
collection"). Branch `feat/fsa-money-ideas` still points at `a2fbaaf`, locally and on origin.
`feat/kits-mvp-001` branches directly off `a2fbaaf`, so the Money Ideas history is intact and
linear inside it.

**Verification that the recovery pass changed nothing.** `git status --porcelain` was
re-read after running all three validator suites and after a full out-of-tree rebuild; the
dirty set was identical. `shasum -c MANIFEST.sha256` re-verified clean.

---

## 3. Article 000–003 status

Health checks run today against the current (dirty) tree, on the device:
`validate_articles.py` **PASS** (26 articles, 32 pages scanned, 0 public);
`test_source_persistence.py` **4/4 PASS**; `test_public_visibility.py` **PASS**.
`build.py` re-run to a scratch directory reproduces **every HTML page byte-identically** —
the rendered pages on disk are in sync with the code and registry, with nothing hand-edited.

### FSA-ARTICLE-000

| | |
|---|---|
| Title / slug | "The Most Expensive Word in Personal Finance: 'Later'" · `the-most-expensive-word-is-later` |
| Drafting state | Complete, ~1,200 words, 13-part structure. Body: `scripts/later_content.py` (committed `a2fbaaf`) |
| Registry state | `status: drafted`, `reviewStatus: human-review-required`, `initialCollection: true`, `featured: true` |
| Review state | Draft self-audit + voice audit + reading copy filed (`docs/pilot-*.md`). **Human calibration review never run.** |
| Source state | Complete researched source file. No dated Tier B claim. |
| Rendered state | Generated, deterministic, in sync |
| Public visibility | **Deployed to production**; reachable at its direct URL with DRAFTED banner + `robots: noindex`; absent from library index, series pages, and sitemap. Verified live 2026-08-20. |
| Unresolved human decisions | (1) Dalia's Gold Standard Rubric calibration verdict. (2) Fact-check confirmation. (3) Both review gates. |
| Safe to advance? | **No** — but it is the closest to ready of the four, and it is blocked on one sitting, not on work. |
| Required before advancement | Calibration review → fold any changes into the standard → fact-check → educational gate → accessibility gate (**no instrument exists — see M4**) → approve → rebuild → deploy. |

### FSA-ARTICLE-001

| | |
|---|---|
| Title / slug | "Why Saving Money Feels So Hard" · `why-saving-money-feels-so-hard` |
| Drafting state | Complete (the original prototype, audited and its evidence gap closed at `99000eb`). Body: `scripts/prototype_content.py` |
| Registry state | `status: drafted`, `reviewStatus: human-review-required` |
| Review state | Audited in the pilot (`skills/fsa-educational-writer/TEST-why-saving.md`, `docs/pilot-why-saving-reading-copy.md`). **Human calibration review never run.** |
| Source state | Complete researched source file; evidence gap closed 07-16. No dated Tier B claim. |
| Rendered state | Generated, in sync. The working tree modifies this page **only** to ripple Article 002's new title into two related-links — no content change. |
| Public visibility | Same as 000: deployed, direct URL, DRAFTED banner, `noindex`, not linked. |
| Unresolved human decisions | Same three as 000. |
| Safe to advance? | **No.** Same single upstream blocker. |

### FSA-ARTICLE-002

| | |
|---|---|
| Title / slug | "Every Dollar Has Four Jobs. Which One Is Yours Doing?" · `every-dollar-has-four-jobs` (slug and ID held stable through the retitle — correct behaviour) |
| Drafting state | Complete, 1,397 words, all 13 parts, **uncommitted**. Body: `scripts/four_jobs_content.py` (untracked) |
| Registry state | `status: drafted`, `reviewStatus: human-review-required` — **uncommitted** (`library_data.py` + generated `article-library.json`) |
| Review state | Mode 3 self-audit filed at `docs/fsa-article-002-draft-audit.md` (untracked). Rubric 9× 5/5, 1× 4/5. The 4 is Originality, and it is 4 **because** the YNAB review has not been run. |
| Source state | Complete, 3 Tier A citations, zero Tier B. One citation URL (Thaler 1999 DOI) machine-unverifiable, flagged rather than asserted. |
| Rendered state | Generated, in sync with the uncommitted code |
| Public visibility | **The live page is still the old PLANNED placeholder** with the old title, because this work was never committed or deployed. Verified live 2026-08-20. |
| Unresolved human decisions | **2 material blockers** + 3 optional refinements — see §6 |
| Safe to advance? | **No.** Blocked by two decisions only Dalia can make. |
| Required before advancement | Rule on Protect/debt mapping; run the YNAB similarity review; then commit → fact-check confirmation → both gates. |

### FSA-ARTICLE-003

| | |
|---|---|
| Title / slug | "The Hidden Cost of 'Free'" · `hidden-cost-of-free` |
| Drafting state | **Not drafted.** No body module exists. |
| Registry state | `status: planned`, `reviewStatus: not-started`, `featured: false`, `initialCollection: false` |
| Review state | None. No Mode 1 brief exists. |
| Source state | Stub (valid for a non-public article) |
| Rendered state | Planned-placeholder page. The working tree modifies it **only** to ripple 002's title into a related link. |
| Public visibility | Deployed as a PLANNED placeholder, `noindex`, not linked. |
| Safe to advance? | **Not applicable — there is nothing to advance.** |
| Required before advancement | A Mode 1 editorial brief, then a decision to write it. Realistically 3–5 weeks out. |

> **Correction to the request's premise.** The task assumed Articles 000–003 were a
> four-article drafting cohort. They are not. 000, 001, 002 are drafted; **003 is untouched**.
> The registry's `initialCollection` flag confirms the intended pilot cohort is 000, 001, 002
> and 004/005 — not 003. Any "finish 000–003" plan should read "finish 000–002."

---

## 4. Unfinished-file reconstruction

### `articles/article-library.json` — generated output, MODIFIED
Rebuild artifact only. Counts moved `drafted: 2 → 3`, `planned: 24 → 23`; the 002 record
picked up the new title, status, reviewStatus, refined misconception/coreQuestion/
mentalModel/learnerOutcome, `supportingConcepts` (`budgeting` → `opportunity cost`,
`constraints`), three added `fsaModules`, and the `reentry` audience. **Complete and
consistent.** Do not hand-edit; it regenerates from `library_data.py`.

### `scripts/library_data.py` — authoritative source, MODIFIED
The single edit point. Same field changes as above, plus a four-line comment recording the
provenance of the change (brief adopted; taxonomy set by Dalia 2026-07-18). ID and slug held
stable through a title change, and the build correctly rippled the new title into 001's and
003's related-links with zero link breakage. **Complete.** No unresolved decision in the file
itself; the unresolved decisions are about the content it points at.

### `scripts/four_jobs_content.py` — authoritative source, UNTRACKED, NEW
The Article 002 body: 11 keys (`slug`, `opening`, `common_belief_html`, `actually_html`,
`scenario_html`, `mental_model`, `boundary_html`, `why_html`, `look_html`, `try_html`,
`closing_question`) — **exactly the same schema as `prototype_content.py` and
`later_content.py`.** Complete, hand-written, not generated. This is the third hardcoded body
module and the trigger event of §8. **Its untracked status is the single largest preservation
risk in the repository: it is the only copy of a finished 1,397-word article, and it is not in
Git.** (It is now also in the recovery snapshot.)

### `scripts/build.py` — implementation code, MODIFIED
Two additions, both faithful copies of the existing pattern: a third `elif` in
`sources_section()` (line 272) and a third `elif` in `render_article()` (line 383), plus the
import. **Complete and deliberately un-refactored** per the v1.0 freeze. Nothing half-migrated.

### `articles/money-decisions/every-dollar-has-four-jobs.html` — generated, MODIFIED
Full drafted page replacing the placeholder scaffold. Banner `PLANNED → DRAFTED`, `noindex`
retained, real sources box, four module links. Reproduces byte-identically from source.
**Complete.** One reader-facing defect: the DRAFTED banner reads *"This is a working draft
using temporary content"* — untrue for all three drafted articles, and these pages are
publicly reachable. Cheap fix; logged as G3 in §9.

### `.../hidden-cost-of-free.html` and `.../why-saving-money-feels-so-hard.html` — generated, MODIFIED
Title-ripple only (2 and 4 lines). No editorial change. Evidence the registry-driven build
works as designed.

### `articles/sources/every-dollar-has-four-jobs.sources.md` — authoritative research, MODIFIED
Stub → complete. Three Tier A claims with full citation rows; a note explaining why the
boundary-case comparisons are arithmetic relationships and not Tier B; two labelled FSA
illustrations; an explicit "no dated numeric claim" declaration citing Dalia's 07-18 decision;
and a review note recording the taxonomy decision and flagging the Protect/debt mapping.
**Complete.** Two open items: the Thaler 1999 DOI needs human confirmation, and the header
`Status:`/`Review status:` lines are hand-synced from the registry (the known drift risk, M2).

### `docs/fsa-production-observations-log.md` — governance, MODIFIED
Five appended 07-18 observations: third-elif trigger reached; roadmap ambiguity; decisions
have no on-repo home; `docs/proposed-briefs/` has no lifecycle; canonical-context chain
unreachable. **Complete and correctly append-only.** Every one of the five was independently
re-confirmed by this recovery pass.

### `docs/fsa-article-002-draft-audit.md` — audit evidence, UNTRACKED, NEW
The Mode 3 handoff audit. Records provenance of four Dalia decisions, ten rubric scores with
reasoning, the writing-audit checklist, the originality note, the Reader Experience Review
("change nothing"), and five unresolved human decisions. **Complete.** It states its own
authority correctly: *"This audit recommends; it does not approve."*

### `docs/governance-test-001-report.md` — audit evidence, UNTRACKED, NEW
The full-lifecycle institutional audit: a 16-station execution log, a station-by-station
YES/PARTIALLY/NO assessment, the C1/H1–H4/M1–M4/L1–L3 backlog, and a "yes, conditionally"
verdict. **Complete.** The single most valuable unfinished artifact in the set, and the
document this entire recovery request was really reaching for.

### `modules/.claude/settings.local.json` — tooling, UNTRACKED
Editor config. Out of scope. Leave untracked.

---

## 5. Recorded human decisions

All attributable to Dalia, all made in working session, **none in a canonical on-repo
decisions registry** — which is exactly why they had to be reconstructed here.

| # | Date | Decision | Recorded in | Applied in |
|---|---|---|---|---|
| D1 | 2026-07-18 | FSA-ARTICLE-002 selected as the next article, over beginning Economic Thinking (adjudicating a three-way roadmap conflict) | draft audit §Provenance; governance report §2 | `library_data.py` |
| D2 | 2026-07-18 | The Mode 1 brief's registry refinements adopted (title, misconception, coreQuestion, mentalModel, learnerOutcome, supportingConcepts, audiences) | draft audit §Provenance | `library_data.py`, rendered page |
| D3 | 2026-07-18 | **Four-jobs taxonomy = Live / Prepare / Protect / Grow.** Dalia's own naming, replacing both the brief's "cover now / wait / repay / grow" and the record's implied "cover / hold / protect / grow" | draft audit §Provenance; source file §Review note | article body, registry brief |
| D4 | 2026-07-18 | Tier B emergency-expense statistic **excluded**; the scenario carries the point. Stated as a general rule: *statistics are used only when they materially strengthen the lesson* — the SHED figure is time-bound, jurisdiction-specific, maintenance-heavy, unnecessary | draft audit §Provenance; source file §Statistics | article body, source file |
| D5 | 2026-07-17 | Educational Publishing capability charter v0.1 approved (Proven tier); Economic Thinking approved as Pilot A | `TSA/institution/capabilities/charters/educational-publishing.md`; `TSA/projects/economic-thinking/PROJECT-BRIEF.md` | TSA institution layer |
| D6 | 2026-07-17 | Do **not** generalize the build engine for the pilot; extend the per-article pattern so the duplication cost is visible | retrospective §Engine recommendations ("Per your instruction, I did NOT generalize…") | `build.py`, `later_content.py` |

**D4 is the most reusable of these** and deserves promotion from an audit footnote to a
standing editorial rule — it is what keeps the whole library evergreen and maintenance-free.

**Note on D5.** The 07-18 production session recorded that the TSA brain was unreachable and
its FSA memory stale. Both TSA artifacts above were created 2026-07-17, one day earlier, and
**do exist today** in `~/Documents/Claude/Projects/TSA`. The content existed; the pointer did
not resolve. That materially changes the C1 fix — see §9.

---

## 6. Unresolved human decisions

### True blockers — Article 002 cannot advance

**B1. Where does repaying debt live in Live / Prepare / Protect / Grow?**
Dalia set the taxonomy but did not specify the mapping. The draft places debt repayment under
**Protect** ("defending what you have from interest running against you, alongside keeping
coverage"). If Protect is meant as insurance-only, the body's job definitions and the boundary
case each need one edit. This is a genuine taxonomy judgment, not a writing choice — it
propagates to every future article that references the four jobs. *Do not resolve silently.*

**B2. Manual similarity review against YNAB's "give every dollar a job."**
Required by the Mode 1 brief and by the originality standard; it is a human step and it has
not happened. It is the sole reason the Originality rubric score is 4 rather than 5, and the
audit states plainly: *"Approvable at 4 only after that review passes."* The mitigations are
already documented (the article never uses the phrase; the title asks which job a dollar is
*already* doing; the core move — constraint first, assignment second — is the inverse of the
slogan's instruction). What remains is the human judgment on whether the title's noun-phrase
territory is close enough to change. *Do not resolve silently.*

### System-level blocker — nothing can be published

**B3. The Gold Standard Rubric calibration review of Articles 000 and 001.**
The retrospective's explicit "Recommended next step," dated 2026-07-17, never performed. It
is upstream of approving 000, upstream of approving 001, upstream of folding calibration into
the writer standard, and upstream of Economic Thinking. **This is the real stopping point of
the pilot, and it is one sitting of reading.**

**B4. The accessibility review gate has no instrument.**
One of the two mandatory gates. The gate exists as a lifecycle state and the validator
enforces `reviewStatus: approved` before public rendering, but there is no article-level
accessibility checklist to execute against. Today the gate means "a human looks," with
nothing that can fail. **No article can honestly pass it until the instrument exists.**
(The module-level checklist in `FSA-Institutional-Projects` is ~90% reusable.)

### Optional refinements — visible, not blocking

- **O1.** Confirm the Thaler 1999 DOI resolves to "Mental Accounting Matters." The citation
  (author, journal, year) is established; only the URL was machine-unverifiable.
- **O2.** Rhetorical-question precedent: 002 uses the same two-quoted-questions pattern the
  two pilot articles shipped with. Confirm the precedent, or set a stricter line for the
  series. Flagged deliberately so it is judged rather than inherited silently.
- **O3.** Boundary-framing sign-off (carried from the brief): confirm the no-surplus case
  reads as structural reality rather than personal failing, and that nothing crosses into
  individualized advice.
- **O4.** One candidate line of personification — *"Grow will matter someday, and it politely
  says so"* — left in for a human to strike if it reads as visible writing.

---

## 7. Publishing-history check

**No evidence found that FSA Money Ideas Articles 000–003 were previously published on
Substack.**

Repository evidence:

- One Substack reference exists across all tracked files: `llms.txt:71` lists
  `https://sovereigndwp.substack.com/` as the newsletter. No article text, no canonical URLs
  pointing off-site, no publication dates, no promotional assets, no distribution log.
- No newsletter, Mailchimp, Beehiiv, ConvertKit, or Buttondown integration anywhere in the
  Money Ideas system.
- No Money Ideas slug appears in `sitemap.xml`. `robots.txt` has no Money Ideas rules; the
  pages carry per-page `noindex` instead.
- Grep across the TSA brain, the hub repo, and the monorepo returns Money Ideas references
  only in TSA governance artifacts (the capability charter, the Economic Thinking brief, and
  the 07-18 expedition registers) — planning documents, not distribution records.

Mailbox evidence (independent confirmation):

- Dalia's own Substack posts between 2026-05 and 2026-08 are identifiable from Substack's
  own confirmation mail (`no-reply@substack.com`, "Stats for your post" / "Shareable assets
  for"). Twelve distinct posts: *Claude Just Recovered 5 Bitcoin*, *When the "safe asset" has
  to pay more for trust*, *The AI Didn't Steal Your Key*, *Visible Capital has One Weakness*,
  *The Line Was Short, So I Said Yes*, *The Physics of a Country Stuck in Place*, *The
  Fossilized Ledger*, *A mi papá de 90 años le congelaron el bitcoin*, *Nobody Lied to 108
  Million Colombians*, *Ownership Is an Illusion Until the Proof Lives With You*, *102 Unread
  Messages*, *They Built a Tent*. **None is an FSA Money Ideas article.** All are Bitcoin /
  sovereignty essays in a personal register.
- Two posts fall inside the July 16–18 production window (*Nobody Lied to 108 Million
  Colombians*, ~07-15; *Ownership Is an Illusion*, ~07-20). Neither is a Money Ideas article.
- The publication passed 100 subscribers on 2026-07-29.

**Publication that did occur — and was not previously recorded.** All three drafted articles
have been **deployed to production since 2026-07-26** (PR #104 merge, Vercel production
deployment `dpl_HKzLZ…`, commit `3be78bb`). Confirmed live today:
`/articles/foundations/the-most-expensive-word-is-later.html` serves the full drafted article
behind a DRAFTED banner with `noindex`; `/articles/` says "Nothing is published yet."
**This is deployment inside the visibility gate, not publication** — the institution's own
definition of published (`reviewStatus: approved`, no banner, indexable) has not been reached
by any article. But it means the word "published" needs to be used carefully from here: the
pages are on the public internet at stable URLs today.

---

## 8. Third-elif architecture decision

**Did the trigger fire? Yes — and it was recorded correctly at the time.**

The July 17 retrospective set the trigger precisely: *"generalize to a `slug -> body` content
registry (`article_bodies.py`) and a single generic renderer. Trigger: the moment we would
write a third `elif`. Not before."* The 07-18 observations log records the trigger as reached,
and the governance report reproduces it as H3.

**What actually happened, measured today:**

- `scripts/four_jobs_content.py` **is** the third hardcoded body module. Confirmed.
- `build.py` gained a third branch in **two** functions, not one:
  `sources_section()` at lines 252 / 262 / **272**, and `render_article()` at lines 293 /
  358 / **383**. There are also two `PROTOTYPE`-specific special cases (lines 293 and 714,
  the latter in `render_source`). So the real duplication is **six near-identical branches
  across two functions plus two special cases**, not three branches.
- The per-article `<h2>` headings are still hardcoded inside `build.py` alongside the
  dispatch, exactly as the retrospective's item 2 predicted.
- **No refactor was begun.** There is no `article_bodies.py`, no registry dict, no generic
  renderer, no partial migration, no dead code. The uncommitted work is a **third
  implementation of the old pattern**, deliberately faithful to it under the v1.0 freeze —
  which is the correct behaviour under D6.

**One measurement the July analysis did not have, and it makes the decision easier.** All
three body modules expose an **identical 11-key schema**. The refactor is therefore not a
redesign; it is roughly:

```python
BODIES = {m["slug"]: m for m in (PROTOTYPE, LATER, FOUR_JOBS)}
```

plus moving four `<h2>` heading strings per article into the body modules, plus collapsing
the two dispatch sites. Small, mechanical, and fully covered by the existing byte-for-byte
build-determinism check. **The cost of doing it has not grown; the cost of deferring it has
not grown either, because the next real step adds no fourth `elif`** — the next step is
humans reviewing three already-drafted articles.

**Recommendation (see §9, H3):** defer with a hard bound. Do not refactor during the recovery
and publication push. Refactor before the fourth body module is written, or before any batch
of more than two articles — whichever comes first. Doing it now buys nothing a reader can
see, and it would put a code change on top of an already-unusual Git situation.

---

## 9. Governance backlog reassessment

Classification is against the new question — *what is the minimum governance required for a
trustworthy publishing experiment* — not against completeness.

### C1 — Broken canonical-context chain · **REQUIRED BUT SHOULD CHANGE**
The problem is real and reproduced today: three documents instruct every session to read
`TSA/MEMORY.md` and `standards/content-operating-system.md` first, and the 07-18 session
could not reach them. But the July diagnosis ("fix the pointer") is now less right than the
July report's own alternative. Two facts changed it: (a) the run proved FSA-local governance
is *sufficient* to produce a 10/10-station article; (b) the TSA institution layer that was
"missing" — the Educational Publishing charter and the Economic Thinking project brief — was
created on 2026-07-17 and **exists on disk today**. So the correct fix is not a path repair,
it is a **delegation**: formally state that FSA-local docs hold canonical authority for
article production, and that the TSA pointer governs strategy, boundaries, and capability
tiering only. One paragraph in `CLAUDE.md`, with the run as the evidence.

### H1 — No canonical "next asset" pointer · **REQUIRED BUT SHOULD CHANGE**
Real: three roadmap signals disagreed and a human had to adjudicate. But under the growth
model in §11, "next" should be chosen by demand evidence, not by registry order — so a static
`nextUp` flag would just be a fourth voice. What is needed is a **queue with a written
reason**: one line naming the next article and *why it is next*. That line is where the
demand hypothesis gets recorded, which makes it the cheapest possible version of Phase 9.

### H2 — No decisions registry · **STILL REQUIRED**
The highest-value item on the list, and this recovery pass is the proof. Six human decisions
had to be reconstructed today from an untracked audit file, a source-file footnote, and an
observations log. An append-only `docs/fsa-decisions-log.md` (date · decision · by whom ·
where applied · what it supersedes) would have made §5 of this report a file read instead of
a forensic exercise. Cost: 20 minutes and a backfill of the six decisions above.

### H3 — slug→body renderer refactor · **DEFER (bounded)**
See §8. Real, cheap, and correctly triggered — but it is invisible to readers, produces no
evidence, and the next three steps add no fourth branch. Bound: **before body module #4, or
before any batch larger than two articles.** Record the bound in the observations log so the
deferral does not silently become permanent.

### H4 — TSA-level memory stale for FSA · **REQUIRED BUT SHOULD CHANGE**
Partly self-resolved: the capability charter and Pilot A brief now exist. What remains is not
content but a **trigger**: define the moment production updates the family brain. Recommend
"at each series retrospective, and at any owner decision that binds future articles" — which
folds neatly into H2, since the decisions log is what would be summarized upward.

### M1 — `docs/proposed-briefs/` has no lifecycle · **DEFER**
Real (the adopted 002 brief still reads "proposed" and now half-disagrees with the registry
it refined). One `status: adopted 2026-07-18` line in the brief header closes it. Do it when
002 is closed out, not as a project.

### M2 — Source-file headers drift from the registry · **DEFER, then change the fix**
Observed twice (07-17, 07-18). But the July fix — have `build.py` stamp the headers — writes
into a file whose whole purpose is that the generator must not overwrite researched content.
Prefer the safer half of the original proposal: **have `validate_articles.py` flag a
mismatch.** No writes, and it fails loudly. Not needed before article #1.

### M3 — Review artifacts have no naming/location convention · **DEFER**
Cosmetic today (three audits in three places). Becomes real at ~10 articles.

### M4 — Accessibility gate has no article-level instrument · **STILL REQUIRED — and it is a publication blocker**
The one Medium that is actually critical. Accessibility review is one of two mandatory gates;
`validate_articles.py` will refuse to render publicly without `reviewStatus: approved`; and
that status cannot honestly be set by passing a gate that has no instrument. **No article can
be published until this exists.** The module-level checklist is ~90% reusable — this is an
adaptation, not a build.

### L1 — `REVISION_DATE` vs source-file "Last updated" · **DEFER** (rides M2)

### L2 — Stray `Type` file at repo root · **DEFER** (still present today; trivial)

### L3 — Validator does not sanity-check `readingMinutes` vs word count · **DEFER now, REQUIRED once traffic exists**
Harmless today. But `readingMinutes` becomes a reader promise the moment articles are
indexed, and it is the denominator for any engagement metric. Promote when the launch
experiment starts. (002 is 1,397 words against `readingMinutes: 6` — plausible at ~230 wpm,
tight at 200.)

### New items this recovery adds

**G1 — Local Git refs are 34 days stale · CRITICAL (operational).** Last fetch 2026-07-17
17:59 UTC. `origin/main` locally reads `1d45b22` (2026-07-08); the real `main` has since
absorbed PR #104. `git status -b` currently reports `feat/kits-mvp-001` as in sync with
origin, which cannot be relied on. **Every Git sequence in §10 begins with `git fetch`.**

**G2 — No check on what is actually deployed · HIGH.** The last production deployment is
`3be78bb` (2026-07-26). Two later commits on `feat/kits-mvp-001` — `205eeb6` (filing rule,
docs-only) and `85fce05` (2026-08-19, "Narrow free-vs-paid copy so paid kits don't read as
bait-and-switch") — have **not** reached production. Verified: the live `/kits/` page still
serves the pre-fix wording, without the "Optional paid kits add specialized decision tools"
clarification. That is a free-vs-paid honesty fix sitting unpublished for a day. It is
outside this recovery's scope, but you should know.

**G3 — DRAFTED banner text is inaccurate on publicly reachable pages · MEDIUM.** The banner
reads *"This is a working draft using temporary content."* For 000, 001 and 002 the content
is real, finished, sourced prose — not temporary. These pages are reachable at stable public
URLs today. One string in `build.py`.

---

## 10. Git separation plan

**Nothing below has been executed. It requires your approval.**

### Classification of the current uncommitted changes

| Bucket | Files |
|---|---|
| **A. Trump Account / kits MVP** | **None.** All kits work is already committed (`9a168b3`, `c2db854`, `85fce05`). |
| **B. Money Ideas article production** | `articles/article-library.json`, `articles/money-decisions/every-dollar-has-four-jobs.html`, `.../hidden-cost-of-free.html`, `.../why-saving-money-feels-so-hard.html`, `articles/sources/every-dollar-has-four-jobs.sources.md`, `scripts/four_jobs_content.py` |
| **C. Shared FSA infrastructure** | `scripts/build.py`, `scripts/library_data.py` — engine files, but every line changed serves Money Ideas only. Commit them with B. |
| **D. Governance / recovery** | `docs/fsa-production-observations-log.md`, `docs/fsa-article-002-draft-audit.md`, `docs/governance-test-001-report.md` |
| **E. Tooling (leave alone)** | `modules/.claude/settings.local.json` — untracked, stays untracked |

**The separation is clean.** The two post-merge kits commits touch `CLAUDE.md`,
`index.html`, `calculators/index.html`, `kits/index.html`, and
`kits/trump-account-family-decision-guide.html`. **Zero overlap** with the eight dirty files
(verified by set intersection). So the uncommitted work can be carried onto a branch rooted
at `origin/main` without conflict.

### Recommended sequence — run on your Mac, in a normal terminal

```bash
cd ~/projects/financially-sovereign-academy

# 0. Clear any sandbox git residue (safe no-ops if absent)
rm -f .git/*.lock .git/objects/*/tmp_obj_* 2>/dev/null
git gc --prune=now

# 1. Refresh the 34-day-stale refs — DO THIS FIRST
git fetch origin --prune
git log --oneline -3 origin/main        # expect 3be78bb, the PR #104 merge

# 2. Confirm the working tree still matches the recovery snapshot
git status --porcelain                  # expect the same 8 M + 4 ??
shasum -a 256 -c _recovery/2026-08-20-money-ideas/MANIFEST.sha256

# 3. Bring local main up to date (should fast-forward; if it refuses, STOP and ask)
git switch main && git merge --ff-only origin/main
git switch feat/kits-mvp-001

# 4. Carry the uncommitted Money Ideas work onto its own branch off main
git switch -c feat/fsa-money-ideas-002 origin/main
#    If git refuses because of the dirty tree:
#      git stash push -m "money-ideas-002" && git switch -c feat/fsa-money-ideas-002 origin/main && git stash pop

# 5. Commit in two coherent commits. Stage explicit paths — never -A.
git add articles/article-library.json \
        articles/money-decisions/every-dollar-has-four-jobs.html \
        articles/money-decisions/hidden-cost-of-free.html \
        articles/money-decisions/why-saving-money-feels-so-hard.html \
        articles/sources/every-dollar-has-four-jobs.sources.md \
        scripts/build.py scripts/library_data.py scripts/four_jobs_content.py
git commit -m "Draft FSA-ARTICLE-002 'Every Dollar Has Four Jobs' (drafted / human-review-required)

Third article body module + registry record + researched source file.
Taxonomy Live/Prepare/Protect/Grow per owner decision 2026-07-18.
No Tier B claim. Two human decisions remain open (Protect/debt mapping;
YNAB similarity review). Not approved, not public: DRAFT banner + noindex."

git add docs/fsa-production-observations-log.md \
        docs/fsa-article-002-draft-audit.md \
        docs/governance-test-001-report.md
git commit -m "Record governance test 001, the 002 draft audit, and five production observations"

# 6. Verify, then push. This creates a PREVIEW deploy only.
python3 scripts/validate_articles.py && python3 scripts/test_public_visibility.py
git push -u origin feat/fsa-money-ideas-002
```

### Notes and warnings

- **Pushing this branch does not publish anything.** Vercel builds feature branches as
  previews; production changes only on merge to `main`. And even a merge to `main` would not
  publish the article — the visibility gate keeps it `noindex` with a DRAFTED banner until
  `reviewStatus: approved`. The pilot articles have been living on production under exactly
  that gate since 2026-07-26.
- **Do not rebase, squash, or rewrite `feat/kits-mvp-001`.** Its five Money Ideas commits are
  already merged to `main` through PR #104; rewriting them would fork history that is already
  deployed.
- **`feat/fsa-money-ideas` (at `a2fbaaf`) can stay as-is.** It is the historical pilot branch
  and it is already fully contained in `main`. Do not delete it yet; it is a useful marker.
- **`scripts/four_jobs_content.py` is currently the only copy of a finished article and is not
  in Git.** Step 5 is what fixes that. Until then, the recovery snapshot is the backup.
- Separately, decide what to do with `feat/kits-mvp-001`'s two unmerged commits — in
  particular the 08-19 free-vs-paid copy fix (G2), which is currently unpublished.

---

## 11. Proposed growth-engine model

### The model, tested against what exists

```
real question → free Money Idea → small useful action → [optional paid application] → measurement → evidence → next decision
```

**Three of the six stages are already built, and better than a new design would be.**

| Stage | What already implements it |
|---|---|
| Real question | The registry's `misconception` + `coreQuestion` fields. **Money Ideas is already organized by question, not by topic.** This is the strongest structural fit in the whole model and it was not built for growth — it was built for pedagogy, which is why it is trustworthy. |
| Small useful action | **Parts 9 and 10 of the 13-part structure** — "Look for this today" and "Try it yourself." Present in every drafted article. Pencil-and-paper. Already audited for hidden access assumptions (no bank account, no app, no balance disclosure, no internet). **FSA does not need to add an action layer. It needs to instrument the one it has.** |
| Optional paid application | `/kits/` already exists with its exception rules: full free explainer published before anything is for sale, no free material withheld or degraded, 30-day no-questions refunds, independence disclaimers. |
| Measurement | `js/analytics.js` → `window.fsaAnalytics.track()` → `/api/track`, with nine article events already named and documented. Loaded on every article page. **See the blocker below.** |
| Evidence / next decision | Does not exist. This is the genuinely new work, and it is the queue-with-a-reason from H1. |

### Where the model strains — and the boundaries that must hold

**1. "Demand-generation layer" is the exact phrase FSA's identity was written to prevent.**
`CLAUDE.md` states FSA is mission-driven for the underbanked, that core education is never
monetized, and that FSA is "not a Bitcoin custody/inheritance/advice funnel." The honest
framing that survives that constraint: *Money Ideas is a public education asset whose reader
behaviour is also evidence.* The measurement exists to inform **FSA's** decisions about what
to teach next — not to move the reader anywhere. Practical test: **if an article's success
metric is a click toward a paid page, the standard has been inverted.** Keep the words
"funnel," "conversion," and "demand generation" out of the writer skill, out of the article
standard, and off every learner-facing surface.

**2. Reordering a curriculum by search demand turns it into a content farm.**
The 26 articles were derived from an ontology spine (scarcity, opportunity cost, incentives,
time, information asymmetry), not from keyword research. Proposed rule: **demand can reorder
the queue; it cannot admit an article to it.** An article ships only if it is *both* in the
spine *and* has some demand signal. This preserves the thing that makes the library worth
reading — that it teaches beneath the rule — while letting evidence set the sequence.

**3. Only one of 26 articles has any plausible product adjacency today.**
The single paid product is the Trump Account kit. Manufacturing a product relationship for
the other 25 is precisely the failure the brief warns against. Design consequence: **paid CTAs
must be the rare exception by construction**, not by editorial restraint applied case by case.

**4. Recorded history says build the audience before the conversion layer.**
Project memory records the commercial layer built four times with zero recorded transactions,
a 2026-07-25 correction reversing the workflow to demand-first, and an MVP-001 parent-journey
review in which 3 of 3 would not buy. **The discipline that follows: design the CTA layer now,
build none of it until an article has recorded organic entrances.** That is what §12 does.

### Blocker that would silently void the entire measurement plan

`js/analytics.js` posts every FSA event to **`https://bitcoinsovereign.academy/api/track`** —
cross-origin. BSA's handler (`api/lib/origin.ts`) allows only
`bitcoinsovereign.academy`, its `www` and `preview` subdomains, `*.vercel.app`, and localhost
by default; other origins must be added through the `ALLOWED_ORIGIN` env var. If
`financiallysovereign.academy` is not in that variable, **every FSA article event is silently
dropped** — `fetch` failures land in a `.catch()` that just re-queues, and
`article_opened` / `article_completed` are not in the immediate-flush list, so nothing
surfaces as an error. Events are correctly tagged `site: 'fsa'`, so if the origin is allowed
the data is separable.

**Pre-flight, before any of the 8–12 week experiment: load a live FSA article, then confirm
one `article_opened` row with `site: 'fsa'` reaches Supabase.** If it does not, add the origin
in BSA's Vercel env. Half an hour that decides whether twelve weeks produce evidence or
nothing.

---

## 12. Conversion layer — designed, not implemented

**Nothing below has been inserted into any article.**

### CTA rules

**R1 — One primary CTA per article, and it is educational.** It already exists: parts 9 and
10. Do not add a button, a box, or a download to serve this. The reader's next action is the
exercise.

**R2 — At most one relationship CTA.** Placement: after the closing question, before the
sources box. Body-text weight, never a banner, never above the fold, never mid-article. It
must state the cadence and state what will never be sent. One sentence.

**R3 — A paid CTA is admitted only when all four are true.**
 (a) The article's `coreQuestion` names a decision the product actually helps someone
 *execute* — not merely a topic the product touches.
 (b) The product's free explainer already answers the question the article raises, so the
 link adds application, not access.
 (c) **The article was written first and would not change by one word if the product did not
 exist.** If the article had to be bent, refuse the link.
 (d) The link sits below the educational CTA, is visibly marked as paid, and shows the price.

**R4 — Four zones are permanently CTA-free:** the opening, the scenario, the mental model,
and the boundary case. Those are where trust is made, and the boundary case in particular is
where the article tells the reader the lens might not fit them. A commercial link there
destroys the thing that makes it credible.

**R5 — A paid CTA can never be an article's stated success metric.** Article success is
"did the reader learn and act." Product clicks are recorded; they are never optimized.

**R6 — Any article carrying a paid CTA repeats the `/kits/` promise in one line:** full free
explainer first, nothing withheld to sell it, 30-day refunds.

**R7 — Enforce mechanically.** `primaryCTA` must be `educational` for every article, checked
by `validate_articles.py`. `paidCTA` is nullable and defaults to null. Cap it: **at most one
in four published articles may carry a paid CTA in the first experiment, and zero is an
acceptable outcome.**

### The worked example, from the brief's own test

An article titled something like *"What the account your child gets at birth actually is"* —
whose core question is a decision a parent must execute — passes R3 for the Trump Account kit.
"Every Dollar Has Four Jobs" does not, and must not, even though the kit exists and the
article discusses allocating money. That distinction is the whole rule.

---

## 13. Registry evolution

The registry is the **editorial source of truth**. Keeping it that way means being stingy.

### Add before first publication — three fields, all editorial

| Field | Why now |
|---|---|
| `queuePosition` + `queueReason` (one line) | Closes H1 and is the cheapest possible version of a demand hypothesis: it forces "why this one next" to be written down where it can later be checked against what happened. |
| `primaryCTA` (enum, must be `educational`) | Makes R1 mechanically enforceable from day one, before any temptation exists. |
| `briefStatus` (`proposed` / `adopted` / `superseded`) | Closes M1 for one word per brief. |

### Add only after traffic exists

`searchIntent`, `demandEvidence`, `conversionHypothesis`, `distributionPriority`,
`performance`, `lastEvaluated`.

Reason: **every one of these is a guess before traffic**, and 26 rows of confident guesses
become a source of false authority — the precise failure mode the "build ahead of demand"
history records. Add them when there is something real to put in them, and add them one at a
time as a specific question demands each one.

### Do not add, ever

- **`performance`** as numbers in the registry. Analytics belong in the analytics store. If
  the registry needs a performance signal, let it be `lastEvaluated: <date>` plus a one-line
  human verdict. A registry that fills with metrics stops being editorial truth.
- **`audienceProblem`** — it is a rename of the existing `misconception` + `learnerOutcome`
  pair. Two fields describing the same thing will disagree.
- **`searchIntent` as a separate field** — it overlaps `coreQuestion`, which already *is* the
  search intent, written in the reader's language. If a query differs from the coreQuestion,
  that is a finding about the article, not a new field.
- **`productRelationship` as required.** Nullable, default null. A required field invites
  someone to fill it in.

---

## 14. 8–12 week launch experiment

### Sequencing correction

The proposed plan ("finish/review Articles 000–003, publish ~1/week") cannot run as written:
**003 is not drafted and has no brief.** And the true first step is not an article at all.

| Week | Step | New writing required |
|---|---|---|
| 0 | Git separation (§10) + Gold Standard Rubric calibration review of 000 and 001 + build the article-level accessibility instrument (M4) | none |
| 1 | Fold calibration into the standard; fact-check 000; run both gates; **approve and publish 000** | none |
| 2 | Same for 001 | none |
| 3 | Rule on B1 and B2; **approve and publish 002** | none |
| 4–5 | Mode 1 brief for the next article, chosen by `queueReason` — which may well not be 003 | one brief |
| 6–12 | ~1 article every 1–2 weeks | 3–5 articles |

**Realistic outcome at week 12: 6 to 8 published articles, three of which already exist.**
Say that out loud rather than promising twelve — the cadence is not the point, and the plan's
own rule ("do not create new articles merely to satisfy cadence") is right.

### Minimum useful metrics — five, not nine

| # | Metric | Source | Why it earns its place |
|---|---|---|---|
| 1 | **Organic entrances per article** | Search Console + `article_opened` where `referrer` is a search engine | The only unambiguous demand signal. |
| 2 | **Search queries per article (the text, not the count)** | Search Console | **The single most valuable output of the whole experiment.** The point of a discovery layer is learning what people actually ask. A query you did not plan for is worth more than a thousand pageviews. |
| 3 | **`article_completed` rate** (~90% scroll — the reader reached the exercises) | already instrumented | The honest proxy for "did the lesson land," and it needs no new code. |
| 4 | **`article_related_article_selected`** (next-article click) | already instrumented | Tests whether the *collection* works, not just one article. |
| 5 | **Email signups per 100 entrances** | `email_capture` | The only relationship signal, and it is opt-in. |

Record but do not optimize: paid-product clicks, paid conversions.
**Do not track:** total pageviews, time on page (pure noise at this volume), bounce rate,
social shares, articles-published-per-week. Every one of these can go up while the project
fails.

### Decision criteria at week 8–12

Calibrated to FSA's real scale — the sister site runs roughly 190 sessions/month, so honest
thresholds are small.

**CONTINUE** if both hold:
- at least 3 published articles each reach ≥25 organic entrances/month by week 12; **and**
- at least 5 distinct real search queries appear that FSA had not planned for.

The second condition is the real one. If the library teaches you what people ask, it is
earning its keep even at low traffic.

**CHANGE** if traffic arrives but nothing compounds: entrances present, next-article clicks
near zero, no repeat queries. That points at distribution or collection coherence, not at the
writing. **Change the channel first — it is far cheaper than changing the writing.**

**STOP the cadence (keep the library)** if by week 12 total organic entrances across all
published articles are under 100 **and** Search Console shows under 200 impressions. That
means canonical publication has no distribution and articles cannot earn an audience on their
own. The right response is to stop producing and solve distribution — not to write article 12.

**Separate kill criterion for the commercial layer:** if adding a paid CTA measurably reduces
that article's own `article_completed` rate or next-article clicks against its pre-CTA
baseline, **remove the CTA.** The education is the asset.

---

## 15. Distribution — the smallest useful experiment

Canonical publication must work first. Nothing below starts until at least 000 and 001 are
`approved`, indexable, and in the sitemap.

**Experiment 1 (the only one to run first).** Dalia already has a Substack with 100+
subscribers and a steady publishing habit — twelve posts between May and August 2026. But it
is a Bitcoin/sovereignty publication in a personal essay register, and Money Ideas is a
different audience in a different register. **Do not cross-post Money Ideas into it.** Instead:
write **one** short post in her existing voice about the thing she built — "I wrote a small
library for the money questions people keep asking me" — with one link to the published
article. One post, one link, measure entrances for two weeks. That tests whether an existing
audience will follow a link to FSA without merging two brands.

**Experiment 2 (only if 1 shows nothing).** Submit the FSA sitemap, request indexing for the
approved articles, wait four weeks. Search is the channel that matches the asset: evergreen,
question-shaped, no dated statistics — the direct payoff of decision D4.

**Explicitly deferred:** LinkedIn, short social, the Spanish adaptation (Mode 6 exists and is
ready — it is a real asset, and it is still premature), worksheets, and the "cost of later"
calculator. The retrospective correctly identified the calculator as the highest-value
companion asset; it is the right thing to build and the wrong time to build it, until "Later"
has readers. Preserve the Sovereign Stack principle — *one strong canonical idea can later
produce many appropriate distributions* — and preserve only that.

---

## 16. Recommended next actions

Ordered, deliberately small. Items 1–3 are mechanical; item 4 is the one that actually
unblocks everything.

1. **Review this report and the recovery snapshot** at
   `_recovery/2026-08-20-money-ideas/`. Confirm nothing else needs preserving. *(10 min)*
2. **`git fetch origin`** and confirm the deployment picture in §1 and §10. *(5 min)*
3. **Run the Git separation sequence** (§10) before anything else touches the tree — it is
   what gets the only copy of Article 002 into version control. *(15 min)*
4. **The Gold Standard Rubric calibration review of Articles 000 and 001.** *(one sitting)*
   → This is the item the whole system has been waiting on since 2026-07-17.
5. **Rule on B1 (Protect/debt) and B2 (YNAB similarity review).** *(20 min)*
6. **Create `docs/fsa-decisions-log.md`** and backfill the six decisions in §5. *(20 min)*
7. **Build the article-level accessibility checklist (M4).** No article can be published
   without it. *(1–2 hours, mostly adaptation)*
8. **Verify the analytics origin** (§11 blocker) before promising any measurement. *(30 min)*
9. **Then** approve and publish Article 000.

Not on this list, deliberately: the renderer refactor, the registry schema expansion, the CTA
implementation, Article 004, and the governing document. All of them are downstream of a human
reading two finished articles.

---

## 17. Decisions required from Dalia

Only items that genuinely need human judgment.

| # | Decision | Why it cannot be delegated |
|---|---|---|
| Q1 | **Protect/debt mapping** in Live / Prepare / Protect / Grow — confirm Protect, or reassign | Your taxonomy; it binds every future article that uses the four jobs |
| Q2 | **YNAB similarity review** — run it; decide whether the title stays | An originality judgment the standard explicitly reserves for a human |
| Q3 | **Calibration verdict on 000 and 001** against the Gold Standard Rubric | The retrospective asked for exactly this; nothing downstream can move without it |
| Q4 | **C1 delegation** — formally give FSA-local governance canonical authority for article production, keeping the TSA pointer for strategy and boundaries? *(Recommend yes; the 07-18 run is the evidence)* | Constitutional |
| Q5 | **May Money Ideas carry a paid CTA at all, ever?** | If no, §12 and §13 simplify sharply — and given FSA's "never a funnel" identity, no is a defensible answer |
| Q6 | **May the Substack point at FSA at all**, given they are different brands and registers? *(One post, one link — §15)* | Brand judgment |
| Q7 | **H3 deferral** — confirm the renderer refactor waits for body module #4, reversing July's "decide now" urgency | Reverses a prior recommendation of yours |
| Q8 | **G2** — merge the 2026-08-19 free-vs-paid copy fix to `main`? It is currently unpublished | Outside this recovery's scope, but it is a live honesty fix sitting on a branch |

---

## Appendix — evidence index

| Claim | How it was verified |
|---|---|
| Snapshot is byte-for-byte reversible | HEAD blobs extracted to scratch; `git apply --check` passed; patch applied; `cmp` matched all 8 files |
| Build is deterministic and in sync | `FSA_ARTICLES_OUT=/tmp build.py`; every HTML file byte-identical to the repo (only stub-vs-researched source files differ, which is the designed source-persistence behaviour) |
| Governance suites pass | `validate_articles.py` PASS (26 / 32 / 0 public); `test_source_persistence.py` 4/4; `test_public_visibility.py` all cases |
| Recovery changed nothing | `git status --porcelain` identical before and after all checks; `shasum -c MANIFEST.sha256` clean |
| Money Ideas merged to main + deployed | Vercel deployment `dpl_HKzLZN95BzoUbUjJiV6Nj9ajDHaP`, `target: production`, commit `3be78bb`, ref `main`, message "Merge pull request #104 from Sovereigndwp/feat/kits-mvp-001" |
| Pages live but gated | Fetched `/articles/`, `/articles/foundations/the-most-expensive-word-is-later.html`, `/articles/money-decisions/every-dollar-has-four-jobs.html` on 2026-08-20 |
| Local refs stale | `.git/FETCH_HEAD` mtime 2026-07-17 17:59:57 UTC; `3be78bb` not a valid object locally |
| No Substack publication of 000–003 | `git grep` across tracked files; grep across TSA / hub / monorepo; Gmail enumeration of all "Stats for your post" / "Shareable assets for" mail from `no-reply@substack.com`, May–Aug 2026 |
| Branch separation is clean | Set intersection of `git diff --name-only` with the file lists of `205eeb6` and `85fce05` — empty |
| Third-elif trigger fired | `grep -n 'slug"\] == '` on `build.py` → six dispatch branches across two functions; identical 11-key schema across all three body modules |
| Analytics CORS risk | `js/analytics.js:14` endpoint; `bitcoin-sovereign-academy/api/lib/origin.ts` `DEFAULT_ALLOWED_ORIGINS` excludes `financiallysovereign.academy` |
| 08-19 copy fix unpublished | `git show 85fce05` diff vs live `/kits/` page text fetched 2026-08-20 |

---

**READY FOR DECISION — NO IMPLEMENTATION PERFORMED.**
