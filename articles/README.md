# FSA Money Ideas: Article Library

Short educational articles that help learners understand the ideas **beneath**
personal finance: tradeoffs, incentives, time, risk, credit, prices, banking, and
wealth. Not tips. Not financial, legal, tax, or investment advice.

Working name: **FSA Money Ideas** · Subtitle: *Short articles for understanding
how money decisions really work.*

## What lives here

```
articles/
  index.html                       library homepage (generated)
  article-library.json             canonical registry: 26 records (generated)
  README.md                        this file
  series/*.html                    5 series pages (generated)
  foundations/ money-decisions/ …  article pages by series (generated)
  sources/<slug>.sources.md        one companion source file per article
  sources/_source-file-template.md the source-file template
css/fsa-articles.css               article styles (extends css/fsa-brand.css)
js/article-library.js              homepage filtering + analytics (progressive)
js/article-reading-progress.js     progress bar + article events (progressive)
js/article-related-content.js      related-link analytics (progressive)
templates/educational-article-template.html   hand-authoring reference
standards/fsa-educational-article-standard.md  the writing + build standard
standards/fsa-originality-checklist.md         originality gate
docs/fsa-article-editorial-workflow.md         editorial states + review gates
docs/fsa-article-metadata.md                   schema, vocab, analytics events
scripts/library_data.py            SINGLE SOURCE OF TRUTH for all 26 records
scripts/prototype_content.py       drafted body of the prototype article
scripts/build.py                   generator (data -> pages + registry + sources)
scripts/validate_articles.py       integrity checks (run before every commit)
skills/fsa-educational-writer/     the writing skill (drafts, never publishes)
```

> The HTML pages, `article-library.json`, and the `sources/*.sources.md` stubs are
> **generated**. Do not hand-edit them. Change the data, then rebuild.

## How to add or change an article

1. **Edit the record** in `scripts/library_data.py` (or add a new `A(...)` entry).
   Keep `id` and `slug` stable and unique. Set `status` (start at `planned`).
2. **Write the body.** Use the FSA Educational Writer skill
   (`skills/fsa-educational-writer/`): it drafts to the 13-part structure and
   stops at `status: drafted`. For the shape, see `scripts/prototype_content.py`.
   Wire drafted bodies into the generator the same way the prototype is wired.
3. **Rebuild:** `python3 scripts/build.py`
4. **Validate:** `python3 scripts/validate_articles.py`
   (from the repo root, so `/css`, `/js`, and `/modules` links resolve).
5. **Fill the source file** at `articles/sources/<slug>.sources.md` for every
   factual claim. A public article cannot pass validation with a stub source file.
6. **Advance status only through review** (see the editorial workflow). The public
   site shows only `approved` and `published`; every other state carries a visible
   banner and `robots: noindex`.

## Ground rules

- Extend `css/fsa-brand.css` tokens; introduce **no** new design tokens and no
  page-local `:root` brand block. All classes are `.fsa-*` or `.mi-*`.
- No decorative emoji. No em dashes in body prose.
- Reading works with JavaScript disabled; every script here is enhancement only.
- Every article can later gain a Spanish version under `/es/articulos/` with
  `translationOf` set; reusable JS holds no hard-coded learner copy.
- Local preview: `python3 -m http.server 8000` from the repo root, then open
  `/articles/`.
