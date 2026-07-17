# -*- coding: utf-8 -*-
"""
later_content.py: Drafted body for the Foundations intro article
"The Most Expensive Word in Personal Finance: 'Later'" (FSA-ARTICLE-000).

This mirrors scripts/prototype_content.py exactly (same key shape, same slot
mapping) rather than introducing a content registry. Keeping a second concrete
body module, instead of generalizing build.py, is deliberate: it proves the
educational model on two articles before any architecture change, and the small
duplication it creates is the evidence the Pilot retrospective will weigh when
deciding whether a registry is worth it.

status: drafted / reviewStatus: human-review-required. NOT approved.
FSA voice rules apply: plain language, no em dashes, no decorative emojis.
Each key maps to a slot in the shared 13-part article template.
"""

LATER = {
    "slug": "the-most-expensive-word-is-later",

    # 2. Opening tension (no heading; runs right under the title/meta)
    "opening": """
<p>There is a word that turns up in almost every money decision, and it rarely sounds like a decision at all. You will get to the savings account later. You will cancel the unused subscription later. You will open the letter from the insurer, compare the two loan offers, update the beneficiary, deal with the credit card later. Each "later" feels small and reasonable. None of them feels like the moment anything is actually decided.</p>
<p>That is what makes the word worth a closer look. Most money trouble does not arrive as one dramatic mistake. It arrives as a long run of sensible-sounding postponements, each easy to defend on its own. So instead of the usual question, "Why am I so behind on all this?", it is worth asking a fairer and more useful one: what does "later" actually cost, and who ends up paying for it?</p>
""",

    # 3. The common belief
    "common_belief_html": """
<p>The comfortable belief is that "later" is neutral. It does not cancel a decision; it just reschedules it to a better time, when there is more money, more information, or more energy to deal with it. Nothing is really lost by waiting, the thinking goes. The choice is parked, waiting for you to come back to it.</p>
<p>That is partly true. Some decisions genuinely should wait, and rushing a big financial commitment before you understand it is often worse than pausing. Timing matters, and "not yet" can be the wise answer. But "later" as a general setting hides two things at once: many of those parked decisions are being made anyway, by default, and when money is involved, the waiting itself usually carries a price.</p>
""",

    # 4. What is actually happening
    "actually_html": """
<p>Start with why "later" feels so weightless in the moment. A cost or effort you would face right now is vivid: the ten minutes on hold, the awkward call, the money leaving your account today. The benefit of acting sits in the future, and the future is abstract, more idea than experience. When the effort is now and the payoff is later, we put a heavy thumb on the scale for right now. Researchers call this present bias, but you do not need the term to know the feeling. Putting off exactly the tasks whose cost is immediate and whose reward is delayed even has its own name, procrastination, and it collects on precisely the decisions that "later" is made of.</p>
<p>Here is the first cost. While a decision sits in "later," the world does not politely pause. The subscription keeps charging. The high-interest balance keeps growing. The insurance you did not compare renews at whatever price it defaults to. Not deciding is not the same as freezing the situation; it hands the choice to whatever happens automatically. "Later" quietly votes for the default.</p>
<p>The second cost is easier to miss, and it is specific to money, because money and time interact. A debt left for later does not just wait; interest compounds, so what you owe grows on top of what already grew. Saving or investing you postpone does not just start late; it misses the earliest stretch of time, which is the stretch where small amounts have the longest to grow. In both directions, delay changes the size of the number, not only its date. That is why the same choice can cost almost nothing this month and a surprising amount over a year.</p>
""",

    # 5. Concrete scenario
    "scenario_html": """
<h2 class="fsa-h2">A small "later," one season long</h2>
<p>Rosa signed up for a twelve-dollar-a-month app over the winter and stopped opening it in March. She notices the charge now and then and means to cancel. It is a two-minute job. But two minutes of a dull task, right now, competes with everything else in front of her, so it becomes a "later." Taken one month at a time, the charge is always small enough to wave off.</p>
<p>She finally cancels in November. By then the app she stopped using in March has collected about ninety-six dollars, eight months at twelve. The money did not go to an emergency, or even to something she enjoyed. It went to a decision she never quite made. Nothing dramatic happened along the way. "Later" simply kept voting for the charge, month after month, on her behalf.</p>
""",

    # 6. Mental model (rendered as the callout)
    "mental_model": "\"Later\" is not free. It quietly borrows from your future self, and your future self usually has less room to pay it back than you do right now.",

    # 7. Boundary case
    "boundary_html": """
<p>None of this makes "later" the enemy. Sometimes waiting is exactly right, and turning "act now" into a universal rule would be its own mistake.</p>
<p>The difference is between a wait you have chosen and a wait that just happens. Deciding not to buy something today so you can sleep on it, holding off on a commitment until you understand the terms, waiting for a due date so your cash is there to cover it, these are decisions, not avoided ones. The tell is whether you have named what you are waiting for and when you will act. "I will decide after Friday's paycheck" is a plan. "Later" with no date attached is usually the default winning in disguise.</p>
<p>And for some people, "just handle it now" is not a question of willpower at all. If the money to act simply is not there this week, being told to act immediately misses the real constraint, which is room, not character. The honest move then is often about timing: doing the free part now, the two-minute cancellation, the phone call, the written-down date, and scheduling the part that costs money for when there is some slack, without carrying shame for a gap that belongs to the math. Before following any rule, including "do not delay," it is worth checking the actual numbers and the real situation in front of you.</p>
""",

    # 8. Why this matters
    "why_html": """
<p>Seeing "later" as a decision, rather than the absence of one, changes the question you ask yourself, from "Why am I so behind, and what is wrong with me?" to "Which of my laters is deciding for me right now, and what is each one costing?" That version has answers you can act on, and it does not require becoming a different, more disciplined person overnight.</p>
<p>The rest of this library is really a closer look at one family of "later" or another: how everyday money decisions actually work, and why they sometimes fight our own goals; what the systems around us, banks, credit, insurance, are really doing while we wait; how small, repeated choices compound into independence or away from it; and a few thinking tools that make any of these decisions clearer. You do not have to read them in order, and none of them will hand you a rule to obey. They are here to help you see the choice you are actually making, especially the ones hiding inside a word as small as "later."</p>
""",

    # 9. Look for this today
    "look_html": """
<p>Before the day is over, catch one "later" as it happens. It might be a charge you keep meaning to question, a form you have not filled out, a small amount you plan to move "soon," or a call you are avoiding. You do not have to do anything about it. Just notice the moment you file it under later, and ask one quiet question: if I never come back to this, what happens on its own, and who pays for it?</p>
""",

    # 10. Try it yourself
    "try_html": """
<p>On paper, or just in your head, make a short list of two or three money "laters" you are carrying right now, the decisions you keep meaning to get to. For each one, answer two questions:</p>
<ul class="fsa-list">
  <li>If I never actually decide this, what happens by default, and who ends up paying for it?</li>
  <li>When would this be easiest to handle, and what is the smallest first step that costs nothing, a two-minute cancellation, one phone call, or writing down the date I will act?</li>
</ul>
<p>You are not committing to fixing everything today. You are just making the hidden decisions visible, so you can start choosing them on purpose instead of by default.</p>
""",

    # 11. One question to carry with you
    "closing_question": "Of all the choices you think you are only postponing, how many have you quietly already made?",
}
