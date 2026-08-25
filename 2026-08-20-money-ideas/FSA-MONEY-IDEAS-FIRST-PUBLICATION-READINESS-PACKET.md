# FSA Money Ideas — First Publication Readiness Packet

Stabilization pass run 2026-08-20, against the accepted recovery report.
Nothing was published, approved, merged, or pushed. No article text was rewritten.

**Headline:** Article 002 is now in Git, on its own branch off the real `origin/main`, in
two commits, byte-identical to the recovery snapshot. The three governance gaps that
actually block publication are closed or ready for your signature. Both Article 002 owner
decisions now have evidence packets. The analytics pre-flight **passed** and needs no fix.

---

## 1. Git stabilization status

### What the fetch revealed

`git fetch origin --prune` succeeded and confirmed the recovery report's reconstruction
exactly. The local refs had been stale since 2026-07-17.

| | Before fetch | After fetch |
|---|---|---|
| `origin/main` | `1d45b22` (2026-07-08) | **`3be78bb`** "Merge pull request #104 from Sovereigndwp/feat/kits-mvp-001" |
| `origin/feat/kits-mvp-001` | stale | `85fce05`, identical to local HEAD (branch was pushed) |
| local `main` | `a37cd4c` | unchanged, and now confirmed a fast-forwardable ancestor of `origin/main` |

Also pruned: three deleted remote branches. One new remote branch appeared
(`feat/fsa-layer-1-graphite-tokens`).

So: **PR #104 is real, the Money Ideas pilot commits are on `main`, and production has been
serving them behind the visibility gate since 2026-07-26.** Nothing in the recovery report
changes.

`feat/kits-mvp-001` is **2 commits ahead** of `origin/main`: `205eeb6` (docs) and `85fce05`
(the free-vs-paid copy fix, still unpublished). Neither touches a Money Ideas file.

### Snapshot verification

Run immediately before branching:

- `git status --porcelain` returned the expected 8 modified + 3 untracked.
- `shasum -a 256 -c MANIFEST.sha256` on the recovery snapshot: **0 failures.**
- One difference from the recovery report's file list, now explained:
  `modules/.claude/settings.local.json` does **not** appear in `git status` on your Mac. It
  is matched by your global ignore file, `~/.config/git/ignore:1`
  (`**/.claude/settings.local.json`). It appeared as untracked during the recovery pass only
  because the sandbox does not have that global ignore. **It is preserved as untracked
  tooling with no action needed, permanently.**

### Branch

```
feat/fsa-money-ideas-002   rooted at origin/main (3be78bb)
```

All 11 files carried across cleanly, as predicted by the zero-overlap check.

**One thing I changed and want to flag:** `git switch -c … origin/main` automatically set the
new branch's upstream to `origin/main`, which would have made a bare `git push` target
`main`. I ran `git branch --unset-upstream` immediately. The branch now has **no upstream**,
so `git push` will refuse without an explicit target. That is deliberate: nothing can reach
`main` by accident.

### Verification after committing

- `validate_articles.py` **PASS** (26 articles, 32 pages scanned, 0 public)
- `test_source_persistence.py` **4/4 PASS**
- `test_public_visibility.py` **PASS**
- Build determinism: rebuilt to a scratch directory, every HTML page byte-identical
- All 11 committed blobs compared with `cmp` against the recovery snapshot: **11/11 match**
- Working tree: **clean**
- `origin/feat/fsa-money-ideas-002`: does not exist. **Nothing was pushed.**

---

## 2. Proposed commit scopes

Two commits, as instructed. Both are already made locally and are shown here for your review
before any push.

### Commit 1 — `8968a93`

> Draft FSA-ARTICLE-002 "Every Dollar Has Four Jobs. Which One Is Yours Doing?"

```
 articles/article-library.json                      |  32 +++---
 articles/money-decisions/every-dollar-has-four-jobs.html | 110 +++++++++-------
 articles/money-decisions/hidden-cost-of-free.html  |   2 +-
 articles/money-decisions/why-saving-money-feels-so-hard.html | 4 +-
 articles/sources/every-dollar-has-four-jobs.sources.md |  45 ++++++---
 scripts/build.py                                   |  36 +++++++
 scripts/four_jobs_content.py                       |  87 ++++++++++++++++
 scripts/library_data.py                            |  24 +++--
 8 files changed, 269 insertions(+), 71 deletions(-)
```

Grouped in the message as authoritative sources / infrastructure / generated output, with
the applied owner decisions (D2, D3, D4) and the two open blockers named. The two
`hidden-cost-of-free` and `why-saving` changes are title ripples only, labelled as such.

### Commit 2 — `d3c8936`

> Record governance test 001, the 002 draft audit, and five production observations

```
 docs/fsa-article-002-draft-audit.md     | 138 ++++++++++++
 docs/fsa-production-observations-log.md |  27 +++
 docs/governance-test-001-report.md      | 258 ++++++++++++++++++++++
 3 files changed, 423 insertions(+)
```

Explicitly states that no article state changed.

