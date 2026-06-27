# Claim ledger: Taxes & retirement limits 2026 refresh
Refreshed: 2026-06-27. Scope: year-bound tax data only (brackets, SS wage base, retirement limits, worked example, calculator data, quiz number). Method unchanged (gross-based, single filer). Sources added to SOURCES.md.

| claim_id | claim_text (2026) | type | source | status |
|---|---|---|---|---|
| tx26-01 | Single-filer brackets: 10% to $12,400; 12% to $50,400; 22% to $105,700; 24% to $201,775; 32% to $256,225; 35% to $640,600; 37% above | tax | IRS IR-2025-103 (Rev. Proc. 2025-32) | verified |
| tx26-02 | Social Security 6.2% up to $184,500 wage base (2026); Medicare 1.45% no cap | tax | SSA 2026 COLA fact sheet | verified |
| tx26-03 | $60,000 single filer worked example: $1,240 + $4,560 + $2,112 = $7,912 total, ~13.2% effective, 22% marginal | tax (derived) | computed from tx26-01 (gross-based, no std deduction) | verified-arithmetic |
| tx26-04 | 401(k) elective limit $24,500 (2026) | tax | IRS "401(k) limit increases to $24,500 for 2026" | verified |
| tx26-05 | IRA limit $7,500 (2026) | tax | same IRS release | verified |
| tx26-06 | Standard deduction (single) $16,100 (2026) | tax | IRS IR-2025-103 | verified (data only; not shown in page prose) |

Method note: the worked example and the paycheck calculator apply brackets to GROSS pay (they do not subtract the standard deduction). This is a pre-existing teaching simplification, left unchanged this pass. A new on-page note states: "This simplified estimate applies brackets to gross pay for learning purposes and does not include every deduction or tax situation."

Supersedes the dated-2024 rows (tx-02, tx-03) in claim-ledger-taxes-paychecks.md.
