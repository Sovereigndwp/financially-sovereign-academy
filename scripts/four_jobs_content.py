# -*- coding: utf-8 -*-
"""
four_jobs_content.py: Drafted body for "Every Dollar Has Four Jobs. Which One
Is Yours Doing?" (FSA-ARTICLE-002, money-decisions series, order 2).

This is the THIRD hardcoded body module wired into build.py with a parallel
elif, mirroring prototype_content.py and later_content.py exactly. Per the
Pilot retrospective, the third elif is the agreed trigger to consider the
slug -> body registry refactor. That decision belongs to Dalia, not to this
drafting pass, so the observation is logged in
docs/fsa-production-observations-log.md and the existing pattern is followed
here without redesign (constitution v1.0: evolve through production).

Taxonomy decision (Dalia, 2026-07-18): the four jobs are named
Live / Prepare / Protect / Grow. This module maps "repay debt" under Protect
(defending what you have from interest working against you), flagged as an
unresolved human decision for the review gate.

status: drafted / reviewStatus: human-review-required. NOT approved.
FSA voice rules apply: plain language, no em dashes, no decorative emojis.
Each key maps to a slot in the shared 13-part article template.
"""

FOUR_JOBS = {
    "slug": "every-dollar-has-four-jobs",

    # 2. Opening tension (no heading; runs right under the title/meta)
    "opening": """
<p>The advice comes from every direction, and most of it is reasonable. Save something every month. Pay down the card. Put a little toward the future. Each piece sounds right on its own. Then the paycheck arrives, and rent, groceries, the bus card, and the minimum payment claim it almost before it settles.</p>
<p>What is left is a quiet feeling of being behind, of failing at three assignments at once. Plenty of people carry that feeling for years without ever being told the assumption hiding inside the advice: that after the bills there are spare dollars waiting to be divided up. For many households, most months, there are not.</p>
<p>So it is worth trading the usual question, "why am I not saving, repaying, and investing all at once?", for a fairer one. What job is each of my dollars already doing, and when a free one finally shows up, which job does it need most?</p>
""",

    # 3. The common belief
    "common_belief_html": """
<p>The belief goes something like this: handling money well means splitting it across the responsible jobs. Some to savings, some to the debt, some toward the future. A person who is doing all three is doing it right, and a person who is not is falling short somewhere, probably on discipline.</p>
<p>There is real truth in it. Money does have distinct purposes, and being deliberate about them is a genuine skill. Giving a dollar a purpose beats letting it drift, and when income comfortably covers the essentials, working several at once genuinely builds stability. The belief is not wrong about what money can do. It is wrong about what it quietly assumes: that the dollars to divide are there in the first place.</p>
""",

    # 4. What is actually happening
    "actually_html": """
<p>Start with something so plain it is easy to look past: a dollar can do only one job at a time. Spent on groceries, it cannot also sit in savings or shrink a debt. Every dollar you direct somewhere is a dollar declined everywhere else. Economists call the value of the best declined option opportunity cost, and it is running in your budget whether you look at it or not.</p>
<p>In this library's terms, a dollar can hold one of four jobs. It can <strong>Live</strong>: cover what life costs right now, the housing, food, transport, and bills that are due this month. It can <strong>Prepare</strong>: wait as a buffer so a near-term surprise or goal does not turn into a crisis. It can <strong>Protect</strong>: defend what you already have, mostly by shrinking a debt that grows against you, or by keeping the coverage that stops one bad day from undoing years. Or it can <strong>Grow</strong>: buy a piece of the future through investing, ownership, or learning that raises what you can earn.</p>
<p>Here is the part the standard advice skips. In many households, most dollars are hired by Live before the month even begins. Rent does not negotiate. Food does not wait. When nearly every dollar already has the first job, "split your money across the jobs" is not advice the situation can follow, and the shortfall it implies is not a discipline problem. It is arithmetic. The real skill is not dividing a surplus that is not there. It is knowing what each dollar is already doing, and deciding which job the next free dollar should take.</p>
""",

    # 5. Concrete scenario
    "scenario_html": """
<h2 class="fsa-h2">One free forty dollars</h2>
<p>Teresa's paycheck is spoken for. Rent, groceries, the bus card, and the minimum on one credit card take nearly all of it, and for months the four-jobs question has had one honest answer: Live. That is not a failure. That is her actual situation, doing what it costs to run.</p>
<p>Then the phone she has been paying off in installments is finally hers, and forty dollars a month comes free. For the first time in a long while there is a dollar without a job, and all four line up to apply. The card balance creeps up a little each month, so Protect has a case. There is no cushion at all, so Prepare has one too: without it, one bad week goes straight back onto the card at card interest. Grow will matter someday, and it politely says so.</p>
<p>Teresa looks at her numbers and starts with a small cushion, because in her month, a single surprise is the most expensive thing that can happen. A neighbor with a bigger card balance and steadier weeks might send the same forty to the card instead, and be just as right. The forty dollars is not the lesson. The lesson is that she went from "I should be doing more of everything" to one clear decision about one free dollar, made against her own numbers.</p>
""",

    # 6. Mental model (rendered as the callout)
    "mental_model": "A dollar holds one job at a time, and for many people most dollars already have one.",

    # 7. Boundary case
    "boundary_html": """
<p>The four jobs are a lens, not a formula, and there are months and lives where the obvious move is not the right one.</p>
<p>If no dollar comes free at all, the four-jobs question has not failed you. It simply does not apply yet, and that is about income and the timing of bills, not about character. The honest work in that season may be matching due dates to paydays and looking for what could raise income or lower a fixed cost, and no amount of assigning jobs to dollars replaces that.</p>
<p>When a free dollar does exist, the tidy rules can point the wrong way. A debt growing at a high rate is a guaranteed cost, so sending the dollar to Protect can beat parking it in savings that earn far less. But someone with no cushion at all may be better off starting with a small Prepare anyway, because without one, the next surprise becomes new debt at a worse rate than the one they were fighting. And if an employer matches retirement contributions, a dollar sent to Grow can earn an immediate match that beats repaying a low-rate debt. Each of these flips on the numbers in front of the person, which is why none of them works as a universal rule. Check the actual rates, the actual cushion, and the actual month before following anyone's ranking of the jobs, including this article's.</p>
""",

    # 8. Why this matters
    "why_html": """
<p>Seeing money as jobs rather than a pile to divide changes the decision you are actually facing. "I should be doing more" is a weight with no handle: it cannot be finished, only carried. "Which job does my next free dollar need most?" is a question with an answer, and the answer is allowed to be different for you than for your neighbor, and different this year than last.</p>
<p>It also changes how you hear advice. Save first, pay debt first, never leave the match on the table: each rule is really a claim about which job should win, and it depends on numbers the rule cannot see. Once you can name the four jobs, you can take any of those rules apart, check it against your own month, and keep the part that fits. And the quiet shame about the dollars that only ever Live loses its grip, because keeping a household running on a committed income is not the absence of money skill. It is the first job, done every month, under pressure.</p>
""",

    # 9. Look for this today
    "look_html": """
<p>Sometime today, catch one dollar as it leaves, a purchase, a bill, an automatic charge, and name the job it just did: Live, Prepare, Protect, or Grow. You do not need to change anything or write anything down. Just notice how quickly you can tell which job it was, and whether that dollar was hired on purpose or by default.</p>
""",

    # 10. Try it yourself
    "try_html": """
<p>With a pencil and a scrap of paper, no balances and no apps required:</p>
<ul class="fsa-list">
  <li>Imagine ten dollars comes free this week, a canceled charge, a returned item, an extra shift. Write which single job it takes and one sentence on why. Then try the same with forty. If the answer changes with the amount, write down what changed it.</li>
  <li>Write the four jobs in a column: Live, Prepare, Protect, Grow. Next to each, one word for how your ordinary month treats it: crowded, thin, or empty. No dollar figures, nothing to show anyone. The column is a picture of where your money is pointed, not a grade.</li>
</ul>
""",

    # 11. One question to carry with you
    "closing_question": "If most of your dollars already have a job, what would have to change for a few of them to take a different one?",
}
