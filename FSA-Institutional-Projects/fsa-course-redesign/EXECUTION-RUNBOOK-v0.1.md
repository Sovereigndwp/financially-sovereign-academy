# FSA Course Redesign — Execution Runbook (v0.1)

The single index + working checklist for the FSA 10-module redesign. Governs order, gates, branches, and rollback. **No step runs ahead of its gate. No commit without owner approval. Served-mode verification only.**

Authority split (applies everywhere): **Token Sheet + Hub** = visual/token/type authority · **Module 2 pilot** = structure + pattern proof · **Shared CSS** = where reusable styles live · **TBA/boundary rules** = worksheets are planning tools, not financial advice.

---

## Document map (this folder)

| Doc | Role |
|---|---|
| `README-structure-index-v0.1.md` | folder index |
| `fsa-10-module-redesign-audit-v0.1.md` | 14-point audit + structure proposals |
| `fsa-module-template-spec-v0.1.md` | standard module shape |
| `fsa-module-a11y-interaction-checklist-v0.1.md` | per-module a11y/interaction bar |
| `fsa-worksheet-download-system-v0.1.md` | worksheet/paper system |
| `phase-0-scaffolding-build-report-v0.1.md` | Phase-0 build report |
| `fsa-module-2-pilot-plan-v0.1.md` | Module 2 pilot plan |
| `module-2-post-pilot-decision-note-v0.1.md` | what becomes the standard |
| `shared-css-extraction-plan-v0.1.md` | how pilot styles become shared CSS |
| `token-reconciliation-ab-v0.1.md` | graphite vs current neutrals (Option A chosen) |
| `hardcoded-neutrals-audit-v0.1.md` | where neutrals are hard-coded |
| `layer-1-token-change-spec-v0.1.md` | tokens (graphite/paper) |
| `layer-2-typography-spec-v0.1.md` | typography incl. emerald-fade selected-signal-text role |
| `layer-3-component-correction-plan-v0.1.md` | gate/traps/worksheet/cards/buttons |
| `layer-4-5-a11y-print-spec-v0.1.md` | a11y + worksheet-only print |
| `EXECUTION-RUNBOOK-v0.1.md` | this file |

## The gate ladder

- **Gate 1 — merge `feat/fsa-module-2-hybrid-pilot`.** ✅ Done.
- **Gate 2 — review Module 2 live in production.** ✅ Done, approved.
- **Layer 1 — graphite/paper tokens** (`feat/fsa-layer-1-graphite-tokens`). Changes applied, regression passing, **uncommitted — awaiting visual-pass approval, then commit.**
- **Layer 2 — typography** (incl. emerald-fade role). Not started; **blocked on Layer 1 committed**.
- **Layer 3 — components** (scoped). Blocked on Layer 2.
- **Layer 4 — accessibility.** Blocked on Layer 3.
- **Layer 5 — print (worksheet-only).** Blocked on Layer 4.
- **Parity gate — Module 2 value-identical from shared CSS** (inline block removed). Blocked on Layers 2–5.
- **Module 1 redesign.** Blocked on the parity gate.
- **Modules 3–4, then small batches.** Blocked on Module 1.
- **Layer 3b — global component defaults.** Deferred/gated; not on the critical path.

## Iron rules

1. **One layer per branch**, own regression + rollback; sequential — no layer starts until the previous is verified (and, for Layer 1, committed).
2. **No commit without owner approval.**
3. **Served-mode verification only** (`python3 -m http.server`); never trust `file://` (absolute `/css/`, `/worksheets/pdf/` paths break under it).
4. **Scope course CSS under `.fsa-course`**; do not edit global `body`/`.btn`/`h1` or non-redesigned pages.
5. **`!important` budget = 0** in course layers except defensive a11y (reduced-motion).
6. **Emerald fade = web text-signal only**; never on buttons/cards/large backgrounds/worksheet-print/full headings; never copy cities.html gradient-border buttons.
7. **Worksheets are planning tools, not financial advice** — keep the disclaimer.
8. **Value-identical proof required** before Module 1.
9. **Verify diff scope** (`git diff --stat`) matches each layer's declared file set before proposing a commit.

## Per-layer commit sequence (repeat each layer)

1. Create the layer branch.
2. Apply only the files named in that layer's spec.
3. Run served-mode regression (desktop + 375px), before/after.
4. Confirm `git diff --stat` = declared file set.
5. Report regression results. **Stop. Await approval.**
6. On approval: commit (single focused commit, test-plan note in body), push, verify `origin/main` not ahead.

## Rollback quick reference

- **Layer 1:** `git checkout` the 3 token/theme files (or restore literals).
- **Layers 2–5:** remove the shared file from the module load list + restore Module 2's inline block for that layer. No global CSS touched, so other pages are never at risk.

## Current status snapshot

Gates 1–2 done. Layer 1 applied + regression-passing + **uncommitted**. Layers 2–5 specced, not started. Planning docs restored to this folder. Next real action: commit Layer 1 after the owner approves its visual pass — then Layer 2.

---

*Index/runbook. Governs order and gates only; each layer's mechanics live in its own spec.*
