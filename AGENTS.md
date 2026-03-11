

# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Before creating something new, check whether the same goal is already being served somewhere else and whether this should extend, replace, or connect to that existing asset.

## Project Overview

Financially Sovereign Academy (FSA) is a companion platform to Bitcoin Sovereign Academy, teaching universal financial literacy through interactive, Socratic, and personalized learning. The frontend is a fully static HTML/CSS/JS site deployed to **Vercel** at `financiallysovereign.academy`. There is no build step — no bundler, no framework. A small Python API lives in `api/` for email subscription.

## Commands

### Local Development

```bash
python3 -m http.server 8000   # Serve static files at http://localhost:8000
npx serve .                    # Alternative static server
```

There is no `package.json` — this is a zero-dependency static site. No `npm install` needed for the frontend.

### Deployment

```bash
vercel --prod                  # Deploy to Vercel
```

Vercel serves the static files directly. `vercel.json` configures rewrites for clean institutional URLs and cache headers.

### API (email subscription)

```bash
pip install -r api/requirements.txt   # Install Python API deps
python api/main.py                     # Run subscription API locally
```

## Architecture

### Fully Static Frontend

All pages are standalone HTML files with inline or linked CSS/JS. No build step, no bundler, no transpilation. Pages load `css/fsa-theme.css` for theming and shared JS from `js/`.

### Key Directories

- `modules/` — 10 core educational modules (money-mindset, emergency-funds, banking, credit-scores, debt-strategy, taxes, investing, insurance, consumer-protection, financial-master-plan). Each is a self-contained HTML page with interactive elements.
- `calculators/` — Interactive financial tools (budget tracker, debt payoff, compound growth, net worth, financial freedom timeline, Bitcoin comparison). Each is a standalone HTML page.
- `js/` — Shared client-side JavaScript:
  - `module-navigation.js` / `module-progress.js` — Module sequencing and progress tracking via localStorage
  - `progress-manager.js` — Centralized progress state
  - `fsa-live-data.js` — Live financial data fetching
  - `fsa-plan-builder.js` — Financial plan builder logic
  - `fsa-glossary.js` — In-page glossary tooltips
  - `sovereignty-ladder.js` — Gamified progression system
  - `investing-labs.js` — Interactive investing simulations
  - `analytics.js` — Privacy-first Plausible tracking
- `css/` — Stylesheets; `fsa-theme.css` defines the green-themed design system. `interactive-components.css` for shared interactive element styles.
- `institutional/` — Pages for institutional audiences (cities, corporations, correctional, education, wealth advisors)
- `articles/` — Long-form educational articles
- `mcp/` — MCP builder (`fsa-builder.js`) and AI generation prompts for creating modules and calculators
- `data/` — JSON data files (live Bitcoin data, popup configurations)
- `api/` — Python-based email subscription API (`main.py`, `subscribe.py`)
- `admin/` — Admin dashboard

### State Management

All user state (progress, assessment results, preferences) is stored in **localStorage**. There is no backend user database.

### Design Tokens

FSA uses a green/blue palette distinct from BSA's orange:
- Primary green: `#10b981` (`--fsa-green`)
- Dark background: `#0a1f1a` (`--fsa-bg-dark`)
- Secondary dark: `#0f2922` (`--fsa-bg-secondary`)
- Card background: `#1a3a2e` (`--fsa-bg-card`)

### Relationship to BSA

FSA reuses proven patterns from Bitcoin Sovereign Academy (Socratic assessment flow, branching scenarios, calculator frameworks, progress tracking). Bitcoin is mentioned **organically** as one tool among many — it is not the starting point. Module 10 (Financial Master Plan) is the primary crossover point linking to BSA.

## Project Identity

This repo powers Financially Sovereign Academy.

This platform is practical financial literacy first.

Do not assume Bitcoin is the starting point for every page.

The primary audience is beginners, families, young adults, students, workers, and everyday people who need money concepts explained clearly, practically, and without shame or confusion.

The main goal is to help users make better financial decisions, reduce avoidable mistakes, build confidence, and take useful next steps in real life.

## Core Principles

- Prefer usefulness over theory.
- Prefer clarity over complexity.
- Prefer practical action over abstract advice.
- Prefer empathy over judgment.
- Prefer grounded education over hype.
- Prefer simple structure over information overload.

## Non-Negotiables

- Do not shame the user.
- Do not sound preachy, condescending, or overly academic.
- Do not use technical finance language without clear explanation.
- Do not assume the user has stability, privilege, strong income, or prior knowledge.
- Do not overload pages with too many concepts at once.
- Do not create redundant explanations across modules or tools.
- Do not drift into generic self-help language.

## Teaching Rules

Every page should help the user do at least one of these: understand a money concept, make a decision, avoid a mistake, take a practical next step, or feel less confused.

Whenever possible, structure lessons in this order: real-life problem → why people get stuck → simple explanation → practical options → tradeoffs → next step.

Use relatable scenarios, examples, prompts, reflection, and guided thinking.

Prefer decision-based learning over passive explanation.

If Bitcoin is introduced, connect it only after the underlying financial problem is clear.

## Tool and Page Rules

Any calculator, worksheet, or planner should be easy to understand without a long setup.

Use labels ordinary people understand.

Explain what the outputs mean, not just the numbers.

Prefer compare, decide, and plan workflows over feature-heavy calculators.

When building a new page, define: who it is for, what problem it solves, what decision it helps with, and what the user should do next.

Default page structure: clear headline → simple explanation of the problem → practical options or framework → real-life example → clear next step.

## Verifiable Content

Never fabricate statistics, data points, percentages, dollar figures, or claims in published content. Every quantitative claim must be traceable to a named, verifiable source. Add source attribution where stats are displayed.

## Quality Control

Before finalizing, check for: repetition, jargon, too much abstraction, condescending tone, visual clutter, unclear action step, missing tradeoffs, and unverified claims.
