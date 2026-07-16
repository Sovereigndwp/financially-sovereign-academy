# -*- coding: utf-8 -*-
"""
prototype_content.py — Drafted body for the prototype article
"Why Saving Money Feels So Hard" (FSA-ARTICLE-001).

This is TEMPORARY DRAFT CONTENT used to test the system end to end. It is marked
status: drafted / reviewStatus: educational-review-required and is NOT approved.
FSA voice rules apply: plain language, no em dashes, no decorative emojis.

Each key maps to a slot in the shared 13-part article template.
"""

PROTOTYPE = {
    "slug": "why-saving-money-feels-so-hard",

    # 2. Opening tension (no heading; runs right under the title/meta)
    "opening": """
<p>You meant to move fifty dollars into savings on Friday. You had the whole thing planned. Then a friend needed a ride, the tank was low, someone at home asked for takeout, and by Sunday the fifty dollars had quietly become part of the week. Nothing reckless happened. No single choice felt wrong. The money just found other work to do.</p>
<p>If that sounds familiar, it is worth asking a fairer question than the one most of us ask ourselves. The usual question is, "Why can't I just be more disciplined?" A better question is, "Why does saving feel so much harder than the reason for saving suggests it should?"</p>
""",

    # 3. The common belief
    "common_belief_html": """
<p>The most common explanation is discipline. Save more, the story goes, and you will. People who struggle are told, gently or not, that they lack willpower, that they need to want it more, that if they just cut out the small treats the rest would take care of itself.</p>
<p>There is something real in this. Repeated choices do add up, and habits matter. But discipline as the whole explanation quietly assumes that the deck is fair, that saving and spending start the contest as equals and the only variable is your character. They do not start as equals, and treating a stacked contest as a test of character is both inaccurate and unkind.</p>
""",

    # 4. What is actually happening
    "actually_html": """
<p>Two things are working against a plan to save, and neither is a moral failing.</p>
<p>The first is inside us. A reward you can feel now is vivid. A benefit that arrives in six months is abstract, more idea than experience. When choosing one option means giving up another, we tend to weight the near thing more heavily than the far thing, even when we sincerely value the far thing more. Researchers call this present bias. You do not have to know the term to feel it. The savings goal is real, but the coffee, the ride, the small relief after a long shift are right here, and right here has a way of winning.</p>
<p>The second is around us. Spending has been engineered to be smooth. Cards are saved, checkout is one tap, and money leaves without ceremony. Saving, by contrast, usually asks you to stop, log in, decide, and move something on purpose. One path is frictionless and the other has speed bumps. When the easy path and the rewarded-right-now path are the same path, "just be disciplined" is asking willpower to do a job that design should be doing.</p>
""",

    # 5. Concrete scenario
    "scenario_html": """
<h2 class="fsa-h2">A payday, up close</h2>
<p>Consider a simple week. Marcus gets paid on Friday and wants to set aside forty dollars. On Friday the balance looks healthy, so forty dollars feels easy, almost too small to bother moving right away. He will do it Sunday. Over the weekend a few ordinary things happen: groceries, a co-pay, a birthday. None of it is waste. By Sunday the balance is lower, forty dollars no longer feels easy, and moving it now feels like giving something up. So it waits until next payday, where the same week repeats.</p>
<p>Notice what did the damage. It was not a lack of caring. Marcus wanted to save the whole time. It was timing and friction. The decision was left until the moment it was hardest to make, and nothing in the system moved the money while it was still easy.</p>
""",

    # 6. Mental model (rendered as the callout)
    "mental_model": "Today competes with tomorrow. Saving is not one contest of willpower; it is the same contest, over and over, and the setup decides who tends to win.",

    # 7. Boundary case
    "boundary_html": """
<p>This is where a single rule would go wrong, so it is worth slowing down.</p>
<p>For some people, saving is barely a willpower question at all. If income is low or arrives unpredictably, the gap between what comes in and what must go out can be real and not a matter of trying harder. Telling someone in that situation to simply save more can miss the actual problem, which is room to maneuver, not character. For them the useful moves are often about timing income against bills, finding a small buffer wherever one is possible, and not carrying shame that belongs to the math, not to them.</p>
<p>For others, saving first is not even the best move. If you are carrying debt at a high interest rate, money sitting in a low-interest savings account can lose ground to the interest piling up on what you owe. In that case the "obvious" advice to build savings before anything else may not be right for you. The better answer depends on the numbers in front of you, and it is worth checking them before following any general rule, including this one.</p>
""",

    # 8. Why this matters
    "why_html": """
<p>Once you see saving as a contest between now and later, the useful question changes. It stops being "How do I become the kind of person who saves?" and becomes "How do I change the setup so the future gets a fair shot?"</p>
<p>That reframe points at practical moves rather than guilt. Moving the decision to the moment money arrives, when it feels easiest, rather than later, when it feels like loss. Adding a little friction to spending and removing friction from saving, so the two paths are more evenly matched. Making the future concrete enough to compete, by attaching the goal to something you can picture. None of these require more willpower. They require a better contest.</p>
""",

    # 9. Look for this today
    "look_html": """
<p>Before the day ends, catch one moment where "later" makes a choice for you. It might be a purchase that feels easy because the cost is delayed, or a saving or bill decision you postpone because dealing with it now feels like giving something up. You do not have to change what you do. Just notice the moment the near thing and the far thing compete, and which one wins.</p>
""",

    # 10. Try it yourself
    "try_html": """
<p>Pick one recurring amount you would like to save, even a small one. Ask two questions about it, on paper or in your head:</p>
<ul class="fsa-list">
  <li>When in the week is this decision easiest to make, and when is it hardest?</li>
  <li>What would it take to make the saving happen at the easy moment without you having to decide again each time?</li>
</ul>
<p>You are not committing to anything. You are just moving the contest to more favorable ground and seeing what changes.</p>
""",

    # 11. One question to carry with you
    "closing_question": "If saving felt as effortless as spending has been made to feel, how much of what you call a willpower problem would still be there?",
}
