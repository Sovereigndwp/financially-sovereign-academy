# Article Draft: {{ARTICLE TITLE}}

The metadata block below mirrors the record schema in `docs/fsa-article-metadata.md`.
The skill may set only the draft-stage values shown for `status` and `reviewStatus`.
Do not set `approved` or `published`. Do not set `publishedDate`.

```yaml
id: FSA-ARTICLE-NNN            # stable, never reused or renumbered
slug: {{kebab-case-slug}}      # stable, unique, drives the URL
title: {{display title}}
subtitle: {{may be empty}}
series: {{human series name or null for the Foundations intro}}
seriesSlug: {{money-decisions | financial-systems | financial-independence | economic-thinking | foundations}}
seriesOrder: {{0 for the intro; 1..n within a series}}
collection: {{e.g. Foundations, or null}}
seriesPosition: {{e.g. introductory, or null}}
status: drafted                # skill may set: drafted (never approved/published)
featured: {{true | false}}
initialCollection: {{true | false}}
language: en
translationOf: null
availableLanguages: ["en"]
readingMinutes: {{4-8 typical}}
difficulty: {{foundational | intermediate | advanced}}
primaryConcept: {{one main idea}}
concepts: [{{from the concept vocabulary}}]
supportingConcepts: [{{secondary ideas}}]
misconception: {{the one belief examined}}
coreQuestion: {{the single question answered}}
mentalModel: {{the reusable takeaway}}
learnerOutcome: {{what the learner can do afterward}}
editorialBrief: {{one-paragraph brief}}
fsaModules: [{{canonical module names only}}]
audiences: [{{from the audience vocabulary}}]
formats: ["web", "print"]      # every article ships the shared print stylesheet; a print *companion* packet is a separate artifact and does not change this
publishedDate: null
updatedDate: null
canonicalPath: /articles/{{seriesSlug}}/{{slug}}.html
relatedArticles: [{{existing slugs}}]
sourcesFile: /articles/sources/{{slug}}.sources.md
reviewStatus: human-review-required   # skill may set: human-review-required
```

---

## 1. Title
<!-- Natural and specific. Names the tension or idea, never a definition. -->

## 2. Opening tension
<!-- A situation, contradiction, or question from ordinary life. Never a definition.
     Two or three short paragraphs. Reframe the self-blaming question into a fairer one. -->

## 3. The common belief
<!-- State the misconception fairly. Acknowledge what is true in it before complicating it. -->

## 4. What is actually happening
<!-- The mechanism in plain language. Explain the idea, THEN name the term, then reuse it. -->

## 5. A concrete scenario
<!-- Ordinary life, numerically simple, a plain-named character. Label it an FSA illustration
     in the source file. Round numbers only. -->

## 6. The mental model
<!-- One short reusable line. Matches the metadata mentalModel. -->

## 7. A boundary case / second scenario
<!-- Where the idea changes with circumstances. MUST include a case where the obvious
     recommendation may not be right. Frame as "check the numbers," not a new universal rule. -->

## 8. Why this matters
<!-- Connect to real decisions and to the learner's agency. Options, not orders. -->

## 9. Look for this today
<!-- One observation exercise. No change required. No bank account, app, or internet needed. -->

## 10. Try it yourself
<!-- One reflection, comparison, or calculation. Pencil-and-paper, fully offline.
     Never ask for real balances or private financial data. Two short prompts is a good size. -->

## 11. One question to carry with you
<!-- Open, not moralizing, not a call to action. Genuinely answerable more than one way. -->

## 12. Related learning
<!-- Related articles (existing slugs), related FSA modules (canonical names), next in series. -->

## 13. Sources
<!-- The sources-and-review note. Separate factual/research/regulatory sources from FSA
     illustrations. Full detail goes in the companion source file (templates/source-file.md). -->

---

**Draft state:** status `drafted`, reviewStatus `human-review-required`.
**Reminder:** no em dashes, no decorative emoji, natural contractions, varied sentence
length. The skill does not approve or publish this draft.
