# Claim ledger: modules/taxes-paychecks.html (visual wave 2)
Audited: 2026-06-26. Visual added: marginal-vs-effective split for the $60,000 example.

| claim_id | claim_text | type | source | status | notes |
|---|---|---|---|---|---|
| tx-01 | Federal brackets 10/12/22/24/32/35/37 are marginal; only income in each band is taxed at that rate | tax-fact | IRS (progressive brackets); page worked example | verified-concept | The marginal-vs-effective concept is year-independent and correct. |
| tx-02 | $60,000 single filer: ~$8,253 total = ~13.8% effective, not 22% | tax | page worked example, 2024 single-filer brackets (IRS) | dated-2024 | Visual labeled "single filer, 2024 federal brackets (IRS)." Internally consistent with the surrounding prose (also 2024). |
| tx-03 | Social Security 6.2% up to $168,600 in 2024 | tax | IRS/SSA wage base 2024 | dated-2024 | Already labeled "in 2024" in prose. Not visualized. Optional copy refresh: 2025 wage base is $176,100. |
| tx-04 | Federal income tax rates 10 to 37% | tax-fact | IRS | verified | In prose; not a new visual. |

Visual decision: one figure (marginal vs effective), which directly kills the top tax myth ("a raise into a higher bracket loses money"). Used the page's existing 2024 example numbers rather than mixing in fsa-live-data's 2025 brackets, to avoid year inconsistency within the section. Follow-up (out of scope): refresh the whole Taxes module to 2025 brackets/wage base in one pass, then this visual updates with it.
