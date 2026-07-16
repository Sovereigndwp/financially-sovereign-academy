# Skill Test (section 22): Mode 2 review of "Why Saving Money Feels So Hard"

This is the skill's self-test. It runs the **fsa-educational-writer** skill in **Mode 2
(audit / review)** against the existing prototype. It does **not** re-draft the article
prose. The draft under test is the already-written prototype:

- rendered page: `articles/money-decisions/why-saving-money-feels-so-hard.html`
- draft body: `scripts/prototype_content.py`
- registry record: `FSA-ARTICLE-001` in `scripts/library_data.py`
- source file: `articles/sources/why-saving-money-feels-so-hard.sources.md`

The test produces the ten required deliverables in order.

---

## 1. Metadata block for FSA-ARTICLE-001

Read back from `scripts/library_data.py` and `docs/fsa-article-metadata.md`. The skill
confirms these values; it does not change them, and it does not raise the status.

```yaml
id: FSA-ARTICLE-001
slug: why-saving-money-feels-so-hard
title: Why Saving Money Feels So Hard
subtitle: ""
series: How Money Decisions Work
seriesSlug: money-decisions
seriesOrder: 1
collection: null
seriesPosition: null
status: drafted                     # confirmed; skill will not advance it
featured: true
initialCollection: true
language: en
translationOf: null
availableLanguages: ["en"]
readingMinutes: 6
difficulty: foundational
primaryConcept: present bias
concepts: ["saving", "tradeoffs", "opportunity cost"]
supportingConcepts: ["opportunity cost", "delayed gratification", "habit formation"]
misconception: "People fail to save mainly because they lack discipline."
coreQuestion: "Why can saving feel difficult even when we understand why it matters?"
mentalModel: "Today competes with tomorrow."
learnerOutcome: "The learner can identify how immediate rewards compete with future goals, and how their environment shapes the contest."
fsaModules: ["Mindset & Cash Flow", "Emergency Funds"]
audiences: ["general", "workforce", "reentry", "youth"]
editorialBrief: "The prototype article. It reframes saving from a willpower problem into a competition between a vivid present and an abstract future, made harder by tight budgets and systems built to make spending easy. It respects learners under real financial pressure while still showing where personal design choices can tip the contest."
formats: ["web"]
publishedDate: null
updatedDate: null
canonicalPath: /articles/money-decisions/why-saving-money-feels-so-hard.html
relatedArticles: ["every-dollar-has-four-jobs", "the-most-expensive-word-is-later"]
sourcesFile: /articles/sources/why-saving-money-feels-so-hard.sources.md
reviewStatus: educational-review-required   # current registry value; the skill's own recommendation is human-review-required (see section 10)
```

Note: the registry currently carries `reviewStatus: educational-review-required`. This
review is that educational review. Its output recommendation (section 10) is
`human-review-required`, because a human must confirm the behavioral-economics citation
and the boundary-case judgment before approval.

---

## 2. Editorial brief

- **What the learner may believe:** that people fail to save mainly because they lack
  discipline, and that saving more is simply a matter of wanting it enough.
- **What to notice (core question):** why saving can feel difficult even when the learner
  fully understands why it matters. The shift is from "what is wrong with me?" to "what is
  the setup doing to the contest?"
- **Main mental model:** "Today competes with tomorrow." Saving is the same contest run
  over and over, and the setup decides who tends to win.
- **Why it matters:** it moves the useful question from "how do I become a disciplined
  person?" to "how do I change the setup so the future gets a fair shot?", which points at
  practical moves instead of guilt.
- **Realistic scenario:** Marcus is paid Friday, means to move forty dollars, waits until
  Sunday, and by then ordinary spending has made forty dollars feel like a loss, so it
  slips to next payday and the week repeats. FSA illustration, round numbers.
- **Main factual claims needing evidence:** one Tier B / research claim, that people weight
  near rewards over distant ones (present bias / hyperbolic discounting), to be tied to a
  named source at review. The high-interest-debt-vs-low-interest-savings point in the
  boundary case is concept and arithmetic, not a cited statistic.
- **Learner action:** notice one moment where "later" makes a choice (observation), then,
  on paper, identify when in the week a chosen saving decision is easiest and hardest and
  what would make it happen at the easy moment automatically.
- **Ending question:** if saving felt as effortless as spending has been made to feel, how
  much of the "willpower problem" would remain?
- **What the article will NOT cover:** how to build a budget, which account to use, or any
  specific savings product. Those belong to other Money Ideas articles and to the Mindset &
  Cash Flow and Emergency Funds modules.

---

## 3. Source plan

Per `references/fsa-source-standard.md` and the existing
`articles/sources/why-saving-money-feels-so-hard.sources.md`:

- **Tier A (stable concept):** present bias / hyperbolic discounting is an established idea
  from behavioral economics and may rest on established research, summarized without
  overclaiming.
