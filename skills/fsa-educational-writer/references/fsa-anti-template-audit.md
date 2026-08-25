# FSA Anti-Template Audit (Reader Experience Review, Lens 1B)

An extension of **Lens 1 (Friction)** in `fsa-reader-experience-review.md`. Lens 1 asks
whether the writing has become visible. Lens 1B asks a narrower question with a sharper
edge:

> **Could this sentence have been produced by a machine that did not understand the topic?**

Lens 1 catches tics. Lens 1B catches **templates**: constructions that simulate insight
through form rather than content. It exists because AI-assisted drafting reliably
over-selects a small set of rhetorical shapes that score as "good writing" no matter what
they carry, and those shapes survive a Friction pass because none of them is a repeated
word.

## Where this comes from, and what governs it

The rules below are imported from Dalia's author reasoning profile (`my-writing-style`,
"Anti-template rules"), which is the canonical source. **When the profile changes, this
document follows it, not the other way round.**

**Scoped adoption.** The author profile governs her Substack essays, which are first person,
argumentative, and news-hooked. FSA Money Ideas articles are third person, educational, and
evergreen, and they follow a frozen 13-part structure. So this lens adopts the profile's
**anti-template rules** and **transplant test**, which are about detecting machine-shaped
prose and apply to any form. It does **not** adopt the profile's essay-architecture rules,
which belong to a different form:

| Adopted here | Not adopted (Substack essay form only) |
|---|---|
| The transplant test | News hook up front |
| The full watchlist below | Deck carrying thesis plus a money number |
| Replacement principle | Five-idea ceiling |
| Mandatory final audit pass | In-essay falsifier; steelman gets a paragraph |
| Marginal-actor test on possession verbs | Reply-prompt P.S. |

Where a profile rule and a frozen FSA rule genuinely collide, the collision is recorded in
`docs/fsa-decisions-log.md` and the owner rules on it. Two are known and recorded at the end
of this document.

---

## The governing rule: the transplant test

> If a title, sentence, or closing line could be moved into a different article unchanged
> and still function, it is a template, not thought.

Rewrite it until it can only live in **this** article, until it contains the specific noun,
number, mechanism, or scene the article is actually about.

Apply the test to four places every time, because these are where templates cluster:
the **title**, the **first two sentences**, the **mental model**, and the **closing question**.

---

## The watchlist

Every item is a **detect, then decide**. None is an automatic deletion. The question is
always whether the construction is carrying content or standing in for it.

### Word level

| # | Tell | Why it is a tell | Repair |
|---|---|---|---|
| W1 | **Drama adverbs and intensifiers:** quietly, silently, simply, precisely, genuinely, actually, truly, merely | They add emphasis without adding information. A sentence that needs one is usually under-specified | Delete first. If the sentence weakens, the adverb was hiding a missing mechanism: supply the mechanism |
| W2 | **Evaluative filler:** "it is worth noting / naming / asking", "worth a closer look", "the interesting question is", "sitting with" | Announces that something matters instead of showing it | Delete the frame, keep the content. "It is worth asking what X costs" becomes "What does X cost?" |
| W3 | **Evaluative sentence tags:** "which is the point", "which is telling", "and that matters" | If the point needs a tag to land, the sentence did not land | Rewrite the sentence so the point is in it |
| W4 | **Banned phrases** (existing FSA list in `fsa-voice-and-style.md`) | Brochure register | Rewrite |

### Sentence level

| # | Tell | Why it is a tell | Repair |
|---|---|---|---|
| S1 | **Negation-first thesis:** "It is not X, it is Y", "Nobody ...", "X is not about Y at all" | Content-independent: the shape works for any subject. Applies to **load-bearing claims**, headings and closers. An ordinary contrastive inside a paragraph is often just accurate and stays | State the claim affirmatively with the mechanism, and let the specifics create the tension |
| S2 | **Self-answered rhetorical questions**, especially a quoted question followed immediately by its reframe | Manufactures a turn the reader did not take. The reader is told they asked something, then told the better version | Either make the statement directly, or leave a genuine question open and answer it with the article rather than the next clause |
| S3 | **Two-beat fragment pairs:** "Different stories. Same pattern." | Cadence doing the work of argument | Show the shared structure through the cases, or state it in a full sentence that carries content |
| S4 | **Balanced aphorism closers** and mirrored constructions ("it stops being X and becomes Y") | Symmetry that exists to be symmetrical | At most one compressed line per article, built from this article's own material |
| S5 | **Rule-of-three flourishes** | Lists that follow the cadence rather than the facts | Cut to the number the content requires. A triad built from the article's real cases is content, not flourish |
| S6 | **Possession verbs that assume prior possession:** gives up, trades, surrenders, loses, sacrifices | The marginal-actor test. Someone who never had a cushion does not "give up" security | Check every such verb against who the actor actually is. Naming the correction usually sharpens the point |

