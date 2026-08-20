# Operational Governance Test 001: Report

Executed 2026-07-18 against the FSA Money Ideas production system, by running one real
asset (FSA-ARTICLE-002, "Every Dollar Has Four Jobs. Which One Is Yours Doing?") through
the complete institutional lifecycle as currently designed. The auditor followed the
institution's own files and rules, recorded every point where it had to guess, and did
not fix what it found (observations were recorded in the production observations log,
which is the institution's own mechanism for exactly that).

The finished asset itself is deliverable 1 and lives at
`articles/money-decisions/every-dollar-has-four-jobs.html` (rendered, DRAFT banner,
noindex), with its body in `scripts/four_jobs_content.py`, its registry record in
`scripts/library_data.py`, its completed source file in
`articles/sources/every-dollar-has-four-jobs.sources.md`, and its handoff audit in
`docs/fsa-article-002-draft-audit.md`.

---

## 2. Institutional execution log

Every capability that participated, in the order the institution invoked it.

```
Intake (registry: library_data.py / article-library.json; FSA-ARTICLE-002 at `planned`)
  ↓
Roadmap selection (initialCollection flag + proposed brief vs retrospective's
  "Economic Thinking next" — CONFLICT; escalated to the human operator, resolved: 002)
  ↓
Canonical context load (CLAUDE.md → TSA brain at ~/Documents/Claude/Projects/TSA
  — UNREACHABLE; fell back to FSA-local governance, which proved sufficient)
  ↓
Editorial planning (Mode 1 brief, pre-existing in docs/proposed-briefs/, with five
  reserved human decisions)
  ↓
Human decision gate (brief adoption; taxonomy Live/Prepare/Protect/Grow; Tier B
  statistic excluded — all resolved by Dalia in session; no on-repo capture point)
  ↓
Registry governance (record updated: title, misconception, coreQuestion, mentalModel,
  learnerOutcome, supportingConcepts, audiences, modules; ID and slug held stable)
  ↓
Educational writing (Mode 2: 17-step workflow, 13-part structure, voice standard,
  misconception method, scenario, boundary case; 1,397 words)
  ↓
Source governance / claims management (evidence tiers applied; zero dated Tier B
  claims by decision; 3 Tier A citations, 2 verified live, 1 flagged for human
  confirmation; Tier C illustration quarantined in the source file)
  ↓
Originality governance (protocol run; YNAB adjacency mitigated and residual risk
  reserved for the human similarity review the brief requires)
  ↓
Curriculum / learning-objective mapping (series order 2, four canonical modules,
  concept vocabulary, learnerOutcome, relatedArticles wired into Related Learning)
  ↓
Build engine (build.py: THIRD hardcoded body module + parallel elif, mirroring the
  existing pattern per the v1.0 freeze; the retrospective's refactor trigger is now met)
  ↓
Validation & retrieval verification (validate_articles.py PASS: 26 articles, 32 pages
  scanned, 0 public; source-persistence suite PASS; public-visibility suite PASS;
  build determinism spot-checked byte-for-byte against 4 pages from disk)
  ↓
Self-audit at handoff (Mode 3: rubric 10/10 dimensions scored, writing audit run,
  Reader Experience Review advisory pass: change nothing)
  ↓
Publication preparation (public-visibility rule enforced: DRAFT banner + robots
  noindex on the rendered page; 0 articles public; homepage/series pages unchanged
  for public readers)
  ↓
Institutional memory (5 observations appended to fsa-production-observations-log.md;
  draft audit filed in docs/; TSA-level memory NOT updated — no defined process)
  ↓
HANDOFF: status drafted / reviewStatus human-review-required
  (fact-check confirmation → educational review gate → accessibility review gate →
   approval are human steps the institution correctly refuses to let this pass perform)
```

Capabilities that did NOT participate because the institution does not (yet) possess
them for articles: automated accessibility checking (the gate exists as a human state;
the module-level a11y checklist in FSA-Institutional-Projects has no article-level
counterpart), a decisions registry, a cross-repo memory update process, and the
companion-asset layer (the "cost of later" calculator class of assets, known and
deliberately deferred).

---

## 3. Operational audit

**Intake / registry.** YES. The registry told me exactly what existed, what state it was
in, and which fields are stable. Single source of truth held: one edit point
(library_data.py), everything else generated. Stable IDs and slugs survived a title
change with zero link breakage (the build rippled the new title into 001's and 003's
related links automatically).

**Roadmap selection.** PARTIALLY. The institution has three roadmap signals
(initialCollection, the proposed brief, the retrospective's closing recommendation) and
they disagreed. I had to stop and ask. The information existed; a single authoritative
"next" did not.

**Canonical context (TSA brain).** NO. CLAUDE.md's first instruction ("read
TSA/MEMORY.md and content-operating-system.md before working here") cannot be executed:
the path points to a location outside both granted repos, and the TSA monorepo carries
no MEMORY.md or standards/ at its root. Three documents repeat this pointer. The
institution survived because FSA-local governance is complete enough, but its stated
constitution chain is broken at the first link.

**Editorial planning (Mode 1).** YES. The pre-existing brief was the strongest artifact
in the run: it scoped the article, pre-named the originality risk, planned the evidence
tiers, and correctly reserved five decisions for a human instead of guessing.

**Human decision gates.** PARTIALLY. The gates fired exactly where designed (brief
adoption, taxonomy, Tier B inclusion, and the hard stop at drafted). But the decisions
themselves have no canonical on-repo home; they now live in a draft-audit file and a
source-file note because the auditor put them there, not because the institution said
where they go.

**Educational writing (Mode 2).** YES. The 17-step workflow, 13-part structure, voice
standard, and gold-standard anchors answered essentially every drafting question before
it became a guess. The one taxonomy ambiguity (where "repay" lives under
Live/Prepare/Protect/Grow) was flagged, not guessed silently, which is the designed
behavior.

**Source governance / claims management.** YES. The tier system, never-invent list, and
source-file format worked as designed; the validator's stub detection gives the standard
teeth. One citation URL could not be machine-verified and is flagged rather than
asserted, which is the correct institutional behavior. Minor weakness: the source-file
status header duplicates registry state by hand (drift risk already logged on 07-17,
reproduced today).

**Originality governance.** YES. The protocol caught the real risk (YNAB) at brief time,
the draft was differentiated by design, and the residual title risk is held for the
human review the standard requires.

**Curriculum architecture / learning-objective mapping.** YES. Controlled vocabularies,
canonical module names, series ordering, and relatedArticles all resolved mechanically
and were validated mechanically.

**Build engine.** PARTIALLY. It produced a correct, deterministic site (verified
byte-for-byte on unchanged pages). But adding one article required editing Python in two
files (a new body module and a third near-identical elif with per-article headings),
which is a code change to make a content change. The institution predicted this exact
moment ("the moment we would write a third elif") and its own trigger has now fired.

**Validation / retrieval verification.** YES. validate_articles.py plus the two test
suites caught nothing because there was nothing to catch, and negative testing (the
suites' stub/visibility cases) shows they would have. This is the institution's best
enforcement layer.

**Accessibility review.** PARTIALLY. The rendered page inherits the template's semantic
structure, skip links, print stylesheet, and reduced-motion support, and the gate exists
as a lifecycle state. But there is no article-level accessibility checklist artifact to
execute against, so the gate currently means "a human looks," with no instrument.

**Publication preparation / public-visibility rule.** YES. Unambiguous and mechanically
enforced: 0 public articles, DRAFT banner and noindex on the new page, homepage and
series pages expose nothing unapproved. The strongest single rule in the institution.

**Institutional memory.** PARTIALLY. The production observations log is real, append-only,
and was the natural place to record findings (it worked exactly as intended). But memory
does not travel upward: TSA's memory/projects/fsa.md predates the entire Money Ideas
system, and no process says when or how FSA production updates the family brain.

**Version governance.** PARTIALLY. Static REVISION_DATE discipline held (no live dates
anywhere). Git exists and the operator model (Claude hands over git commands) is
documented. But "version" for an article means three loosely coupled things (registry
status, source-file header, git history) with no single stamp tying a draft to the
decisions that shaped it.

---

## 4. Institutional improvement backlog

**Critical**

- C1. The canonical-context chain is broken: CLAUDE.md (in both repos) directs all work
  to `~/Documents/Claude/Projects/TSA` (`MEMORY.md`, `content-operating-system.md`),
  which was unreachable from this execution, and no fallback order is defined. Every
  future session either silently skips the constitution or guesses. Fix the pointer, or
  formally delegate canonical authority for article production to the FSA-local docs
  (which this run proved are sufficient).

**High**

- H1. No canonical "next asset" pointer. Three roadmap signals disagreed and a human had
  to adjudicate what the roadmap should already say. One registry flag or a one-line
  roadmap note ends this class of stall.
- H2. No decision registry. The taxonomy choice, the Tier B exclusion, and the brief
  adoption were all made correctly and captured nowhere canonical. An append-only
  `docs/fsa-decisions-log.md` (date · decision · by whom · where applied) makes every
  future draft auditable against its decisions.
- H3. The slug→body registry decision is now due: the third elif exists. The trigger the
  retrospective set has fired; deciding (either way) is now cheaper than deferring,
  because Economic Thinking would add elifs four through nine.
- H4. TSA-level memory is stale for FSA (still "build second," `properties/fsa/`, no
  Money Ideas). Define the moment production updates the family brain (e.g., at each
  series retrospective), or accept and document that TSA memory is strategic-only.

**Medium**

- M1. `docs/proposed-briefs/` has no lifecycle state (proposed → adopted/rejected/
  superseded). The adopted 002 brief still reads as a proposal and now half-disagrees
  with the registry it refined.
- M2. Source-file status headers drift from the registry (observed 07-17, reproduced
  07-18). The already-logged fix (build stamps headers, preserves body; or validator
  flags mismatch) is small and prevents silent contradiction.
- M3. Review artifacts have no naming/location convention: pilot audits live variously
  in `docs/pilot-*.md`, `skills/.../TEST-why-saving.md`, and now
  `docs/fsa-article-002-draft-audit.md`. One folder, one naming pattern.
- M4. The accessibility gate has no article-level instrument. The module-level checklist
  in FSA-Institutional-Projects is 90% reusable; an articles variant would turn the gate
  from "someone looks" into a check that can fail.

**Low**

- L1. REVISION_DATE (2026-07-16) vs source-file "Last updated" dates still unreconciled
  (known; ride along with M2).
- L2. A stray file named `Type` (564 bytes) sits at the FSA repo root; unowned artifacts
  at the root erode the "everything has a place" norm.
- L3. The validator does not sanity-check readingMinutes against actual word count; a
  drift here would ship a wrong reader promise without failing anything.

---

## 5. Governance recommendation

**After one complete production cycle: at the article-production level, TSA is behaving
like an operational institution. At the family level, it is not yet one institution; it
is one excellent production cell plus a brain that has not heard from it.**

Evidence for the first half: at 13 of 16 stations the institution told me what to do
next without guessing, in its own documents, before I needed to ask. It made the right
things easy (registry → brief → skill → build → validate), and, more tellingly, it made
the wrong things impossible or loud: the writing system is structurally unable to
approve itself; an unapproved article physically cannot render publicly without tripping
a validator, a test suite, and a visible banner; a missing source is a blocker by
mechanism, not by good intentions. When this test required judgment calls, the
institution had already pre-registered most of them as reserved human decisions in the
brief, which is exactly what "governance working under live conditions" looks like. The
five findings recorded today went into an append-only log the institution had already
built for that purpose.

Evidence for the second half: every failure found today is a seam, not a station. The
constitution pointer at the top of CLAUDE.md dead-ends (C1). The roadmap speaks with
three voices (H1). Decisions bind the work but live only in conversation (H2). The
family brain still describes an FSA that predates this entire production system (H4).
None of these stopped the cycle, because the FSA-local layer is self-sufficient; all of
them mean the institution's knowledge of itself is running behind its actual practice,
and a second operator (or a future session with no memory of this one) would inherit the
gaps.

The honest verdict is therefore: **yes, conditionally.** The production loop is
institutional-grade now. The condition is repairing the four seams above (C1, H1, H2,
H4), all of which are documentation and pointer work, not redesign, and none of which
touch the frozen constitution. The engine-refactor decision (H3) is the only item that
touches code, and the institution's own trigger for it has fired.

What this test could not evaluate: the two human review gates, approval, and publication
were not exercised, because exercising them without a human reviewer would have required
violating the institution's central rule. That refusal being non-negotiable under an
instruction to "execute the complete lifecycle" is itself evidence the governance holds.