### Proposed commit 3 (new work from this pass, NOT committed)

Three new files are sitting untracked in `docs/`, awaiting your review:

```
?? docs/fsa-decisions-log.md                    (section 3)
?? docs/fsa-article-accessibility-checklist.md  (section 5)
?? docs/fsa-calibration-packet-000-001.md       (section 6)
```

I left these uncommitted because you specified two commits only. If you want them in, the
sequence is:

```bash
git add docs/fsa-decisions-log.md \
        docs/fsa-article-accessibility-checklist.md \
        docs/fsa-calibration-packet-000-001.md
git commit -m "Add decisions log, article accessibility gate, and the 000/001 calibration packet"
```

### When you are ready to push

```bash
git push -u origin feat/fsa-money-ideas-002
```

This creates a **preview** deployment only. Production changes only on merge to `main`, and
even then the article stays `noindex` with a DRAFTED banner until `reviewStatus: approved`.

---

## 3. Decisions-log status

`docs/fsa-decisions-log.md` created. Append-only, with the required fields on every entry:
date, ID, decision, owner, reason/evidence, files or systems affected, supersedes, status.

| ID | Date | Decision | Supersedes | Status |
|---|---|---|---|---|
| FSA-DEC-001 | 2026-07-18 | FSA-ARTICLE-002 written next, not Economic Thinking | retrospective's sequencing, for this article only | active |
| FSA-DEC-002 | 2026-07-18 | Mode 1 brief's registry refinements adopted | prior 002 registry values | active |
| FSA-DEC-003 | 2026-07-18 | Taxonomy = Live / Prepare / Protect / Grow | brief's naming; registry's implied naming | active |
| FSA-DEC-004 | 2026-07-18 | Tier B emergency-expense statistic excluded | brief's evidence plan | active |
| FSA-DEC-005 | 2026-07-17 | Educational Publishing charter v0.1 at Proven; Economic Thinking as Pilot A | none recorded | active |
| FSA-DEC-006 | 2026-07-17 | Do not generalize the build engine; make the duplication visible | none recorded | active, trigger met |

Every entry cites the artifact it was reconstructed from. **Nothing was invented.** Three
things I deliberately did *not* record as decisions, because no artifact records them as
decided:

1. Where "repay debt" sits in the taxonomy. FSA-DEC-003 carries it as an explicit open
   sub-question, not a decision.
2. Whether D4's rule ("statistics only when they materially strengthen the lesson") is a
   library-wide standard. It was stated about one article. Promoting it is a separate call,
   and it is noted as a scope limitation on the entry.
3. Anything from the pilot voice audit, which ends "Awaiting your go-ahead" and never got one.

The file also carries an **"Open decisions awaiting the owner"** table (OPEN-A through
OPEN-E) so the log shows what it is waiting for. Those are not entries and are not numbered.

FSA-DEC-006 is flagged `active, trigger met`: the third `elif` exists, so the refactor
decision is live and unmade. When you make it, it supersedes FSA-DEC-006.

---

## 4. Canonical-authority proposal

**Not applied.** Diff shown for approval.

Two places in FSA carry the pointer: `CLAUDE.md` line 3 (the blockquote) and line 31 (the
"The brain" section). The smallest change that states all four required things is **one
inserted paragraph after line 3, with nothing removed**.

```diff
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -1,6 +1,14 @@
 # CLAUDE.md — FSA (Financially Sovereign Academy)
 
 > **Canonical context — read first.** The brain of The Sovereign Academy lives in the **TSA** repo (`~/Documents/Claude/Projects/TSA`). Before working here, read `TSA/MEMORY.md` (canonical facts, incl. resolved conflicts) and `TSA/standards/content-operating-system.md` (operating rules), and follow that standard. This repo inherits from TSA; it does not redefine it. FSA already runs the canonical TSA design style.
+>
+> **Precedence for article production (added 2026-08-20).** For FSA Money Ideas article work, **FSA-local governance is canonical**: `skills/fsa-educational-writer/`, `standards/fsa-educational-article-standard.md`, `standards/fsa-originality-checklist.md`, `docs/fsa-article-editorial-workflow.md`, `docs/fsa-article-metadata.md`, `docs/fsa-gold-standard-rubric.md`, `docs/fsa-article-accessibility-checklist.md`, and `docs/fsa-decisions-log.md`. TSA-level material governs organizational strategy, brand and product boundaries, and capability tiering, and it still binds.
+>
+> **If TSA context cannot be reached, ordinary article production continues on FSA-local governance alone.** Record the unreachable pointer in `docs/fsa-production-observations-log.md` and carry on. A missing TSA pointer is not a blocker for drafting, reviewing, or publishing an article.
+>
+> **What must still be escalated.** Anything that would change organization-wide doctrine goes to Dalia and is recorded in `docs/fsa-decisions-log.md`: FSA's identity or boundaries, what is free and what is paid, the writer-skill constitution, capability tiers, or any rule that would bind BSA or TSA as well as FSA. Delegation covers producing articles. It does not cover redefining the institution.
 
 Live site for practical, LATAM-fluent financial education. Sister property to BSA; mostly mirrors BSA conventions.
```