### Structure level

| # | Tell | Why it is a tell | Repair |
|---|---|---|---|
| T1 | **Meta-narration:** "this article", "this part of the article", "the article returns to that later", "the rest of this library" | The article describing its own moves. A reader who needs the map has been failed by the sequence | Delete, and fix the ordering problem the meta-narration was patching. **One exception is licensed:** FSA-ARTICLE-000 is the library intro and its job includes mapping the series. It may refer to the library, once, in "Why this matters" |
| T2 | **Numbered-refrain scaffolding:** "that is the first ... the second ..." | Announces parallel architecture instead of letting the cases show it | Let the sequence carry it |
| T3 | **Manufactured motifs:** a repeated image whose second appearance adds no new meaning | Repetition mistaken for through-line | Keep the repetition only where the second use turns the idea. Otherwise vary it |
| T4 | **Uniform paragraph shape** across a section | Assembled rather than thought | Already covered by the FSA voice standard; check it here too |

---

## How to run it

Ten minutes per article, after Lens 1 and before Lens 2.

1. **Mechanical sweep.** Grep the rendered body text for W1, W2, W3 and the S1 and T1
   markers. This produces a candidate list in seconds and is the only part that is
   mechanical. Suggested pattern set is in the audit report template.
2. **Transplant test on the four hot spots:** title, first two sentences, mental model,
   closing question. Read each one cold and ask whether it would work in a different Money
   Ideas article. If yes, it fails.
3. **Read the openings and closings of every section.** Templates cluster at joints.
4. **Judge each hit.** Delete, rewrite, or keep with a reason. A kept hit needs its reason
   recorded; "kept" without a reason is how a watchlist quietly stops working.
5. **Write the findings.** Every hit gets: rule, quoted original, proposed replacement,
   verdict.

## Output

The same shape as the Reader Experience Review's findings note, with one added block:

```
Anti-Template Audit (Lens 1B)
- Word level:      <n> hits, <n> rewritten, <n> kept with reason
- Sentence level:  <n> hits, <n> rewritten, <n> kept with reason
- Structure level: <n> hits, <n> rewritten, <n> kept with reason
- Transplant test: title / opening / mental model / closing question -> pass or fail each
- Verdict: <clean / minor edits recommended / upstream problem>
```

**"Upstream problem" is a real verdict and it matters.** The Reader Experience Review says
a normal pass touches a handful of sentences and that an article needing dozens of changes
means something went wrong earlier. If Lens 1B returns more than roughly fifteen hits, do
not simply fix them. Record that the draft was produced without the lens, and treat the
drafting stage as the thing to repair.

## Authority

Findings only. The writer never self-approves and never advances status. A human approves
every change, exactly as with the other three lenses.

---

## Two known collisions with the frozen 13-part structure

Recorded here rather than resolved, because the structure is frozen at v1.0 and the author
profile is owner-owned. Both need an owner ruling in `docs/fsa-decisions-log.md`.

**C-1. S4 (at most one compressed aphorism) versus the mandated mental-model callout.**
Every FSA article must carry a mental model in part 6, and the mental model is by design a
compressed, memorable line. It is built from the article's own material, so it passes the
transplant test, but it means every article ships with at least one aphorism by
construction. Proposed reading, pending a ruling: **the mental model is the article's one
permitted compressed line.** Any second aphorism elsewhere in the article is a Lens 1B hit.

**C-2. S2 (no self-answered rhetorical questions) versus the misconception method.**
The 13-part structure asks the article to name a common belief and reframe it. The drafted
articles all implement this as a quoted self-blaming question followed immediately by its
better version. That is the exact shape S2 bans. The method does not require that shape:
the belief can be stated as a belief, and the reframe can be a statement. Proposed reading,
pending a ruling: **the misconception is named as a statement, and at most one genuine
question is left open in the body.** The closing question in part 13 is structural and is
never counted.

Until these are ruled, flag both and do not silently pick a side.
