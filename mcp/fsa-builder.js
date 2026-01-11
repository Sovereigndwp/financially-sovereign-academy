#!/usr/bin/env node

/**
 * FSA Platform Builder - MCP Powered
 * 
 * Autonomously generates Financially Sovereign Academy platform:
 * - Landing page
 * - 10 interactive modules
 * - Calculators and tools
 * - Progress tracking
 * - Assessment flow
 * 
 * Uses AI-assisted content generation with quality standards enforcement
 */

const fs = require('fs').promises;
const path = require('path');

// ============================================
// FSA Content Templates
// ============================================

const FSA_MODULES = [
  {
    id: 1,
    slug: 'money-mindset-cash-flow',
    title: 'Money Mindset & Cash Flow Mastery',
    duration: '20-30 min',
    description: 'Understand your relationship with money and take control of your cash flow',
    topics: ['money story', 'income vs expenses', 'budgeting', 'pay yourself first'],
    calculators: ['budget-calculator', 'cash-flow-simulator'],
    scenarios: [
      'Sarah\'s $3,200/month budget',
      'Irregular gig income',
      'Cutting $500/month painlessly'
    ],
    bitcoinMention: 'subtle',
    priority: 'critical'
  },
  {
    id: 2,
    slug: 'emergency-funds-saving',
    title: 'Emergency Funds & Smart Saving',
    duration: '25 min',
    description: 'Build a financial security buffer that protects you from life\'s surprises',
    topics: ['3-6 month emergency fund', 'liquidity vs returns', 'inflation risk', 'sinking funds'],
    calculators: ['emergency-fund-calculator', 'inflation-erosion-visualizer', 'savings-tracker'],
    scenarios: [
      'Job loss survival guide',
      'Car repair: prepared vs unprepared',
      'Building $10k in 12 months'
    ],
    bitcoinMention: 'inflation-context',
    priority: 'critical'
  },
  {
    id: 3,
    slug: 'banking-basics',
    title: 'Banking Without Getting Robbed',
    duration: '20 min',
    description: 'Use banks strategically and understand how the banking system really works',
    topics: ['fractional reserve', 'account types', 'fee avoidance', 'FDIC insurance'],
    calculators: ['bank-fee-calculator', 'account-comparison-tool'],
    scenarios: [
      'Overdraft fee trap',
      'Choosing the right bank',
      'Automation setup'
    ],
    bitcoinMention: 'self-custody-intro',
    priority: 'high'
  },
  {
    id: 4,
    slug: 'credit-scores',
    title: 'Credit Scores Decoded',
    duration: '25 min',
    description: 'Build and maintain excellent credit strategically',
    topics: ['FICO calculation', 'payment history', 'utilization', 'credit building'],
    calculators: ['credit-score-simulator', 'utilization-calculator'],
    scenarios: [
      '580 to 720 in 18 months',
      'Using cards without debt',
      'Recovering from mistakes'
    ],
    bitcoinMention: 'permissionless-assets',
    priority: 'high'
  },
  {
    id: 5,
    slug: 'debt-strategy',
    title: 'Debt Strategy - Borrow Smart or Not at All',
    duration: '30 min',
    description: 'Understand the true cost of debt and when to use it strategically',
    topics: ['good vs bad debt', 'APR vs APY', 'amortization', 'avalanche vs snowball'],
    calculators: ['debt-payoff-calculator', 'true-cost-calculator', 'loan-amortization-visualizer'],
    scenarios: [
      '$25k student loan comparison',
      'Credit card snowball',
      'Car loan vs saving'
    ],
    bitcoinMention: 'counterparty-risk',
    priority: 'critical'
  },
  {
    id: 6,
    slug: 'taxes-paychecks',
    title: 'Taxes & Paychecks Demystified',
    duration: '25 min',
    description: 'Understand the tax system and maximize your take-home pay',
    topics: ['gross vs net', 'withholdings', 'tax brackets', 'deductions', 'tax-advantaged accounts'],
    calculators: ['paycheck-breakdown', 'tax-bracket-calculator', 'w4-optimizer'],
    scenarios: [
      'First paycheck explained',
      'Adjusting withholdings',
      'Side hustle taxes'
    ],
    bitcoinMention: 'capital-gains',
    priority: 'high'
  },
  {
    id: 7,
    slug: 'investing-fundamentals',
    title: 'Investing for Humans (Not Wall Street)',
    duration: '35 min',
    description: 'Build long-term wealth through compound growth',
    topics: ['stocks/bonds/ETFs', 'diversification', 'compound interest', 'DCA', 'retirement accounts'],
    calculators: ['compound-growth-visualizer', 'asset-allocation-simulator', 'retirement-calculator'],
    scenarios: [
      '$500/month for 30 years',
      '10-year head start value',
      'Market crash survival'
    ],
    bitcoinMention: 'asset-class-comparison',
    priority: 'critical'
  },
  {
    id: 8,
    slug: 'risk-insurance',
    title: 'Protect What You\'ve Built (Insurance)',
    duration: '25 min',
    description: 'Risk management without over-insuring',
    topics: ['health insurance', 'auto', 'life', 'disability', 'renters/homeowners'],
    calculators: ['insurance-needs-calculator', 'premium-optimizer', 'coverage-gap-identifier'],
    scenarios: [
      '$50k medical bill comparison',
      'Car accident coverage',
      'Disability at 35'
    ],
    bitcoinMention: 'self-insurance',
    priority: 'high'
  },
  {
    id: 9,
    slug: 'consumer-protection',
    title: 'Don\'t Get Scammed (Consumer Protection)',
    duration: '20 min',
    description: 'Make smart spending decisions and avoid predatory practices',
    topics: ['comparison shopping', 'scam detection', 'contracts', 'digital security', '2FA'],
    calculators: ['scam-detector-quiz', 'password-strength-checker'],
    scenarios: [
      'Fake job offer signs',
      'Extended warranty math',
      'Romance scam flags'
    ],
    bitcoinMention: 'digital-security-principles',
    priority: 'high'
  },
  {
    id: 10,
    slug: 'financial-master-plan',
    title: 'Your Financial Master Plan',
    duration: '30 min',
    description: 'Integrate everything into a coherent life plan',
    topics: ['goal setting', 'net worth', 'prioritization', 'FI framework', 'periodic review'],
    calculators: ['net-worth-calculator', 'goal-prioritization-matrix', 'fi-calculator'],
    scenarios: [
      '25-year-old 30-year plan',
      '45-year-old course correction',
      'FI by 50'
    ],
    bitcoinMention: 'tool-decision-point',
    priority: 'critical'
  }
];

