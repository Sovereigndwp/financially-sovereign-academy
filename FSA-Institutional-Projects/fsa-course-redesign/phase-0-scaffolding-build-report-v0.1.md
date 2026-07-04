# Phase 0 Scaffolding — Build Report (v0.1)

Branch (yours to create): `feat/fsa-course-hybrid-scaffolding`. Build infrastructure only. No module content, calculators, navigation, correctional/reentry packet, provisional preview, or PDF-packet files edited. Nothing committed.

## 1. Files created

**In the FSA repo (`financially-sovereign-academy/`):**
- `worksheets/src/` (new folder) — markdown worksheet sources.
  - `worksheets/src/module-02-starter-cushion-tracker-v0.1.md` — sample worksheet source.
- `worksheets/build/` (new folder) — shared build mechanism.
  - `worksheets/build/build-worksheet-pdf.sh` — reusable PDF build script (executable).
  - `worksheets/build/worksheet-header.tex` — shared print header.
- `worksheets/pdf/` (new folder) — generated PDFs.
  - `worksheets/pdf/FSA-Module-02-Starter-Cushion-Tracker-v0.1.pdf` — generated sample.

**In the workspace (`FSA-Institutional-Projects/fsa-course-redesign/`):**
- `snippets/module-gate-snippet-v0.1.html`
- `snippets/traps-callout-snippet-v0.1.html`
- `snippets/worksheet-download-snippet-v0.1.html`
- `snippets/a11y-css-snippet-v0.1.css`
- `phase-0-scaffolding-build-report-v0.1.md` (this file)

The four snippets are **reference only** and are not imported into any live module or stylesheet.

## 2. Worksheet PDF: generated

Yes. `FSA-Module-02-Starter-Cushion-Tracker-v0.1.pdf` built successfully (56 KB). Footer ("Educational information, not financial advice.") and title verified present via text extraction.

## 3. Exact command used

```
worksheets/build/build-worksheet-pdf.sh \
  worksheets/src/module-02-starter-cushion-tracker-v0.1.md \
  worksheets/pdf/FSA-Module-02-Starter-Cushion-Tracker-v0.1.pdf
```
Internally this runs: `pandoc <src> -o <out> --pdf-engine=xelatex -V mainfont="DejaVu Serif" -V sansfont="DejaVu Sans" -V monofont="DejaVu Sans Mono" -V geometry:margin=0.7in -V fontsize=10pt -H worksheets/build/worksheet-header.tex`. The script also supports `--all` to build every `src/*.md`.

## 4. Pandoc / xelatex issues

- No errors. pandoc 2.9 + XeLaTeX present; DejaVu fonts cover the worksheet glyphs (checkboxes, slashes). The script falls back to pdflatex if xelatex is absent (flagged in its output), and errors clearly if pandoc is missing.

## 5. Page count: 2 pages — DECISION: keep 2 pages

All worksheets render as **2 pages**, and the decision is to **keep them at 2 pages for now** because they are fill-in tools that need handwriting space. Deliberate choice, not a build limitation:
- Each has its fill-in sections plus tables and writing room.
- Tested at 9pt and 8pt with 0.5in margins: still 2 pages. One page would require a font too small for a fill-in worksheet, or cutting sections.
- Not trimmed to 1 page. The build mechanism imposes no page limit; revisitable later without toolchain changes.

## Update (reconciliation, this pass)

- All ten worksheet PDFs are built and use the **standardized naming only**: `module-NN-slug-v0.1.pdf`. The earlier manual orphan `FSA-Module-02-Starter-Cushion-Tracker-v0.1.pdf` has been **deleted**.
- All five planning/audit docs now live in `FSA-Institutional-Projects/fsa-course-redesign/` in the FSA repo (audit, template spec, worksheet-system, a11y checklist, Module 2 pilot plan), alongside this report, the snippets, the prototype, and the worksheets.
- No live module, CSS, navigation, reentry-packet, or provisional-preview file was changed. Module 2 pilot not started.

## 6. How Module 2 would consume this later (pilot, separate step)

- Module 2's new worksheet block (template block 8) links `href="/worksheets/pdf/module-02-starter-cushion-tracker-v0.1.pdf"` via the download snippet, and embeds a print-friendly HTML version generated from the same `src/*.md` (so online and paper stay aligned).
- The gate snippet drops in after the hero; the traps snippet standardizes the existing inflation-erosion caveat; the a11y CSS defaults are applied to the module.
- None of this happens now. It is the Module 2 pilot, done on a branch, verified in served mode, per `fsa-module-2-pilot-plan-v0.1.md`.

## 7. What remains before the Module 2 pilot

- Your review/approval of this scaffolding and the four planning docs.
- Decide the worksheet page-count question (2 pages vs trim to 1).
- Build the HTML-injection step that turns `src/*.md` into the embedded on-page worksheet section (currently the PDF path is proven; the on-page embed is wired during the pilot).
- Then the pilot: apply gate + traps + worksheet block + a11y defaults to `modules/emergency-funds-saving.html` only, on a branch, verified served, calculator and tokens untouched.

## 8. Verification

- Generated PDF opens and renders (56 KB, 2 pages); footer and title confirmed via `pdftotext`.
- `git status` in the FSA repo shows only `worksheets/` (untracked). No `modules/` or `css/` changes.
- The only CSS created is the standalone reference snippet `a11y-css-snippet-v0.1.css` in the workspace, not in the FSA `css/` tree and not imported anywhere.
- Snippets and report live under `FSA-Institutional-Projects/fsa-course-redesign/`.

## 9. Rollback instructions

- **FSA repo:** the entire change is the new, untracked `worksheets/` folder. Rollback = delete `worksheets/` (or, once staged, `git rm -r --cached worksheets && rm -rf worksheets`). Nothing existing was modified, so there is nothing to revert.
- **Workspace:** delete `FSA-Institutional-Projects/fsa-course-redesign/snippets/` and this report if not wanted.
- No module, CSS, navigation, packet, preview, or PDF-packet files were touched, so no other rollback is needed.

## Suggested git steps (for your review, run in the FSA repo)

```
cd ~/projects/financially-sovereign-academy
git switch -c feat/fsa-course-hybrid-scaffolding
git add worksheets/
git status            # only worksheets/ ...
git diff --cached
# when satisfied:
git commit -m "Phase 0: FSA worksheet build scaffolding (script + header + sample source + sample PDF; no module edits)"
```
The snippets and report live in the separate workspace project and are not part of the FSA repo commit.
