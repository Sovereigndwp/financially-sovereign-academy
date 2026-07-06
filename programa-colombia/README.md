# Programa Colombia — Maintenance Rules

**Canonical source: THIS folder (`financially-sovereign-academy/programa-colombia/`).**

Programa Colombia is financial-literacy content, so it lives in FSA. As of July 2026:

1. **All future edits happen here first.** Never edit the copy in `bitcoin-sovereign-academy/programa-colombia/` — it is legacy and should be reduced to redirects pointing at `https://financiallysovereign.academy/programa-colombia/`.
2. **Duplicate manual editing is not allowed.** If a change seems to require touching both repos, stop — the BSA side should only ever be a redirect or a thin pointer page.
3. **BSA URLs redirect here.** `bitcoinsovereign.academy/programa-colombia/*` and the legacy root shortcuts `bitcoinsovereign.academy/semana-N/` should 301 to the FSA equivalents (configured in BSA's `vercel.json`).
4. **Internal links are relative.** Pages in this folder must link to each other with relative paths (`./semana-3/`, `../semana-10/experimento-dos-economias/`), never absolute domain URLs. Absolute BSA links were the cause of the 2026-07 "Week 2+ 404" incident.
5. **Shared assets** (`lesson-structure.css`, `programa-colombia-v2.css`, `program-state.js`) are versioned here. `program-state.js` is the June-2026 BSA build (cross-week sync, copy-plan, summary) with FSA branding.
6. **Sourcing:** every number needs an entry in `/SOURCES.md` (see "Programa Colombia" section).

Known editorial follow-up (not routing): Semana 5 exists in two slightly different revisions (FSA has extra simulator stats; BSA had refined wording). FSA's version is live; merge BSA's wording improvements when convenient.
