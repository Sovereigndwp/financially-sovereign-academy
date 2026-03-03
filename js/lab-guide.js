/* ==========================================================
   Lab Guide System — Personal Finance Practical Exercises
   Financially Sovereign Academy

   Usage:
     Include /css/lab-guide.css and /js/lab-guide.js on any page.
     Call openLab('lab-id') to open a lab.
     Use <div class="lab-card" data-lab="ID" onclick="openLab('ID')"> for inline triggers.
   ========================================================== */

(function (global) {
    'use strict';

    const LABS = {

        'budget-tracker': {
            id: 'budget-tracker',
            icon: '💰',
            title: 'Build Your First Monthly Budget',
            subtitle: 'Track income and expenses using a real spreadsheet',
            duration: '20 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['Google Sheets or Excel'],
            steps: [
                {
                    title: 'Get the budget template',
                    content: 'Start with a structured template — don\'t build from scratch. The FSA budget template separates fixed expenses, variable expenses, savings targets, and income with a built-in 50/30/20 analysis.',
                    links: [
                        { label: 'Download FSA Budget Template (CSV)', url: '/assets/templates/fsa-budget-template.csv' }
                    ],
                    info: '<strong>Google Sheets:</strong> Open Google Sheets → File → Import → Upload the CSV → "Replace spreadsheet." <br><strong>Excel:</strong> Double-click the downloaded CSV to open it directly. <br>Then fill in your real numbers in the Amount column.',
                    verify: 'I have the budget template open in a spreadsheet and ready to edit'
                },
                {
                    title: 'Enter your income (take-home pay only)',
                    content: 'List all income sources. Use your <strong>net (after-tax) income</strong> — not your gross salary. This is the actual money that hits your bank account.',
                    instructions: [
                        'Primary job: monthly take-home pay after all deductions',
                        'Side income: average monthly amount (be conservative)',
                        'Any other regular deposits: freelance, rental, etc.'
                    ],
                    warn: 'Do not use gross salary. Budgeting with gross income causes shortfalls when taxes are withheld.',
                    verify: 'Total monthly income entered in the Income section'
                },
                {
                    title: 'List fixed expenses',
                    content: 'Fixed expenses are the same every month — they\'re easy to track because they don\'t change.',
                    instructions: [
                        'Rent or mortgage payment',
                        'Car payment (if any)',
                        'Insurance premiums (health, car, renters/homeowners)',
                        'Subscription services (Netflix, gym, software)',
                        'Minimum debt payments (credit cards, student loans)'
                    ],
                    tip: 'Check your bank statement for the last 3 months to catch forgotten subscriptions.',
                    verify: 'All fixed expenses entered with accurate monthly amounts'
                },
                {
                    title: 'Estimate variable expenses',
                    content: 'Variable expenses fluctuate monthly. Use your bank or card statements from the past 30 days to estimate averages.',
                    instructions: [
                        'Groceries and household supplies',
                        'Gas / transportation',
                        'Dining out and takeout',
                        'Entertainment and activities',
                        'Clothing and personal care',
                        'Miscellaneous / unexpected'
                    ],
                    info: 'Most people underestimate variable expenses by 20–30%. Round up, not down.',
                    verify: 'Variable expenses estimated using real statement data'
                },
                {
                    title: 'Calculate your net cash flow',
                    content: 'Net cash flow = total income minus total expenses. This single number tells you whether you\'re moving forward or backward financially.',
                    instructions: [
                        'Look at the "Net Cash Flow" cell in the template',
                        'Positive = surplus (money left after everything)',
                        'Negative = deficit (spending more than you earn)',
                        'Zero = break-even (no savings, but not in debt)'
                    ],
                    warn: 'A negative cash flow means you\'re going into debt each month. This must be fixed before investing.',
                    verify: 'I know my exact monthly surplus or deficit'
                },
                {
                    title: 'Apply the 50/30/20 rule',
                    content: 'The 50/30/20 rule is a simple framework: 50% of take-home to needs, 30% to wants, 20% to savings and debt payoff.',
                    instructions: [
                        'Calculate 50% of your take-home pay — this is your needs ceiling',
                        'If rent + utilities + groceries + minimums exceed 50%, you\'re housing-burdened',
                        'Calculate 20% of take-home — this is your savings/debt minimum target',
                        'Adjust your variable categories until your budget reflects these ratios'
                    ],
                    tip: 'The 50/30/20 split is a guideline, not a law. High cost-of-living areas may require 60/20/20. The savings rate is the number that matters most.',
                    verify: 'My budget shows a positive or intentional cash flow'
                }
            ],
            reflection: 'A budget is not a restriction — it\'s a plan that tells your money where to go instead of wondering where it went. Most people who "can\'t save money" simply haven\'t assigned a destination for their surplus. You\'ve now built the foundation for every financial goal that follows.'
        },

        'inflation-calculator': {
            id: 'inflation-calculator',
            icon: '📈',
            title: 'Calculate Inflation\'s Impact on Your Savings',
            subtitle: 'Use real CPI data to see how inflation erodes purchasing power',
            duration: '15 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['BLS CPI Calculator (browser)'],
            steps: [
                {
                    title: 'Open the official US inflation calculator',
                    content: 'The Bureau of Labor Statistics publishes the Consumer Price Index (CPI) — the official measure of inflation. Their online calculator lets you see exactly how purchasing power has changed.',
                    links: [{ label: 'BLS CPI Inflation Calculator (official US government data)', url: 'https://www.bls.gov/data/inflation_calculator.htm' }],
                    verify: 'The BLS inflation calculator is open in my browser'
                },
                {
                    title: 'Calculate how much $1,000 has lost since you were born',
                    content: 'Enter $1,000 and the year you were born as the starting year. Set the ending year to today. See what $1,000 then is worth today in purchasing power.',
                    instructions: [
                        'Enter $1,000 in the amount field',
                        'Set "From" year to your birth year',
                        'Set "To" year to the current year',
                        'Click Calculate'
                    ],
                    info: 'The result shows what $1,000 of your birth year\'s purchasing power is worth today. If it shows $4,200 — that means it costs $4,200 today to buy what $1,000 bought then.',
                    verify: 'I know what $1,000 from my birth year is worth today'
                },
                {
                    title: 'Calculate the real return on your savings account',
                    content: 'Most savings accounts pay less than 1% APY. If inflation is 3%, you are losing purchasing power even while earning interest.',
                    instructions: [
                        'Find your current savings account APY (check your bank\'s website or app)',
                        'Look up the current 12-month CPI change on the BLS website',
                        'Real return = your APY minus inflation rate',
                        'Example: 0.5% APY minus 3.2% inflation = -2.7% real return'
                    ],
                    warn: 'A negative real return means your money shrinks in purchasing power every year it sits in that account.',
                    verify: 'I know my savings account\'s real (inflation-adjusted) annual return'
                },
                {
                    title: 'Find the current inflation rate',
                    content: 'Know the number you\'re fighting against. The 12-month CPI change is the most commonly cited inflation figure.',
                    links: [{ label: 'Latest CPI Summary (BLS.gov)', url: 'https://www.bls.gov/cpi/' }],
                    instructions: [
                        'Open the CPI summary page',
                        'Find the "12-month percent change" for All Urban Consumers (CPI-U)',
                        'This is the headline inflation rate'
                    ],
                    tip: 'Core CPI (excluding food and energy) is often lower than headline CPI — but food and energy are real expenses. Use headline CPI for personal finance planning.',
                    verify: 'I know today\'s 12-month inflation rate and my account\'s real return'
                }
            ],
            reflection: 'Inflation is a silent tax on idle cash. This is why keeping large sums in a 0.5% savings account for years is a financial decision — just not a good one. The goal is to earn at or above the inflation rate on money you don\'t need immediately, and put money you won\'t need for 5+ years into assets that historically beat inflation.'
        },

        'emergency-fund-calc': {
            id: 'emergency-fund-calc',
            icon: '🛡️',
            title: 'Calculate Your Emergency Fund Target',
            subtitle: 'Use real expenses to find your 3–6 month runway number',
            duration: '10 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['Calculator or spreadsheet'],
            steps: [
                {
                    title: 'List your essential monthly expenses only',
                    content: 'An emergency fund covers survival, not comfort. List only what you absolutely must pay to keep your life functional during a job loss or medical crisis.',
                    instructions: [
                        'Rent or mortgage payment',
                        'Utilities: electricity, gas, water, internet',
                        'Groceries (bare minimum, not dining out)',
                        'Insurance premiums you cannot cancel',
                        'Minimum debt payments (to avoid penalties)',
                        'Transportation to job interviews or work'
                    ],
                    info: 'Do NOT include dining out, streaming subscriptions, gym memberships, or entertainment. In an emergency, these are cut first.',
                    verify: 'I have a list of essential-only monthly expenses with dollar amounts'
                },
                {
                    title: 'Calculate your monthly survival number',
                    content: 'Add up all essential expenses from Step 1. This is your monthly survival number — the minimum you need to keep your life running.',
                    instructions: [
                        'Add all essential expenses',
                        'This is your baseline emergency fund monthly cost',
                        'Multiply by 3 for a starter emergency fund (3 months of coverage)',
                        'Multiply by 6 if you are: self-employed, single income, volatile industry, or have dependents'
                    ],
                    tip: 'If you\'re unsure whether to do 3 or 6 months: 3 months if you have a stable job in a growing industry with marketable skills. 6 months if any of the risk factors above apply.',
                    verify: 'I have a 3-month and 6-month target number calculated'
                },
                {
                    title: 'Check your current liquid savings',
                    content: 'Liquid savings = money available within 1–2 business days without penalty. This means checking and savings accounts. NOT retirement accounts, NOT investment accounts.',
                    instructions: [
                        'Check your checking account balance',
                        'Check your savings account balance',
                        'Add them together — this is your current emergency fund',
                        'Do NOT count credit card limits or investments'
                    ],
                    warn: 'Credit cards are not emergency funds — using them in a real emergency adds debt on top of a crisis. An emergency fund must be cash.',
                    verify: 'I know my current liquid savings total'
                },
                {
                    title: 'Calculate your monthly savings goal',
                    content: 'Now calculate how long it will take to fully fund your emergency fund based on your budget surplus.',
                    instructions: [
                        'Gap = your target minus your current liquid savings',
                        'If you have a $500/month budget surplus, divide gap by $500',
                        'This gives you months to full funding',
                        'Prioritize emergency fund before investing if gap is more than $1,000'
                    ],
                    verify: 'I know my gap and how many months to fully fund my emergency fund at my current savings rate'
                }
            ],
            reflection: 'An emergency fund is not a savings account — it is insurance. Its job is not to grow but to be available immediately. Once fully funded, redirect that monthly savings toward debt payoff or investing. People without emergency funds are one car repair away from credit card debt.'
        },

        'debt-avalanche': {
            id: 'debt-avalanche',
            icon: '⛏️',
            title: 'Build Your Debt Payoff Plan',
            subtitle: 'Order your debts to minimize total interest paid (avalanche method)',
            duration: '20 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['Spreadsheet or pen and paper'],
            steps: [
                {
                    title: 'List every debt you owe',
                    content: 'Get a complete, honest picture of your debt. Include everything except your mortgage (which gets separate treatment).',
                    instructions: [
                        'For each debt, write down: name, current balance, interest rate (APR), minimum monthly payment',
                        'Include: credit cards, personal loans, car loans, student loans, medical debt',
                        'Find the APR on your most recent statement or by logging into each account',
                        'Do NOT include your mortgage in this exercise'
                    ],
                    info: 'Many people underestimate their total debt because they don\'t add it all up at once. Facing the complete number is uncomfortable but essential.',
                    verify: 'I have a complete list of all debts with balance, rate, and minimum payment'
                },
                {
                    title: 'Sort by interest rate (highest first)',
                    content: 'The avalanche method targets the highest-interest debt first. This minimizes total interest paid over time — it is mathematically optimal.',
                    instructions: [
                        'Reorder your debt list from highest APR to lowest',
                        'Credit cards are usually highest (15–29%)',
                        'Personal loans are usually next (8–20%)',
                        'Car loans next (3–10%)',
                        'Student loans last (3–8%, depending on type)'
                    ],
                    tip: 'The snowball method (lowest balance first) is the alternative. It\'s less efficient but provides faster psychological wins. Choose the one you will actually follow.',
                    verify: 'My debt list is sorted from highest to lowest APR'
                },
                {
                    title: 'Calculate your total minimum payment',
                    content: 'Add up all minimum payments across all debts. This is the floor — you must pay at least this much every month to avoid penalties and default.',
                    instructions: [
                        'Add all minimum monthly payments',
                        'This is your minimum debt payment each month',
                        'Any money above this goes to your top-priority (highest-rate) debt'
                    ],
                    verify: 'I know my total monthly minimum payment across all debts'
                },
                {
                    title: 'Calculate payoff timeline and total interest',
                    content: 'Use the Bankrate calculator to see your payoff date and total interest for the avalanche strategy.',
                    links: [{ label: 'Bankrate Debt Payoff Calculator', url: 'https://www.bankrate.com/calculators/managing-debt/debt-payoff-calculator.aspx' }],
                    instructions: [
                        'Enter your total debt balance',
                        'Enter the weighted average APR (or use your highest-rate card as target)',
                        'Enter your planned monthly payment',
                        'See: months to payoff and total interest paid'
                    ],
                    info: 'Compare the result with paying only minimums. The difference in total interest is often thousands of dollars.',
                    verify: 'I know my payoff date and total interest under the avalanche method'
                },
                {
                    title: 'Set up the debt snowball rollover',
                    content: 'When the highest-rate debt is paid off, don\'t reduce your monthly payment. Roll the full payment to the next debt.',
                    instructions: [
                        'When Debt #1 is paid: add its payment to Debt #2\'s minimum',
                        'When Debt #2 is paid: add its payment to Debt #3\'s minimum',
                        'Each payoff accelerates the next — this is the rollover effect',
                        'Your total monthly payment stays the same throughout'
                    ],
                    verify: 'I have a written avalanche plan with rollover amounts for each debt in sequence'
                }
            ],
            reflection: 'The avalanche method is mathematically optimal — it minimizes total interest paid. An imperfect plan followed is better than a perfect plan abandoned. The most important thing is to start, to have a plan, and to automate your payments so you never miss one.'
        },

        'credit-score-check': {
            id: 'credit-score-check',
            icon: '📊',
            title: 'Pull Your Free Credit Report',
            subtitle: 'Review all three bureau reports and dispute any errors',
            duration: '15 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['AnnualCreditReport.com (browser)'],
            steps: [
                {
                    title: 'Go to the official free credit report site',
                    content: 'AnnualCreditReport.com is the ONLY federally mandated free credit report source, created by law. It is operated by the three major bureaus under FTC oversight.',
                    links: [{ label: 'AnnualCreditReport.com — Official free credit reports', url: 'https://www.annualcreditreport.com' }],
                    warn: 'Do not use FreeCreditReport.com or similar sites — they often require a credit card for "free" reports and auto-enroll you in paid services. The real free site is AnnualCreditReport.com only.',
                    verify: 'I am on AnnualCreditReport.com (check the URL)'
                },
                {
                    title: 'Request reports from all three bureaus',
                    content: 'Request Equifax, Experian, and TransUnion reports. Each bureau maintains a separate file — errors may appear on one but not the others.',
                    instructions: [
                        'Click "Request your free credit reports"',
                        'Fill in your personal information (name, SSN, address)',
                        'Select all three bureaus: Equifax, Experian, TransUnion',
                        'You may need to verify identity with security questions'
                    ],
                    info: 'Weekly free reports are currently available (a post-COVID policy change from the original annual limit).',
                    verify: 'I have downloaded or viewed at least one credit bureau report'
                },
                {
                    title: 'Review each report for errors',
                    content: 'Studies estimate 20–25% of credit reports contain material errors. An error can lower your score by 50+ points, costing you thousands in higher interest rates.',
                    instructions: [
                        'Check for accounts you don\'t recognize (possible identity theft)',
                        'Look for incorrect payment history (on-time payments shown as late)',
                        'Find incorrect balances or credit limits',
                        'Look for closed accounts shown as open',
                        'Verify personal information (name, address, employer) is correct',
                        'Check for duplicate accounts'
                    ],
                    tip: 'Take notes on anything that looks wrong. You\'ll need the account name, account number (partial), and what is incorrect.',
                    verify: 'I have reviewed all accounts and noted any items to dispute'
                },
                {
                    title: 'Dispute any errors online',
                    content: 'File disputes directly with each bureau that shows the error. Each has an online dispute portal.',
                    links: [
                        { label: 'Equifax Dispute Center', url: 'https://www.equifax.com/personal/credit-report-services/credit-dispute/' },
                        { label: 'Experian Dispute Center', url: 'https://www.experian.com/disputes/main.html' },
                        { label: 'TransUnion Dispute Center', url: 'https://dispute.transunion.com' }
                    ],
                    instructions: [
                        'Select the incorrect item from your report',
                        'Choose the reason for dispute (incorrect information, account not mine, etc.)',
                        'Submit — bureaus are required to investigate within 30 days',
                        'Check back in 30 days to see the result'
                    ],
                    verify: 'Any errors found have been disputed with the relevant bureaus'
                }
            ],
            reflection: 'Your credit score affects your mortgage rate, car loan rate, insurance premiums, and even job screening. A single corrected error can raise your score by 50+ points. That can mean $30,000+ in lower interest payments over the life of a mortgage. This 15-minute exercise is worth doing annually.'
        },

        'tax-withholding-check': {
            id: 'tax-withholding-check',
            icon: '🧾',
            title: 'Check Your Tax Withholding',
            subtitle: 'Use the IRS estimator to avoid a surprise tax bill or over-paying',
            duration: '20 min',
            difficulty: 'intermediate',
            network: 'live',
            tools: ['IRS Tax Withholding Estimator (browser)', 'Your most recent pay stub'],
            steps: [
                {
                    title: 'Gather your pay stub information',
                    content: 'Before opening the IRS tool, have these numbers ready from your most recent pay stub.',
                    instructions: [
                        'Year-to-date (YTD) gross income',
                        'YTD federal income tax withheld',
                        'Your filing status (single, married filing jointly, etc.)',
                        'Number of jobs in your household',
                        'Any other income sources (side jobs, investments, rental income)'
                    ],
                    verify: 'I have my most recent pay stub and know my YTD income and withholding'
                },
                {
                    title: 'Open the IRS Tax Withholding Estimator',
                    content: 'The IRS provides a free, official tool to estimate whether your current withholding is accurate for the year.',
                    links: [{ label: 'IRS Tax Withholding Estimator — Free official tool', url: 'https://www.irs.gov/individuals/tax-withholding-estimator' }],
                    info: 'This tool is run by the IRS directly and does not store your personal information. It takes about 5 minutes to complete.',
                    verify: 'The IRS Withholding Estimator is open in my browser'
                },
                {
                    title: 'Complete the estimator',
                    content: 'Work through each section of the estimator using your pay stub data.',
                    instructions: [
                        'Enter filing status, number of dependents',
                        'Enter job income and withholding from pay stub',
                        'Add any other income sources',
                        'Enter any deductions you plan to claim (mortgage interest, etc.)',
                        'Review the results'
                    ],
                    tip: 'The estimator works best after the first paycheck of the year, or mid-year when you have real YTD numbers to work with.',
                    verify: 'I have received the estimator\'s results showing expected refund or balance due'
                },
                {
                    title: 'Interpret your results and take action',
                    content: 'The estimator will tell you whether to change your withholding.',
                    instructions: [
                        'If you expect to owe more than $1,000: submit a new W-4 to your HR department increasing withholding',
                        'If you expect a refund above $1,500: consider reducing withholding — you\'re giving the IRS an interest-free loan',
                        'If the result is within $500 of zero: your withholding is well-calibrated, no action needed'
                    ],
                    warn: 'Underpaying by $1,000+ can result in a penalty when you file, on top of the amount owed.',
                    verify: 'I know whether my withholding needs adjustment and what action to take'
                }
            ],
            reflection: 'The average US tax refund is about $3,000 — meaning most people are giving the IRS a $250/month interest-free loan. That $250/month invested at 8% compounding becomes $37,000 in 10 years. Accurate withholding is a financial optimization. Getting a large refund feels good but represents money that could have been working for you all year.'
        },

        'net-worth-snapshot': {
            id: 'net-worth-snapshot',
            icon: '🏦',
            title: 'Calculate Your Net Worth',
            subtitle: 'Assets minus liabilities — your financial score at a glance',
            duration: '15 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['Spreadsheet or pen and paper'],
            steps: [
                {
                    title: 'List all assets with current values',
                    content: 'An asset is anything you own that has monetary value. List each with its current market value — not what you paid for it.',
                    instructions: [
                        'Checking account balance (today\'s balance)',
                        'Savings account balance',
                        'Investment accounts: brokerage (current value)',
                        'Retirement accounts: 401(k), IRA (current value)',
                        'Vehicle: look up current Kelley Blue Book private party value',
                        'Home: estimated market value minus your mortgage balance = equity (list separately)',
                        'Any other property or items of value'
                    ],
                    links: [{ label: 'Kelley Blue Book — Vehicle value', url: 'https://www.kbb.com' }],
                    verify: 'I have a list of all assets with current dollar values'
                },
                {
                    title: 'List all liabilities',
                    content: 'A liability is anything you owe. Be thorough — include everything.',
                    instructions: [
                        'Credit card balances (current balances owed)',
                        'Car loan: remaining balance',
                        'Student loans: total outstanding balance',
                        'Mortgage: remaining principal balance',
                        'Personal loans, medical debt, any other amounts owed'
                    ],
                    verify: 'I have a complete list of all liabilities with current balances'
                },
                {
                    title: 'Calculate net worth',
                    content: 'Net worth = total assets minus total liabilities. This is your financial scorecard.',
                    instructions: [
                        'Add up all asset values',
                        'Add up all liability balances',
                        'Subtract total liabilities from total assets',
                        'The result is your net worth'
                    ],
                    info: 'A negative net worth is normal early in life (especially with student loans). The direction of change matters more than the number itself.',
                    verify: 'I have calculated my net worth'
                },
                {
                    title: 'Set a 12-month net worth target',
                    content: 'Now project forward. Based on your monthly savings surplus from your budget, what should your net worth be in 12 months?',
                    instructions: [
                        'Take your monthly budget surplus from the budget-tracker lab',
                        'Multiply by 12 to get annual savings contribution',
                        'Add to current net worth for a realistic 12-month target',
                        'Write this number somewhere visible — it becomes your annual financial goal'
                    ],
                    tip: 'Track net worth quarterly, not daily. Market fluctuations will make monthly tracking discouraging. Quarterly gives you a meaningful signal.',
                    verify: 'I have a written 12-month net worth target'
                }
            ],
            reflection: 'Net worth is your financial scoreboard. Income is the speed — net worth is the score. Two people earning the same income can have wildly different net worths based on savings rate and spending patterns. Tracking it quarterly keeps you honest and motivated. A rising net worth, even slowly, means you are winning.'
        },

        'compound-interest-demo': {
            id: 'compound-interest-demo',
            icon: '📐',
            title: 'See Compound Interest in Action',
            subtitle: 'Run real scenarios showing the cost of waiting to invest',
            duration: '10 min',
            difficulty: 'beginner',
            network: 'live',
            tools: ['Compound Interest Calculator (browser)'],
            steps: [
                {
                    title: 'Open the SEC compound interest calculator',
                    content: 'The SEC (Securities and Exchange Commission) provides a free, official compound interest calculator. No signup, no ads.',
                    links: [{ label: 'Investor.gov Compound Interest Calculator — SEC official tool', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' }],
                    verify: 'The SEC compound interest calculator is open'
                },
                {
                    title: 'Run Scenario A: Start at 25',
                    content: 'This is the baseline scenario — investing $200/month starting at age 25 for 40 years.',
                    instructions: [
                        'Initial investment: $0',
                        'Monthly contribution: $200',
                        'Annual interest rate: 8% (historical US stock market average)',
                        'Years to grow: 40 (from age 25 to 65)',
                        'Compound frequency: Monthly',
                        'Click Calculate and record the final value'
                    ],
                    verify: 'I have recorded the final value for Scenario A (starting at 25)'
                },
                {
                    title: 'Run Scenario B: Start at 35',
                    content: 'Same contribution, same rate — just starting 10 years later.',
                    instructions: [
                        'Initial investment: $0',
                        'Monthly contribution: $200',
                        'Annual interest rate: 8%',
                        'Years to grow: 30 (from age 35 to 65)',
                        'Compound frequency: Monthly',
                        'Click Calculate and record the final value'
                    ],
                    info: 'The difference between Scenario A and B is the 10-year delay. You contribute the same $200/month — you just start later.',
                    verify: 'I have recorded the final value for Scenario B (starting at 35)'
                },
                {
                    title: 'Run Scenario C: Start at 45',
                    content: 'Same contribution — starting 20 years later than Scenario A.',
                    instructions: [
                        'Initial investment: $0',
                        'Monthly contribution: $200',
                        'Annual interest rate: 8%',
                        'Years to grow: 20 (from age 45 to 65)',
                        'Compound frequency: Monthly',
                        'Click Calculate and record the final value'
                    ],
                    verify: 'I have all three scenario results to compare'
                },
                {
                    title: 'Compare and run your personal scenario',
                    content: 'The difference between A, B, and C is the cost of waiting. Now run your own numbers.',
                    instructions: [
                        'Compare Scenario A vs B — the 10-year delay costs hundreds of thousands of dollars on the same monthly contribution',
                        'Compare A vs C — the 20-year delay costs even more',
                        'Now run your own scenario: your current age, the amount you can invest monthly today, 8% rate, years until 65'
                    ],
                    tip: 'Even $50/month started today beats $500/month started 10 years from now. The time variable dominates in compound interest.',
                    verify: 'I have run my personal scenario and know my projected retirement balance at current savings rate'
                }
            ],
            reflection: 'Compound interest is the most powerful force in personal finance — but only if you start early. The cost of waiting is not linear; it is exponential. The best time to start was yesterday. The second best time is today. Every month you delay costs more than the previous month\'s delay.'
        }

    };

    // ── State ──────────────────────────────────────────────────

    let currentLabId = null;
    let currentStep  = 0;
    let totalSteps   = 0;

    const STORAGE_KEY = 'fsa_lab_completions';

    function getCompletions() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
        catch (e) { return {}; }
    }

    function markComplete(labId) {
        var c = getCompletions();
        c[labId] = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
        document.querySelectorAll('[data-lab="' + labId + '"]').forEach(function (el) {
            el.classList.add('completed');
        });
    }

    function isComplete(labId) {
        return !!getCompletions()[labId];
    }

    function escHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ── Overlay ────────────────────────────────────────────────

    function ensureOverlay() {
        if (document.getElementById('fsaLabOverlay')) return;
        var html = '<div class="lab-overlay" id="fsaLabOverlay" role="dialog" aria-modal="true" aria-label="Practical Lab">'
            + '<div class="lab-panel" id="fsaLabPanel">'
            + '<div class="lab-header" id="fsaLabHeader"></div>'
            + '<div class="lab-progress-row" id="fsaLabProgressRow">'
            + '<div class="lab-step-dots" id="fsaLabDots"></div>'
            + '<span class="lab-progress-label" id="fsaLabProgressLabel"></span>'
            + '</div>'
            + '<div class="lab-body" id="fsaLabBody"></div>'
            + '<div class="lab-footer">'
            + '<button class="lab-btn lab-btn-secondary" id="fsaLabPrevBtn" onclick="window.LabGuide && window.LabGuide.prevStep()">← Back</button>'
            + '<button class="lab-btn lab-btn-primary" id="fsaLabNextBtn" onclick="window.LabGuide && window.LabGuide.nextStep()">Next Step →</button>'
            + '</div>'
            + '</div>'
            + '</div>';
        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('fsaLabOverlay').addEventListener('click', function (e) {
            if (e.target === this) closeOverlay();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeOverlay();
        });
    }

    function closeOverlay() {
        var o = document.getElementById('fsaLabOverlay');
        if (o) o.classList.remove('open');
    }

    // ── Render ─────────────────────────────────────────────────

    function renderLab(lab) {
        var header = document.getElementById('fsaLabHeader');
        if (!header) return;

        var badges = '<span class="lab-badge network">' + escHtml(lab.network) + '</span>'
            + '<span class="lab-badge duration">' + escHtml(lab.duration) + '</span>'
            + '<span class="lab-badge difficulty-' + escHtml(lab.difficulty) + '">' + escHtml(lab.difficulty) + '</span>';

        header.innerHTML = '<div class="lab-header-icon">' + lab.icon + '</div>'
            + '<div class="lab-header-text">'
            + '<h2>' + escHtml(lab.title) + '</h2>'
            + '<p>' + escHtml(lab.subtitle) + '</p>'
            + '<div class="lab-meta">' + badges + '</div>'
            + '</div>'
            + '<button class="lab-close-btn" onclick="window.LabGuide && window.LabGuide.close()" aria-label="Close lab">✕</button>';

        renderStep(lab, currentStep);
    }

    function renderStep(lab, stepIndex) {
        totalSteps = lab.steps.length;
        var dots = '';
        for (var i = 0; i < totalSteps; i++) {
            var cls = i < stepIndex ? 'done' : (i === stepIndex ? 'current' : '');
            dots += '<div class="lab-step-dot ' + cls + '"></div>';
        }
        document.getElementById('fsaLabDots').innerHTML = dots;
        document.getElementById('fsaLabProgressLabel').textContent = 'Step ' + (stepIndex + 1) + ' of ' + totalSteps;

        var isLast = stepIndex === totalSteps - 1;
        var step = lab.steps[stepIndex];
        var html = '';

        html += '<h3 class="lab-step-title">' + escHtml(step.title) + '</h3>';
        html += '<p class="lab-step-content">' + step.content + '</p>';

        if (step.info)        html += '<div class="lab-info-box">ℹ ' + step.info + '</div>';
        if (step.warn)        html += '<div class="lab-warn-box">⚠ ' + step.warn + '</div>';
        if (step.alternative) html += '<div class="lab-info-box">💡 <em>Alternative:</em> ' + step.alternative + '</div>';

        if (step.instructions && step.instructions.length) {
            html += '<ul class="lab-instruction-list">';
            step.instructions.forEach(function (ins, i) {
                html += '<li><span class="step-num">' + (i + 1) + '</span><span>' + ins + '</span></li>';
            });
            html += '</ul>';
        }

        if (step.tip) html += '<div class="lab-tip-box">💡 ' + step.tip + '</div>';

        if (step.links && step.links.length) {
            html += '<div class="lab-links">';
            step.links.forEach(function (link) {
                html += '<a href="' + escHtml(link.url) + '" target="_blank" rel="noopener noreferrer" class="lab-ext-link">' + escHtml(link.label) + '</a>';
            });
            html += '</div>';
        }

        if (step.code) html += '<code class="lab-code">' + escHtml(step.code) + '</code>';

        if (step.verify) {
            html += '<div class="lab-verify"><span class="lab-verify-icon">✓</span>'
                + '<div class="lab-verify-text"><strong>Checkpoint:</strong> ' + escHtml(step.verify) + '</div></div>';
        }

        if (isLast && lab.reflection) {
            html += '<div class="lab-reflection"><h4>💭 Reflection</h4><p>' + lab.reflection + '</p></div>';
        }

        document.getElementById('fsaLabBody').innerHTML = html;
        document.getElementById('fsaLabBody').scrollTop = 0;

        var prevBtn = document.getElementById('fsaLabPrevBtn');
        var nextBtn = document.getElementById('fsaLabNextBtn');
        prevBtn.disabled = stepIndex === 0;
        if (isLast) {
            nextBtn.textContent = isComplete(currentLabId) ? '✓ Completed' : 'Mark Complete ✓';
            nextBtn.style.background = isComplete(currentLabId) ? '#4caf50' : '#10b981';
            nextBtn.disabled = isComplete(currentLabId);
        } else {
            nextBtn.textContent = 'Next Step →';
            nextBtn.style.background = '#10b981';
            nextBtn.disabled = false;
        }
    }

    // ── Navigation ─────────────────────────────────────────────

    function nextStep() {
        var lab = LABS[currentLabId];
        if (!lab) return;
        if (currentStep < totalSteps - 1) {
            currentStep++;
            renderStep(lab, currentStep);
        } else {
            markComplete(currentLabId);
            var nextBtn = document.getElementById('fsaLabNextBtn');
            nextBtn.textContent = '✓ Completed';
            nextBtn.style.background = '#4caf50';
            nextBtn.disabled = true;
            var body = document.getElementById('fsaLabBody');
            var banner = document.createElement('div');
            banner.style.cssText = 'background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:10px;padding:1rem;margin-top:1rem;text-align:center;color:#34d399;font-weight:600;';
            banner.textContent = '🎉 Lab complete! Your progress is saved.';
            body.prepend(banner);
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            renderStep(LABS[currentLabId], currentStep);
        }
    }

    // ── Init Cards ─────────────────────────────────────────────

    function initLabCards() {
        var completions = getCompletions();
        document.querySelectorAll('[data-lab]').forEach(function (el) {
            var labId = el.getAttribute('data-lab');
            if (completions[labId]) el.classList.add('completed');
        });
    }

    // ── Open ────────────────────────────────────────────────────

    function openLab(labId) {
        var lab = LABS[labId];
        if (!lab) { console.warn('FSA Lab not found:', labId); return; }
        ensureOverlay();
        currentLabId = labId;
        currentStep  = 0;
        totalSteps   = lab.steps.length;
        document.getElementById('fsaLabOverlay').classList.add('open');
        renderLab(lab);
    }

    // ── Expose ──────────────────────────────────────────────────

    global.LabGuide = { nextStep: nextStep, prevStep: prevStep, close: closeOverlay };
    global.openLab  = openLab;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLabCards);
    } else {
        initLabCards();
    }

}(window));
