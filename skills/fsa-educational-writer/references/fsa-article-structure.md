# FSA Article Structure (13 parts)

Every Money Ideas article uses the same 13 parts, in this order. The parts map
directly onto the slots in `templates/educational-article-template.html` and the keys
in `scripts/prototype_content.py`. Default length is 900 to 1,400 words (650 to 900
for a narrow concept). Reading grade 7 to 9 in plain adult language.

## 1. Title
Natural and specific. It names the tension or the idea in plain words, not a keyword
string and not a definition. "Why Saving Money Feels So Hard" works because it names a
felt problem. Avoid colons stacked with jargon and avoid clickbait. What good looks
like: a person could say the title out loud to a friend without cringing.

## 2. Opening tension
A situation, contradiction, or question from ordinary life. **Never a definition.**
Two or three short paragraphs that put the learner inside a moment where the idea
matters, then reframe the usual (often self-blaming) question into a fairer one. Good
openings make the reader think "that is exactly what happens to me." See
`examples/strong-opening-example.md`.

## 3. The common belief
State the misconception the article examines, and state it fairly, the way a
reasonable person actually holds it. Do not build a straw man. Acknowledge what is
true in the belief before you complicate it. Good version: the reader recognizes their
own assumption and does not feel attacked for having held it.

## 4. What is actually happening
The underlying idea, in plain language. Explain the mechanism before naming any
technical term, then name the term once and reuse it. This is the analytical heart:
what is really going on beneath the belief. Good version: the reader can restate the
mechanism in their own words.

## 5. A concrete scenario
One realistic situation from ordinary life, numerically simple (round numbers, one or
two figures at most), always labeled internally as an FSA illustration in the source
file. It should make the concept almost visible on its own. Give the person a plain
name and an ordinary week. Good version: the numbers are so simple the reader does the
arithmetic in their head and the point lands. See `examples/scenario-example.md`.

## 6. The mental model
One short, reusable line the learner can carry (the record's `mentalModel`). It should
compress the whole article into a sentence or two that survives outside the article.
"Today competes with tomorrow" is a model. "Saving is important" is not. Good version:
the learner could apply the line to a decision the article never mentioned.

## 7. A boundary case / second scenario
Where the idea changes with circumstances. This part protects the reader from turning
the mental model into a rigid rule. It must include at least one case where the obvious
recommendation may not be the right one for a given person (for saving: someone with
high-interest debt for whom "save first" can be the wrong call). Present it as
"check the numbers in front of you," not as a new universal rule. See
`examples/boundary-case-example.md`.

## 8. Why this matters
Connect the idea back to real financial decisions and to the learner's agency. Show how
seeing the idea changes the useful question the learner asks, and point at practical
moves that follow, without prescribing one path. Good version: the reader sees what
they can now do differently, framed as options, not orders.

## 9. Look for this today
One observation exercise. Ask the learner to notice the idea operating in their own
day, with no requirement to change anything and no need for a bank account, an app, or
the internet. Good version: doable before bedtime, purely by paying attention. See
`examples/look-for-this-today-example.md`.

## 10. Try it yourself
One reflection, comparison, or calculation, pencil-and-paper friendly and fully
offline. Two short prompts is a good size. Never require an active bank account,
disclosure of real balances, or private financial data. Good version: a learner in a
setting with no internet can complete it with a pencil.

## 11. One question to carry with you
An open question, not a moral and not a call to action. It should reopen the idea
rather than close it, and leave the learner thinking after they stop reading. Good
version: it genuinely could be answered more than one way.

## 12. Related learning
Related articles (by slug, each must exist in the registry) and related FSA modules
(canonical module names only), plus the next article in the series. This wires the
piece into the library without repeating other articles.

## 13. Sources
The sources-and-review note plus the companion source file
(`/articles/sources/<slug>.sources.md`). Separate factual, research, and regulatory
sources from FSA illustrations. Stable concepts may rest on established research;
current factual claims must be dated and sourced. See
`references/fsa-source-standard.md` and `templates/source-file.md`.

## Ordering note
The parts are fixed in order because each sets up the next: tension creates the
question, the belief and the mechanism answer it, the scenario proves it, the model
compresses it, the boundary case protects it, and the exercises hand it to the
learner. Do not reorder or drop a part. A narrow-concept article may run shorter within
each part but still includes all 13.
