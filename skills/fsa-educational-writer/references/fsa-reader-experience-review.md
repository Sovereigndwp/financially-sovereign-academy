# FSA Reader Experience Review (final editorial pass)

The Reader Experience Review (RER) is a single lightweight pass run AFTER an article has
completed the full six-stage pipeline. It is the Editor's job, separate from the Writer's.
Its predecessor was the Voice Audit; the Voice Audit is now the first of three lenses.

## What it optimizes for
The reader, not the prose. The purpose is not beautiful writing. The purpose is to remove
anything that momentarily reminds the reader they are reading something written, and to
confirm the article leaves the reader understanding and remembering more than before.

Two reader reactions tell you which way the pass is going. If the reader thinks "that is an
interesting sentence," the writing has become visible and the pass may have gone too far. If
the reader thinks "I never thought about it that way," the pass has succeeded. Aim for the
second.

## Governing rules
- **Think like a publisher.** The article is already published. The question is not "can I
  improve this sentence?" but "would changing this sentence make the reader understand the
  idea better?" If the answer is no, leave it alone. Editing removes friction; it does not add
  polish for its own sake.
- **Not a checklist. Trust your judgment.** If something feels like a tic, or repetitive, or
  manufactured, investigate it. But do not assume every instinct becomes an edit. Sometimes
  the right editorial decision is to leave the sentence exactly as it is.
- **Imperfect is often fine.** A sentence can be imperfect but memorable, repeat a word but
  create rhythm, or run long because the thought unfolds naturally. Those are not problems.
  Intervene only when the writing itself becomes visible.
- **Educational architecture over stylistic perfection**, always. An article with outstanding
  educational value and a few over-polished sentences beats a conversational one that loses
  clarity, progression, precision, or instructional effectiveness.
- **Stop condition.** When you finish, ask: "If this article had my name on it forever, would
  I be proud to publish it?" If yes, stop. Perfection is not the objective; teaching
  exceptionally well is.
- **Never a rewrite.** If an article needs dozens of changes, something went wrong earlier. A
  normal RER touches a handful of sentences, and may correctly conclude "change nothing." It
  never advances status. A human approves any change.

## The lenses

### Lens 1: Friction (the former Voice Audit)
Remove only writing that becomes visible. Look for, and flag only when noticeable: repeated
words ("quietly", "actually", "simply", "just"), repeated sentence structures, repeated
rhythms and transitions, over-engineered prose (does the sentence feel discovered or
assembled?), artificial balance (sentences that exist only to mirror another, e.g. "it stops
being X and becomes Y"), and academic phrasing people rarely say aloud. Reduce toward
intentionality, not elimination: if a word appears eight times, two or three of the strongest
uses may be exactly right. Protect memorable observations; do not polish them away.

### Lens 1B: Anti-template (run immediately after Lens 1)
Lens 1 asks whether the writing has become visible. Lens 1B asks whether a sentence could
have been produced by a machine that did not understand the topic. It catches constructions
that simulate insight through form rather than content, which survive a Friction pass because
none of them is a repeated word: negation-first theses, self-answered rhetorical questions,
two-beat fragment pairs, balanced aphorisms, numbered-refrain scaffolding, meta-narration,
drama adverbs and evaluative filler. The governing rule is the transplant test: if a sentence
could move into a different article unchanged and still work, it is a template, not thought.
Full rules, repair patterns and the output block are in `fsa-anti-template-audit.md`, which
imports the anti-template rules from the author profile and is subordinate to it. Run the
transplant test on four places every time: title, first two sentences, mental model, closing
question. If Lens 1B returns more than roughly fifteen hits, the verdict is "upstream
problem", not a list of fixes.

### Lens 2: Anchor (identify, do not invent)
Ask: if the reader remembers only one sentence six months from now, which sentence do I hope
it is? An observation changes how the reader sees the world; an explanation only tells them
how something works. "'Later' votes for the default" is an observation, not an explanation,
and those are the lines readers keep. If the anchor comes to mind immediately, record it as an editorial assessment (a natural conceptual anchor appears to be present) and protect it; editorial judgment is not proof. If it does not, do NOT manufacture one. A missing
anchor is usually an upstream signal that the mental model or the example was not sharp enough;
record it as a revision note, not a bolted-on sentence. One anchor is usually enough. Some
articles are memorable because of the example, some because of the mental model, some because
of a single sentence. There is no required formula.

### Lens 3: The Publisher test
1. Did the learner understand something they probably did not understand before reading this?
   If not, the article is not finished.
2. Is there one idea or observation that will probably stay after the details fade? If not,
   consider whether the article is missing a conceptual anchor (lens 2).
3. Did the writing disappear behind the idea? If the reader spends more time thinking about the
   concept than about the writing, the article has succeeded.

Do not revisit the whole article hunting for "better writing." Only revisit it if one of these
three questions reveals a meaningful opportunity to increase what the learner understands,
remembers, and applies.

## Editorial judgment is not evidence
The RER is diagnostic, not predictive. Editors predict; readers decide. State editorial
recommendations plainly ("trim this repeated word", "this phrasing reads as manufactured")
because those are judgment calls you own. But any claim about what a reader will experience,
above all whether an observation will be remembered, is a prediction, not a fact. Phrase it as
an assessment and pair it with its uncertainty: prefer "a natural conceptual anchor appears to
be present" over "this article has a memorable anchor." Do not let this collapse into blanket
hedging. Recommendations stay confident; only predictions carry the flag.

## Output
A short findings note grouped by lens: the handful of friction spots, each with a one-line
reason and a recommended minimal change (or "leave as is"); the anchor stated as an editorial
assessment (or a note that one appears missing and why); and the Publisher-test verdict.
Recommend; do not rewrite on your own authority; a human approves any change. Close with a
summary in this shape:

```
Reader Experience Review
- Friction: <minor edits recommended / none>
- Anti-template: <n> hits (word / sentence / structure), transplant test on title, opening,
  mental model and closing question: <pass or fail each>
- Anchor: Editorial assessment suggests a natural conceptual anchor appears present ("<line>"),
  or: no clear anchor, likely an upstream sharpening opportunity.
- Publisher test: <educational objective appears achieved / not yet>
- Confidence: <high / medium / low>
- Remaining uncertainty: whether readers actually understand and remember this can only be
  validated through real learner experience; this reflects editorial judgment, not empirical
  evidence.
```