- **Tier B (current factual claim requiring a dated, named source):** the specific
  behavioral-economics finding that people systematically weight near rewards over distant
  ones needs a named citation before approval. It is currently `_add citation_` in the
  source file. **This is a blocker to approval and an open item for the human.**
- **Tier C (FSA illustration, never evidence):** "A payday, up close" (Marcus) is an
  invented teaching scenario with round numbers. Listed correctly in the source file's
  illustrative-examples section.
- **Statistics requiring future updates:** none in this draft. The source file correctly
  notes that if a savings-rate or emergency-expense statistic is later added, it must be
  dated and tied to a primary source (for example the Federal Reserve SHED).
- **Result:** the source file exists and is structured correctly, but it is not yet
  complete, because the Tier B research citation is a placeholder. The article therefore
  cannot reach `approved`.

---

## 4. Structured draft already exists (mapping to the 13 parts)

No re-drafting was done. The prototype in `scripts/prototype_content.py`, rendered at
`articles/money-decisions/why-saving-money-feels-so-hard.html`, already supplies the body.
It maps cleanly to all 13 parts:

1. **Title:** "Why Saving Money Feels So Hard." Natural, names a felt problem, not a
   definition. Present.
2. **Opening tension:** the fifty dollars that "found other work to do" over a weekend,
   then the reframed fairer question. A situation, not a definition. Present.
3. **The common belief:** discipline as the whole explanation, stated fairly and granted
   what is true in it. Present.
4. **What is actually happening:** the inside force (present bias, named after it is felt)
   and the outside force (spending engineered smooth, saving made effortful). Present.
5. **Concrete scenario:** "A payday, up close" with Marcus and forty dollars. Ordinary,
   numerically simple, an FSA illustration. Present.
6. **Mental model:** "Today competes with tomorrow..." rendered in the model callout.
   Present.
7. **Boundary case:** "When it's not about willpower at all," covering low or unpredictable
   income, and the high-interest-debt case where saving first may not be right. Includes the
   required case where the obvious recommendation may not hold. Present.
8. **Why this matters:** the shift from becoming a disciplined person to changing the setup,
   pointing at practical moves. Present.
9. **Look for this today:** catch one moment where "later" makes a choice for you.
   Observation only, offline. Present.
10. **Try it yourself:** two pencil-and-paper prompts about when the saving decision is
    easiest and how to automate it at that moment. No bank account or private data required.
    Present.
11. **One question to carry with you:** the open closing question about effortless saving.
    Not moralizing. Present.
12. **Related learning:** related articles (`every-dollar-has-four-jobs`,
    `the-most-expensive-word-is-later`), related modules (Mindset & Cash Flow, Emergency
    Funds), next in series. Present in the rendered page.
13. **Sources:** the sources-and-review note plus the companion source file. Present, with
    the Tier B gap noted.

All 13 parts are present and in order.

---

## 5. Educational-review rubric (1 to 5)

| Dimension | Score | Justification |
|---|---|---|
| Concept accuracy | 5 | Present bias described correctly; the term is introduced only after the experience, then used plainly. |
| Learner clarity | 5 | Plain grade-appropriate language, mechanism explained before the label, easy to follow. |
| Practical relevance | 5 | Speaks to a Friday-paycheck decision the learner faces immediately. |
| Mental-model strength | 5 | "Today competes with tomorrow" is short, memorable, and applies well beyond the article. |
| Scenario quality | 5 | Marcus and the forty dollars is ordinary, three-number simple, original, labeled an FSA illustration. |
| Nuance | 5 | Boundary case does real work, includes the high-interest-debt case where "save first" may be wrong, and refuses a new rigid rule. |
| Evidence quality | 3 | Structure is right and the FSA scenario is properly quarantined, but the Tier B present-bias citation is still a placeholder, so the evidence is not yet complete. Below 4, so revision (adding the citation) is required before approval. |
| Tone and dignity | 5 | Explicitly rejects framing difficulty as moral failure, names structural constraints, keeps agency. |
| Originality | 5 | Framing, scenario, model wording, and exercises are original to FSA. |
| FSA integration | 5 | Correct series, modules, concepts, audiences, related links, education-only footer, 13 parts intact. |

Nine dimensions at 5; one (Evidence quality) at 3. Because Evidence quality is below 4, the
article requires revision (source citation) before a human can approve it. The needed
revision is sourcing, not rewriting.

---

## 6. Writing audit results

Checked against `references/fsa-educational-review-rubric.md`. Findings on the rendered
body:

