# FSA Article Editorial Workflow

This document describes how a Money Ideas article moves from a first entry in the registry to a published page, what has to be true to leave each state, who does the work, and what the build and validation scripts enforce. It is written for a solo operator, so it favors clarity and a small number of firm rules over ceremony.

## The states

An article has a single editorial state at any time. The states form a lifecycle from first idea to public page, with two off-ramps for work that needs revision or retirement. Alongside the editorial state, each article carries a separate reviewStatus field that tracks review progress. The two fields work together: the editorial state says where the article is in its life, and reviewStatus says how far its human review has gotten.

**planned.** The pre-draft registry state. The topic exists as a row in the registry with a working title and a note on why it belongs in the library. To leave planned, the topic needs a clear scope and a decision to actually write it. Nothing has been drafted yet. Actor: author.

**idea.** The topic is being shaped: the misconception it will address and the rough angle are taking form. To leave idea, the author has a clear misconception to name and a sense of the core teaching move. Actor: author.

**outlined.** The article is planned against the thirteen-part structure, with the misconception, the scenarios, and the mental model sketched. To leave outlined, the outline covers all thirteen parts and the originality protocol has identified where the topic came from. Actor: author.

**drafted.** A complete draft exists, following the full structure and the FSA voice. This is where the writing process stops on its own. A drafting pass must set reviewStatus to human-review-required and must never advance the article past drafted on its own authority. To leave drafted, a human confirms the draft is complete enough to fact-check. Actor: author, then handoff to review.

**fact-checked.** Every Tier B factual claim has been researched, dated, and sourced to a primary source, and anything uncertain has been marked for review. To leave fact-checked, the source file is real and complete and no unverified claim is presented as settled. Actor: author or fact-checker.

**educational-review.** The article is in the first review gate. To leave educational-review toward approval, the educational reviewer confirms the teaching is sound: the misconception is treated fairly through the six-move method, the structure works, the scenarios are honest and original, the voice is right, and no individualized advice has crept in. Actor: educational reviewer.

**accessibility-review.** The article is in the second review gate. To leave accessibility-review, the accessibility reviewer confirms semantic markup, keyboard navigation, contrast, responsive type, descriptive links, reduced-motion support, touch targets, and a print version that stands on its own in black and white with the article ID and revision date in the footer. Actor: accessibility reviewer.

**approved.** Both review gates have passed and a human approver has signed off against the pre-publish checklist. An approved article is allowed to render publicly. To leave approved toward published, the article is built and deployed. Actor: human approver.

**published.** The article is live on the public site. To leave published, the article either needs a revision or is being retired. Actor: human approver.

**revision-needed.** An off-ramp for a published or in-flight article that has a problem: a stale fact, a factual error, a flaw found after the fact, or a change in the underlying rules. An article in revision-needed does not render publicly until it is fixed and re-approved. To leave revision-needed, the fix is made and the article re-enters review at the appropriate gate. Actor: author, then reviewers.

**archived.** An off-ramp for an article that is being retired. It no longer renders publicly and is kept for the record. To leave archived, a deliberate decision to revive and re-review the article. Actor: human approver.

### reviewStatus vocabulary

The reviewStatus field uses its own small vocabulary that runs in parallel with the editorial state: not-started, educational-review-required, human-review-required, in-review, and approved. A drafting pass sets it to human-review-required. It reaches approved only when a human has taken the article through both gates and the pre-publish checklist. The validation script treats reviewStatus approved as a hard requirement for public rendering.

## The two review gates

There are two review gates, and both must pass before approval.

The educational review gate checks that the article teaches well and stays inside FSA's boundaries. The educational reviewer reads for the misconception method, the thirteen-part structure, the honesty and originality of the scenarios, the voice, the evidence tiers and sourcing, the financial-neutrality rules, and the Bitcoin language rules where they apply. This gate is about whether the article is true, fair, clear, and safe.

The accessibility review gate checks that the article works for everyone who will use it, including screen-reader users, keyboard-only users, mobile readers on slow connections, and facilitators working from print. The accessibility reviewer verifies the accessibility standards and the print standard in full. This gate is about whether the article reaches its whole audience.

An article that fails either gate goes back to the author, not forward. Neither gate can be skipped, and the writing process cannot pass itself through either one.

### Reviewers feeding the educational review gate

