# Financially Sovereign Academy

**Master money. Master life.**

## Overview

FSA is a companion platform to Bitcoin Sovereign Academy, teaching universal financial literacy through the same proven interactive, Socratic, and personalized learning approach.

## Built on BSA's Proven Patterns

### ✅ Reused Components from BSA

1. **Socratic Assessment Flow** (`assessment.html`)
   - 5-question personalization quiz
   - Adaptive scoring algorithm
   - Persona-based recommendations
   - LocalStorage state persistence
   - Source: `bitcoin-sovereign-academy/start/index.html`
   - Source: `bitcoin-sovereign-academy/js/onboarding-flow.js`

2. **Interactive Learning Architecture**
   - Branching scenario patterns (from BSA's `savings-disappear-scenario`)
   - Real-time calculator frameworks
   - Quiz/comprehension check systems
   - Progress tracking with localStorage
   - Source: `bitcoin-sovereign-academy/interactive-demos/`

3. **Design Philosophy**
   - Mobile-first responsive
   - WCAG AA accessible
   - Reduced motion support
   - Green/blue palette (vs BSA's orange)
   - Professional finance aesthetic

## What We've Created (Phase 1)

### Landing Page (`index.html`)
- Clear value proposition
- 10 modules overview
- FAQ section
- Assessment CTA ("Start Learning Free")
- **Status**: ✅ Complete

### Assessment Flow (`assessment.html`)
- 5 Socratic questions
- 5 persona recommendations:
  - The Debt Eliminator
  - The Fresh Start
  - The Wealth Builder
  - The Strategic Planner
  - The Financial Sovereign
- Personalized module sequences
- **Status**: ✅ Complete

### MCP Builder (`mcp/fsa-builder.js`)
- AI prompt generator for:
  - Modules 1-10
  - Calculators (budget, debt, compound growth, etc.)
  - Landing page variants
  - Assessment flows
- Enforces quality standards (10th grade reading, WCAG AA)
- **Status**: ✅ Complete

## Repository Structure

```
financially-sovereign-academy/
├── index.html              # Landing page
├── assessment.html         # Personalized assessment
├── modules/                # 10 core modules (to be created)
│   ├── money-mindset-cash-flow.html
│   ├── emergency-funds-saving.html
│   ├── banking-basics.html
│   ├── credit-scores.html
│   ├── debt-strategy.html
│   ├── taxes-paychecks.html
│   ├── investing-fundamentals.html
│   ├── risk-insurance.html
│   ├── consumer-protection.html
│   └── financial-master-plan.html
├── calculators/            # Interactive tools (to be created)
│   ├── budget-calculator.html
│   ├── debt-payoff-calculator.html
│   ├── compound-growth-visualizer.html
│   └── [12+ more calculators]
├── mcp/                    # MCP infrastructure
│   ├── fsa-builder.js      # Platform builder
│   └── prompts/            # AI generation prompts
└── README.md
```

## Next Steps (Implementation Roadmap)

### Phase 2: Core Content (Weeks 1-2)
- [ ] Create Module 1: Money Mindset & Cash Flow
  - Adapt BSA's branching scenario pattern
  - Build budget calculator
  - Build cash flow simulator
- [ ] Implement progress tracking system
  - Reuse BSA's learning-path.js patterns

### Phase 3: Additional Modules (Weeks 3-6)
- [ ] Module 2: Emergency Funds & Saving
- [ ] Module 3: Banking Without Getting Robbed
- [ ] Module 4: Credit Scores Decoded
- [ ] Module 5: Debt Strategy
- [ ] Modules 6-10 (using same patterns)

### Phase 4: Calculator Suite (Weeks 7-8)
- [ ] Budget Calculator
- [ ] Debt Payoff Calculator (avalanche vs snowball)
- [ ] Compound Growth Visualizer
- [ ] Emergency Fund Calculator
- [ ] Credit Score Simulator
- [ ] Tax Bracket Calculator
- [ ] Net Worth Tracker

### Phase 5: Polish & Launch (Week 9)
- [ ] Cross-browser testing
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Deploy to Vercel/Netlify

## Bitcoin Integration Strategy

FSA mentions Bitcoin **organically** as one tool among many:

- **Module 2 (Emergency Funds)**: Inflation context - "Some diversify with gold, I-Bonds, stocks, or Bitcoin"
- **Module 5 (Debt Strategy)**: Counterparty risk - "Sovereign assets have no counterparty"
- **Module 7 (Investing)**: Asset class comparison
- **Module 9 (Scam Protection)**: Security principles apply universally
- **Module 10 (Master Plan)**: **Major decision point** - Link to Bitcoin Sovereign Academy

Expected FSA → BSA conversion: **15-25%** organic discovery

## Design Tokens (FSA Theme)

```css
/* Primary Colors */
--fsa-green: #10b981;
--fsa-green-light: #34d399;
--fsa-green-dark: #059669;

/* Backgrounds */
--fsa-bg-dark: #0a1f1a;
--fsa-bg-secondary: #0f2922;
--fsa-bg-card: #1a3a2e;

/* Text */
--fsa-text-primary: #e0e0e0;
--fsa-text-secondary: #9ca3af;
--fsa-text-accent: #6ee7b7;
```

## Key Differences from BSA

| Aspect | BSA | FSA |
|--------|-----|-----|
| **Focus** | Bitcoin mastery | Universal finance |
| **Palette** | Orange (#f7931a) | Green (#10b981) |
| **Bitcoin** | Core topic | One tool among many |
| **Target** | Bitcoin curious | Everyone |
| **Conversion** | Direct (learn Bitcoin) | Gradual (discover Bitcoin) |

## Technology Stack

- **Frontend**: Vanilla HTML/CSS/JS (same as BSA)
- **State**: LocalStorage (client-side)
- **Deployment**: Vercel/Netlify
- **Analytics**: Plausible (privacy-first)
- **No Backend**: Fully static

## Quality Standards

### Content
- 10th grade reading level (Flesch-Kincaid)
- 3-4 sentence paragraphs max
- Zero jargon without explanation
- Concrete examples, not theory
- Honest about trade-offs

### Technical
- WCAG AA accessible
- Mobile-first responsive
- <3s page load
- Works offline (after first load)
- No external dependencies

### Testing Checklist
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] Touch targets 44x44px minimum
- [ ] Color contrast 4.5:1 minimum
- [ ] Reduced motion respected

## Running Locally

```bash
# Simple HTTP server (no build required)
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Open http://localhost:8000
```

## Contributing

This is currently a solo project by @Sovereigndwp. Future contributions welcome once core 10 modules are complete.

## Related Projects

- **Bitcoin Sovereign Academy**: `/Users/dalia/projects/bitcoin-sovereign-academy`
  - Source of interactive patterns
  - Companion platform for Bitcoin-specific learning
  - Cross-linking in Module 10

## License

MIT (same as BSA)

## Credits

Built using proven patterns from Bitcoin Sovereign Academy's MCP-powered self-improving educational platform.

**Tagline**: "Master money. Master life."
**Mission**: Make financial literacy accessible to everyone through interactive, personalized learning.

---

**Status**: Phase 1 Complete (Landing + Assessment) ✅
**Next**: Build Module 1 using BSA's interactive demo patterns
