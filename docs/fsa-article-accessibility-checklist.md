# FSA Money Ideas: Article Accessibility Gate (v0.1)

The instrument for the **accessibility-review** gate in
`docs/fsa-article-editorial-workflow.md`. Target: WCAG 2.1 AA.

Adapted from `FSA-Institutional-Projects/fsa-course-redesign/fsa-module-a11y-interaction-checklist-v0.1.md`,
cut down to what an article page actually contains. Module-only concerns (calculators,
quizzes, branching scenarios, completion state, lab cards, no-JS fallbacks for interactive
components) are **out of scope** here and stay in the module checklist. This is not a new
framework and it does not replace that document.

**Scope.** One rendered Money Ideas article page. Run it once per article, at the
accessibility gate, before approval.

**Verdict rule.** The gate returns **PASS** only if every applicable row is PASS.
Any FAIL returns the article to the author. `N/A` is allowed only where the row's
precondition is absent (for example, image rows when the article has no images), and the
reason must be written in. **An unrun row is a FAIL, not a blank.**

**Time to run:** about 20 minutes per article, most of it the keyboard and zoom passes.

---

## How to run it

You need: the rendered page served locally or on the site, a keyboard, a browser with
devtools, and a print preview. Four passes cover every row.

1. **Static pass** (devtools Elements / view-source). Rows A1 to A6, D1.
2. **Keyboard pass** (Tab from the top of the page to the bottom, nothing else). Rows B1 to B4.
3. **Visual pass** (devtools device toolbar at 320px; browser zoom to 200%; reduced-motion
   emulation on; contrast picker). Rows C1 to C5.
4. **Print pass** (Cmd-P preview, greyscale). Rows E1 to E3. Skip only if the page has no
   Print / PDF affordance, which for the current template it always does.

Screen-reader smoke test (row D2) is a fifth pass and needs VoiceOver. Twelve minutes
the first time, three minutes thereafter.

---

## A. Structure and semantics

| # | Check | How to verify | Verdict |
|---|---|---|---|
| A1 | Exactly one `<h1>`, and it matches the article title | view-source, count `<h1>` | |
| A2 | Heading levels descend without skipping (h1 then h2, no h2 then h4). Visual size is allowed to differ from level (the exercise titles are `<h2 class="fsa-h3">`, which is correct) | list every `<hN>` in document order | |
| A3 | Landmarks present and unique: one `<main id="main">`, `<header>`, `<footer>`, and every `<nav>` carries a distinct `aria-label` | view-source | |
| A4 | Every `<section>` and `<aside>` that acts as a region has an accessible name (`aria-label` or `aria-labelledby`) | view-source | |
| A5 | `<html lang>` is set and correct for the article's language | view-source | |
| A6 | Nothing meaningful is inside an `aria-hidden="true"` element. Decorative separators and the progress bar may be hidden; text a reader needs may not | view-source, inspect each `aria-hidden` | |

## B. Keyboard

| # | Check | How to verify | Verdict |
|---|---|---|---|
| B1 | The skip link is the first focusable element, becomes visible on focus, and moves focus into `#main` | Tab once from page load, then Enter | |
| B2 | Every interactive element (skip link, nav links, breadcrumb links, Print button, body links, related links, source-file link) is reachable by Tab and operable by Enter or Space. No keyboard trap | one full Tab pass to the footer, then Shift+Tab back | |
| B3 | A visible focus indicator appears on every focused element, and it is not colour alone (an outline is required) | watch the ring through the B2 pass | |
| B4 | Tab order matches visual reading order | note the order during the B2 pass | |

## C. Visual, zoom and motion