// ============================================
// AI Prompt Generator
// ============================================

function generateModulePrompt(module) {
  return `Create a complete interactive HTML module for Financially Sovereign Academy:

MODULE: ${module.title}
DURATION: ${module.duration}
GOAL: ${module.description}

TOPICS TO COVER:
${module.topics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

REQUIREMENTS:

1. **Structure**:
   - Hero section with module icon and overview
   - Entry assessment (3 questions to gauge existing knowledge)
   - Core content sections (one per topic)
   - Interactive calculator integration points
   - 3 real-world scenarios (${module.scenarios.join(', ')})
   - Comprehension quiz (7 questions, scenario-based)
   - Action plan (3 concrete next steps)
   
2. **Writing Style**:
   - 10th grade reading level (Flesch-Kincaid)
   - Conversational but authoritative
   - Zero jargon (or explain immediately)
   - Short paragraphs (3-4 sentences max)
   - Concrete examples, not abstract theory
   - Honest about complexity and trade-offs

3. **Bitcoin Integration** (${module.bitcoinMention}):
   ${getBitcoinIntegrationGuidance(module.bitcoinMention, module.id)}

4. **Interactive Elements**:
   - Placeholder divs for calculators: ${module.calculators.join(', ')}
   - Expandable scenario cards
   - Progress indicators
   - Knowledge check buttons
   - Next module CTA

5. **Design**:
   - Use FSA design tokens (green/blue palette, not orange)
   - Mobile-first responsive
   - Accessible (WCAG AA)
   - Clean, professional financial literacy aesthetic
   - Visual hierarchy with clear headings

6. **Technical**:
   - Standalone HTML file
   - Inline CSS (using design tokens)
   - Vanilla JavaScript for interactions
   - LocalStorage for progress tracking
   - No external dependencies

OUTPUT: Complete, production-ready HTML file that can be saved as modules/${module.slug}.html`;
}

