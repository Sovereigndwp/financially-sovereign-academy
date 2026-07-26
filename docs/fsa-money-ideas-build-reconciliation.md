# FSA Money Ideas: Build Reconciliation Report

Date: 2026-07-16. Scope: inspect, reconcile, validate, and integrate the FSA Money Ideas
article library and the `fsa-educational-writer` skill produced across the build and by
two delegated subagents. This report records what was built, every conflict found, how
each was resolved, the validation results, and what still needs human judgment.

Nothing here is described as production-ready. No article is approved or published; the
public-facing article count is zero by design.

## What was built

**Infrastructure (generated from one source of truth).** `scripts/library_data.py` holds
all 26 article records and the controlled vocabularies. `scripts/build.py` renders the
registry (`articles/article-library.json`), the homepage, five series pages (four formal
series plus Foundations), 26 article pages, and 26 companion source stubs.
`scripts/prototype_content.py` supplies the one drafted body. `scripts/validate_articles.py`
enforces integrity. Styling is `css/fsa-articles.css` (extends `css/fsa-brand.css`, no new
tokens), with three progressive-enhancement scripts (`js/article-library.js`,
`js/article-reading-progress.js`, `js/article-related-content.js`). A reusable
`templates/educational-article-template.html` documents the shared page shape.

**Standards and docs.** `standards/fsa-educational-article-standard.md` (master standard),
`standards/fsa-originality-checklist.md`, `docs/fsa-article-editorial-workflow.md`,
`docs/fsa-article-metadata.md` (schema, vocab, analytics events),
`docs/fsa-module-integration-snippet.html` (paste-ready module cross-links),
`articles/README.md`, and the source-file template.

**Skill.** `skills/fsa-educational-writer/` with `SKILL.md`, `README.md`, eight references,
six templates, five examples, and a self-test (`TEST-why-saving.md`). It drafts and reviews
only, always stopping at `status: drafted`, `reviewStatus: human-review-required`.

## Conflicts found

Full inspection of every delegated file surfaced the following. Items 2 to 5 were genuine
contradictions; items 1 and 6 were cleanliness and design-clarity issues.

1. **Em dashes in build-owned files.** The subagent standards and skill files were clean,
   but the generator's source-file heading, the article template and module-integration
   HTML comments, `articles/README.md`, the source-file template, and several Python file
   headers used em dashes, which the FSA voice standard bans.
2. **Skill mode taxonomy mismatch.** The skill defined its six modes as Author, Audit,
   Adapt, Print companion, Spanish, and Standards check. The canonical specification (build
   brief section 18 and the reconciliation instructions) defines six distinct modes led by a
   standalone **editorial brief** mode: editorial brief, article draft, article audit,
   audience adaptation, print companion, Spanish adaptation. The skill also did not define,
   per mode, the required input, expected output, files to read, standards, stopping point,
   and unresolved questions.
3. **Stale mode numbering.** `templates/article-audit.md` referenced "Mode 2 / Mode 6" and
   `TEST-why-saving.md` was labeled "Mode 2," both under the old numbering.
4. **`formats` semantics disagreement.** The registry sets `formats: ["web", "print"]` for
   every article, because every page ships the shared print stylesheet. The skill's
   `article-draft.md` template, `print-companion.md`, and `TEST-why-saving.md` instead
   treated `formats` as `["web"]` until a print companion exists.
5. **Ambiguous template path.** `SKILL.md`, `README.md`, and `references/fsa-article-structure.md`
   referenced `templates/educational-article-template.html`. The skill has its own
   `templates/` directory, so read skill-relative this path is missing; the file actually
   lives at the repository root.
6. **Apparent placeholders that are intentional.** Source stubs contain `_example_`,
   `_add citation_`, and `_tbd_`. These are not leftover TODOs; they are the documented
   markers for unfilled source rows in planned and draft articles, and the validator blocks
   any public article that still contains them.

No conflicts were found in article structure, metadata field names, article length, reading
level, series names, module names, lifecycle states, review statuses, source requirements,
public-visibility rules, originality review, Bitcoin terminology, reentry adaptations, youth
adaptations, print requirements, or analytics event names. Those were cross-checked across
the standard, workflow, metadata doc, skill references, templates, and `library_data.py` and
found consistent.

## Decisions made

Resolved using the authority order: (1) machine-enforced registry and validation, (2)
canonical FSA module and brand standards, (3) master educational article standard, (4)
editorial workflow, (5) writer-skill references and templates, (6) examples.

1. **Em dashes: eliminated everywhere.** Changed the generator's source heading to
   `# Sources:` and rebuilt all 26 source files; converted the em dashes in the template and
   snippet comments, README, source-file template, and Python headers to colons or commas. A
   repository-wide grep now returns zero em dashes.