The educational review gate is informed by independent reviews that add value from outside the writing engine itself, per the draft review gate in `TSA/standards/content-operating-system.md`. For a Money Ideas article these are educational-effectiveness, content-and-context logic, and, since 2026-08-20, an **economics concept audit** (`skills/fsa-educational-writer/references/fsa-austrian-economics-audit.md`). The Bitcoin technical audit named in the TSA gate rarely applies to this library; the economics audit is its FSA counterpart, and it exists because a library that teaches economics previously reached approval with nobody reading it as economics. Every one of these reviewers is advisory: they produce findings, an editor reconciles them, and a human approves. None of them scores, approves, or rewrites, and where any of them conflicts with the voice standard, the source standard, the dignity rule, or the 13-part structure, those win and the conflict is recorded.

## The Reader Experience Review (final editorial pass)

After an article has completed the six-stage pipeline, run one pass, the Reader Experience Review (`skills/fsa-educational-writer/references/fsa-reader-experience-review.md`). It optimizes for the reader, not the prose: remove anything that momentarily reminds the reader they are reading something written, and confirm the article leaves the reader understanding and remembering. Three lenses, instinct-first, never a checklist: Friction (the former Voice Audit, removing only writing that becomes visible), Anchor (identify but never manufacture the one observation a reader might keep), and the Publisher test (did they learn something new, will one idea stay, did the writing disappear behind the idea). It is not a rewrite, does not add a formal state, and may conclude change nothing. The educational architecture always takes priority over stylistic perfection, and the stop condition is being proud to publish it under your own name. A human approves any change.

## The public-visibility rule

Only approved and published articles render on the public site. Every other state is treated as unfinished and is protected from public exposure in two ways at once: it carries a visible status banner that names its state, and it is served with a robots noindex directive so search engines do not surface it. This is a hard rule with no exceptions. An article that is not approved or published must never appear to a reader or a crawler as finished work.

## What the validation script enforces

The validation script, `scripts/validate_articles.py`, enforces the review gates mechanically so that a mistake cannot quietly reach the public. For any article marked to render publicly, the script requires two things to both be true. First, reviewStatus must be approved. An article that has not cleared human review through both gates cannot render, no matter what its other fields say. Second, the article must have a real, non-stub source file. A missing source file, or a placeholder stub standing in for one, fails validation. This backstops the evidence standard: a public article must show its work.

The build script, `scripts/build.py`, generates the site. It relies on validation having passed and on the state field to decide what renders publicly and what carries a status banner with noindex. Run validation before building. If validation fails, the build should not ship the failing article to a public state.

## How status maps to what the reader sees

The reader's experience follows directly from the editorial state. For an approved or published article, the reader sees the finished page with no status banner and no noindex, and search engines may index it normally. For an article in any other state, the reader, if they reach it at all through a preview, sees a visible banner naming the state, such as a draft or in-review notice, and the page is served noindex so it stays out of search results. The status is never hidden from a reader who lands on an unfinished page, and an unfinished page is never dressed up as finished.

## How a single article moves from planned to published

Here is the practical path for one article, kept lean for a solo operator wearing every hat.

1. Add the topic to the registry as **planned**, with a working title and a one-line reason it belongs in the library.
2. Shape it through **idea** and **outlined**: name the misconception, choose the angle, and lay the outline against the thirteen-part structure. Run the originality protocol to identify where the topic came from.
3. Write the full draft. The article reaches **drafted** with reviewStatus **human-review-required**. The writing pass stops here and does not advance itself further.
4. Fact-check every Tier B claim, date it, and write the real source file. The article reaches **fact-checked**. A stub source file is not acceptable, because validation will reject it.
5. Run the educational review gate. When it passes, the article has cleared **educational-review**.
6. Run the accessibility review gate, including the print version. When it passes, the article has cleared **accessibility-review**.
7. Do a final pass against the pre-publish checklist and approve. The article moves to **approved** and reviewStatus moves to **approved**.
8. Run `scripts/validate_articles.py`. Confirm that reviewStatus is approved and that the source file is real and non-stub. Fix anything the script flags.
9. Run `scripts/build.py` to generate the site, then deploy. The article moves to **published** and renders publicly with no banner and no noindex.

If a problem surfaces later, move the article to **revision-needed**, which pulls it from public rendering until it is fixed, re-reviewed at the right gate, and re-approved. When a topic has served its purpose, move it to **archived**. In both cases the public-visibility rule and the validation gates apply exactly as before, so nothing broken or unfinished slips back onto the public site.
