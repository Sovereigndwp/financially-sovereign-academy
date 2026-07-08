# CLAUDE.md — FSA (Financially Sovereign Academy)

> **Canonical context — read first.** The brain of The Sovereign Academy lives in the **TSA** repo (`~/Documents/Claude/Projects/TSA`). Before working here, read `TSA/MEMORY.md` (canonical facts, incl. resolved conflicts) and `TSA/standards/content-operating-system.md` (operating rules), and follow that standard. This repo inherits from TSA; it does not redefine it. FSA already runs the canonical TSA design style.

Live site for practical, LATAM-fluent financial education. Sister property to BSA; mostly mirrors BSA conventions.

## Me
Dalia — solo operator of **The Sovereign Academy** family. Email: dalia@thesovereign.academy.

## Identity
- **What:** universal, practical financial education (paycheck, budgeting, debt, inflation, banking, saving) — LATAM / Colombia-fluent.
- **Mission-driven, for the underbanked. Explicitly NOT monetized.** Do not add paywalls, upsells, or Bitcoin-custody intake funnels here.
- **Boundary:** FSA teaches money foundations and can bridge to BSA, but is **not** a Bitcoin custody/inheritance/advice funnel and never replaces BSA or TBA.
- **Domain:** financiallysovereign.academy. **Remote:** `github.com/Sovereigndwp/financially-sovereign-academy`.

## Conventions (mirror BSA unless noted)
- **Brand voice:** first-principles, inform-not-convince. Source every number (see `SOURCES.md`).
- **Distinct visual:** green lab-guide theme; localStorage key `fsa_lab_completions` (BSA uses `bsa_lab_completions`).
- **CSS tokens:** extend, never introduce new ones. TSA canonical tokens are the reference.
- **Quality bar:** `programa-colombia` craft level.
- **Live data:** static, dated baselines — never `new Date()`.

## Active context (from memory — canonical is TSA/MEMORY.md)
- Module canonical order is contested in 3 places — verify before nav/order work.
- Visual rollout: Banking + W1 + W2 merged; W3 on hold.
- Eleventy templatization: PR #57 reverted (broke prod); sandbox POC complete, prod untouched.
- Institutional projects: 6 Claude Project folders under `FSA-Institutional-Projects/`.

## The brain
Ontology, standards, and boundaries live in `~/Documents/Claude/Projects/TSA`. FSA inherits them; it does not redefine them.

## Working with Claude here
- Sandbox can read/create files but **cannot delete/move or run `git commit`** — Claude hands you git commands to run on your Mac.
- Preferences: concise and direct; minimal formatting; wants pushback and efficient AI workflows.
