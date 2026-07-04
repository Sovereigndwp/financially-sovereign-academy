# FSA Worksheet / Download System (v0.1)

Phase 0 planning artifact. No files created in the FSA repo yet; this is the plan. Defines where worksheet sources and PDFs live, naming, format, and how to keep online and paper aligned.

## Format decision: HTML print section + generated PDF (both), from one markdown source

Recommendation: **single source of truth in markdown**, rendered two ways.
- **Markdown source** (`.md`) is authored once per worksheet.
- **HTML print section** is embedded in the module page (a print-friendly block the learner can use or print directly), generated from the markdown.
- **PDF** is generated from the same markdown (pandoc + XeLaTeX, the approach already proven on the reentry packet), for the download button.

Why: one source avoids drift between the on-page version and the downloadable version. Authoring in markdown keeps worksheets easy to edit and diff, and reuses the existing PDF toolchain. The HTML print section means no download is required to use the worksheet; the PDF serves those who want to print or keep it.

Rejected alternatives: HTML-only (no portable download), PDF-only (not usable inline, worse a11y), or hand-maintaining both HTML and PDF separately (guarantees drift).

## Where source files should live (FSA repo)

```
financially-sovereign-academy/
  worksheets/
    src/                         # markdown source of truth (authored once)
      module-02-starter-cushion-tracker.md
      module-03-account-shopping-checklist.md
      ...
    pdf/                         # generated PDFs (build output)
      FSA-Module-02-Starter-Cushion-Tracker.pdf
      ...
    build/                       # build helper (pandoc header, small script)
      worksheet-header.tex
      build-worksheets.sh
```

- Keep worksheets in their own top-level `worksheets/` tree, not inside `modules/`, so the module HTML links out to them and the sources are managed together.
- `src/` is authored and reviewed; `pdf/` is generated output (can be regenerated any time); `build/` holds the shared print header and a small build script.

## Where downloadable PDFs should live

- `worksheets/pdf/` in the repo, served at `/worksheets/pdf/<file>.pdf`.
- The module page's download button links to that path (absolute `/worksheets/pdf/...` so it resolves under any route, matching the repo's absolute-path convention).

## File naming convention

- **Source markdown:** `module-NN-<kebab-title>.md` (e.g. `module-02-starter-cushion-tracker.md`).
- **PDF:** `FSA-Module-NN-<Title-Case-Title>.pdf` (e.g. `FSA-Module-02-Starter-Cushion-Tracker.pdf`).
- **In-page section id:** `mod-<slug>__worksheet` (from the template spec).
- Zero-pad module numbers (02, not 2) so files sort in course order.
- Version: worksheets do not carry v-numbers in the filename for the live free course; the repo's git history is the version record. (Contrast with the reentry packet, which is version-stamped because it is pre-pilot.)

## How to avoid duplicating learner content unnecessarily

- The worksheet is a **takeaway artifact**, not a copy of the lesson. It contains: a one-line purpose, the fields/checklist the learner fills in, and the minimum instructions to use it on paper.
- The full teaching content stays in the module page only. The worksheet references it ("From Module 2") rather than restating it.
- The on-page HTML print section and the PDF are generated from the same markdown, so the "duplicate" (online vs paper) is one source rendered twice, not two authored copies.
- Shared boilerplate (footer, "educational information, not advice," logo line) lives in the build header, not in each worksheet source.

## How to keep the online and paper versions aligned

- One markdown source per worksheet; both outputs generated from it. Never hand-edit the PDF or the embedded HTML directly.
- A build step regenerates the PDF and the embedded HTML section whenever the source changes; a check confirms the on-page section matches the current source (a simple hash or a build timestamp noted in a manifest).
- The module page embeds the generated HTML section (not a hand-written copy), so editing the source updates both.
- CI/proof rule: if `src/*.md` changes, `pdf/*.pdf` must be rebuilt in the same change; a stale-PDF check flags mismatches.

## Recommended folder structure (summary)

`worksheets/src/` (markdown, authored) → `worksheets/build/` (pandoc header + script) → `worksheets/pdf/` (generated) → linked from `modules/<slug>.html` at `/worksheets/pdf/...`, with the embedded print section injected into the module's block 8.

## Recommended first worksheet: Module 2 - Starter Cushion Tracker

- **Source:** `worksheets/src/module-02-starter-cushion-tracker.md`
- **PDF:** `worksheets/pdf/FSA-Module-02-Starter-Cushion-Tracker.pdf`
- **Why first:** simplest high-value artifact; Module 2 is the redesign pilot; a tracker is naturally paper-friendly (rungs, dates, running total) and needs no live calculation.
- **Shape (one page):** purpose line; a small table of cushion rungs (target amount, date, done?); a "where I keep it" line; a "next automatic transfer" line; the standard educational-not-advice footer. Content drafted in the Module 2 pilot plan, not here.

## Build mechanics (reuse, do not reinvent)

- Reuse the reentry-packet pipeline: `pandoc <src>.md --pdf-engine=xelatex` with a shared `worksheet-header.tex` (page size, margins, DejaVu fonts for unicode, footer). One-page worksheets, black-and-white, print-friendly.
- `build-worksheets.sh` loops `src/*.md` to `pdf/*.pdf`. Runs on demand; output committed alongside source.

## Guardrails

No worksheet files, PDFs, CSS, or module files are created or edited in Phase 0. This document is the plan; the first actual worksheet is built in the Module 2 pilot, on a branch, for review.