- Repeated sentence openings: pass. Openings vary.
- Excessive rhetorical questions: pass. The few questions are purposeful reframes.
- Artificial transitions: pass. Ideas follow on their own logic.
- Generic conclusions / motivational endings: pass. Ends on an open question.
- Unnecessary headings: pass. Headings track the structure.
- Over-polished symmetry: pass. Paragraph lengths vary naturally.
- Long abstract passages: pass. Abstractions are anchored quickly by the scenario.
- Unexplained jargon: pass. "Present bias" is felt first, then named.
- Uniform paragraph length: pass. Mixed lengths.
- Excessive "you": pass. Direct address is present but not nagging.
- Unsupported claims: **finding.** The present-bias research claim has no named source yet
  (placeholder in the source file). This is the one substantive audit finding and matches
  the Evidence-quality score.
- Repeated ideas: pass. No redundant repetition.
- Moralizing: pass. It explicitly avoids moral framing.
- Hidden assumptions about income / access: pass. The boundary case surfaces low and
  unpredictable income; exercises need no account, app, or internet.
- **Em dashes: pass. Confirmed none in the body.** The prose uses commas where a dash would
  tempt a lazy writer.
- **Decorative emoji: pass. Confirmed none in the body.**
- Copied or paraphrased wording: pass. Original throughout.

Explicit confirmation: **the body contains no em dashes and no decorative emoji.**

---

## 7. Originality review note

- **Concept source:** present bias / hyperbolic discounting from established behavioral
  economics; general personal-finance knowledge about friction and automation.
- **FSA framing:** reframes saving as a repeated contest between a vivid present and an
  abstract future, with the "setup," not character, deciding the winner. This framing is
  the library's own.
- **Original scenario:** "A payday, up close" (Marcus, forty dollars) is created for this
  article and labeled an FSA illustration; numbers are round and for teaching only.
- **Original activity:** both exercises (notice one "later" moment; find the easiest and
  hardest moment to save and how to automate it) were designed for this article.
- **Potential similarity risk:** the general "pay yourself first / automate savings" idea is
  widespread, but this article does not borrow a known slogan or example; the friction-and-
  timing treatment and the Marcus scenario are original. No memorable phrase traces to a
  specific outside source.
- **Review result:** Original; no similarity risk found.

---

## 8. FSA module connections

- **Mindset & Cash Flow** (`/modules/money-mindset-cash-flow.html`): the article's core, why
  present-focused pulls and cash-flow timing shape saving behavior, is the mindset-and-cash-
  flow foundation. Natural first module link.
- **Emergency Funds** (`/modules/emergency-funds-saving.html`): the practical stakes of
  winning the "today vs tomorrow" contest are a funded buffer; the boundary case (thin
  buffers, high-interest debt) connects directly to the emergency-funds decision.

Both are already in the record's `fsaModules` and rendered in the related section.

---

## 9. Print-companion outline

Per `templates/print-companion.md`, black and white, offline, pencil-and-paper:

1. **Print-friendly article:** the 13-part text laid out for paper, single ink color, with
   the education-only footer and the article ID plus revision date. No "click" or "go
   online" prompts.
2. **Learner reflection:** two or three open prompts from "Today competes with tomorrow" and
   the carry-with-you question, with blank lines. No request for real balances or personal
   data.
3. **Short exercise:** the "Try it yourself" restated for paper, when is a chosen saving
   decision easiest and hardest in the week, with a worked example of moving the decision to
   the easy moment.
4. **Facilitator note:** the one idea (saving is a repeated timing-and-friction contest, not
   a character test), the misconception to watch for (discipline as the whole story), two
   discussion openers, and a reminder to keep the tone shame-free and to name structural
   constraints. Flags reentry (no account needed) and youth (no household income) adaptations.
5. **Answer guidance:** what a good reflection looks like and the range of reasonable
   answers, a note that Marcus is an FSA illustration not a data point, and the reminder that
   the "save first" rule should be checked against the learner's own numbers (the boundary
   case).

Adding this companion would add `print` to the record's `formats`.

---

## 10. Unresolved human decisions

1. **Source the present-bias claim (blocker).** Replace the `_add citation_` placeholder in
   the source file with a named, authoritative behavioral-economics source, summarized
   without overclaiming. Approval is blocked until this is done.
2. **Confirm the boundary-case judgment.** A human should confirm the framing that "save
   first" can be wrong under high-interest debt is presented as a check-the-numbers question
   and not as individualized advice.
3. **Decide whether to add the print companion** and set `formats` accordingly.
4. **Neutrality confirmation.** Confirm the article stays within FSA's education-only
   boundary (it does, in this reviewer's read) and that the single footer notice is
   sufficient.
5. **Advance the status.** Whether to move from `drafted` toward `fact-checked` /
   `educational-review` is a human decision, not the skill's.

---

## Recommended status

**status: drafted**
**reviewStatus: human-review-required**

The prototype is a strong draft: nine of ten rubric dimensions score 5, the structure is
complete, and the body contains no em dashes and no decorative emoji. The one revision
required before approval is completing the Tier B source citation for present bias. Two
smaller items (boundary-case framing, print companion) are human judgments.

**The skill does not approve or publish this article.** Approval and publication are human
steps. This review ends here, with the draft returned for human decision.