2. **Modes: rewritten to the canonical six** (authority 3, the master standard, over the
   skill's own choice at authority 5). `SKILL.md` and `README.md` now list Editorial brief,
   Article draft, Article audit, Audience adaptation, Print companion, and Spanish adaptation.
   Each mode in `SKILL.md` now states its required input, expected output, files to read,
   standards to apply, stopping point, and unresolved questions. The former "standards check"
   is folded into the audit mode as its fast variant. The 17-step workflow now notes that
   Mode 1 runs steps 1 to 7 and stops, and Mode 2 runs the full sequence.
3. **Mode numbering: corrected.** `article-audit.md` now says Mode 3; `TEST-why-saving.md` is
   relabeled Mode 3 (article audit).
4. **`formats`: reconciled to the registry** (authority 1). `["web", "print"]` is
   authoritative and means the page supports both web and print output, which is true because
   every page ships the print stylesheet. The `article-draft.md` template, `print-companion.md`,
   and the test were updated to match, and all now state that a print companion is a separate
   facilitator artifact that does not change the `formats` field.
5. **Template path: disambiguated.** All three references now read "repo-root
   `templates/educational-article-template.html`."
6. **Source stubs: kept and documented** as intentional, not defects. The source standard and
   this report both note that the validator gates them for public statuses.

Two additional observations, judged consistent and left as-is: the originality guidance exists
in two places (`standards/fsa-originality-checklist.md` and the skill's
`references/fsa-originality-standard.md`); this is an intentional embedded working copy and the
two agree, with the standards version governing. The audience-adaptation reference covers
"correctional facility" and "Spanish-speaking US" as adaptation contexts beyond the registry
`audiences` vocabulary; these are Mode 4 targets, not registry tags, and create no conflict.

## Validation results

All runs are against the reconciled tree.

- **Build:** `python3 scripts/build.py` produced 26 articles, 5 series pages, the registry,
  and 26 source files with no errors.
- **Validation:** `python3 scripts/validate_articles.py` PASS. 26 articles, 32 HTML files
  scanned, 0 public, no errors. The scan is scoped to library-owned pages so it does not fail
  on the two unrelated legacy guide pages.
- **Validator negative test (earlier):** injecting a duplicate slug, a broken related-article
  link, a non-contiguous series order, a publish-without-approval, and a stub source file on a
  public article produced six errors and a non-zero exit, confirming the gate works.
- **Greps:** `TODO|PLACEHOLDER|TBD` none (the intentional source-stub markers are separate and
  documented). Em dashes: zero. Decorative emoji: zero.
- **Registry invariants:** 26 records, all IDs unique, all slugs unique, four formal series
  present, the introductory feature separate (seriesOrder 0, `series: null`), 25 planned and 1
  drafted, every record `formats: ["web", "print"]`, every record carries `availableLanguages`
  and `translationOf` (Spanish-ready).
- **Visibility:** 26 of 26 article pages carry `robots: noindex`; the homepage and five series
  pages are indexable. Only approved and published render publicly, and there are none, so no
  public page exists with a stub source file.
- **No-JS and print:** article bodies (prototype and placeholders) are present in the static
  HTML and readable with JavaScript disabled; the print rules live entirely in
  `css/fsa-articles.css` `@media print` and need no JavaScript.
- **Brand style check:** `scripts/fsa-style-check.sh` passes on the new CSS, HTML, template,
  and snippet (the earlier empty `:root {}` warning was removed in the prior pass).
- **Legacy non-interference:** zero `*-complete-guide.html` files are in the generated output;
  the two preexisting guide pages are untouched and were never in the build set.

Failures that were corrected during this pass: the em-dash occurrences (item 1) and the four
skill contradictions (items 2 to 5). All are now resolved and re-verified.

## Prototype review

The prototype `why-saving-money-feels-so-hard` is a strong draft. Structure is complete and
in order, the voice is on target, dignity is explicit (it rejects framing difficulty as moral
failure and names structural constraints while keeping agency), the boundary case does real
work including a case where "save first" is not clearly right, the scenario is original and
numerically simple, and the body contains no em dashes and no decorative emoji. On the ten-point
rubric it earns nine 5s.

What still needs human judgment: the one Tier B claim (present bias / hyperbolic discounting) is
a `_add citation_` placeholder in its source file, which is a blocker to approval; the article
must not reach `approved` until a named, dated source is added. Separately, a reviewer should
weigh whether the main body, which frames saving as a present-bias-and-friction contest, should
acknowledge earlier that for some readers there is simply no surplus to save; the boundary case
raises this, but only in part 7. This is the same class of nuance the "Every Dollar" brief was
asked to center, and it is a genuine editorial call, not a defect. The rubric scores are on the
generous side; the one material gap (sourcing) is correctly caught and correctly blocks approval.

## Skill test

Two tests were run. The self-test (`TEST-why-saving.md`, Mode 3 audit of the prototype) honestly
identifies the sourcing blocker, scores Evidence quality below the pass bar for it, confirms no
em dashes or emoji, and stops at `drafted` / `human-review-required` without claiming approval.

The Mode 1 test requested here produced a proposed editorial brief for "Every Dollar Has Four
Jobs. Which One Is Yours Doing?" at `docs/proposed-briefs/every-dollar-has-four-jobs.brief.md`.
It is useful. It refuses to assume spending, saving, investing, and debt repayment are four
equally available choices, and it centers the case where income is already fully committed to
basic needs, framing that as a math-and-structure reality rather than a discipline failure. It
also caught a real originality risk: the phrase "give every dollar a job" is a distinctive slogan
associated with the budgeting product YNAB, so the framing and title need a manual similarity
review and a clearly original angle. It proposed, but did not apply, refinements to the existing
`FSA-ARTICLE-002` record, and it stopped at the brief without drafting prose. The registry was
not modified.

## Files created and modified

**Created this pass:**
- `docs/proposed-briefs/every-dollar-has-four-jobs.brief.md` (Mode 1 skill output)
- `docs/fsa-money-ideas-build-reconciliation.md` (this report)

**Modified this pass:**
- `scripts/build.py` (source heading and docstring: em dashes removed)
- `scripts/validate_articles.py` (docstring and banner: em dashes removed)
- `scripts/prototype_content.py` (docstring: em dash removed)
- `articles/README.md`, `templates/educational-article-template.html`,
  `docs/fsa-module-integration-snippet.html`, `articles/sources/_source-file-template.md`
  (em dashes removed)
- All 26 `articles/sources/*.sources.md` and 26 `articles/**/*.html` (regenerated; source
  headings now `# Sources:`)
- `skills/fsa-educational-writer/SKILL.md` (description, six-mode section rewritten with
  per-mode attributes, workflow note, path qualifier)
- `skills/fsa-educational-writer/README.md` (six-mode list, path qualifier)
- `skills/fsa-educational-writer/references/fsa-article-structure.md` (path qualifier)
- `skills/fsa-educational-writer/templates/article-audit.md` (mode number)
- `skills/fsa-educational-writer/templates/article-draft.md` (`formats`)
- `skills/fsa-educational-writer/templates/print-companion.md` (`formats` note)
- `skills/fsa-educational-writer/TEST-why-saving.md` (mode label, `formats`, print note)

The full library inventory (about 99 files across `articles/`, `css/`, `js/`, `templates/`,
`standards/`, `docs/`, `scripts/`, and `skills/`) is described in `articles/README.md`.

## Remaining risks

**Editorial.** Only the prototype is drafted; the other 25 articles are structured placeholders.
Each still needs real drafting, a filled source file, and passage through both review gates. The
prototype uses temporary content and is not approved.

**Source.** The prototype's present-bias citation is a placeholder and blocks its approval. Any
Tier B statistic added to a future article (for example the emergency-expense figure flagged in
the Every Dollar brief) must be sourced to a primary source and dated, or dropped.

**Originality.** The "Every Dollar Has Four Jobs" topic sits near YNAB's "give every dollar a
job." A manual similarity review is required before that article advances, and its title may need
adjustment. The originality protocol applies to every article, not just this one.

**Accessibility.** Semantic structure, skip links, focus states, reduced-motion, descriptive
links, print-without-JavaScript, and noindex on unfinished pages are all in place, and the design
passes the brand style check. An automated accessibility pass (for example axe or Lighthouse) and
a real screen-reader spot check have not been run and should be done before the first publish.

**Technical.** The pages are generated; editing the HTML by hand instead of `library_data.py`
plus `build.py` would drift from the registry. The build and validate scripts are the guardrail;
run both before any commit that touches article data. Module cross-links ship as a snippet rather
than being inserted into the ten live module pages, to avoid touching production files unattended.

**Maintenance.** Source files for planned articles are stubs by design; the validator prevents a
stubbed article from going public, but a human must remember to fill them at draft time. Dated
Tier B facts need a refresh schedule. The registry is the single source of truth; keep IDs and
slugs stable.

## Human approval required before the first article is published

1. **Confirm the prototype's source.** Replace the present-bias `_add citation_` with a named,
   dated, primary or authoritative behavioral-economics source. Until then, `why-saving` cannot
   reach `approved`.
2. **Run both review gates on any candidate article:** the educational review (misconception
   method, structure, scenarios, voice, evidence, neutrality, Bitcoin rules) and the accessibility
   review (semantic markup, keyboard, contrast, print version), then the pre-publish checklist in
   the master standard.
3. **Decide the Every Dollar questions** in the proposed brief: whether to update the
   `FSA-ARTICLE-002` record, how to differentiate from YNAB and whether to adjust the title, which
   four-jobs taxonomy to lock, and whether to include the emergency-expense statistic.
4. **Approve the module cross-link rollout** (the snippet) into the module pages, one at a time,
   with a visual check.
5. **Run an automated accessibility pass and a screen-reader spot check** on the first article to
   be published.
6. **Only then** set `status: approved` (and `reviewStatus: approved`), re-run
   `scripts/validate_articles.py`, build, and publish. The writing skill never performs this step.