| # | Check | How to verify | Verdict |
|---|---|---|---|
| C1 | Body text meets 4.5:1 against its background; large text (>=24px, or >=18.7px bold) meets 3:1; focus indicators and meaningful borders meet 3:1 | devtools contrast picker on: body prose, the status banner and its tag, the breadcrumb links, the reading-meta line, the mental-model callout, the footer | |
| C2 | **`--color-faint` (#6E727A) is 3.85:1 on the page background and therefore fails AA for text.** It is permitted only on elements that are `aria-hidden` and carry no meaning (the breadcrumb separator, the meta dot). If it appears on any text a reader must read, this row FAILS | search the rendered page for elements resolving to `--color-faint` and confirm each is decorative | |
| C3 | No horizontal scroll and no clipped content at 320px width. Text reflows; nothing requires two-dimensional scrolling | device toolbar at 320px, then 375px | |
| C4 | At 200% browser zoom, all content and functionality remain available and nothing overlaps | Cmd-+ to 200% | |
| C5 | With `prefers-reduced-motion: reduce` emulated, the reading-progress bar and any transition or animation are neutralised, and no information is conveyed by motion alone | devtools rendering panel, emulate reduced motion, then scroll | |

## D. Text alternatives and assistive technology

| # | Check | How to verify | Verdict |
|---|---|---|---|
| D1 | Every `<img>`, `<svg>` and chart has an appropriate text alternative: descriptive `alt` if it carries meaning, `alt=""` plus `aria-hidden="true"` if decorative. A chart or diagram that teaches something needs its content available as text, not only as a picture. **N/A if the article contains no images** | view-source, count `<img>` and inline `<svg>` | |
| D2 | Screen-reader smoke test: the page title, the h1, the status banner, the mental-model callout, the two exercises and the sources box are all announced, in a sensible order, with their headings | VoiceOver: rotor by heading, then read continuously through the article | |
| D3 | Link text is meaningful out of context. No bare URLs, no "click here", no "read more". A link whose text is generic must carry an `aria-label` that names the destination | list every link's text; read each one aloud with no surrounding sentence | |
| D4 | Every link's destination behaves as a reader would expect from its text. In particular, a link whose text implies a page must not resolve to a raw file download | click each link, note what actually loads | |

## E. Print and readability

| # | Check | How to verify | Verdict |
|---|---|---|---|
| E1 | The article prints legibly in black and white. No meaning depends on a background colour or a coloured border | print preview, greyscale | |
| E2 | Screen-only chrome (top nav, breadcrumb, progress bar, Print button, related-links grid if it is not useful on paper) is suppressed; the article body, the exercises, the closing question and the sources box print | print preview | |
| E3 | The printed page carries the article ID and the revision date in the footer, and links print with meaningful text rather than bare URLs | print preview, read the footer | |

## F. Non-negotiables (any one of these is an automatic FAIL)

| # | Check | Verdict |
|---|---|---|
| F1 | No information is communicated by colour, position, weight or styling alone. Every status, warning and emphasis also has text | |
| F2 | The article's teaching content is present in the served HTML and readable with JavaScript disabled. The progress bar and analytics may require JS; the lesson may not | |
| F3 | The status banner (DRAFTED, IN REVIEW, PLANNED) is readable as text by a screen reader, not conveyed only by the coloured border | |
| F4 | Nothing essential is behind a hover-only interaction | |

---

## Result block

Copy this into the review record and fill it in. An article cannot reach `approved`
without a completed block.

```
ARTICLE:        FSA-ARTICLE-0NN <slug>
BUILD:          <git SHA of the commit whose build produced the page reviewed>
REVIEWED BY:    <name>
DATE:           <YYYY-MM-DD>
BROWSER / AT:   <browser + version; screen reader + version, or "not run">

A1 A2 A3 A4 A5 A6   ...... [P/F/NA]
B1 B2 B3 B4         ...... [P/F]
C1 C2 C3 C4 C5      ...... [P/F]
D1 D2 D3 D4         ...... [P/F/NA]
E1 E2 E3            ...... [P/F]
F1 F2 F3 F4         ...... [P/F]

VERDICT:        PASS | FAIL
FAILING ROWS:   <row ids, one line each, with what was observed>
N/A ROWS:       <row ids, with the reason the precondition is absent>
```

## Where the result is recorded

Three places, all of which already exist. No new file type, no new state.

1. **The review record.** File the completed block as
   `docs/reviews/FSA-ARTICLE-0NN-accessibility.md`. This also settles backlog item M3
   (review artifacts have no naming convention) for the accessibility gate: one folder,
   one filename pattern.
2. **The registry.** The gate result moves `reviewStatus` along the existing vocabulary in
   `docs/fsa-article-editorial-workflow.md`. A PASS is a precondition for a human setting
   `reviewStatus: approved`; a FAIL sends the article back to the author and the editorial
   state moves to `revision-needed`. **No new registry field is required for v0.1.** If a
   later version wants the result queryable, the smallest addition is a nullable
   `a11yGate` object (`{verdict, date, reviewer, build}`), but that is a schema change and
   is deliberately out of scope here.
3. **The decisions log.** Only if the gate produced a judgment that binds future articles
   (for example, a ruling that `--color-faint` may never carry article text). Routine
   PASS results do not belong in `docs/fsa-decisions-log.md`.

## Change control

v0.1 is a first instrument, written to be run rather than admired. After it has been run
on three articles, review it once: delete rows that never fail and never could, and add
rows for anything that reached a reader broken. Record that revision as a decision.