function getBitcoinIntegrationGuidance(mentionType, moduleId) {
  const guidance = {
    'subtle': 'Very brief mention (1 sentence max). Example: "Some people budget in Bitcoin to avoid inflation." Do not elaborate.',
    
    'inflation-context': 'Mention Bitcoin as ONE option among many inflation-resistant assets. Example: "Cash loses 3-7% annually to inflation. Some people diversify with gold, I-Bonds, stocks, or Bitcoin." Include link: "Learn more about inflation-resistant assets →"',
    
    'self-custody-intro': 'Introduce self-custody concept. Example: "Banks hold your money and can freeze accounts. Self-custody options exist (cash, precious metals, Bitcoin) where you have full control." Keep neutral.',
    
    'permissionless-assets': 'Contrast permission-based vs permissionless. Example: "Credit requires permission to borrow. Some financial tools (Bitcoin, cash) don\'t require anyone\'s permission." Brief mention only.',
    
    'counterparty-risk': 'Explain counterparty risk. Example: "Debt creates obligations to lenders who can change terms. Sovereign assets (real estate you own, gold you hold, Bitcoin you control) have no counterparty." Conceptual, not promotional.',
    
    'capital-gains': 'Tax treatment context. Example: "Capital gains taxes apply to investments. Bitcoin has specific tax treatment (property, not currency). Consult tax professional." Factual only.',
    
    'asset-class-comparison': 'Objective comparison. Example: "Traditional portfolio: stocks + bonds. Modern debate: add alternatives like real estate, commodities, or Bitcoin for uncorrelated returns." Include comparison link.',
    
    'self-insurance': 'Self-insurance concept. Example: "Some choose to self-insure small risks and hold liquid assets (stocks, Bitcoin) instead of buying every insurance product." Brief context.',
    
    'digital-security-principles': 'Security principles apply universally. Example: "Just as passwords protect bank accounts, private keys protect Bitcoin. Never share either. Scammers target all assets." Universal security focus.',
    
    'tool-decision-point': 'MAJOR TRANSITION POINT. Example: "You now understand financial fundamentals. Next: Explore specific tools for wealth preservation, growth, and sovereignty. Options include traditional investments, real estate, precious metals, and Bitcoin. Ready to explore Bitcoin specifically? → Bitcoin Sovereign Academy" Include clear CTA.'
  };
  
  return guidance[mentionType] || 'Minimal mention, keep focus on core financial literacy.';
}

// ============================================
// Calculator Template Generator
// ============================================

function generateCalculatorPrompt(calculatorName, module) {
  return `Create an interactive calculator for Financially Sovereign Academy:

CALCULATOR: ${calculatorName}
CONTEXT: Used in Module ${module.id}: ${module.title}

REQUIREMENTS:

1. **Functionality**:
   - Real-time calculations as user types
   - Visual output (charts, graphs, or progress bars)
   - Shareable results (URL parameters or screenshot)
   - Mobile-friendly inputs
   - Input validation with helpful errors
   
2. **User Experience**:
   - Clear labels and tooltips
   - Sensible defaults
   - "Reset" and "Recalculate" buttons
   - Example scenarios users can load
   - Explanation of calculations (transparency)

3. **Output**:
   - Numerical results prominently displayed
   - Visual representation (Chart.js or pure CSS)
   - Interpretation help ("What this means for you")
   - Next action recommendations
   
4. **Technical**:
   - Standalone HTML file
   - Vanilla JavaScript (no frameworks)
   - Chart.js for visualizations (CDN)
   - Mobile-responsive
   - LocalStorage to save inputs
   
5. **Design**:
   - FSA color palette (green/blue)
   - Clean, professional calculator aesthetic
   - Clear visual hierarchy
   - Accessible form inputs

OUTPUT: Complete calculator HTML file saved as calculators/${calculatorName}.html

Include these specific features based on calculator type:
${getCalculatorSpecificFeatures(calculatorName)}`;
}

function getCalculatorSpecificFeatures(calculatorName) {
  const features = {
    'budget-calculator': `
- Income section (monthly/annual toggle)
- Expense categories (housing, food, transport, utilities, etc.)
- Auto-calculate totals
- "Surplus/Deficit" indicator
- 50/30/20 rule comparison
- Pie chart of spending breakdown
- "Pay yourself first" savings recommendation
- Export to CSV`,
    
    'emergency-fund-calculator': `
- Monthly expenses input
- Recommended 3-6 months calculation
- Current savings input
- Monthly savings amount input
- Timeline to goal visualization
- Progress bar showing % complete
- "What if" scenarios (job loss, emergency)`,
    
    'debt-payoff-calculator': `
- Multiple debt inputs (balance, APR, minimum payment)
- Avalanche vs Snowball comparison
- Timeline visualization for each method
- Total interest saved calculation
- Monthly payment recommendations
- Payoff order visualization
- Motivational milestones`,
    
    'compound-growth-visualizer': `
- Initial investment input
- Monthly contribution
- Annual return rate (slider)
- Time horizon (years)
- Line chart showing growth over time
- Comparison: with vs without monthly contributions
- Total contributed vs total value
- Power of starting early visualization`,
    
    'credit-score-simulator': `
- Current score input
- 5 action options (pay down debt, on-time payments, etc.)
- Projected score change
- Timeline to target score
- Visual score meter (300-850)
- Factor breakdowns (35% payment history, etc.)
- Recommendations ranked by impact`
  };
  
  return features[calculatorName] || `- Standard calculator features
- Input validation
- Clear result display
- Visual representation
- Mobile responsive`;
}

