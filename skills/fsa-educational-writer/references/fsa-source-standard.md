# FSA Source Standard

Truthfulness is the first rule. An FSA article earns trust by being careful about what
it claims and where each claim comes from. Every article carries a companion source
file at `/articles/sources/<slug>.sources.md` (see `templates/source-file.md`, which
mirrors `articles/sources/_source-file-template.md`).

## Evidence tiers

**Tier A: stable concepts.** Well-established ideas (present bias, opportunity cost,
scarcity, compounding, liquidity, incentives, risk transfer) may rest on established
sources. Summarize them accurately and do not overclaim. You do not need a fresh
citation for the existence of opportunity cost; you do need to describe it correctly.

**Tier B: current factual claims.** Any specific number, rate, law, threshold,
inflation figure, fee, or program rule is a Tier B claim. It must be researched, tied
to a named authoritative source, and **dated** (the "as of" date and the accessed
date). Tier B claims go stale, so each one is logged in the source file's "Statistics
requiring future updates" section with its as-of date.

**Tier C: FSA scenarios.** The invented scenarios and characters (Marcus and his
Friday paycheck, for instance) are illustrations, never evidence. They teach; they do
not prove. Every one is listed in the source file's "Illustrative examples created by
FSA" section, with a note that numbers are rounded and for teaching only. A scenario is
never cited as if it were data.

## The never-invent list
Never invent any of these, not even as a placeholder that "sounds right":
- statistics or percentages,
- laws, thresholds, or regulatory rules,
- research findings or study results,
- quotes,
- product features, rates, or terms,
- historical facts or dates,
- survey results.

If you need one of these and cannot source it, mark it as a gap for human research
(`_add citation_`, `_tbd_`) and flag it in the review note. A missing source is a
blocker to approval, not a reason to fabricate. This is why the skill stops at
`drafted`: the human confirms the Tier B citations.

## Preferred sources, in order
1. Government agencies
2. Central banks, where appropriate
3. Academic papers
4. Established nonprofit educational institutions
5. Official regulatory materials
6. High-quality research organizations

Do not cite another educational article merely because it explains a concept well.
Cite the underlying primary or authoritative source it drew from.

For U.S. personal-finance topics, common primary sources include: the Consumer
Financial Protection Bureau (CFPB), the Federal Deposit Insurance Corporation (FDIC),
the Federal Reserve, the Federal Trade Commission (FTC), the Internal Revenue Service
(IRS), the Department of Labor, the Department of Education, the Social Security
Administration, state regulators, and peer-reviewed research.

## The source-file format
The companion file records, for each claim that needs support, a single row with:
the claim, its type (`factual`, `research`, or `regulatory`), the source title, the
org or author, the publication date, the URL, the accessed date, whether the source is
primary or secondary, and the source's limitations. Below the table it lists every FSA
illustration and every statistic that will need a future update. Use
`templates/source-file.md`. An article cannot reach `approved` while its source file is
still a stub; the validator enforces this for public statuses.
