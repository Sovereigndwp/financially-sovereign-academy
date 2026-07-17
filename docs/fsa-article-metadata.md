# FSA Money Ideas: Article Metadata & Analytics Reference

The canonical machine-readable registry is **`articles/article-library.json`**, generated
from **`scripts/library_data.py`** by **`scripts/build.py`**. Do not hand-edit the JSON; edit
the data module and rebuild. Every field below is validated by `scripts/validate_articles.py`.

Stable identifiers: **article IDs (`FSA-ARTICLE-000`…`025`) and slugs are permanent.**
Titles are display strings and must never be used as identifiers.

## Record schema

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable. `FSA-ARTICLE-NNN`. Never reused, never renumbered. |
| `slug` | string | Stable, kebab-case, unique. Drives the URL. |
| `title` | string | Display only. |
| `subtitle` | string | May be empty. |
| `series` | string \| null | Human series name; `null` for the Foundations intro. |
| `seriesSlug` | string | One of the series keys (below). |
| `seriesOrder` | int | `0` for the intro; `1..n` within each series (contiguous, unique). |
| `collection` | string \| null | e.g. `Foundations`. |
| `seriesPosition` | string \| null | e.g. `introductory`. |
| `status` | enum | Editorial state, see below. |
| `featured` | bool | Part of the initial featured collection. |
| `initialCollection` | bool | The five priority launch articles. |
| `language` | string | `en`. |
| `translationOf` | string \| null | Source article ID when this is a translation. |
| `availableLanguages` | string[] | e.g. `["en"]`. |
| `readingMinutes` | int | 4–8 typical. |
| `difficulty` | enum | `foundational` \| `intermediate` \| `advanced`. |
| `primaryConcept` | string | One main idea. |
| `concepts` | string[] | Tags from the concept vocabulary (browse-by-concept). |
| `supportingConcepts` | string[] | Secondary ideas. |
| `misconception` | string | The one belief the article examines. |
| `coreQuestion` | string | The single question the article answers. |
| `mentalModel` | string | The reusable takeaway. |
| `learnerOutcome` | string | What the learner can do afterward. |
| `boundaryCase` | string \| null | Optional. A required boundary case the article must include (e.g. where a price is not a complete or unbiased signal). Shown on the placeholder page and honored by the writer skill. |
| `editorialBrief` | string | One-paragraph brief (shown on placeholder pages). |
| `fsaModules` | string[] | Canonical module names (below). |
| `audiences` | string[] | Audience vocabulary (below). |
| `formats` | string[] | `web`, `print`. |
| `publishedDate` | string \| null | ISO date, set at publish. |
| `updatedDate` | string \| null | ISO date. |
| `canonicalPath` | string | `/articles/<seriesSlug>/<slug>.html`. |
| `relatedArticles` | string[] | Slugs; each must exist. |
| `sourcesFile` | string | `/articles/sources/<slug>.sources.md`. |
| `reviewStatus` | enum | Review gate, see below. |

## Controlled vocabularies

**status** (editorial lifecycle): `idea`, `outlined`, `drafted`, `fact-checked`,
`educational-review`, `accessibility-review`, `approved`, `published`,
`revision-needed`, `archived`. Plus `planned` as the pre-draft registry state.
**Only `approved` and `published` render publicly.** Everything else carries a
visible status banner and `robots: noindex`.

**Public visibility of library and series pages.** The homepage (`index.html`), the
series pages, and the Foundations page show **only** `approved`/`published` articles
in a production build. They never render a planned card or a link to a planned
article, and a series with no public articles shows an in-preparation notice instead
of planned cards. A published article's "Explore the idea further" links are likewise
filtered to public articles. Individual article pages are still generated for every
record, but non-public ones carry `robots: noindex` and a status banner. To preview
planned content, build in development mode: `FSA_ARTICLES_OUT` unchanged, set
`FSA_DEV_MODE=1`. Dev builds show all articles with badges, add a "development mode"
banner, and are served `noindex` so a preview can never be mistaken for the public
site. The default build (no `FSA_DEV_MODE`) is production.

**reviewStatus:** `not-started`, `educational-review-required`,
`human-review-required`, `in-review`, `approved`. Public articles must be `approved`.

**difficulty:** `foundational`, `intermediate`, `advanced`.

**audiences:** `general`, `workforce`, `reentry`, `youth`, `community`,
`educators`, `colombia`.

**formats:** `web`, `print`.

**series slugs → titles:**
`money-decisions` → How Money Decisions Work ·
`financial-systems` → Understanding Financial Systems ·
`financial-independence` → Building Financial Independence ·
`economic-thinking` → Thinking Like an Economist ·
`foundations` → Foundations.

**concepts (browse-by-concept):** saving, spending, tradeoffs, incentives, credit,
banking, insurance, risk, inflation, investing, wealth, opportunity cost, scarcity,
compounding.

**Canonical FSA modules → live page:**

| Module | Page |
|---|---|
| Mindset & Cash Flow | `/modules/money-mindset-cash-flow.html` |
| Emergency Funds | `/modules/emergency-funds-saving.html` |
| Banking | `/modules/banking-basics.html` |
| Credit Scores | `/modules/credit-scores.html` |
| Debt | `/modules/debt-strategy.html` |
| Taxes/Paychecks | `/modules/taxes-paychecks.html` |
| Investing | `/modules/investing-fundamentals.html` |
| Risk/Insurance | `/modules/risk-insurance.html` |
| Consumer Protection | `/modules/consumer-protection.html` |
| Master Plan | `/modules/financial-master-plan.html` |

## Analytics events

The library reuses the existing FSA analytics service (`js/analytics.js`,
`window.fsaAnalytics.track(name, props)`), which posts first-party events to the
shared `/api/track` endpoint. No third-party trackers, no reading surveillance.

New event names introduced by the library:

| Event | Fired on | Props |
|---|---|---|
| `article_opened` | article page load | `{id, slug, series}` |
| `article_completed` | ~90% of the article scrolled | `{id, slug, series}` |
| `article_print_selected` | browser `beforeprint` | `{id, slug, series}` |
| `article_exercise_expanded` | a `<details>` exercise opened | `{id, slug, series}` |
| `library_filter` | concept chip chosen on homepage | `{concept}` |
| `library_article_click` | article card clicked on homepage | `{href, status}` |
| `library_module_click` | module chip clicked on homepage | `{module}` |
| `article_related_module_selected` | related module link clicked | `{from, href}` |
| `article_related_article_selected` | related article link clicked | `{from, href}` |

All analytics are progressive enhancement. With JavaScript disabled, articles read
fully and no events fire.