// ============================================
// Landing Page Generator
// ============================================

function generateLandingPagePrompt() {
  return `Create the landing page for Financially Sovereign Academy:

TAGLINE: "Master money. Master life."

SECTIONS:

1. **Hero Section**:
   - Headline: "Take Control of Your Financial Future"
   - Subheadline: "Learn what financial advisors charge 1-2% annually to know. Keep the fees. Gain the knowledge."
   - Primary CTA: "Start Learning Free →" (links to assessment)
   - Secondary CTA: "Browse Modules"
   - Trust signal: "No credit card. No signup required to start."
   - Visual: Abstract financial freedom illustration

2. **Value Proposition**:
   - "Learn the 10 fundamentals that change everything"
   - "Interactive, not lectures"
   - "Real scenarios, not theory"
   - "Honest about trade-offs"
   
3. **10 Modules Grid**:
   Display all 10 modules with:
   - Module number and icon
   - Title and duration
   - One-sentence description
   - Difficulty indicator
   - "Start Module" button
   - Lock icon for modules after Module 1 (unlock via progress)

4. **How It Works**:
   - Step 1: "Take 5-minute assessment" 
   - Step 2: "Get personalized learning path"
   - Step 3: "Complete interactive modules"
   - Step 4: "Master your finances"
   
5. **Interactive Tools Showcase**:
   Preview of calculators with screenshots/animations:
   - Budget Calculator
   - Debt Payoff Calculator
   - Compound Growth Visualizer
   - Credit Score Simulator
   CTA: "Try the calculators →"

6. **Social Proof** (placeholders for now):
   - "Over X learners have taken control"
   - Testimonial 1: "Finally understand money"
   - Testimonial 2: "Paid off $15k in debt using these principles"
   - Testimonial 3: "Built $10k emergency fund in 10 months"

7. **FAQ Section**:
   - "Is this really free?" → "Core 10 modules are 100% free. Advanced topics are premium."
   - "Do I need financial background?" → "No. Designed for complete beginners."
   - "How long does it take?" → "Most complete all 10 modules in 4-6 hours over 2-3 weeks."
   - "Is this about Bitcoin?" → "No. This is universal financial literacy. Bitcoin is mentioned as one tool among many where relevant."
   - "What's the catch?" → "No catch. Financial literacy should be accessible to everyone."

8. **CTA Footer**:
   - "Ready to become financially sovereign?"
   - Large CTA: "Start Your Journey"
   - Links to Module 1 and Assessment

DESIGN:
- Professional, trustworthy aesthetic
- Green/blue color palette (not orange)
- Clean, modern, minimalist
- Mobile-first responsive
- Fast loading
- Accessible (WCAG AA)

TECHNICAL:
- Single HTML file with inline CSS
- Smooth scroll navigation
- Lazy load images
- Vanilla JavaScript for interactions
- SEO optimized (meta tags, semantic HTML)
- Open Graph tags

OUTPUT: Complete landing page HTML file saved as index.html`;
}

// ============================================
// Assessment Flow Generator  
// ============================================

function generateAssessmentPrompt() {
  return `Create the learning path assessment for Financially Sovereign Academy:

PURPOSE: Quickly determine user's situation and recommend personalized module sequence

QUESTIONS (5 total):

1. "What's your primary financial goal right now?"
   - Get out of debt
   - Build emergency fund  
   - Start investing
   - Understand money basics
   - Plan for retirement
   - Increase income

2. "What's your current financial situation?"
   - Significant debt (>$10k)
   - Living paycheck to paycheck
   - Small savings, no debt
   - Comfortable, want to optimize
   - Building wealth, need advanced strategies

3. "How would you describe your financial knowledge?"
   - Complete beginner
   - Know basics, need structure
   - Intermediate, have gaps
   - Advanced, want specific topics

4. "What's your biggest financial worry?"
   - Not enough income
   - Too much debt
   - No emergency fund
   - Not investing enough
   - Getting scammed
   - Taxes and complexity
   - Not sure where to start

5. "How much time can you dedicate weekly?"
   - 30 minutes
   - 1-2 hours
   - 3-5 hours
   - Self-paced, no rush

LOGIC:
Based on answers, recommend one of 5 personas:
- The Debt-Burdened (prioritize Module 5, then 1, 2)
- The Fresh Graduate (prioritize Modules 1, 6, 2)
- The Mid-Career Earner (prioritize Modules 7, 8, 10)
- The Pre-Retiree (prioritize Modules 10, 7, 8)
- The Entrepreneur (prioritize Modules 1, 6, 5)

OUTPUT:
- Recommended persona name
- Suggested module sequence
- Reason for recommendation
- Estimated completion time
- CTA: "Start Module X →"

DESIGN:
- Progress indicator (Question X of 5)
- One question per screen
- Large, clear answer options
- Back button to change answers
- Friendly, conversational tone
- Mobile-optimized

TECHNICAL:
- Standalone HTML file
- Store results in localStorage
- Pass persona to landing page
- No server required
- Accessible forms

OUTPUT: Complete assessment HTML file saved as assessment.html`;
}

