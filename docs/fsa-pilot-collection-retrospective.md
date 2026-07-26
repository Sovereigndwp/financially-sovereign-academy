# Pilot Collection Retrospective (v1)

Prepared for Dalia's highest-level editorial review. Covers the two Pilot Collection
articles taken through the full six-stage pipeline. Nothing here is approved or committed;
this is the calibration input before we decide what belongs in the writing engine.

## What was delivered
- "The Most Expensive Word in Personal Finance: 'Later'" (FSA-ARTICLE-000), drafted, ~1,200 words.
- "Why Saving Money Feels So Hard" (FSA-ARTICLE-001), the existing prototype, audited and its
  evidence gap closed.
- Completed companion source files for both. Neither carries a dated Tier B claim, so neither
  will go stale.
- Rendered HTML for both, served `noindex` with a visible DRAFT banner (not public).
- Clean `build.py` + `validate_articles.py`, plus the source-persistence and public-visibility
  test suites, all passing. The prototype's rendered page is byte-for-byte unchanged.
- The Gold Standard Rubric v1 (`docs/fsa-gold-standard-rubric.md`).

## Running journal: observations from writing

### Explanations that consistently worked
- **Name the feeling before the term.** "You put a heavy thumb on the scale for right now"
  landed the idea; "present bias" then just labeled something the reader already felt. This is
  the single most reliable move in both articles.
- **The "who pays?" reframe.** Turning "why am I so behind?" into "what does this cost, and who
  pays?" reliably converts self-blame into an answerable question. It is the engine of the intro.
- **A default that keeps running.** "The subscription keeps charging... 'later' quietly votes
  for the default" made "not deciding is a decision" concrete without abstraction.
- **One-figure scenarios.** Rosa's single $12 charge and Marcus's $40 both let the reader do the
  math in their head. Every added number weakens this; one is ideal, two is the ceiling.

### Where the writing repeatedly drifted abstract
- **Compounding.** The "money and time interact... changes the size of the number, not its date"
  paragraph in "Later" is the densest passage in either article. It is correct and readable, but
  it is the one place prose is doing work a picture would do better. This recurred: whenever the
  lesson is a *rate over time*, prose strains and a visual or calculator would teach faster.

### Analogies that produced stronger intuition
- "'Later' votes for the default" (delay as a silent vote).
- "'Later' borrows from your future self, who has less room to pay it back" (the mental model).
- A wait you have named and dated vs a wait that just happens (distinguishes wise delay from drift).

### Sections that required the most care or rewriting
- **The boundary case**, in both articles. Holding two truths at once (delay/willpower is real
  AND for some people the constraint is money, not character) without contradicting or moralizing
  is the hardest paragraph to write and the highest-value one. It is where dignity lives.
- **"Why this matters" in the intro** had to map four series without becoming a table of contents.
  Solution: describe them as "families of 'later'," not as a menu.

### Where an interactive would teach better than prose
Ranked by value:
1. **A "cost of later" calculator** (amount, months, rate -> the gap): would carry the compounding
   paragraph far better than prose. Highest-leverage companion asset identified in the pilot.
2. **An annualized-default widget**: list a few recurring charges, show the yearly total, to make
   "later votes for the default" tangible.
3. **A two-timeline diagram**: "a decision parked in 'later'" vs "the world still running," to show
   that not-deciding is not pausing.
These are recommendations for the future asset layer, not blockers for these two articles.

## Engine recommendations (the reason the retrospective exists)

Per your instruction, I did NOT generalize the build engine. I extended the existing per-article
pattern: a second body module (`scripts/later_content.py`) plus a parallel `elif` branch in
`build.py`, exactly mirroring how the prototype is wired. That was the minimal change to render
real content, and it deliberately surfaces the cost so we can decide with evidence.

1. **The duplication is now real, and it is the case for a registry.** Every new article currently
   requires a code edit to `build.py` (a new `elif` with hardcoded section headings), not just new
   content. Two hardcoded bodies is tolerable. A fourth would mean a fourth near-identical branch.
   **Recommendation:** when the next batch (Economic Thinking) is about to add its 2nd-3rd body,
   generalize to a `slug -> body` content registry (`article_bodies.py`) and a single generic
   renderer. Trigger: the moment we would write a third `elif`. Not before.

2. **Per-article section headings live in the wrong place.** The boundary heading ("When it's not
   about willpower at all" vs "When waiting is the right call") is currently hardcoded in `build.py`,
   away from the prose it belongs to. **Recommendation:** when we generalize, move all per-article
   headings into the body module so content and its headings travel together.

3. **Authoring HTML inside Python strings does not scale.** It worked for ~1,200 words but is
   error-prone and mixes content with code. **Recommendation:** evaluate authoring each article as
   an HTML fragment or lightweight markup file that `build.py` assembles, so writers never touch
   Python. Decide this alongside the registry, not piecemeal.

4. **Source-file status can drift from the registry.** The prototype's source file still said
   `educational-review-required` after the registry moved on; I had to sync it by hand.
   **Recommendation:** have `build.py` stamp the ID/status/reviewStatus/updated header lines of each
   source file from the registry while preserving the researched body, or have the validator flag a
   mismatch. Low effort, prevents silent drift.

5. **`REVISION_DATE` is static (good) but is not the source file's "Last updated."** The footer shows
   2026-07-16 while the "Later" source file says 2026-07-17. Harmless now; worth reconciling when we
   touch source-file stamping (item 4). Keep it static; never use a live date.

## What did NOT need changing
The 13-part structure, the voice standard, the evidence tiers, and the review rubric all held up,
including for an intro article whose job (mapping the library) differs from a single-concept piece.
The intro simply used part 8 ("Why this matters") to do the mapping. No structural change is
warranted before the next series. Pedagogy first held: the model works; the engine can wait.

## Recommended next step
Your editorial review of both articles against the Gold Standard Rubric. After we calibrate, fold
any changes into the standard and the writer skill, decide on engine items 1 to 4, and only then
begin Economic Thinking.