**Why this shape.** The 2026-07-18 run is the evidence: FSA-local governance produced an
article that scored 5 on nine of ten rubric dimensions with the TSA pointer unreachable the
whole time. And the two TSA artifacts the run reported as missing, the Educational
Publishing charter and the Economic Thinking project brief, **were created on 2026-07-17 and
exist on disk today**. The content was never absent; the pointer failed to resolve. So the
right fix is a precedence rule, not a path repair.

**Deliberately not included.** No change to line 31, no change to the TSA repo, no new
governance file. If you approve this paragraph, the natural follow-on is one sentence at
line 31 pointing back to it, which I have not written.

---

## 5. Article accessibility gate

`docs/fsa-article-accessibility-checklist.md` created. **v0.1, 23 rows, four passes, about
20 minutes per article.** Adapted from
`FSA-Institutional-Projects/fsa-course-redesign/fsa-module-a11y-interaction-checklist-v0.1.md`,
with module-only concerns (calculators, quizzes, branching scenarios, completion state, lab
cards) cut out. It is not a new framework.

Rows: A1-A6 structure and semantics, B1-B4 keyboard, C1-C5 visual/zoom/motion, D1-D4 text
alternatives and AT, E1-E3 print, F1-F4 non-negotiables.

**It returns a verdict.** PASS only if every applicable row passes. Any FAIL returns the
article to the author. `N/A` allowed only where the precondition is absent, with the reason
written in. **An unrun row is a FAIL, not a blank** — that rule is what stops the gate
collapsing back into "someone looked."

### Pre-run against FSA-ARTICLE-000, to prove the instrument works

I ran every row that can be verified without a browser or a screen reader.

| Row | Result | Evidence |
|---|---|---|
| A1 one `<h1>` | **PASS** | exactly 1 |
| A2 heading order | **PASS** | `h1 h2 h2 h2 h2 h2 h2 h2 h2 h2`, no skips. The exercise titles are `<h2 class="fsa-h3">`, which is correct: styled as h3, semantically h2 |
| A3 landmarks | **PASS** | one `<main id="main">`, `<footer>`, and both `<nav>`s carry distinct labels (`Primary`, `Breadcrumb`) |
| A4 named regions | **PASS** | `aria-labelledby` on the related and sources sections; `aria-label` on the model callout, both exercises, and the closing question |
| A5 `lang` | **PASS** | `<html lang="en">` |
| A6 nothing meaningful hidden | **PASS** | 5 `aria-hidden="true"` elements: the progress bar, two breadcrumb separators, two meta dots. All decorative |
| C1 contrast | **PASS** | computed: body text 15.66:1, muted 8.07:1, prose links 12.19:1, DRAFTED banner text 13.93:1, DRAFTED tag 7.69:1, model callout 14.54:1, focus rings 7.32:1 and 12.19:1 |
| C2 `--color-faint` | **PASS with a standing condition** | `#6E727A` on `#121316` is **3.85:1**, which fails AA for text. On an article page it resolves only on `.mi-crumbs__sep` and `.mi-dot`, both `aria-hidden` decorative. The row passes today; it will fail the day faint carries readable text |
| C5 reduced motion | **PASS** (static) | `@media (prefers-reduced-motion: reduce)` in both `fsa-articles.css` (progress bar transition) and `fsa-brand.css` (global animation/transition kill). Needs the browser pass to confirm behaviour |
| D1 image alternatives | **N/A** | 0 `<img>`, 0 inline `<svg>` on the page |
| D3 link text | **PASS** | 10 links, all meaningful out of context: Skip to content, Financially Sovereign Academy, Money Ideas, Modules, Foundations, Why Saving Money Feels So Hard, Mindset & Cash Flow module, Emergency Funds module, the companion source file. No bare URLs, no "click here" |
| D4 destinations behave as the text implies | **PASS, with one advisory** | Verified live: "the companion source file" resolves to `/articles/sources/…​.sources.md`, which the server returns as **raw markdown rendered as unstyled plain text**, beginning `# Sources: The Most Expensive Word…`. It is readable and it is not a download, so the row passes as written. It is still the one link a fact-checking reader is most likely to follow, and it lands on an unstyled text file. Flagged for you, not scored as a failure |
| E3 print footer | **PASS** (static) | `.mi-print-meta` renders `FSA-ARTICLE-000 · Revision 2026-07-16` and is `display:block` inside `@media print` |
| F1 no meaning by styling alone | **PASS** | the DRAFTED banner carries the word DRAFTED as text, not only the warning border |
| F2 works with JS disabled | **PASS** | 17 `<p>` elements of teaching content are in the served HTML. The three scripts are analytics, progress bar, and related-link tracking. None injects lesson content |
| B1-B4 keyboard | **not run** | needs a browser. Infrastructure is present: `.fsa-skip-link` with `:focus` reveal, `*:focus-visible` 2px outline, `a:focus-visible` 2px mint outline, `.fsa-btn/.fsa-chip { min-height: 44px }` |
| C3 320px, C4 200% zoom | **not run** | needs a browser |
| D2 screen-reader smoke test | **not run** | needs VoiceOver |
| E1, E2 print | **not run** | needs print preview. `@media print` blocks exist in both stylesheets |

