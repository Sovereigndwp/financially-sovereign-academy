/**
 * FSA Investing Labs — Interactive Engine
 * Scorecard Lab, Fee Simulator, DCA Simulator, Risk Tolerance
 *
 * No external dependencies. Uses FSA theme CSS variables.
 */

(function (global) {
    'use strict';

    // Glossary helper — safe wrapper for FSAGlossary
    var _g = function (key, text) {
        return (typeof FSAGlossary !== 'undefined' && FSAGlossary.wrapTerm) ? FSAGlossary.wrapTerm(key, text) : (text || key);
    };
    var _rescan = function () {
        if (typeof FSAGlossary !== 'undefined' && FSAGlossary.rescan) FSAGlossary.rescan();
    };

    /* ================================================================
       RATIO SANDBOX
       ================================================================ */

    const RatioSandbox = {
        calculate: function (containerId) {
            const c = document.getElementById(containerId);
            if (!c) return;

            const val = function (id) {
                return parseFloat(c.querySelector('#' + id).value) || 0;
            };

            const currentAssets = val('sb-current-assets');
            const currentLiabilities = val('sb-current-liabilities');
            const totalLiabilities = val('sb-total-liabilities');
            const shareholderEquity = val('sb-shareholder-equity');
            const netIncome = val('sb-net-income');
            const pricePerShare = val('sb-price-per-share');
            const eps = val('sb-eps');
            const bookValuePerShare = val('sb-book-value');

            const results = [];
            let metricsUsed = 0;

            // Current Ratio
            if (currentAssets > 0 && currentLiabilities > 0) {
                const cr = currentAssets / currentLiabilities;
                results.push({
                    name: 'Current Ratio',
                    value: cr.toFixed(2),
                    signal: cr >= 1.5 ? 'good' : cr >= 1.0 ? 'caution' : 'danger',
                    context: cr >= 1.5 ? 'Healthy short-term coverage' : cr >= 1.0 ? 'Barely covering bills' : 'May struggle to pay short-term obligations'
                });
                metricsUsed++;
            }

            // Debt to Equity
            if (totalLiabilities > 0 && shareholderEquity > 0) {
                const de = totalLiabilities / shareholderEquity;
                results.push({
                    name: 'Debt / Equity',
                    value: de.toFixed(2),
                    signal: de <= 0.5 ? 'good' : de <= 1.0 ? 'caution' : 'danger',
                    context: de <= 0.5 ? 'Conservative debt use' : de <= 1.0 ? 'Moderate — check sector norms' : 'Heavy debt reliance'
                });
                metricsUsed++;
            }

            // ROE
            if (netIncome !== 0 && shareholderEquity > 0) {
                const roe = (netIncome / shareholderEquity) * 100;
                results.push({
                    name: 'ROE',
                    value: roe.toFixed(1) + '%',
                    signal: roe >= 15 ? 'good' : roe >= 8 ? 'caution' : 'danger',
                    context: roe >= 15 ? 'Strong capital efficiency' : roe >= 8 ? 'Decent — verify consistency' : 'Weak returns on equity'
                });
                metricsUsed++;
            }

            // P/E
            if (pricePerShare > 0 && eps > 0) {
                const pe = pricePerShare / eps;
                results.push({
                    name: 'P/E Ratio',
                    value: pe.toFixed(1) + 'x',
                    signal: pe <= 15 ? 'good' : pe <= 25 ? 'caution' : 'danger',
                    context: pe <= 15 ? 'Historically reasonable' : pe <= 25 ? 'Moderate — compare to growth' : 'Expensive relative to earnings'
                });
                metricsUsed++;
            }

            // P/B
            if (pricePerShare > 0 && bookValuePerShare > 0) {
                const pb = pricePerShare / bookValuePerShare;
                results.push({
                    name: 'P/B Ratio',
                    value: pb.toFixed(2) + 'x',
                    signal: pb <= 1.5 ? 'good' : pb <= 3.0 ? 'caution' : 'danger',
                    context: pb <= 1.5 ? 'Near book value' : pb <= 3.0 ? 'Some premium — normal for quality' : 'High premium over assets'
                });
                metricsUsed++;
            }

            // Render results
            const resultsDiv = c.querySelector('.ratio-results-grid');
            if (!resultsDiv) return;

            if (results.length === 0) {
                resultsDiv.innerHTML = '<p style="color: var(--fsa-text-dim); text-align: center; grid-column: 1/-1;">Enter numbers above to see ratios</p>';
                return;
            }

            resultsDiv.innerHTML = results.map(function (r) {
                return '<div class="ratio-result-card">'
                    + '<div class="ratio-name">' + r.name + '</div>'
                    + '<div class="ratio-value ' + r.signal + '">' + r.value + '</div>'
                    + '<span class="traffic-light ' + r.signal + '">'
                    + '<span class="traffic-dot"></span>'
                    + (r.signal === 'good' ? 'OK' : r.signal === 'caution' ? 'Check' : 'Warning')
                    + '</span>'
                    + '<div class="ratio-context">' + r.context + '</div>'
                    + '</div>';
            }).join('');

            // One-number trap nudge
            var nudge = c.querySelector('.one-number-nudge');
            if (nudge) {
                if (metricsUsed === 1) {
                    nudge.classList.add('visible');
                } else {
                    nudge.classList.remove('visible');
                }
            }
        }
    };

    /* ================================================================
       LIQUIDITY STRESS TEST — 3 fake companies, current ratio slider
       ================================================================ */

    const LiquidityStressTest = {
        companies: [
            { name: 'SteadyCo', icon: '🏢', cash: 50000, receivables: 30000, inventory: 20000, liabilities: 60000 },
            { name: 'LeanStartup', icon: '🚀', cash: 8000, receivables: 45000, inventory: 5000, liabilities: 55000 },
            { name: 'HeavyMfg', icon: '🏭', cash: 15000, receivables: 10000, inventory: 80000, liabilities: 95000 }
        ],

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;

            var html = '<h4>Liquidity Stress Test</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1.5rem;">Three companies. Same question: who survives a bad quarter?</p>';

            this.companies.forEach(function (co, i) {
                var ca = co.cash + co.receivables + co.inventory;
                var cr = ca / co.liabilities;

                html += '<div class="case-study-card" style="margin-bottom:1rem;">'
                    + '<div class="company-header">'
                    + '<div class="company-icon">' + co.icon + '</div>'
                    + '<div><div class="company-name">' + co.name + '</div>'
                + '<div class="company-sector">' + _g('current-ratio', 'Current Ratio') + ': <strong style="color:' + (cr >= 1.5 ? '#34d399' : cr >= 1.0 ? '#fbbf24' : '#f87171') + '">' + cr.toFixed(2) + '</strong></div></div></div>'
                    + '<div class="case-data-grid">'
                    + '<div class="case-data-item"><div class="data-label">Cash</div><div class="data-value">$' + co.cash.toLocaleString() + '</div></div>'
                    + '<div class="case-data-item"><div class="data-label">Receivables</div><div class="data-value">$' + co.receivables.toLocaleString() + '</div></div>'
                    + '<div class="case-data-item"><div class="data-label">Inventory</div><div class="data-value">$' + co.inventory.toLocaleString() + '</div></div>'
                    + '<div class="case-data-item"><div class="data-label">Current Liabilities</div><div class="data-value">$' + co.liabilities.toLocaleString() + '</div></div>'
                    + '</div></div>';
            });

            html += '<div class="slider-challenge">'
                + '<h4>Inventory Slider Challenge</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1rem;">What happens to HeavyMfg\'s current ratio if inventory changes?</p>'
                + '<div class="slider-row">'
                + '<label>Inventory ($)</label>'
                + '<input type="range" id="inv-slider" min="0" max="150000" value="80000" step="5000">'
                + '<span class="slider-value-badge" id="inv-slider-val">$80,000</span>'
                + '</div>'
                + '<div style="text-align:center;margin-top:1rem;">'
                + '<span style="color:var(--fsa-text-dim);font-size:0.85rem;">Current Ratio: </span>'
                + '<span id="inv-cr-display" style="font-family:var(--font-family-mono);font-weight:700;font-size:1.3rem;color:#fbbf24;">1.11</span>'
                + '</div>'
                + '<div class="one-number-nudge visible" style="margin-top:1rem;">'
                + '<span class="nudge-icon">🤔</span>'
                + '<span class="nudge-text">Does more inventory always mean safer? What if that inventory can\'t be sold? A warehouse full of unsellable product inflates the ratio but doesn\'t help pay bills.</span>'
                + '</div>'
                + '</div>';

            c.innerHTML = html;
            _rescan();

            // Wire slider
            var slider = document.getElementById('inv-slider');
            if (slider) {
                slider.addEventListener('input', function () {
                    var inv = parseInt(this.value);
                    document.getElementById('inv-slider-val').textContent = '$' + inv.toLocaleString();
                    var ca = 15000 + 10000 + inv;
                    var cr = ca / 95000;
                    var display = document.getElementById('inv-cr-display');
                    display.textContent = cr.toFixed(2);
                    display.style.color = cr >= 1.5 ? '#34d399' : cr >= 1.0 ? '#fbbf24' : '#f87171';
                });
            }
        }
    };

    /* ================================================================
       DEBT DANGER MAP — Sort companies by D/E risk
       ================================================================ */

    const DebtDangerMap = {
        companies: [
            { name: 'CloudSoft', sector: 'Software', de: 0.3, answer: 'fine' },
            { name: 'NationalPower', sector: 'Utility', de: 1.8, answer: 'context' },
            { name: 'QuickLoans', sector: 'Finance', de: 2.5, answer: 'context' },
            { name: 'RetailChain', sector: 'Retail', de: 1.1, answer: 'context' },
            { name: 'BioDiscover', sector: 'Biotech', de: 0.1, answer: 'fine' },
            { name: 'OverLeverage', sector: 'Real Estate', de: 4.2, answer: 'danger' }
        ],
        answers: {},

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;
            var self = this;

            var html = '<h4>Debt Danger Map</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1rem;">Sort each company: <strong>Usually Fine</strong>, <strong>Needs Context</strong>, or <strong>Danger</strong></p>';

            html += '<div class="match-game-grid">';
            this.companies.forEach(function (co, i) {
                html += '<div class="match-item" id="ddm-' + i + '">'
                    + '<div class="match-company">' + co.name + '</div>'
                    + '<div style="font-size:0.8rem;color:var(--fsa-text-dim);">' + co.sector + '</div>'
                    + '<div class="match-data">' + _g('debt-to-equity', 'D/E') + ': ' + co.de.toFixed(1) + '</div>'
                    + '<div class="label-buttons" style="margin-top:0.75rem;">'
                    + '<button class="label-btn" onclick="InvestingLabs.DebtDangerMap.classify(' + i + ',\'fine\')">Usually Fine</button>'
                    + '<button class="label-btn" onclick="InvestingLabs.DebtDangerMap.classify(' + i + ',\'context\')">Needs Context</button>'
                    + '<button class="label-btn" onclick="InvestingLabs.DebtDangerMap.classify(' + i + ',\'danger\')">Danger</button>'
                    + '</div></div>';
            });
            html += '</div>';
            html += '<div id="ddm-feedback" style="margin-top:1.5rem;"></div>';
            html += '<button class="btn btn-primary" style="margin-top:1rem;width:100%;" onclick="InvestingLabs.DebtDangerMap.check()">Check Answers</button>';

            c.innerHTML = html;
            _rescan();
        },

        classify: function (index, label) {
            this.answers[index] = label;
            var card = document.getElementById('ddm-' + index);
            if (!card) return;
            card.querySelectorAll('.label-btn').forEach(function (btn) {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase().includes(label === 'fine' ? 'fine' : label === 'context' ? 'context' : 'danger')) {
                    btn.classList.add('active');
                }
            });
        },

        check: function () {
            var fb = document.getElementById('ddm-feedback');
            var correct = 0;
            var self = this;

            this.companies.forEach(function (co, i) {
                var card = document.getElementById('ddm-' + i);
                if (self.answers[i] === co.answer) {
                    card.classList.add('correct');
                    card.classList.remove('incorrect');
                    correct++;
                } else {
                    card.classList.add('incorrect');
                    card.classList.remove('correct');
                }
            });

            fb.innerHTML = '<div style="padding:1.25rem;background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3);border-radius:0.75rem;">'
                + '<p style="color:#34d399;font-weight:700;margin-bottom:0.75rem;">' + correct + ' of ' + this.companies.length + ' correct</p>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.7;">'
                + '<strong>Key insight:</strong> Utilities and banks naturally carry more debt — their business models depend on it. '
                + 'A utility at D/E 1.8 may be stable because they have regulated, predictable revenue. '
                + 'A tech company at D/E 1.8 would be a red flag. <strong>Sector context changes everything.</strong></p>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;margin-top:0.75rem;line-height:1.7;">'
                + '<strong>Rate shock question:</strong> If interest rates rise 2%, companies with high D/E and variable-rate debt get hit hardest. '
                + 'OverLeverage (D/E 4.2) would see the biggest increase in interest expense.</p></div>';
        }
    };

    /* ================================================================
       ROE LIE DETECTOR — 3 cases, pick the reason ROE is high
       ================================================================ */

    const ROELieDetector = {
        cases: [
            {
                name: 'AlphaCorp',
                roe: '28%',
                netIncome: '$140M',
                equity: '$500M',
                debt: '$200M',
                hint: 'Consistent margins for 5+ years. Low debt.',
                answer: 'strong',
                explanation: 'AlphaCorp has genuine operating strength. Low debt means equity isn\'t artificially reduced, and consistent margins confirm real profitability — not a one-time event.'
            },
            {
                name: 'BetaIndustries',
                roe: '32%',
                netIncome: '$80M',
                equity: '$250M',
                debt: '$1.8B',
                hint: 'Equity has been shrinking due to aggressive buybacks and heavy borrowing.',
                answer: 'debt',
                explanation: 'BetaIndustries has high ROE because the denominator (equity) is artificially small. $1.8B in debt means this company is heavily leveraged. The ROE looks great on paper but is inflated by financial engineering, not operational excellence.'
            },
            {
                name: 'GammaTech',
                roe: '45%',
                netIncome: '$90M',
                equity: '$200M',
                debt: '$100M',
                hint: 'Last year net income was $20M. This year includes a $70M asset sale.',
                answer: 'onetime',
                explanation: 'GammaTech\'s ROE is fake. Strip out the $70M one-time asset sale and net income is only $20M — giving a real ROE of 10%. One-time gains inflate ROE temporarily. Always check if earnings are recurring.'
            }
        ],
        answers: {},

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;

            var html = '<h4>ROE Lie Detector</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1.5rem;">Each company has a high ROE. Your job: figure out <strong>why</strong>.</p>';

            this.cases.forEach(function (cs, i) {
                html += '<div class="case-study-card">'
                    + '<div class="company-header">'
                    + '<div class="company-icon">🔍</div>'
                    + '<div><div class="company-name">' + cs.name + '</div>'
                + '<div class="company-sector">' + _g('roe', 'ROE') + ': <strong style="color:#34d399;">' + cs.roe + '</strong></div></div></div>'
                    + '<div class="case-data-grid">'
                    + '<div class="case-data-item"><div class="data-label">Net Income</div><div class="data-value">' + cs.netIncome + '</div></div>'
                    + '<div class="case-data-item"><div class="data-label">Equity</div><div class="data-value">' + cs.equity + '</div></div>'
                    + '<div class="case-data-item"><div class="data-label">Total Debt</div><div class="data-value">' + cs.debt + '</div></div>'
                    + '</div>'
                    + '<p style="color:var(--fsa-text-dim);font-size:0.88rem;font-style:italic;margin:0.75rem 0;">Hint: ' + cs.hint + '</p>'
                    + '<div class="label-buttons">'
                    + '<button class="label-btn" onclick="InvestingLabs.ROELieDetector.answer(' + i + ',\'strong\')">Strong Business</button>'
                    + '<button class="label-btn" onclick="InvestingLabs.ROELieDetector.answer(' + i + ',\'debt\')">Debt Boost</button>'
                    + '<button class="label-btn" onclick="InvestingLabs.ROELieDetector.answer(' + i + ',\'onetime\')">One-Time Event</button>'
                    + '</div>'
                    + '<div id="roe-fb-' + i + '" style="margin-top:0.75rem;"></div>'
                    + '</div>';
            });

            c.innerHTML = html;
            _rescan();
        },

        answer: function (index, choice) {
            var cs = this.cases[index];
            var fb = document.getElementById('roe-fb-' + index);
            var card = fb.closest('.case-study-card');
            var isCorrect = choice === cs.answer;

            // Highlight chosen button
            card.querySelectorAll('.label-btn').forEach(function (btn) {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            fb.innerHTML = '<div style="padding:1rem;border-radius:0.5rem;background:' + (isCorrect ? 'rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3)') + ';">'
                + '<p style="color:' + (isCorrect ? '#34d399' : '#f87171') + ';font-weight:700;margin-bottom:0.5rem;">'
                + (isCorrect ? '✓ Correct' : '✗ Not quite') + '</p>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.88rem;line-height:1.6;">' + cs.explanation + '</p></div>';
        }
    };

    /* ================================================================
       PE VS GROWTH MATCH GAME
       ================================================================ */

    const PEGrowthGame = {
        companies: [
            { name: 'FastGrow SaaS', pe: 45, growth: 40, answer: 'justified', explain: 'P/E 45 looks expensive, but 40% growth means the PEG ratio is ~1.1. The market is paying for real, high growth.' },
            { name: 'ValueBank', pe: 8, growth: 3, answer: 'fair', explain: 'Low P/E matches low growth. Banks typically trade at single-digit P/E. This is fairly priced for what it is.' },
            { name: 'FadingRetail', pe: 6, growth: -5, answer: 'cheap-reason', explain: 'Looks cheap at P/E 6, but earnings are shrinking 5% per year. The low price reflects real decline — this is a value trap.' },
            { name: 'HypeElectric', pe: 120, growth: 15, answer: 'trap', explain: 'P/E 120 with only 15% growth gives a PEG of 8. The stock is priced for explosive growth that isn\'t happening. This is the most dangerous category.' },
            { name: 'SteadyPharma', pe: 18, growth: 12, answer: 'fair', explain: 'P/E 18 with 12% growth is a PEG of 1.5 — reasonable for a stable, defensive company.' },
            { name: 'CyclicalSteel', pe: 5, growth: 25, answer: 'cheap-reason', explain: 'Looks incredibly cheap, but cyclical companies show low P/E at the peak of earnings. When the cycle turns, earnings collapse and P/E skyrockets. This is the classic cyclical trap.' },
            { name: 'CloudPlatform', pe: 55, growth: 50, answer: 'justified', explain: 'PEG just over 1.0. If this growth rate is sustainable for 3+ years, the premium is justified. The risk is growth deceleration.' },
            { name: 'OldMedia', pe: 12, growth: 0, answer: 'fair', explain: 'No growth but modest P/E. Appropriate if the company pays a reliable dividend. Don\'t expect capital appreciation.' }
        ],
        answers: {},

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;
            var self = this;

            var labels = ['Fair', 'Expensive but Justified', 'Cheap for a Reason', 'Trap'];
            var labelKeys = ['fair', 'justified', 'cheap-reason', 'trap'];

            var html = '<h4>P/E vs Growth Match Game</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1.5rem;">Label each company. Remember: P/E alone means nothing without growth context.</p>'
                + '<div class="match-game-grid">';

            this.companies.forEach(function (co, i) {
                html += '<div class="match-item" id="peg-' + i + '">'
                    + '<div class="match-company">' + co.name + '</div>'
                + '<div class="match-data">' + _g('pe-ratio', 'P/E') + ': ' + co.pe + 'x | Growth: ' + co.growth + '%</div>'
                    + '<div class="label-buttons" style="margin-top:0.75rem;">';
                labels.forEach(function (lab, j) {
                    html += '<button class="label-btn" onclick="InvestingLabs.PEGrowthGame.label(' + i + ',\'' + labelKeys[j] + '\')">' + lab + '</button>';
                });
                html += '</div></div>';
            });

            html += '</div>';
            html += '<button class="btn btn-primary" style="margin-top:1.5rem;width:100%;" onclick="InvestingLabs.PEGrowthGame.check()">Check Answers</button>';
            html += '<div id="peg-feedback" style="margin-top:1rem;"></div>';

            c.innerHTML = html;
            _rescan();
        },

        label: function (index, label) {
            this.answers[index] = label;
            var card = document.getElementById('peg-' + index);
            card.querySelectorAll('.label-btn').forEach(function (btn) { btn.classList.remove('active'); });
            event.target.classList.add('active');
        },

        check: function () {
            var correct = 0;
            var self = this;

            this.companies.forEach(function (co, i) {
                var card = document.getElementById('peg-' + i);
                if (self.answers[i] === co.answer) {
                    card.classList.add('correct');
                    card.classList.remove('incorrect');
                    correct++;
                } else {
                    card.classList.add('incorrect');
                    card.classList.remove('correct');
                }
            });

            var fb = document.getElementById('peg-feedback');
            fb.innerHTML = '<div style="padding:1.25rem;background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3);border-radius:0.75rem;">'
                + '<p style="color:#34d399;font-weight:700;margin-bottom:0.75rem;">' + correct + ' of ' + this.companies.length + ' correct</p>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.7;margin-bottom:0.5rem;">'
                + '<strong>Key lessons:</strong></p><ul style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.8;padding-left:1.5rem;">'
                + '<li>When earnings drop fast, P/E spikes — making a struggling company look "expensive" overnight</li>'
                + '<li>"Cheap" cyclicals look safest right before the cycle turns — that\'s when earnings peak and P/E is lowest</li>'
                + '<li>PEG ratio (P/E ÷ growth rate) gives rough intuition, but it\'s not magic — always check if growth is sustainable</li>'
                + '</ul>';

            // Show explanations for each
            this.companies.forEach(function (co, i) {
                var card = document.getElementById('peg-' + i);
                var existing = card.querySelector('.peg-explain');
                if (existing) existing.remove();
                var explain = document.createElement('div');
                explain.className = 'peg-explain';
                explain.style.cssText = 'margin-top:0.75rem;padding:0.75rem;background:rgba(0,0,0,0.3);border-radius:0.5rem;font-size:0.85rem;color:var(--fsa-text-secondary);line-height:1.6;';
                explain.textContent = co.explain;
                card.appendChild(explain);
            });

            fb.innerHTML += '</div>';
        }
    };

    /* ================================================================
       FCF QUALITY QUIZ
       ================================================================ */

    const FCFQuiz = {
        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;

            var html = '<h4>Cash Flow Mini Autopsy</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1.5rem;">Two companies. One is healthier than it looks. One is sicker.</p>';

            // Company A
            html += '<div class="case-study-card">'
                + '<div class="company-header"><div class="company-icon">🏢</div>'
                + '<div><div class="company-name">Company A — "Rising Star"</div>'
                + '<div class="company-sector">Net income rising 3 years straight</div></div></div>'
                + '<div class="case-data-grid">'
                + '<div class="case-data-item"><div class="data-label">Net Income</div><div class="data-value">$120M</div></div>'
                + '<div class="case-data-item"><div class="data-label">Cash from Ops</div><div class="data-value">$60M</div></div>'
                + '<div class="case-data-item"><div class="data-label">' + _g('capex', 'CapEx') + '</div><div class="data-value">$55M</div></div>'
                + '<div class="case-data-item"><div class="data-label">' + _g('free-cash-flow', 'Free Cash Flow') + '</div><div class="data-value" style="color:#f87171;">$5M</div></div>'
                + '</div></div>';

            // Company B
            html += '<div class="case-study-card">'
                + '<div class="company-header"><div class="company-icon">🏭</div>'
                + '<div><div class="company-name">Company B — "Steady Eddie"</div>'
                + '<div class="company-sector">Flat net income for 3 years</div></div></div>'
                + '<div class="case-data-grid">'
                + '<div class="case-data-item"><div class="data-label">Net Income</div><div class="data-value">$80M</div></div>'
                + '<div class="case-data-item"><div class="data-label">Cash from Ops</div><div class="data-value">$110M</div></div>'
                + '<div class="case-data-item"><div class="data-label">' + _g('capex', 'CapEx') + '</div><div class="data-value">$30M</div></div>'
                + '<div class="case-data-item"><div class="data-label">' + _g('free-cash-flow', 'Free Cash Flow') + '</div><div class="data-value" style="color:#34d399;">$80M</div></div>'
                + '</div></div>';

            html += '<div style="margin-top:1.5rem;">'
                + '<p style="color:var(--fsa-green-light);font-weight:700;margin-bottom:0.75rem;">Who is healthier and why?</p>'
                + '<div class="label-buttons">'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.answer(\'A\')">Company A — Higher Profit</button>'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.answer(\'B\')">Company B — Stronger Cash</button>'
                + '</div></div>';

            html += '<div id="fcf-feedback"></div>';

            // FCF Quality Quiz
            html += '<div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.06);">'
                + '<p style="color:var(--fsa-green-light);font-weight:700;margin-bottom:0.75rem;">What might cause profit to rise while cash fails to show up?</p>'
                + '<div class="label-buttons">'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.qualityAnswer(this,true)">Customers paying slower</button>'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.qualityAnswer(this,true)">Inventory building up</button>'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.qualityAnswer(this,true)">Heavy capex year</button>'
                + '<button class="label-btn" onclick="InvestingLabs.FCFQuiz.qualityAnswer(this,true)">Accounting gains (non-cash)</button>'
                + '</div>'
                + '<div id="fcf-quality-fb"></div></div>';

            c.innerHTML = html;
            _rescan();
        },

        answer: function (choice) {
            var fb = document.getElementById('fcf-feedback');
            var isB = choice === 'B';

            fb.innerHTML = '<div style="margin-top:1rem;padding:1.25rem;border-radius:0.75rem;background:' + (isB ? 'rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.1);border:2px solid rgba(239,68,68,0.3)') + ';">'
                + '<p style="color:' + (isB ? '#34d399' : '#f87171') + ';font-weight:700;margin-bottom:0.5rem;">' + (isB ? '✓ Correct' : '✗ Not quite') + '</p>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.7;">'
                + '<strong>Company B is healthier.</strong> Company A shows $120M net income but only $5M in free cash flow. That massive gap means profit exists on paper but the cash isn\'t materializing. '
                + 'Company B has lower reported income ($80M) but generates $80M in actual cash. Cash is harder to fake than accounting profit. '
                + 'This is why free cash flow is the "truth check" on reported earnings.</p></div>';
        },

        qualityAnswer: function (btn, correct) {
            btn.classList.add('active');
            var fb = document.getElementById('fcf-quality-fb');
            fb.innerHTML = '<div style="margin-top:0.75rem;padding:1rem;background:rgba(16,185,129,0.1);border-radius:0.5rem;">'
                + '<p style="color:#34d399;font-size:0.88rem;line-height:1.6;">'
                + '✓ All four are valid reasons. Customers paying slower means revenue is booked but cash hasn\'t arrived (rising receivables). '
                + 'Inventory buildup ties up cash. Heavy capex reduces free cash flow directly. Accounting gains boost reported earnings without any cash changing hands. '
                + '<strong>This is why you always check FCF alongside net income.</strong></p></div>';
        }
    };

    /* ================================================================
       EARNINGS VISIBILITY SCORER
       ================================================================ */

    const VisibilityScorer = {
        criteria: [
            { id: 'recurring', label: 'Recurring Demand', help: 'Do customers buy regularly regardless of economy?' },
            { id: 'contracts', label: 'Contract Revenue', help: 'Are revenues locked in via contracts or subscriptions?' },
            { id: 'essential', label: 'Essential Product', help: 'Would life be difficult without this product?' },
            { id: 'regulation', label: 'Low Regulation Risk', help: 'Is the industry unlikely to face major regulatory change?' },
            { id: 'competition', label: 'Limited Competition', help: 'Does the company have a defensible market position?' }
        ],
        scores: {},

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;
            var self = this;

            var html = '<h4>Earnings Visibility Scorer</h4>'
                + '<p style="color:var(--fsa-text-secondary);margin-bottom:1.5rem;">Rate a company on each dimension (1 = weak, 5 = strong). This helps you estimate how predictable future earnings are.</p>';

            html += '<div class="ratio-input-group" style="margin-bottom:1rem;">'
                + '<label>Company Name (optional)</label>'
                + '<input type="text" id="vis-company-name" placeholder="e.g., Johnson & Johnson" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.65rem;color:var(--fsa-text-primary);font-size:1rem;">'
                + '</div>';

            this.criteria.forEach(function (crit) {
                html += '<div style="margin:1.25rem 0;">'
                    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">'
                    + '<span style="color:var(--fsa-text-primary);font-weight:600;">' + crit.label + '</span>'
                    + '<span id="vis-val-' + crit.id + '" style="font-family:var(--font-family-mono);color:var(--fsa-green);font-weight:700;">3</span>'
                    + '</div>'
                    + '<p style="font-size:0.8rem;color:var(--fsa-text-dim);margin-bottom:0.35rem;">' + crit.help + '</p>'
                    + '<input type="range" id="vis-' + crit.id + '" min="1" max="5" value="3" step="1" '
                    + 'style="width:100%;-webkit-appearance:none;appearance:none;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;outline:none;" '
                    + 'oninput="InvestingLabs.VisibilityScorer.update(\'' + crit.id + '\',this.value)">'
                    + '</div>';
            });

            html += '<button class="btn btn-primary" style="width:100%;margin-top:1rem;" onclick="InvestingLabs.VisibilityScorer.score()">Calculate Visibility Score</button>';
            html += '<div id="vis-result"></div>';

            c.innerHTML = html;
            _rescan();
        },

        update: function (id, value) {
            var display = document.getElementById('vis-val-' + id);
            if (display) display.textContent = value;
            this.scores[id] = parseInt(value);
        },

        score: function () {
            var self = this;
            var total = 0;
            var count = 0;

            this.criteria.forEach(function (crit) {
                var slider = document.getElementById('vis-' + crit.id);
                var val = slider ? parseInt(slider.value) : 3;
                self.scores[crit.id] = val;
                total += val;
                count++;
            });

            var avg = total / count;
            var companyName = document.getElementById('vis-company-name').value || 'This company';
            var rating, color, desc;

            if (avg >= 4) {
                rating = 'High Visibility';
                color = '#34d399';
                desc = companyName + ' scores well on earnings predictability. Think consumer staples, utilities, essential healthcare. These businesses tend to perform consistently even in downturns.';
            } else if (avg >= 2.5) {
                rating = 'Moderate Visibility';
                color = '#fbbf24';
                desc = companyName + ' has mixed visibility. Some revenue is predictable, but there are uncertainties. Dig deeper into which factors are weak and whether they could improve.';
            } else {
                rating = 'Low Visibility';
                color = '#f87171';
                desc = companyName + ' has unpredictable earnings. This doesn\'t mean it\'s a bad investment — but it means you\'re taking on more uncertainty. Size your position accordingly.';
            }

            var result = document.getElementById('vis-result');
            result.innerHTML = '<div style="margin-top:1.5rem;padding:1.5rem;background:rgba(16,185,129,0.08);border:2px solid ' + color + ';border-radius:0.75rem;text-align:center;">'
                + '<div style="font-size:0.8rem;color:var(--fsa-text-dim);text-transform:uppercase;letter-spacing:0.08em;">Visibility Rating</div>'
                + '<div style="font-size:1.75rem;font-weight:800;color:' + color + ';margin:0.5rem 0;">' + rating + '</div>'
                + '<div style="font-size:1.3rem;font-family:var(--font-family-mono);color:var(--fsa-text-primary);margin-bottom:0.75rem;">' + avg.toFixed(1) + ' / 5.0</div>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.6;max-width:500px;margin:0 auto;">' + desc + '</p>'
                + '</div>';
        }
    };

    /* ================================================================
       FULL SCORECARD GENERATOR
       ================================================================ */

    const ScorecardGenerator = {
        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;

            var html = '<div class="scorecard">'
                + '<div class="scorecard-header">'
                + '<h3>Investment Scorecard</h3>'
                + '<div class="scorecard-company">Fill in the data below — this becomes your reusable template</div>'
                + '</div>';

            // Section A: Business Health
            html += '<div class="scorecard-section"><h4>Section A — Business Health</h4>'
                + this._inputRow('sc-cr', _g('current-ratio', 'Current Ratio'), 'e.g. 1.5')
                + this._inputRow('sc-de', _g('debt-to-equity', 'Debt / Equity'), 'e.g. 0.8')
                + this._inputRow('sc-roe', _g('roe', 'ROE') + ' (%)', 'e.g. 18')
                + '<div style="margin-top:0.5rem;"><label style="color:var(--fsa-text-dim);font-size:0.85rem;">Is debt boosting ROE?</label>'
                + '<select id="sc-roe-debt" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.5rem;color:var(--fsa-text-primary);margin-top:0.25rem;">'
                + '<option value="no">No — genuine operating strength</option>'
                + '<option value="maybe">Maybe — needs investigation</option>'
                + '<option value="yes">Yes — ROE inflated by leverage</option>'
                + '</select></div></div>';

            // Section B: Price Sanity
            html += '<div class="scorecard-section"><h4>Section B — Price Sanity</h4>'
                + this._inputRow('sc-pe', _g('pe-ratio', 'P/E Ratio'), 'e.g. 22')
                + this._inputRow('sc-pb', _g('pb-ratio', 'P/B Ratio'), 'e.g. 2.1')
                + this._inputRow('sc-pe-sector', 'Sector Avg P/E', 'e.g. 18')
                + this._inputRow('sc-pe-5yr', 'Own 5yr Avg P/E', 'e.g. 20')
                + '</div>';

            // Section C: Cash Truth
            html += '<div class="scorecard-section"><h4>Section C — Cash Truth</h4>'
                + '<div style="margin-top:0.5rem;"><label style="color:var(--fsa-text-dim);font-size:0.85rem;">FCF Trend (3 years)</label>'
                + '<select id="sc-fcf-trend" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.5rem;color:var(--fsa-text-primary);margin-top:0.25rem;">'
                + '<option value="rising">Rising — strong and improving</option>'
                + '<option value="flat">Flat — stable but not growing</option>'
                + '<option value="declining">Declining — watch closely</option>'
                + '<option value="negative">Negative — investigate why</option>'
                + '</select></div>'
                + '<div class="ratio-input-group" style="margin-top:0.75rem;"><label>If FCF is negative, why?</label>'
                + '<input type="text" id="sc-fcf-note" placeholder="e.g., heavy capex for new factory" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.5rem;color:var(--fsa-text-primary);"></div></div>';

            // Section D: Future
            html += '<div class="scorecard-section"><h4>Section D — Future</h4>'
                + '<div style="margin-top:0.5rem;"><label style="color:var(--fsa-text-dim);font-size:0.85rem;">Earnings Growth Trend</label>'
                + '<select id="sc-growth" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.5rem;color:var(--fsa-text-primary);margin-top:0.25rem;">'
                + '<option value="compounder">Steady compounder (5-15% annually)</option>'
                + '<option value="high">High growth (15%+ annually)</option>'
                + '<option value="boom-bust">Boom and bust (inconsistent)</option>'
                + '<option value="turnaround">Turnaround story</option>'
                + '<option value="declining">Declining</option>'
                + '</select></div>'
                + this._inputRow('sc-vis', 'Earnings Visibility (1-5)', 'e.g. 4')
                + '</div>';

            // Decision
            html += '<div class="scorecard-decision">'
                + '<p style="color:var(--fsa-text-primary);font-weight:700;margin-bottom:0.5rem;">Final Decision</p>'
                + '<p style="color:var(--fsa-text-dim);font-size:0.85rem;margin-bottom:1rem;">Force yourself to pick one. No "maybe."</p>'
                + '<div class="decision-options">'
                + '<button class="decision-btn never" onclick="InvestingLabs.ScorecardGenerator.decide(this,\'never\')">Buy Never</button>'
                + '<button class="decision-btn watchlist" onclick="InvestingLabs.ScorecardGenerator.decide(this,\'watchlist\')">Watchlist Only</button>'
                + '<button class="decision-btn starter" onclick="InvestingLabs.ScorecardGenerator.decide(this,\'starter\')">Small Starter</button>'
                + '<button class="decision-btn add-slowly" onclick="InvestingLabs.ScorecardGenerator.decide(this,\'add\')">Add Slowly</button>'
                + '</div></div>';

            html += '</div>';

            c.innerHTML = html;
            _rescan();
        },

        _inputRow: function (id, label, placeholder) {
            return '<div class="scorecard-row" style="flex-wrap:wrap;gap:0.5rem;">'
                + '<span class="sc-label">' + label + '</span>'
                + '<input type="number" id="' + id + '" placeholder="' + placeholder + '" step="any" '
                + 'style="width:120px;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.4rem 0.6rem;color:var(--fsa-text-primary);font-family:var(--font-family-mono);font-size:0.9rem;text-align:right;min-height:36px;">'
                + '</div>';
        },

        decide: function (btn, decision) {
            document.querySelectorAll('.decision-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        }
    };

    /* ================================================================
       FEE IMPACT SIMULATOR
       ================================================================ */

    const FeeSimulator = {
        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;

            var html = '<div class="ratio-sandbox">'
                + '<h3>Fee Impact Simulator</h3>'
                + '<p style="color:var(--fsa-text-secondary);text-align:center;margin-bottom:1.5rem;">See how a small fee difference compounds into a massive dollar amount over decades.</p>'
                + '<div class="ratio-input-grid">'
                + '<div class="ratio-input-group"><label>Starting Amount ($)</label><input type="number" id="fee-start" value="10000" min="0" step="1000"></div>'
                + '<div class="ratio-input-group"><label>Monthly Contribution ($)</label><input type="number" id="fee-monthly" value="500" min="0" step="50"></div>'
                + '<div class="ratio-input-group"><label>Annual Return (%)</label><input type="number" id="fee-return" value="8" min="0" max="20" step="0.5"></div>'
                + '<div class="ratio-input-group"><label>Years</label><input type="number" id="fee-years" value="30" min="1" max="50"></div>'
                + '</div>'
                + '<div class="slider-challenge" style="margin:1.5rem 0;">'
                + '<h4>Fund ' + _g('expense-ratio', 'Expense Ratio') + '</h4>'
                + '<div class="slider-row">'
                + '<label>Low-Cost Fund</label>'
                + '<input type="range" id="fee-low" min="0.01" max="0.5" value="0.05" step="0.01">'
                + '<span class="slider-value-badge" id="fee-low-val">0.05%</span>'
                + '</div>'
                + '<div class="slider-row">'
                + '<label>High-Fee Fund</label>'
                + '<input type="range" id="fee-high" min="0.5" max="2.5" value="1.0" step="0.1">'
                + '<span class="slider-value-badge" id="fee-high-val">1.00%</span>'
                + '</div></div>'
                + '<button class="btn btn-primary" style="width:100%;" onclick="InvestingLabs.FeeSimulator.calculate()">See the Damage</button>'
                + '<div id="fee-results"></div>'
                + '</div>';

            c.innerHTML = html;
            _rescan();

            // Wire sliders
            document.getElementById('fee-low').addEventListener('input', function () {
                document.getElementById('fee-low-val').textContent = parseFloat(this.value).toFixed(2) + '%';
            });
            document.getElementById('fee-high').addEventListener('input', function () {
                document.getElementById('fee-high-val').textContent = parseFloat(this.value).toFixed(2) + '%';
            });
        },

        calculate: function () {
            var start = parseFloat(document.getElementById('fee-start').value) || 10000;
            var monthly = parseFloat(document.getElementById('fee-monthly').value) || 500;
            var annualReturn = parseFloat(document.getElementById('fee-return').value) || 8;
            var years = parseInt(document.getElementById('fee-years').value) || 30;
            var feeLow = parseFloat(document.getElementById('fee-low').value) || 0.05;
            var feeHigh = parseFloat(document.getElementById('fee-high').value) || 1.0;

            var lowResult = this._compound(start, monthly, annualReturn, feeLow, years);
            var highResult = this._compound(start, monthly, annualReturn, feeHigh, years);
            var lost = lowResult - highResult;

            var r = document.getElementById('fee-results');
            r.innerHTML = '<div class="fee-comparison">'
                + '<div class="fee-column winner">'
                + '<div class="fee-label">Low-Cost Fund (' + feeLow.toFixed(2) + '%)</div>'
                + '<div class="fee-amount good">$' + Math.round(lowResult).toLocaleString() + '</div>'
                + '<div class="fee-detail">Net return: ' + (annualReturn - feeLow).toFixed(2) + '% / year</div>'
                + '</div>'
                + '<div class="fee-column">'
                + '<div class="fee-label">High-Fee Fund (' + feeHigh.toFixed(2) + '%)</div>'
                + '<div class="fee-amount bad">$' + Math.round(highResult).toLocaleString() + '</div>'
                + '<div class="fee-detail">Net return: ' + (annualReturn - feeHigh).toFixed(2) + '% / year</div>'
                + '</div></div>'
                + '<div class="fee-lost">'
                + '<div class="lost-label">Money lost to the fee difference over ' + years + ' years</div>'
                + '<div class="lost-amount">$' + Math.round(lost).toLocaleString() + '</div>'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;margin-top:0.75rem;line-height:1.6;">'
                + 'That\'s real money — gone to fund managers instead of your retirement. '
                + 'A ' + (feeHigh - feeLow).toFixed(2) + '% annual difference doesn\'t sound like much, but ' + _g('compound-interest', 'compound interest') + ' amplifies it relentlessly.</p>'
                + '</div>';
            _rescan();
        },

        _compound: function (start, monthly, annualReturn, fee, years) {
            var netRate = (annualReturn - fee) / 100;
            var monthlyRate = netRate / 12;
            var months = years * 12;
            var fv = start * Math.pow(1 + monthlyRate, months);
            fv += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            return fv;
        }
    };

    /* ================================================================
       DCA SIMULATOR
       ================================================================ */

    const DCASimulator = {
        // Simplified market scenarios (monthly returns as multipliers)
        scenarios: {
            'steady-growth': { name: 'Steady Growth', desc: 'Market rises gradually over 24 months', months: [] },
            'crash-recovery': { name: 'Crash & Recovery', desc: 'Market drops 35% then recovers over 24 months', months: [] },
            'volatile-flat': { name: 'Volatile Sideways', desc: 'Wild swings but market ends roughly flat', months: [] }
        },

        init: function () {
            // Generate monthly price series starting at $100
            var s = this.scenarios;

            // Steady growth: ~8% annual
            s['steady-growth'].months = [100,101,102,103,104,105,106,107,108,109,110,111,113,114,115,116,118,119,120,121,122,124,125,126];

            // Crash recovery: drops to 65 then recovers to 110
            s['crash-recovery'].months = [100,95,88,80,72,65,63,66,70,74,78,82,87,90,93,96,98,100,102,104,106,108,110,112];

            // Volatile sideways: swings but ends at 102
            s['volatile-flat'].months = [100,105,97,110,95,88,102,108,92,85,95,105,98,112,90,83,96,108,100,95,105,98,102,101];
        },

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;
            this.init();

            var html = '<div class="ratio-sandbox">'
                + '<h3>Dollar-Cost Averaging Simulator</h3>'
                + '<p style="color:var(--fsa-text-secondary);text-align:center;margin-bottom:1.5rem;">Compare three strategies over 24 months: invest everything now, spread it monthly, or try to time the bottom.</p>'
                + '<div class="ratio-input-grid">'
                + '<div class="ratio-input-group"><label>Total to Invest ($)</label><input type="number" id="dca-total" value="12000" min="1000" step="1000"></div>'
                + '<div class="ratio-input-group"><label>Market Scenario</label>'
                + '<select id="dca-scenario" style="width:100%;background:rgba(0,0,0,0.4);border:2px solid var(--fsa-border-medium);border-radius:0.5rem;padding:0.65rem;color:var(--fsa-text-primary);font-size:1rem;">'
                + '<option value="steady-growth">Steady Growth (~8% annual)</option>'
                + '<option value="crash-recovery">Crash & Recovery (-35% then bounce)</option>'
                + '<option value="volatile-flat">Volatile Sideways (flat result)</option>'
                + '</select></div></div>'
                + '<button class="btn btn-primary" style="width:100%;margin-top:1rem;" onclick="InvestingLabs.DCASimulator.simulate()">Run Simulation</button>'
                + '<div id="dca-results"></div>'
                + '</div>';

            c.innerHTML = html;
            _rescan();
        },

        simulate: function () {
            var total = parseFloat(document.getElementById('dca-total').value) || 12000;
            var scenarioKey = document.getElementById('dca-scenario').value;
            var prices = this.scenarios[scenarioKey].months;
            var months = prices.length;
            var monthlyAmount = total / months;

            // Strategy 1: Lump sum at month 0
            var lumpShares = total / prices[0];
            var lumpFinal = lumpShares * prices[months - 1];

            // Strategy 2: DCA - equal monthly
            var dcaShares = 0;
            for (var i = 0; i < months; i++) {
                dcaShares += monthlyAmount / prices[i];
            }
            var dcaFinal = dcaShares * prices[months - 1];

            // Strategy 3: Market timer - waits, then invests after seeing 3 months of gains (usually too late)
            var timerMonth = -1;
            for (var j = 3; j < months; j++) {
                if (prices[j] > prices[j-1] && prices[j-1] > prices[j-2] && prices[j-2] > prices[j-3]) {
                    timerMonth = j;
                    break;
                }
            }
            if (timerMonth === -1) timerMonth = Math.floor(months / 2); // fallback: invest midway
            var timerShares = total / prices[timerMonth];
            var timerFinal = timerShares * prices[months - 1];

            var results = [
                { name: 'Lump Sum', value: lumpFinal, invested: total },
                { name: 'DCA (Monthly)', value: dcaFinal, invested: total },
                { name: 'Market Timer', value: timerFinal, invested: total }
            ];

            var best = results.reduce(function (a, b) { return a.value > b.value ? a : b; });

            var r = document.getElementById('dca-results');
            var html = '<div class="dca-results">';

            results.forEach(function (res) {
                var returnPct = ((res.value - res.invested) / res.invested * 100).toFixed(1);
                var isBest = res.name === best.name;

                html += '<div class="dca-strategy-card' + (isBest ? ' best' : '') + '">'
                    + '<div class="strategy-name">' + res.name + (isBest ? ' ★' : '') + '</div>'
                    + '<div class="strategy-value">$' + Math.round(res.value).toLocaleString() + '</div>'
                    + '<div class="strategy-return ' + (parseFloat(returnPct) >= 0 ? 'positive' : 'negative') + '">'
                    + (parseFloat(returnPct) >= 0 ? '+' : '') + returnPct + '%'
                    + '</div></div>';
            });

            html += '</div>';

            html += '<div style="margin-top:1.5rem;padding:1.25rem;background:rgba(16,185,129,0.08);border:2px solid rgba(16,185,129,0.3);border-radius:0.75rem;">'
                + '<p style="color:var(--fsa-text-secondary);font-size:0.9rem;line-height:1.7;">'
                + '<strong style="color:var(--fsa-green);">Key insight:</strong> In steady markets, lump sum usually wins because money is invested longer. '
                + 'In crash scenarios, DCA often wins because you buy more shares at lower prices. '
                + 'The market timer usually does worst because waiting for "certainty" means buying after the recovery has already started. '
                + '<strong>The strategy you\'ll actually follow beats the "optimal" strategy you\'ll abandon.</strong></p></div>';

            r.innerHTML = html;
            _rescan();
        }
    };

    /* ================================================================
       RISK TOLERANCE DISCOVERY
       ================================================================ */

    const RiskTolerance = {
        scenarios: [
            {
                prompt: 'You invested $10,000 six months ago. Today your portfolio is worth $7,500 — a 25% loss. What do you actually do?',
                choices: [
                    { text: 'Sell everything. I can\'t sleep at night watching this.', score: 1 },
                    { text: 'Sell half to limit further damage, keep half invested.', score: 2 },
                    { text: 'Do nothing. Markets recover. I\'ll wait.', score: 3 },
                    { text: 'Buy more. Stocks are on sale.', score: 4 }
                ]
            },
            {
                prompt: 'Your friend made 300% on a speculative stock in 3 months and keeps telling you about it. What\'s your honest reaction?',
                choices: [
                    { text: 'Good for them. I\'m sticking to my plan.', score: 3 },
                    { text: 'I feel jealous and consider putting some money in.', score: 2 },
                    { text: 'I research it and invest a small amount I can afford to lose.', score: 4 },
                    { text: 'I don\'t invest in things I don\'t fully understand, period.', score: 1 }
                ]
            },
            {
                prompt: 'You\'re choosing between two investments. Option A: guaranteed 5% return. Option B: 50% chance of 15% return, 50% chance of losing 5%. Which do you take?',
                choices: [
                    { text: 'Option A, easily. I want certainty.', score: 1 },
                    { text: 'Option A, but I\'d put a small amount in B.', score: 2 },
                    { text: 'Option B. The expected value is higher (5% vs 5%).', score: 3 },
                    { text: 'Option B without hesitation. I\'d take that bet every time.', score: 4 }
                ]
            },
            {
                prompt: 'How would you invest $50,000 that you won\'t need for 20 years?',
                choices: [
                    { text: 'High-yield savings account. I want zero risk of loss.', score: 1 },
                    { text: '60% bonds, 40% stocks. Stability first.', score: 2 },
                    { text: '80% stocks, 20% bonds. Growth with some cushion.', score: 3 },
                    { text: '100% stocks, maybe some in aggressive growth funds.', score: 4 }
                ]
            },
            {
                prompt: 'The market drops 40% in a crash. Headlines say "worst since 2008." Your portfolio lost $20,000. How long before you check your account?',
                choices: [
                    { text: 'Immediately. Multiple times a day. I feel sick.', score: 1 },
                    { text: 'Within a day. I\'m anxious but trying to stay calm.', score: 2 },
                    { text: 'I check weekly. Crashes happen. This is normal.', score: 3 },
                    { text: 'I don\'t check. I set up auto-invest and increased my contribution.', score: 4 }
                ]
            }
        ],
        answers: [],
        currentScenario: 0,

        render: function (containerId) {
            var c = document.getElementById(containerId);
            if (!c) return;
            this.containerId = containerId;
            this.answers = [];
            this.currentScenario = 0;
            this._renderScenario(c);
        },

        _renderScenario: function (container) {
            var idx = this.currentScenario;
            var s = this.scenarios[idx];
            var total = this.scenarios.length;

            var html = '<div style="margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">';
            for (var i = 0; i < total; i++) {
                html += '<div style="flex:1;height:4px;border-radius:2px;background:' + (i < idx ? '#10b981' : i === idx ? '#34d399' : 'rgba(255,255,255,0.1)') + ';"></div>';
            }
            html += '<span style="color:var(--fsa-text-dim);font-size:0.8rem;white-space:nowrap;">' + (idx + 1) + '/' + total + '</span></div>';

            html += '<div class="risk-scenario">'
                + '<div class="scenario-number">Scenario ' + (idx + 1) + '</div>'
                + '<div class="scenario-prompt">' + s.prompt + '</div>'
                + '<div class="risk-choices">';

            var self = this;
            s.choices.forEach(function (ch, ci) {
                html += '<button class="risk-choice" onclick="InvestingLabs.RiskTolerance.choose(' + ci + ')">' + ch.text + '</button>';
            });

            html += '</div></div>';
            container.innerHTML = html;
        },

        choose: function (choiceIndex) {
            var s = this.scenarios[this.currentScenario];
            this.answers.push(s.choices[choiceIndex].score);
            this.currentScenario++;

            var container = document.getElementById(this.containerId);
            if (this.currentScenario < this.scenarios.length) {
                this._renderScenario(container);
            } else {
                this._showResult(container);
            }
        },

        _showResult: function (container) {
            var totalScore = this.answers.reduce(function (a, b) { return a + b; }, 0);
            var avg = totalScore / this.answers.length;
            var profile, desc, allocation, segment;

            if (avg <= 1.5) {
                profile = 'Conservative';
                segment = 'conservative';
                desc = 'You prioritize capital preservation over growth. Losses cause significant stress. This is not a weakness — it means you should invest in a way that lets you sleep at night.';
                allocation = '70-80% bonds/stable value, 20-30% stocks. Consider a target-date fund with conservative allocation.';
            } else if (avg <= 2.5) {
                profile = 'Moderate';
                segment = 'moderate';
                desc = 'You want growth but aren\'t comfortable with big swings. You\'ll hold through minor dips but a major crash would test you.';
                allocation = '40-50% bonds, 50-60% stocks. Classic balanced portfolio. Rebalance annually.';
            } else if (avg <= 3.5) {
                profile = 'Growth';
                segment = 'growth';
                desc = 'You understand that volatility is the price of higher returns. You can hold through crashes without panic selling — the key skill for long-term wealth building.';
                allocation = '15-25% bonds, 75-85% stocks. Standard growth allocation for long time horizons.';
            } else {
                profile = 'Aggressive';
                segment = 'aggressive';
                desc = 'You actively seek higher returns and are unfazed by major losses. You see crashes as opportunities. Be honest about whether this is confidence or overconfidence.';
                allocation = '0-10% bonds, 90-100% stocks. Consider if this matches your actual time horizon and financial obligations.';
            }

            var html = '<div class="risk-profile-result">'
                + '<div style="font-size:0.8rem;color:var(--fsa-text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem;">Your Risk Profile</div>'
                + '<div class="profile-type">' + profile + '</div>'
                + '<div class="risk-meter">'
                + '<div class="risk-meter-segment conservative ' + (segment === 'conservative' ? 'active' : '') + '"></div>'
                + '<div class="risk-meter-segment moderate ' + (segment === 'moderate' ? 'active' : '') + '"></div>'
                + '<div class="risk-meter-segment growth ' + (segment === 'growth' ? 'active' : '') + '"></div>'
                + '<div class="risk-meter-segment aggressive ' + (segment === 'aggressive' ? 'active' : '') + '"></div>'
                + '</div>'
                + '<div class="profile-desc">' + desc + '</div>'
                + '</div>';

            html += '<div style="padding:1.5rem;background:var(--fsa-bg-card);border:2px solid var(--fsa-border-medium);border-radius:0.75rem;margin-top:1.5rem;">'
                + '<h4 style="color:var(--fsa-green);margin-bottom:0.75rem;">Suggested Starting Allocation</h4>'
                + '<p style="color:var(--fsa-text-secondary);line-height:1.7;">' + allocation + '</p>'
                + '</div>';

            html += '<div style="padding:1.25rem;background:rgba(245,158,11,0.1);border:2px solid rgba(245,158,11,0.3);border-radius:0.75rem;margin-top:1.5rem;">'
                + '<p style="color:#fbbf24;font-size:0.9rem;line-height:1.7;">'
                + '<strong>Honest warning:</strong> Most people overestimate their risk tolerance in a quiz. '
                + 'The real test is how you feel when your portfolio drops 30% in real life with real money. '
                + 'Start with a slightly more conservative allocation than this suggests. You can always increase stock exposure later once you\'ve lived through a real drawdown.</p></div>';

            html += '<button class="btn btn-secondary" style="width:100%;margin-top:1.5rem;" onclick="InvestingLabs.RiskTolerance.render(\'' + this.containerId + '\')">Retake Assessment</button>';

            container.innerHTML = html;
            _rescan();
        }
    };

    /* ================================================================
       PUBLIC API
       ================================================================ */

    global.InvestingLabs = {
        RatioSandbox: RatioSandbox,
        LiquidityStressTest: LiquidityStressTest,
        DebtDangerMap: DebtDangerMap,
        ROELieDetector: ROELieDetector,
        PEGrowthGame: PEGrowthGame,
        FCFQuiz: FCFQuiz,
        VisibilityScorer: VisibilityScorer,
        ScorecardGenerator: ScorecardGenerator,
        FeeSimulator: FeeSimulator,
        DCASimulator: DCASimulator,
        RiskTolerance: RiskTolerance
    };

}(window));
