# CLAUDE.md — FSA (Financially Sovereign Academy)

> **Canonical context — read first.** The brain of The Sovereign Academy lives in the **TSA** repo (`~/Documents/Claude/Projects/TSA`). Before working here, read `TSA/MEMORY.md` (canonical facts, incl. resolved conflicts) and `TSA/standards/content-operating-system.md` (operating rules), and follow that standard. This repo inherits from TSA; it does not redefine it. FSA already runs the canonical TSA design style.

> **Filing rule (ecosystem-wide, 2026-08-14).** Code lives ONLY in `~/projects/`; the TSA brain lives ONLY in `~/Documents/Claude/Projects/TSA`. One repo = one remote = one local path — no `-canonical`/`-latest`/`-clone`/`-backup` copies. This repo is the canonical home for the **live FSA site** (financiallysovereign.academy) — the single copy; the former `~/Documents/Claude/Projects` duplicate was removed. Full rules: `TSA/registry/FILING-RULES.md`.

Live site for practical, LATAM-fluent financial education. Sister property to BSA; mostly mirrors BSA conventions.

## Me
Dalia — solo operator of **The Sovereign Academy** family. Email: dalia@thesovereign.academy.

## Identity
- **What:** universal, practical financial education (paycheck, budgeting, debt, inflation, banking, saving) — LATAM / Colombia-fluent.
- **Mission-driven, for the underbanked. Core education is never monetized.** The 10 modules, calculators, and assessment are free permanently. Do not add paywalls over them, and do not add Bitcoin-custody intake funnels here.
- **One narrow exception, added 2026-07-25 under MVP-001:** `/kits/` sells printable application kits for a single household decision each. Rules that make it an exception rather than a paywall: the full explainer for every kit is published free on its own page before anything is for sale; no free material is withheld or degraded to sell one; 30-day no-questions refunds; independence and no-advice disclaimers on every surface. See `docs/kits-commerce-runbook.md`. The homepage "no upsell" promise and FAQ were rewritten in the same change rather than left contradicting the site.
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