**Interim verdict for FSA-ARTICLE-000: 15 rows PASS, 1 N/A, 7 not run.** Under the
instrument's own rule, an unrun row is a FAIL, so the gate result today is **FAIL, pending
the browser and screen-reader passes** — which is the correct answer, and exactly the
behaviour that was missing before. The seven remaining rows are one sitting at a laptop.

### How the result is recorded

Three places, all of which already exist. No new file type and no new lifecycle state.

1. **Review record:** `docs/reviews/FSA-ARTICLE-0NN-accessibility.md`, using the result block
   in the checklist. This also settles backlog item M3 for the accessibility gate.
2. **Registry:** the gate result moves `reviewStatus` along the existing vocabulary. A PASS
   is a precondition for a human setting `reviewStatus: approved`; a FAIL moves the article
   to `revision-needed`. **No registry schema change in v0.1** — deliberately, since you
   asked me not to touch the schema.
3. **Decisions log:** only when the gate produces a ruling that binds future articles, for
   example "faint may never carry article text." Routine PASSes do not belong there.

---

## 6. Article 000-001 calibration packet

`docs/fsa-calibration-packet-000-001.md` created. Designed to be completed in one sitting of
roughly 45 minutes. Nothing was rewritten; the reading copies were verified against the
canonical rendered pages today.

Contents: a side-by-side comparison table (title, misconception, core question, mental model,
learner outcome, scenario, boundary case, word count, status, public state); both full
reading copies; source summaries with every citation and its confirmation status; a
ten-row table of prior audit findings marked applied / partially applied / open; strongest,
weakest and boundary passages for each article with the evidence for each pick; a table of
seven items reserved for your judgment; and the Gold Standard scoring sheet.

Four things surfaced while assembling it that were not in the prior record:

1. **The voice audit was only partially applied.** Measured today in 000: `quietly` 6 → 4
   (the audit asked for 2), `actually` 8 → 6, `simply` 4 → 2. The two cross-article tics
   the audit wanted broken **were** broken correctly. So roughly five word-trims remain
   outstanding from 2026-07-17, including the subtitle's "quietly reshapes."

2. **The rhetorical-question question is a series question, not a 002 question.** Measured
   body-prose question marks, excluding the structural exercise and closing questions:
   **000 has 4, 001 has 4, 002 has 3.** All three use the identical pattern, a quoted
   self-blaming question plus its reframe, once in the opening and once in "Why this
   matters." The rubric currently says "at most one or two." Either the rubric's number is
   wrong or all three articles are, and **002 is the most restrained of the three.** This
   was reserved as a 002 blocker; it is really a library calibration item, and it belongs
   in this sitting rather than in the 002 decision.

3. **`readingMinutes` is 6 for all three, but the word counts are 1,411 / 1,194 / 1,450.**
   At 200 wpm those are 7, 6 and 7 minutes. This is governance backlog item L3, now
   measured. One decision sets the library's words-per-minute assumption.

4. **"What's actually happening" is a library-wide heading**, flagged by the voice audit as
   template-ish and never ruled on. It appears in all three drafted articles, so renaming it
   is a system decision that touches the writer skill.

The scoring sheet ends with a three-way verdict: *these two are the bar* / *the bar after
these listed changes* / *not yet the bar*, so the Gold Standard Rubric can lose its
"pending Dalia's calibration review" line either way.

---

## 7. Article 002 taxonomy decision packet

**Not resolved.** Evidence only.

### The definitions under test, quoted from the draft

> It can **Live**: cover what life costs right now, the housing, food, transport, and bills
> that are due this month. It can **Prepare**: wait as a buffer so a near-term surprise or
> goal does not turn into a crisis. It can **Protect**: defend what you already have, mostly
> by shrinking a debt that grows against you, or by keeping the coverage that stops one bad
> day from undoing years. Or it can **Grow**: buy a piece of the future through investing,
> ownership, or learning that raises what you can earn.

### The ten ordinary examples

| # | Dollar spent on | Job under the current draft | Clean? |
|---|---|---|---|
| 1 | Rent | **Live** | clean |
| 2 | Groceries | **Live** | clean |
| 3 | Emergency savings | **Prepare** | clean |
| 4 | Insurance premium | **Protect** by the second clause, but it is also "a bill due this month," which is the Live definition verbatim | **ambiguous** |
| 5 | High-interest credit-card repayment | **Protect** | **ambiguous** — see A2 |
| 6 | Low-interest mortgage prepayment | Protect by "shrinking a debt," but the qualifier is "a debt that **grows against you**," which a low-rate amortizing mortgage arguably does not. Paying principal also builds ownership, which is the Grow definition | **ambiguous, three ways** |
| 7 | Retirement contribution | **Grow** | clean |
| 8 | Employer-match contribution | **Grow** | clean (see note) |
| 9 | Job training | **Grow** — "learning that raises what you can earn" is explicit | clean |
| 10 | Replacing a broken appliance | **Live** if paid from income; but if paid from the emergency buffer, a Prepare dollar is being converted, not spent on a fifth job | **ambiguous, structurally** |

