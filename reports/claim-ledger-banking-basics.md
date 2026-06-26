# Claim ledger: modules/banking-basics.html

Audited: 2026-06-26. Standard: every quantitative claim traces to a named, dated source, or is labeled illustrative.

## Summary
- verified (sourced): 2
- verified-with-date (baseline): 4
- illustrative / softened (labeled, no precision claimed): 7
- needs-revision: 0 (all resolved 2026-06-26)

All flagged copy issues resolved on 2026-06-26 (see Resolution section). Visual-kit impact applied: account-rate bars now carry the FDIC National Rates dated-baseline label; spread bars stay illustrative; FDIC panel stays sourced.

## Resolution (2026-06-26)
- bb-06 `$329/year`: no clean dated source available, so the hard number was removed and softened to "Bank fees can add up to hundreds of dollars a year." Status: softened.
- bb-08..bb-12 fee ranges: kept (they teach the concept) and labeled "Typical ranges. Actual fees vary by bank and account." Status: illustrative-labeled.
- bb-13 6-withdrawals: revised to "Some banks may still limit certain savings withdrawals by policy. The old federal six-per-month rule (Regulation D) was suspended in 2020, so it is no longer a universal limit." Status: corrected. Follow-up (out of current scope): add a SOURCES.md entry citing the Federal Reserve interim final rule amending Regulation D (April 2020).
- bb-03/04/05 account rates: visual caption now cites "FDIC National Rates and Rate Caps; baseline as of early 2026. Actual rates vary by bank." The on-page prose still says HYSA "up to 4.5% right now" bound to data-fsa-live with a dated banner; acceptable, optional minor softening of "right now" deferred.

## Ledger

| claim_id | claim_text | claim_type | source | tier | status | recommended_correction |
|---|---|---|---|---|---|---|
| bb-01 | FDIC insures deposits up to $250,000 per depositor, per insured bank, per ownership category | legal-regulatory | SOURCES.md → FDIC Deposit Insurance FAQs (fdic.gov) | 1 (primary) | verified | None. Visual source line is correct. |
| bb-02 | $300k must be split across banks to stay fully insured; joint account = $500k coverage | educational-simplification | derived from bb-01 | 1 | verified | None (correct arithmetic on the rule). |
| bb-03 | Standard savings APY ~0.47% | market-data | fsa-live-data.js BASELINE (avgSavingsApy 0.47, "US averages early 2026") + SOURCES.md → FDIC National Rates and Rate Caps | 1 (primary), baseline not live | verified-with-date | Cite "FDIC National Rates and Rate Caps, baseline early 2026." Drop "live/right now" framing. |
| bb-04 | High-yield savings up to ~4.5% | market-data | fsa-live-data.js BASELINE (hysa_apy 4.50) + FDIC/market | 2 (baseline estimate) | verified-with-date | Same dated-baseline label; "up to" is fair as a top-rate figure. |
| bb-05 | Checking interest ~0% (avg ~0.08%) | market-data | fsa-live-data.js BASELINE (avgCheckingApy 0.08) | 1, baseline | verified-with-date | "~0%" is a fair rounding of 0.08%; dated-baseline label. |
| bb-06 | The average American pays $329/year in bank fees | market-data | none in SOURCES.md | — | needs-source | Add a named, dated survey (e.g. a checking-fee study with year) OR soften to "hundreds of dollars a year." Do not chart the precise number until sourced. |
| bb-07 | Banks pay you ~0.5% and lend it out at ~7% (the spread) | educational-simplification | none (teaching illustration) | — | illustrative | Keep. Already labeled "illustrative examples, not specific offers." |
| bb-08 | Overdraft fee $35 per transaction | market-data | none in SOURCES.md | — | needs-source | Cite CFPB overdraft data (~$35 median) with year, or label "typical." |
| bb-09 | Monthly maintenance $12-15 | market-data | none | — | needs-source | Cite a fee survey/year or label "typical range." |
| bb-10 | Out-of-network ATM fee $3-5 | market-data | none | — | needs-source | Cite Bankrate ATM/overdraft study with year, or label "typical." |
| bb-11 | Paper statement fee $5-10/month | market-data | none | — | needs-source | Source or label "typical." |
| bb-12 | Wire transfer fee $15-30 | market-data | none | — | needs-source | Source or label "typical." |
| bb-13 | Savings limited to ~6 withdrawals/month | legal-regulatory | none (Reg D 6-withdrawal limit suspended Apr 2020) | — | needs-revision | Reg D withdrawal limit was suspended in 2020; many banks still cap it. Reword to "many banks still limit withdrawals (often 6/month)." Flag for review. |
| bb-14 | Banks pay you 0.5%, charge borrowers 7% (net-interest-margin framing) | educational-simplification | — | — | illustrative | Keep as teaching illustration. |

## Visual-kit decision (answer to the question asked)
- Account-rate bars (checking / standard savings / high-yield): **upgrade to a real dated source.** Replace "Rates are examples for comparison" with: "Source: FDIC National Rates and Rate Caps; baseline as of early 2026. Actual rates vary by bank." (Matches SOURCES.md + the live-data baseline + the on-page "as of" banner.)
- Spread bars (0.5% / 7%): **keep labeled illustrative.** Not a sourced statistic.
- FDIC panel ($250k): **verified** — current source line is correct.

## Needs human review
- bb-13 Reg D withdrawal-limit wording (regulatory; suspended 2020) — recommend the reviewer confirm phrasing.
- bb-06 / fee ranges — decide cite-vs-soften before these numbers appear in any chart.
