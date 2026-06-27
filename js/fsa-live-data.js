/**
 * FSA Live Data Service
 * @version 1.0.0
 * @description Fetches live financial data with hardcoded fallbacks.
 *   Provides window.FSALiveData for use across all modules.
 *
 * Data sources (all free, no auth required):
 *   - Inflation: World Bank API (annual CPI)
 *   - Bitcoin price: CoinGecko
 *   - All other rates: hardcoded baseline (updated periodically)
 */

(function () {
    'use strict';

    // ─── Baseline fallback data ───────────────────────────────────────────────
    // Baseline US figures last refreshed June 2026 (each sourced in SOURCES.md).
    // Static fallbacks - update periodically. Do NOT present these as checked-today.
    const BASELINE = {
        inflationRate: 4.2,           // BLS CPI-U, all items, 12-month change, May 2026
        fedFundsRate: 3.75,           // Fed funds target range 3.50-3.75%, upper bound; FOMC Jun 17 2026
        hysa_apy: 4.15,               // Top HYSA APY; Bankrate, Jun 2026
        avgSavingsApy: 0.38,          // FDIC national average savings APY; Jun 2026
        avgCheckingApy: 0.08,         // Average checking account APY
        avgCreditCardApr: 21.5,       // Avg APR, accounts assessed interest (21.52%); Fed G.19, Q1 2026
        avgMortgage30yr: 6.49,        // 30-yr fixed; Freddie Mac PMMS, Jun 25 2026
        avgCarLoanRate: 6.92,         // 60-mo new car; Bankrate, Jun 24 2026
        avgStudentLoanRate: 6.52,     // Undergrad Direct Sub/Unsub 2026-27 (eff Jul 1 2026); Federal Student Aid
        sp500HistoricalAvg: 10.0,     // S&P 500 ~long-run nominal avg (illustrative, ~50yr)
        sp500_10yr: 12.6,             // S&P 500 avg 10-year annualized return
        bondYield10yr: 4.38,          // 10-yr Treasury (FRED DGS10); Jun 26 2026
        bitcoinPrice: null,           // Filled live from CoinGecko
        bitcoin_1yr_return: null,     // Filled live or omitted
        // Tax brackets 2026 (Single filer, US federal)
        taxBrackets2026: [
            { rate: 10, min: 0, max: 12400 },
            { rate: 12, min: 12400, max: 50400 },
            { rate: 22, min: 50400, max: 105700 },
            { rate: 24, min: 105700, max: 201775 },
            { rate: 32, min: 201775, max: 256225 },
            { rate: 35, min: 256225, max: 640600 },
            { rate: 37, min: 640600, max: Infinity }
        ],
        standardDeduction2026: 16100, // Single filer standard deduction
        iraLimit2026: 7500,
        k401Limit2026: 24500,
        // Asset class comparison (real returns, annualized, ~20yr)
        assetReturns: {
            sp500: 10.0,
            bonds: 4.0,
            realEstate: 6.5,
            gold: 5.2,
            bitcoin: null,            // filled from live data
            savings: 0.5,
            inflation: null           // filled from live data
        },
        basedOn: 'June 2026 baseline (see SOURCES.md)',
        dataAsOf: 'June 2026'   // static; baseline last refreshed 2026-06-27. Never new Date() (overstates freshness)
    };

    // ─── State ────────────────────────────────────────────────────────────────
    const state = Object.assign({}, BASELINE);
    let _ready = false;
    const _listeners = [];

    // ─── Public API ──────────────────────────────────────────────────────────
    window.FSALiveData = {
        /**
         * Returns current data (mix of live + baseline).
         * Call after onReady() for live values.
         */
        get: () => Object.assign({}, state),

        /** Register a callback to fire when live data is loaded */
        onReady: (fn) => {
            if (_ready) { fn(window.FSALiveData.get()); }
            else { _listeners.push(fn); }
        },

        /** Format a percentage for display */
        fmt: {
            pct: (v, decimals = 1) => v != null ? `${Number(v).toFixed(decimals)}%` : '—',
            usd: (v) => v != null ? '$' + Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—',
            delta: (v, decimals = 1) => v != null ? (v >= 0 ? '+' : '') + Number(v).toFixed(decimals) + '%' : '—'
        },

        /**
         * Inject live numbers into any element with [data-fsa-live] attribute.
         * Supported values: inflation, fed-rate, hysa, avg-savings, cc-apr,
         *   mortgage-30, sp500-hist, sp500-10yr, bond-10yr, btc-price,
         *   ira-limit, k401-limit, std-deduction, bitcoin-return
         */
        injectAll: () => {
            document.querySelectorAll('[data-fsa-live]').forEach(el => {
                const key = el.getAttribute('data-fsa-live');
                const format = el.getAttribute('data-fsa-format') || 'pct';
                let value = null;

                switch (key) {
                    case 'inflation':        value = state.inflationRate; break;
                    case 'fed-rate':         value = state.fedFundsRate; break;
                    case 'hysa':             value = state.hysa_apy; break;
                    case 'avg-savings':      value = state.avgSavingsApy; break;
                    case 'cc-apr':           value = state.avgCreditCardApr; break;
                    case 'mortgage-30':      value = state.avgMortgage30yr; break;
                    case 'car-loan':         value = state.avgCarLoanRate; break;
                    case 'student-loan':     value = state.avgStudentLoanRate; break;
                    case 'sp500-hist':       value = state.sp500HistoricalAvg; break;
                    case 'sp500-10yr':       value = state.sp500_10yr; break;
                    case 'bond-10yr':        value = state.bondYield10yr; break;
                    case 'btc-price':        value = state.bitcoinPrice; break;
                    case 'btc-return':       value = state.bitcoin_1yr_return; break;
                    case 'ira-limit':        value = state.iraLimit2026; break;
                    case 'k401-limit':       value = state.k401Limit2026; break;
                    case 'std-deduction':    value = state.standardDeduction2026; break;
                }

                if (value !== null) {
                    if (format === 'usd') { el.textContent = window.FSALiveData.fmt.usd(value); }
                    else if (format === 'delta') { el.textContent = window.FSALiveData.fmt.delta(value); }
                    else { el.textContent = window.FSALiveData.fmt.pct(value); }
                    el.setAttribute('title', `Source: ${state.basedOn}`);
                }
            });
        },

        /**
         * Render a live-data context banner into a container element.
         * Call this to add a "Live financial context" block to a module.
         */
        renderBanner: (containerId, keys) => {
            const el = document.getElementById(containerId);
            if (!el) return;
            const items = keys.map(k => _bannerItem(k)).filter(Boolean);
            el.innerHTML = `
                <div class="fsa-live-banner">
                    <div class="fsa-live-banner__header">
                        <span class="fsa-live-banner__dot"></span>
                        Live Financial Context
                        <span class="fsa-live-banner__date">baseline data, last checked ${state.dataAsOf}</span>
                    </div>
                    <div class="fsa-live-banner__grid">
                        ${items.join('')}
                    </div>
                </div>`;
        }
    };

    // ─── Banner helper ────────────────────────────────────────────────────────
    function _bannerItem(key) {
        const map = {
            'inflation':    { label: 'US Inflation', value: state.inflationRate, format: 'pct', icon: '📈' },
            'fed-rate':     { label: 'Fed Funds Rate', value: state.fedFundsRate, format: 'pct', icon: '🏦' },
            'hysa':         { label: 'Top HYSA Rate', value: state.hysa_apy, format: 'pct', icon: '💰' },
            'avg-savings':  { label: 'Avg Savings APY', value: state.avgSavingsApy, format: 'pct', icon: '🐢' },
            'cc-apr':       { label: 'Avg Credit Card APR', value: state.avgCreditCardApr, format: 'pct', icon: '💳' },
            'mortgage-30':  { label: '30-Yr Mortgage', value: state.avgMortgage30yr, format: 'pct', icon: '🏠' },
            'car-loan':     { label: 'Avg Auto Loan', value: state.avgCarLoanRate, format: 'pct', icon: '🚗' },
            'student-loan': { label: 'Federal Student Loan', value: state.avgStudentLoanRate, format: 'pct', icon: '🎓' },
            'sp500-hist':   { label: 'S&P 500 Hist. Avg', value: state.sp500HistoricalAvg, format: 'pct', icon: '📊' },
            'sp500-10yr':   { label: 'S&P 500 (10yr Avg)', value: state.sp500_10yr, format: 'pct', icon: '📊' },
            'bond-10yr':    { label: '10-Yr Treasury', value: state.bondYield10yr, format: 'pct', icon: '🏛️' },
            'btc-price':    { label: 'Bitcoin Price', value: state.bitcoinPrice, format: 'usd', icon: '₿' },
        };
        const item = map[key];
        if (!item || item.value === null) return '';
        const formatted = item.format === 'usd'
            ? window.FSALiveData.fmt.usd(item.value)
            : window.FSALiveData.fmt.pct(item.value);
        return `<div class="fsa-live-item">
            <span class="fsa-live-item__icon">${item.icon}</span>
            <span class="fsa-live-item__label">${item.label}</span>
            <span class="fsa-live-item__value">${formatted}</span>
        </div>`;
    }

    // ─── Fire ready callbacks ─────────────────────────────────────────────────
    function _fireReady() {
        _ready = true;
        state.assetReturns.inflation = state.inflationRate;
        _listeners.forEach(fn => fn(window.FSALiveData.get()));
        _listeners.length = 0;
        window.FSALiveData.injectAll();
    }

    // ─── Fetch live data ─────────────────────────────────────────────────────
    async function _fetchAll() {
        const results = await Promise.allSettled([
            _fetchWorldBankInflation(),
            _fetchCoinGeckoBitcoin()
        ]);
        // Results applied inside each function; fire ready regardless
        _fireReady();
    }

    // TODO Follow-up: reconcile inflation methodology. Baseline uses BLS CPI-U 12-month change;
    // live fetch currently uses World Bank annual CPI. Pick one learner-facing definition so
    // fallback and live values do not silently disagree.
    async function _fetchWorldBankInflation() {
        try {
            const url = 'https://api.worldbank.org/v2/country/US/indicator/FP.CPI.TOTL.ZG?format=json&mrv=2&per_page=1';
            const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) return;
            const json = await res.json();
            const data = json[1];
            if (Array.isArray(data) && data.length > 0 && data[0].value != null) {
                state.inflationRate = Math.round(data[0].value * 10) / 10;
                state.assetReturns.inflation = state.inflationRate;
                // Note: World Bank CPI is an annual figure; do not stamp it as "checked today".
            }
        } catch (_) {
            // Use baseline value silently
        }
    }

    async function _fetchCoinGeckoBitcoin() {
        try {
            const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true';
            const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!res.ok) return;
            const json = await res.json();
            if (json.bitcoin && json.bitcoin.usd) {
                state.bitcoinPrice = json.bitcoin.usd;
                if (json.bitcoin.usd_24h_change != null) {
                    state.bitcoin_1yr_return = null; // 24h change not useful for annual comparison
                }
                state.assetReturns.bitcoin = state.bitcoinPrice;
            }
        } catch (_) {
            // Use null silently
        }
    }

    // ─── Inject banner CSS if not already present ─────────────────────────────
    function _injectCSS() {
        if (document.getElementById('fsa-live-data-css')) return;
        const style = document.createElement('style');
        style.id = 'fsa-live-data-css';
        style.textContent = `
        .fsa-live-banner {
            background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03));
            border: 1.5px solid rgba(16,185,129,0.3);
            border-radius: 12px;
            padding: 1.25rem 1.5rem;
            margin: 1.5rem 0;
        }
        .fsa-live-banner__header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #10b981;
            margin-bottom: 1rem;
        }
        .fsa-live-banner__dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #10b981;
            animation: fsa-pulse 2s infinite;
        }
        @keyframes fsa-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }
        .fsa-live-banner__date {
            margin-left: auto;
            font-weight: 400;
            color: rgba(255,255,255,0.4);
            text-transform: none;
            letter-spacing: 0;
        }
        .fsa-live-banner__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
        }
        .fsa-live-item {
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            padding: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .fsa-live-item__icon { font-size: 1.25rem; }
        .fsa-live-item__label {
            font-size: 0.7rem;
            color: rgba(255,255,255,0.5);
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }
        .fsa-live-item__value {
            font-size: 1.1rem;
            font-weight: 700;
            color: #10b981;
            font-family: monospace;
        }
        [data-fsa-live] {
            color: #10b981;
            font-weight: 700;
        }
        `;
        document.head.appendChild(style);
    }

    // ─── Boot ─────────────────────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { _injectCSS(); _fetchAll(); });
    } else {
        _injectCSS();
        _fetchAll();
    }

})();