Note on #8: the category is unambiguous. What differs is *priority* — the boundary section
says a matched Grow dollar can beat repaying a low-rate debt. That is a healthy result: it
shows the taxonomy separates "which job" from "which job wins," which is the article's whole
teaching move.

### Four ambiguities, in order of how much they matter

**A1. The obligation/discretion split cuts across every job, and the article never names it.**
An insurance premium, a minimum card payment and rent are all *obligations due this month*.
Extra debt payment, savings and investing are *discretionary*. The Live definition captures
obligations by timing ("bills that are due this month"); Protect and Grow capture the same
dollars by purpose. Examples 4 and 5 sit in both. This is the root of A2.

**A2. Debt has two halves and the article splits them silently.** The Teresa scenario counts
"the minimum on one credit card" among the things that claim her paycheck (Live), and then
treats the freed forty dollars going to the card as Protect. That is almost certainly the
right reading. **It is never stated.** A reader who asks "which job is my card payment
doing?" gets two different answers from the same article depending on which paragraph they
are in. Whatever you decide about Protect, this needs one sentence.

**A3. "A debt that grows against you" is doing load-bearing work that Protect's headline
does not advertise.** It quietly excludes low-rate amortizing debt. So example 6 has no home:
not Protect (it does not grow against you), not clearly Grow (though principal does build
ownership), not Live (it is not this month's obligation if it is a prepayment). A reader
with a mortgage is the most likely reader to notice.

**A4. Prepare is a holding state; the other three are destinations.** Live, Protect and Grow
describe where a dollar *goes*. Prepare describes where it *waits*. Example 10 exposes this:
spending the emergency fund is not a fifth job, it is Prepare converting into Live. This is
not a flaw, and it may be a strength worth one explicit sentence, because it explains why
Prepare feels different from the other three.

### The alternative you asked me to test: leave debt context-dependent

Instead of permanently assigning debt repayment to one job, assign it by what the debt is
doing.

| Debt | Job | Reasoning the reader can follow |
|---|---|---|
| High-rate revolving balance | Protect | it grows against you; paying it defends what you have |
| Scheduled minimum on any debt | Live | it is a bill due this month |
| Low-rate amortizing principal | Grow | it buys ownership of an asset |

**What this buys.** All four ambiguities except A4 dissolve. Examples 4, 5 and 6 each get a
single clear answer. The taxonomy stays at four, so the title survives. And it produces a
genuinely FSA-shaped teaching move: *the job depends on what the debt is doing, not on the
word "debt."* That is the same reversal the article already performs on budgeting advice,
which suggests it fits the article's own logic rather than being bolted on.

**What it costs.** A beginner wants a place to put a thing. "It depends" is harder to hold
than "debt goes in Protect," and the article's core promise is that the reader can *name*
the job each dollar is doing. A context-dependent rule makes naming a two-step judgment. It
also adds roughly a paragraph to the "What's actually happening" section, which is already
the article's densest passage.

### Option table

| | **Option A: Protect includes debt** (current draft) | **Option B: Protect is insurance-only** | **Option C: debt is context-dependent** |
|---|---|---|---|
| Title survives | yes | only if debt gets no job, or a fifth job is added and the title changes | yes |
| A2 resolved | no, needs one added sentence | yes | yes |
| A3 resolved | no, needs a note on low-rate debt | yes | yes |
| Beginner load | lowest | low | highest |
| Edits to the draft | one sentence in the job definitions, one in the boundary case | rewrite Protect's definition, rewrite the boundary case, find a home for debt | one added paragraph, one boundary-case edit |
| Binds future articles | yes | yes | yes |

Whatever you choose becomes an entry in `docs/fsa-decisions-log.md` and supersedes the open
sub-question on FSA-DEC-003. **Do not let this be decided implicitly by the next article.**

I have not renamed anything, and Option A remains what is committed.

---

## 8. Article 002 YNAB similarity evidence

The manual similarity review the editorial brief reserved. **Evidence and residual risk
only. The title decision is yours.**

Method: read FSA-ARTICLE-002's canonical text against YNAB's current public wording on
ynab.com, plus a search of the wider phrase neighbourhood. Six axes, assessed separately.

### 8.1 Title similarity — LOW to MODERATE

| | |
|---|---|
| FSA | "Every Dollar Has Four Jobs. Which One Is Yours Doing?" |
| YNAB | "Give Every Dollar a Job" (Rule One, their most famous line) |

The exact string "every dollar has four jobs" returns **no match** in search. What it does
return is the neighbourhood: YNAB's own pages, plus a large ecosystem of third-party
content using the same phrase — Sound Mind Investing's "Zero-Sum Budgeting: Giving Every
Dollar a Job," Rocky Lalvani's "Every Dollar Has a Job!", "Rule 1: Give Every Dollar a Job"
by Allegra Stein, MoneySwell's "Do you really want to give every dollar a job?", and
bestfinlife's "Give a Job to Every Dollar You Have."

Grammatically FSA is declarative plus a question ("has … which one is yours doing?"), YNAB
is imperative ("give … a job"). That is a real difference and it carries the article's
reversal. But the noun phrase "every dollar" + "job" is the identifying phrase of a
competitor's flagship rule.

**So the risk is less about attribution and more about crowdedness.** The title lands in a
saturated phrase space owned in the reader's mind by a budgeting app. For an article whose
whole point is that budgeting advice assumes a surplus you may not have, that is a
positioning cost as much as an originality one.

I searched for a registered trademark on the slogan and found none in the results returned.
I am not a lawyer, I did not query the USPTO database directly, and this is not a legal
opinion.

### 8.2 Phrase similarity — MODERATE, and one item the July audit missed

Verbatim overlap: **none.** The article never uses "give every dollar a job." That
mitigation holds.

But two families of phrasing run close, and the second was not flagged in the draft audit.

**The one-purpose sentence.** YNAB, on their own tradeoffs page: *"When you give a dollar
one purpose, you can't give it another one."* FSA: *"a dollar can do only one job at a time.
Spent on groceries, it cannot also sit in savings or shrink a debt."* Same proposition, same
sentence shape. In FSA's defence this is a plain statement of opportunity cost, which
nobody owns, and FSA immediately names it as such and cites Federal Reserve Education.

**The employment metaphor — not flagged in July.** YNAB: *"Every single dollar gets employed
to support the things you care about."* FSA runs the same metaphor as a deliberate
through-line: dollars are *"hired by Live before the month even begins"*; the four jobs
*"line up to apply"* for the freed forty dollars; the reader is asked whether a dollar was
*"hired on purpose or by default."* FSA extends the metaphor further and inverts the agency
(the jobs apply to the dollar, rather than the person assigning the dollar), which is
original. It is nonetheless the same metaphorical family, developed at more length than
YNAB develops it. **The draft audit's originality note does not mention this, and it should
be in front of you when you decide.**

### 8.3 Taxonomy similarity — NONE. This is the clean differentiator.

YNAB explicitly does **not** name a fixed set of categories. From their own tradeoffs page:
they emphasise "a priority-based spending plan" and categories "tailored to individual
values rather than following a universal template." Their four *rules* are "Give Every
Dollar a Job," "Embrace Your True Expenses," "Roll With the Punches," "Age Your Money" —
four rules, not four jobs, and none of them is a category of spending.

FSA names exactly four fixed jobs: Live / Prepare / Protect / Grow. **No overlap.** No
search result attaches a four-job taxonomy to YNAB or to anyone else. This is the strongest
originality evidence in the packet, and it is your own naming (FSA-DEC-003).

### 8.4 Central teaching mechanism — GENUINELY OPPOSITE, and this is the real defence

| | YNAB | FSA-ARTICLE-002 |
|---|---|---|
| Assumed starting point | you have money to allocate | most dollars are already claimed |
| What the reader does | assigns every dollar to a category | names what each dollar is *already* doing |
| The decision taught | how to divide the whole | which job the *next free* dollar takes |
| Emotional move | control, being "the boss of your dollars" | removing shame from a month whose only honest answer is Live |
| Tool required | a budgeting app | pencil and paper |

YNAB instructs: *"Be the boss of your dollars and give each one a job."* FSA's article says
the opposite is usually true — for many households the dollars were hired before the month
began, and the skill is choosing one job for one free dollar. The article's own line, *"the
shortfall it implies is not a discipline problem. It is arithmetic,"* is a direct rebuttal
of the assumption inside YNAB's rule.

**Assessment: not derivative. It is an argument with the source, which is the strongest
form of originality.** The draft audit's claim that "the core move is the opposite of the
slogan's instruction" is correct — but it is only true of the *second half* of the article.
The first half (one dollar, one job; opportunity cost) is close to YNAB's own framing of
tradeoffs. That distinction is worth holding when you weigh the title.

### 8.5 Scenario and exercise similarity — NONE

YNAB's closest illustration is an unallocated $1,000 in savings that a person mentally
assigns to three purposes at once, showing they have "multiplied that money" psychologically.
FSA's is Teresa, a paid-off phone installment, and forty dollars a month coming free.
Different situation, different number, different lesson. FSA's two exercises (the
ten-then-forty free-dollar test; the crowded/thin/empty column) have no YNAB counterpart.
Both are labelled FSA illustrations in the source file.

