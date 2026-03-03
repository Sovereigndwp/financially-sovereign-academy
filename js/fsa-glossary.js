/**
 * FSA Glossary — Educational Tooltip System
 *
 * Usage (HTML):
 *   <span class="fsa-term" data-term="compound-interest">compound interest</span>
 *
 * Usage (JS-rendered content):
 *   FSAGlossary.wrapTerm('compound-interest', 'compound interest')
 *   // returns: '<span class="fsa-term" data-term="compound-interest">compound interest</span>'
 *
 * After dynamically inserting HTML with terms, call:
 *   FSAGlossary.rescan()
 */
(function (global) {
    'use strict';

    /* ==============================================================
       TERM DICTIONARY — plain-English definitions + simple examples
       ============================================================== */

    var TERMS = {

        // ---- Compound Growth / General Investing ----
        'compound-interest': {
            name: 'Compound Interest',
            def: 'Your money earns returns. Then those returns earn their own returns. Then THOSE returns earn returns. It\'s a snowball rolling downhill — the longer it rolls, the bigger it gets.',
            example: 'You invest $1,000 at 10%. Year 1: you earn $100 (now $1,100). Year 2: you earn $110 (10% of $1,100, not the original $1,000). By year 30, that one $1,000 becomes $17,449 — without adding another penny.'
        },
        'annual-return': {
            name: 'Annual Return Rate',
            def: 'The percentage your investment grows (or shrinks) in one year, on average. "7% annual return" means $100 becomes about $107 after a year.',
            example: 'The US stock market (S&P 500) has averaged about 10% per year before inflation over the last 100 years. Some years it\'s up 30%, some years down 20% — but the long-term average is roughly 10%.'
        },
        'inflation': {
            name: 'Inflation',
            def: 'Prices go up over time. The same dollar buys less stuff next year than it does today. Inflation is like a slow leak in your wallet — you don\'t notice it day to day, but over 20 years it adds up.',
            example: 'A gallon of milk cost about $2.78 in 2000 and costs roughly $4.20 today. Your money didn\'t change, but what it can buy shrank. At 3% inflation, $100 today has the buying power of only $55 in 20 years.'
        },
        'monthly-contribution': {
            name: 'Monthly Contribution',
            def: 'A fixed dollar amount you add to your investment every month — like a subscription, but to your future self.',
            example: 'Investing $200/month for 30 years at 8% return grows to about $300,000. The total you actually put in is only $72,000 — the rest is compound growth doing the work.'
        },
        'growth-multiple': {
            name: 'Growth Multiple',
            def: 'How many times your money multiplied. If your $10,000 grew to $30,000, that\'s a 3x growth multiple.',
            example: '2x = your money doubled. 5x = it grew fivefold. A 10x over 25 years sounds amazing, but it\'s roughly what 10% annual returns produce — nothing exotic, just patience.'
        },
        'sp500': {
            name: 'S&P 500',
            def: 'An index that tracks the 500 largest publicly traded US companies (Apple, Amazon, Google, etc.). When people say "the stock market," they usually mean this.',
            example: 'Instead of picking individual stocks, you can buy one fund that holds all 500 companies. If the economy grows, you grow with it. Most financial advisors recommend this as a starting point for new investors.'
        },
        'dca': {
            name: 'Dollar-Cost Averaging (DCA)',
            def: 'Investing the same dollar amount at regular intervals — like $500 every month — regardless of whether prices are up or down. You automatically buy more shares when prices are low and fewer when prices are high.',
            example: 'Month 1: share costs $50, you buy 10 shares. Month 2: price drops to $25, you buy 20 shares. Your average cost is $33.33 per share, not $50. DCA smooths out the risk of bad timing.'
        },
        'todays-dollars': {
            name: 'Today\'s Dollars (Real Value)',
            def: 'An inflation-adjusted number that shows what future money would actually buy in today\'s world. $1,000,000 in 30 years might only buy what $412,000 buys today.',
            example: 'If a calculator says you\'ll have $500,000 in 25 years, that sounds great. But after adjusting for 3% inflation, it\'s really worth about $240,000 in today\'s purchasing power. Still good — but different.'
        },
        'real-return': {
            name: 'Real Return',
            def: 'Your investment return minus inflation. This is the actual growth in what your money can buy — the number that really matters.',
            example: 'If your investments earn 8% and inflation is 3%, your real return is about 5%. You\'re 5% richer in what you can actually purchase — not 8%.'
        },
        'index-fund': {
            name: 'Index Fund',
            def: 'A fund that automatically buys all the stocks in an index (like the S&P 500) instead of trying to pick winners. Very low cost because there\'s no expensive fund manager making decisions.',
            example: 'Vanguard\'s VTI costs 0.03% per year ($3 per $10,000 invested). A typical actively managed fund charges 1% ($100 per $10,000). Over 30 years, that difference can cost you hundreds of thousands of dollars.'
        },
        'portfolio': {
            name: 'Portfolio',
            def: 'Your total collection of investments — stocks, bonds, savings, retirement accounts, everything. Think of it as your financial garden.',
            example: 'A simple portfolio might be: 80% in a stock index fund (growth), 15% in bonds (stability), 5% in cash (emergencies). This is called your asset allocation.'
        },
        'diversification': {
            name: 'Diversification',
            def: 'Spreading your money across different types of investments so that one bad pick doesn\'t sink everything. Don\'t put all your eggs in one basket.',
            example: 'If you put 100% of your savings into one company\'s stock and it goes bankrupt, you lose everything. If you own 500 companies through an index fund, one bankruptcy barely affects you.'
        },

        // ---- Budget Methods ----
        '50-30-20': {
            name: '50/30/20 Rule',
            def: 'A simple budget framework: spend 50% of take-home pay on needs (rent, food, insurance), 30% on wants (dining out, entertainment), and 20% on savings and debt payoff.',
            example: 'Take-home pay: $4,000/month. Needs ceiling: $2,000. Wants ceiling: $1,200. Savings minimum: $800. If your rent alone is $1,800, you\'re "housing-burdened" and may need a 60/20/20 split while working to increase income.'
        },
        'pay-yourself-first': {
            name: 'Pay Yourself First',
            def: 'Before paying any bills or spending on anything, automatically transfer a set percentage (10-20%) of your paycheck into savings or investments. You budget with what\'s left.',
            example: 'Paycheck: $3,500. You auto-transfer $350 (10%) to savings the same day. You now budget your life around $3,150. You never see the $350, so you don\'t miss it.'
        },
        'zero-based-budget': {
            name: 'Zero-Based Budget',
            def: 'Every dollar of your income gets assigned a specific job — bills, food, savings, fun — until your income minus your planned spending equals exactly zero. No unassigned money floating around.',
            example: 'Income: $4,000. Rent: $1,200. Food: $500. Car: $350. Savings: $400. Fun: $300. Utilities: $200. Everything else: $1,050 assigned to specific categories. $4,000 - $4,000 = $0 unassigned.'
        },
        'envelope-method': {
            name: 'Envelope Method',
            def: 'Put cash into labeled envelopes for each spending category (groceries, gas, dining out). When an envelope is empty, you\'re done spending in that category for the month. Forces physical awareness of spending.',
            example: 'Groceries envelope: $400 cash. Dining out envelope: $150 cash. When the dining out envelope is empty on the 20th, you cook at home for the rest of the month. No cheating with a card.'
        },

        // ---- Debt & Credit ----
        'apr': {
            name: 'APR (Annual Percentage Rate)',
            def: 'The yearly cost of borrowing money, expressed as a percentage. If you owe $1,000 at 20% APR, you\'d owe roughly $200 in interest over a year if you don\'t pay it down.',
            example: 'Credit cards typically charge 18-29% APR. A car loan might be 5-8%. A mortgage might be 6-7%. The higher the APR, the more expensive the debt — and the more urgently you should pay it off.'
        },
        'avalanche-method': {
            name: 'Debt Avalanche Method',
            def: 'Pay minimum on all debts, then throw every extra dollar at the debt with the highest interest rate. Once that\'s paid off, move to the next highest. Saves the most money mathematically.',
            example: 'You have a credit card at 22% and a car loan at 5%. Pay minimums on both, but put all extra money toward the credit card first. You\'ll pay less total interest this way.'
        },
        'snowball-method': {
            name: 'Debt Snowball Method',
            def: 'Pay minimum on all debts, then throw extra money at the smallest balance first — regardless of interest rate. You get quick wins that keep you motivated.',
            example: 'You owe $500 on one card and $8,000 on another. Pay off the $500 first for a psychological win, then attack the bigger one. Costs slightly more in interest, but people stick with it more often.'
        },
        'minimum-payment': {
            name: 'Minimum Payment',
            def: 'The smallest amount your lender will accept each month without penalizing you. Paying only minimums is expensive — most of your payment goes to interest, barely touching the actual balance.',
            example: 'On a $5,000 credit card at 20% APR, the minimum payment might be $100/month. At that rate, it takes 9+ years to pay off, and you\'ll pay over $4,300 in interest — nearly doubling the original debt.'
        },

        // ---- Budget & Cash Flow ----
        'net-cash-flow': {
            name: 'Net Cash Flow',
            def: 'Money in minus money out. Positive means you\'re building wealth. Negative means you\'re going into debt. Zero means you\'re treading water.',
            example: 'Income: $4,000/month. Expenses: $3,500/month. Net cash flow: +$500. That $500 is the seed money for everything — emergency fund, investing, debt payoff.'
        },
        'fixed-expenses': {
            name: 'Fixed Expenses',
            def: 'Bills that cost the same every month: rent, car payment, insurance, subscriptions. You can predict these exactly.',
            example: 'Rent: $1,200. Car payment: $350. Netflix: $15. Phone: $80. These don\'t change month to month, so they\'re easy to plan around.'
        },
        'variable-expenses': {
            name: 'Variable Expenses',
            def: 'Spending that changes from month to month: groceries, gas, dining out, entertainment. These are where budget "leaks" usually happen.',
            example: 'Groceries might be $400 one month and $550 the next. Dining out could be $50 or $200. Most people underestimate variable expenses by 20-30%.'
        },

        // ---- Financial Freedom ----
        'financial-freedom-number': {
            name: 'Financial Freedom Number',
            def: 'The total amount of invested money that generates enough passive income to cover your living expenses — forever. Once you hit this number, work becomes optional.',
            example: 'If you spend $40,000/year, your freedom number is $40,000 ÷ 0.04 = $1,000,000. A million dollars invested can safely generate ~$40K/year indefinitely (the 4% rule).'
        },
        'safe-withdrawal-rate': {
            name: 'Safe Withdrawal Rate (SWR)',
            def: 'The percentage of your investment portfolio you can spend each year without running out of money over a 30+ year retirement. The most common figure is 4%.',
            example: 'If you have $800,000 invested, a 4% SWR means you can withdraw $32,000/year. Historically, this has survived even the worst market crashes over 30-year periods.'
        },
        'savings-rate': {
            name: 'Savings Rate',
            def: 'The percentage of your income that you save or invest (not spend). This single number is the strongest predictor of when you\'ll achieve financial freedom.',
            example: 'At a 10% savings rate, financial freedom takes ~40 years. At 25%, it takes ~25 years. At 50%, about 15 years. The savings rate matters more than your salary.'
        },

        // ---- Net Worth ----
        'net-worth': {
            name: 'Net Worth',
            def: 'Everything you own (assets) minus everything you owe (liabilities). It\'s your financial score — the single number that captures your overall financial health.',
            example: 'Own: $15,000 in savings, $5,000 car, $3,000 investments = $23,000 in assets. Owe: $12,000 student loans, $2,000 credit card = $14,000 in liabilities. Net worth: $9,000.'
        },
        'assets': {
            name: 'Assets',
            def: 'Things you own that have value: cash, savings accounts, investments, retirement accounts, property, vehicles.',
            example: 'Checking account ($2,000) + 401k ($25,000) + car worth ($8,000) = $35,000 in assets.'
        },
        'liabilities': {
            name: 'Liabilities',
            def: 'Money you owe to someone else: mortgages, student loans, credit card balances, car loans, medical debt.',
            example: 'Mortgage ($180,000) + student loans ($35,000) + credit card ($3,000) = $218,000 in liabilities.'
        },

        // ---- Investing Ratios & Concepts ----
        'current-ratio': {
            name: 'Current Ratio',
            def: 'Can a company pay its short-term bills? Divide what it owns short-term (cash, receivables) by what it owes short-term. Above 1.0 means it can cover its bills.',
            example: 'Company has $500K in current assets and $300K in current bills. Current ratio = 1.67. It has $1.67 for every $1 it owes short-term — healthy.'
        },
        'debt-to-equity': {
            name: 'Debt-to-Equity Ratio',
            def: 'How much borrowed money (debt) vs. owner money (equity) funds the company. Higher means more borrowed — riskier if things go wrong.',
            example: 'A D/E of 0.5 means the company has $0.50 of debt for every $1 of equity. A D/E of 2.0 means twice as much debt as equity — that\'s heavily leveraged.'
        },
        'roe': {
            name: 'ROE (Return on Equity)',
            def: 'How efficiently a company turns investor money into profit. Higher ROE means the company is better at generating returns from the capital invested in it.',
            example: 'ROE of 20% means for every $100 of shareholder equity, the company generates $20 in profit. Above 15% is generally considered strong.'
        },
        'pe-ratio': {
            name: 'P/E Ratio (Price-to-Earnings)',
            def: 'How much investors pay for each $1 of a company\'s annual profit. A P/E of 20 means the stock price is 20 times the company\'s earnings per share.',
            example: 'Stock price: $100. Earnings per share: $5. P/E = 20. Is that expensive? Depends on growth. A fast-growing company at P/E 30 might be cheaper than a declining one at P/E 10.'
        },
        'pb-ratio': {
            name: 'P/B Ratio (Price-to-Book)',
            def: 'Stock price compared to the company\'s actual asset value per share. A P/B below 1.0 means the stock costs less than the company\'s accounting value — potentially undervalued.',
            example: 'Stock price: $50. Book value per share: $40. P/B = 1.25. You\'re paying a 25% premium over the company\'s stated assets.'
        },
        'free-cash-flow': {
            name: 'Free Cash Flow (FCF)',
            def: 'Cash left after the business pays all its bills and invests in itself. This is the real money available to return to investors or grow the business. It\'s harder to fake than accounting profit.',
            example: 'Company reports $100M in profit but only $20M in free cash flow. Where\'d the other $80M go? Maybe they\'re spending heavily on equipment — or maybe the profit is just on paper.'
        },
        'expense-ratio': {
            name: 'Expense Ratio',
            def: 'The annual fee a fund charges you, expressed as a percentage. It\'s automatically deducted — you never see a bill, but it silently reduces your returns every year.',
            example: '0.05% expense ratio = $5/year per $10,000 invested. 1.0% = $100/year. Doesn\'t sound like much, but over 30 years on a growing portfolio, that 0.95% difference can cost $200,000+.'
        },
        'lump-sum': {
            name: 'Lump Sum Investing',
            def: 'Investing all your available money at once, rather than spreading purchases over time. Historically wins about ⅔ of the time because your money is in the market longer.',
            example: 'You inherit $50,000. Lump sum = invest all $50K today. DCA = invest $5K/month over 10 months. Lump sum usually outperforms, but DCA feels safer psychologically.'
        },
        'market-timing': {
            name: 'Market Timing',
            def: 'Trying to predict the best time to buy or sell investments. Sounds smart, rarely works in practice — even professional fund managers can\'t do it consistently.',
            example: 'Missing just the 10 best trading days over 20 years can cut your returns in half. The problem: those best days often come right after the worst days, when most people have already sold.'
        },
        'risk-tolerance': {
            name: 'Risk Tolerance',
            def: 'How much volatility (ups and downs) in your investments you can handle without panicking and selling. It\'s about your emotional response, not just math.',
            example: 'Can you watch your $50,000 portfolio drop to $35,000 and NOT sell? If yes, you have higher risk tolerance. If that scenario makes you feel sick, you need a more conservative mix.'
        },
        'asset-allocation': {
            name: 'Asset Allocation',
            def: 'How you split your money between stocks (growth), bonds (stability), and cash (safety). This single decision explains about 90% of your portfolio\'s behavior.',
            example: '80/20 = 80% stocks, 20% bonds. Aggressive but standard for young investors with decades ahead. 60/40 = more conservative, often recommended closer to retirement.'
        },
        'bonds': {
            name: 'Bonds',
            def: 'Loans you make to a company or government. They pay you interest at a fixed rate and return your money at the end. Lower risk and lower return than stocks.',
            example: 'You buy a $1,000 US Treasury bond paying 4%. You receive $40/year in interest, and get your $1,000 back when the bond matures. Safe, predictable, boring — and that\'s the point.'
        },
        'stocks': {
            name: 'Stocks',
            def: 'Ownership shares in a company. When the company grows, your shares become more valuable. When it struggles, they lose value. Higher potential return than bonds, but more volatile.',
            example: 'Buy 10 shares of a company at $50 each ($500 total). If the company does well and the share price rises to $80, your investment is now worth $800 — a 60% gain.'
        },
        'eps': {
            name: 'EPS (Earnings Per Share)',
            def: 'A company\'s total profit divided by the number of shares. It tells you how much profit each share of stock "earned."',
            example: 'Company earns $10 million in profit and has 2 million shares. EPS = $5. If the stock costs $100, the P/E ratio is 100 ÷ 5 = 20x.'
        },
        'book-value': {
            name: 'Book Value',
            def: 'A company\'s total assets minus total liabilities, divided by the number of shares. It\'s the accounting value of what each share of ownership represents.',
            example: 'Company owns $500M in assets, owes $300M. Book value = $200M. If there are 10M shares, book value per share = $20.'
        },
        'shareholder-equity': {
            name: 'Shareholder Equity',
            def: 'What\'s left if a company sold everything it owns and paid off all its debts. It\'s the owners\' share — the net worth of the company.',
            example: 'Assets: $1 billion. Liabilities: $600 million. Shareholder equity: $400 million. This is what belongs to the shareholders on paper.'
        },
        'capex': {
            name: 'CapEx (Capital Expenditures)',
            def: 'Money a company spends on big, long-lasting items: factories, equipment, technology infrastructure. It\'s investing in the business\'s future capacity.',
            example: 'A trucking company buys 50 new trucks for $5M. That\'s CapEx — it reduces free cash flow this year, but the trucks generate revenue for the next 10 years.'
        },
        'peg-ratio': {
            name: 'PEG Ratio',
            def: 'P/E ratio divided by the earnings growth rate. Helps answer: "Is this stock expensive relative to how fast it\'s growing?" A PEG near 1.0 suggests fair pricing.',
            example: 'Stock A: P/E 30, growing at 30%/year. PEG = 1.0 (fairly priced). Stock B: P/E 30, growing at 10%/year. PEG = 3.0 (probably overpriced for its growth).'
        }
    };

    /* ==============================================================
       POPUP BEHAVIOR
       ============================================================== */

    var activeOverlay = null;

    function showPopup(key) {
        var term = TERMS[key];
        if (!term) return;

        closePopup();

        var overlay = document.createElement('div');
        overlay.className = 'fsa-glossary-overlay';
        overlay.innerHTML =
            '<div class="fsa-glossary-popup">'
            + '<button class="fsa-glossary-popup-close" aria-label="Close">&times;</button>'
            + '<h4>' + term.name + '</h4>'
            + '<div class="fsa-g-def">' + term.def + '</div>'
            + '<div class="fsa-g-example">'
            + '<div class="fsa-g-example-label">Simple Example</div>'
            + '<p>' + term.example + '</p>'
            + '</div>'
            + '</div>';

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        activeOverlay = overlay;

        // Close on overlay click
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closePopup();
        });

        // Close button
        overlay.querySelector('.fsa-glossary-popup-close').addEventListener('click', closePopup);
    }

    function closePopup() {
        if (activeOverlay) {
            activeOverlay.remove();
            activeOverlay = null;
            document.body.style.overflow = '';
        }
    }

    // Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePopup();
    });

    /* ==============================================================
       DOM SCANNING — wire up .fsa-term elements
       ============================================================== */

    function scan() {
        document.querySelectorAll('.fsa-term[data-term]').forEach(function (el) {
            if (el._fsaGlossaryBound) return;
            el._fsaGlossaryBound = true;
            el.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                showPopup(el.getAttribute('data-term'));
            });
        });
    }

    /* ==============================================================
       PUBLIC API
       ============================================================== */

    global.FSAGlossary = {
        /** Re-scan the DOM for new .fsa-term elements (call after dynamic render) */
        rescan: scan,

        /** Returns an HTML string for use in JS-rendered content */
        wrapTerm: function (key, displayText) {
            if (!TERMS[key]) return displayText || key;
            return '<span class="fsa-term" data-term="' + key + '">' + (displayText || TERMS[key].name) + '</span>';
        },

        /** Show popup programmatically */
        show: showPopup,

        /** Close popup programmatically */
        close: closePopup,

        /** Check if a term exists */
        has: function (key) { return !!TERMS[key]; }
    };

    /* Auto-scan on load */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scan);
    } else {
        scan();
    }

}(window));
