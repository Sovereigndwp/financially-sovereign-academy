# Claim ledger: modules/emergency-funds-saving.html (visual wave 1)
Audited: 2026-06-26. Visuals added: build-stage step-flow; where-to-keep tradeoff.

| claim_id | claim_text | type | source | status | notes |
|---|---|---|---|---|---|
| ef-01 | 3 to 6 months of expenses is the standard emergency-fund target | educational-simplification | widely standard personal-finance guidance | verified-general | Conceptual; shown qualitatively in the build flow. |
| ef-02 | Build stages: $1,000 starter, then 1 month, 3 months, 6 months | educational-simplification | page's own staged framing | illustrative | Step-flow caption states amounts are examples; target depends on monthly expenses. No hard total charted. |
| ef-03 | HYSA up to ~4.5% vs avg ~0.47% | market-data | fsa-live-data.js baseline + SOURCES.md → FDIC National Rates and Rate Caps | dated-baseline | Not charted as a bar; the where-to-keep tradeoff cites the FDIC baseline, early 2026. |
| ef-04 | Emergency-fund money should be FDIC insured | legal-regulatory | SOURCES.md → FDIC Deposit Insurance | verified | Stated in the tradeoff visual; sourced to fdic.gov. |
| ef-05 | Inflation currently ~2.9%/year | market-data | data-fsa-live (BLS CPI, SOURCES.md) | dated-live | In prose only; not added to a new visual. |

Visual decision: skipped a "target amount" stat callout because the section already has a staged calculator that outputs $1,000 / 3-month / 6-month targets (avoid duplicating a live calculator). Added the build-stage flow (the progression the calculator does not show) and the placement tradeoff.