Note in passing: YNAB's $1,000 example is a lay illustration of mental accounting, which
FSA cites formally to Thaler. Convergent, not derivative.

### 8.6 Overall reader impression

A reader who knows YNAB will recognise the phrase territory in the title and the employment
metaphor in the body, and will then find an article that argues against the premise of
YNAB's rule, using a taxonomy YNAB does not have and a scenario about someone who has no
surplus to allocate. They are most likely to read it as a considered response to the
budgeting orthodoxy rather than a copy of it. A reader who does not know YNAB will notice
nothing.

### Residual risk, stated plainly

1. **Positioning, not attribution.** The title competes for attention in a phrase space a
   competitor owns, for an article that is arguing against that competitor's core
   assumption. The strongest content in the piece is the part the title does not signal.
2. **The employment metaphor is shared and undocumented.** FSA's use is more developed and
   inverts the agency, but the source file's originality note does not currently acknowledge
   the overlap. If the title stays, the honest move is to add one line to the originality
   note naming the metaphor as a known adjacency, exactly as the YNAB slogan already is.
3. **The one-purpose sentence tracks YNAB's phrasing closely**, though the underlying idea is
   textbook opportunity cost and is cited as such.
4. **No verbatim copying was found**, on any axis.

The originality rubric currently scores this dimension **4**, and states that 4 is
approvable only after this review passes. This packet is the review. **Whether it passes,
and whether the title stays, is yours.** Three shapes the decision could take, offered
without a recommendation: keep the title and add the metaphor line to the originality note;
keep the noun phrase but lead with the original angle (the "next free dollar" is the
article's own idea and appears in no competitor's title); or change the title entirely,
which is free right now and expensive after publication, because the slug and ID stay stable
either way and only the display string moves.