// ============================================
// Build Execution
// ============================================

async function buildFSAPlatform() {
  console.log('🏗️  Building Financially Sovereign Academy Platform...\n');
  console.log('📋 Generation Plan:');
  console.log('   1. Landing page');
  console.log('   2. Assessment flow');
  console.log('   3. Module 1 (full implementation)');
  console.log('   4. Module 1 calculators (2 tools)');
  console.log('   5. Design tokens CSS');
  console.log('   6. Progress tracking system\n');

  // Create AI prompts for human/AI to execute
  const prompts = {
    landingPage: generateLandingPagePrompt(),
    assessment: generateAssessmentPrompt(),
    module1: generateModulePrompt(FSA_MODULES[0]),
    calculator1: generateCalculatorPrompt('budget-calculator', FSA_MODULES[0]),
    calculator2: generateCalculatorPrompt('cash-flow-simulator', FSA_MODULES[0])
  };

  // Save prompts for AI execution
  const promptsDir = path.join(process.cwd(), 'mcp/prompts');
  await fs.mkdir(promptsDir, { recursive: true });

  for (const [name, prompt] of Object.entries(prompts)) {
    await fs.writeFile(
      path.join(promptsDir, `${name}.txt`),
      prompt
    );
    console.log(`✅ Generated prompt: ${name}`);
  }

  console.log('\n📝 All AI prompts saved to mcp/prompts/');
  console.log('\n🤖 Next Steps:');
  console.log('   1. Use Claude/GPT-4 with each prompt to generate files');
  console.log('   2. Save outputs to correct directories');
  console.log('   3. Test each component');
  console.log('   4. Iterate based on quality checks\n');

  // Create README with instructions
  const readme = `# FSA Platform Build Instructions

## Phase 1: Foundation (Current)

### Files to Generate:

1. **index.html** (Landing Page)
   - Use prompt: mcp/prompts/landingPage.txt
   - Save to: /index.html
   - Test: Open in browser, check responsiveness

2. **assessment.html** (Assessment Flow)
   - Use prompt: mcp/prompts/assessment.txt
   - Save to: /assessment.html
   - Test: Complete assessment, verify localStorage

3. **modules/money-mindset-cash-flow.html** (Module 1)
   - Use prompt: mcp/prompts/module1.txt
   - Save to: /modules/money-mindset-cash-flow.html
   - Test: Read through, test interactions

4. **calculators/budget-calculator.html**
   - Use prompt: mcp/prompts/calculator1.txt
   - Save to: /calculators/budget-calculator.html
   - Test: Input data, verify calculations

5. **calculators/cash-flow-simulator.html**
   - Use prompt: mcp/prompts/calculator2.txt
   - Save to: /calculators/cash-flow-simulator.html
   - Test: Run simulations, check visualizations

### Quality Checklist:
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)
- [ ] Fast loading (<3s)
- [ ] Works offline (after first load)
- [ ] LocalStorage persistence
- [ ] No console errors
- [ ] Cross-browser compatible

### Deployment:
\`\`\`bash
# After all files generated:
npm init -y
npm install -g vercel
vercel --prod
\`\`\`

### Next Phase:
After Phase 1 complete, generate remaining 9 modules using same process.
`;

  await fs.writeFile(path.join(process.cwd(), 'BUILD_INSTRUCTIONS.md'), readme);
  console.log('📖 Build instructions saved to BUILD_INSTRUCTIONS.md\n');

  return prompts;
}

// Run if executed directly
if (require.main === module) {
  buildFSAPlatform()
    .then(() => {
      console.log('🎉 FSA Platform builder complete!');
      console.log('👉 Use the generated prompts with AI to create files\n');
    })
    .catch(err => {
      console.error('❌ Error:', err);
      process.exit(1);
    });
}

module.exports = {
  buildFSAPlatform,
  generateModulePrompt,
  generateCalculatorPrompt,
  FSA_MODULES
};