**Sources:** [Foundations: The YNAB Method](https://www.ynab.com/guide/foundations-the-ynab-method) · [Do I Have to Give EVERY Dollar a Job?](https://www.ynab.com/blog/do-i-have-to-give-every-dollar-a-job) · [Where Did My Money Go?](https://www.ynab.com/guide/where-does-my-money-go) · [YNAB Revelations: The Power of Intentional Trade-offs](https://www.ynab.com/blog/ynab-is-all-about-tradeoffs) · [YNAB's Four Rules (Go From Broke)](https://gofrombroke.com/ynab-four-rules) · [Zero-Sum Budgeting: Giving Every Dollar a Job (Sound Mind Investing)](https://soundmindinvesting.com/articles/zero-sum-budgeting-giving-every-dollar-a-job) · [Every Dollar Has a Job! (Quiet Light)](https://quietlight.com/podcast/every-dollar-has-a-job/) · [Do you really want to give every dollar a job? (MoneySwell)](https://www.moneyswell.com/moneyswell-blog/do-you-really-want-to-give-every-dollar-a-job/)

---

## 9. Analytics pre-flight result

**PASS. No fix required. The recovery report's CORS concern is resolved by evidence.**

I did not build anything, did not modify the BSA repo, and did not touch any Vercel
environment. Verification was read-only SQL against the shared Supabase project.

### What is actually in the database

`public.analytics_events` in the Bitcoin-sovereign-academy Supabase project
(`rdqwoqdvqpedlsbaghtr`), columns `session_id, event_type, page_path, referrer, props, created_at`.

| Query | Result |
|---|---|
| Events tagged `props->>'site' = 'fsa'` | **270**, first 2026-03-03, last 2026-08-05 |
| Events with no `site` tag (BSA's own) | 8,921 |
| `article_opened` with `site: fsa` | **5**, all 2026-07-17, including `/articles/foundations/the-most-expensive-word-is-later.html` |
| `article_completed` with `site: fsa` | **4**, all 2026-07-17 |

FSA events span March through August 2026 across the whole production site (`/`,
`/modules/*`, `/calculators/*`, `/assessment`), on dates months before any FSA preview
deployment existed. **That is only possible if the cross-origin POST from
`financiallysovereign.academy` to `bitcoinsovereign.academy/api/track` is being accepted.**
The recovery report flagged that BSA's `api/lib/origin.ts` does not list FSA in
`DEFAULT_ALLOWED_ORIGINS`; the data shows the `ALLOWED_ORIGIN` environment variable must
already include it. That was the right thing to check and it is fine.

Events are correctly tagged `site: 'fsa'`, so FSA and BSA data are cleanly separable, and
`referrer` is stored, so organic-entrance attribution will work.

### Three caveats worth carrying into the experiment

1. **Four of the nine documented article events have never fired once**, so they are
   unproven rather than known-good: `article_print_selected`, `article_exercise_expanded`,
   `article_related_article_selected`, `article_related_module_selected`, plus the three
   `library_*` events. The JavaScript exists. Nobody has clicked. Recommend a two-minute
   manual click test on a live article at the accessibility gate, when someone is already at
   a browser, rather than trusting them at launch. **`article_related_article_selected` is
   metric #4 in the launch plan**, so it matters.
2. **No host or origin column.** FSA production and FSA preview traffic are
   indistinguishable in the data. Previews are rarely visited, so this is a note, not a
   problem, and it needs no change now.
3. **Volume context.** FSA production generated 7 to 115 events per month over the last six
   months. That confirms the small thresholds in the recovery report's launch criteria.

**Required action for approval: none.** This is the one blocker from the recovery report
that turned out not to be one.

---

## 10. Exact remaining blockers to publishing Article 000

Publication means `reviewStatus: approved`, banner removed, `noindex` removed, indexable.
`validate_articles.py` enforces the first of those mechanically.

| # | Blocker | Who | Status |
|---|---|---|---|
| B1 | **Gold Standard Rubric calibration verdict.** Everything else waits on it, because the rubric it would freeze is the instrument the educational gate scores against | Dalia | packet ready, `docs/fsa-calibration-packet-000-001.md` |
| B2 | **Fact-check confirmation.** Two Tier A citations for 000 must be confirmed to resolve and to be correctly characterised | Dalia or a fact-checker | listed in the packet, section 4A |
| B3 | **Educational review gate.** Cannot run before B1, since B1 sets the bar | Dalia | blocked on B1 |
| B4 | **Accessibility gate.** Instrument now exists. 15 rows pre-run PASS, 1 N/A, 7 rows need one sitting at a browser plus VoiceOver | Dalia | instrument ready, 7 rows outstanding |
| B5 | **Voice-audit trims: apply or waive.** About five word-level edits outstanding on 000 since 2026-07-17, including the subtitle. Either decision closes it; leaving it open does not | Dalia | CAL-4 in the packet |
| B6 | **Approval against the pre-publish checklist**, then `reviewStatus: approved` in `library_data.py`, rebuild, validate, merge, deploy | Dalia | after B1 to B5 |

**Not blockers**, though the recovery report treated some of them as risks: analytics
(section 9, passes), Git state (section 1, stabilized), the decisions log (section 3,
exists), canonical authority (section 4, awaiting one paragraph), the renderer refactor
(deferred, and publishing 000 adds no `elif`), and Article 002's two open decisions, which
block 002 and not 000.

**Realistic shape:** B1, B2, B4 and B5 are one focused session plus one browser pass. B3
and B6 follow the same week. Article 000 could be published within about two weeks of the
calibration sitting, with no new writing.

---

## 11. Decisions required from Dalia

Ordered by what unblocks the most.

| # | Decision | Unblocks | Where the evidence is |
|---|---|---|---|
| Q1 | **Calibration verdict on 000 and 001.** Are these two the bar, the bar after listed changes, or not yet the bar? | all publication | §6; `docs/fsa-calibration-packet-000-001.md` |
| Q2 | **Protect / debt.** Option A (current draft), B, or C? | Article 002 | §7 |
| Q3 | **YNAB: does the originality review pass, and does the title stay?** Also whether to add the employment-metaphor adjacency to the originality note | Article 002 | §8 |
| Q4 | **Approve the CLAUDE.md precedence paragraph?** | every future session | §4, diff shown, not applied |
| Q5 | **Commit the three new `docs/` files** (decisions log, accessibility gate, calibration packet) as commit 3? | tidiness | §2 |
| Q6 | **Push `feat/fsa-money-ideas-002`?** Preview deploy only; nothing reaches production | getting 002 off one laptop | §1, §2 |
| Q7 | **Rhetorical-question line for the series.** All three articles use the same pattern; 000 and 001 have 4 each, 002 has 3, and the rubric says "one or two." Set the number, or change the rubric | the rubric, and all three articles | §6, CAL-6 |
| Q8 | **Words-per-minute assumption** behind `readingMinutes`, given 1,411 / 1,194 / 1,450 words all labelled 6 minutes | reader promise; backlog L3 | §6, CAL-7 |
| Q9 | **The `--color-faint` standing rule:** ratify that faint may never carry readable article text, so the gate row has a rule behind it rather than a judgment call each time | the accessibility gate | §5, row C2 |
| Q10 | **The sources link.** "The companion source file" resolves to raw markdown shown as unstyled plain text. Leave it, relabel the link, or render sources as HTML? | reader trust on the one link fact-checkers follow | §5, row D4 |
| Q11 | Carried from the recovery report and still open: **merge the 2026-08-19 free-vs-paid copy fix to `main`?** It remains unpublished | kits honesty copy | §1 |

Q1 is the one that matters. Everything in section 10 except B2 is downstream of it.

---

## Appendix — what was changed on disk this pass

| Path | Change | Committed? |
|---|---|---|
| `.git/` refs | `git fetch origin --prune` | n/a |
| branch `feat/fsa-money-ideas-002` | created at `origin/main`, upstream unset | n/a |
| 11 Money Ideas files | committed in `8968a93` and `d3c8936` | **yes, not pushed** |
| `docs/fsa-decisions-log.md` | created | no |
| `docs/fsa-article-accessibility-checklist.md` | created | no |
| `docs/fsa-calibration-packet-000-001.md` | created | no |
| `_recovery/2026-08-20-money-ideas/` | this packet added | no (folder is in `.git/info/exclude`) |
| `CLAUDE.md` | **not touched** | no |
| Article text, registry schema, `build.py`, CTAs, cadence, publication state | **not touched** | no |
| BSA repo, Vercel environments, Supabase data | **not touched** (read-only queries only) | n/a |

---

**READY FOR OWNER REVIEW — NO PUBLICATION PERFORMED.**
