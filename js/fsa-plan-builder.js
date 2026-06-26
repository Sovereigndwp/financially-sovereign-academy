/**
 * FSA Financial Plan Builder
 * @version 1.0.0
 * @description Persistent cross-module financial plan.
 *   Each module contributes decisions that accumulate into a usable plan.
 *   Stored in localStorage under 'fsa-my-plan'.
 *
 * Usage:
 *   FSAPlan.set(moduleId, key, value)   — save a decision
 *   FSAPlan.get(moduleId, key)          — retrieve a decision
 *   FSAPlan.getAll()                    — retrieve full plan object
 *   FSAPlan.renderWidget(containerId, moduleId, fields) — render input widget
 *   FSAPlan.renderSummary(containerId)  — render full plan summary (Module 10)
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'fsa-my-plan';
    const VERSION = '1.0';

    // Budget method descriptions — shown below the select when an option is chosen
    const BUDGET_METHOD_HELP = {
        '50/30/20 Rule': "A simple rule of thumb that splits income into three buckets: about 50% for needs, 30% for wants, and 20% for savings or debt payoff. Example: if you bring home $2,000, you might plan $1,000 for needs, $600 for wants, and $400 for savings or debt.",
        'Pay Yourself First': "You set aside money for savings or debt payoff before spending on anything else. Example: when you get paid, you move $100 to savings first, then build the rest of your spending plan around what is left.",
        'Zero-Based Budget': "You give every dollar a job before the month begins, so income minus planned spending equals zero. Zero does not mean you spend everything. Savings, debt payoff, and giving are also jobs. Example: if you bring home $2,000, you assign all $2,000 across rent, food, bills, savings, debt, and spending.",
        'Envelope Method': "You divide money into categories, like groceries, gas, rent, and fun money. When a category runs out, you pause spending in that category or move money from another one. This can be done with cash envelopes or digital buckets. Example: if groceries has $300 for the month, each grocery trip comes out of that bucket.",
        'Still deciding': "Not sure yet? You can choose a method now and change it later. The guide above explains each option so you can compare them."
    };

    // Methods shown in the always-visible 'What does each method mean?' guide (Module 1 budget choice only)
    const BUDGET_METHOD_GUIDE_ORDER = ['50/30/20 Rule', 'Pay Yourself First', 'Zero-Based Budget', 'Envelope Method'];

    // Module field definitions — what each module contributes to the plan
    const MODULE_FIELDS = {
        1: {
            label: 'Money Mindset & Cash Flow',
            icon: '💰',
            fields: [
                { key: 'monthlyIncome', label: 'Monthly take-home income', type: 'currency', placeholder: 'e.g. 3500' },
                { key: 'fixedExpenses', label: 'Fixed monthly expenses (rent, bills, etc.)', type: 'currency', placeholder: 'e.g. 1800' },
                { key: 'savingsFirst', label: '% of income to pay yourself first', type: 'percent', placeholder: 'e.g. 10' },
                { key: 'budgetMethod', label: 'Budget method I will use', type: 'select',
                  options: ['50/30/20 Rule', 'Pay Yourself First', 'Zero-Based Budget', 'Envelope Method', 'Still deciding'] }
            ]
        },
        2: {
            label: 'Emergency Funds & Saving',
            icon: '🛡️',
            fields: [
                { key: 'emergencyMonths', label: 'Emergency fund target (months of expenses)', type: 'select',
                  options: ['3 months', '6 months', '9 months', '12 months'] },
                { key: 'currentEmergencyFund', label: 'My current emergency fund balance', type: 'currency', placeholder: 'e.g. 500' },
                { key: 'monthlySavingsAmount', label: 'Amount I will save each month', type: 'currency', placeholder: 'e.g. 200' },
                { key: 'savingsAccount', label: 'Where I will save (account type)', type: 'select',
                  options: ['High-Yield Savings (HYSA)', 'Regular Savings', 'Money Market', 'Still researching'] }
            ]
        },
        3: {
            label: 'Banking',
            icon: '🏦',
            fields: [
                { key: 'bankType', label: 'Banking setup I will use', type: 'select',
                  options: ['Online bank + HYSA', 'Credit union', 'Traditional bank + HYSA', 'Multiple banks (segmented)', 'Still deciding'] },
                { key: 'checkingGoal', label: 'Checking account buffer I will maintain', type: 'currency', placeholder: 'e.g. 1000' },
                { key: 'automatePayments', label: 'Will I automate bill payments?', type: 'select',
                  options: ['Yes, automate everything', 'Partially automate', 'No, prefer manual control'] }
            ]
        },
        4: {
            label: 'Credit Scores',
            icon: '📊',
            fields: [
                { key: 'currentCreditScore', label: 'My current credit score range', type: 'select',
                  options: ['300–579 (Poor)', '580–669 (Fair)', '670–739 (Good)', '740–799 (Very Good)', '800+ (Exceptional)', 'Don\'t know yet'] },
                { key: 'creditScoreTarget', label: 'My credit score target', type: 'select',
                  options: ['670+ (Good)', '740+ (Very Good)', '800+ (Exceptional)'] },
                { key: 'creditAction', label: 'Next action I will take for my credit', type: 'select',
                  options: ['Pay down credit utilization', 'Pay bills on time consistently', 'Dispute errors on report', 'Open secured card to build credit', 'Nothing needed right now'] }
            ]
        },
        5: {
            label: 'Debt Strategy',
            icon: '🎯',
            fields: [
                { key: 'totalDebt', label: 'My total debt (non-mortgage)', type: 'currency', placeholder: 'e.g. 8500' },
                { key: 'highestAPR', label: 'My highest debt interest rate', type: 'percent', placeholder: 'e.g. 24' },
                { key: 'debtStrategy', label: 'Debt payoff method I will use', type: 'select',
                  options: ['Avalanche (highest APR first)', 'Snowball (smallest balance first)', 'Hybrid (snowball to start, then avalanche)', 'Consolidation/refinancing'] },
                { key: 'monthlyDebtPayment', label: 'Extra monthly amount toward debt', type: 'currency', placeholder: 'e.g. 300' }
            ]
        },
        6: {
            label: 'Taxes & Paychecks',
            icon: '🧾',
            fields: [
                { key: 'filingStatus', label: 'My tax filing status', type: 'select',
                  options: ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household'] },
                { key: 'annualIncome', label: 'My approximate annual gross income', type: 'currency', placeholder: 'e.g. 55000' },
                { key: 'taxAction', label: 'Tax optimization I will implement', type: 'select',
                  options: ['Maximize 401(k) contribution', 'Open/max Roth IRA', 'Use HSA if eligible', 'Track deductible expenses', 'Consult a tax professional'] }
            ]
        },
        7: {
            label: 'Investing',
            icon: '📈',
            fields: [
                { key: 'investingStrategy', label: 'My investment strategy', type: 'select',
                  options: ['Index funds (passive)', 'Three-fund portfolio', 'Target-date fund', 'Mix of index + individual stocks', 'Still learning'] },
                { key: 'monthlyInvestment', label: 'Amount I will invest each month', type: 'currency', placeholder: 'e.g. 300' },
                { key: 'stockBondSplit', label: 'My target stock/bond allocation', type: 'select',
                  options: ['100% stocks (aggressive)', '80/20 stocks/bonds', '60/40 stocks/bonds', '50/50 stocks/bonds', 'Still deciding'] },
                { key: 'investmentAccount', label: 'Where I will invest', type: 'select',
                  options: ['401(k) first, then IRA', 'Roth IRA only', '401(k) only', 'Taxable brokerage', 'Multiple accounts'] }
            ]
        },
        8: {
            label: 'Risk & Insurance',
            icon: '🔒',
            fields: [
                { key: 'healthInsurance', label: 'My health insurance status', type: 'select',
                  options: ['Covered through employer', 'ACA marketplace plan', 'Medicaid / CHIP', 'COBRA', 'No coverage (action needed)'] },
                { key: 'lifeInsurance', label: 'Life insurance I have or need', type: 'select',
                  options: ['Term life — adequate', 'Term life — need more', 'Whole life (reconsidering)', 'No dependents — not needed', 'No coverage — need to act'] },
                { key: 'insuranceGap', label: 'Biggest insurance gap to address', type: 'select',
                  options: ['Disability insurance', 'Umbrella policy', 'Life insurance', 'Renters/homeowners insurance', 'No major gaps'] }
            ]
        },
        9: {
            label: 'Consumer Protection',
            icon: '🛡️',
            fields: [
                { key: 'creditFreeze', label: 'Credit freeze status', type: 'select',
                  options: ['Frozen at all 3 bureaus', 'Partially frozen', 'Not frozen — will do this today', 'Decided not to freeze'] },
                { key: 'passwordManager', label: 'Password manager status', type: 'select',
                  options: ['Using one — all accounts', 'Using one — some accounts', 'Using browser passwords', 'Will set one up today'] },
                { key: 'consumerAction', label: 'Consumer protection action I will take', type: 'select',
                  options: ['Freeze credit today', 'Set up password manager', 'Dispute an error on credit report', 'Set up transaction alerts', 'Already protected'] }
            ]
        },
        10: {
            label: 'Financial Master Plan',
            icon: '🗺️',
            fields: [
                { key: 'primaryGoal', label: 'My #1 financial goal', type: 'select',
                  options: ['Pay off debt', 'Build emergency fund', 'Save for house', 'Retire early', 'Invest consistently', 'Achieve financial independence'] },
                { key: 'nextAction', label: 'The single most important action I will take this week', type: 'text',
                  placeholder: 'e.g. Open a HYSA account and transfer $500' },
                { key: 'reviewFrequency', label: 'How often I will review my financial plan', type: 'select',
                  options: ['Weekly', 'Monthly', 'Quarterly', 'Annually'] }
            ]
        }
    };

    // ─── Storage helpers ──────────────────────────────────────────────────────
    function _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return _fresh();
            const parsed = JSON.parse(raw);
            if (parsed.version !== VERSION) return _fresh();
            return parsed;
        } catch (_) { return _fresh(); }
    }

    function _fresh() {
        return { version: VERSION, updatedAt: null, modules: {} };
    }

    function _save(plan) {
        plan.updatedAt = new Date().toISOString().split('T')[0];
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(plan)); } catch (_) {}
    }

    // ─── Public API ──────────────────────────────────────────────────────────
    window.FSAPlan = {
        set(moduleId, key, value) {
            const plan = _load();
            if (!plan.modules[moduleId]) plan.modules[moduleId] = {};
            plan.modules[moduleId][key] = value;
            _save(plan);
        },

        get(moduleId, key) {
            const plan = _load();
            return plan.modules[moduleId]?.[key] ?? null;
        },

        getAll() { return _load(); },

        completedModules() {
            const plan = _load();
            return Object.keys(plan.modules).map(Number);
        },

        /** Renders a "My Plan" input widget into containerId for a given moduleId */
        renderWidget(containerId, moduleId) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const def = MODULE_FIELDS[moduleId];
            if (!def) return;
            const plan = _load();
            const saved = plan.modules[moduleId] || {};

            const fieldHTML = def.fields.map(f => {
                const val = saved[f.key] || '';
                if (f.type === 'select') {
                    const opts = f.options.map(o =>
                        `<option value="${o}" ${o === val ? 'selected' : ''}>${o}</option>`
                    ).join('');
                    const helpId = 'fsa-plan-help-' + moduleId + '-' + f.key;
                    const needsHelper = (f.key === 'budgetMethod');
                    const initialHelp = (needsHelper && val && BUDGET_METHOD_HELP[val]) ? BUDGET_METHOD_HELP[val] : '';
                    const methodsGuide = needsHelper ? (
                        '<details class="fsa-plan-methods-guide">'
                        + '<summary>What does each budget method mean?</summary>'
                        + '<dl>' + BUDGET_METHOD_GUIDE_ORDER.map(function (m) {
                            return '<dt>' + m + '</dt><dd>' + BUDGET_METHOD_HELP[m] + '</dd>';
                        }).join('') + '</dl>'
                        + '</details>'
                    ) : '';
                    return `<div class="fsa-plan-field">
                        <label class="fsa-plan-label">${f.label}</label>
                        ${methodsGuide}
                        <select class="fsa-plan-input" data-plan-module="${moduleId}" data-plan-key="${f.key}"
                            ${needsHelper ? 'data-plan-helper="' + helpId + '"' : ''}>
                            <option value="">Choose...</option>${opts}
                        </select>
                        ${needsHelper ? '<div class="fsa-plan-method-help" id="' + helpId + '">' + initialHelp + '</div>' : ''}
                    </div>`;
                } else if (f.type === 'currency') {
                    return `<div class="fsa-plan-field">
                        <label class="fsa-plan-label">${f.label}</label>
                        <div class="fsa-plan-currency-wrap">
                            <span class="fsa-plan-currency-symbol">$</span>
                            <input type="number" class="fsa-plan-input fsa-plan-currency" min="0"
                                data-plan-module="${moduleId}" data-plan-key="${f.key}"
                                placeholder="${f.placeholder || ''}" value="${val}">
                        </div>
                    </div>`;
                } else if (f.type === 'percent') {
                    return `<div class="fsa-plan-field">
                        <label class="fsa-plan-label">${f.label}</label>
                        <div class="fsa-plan-currency-wrap">
                            <input type="number" class="fsa-plan-input" min="0" max="100"
                                data-plan-module="${moduleId}" data-plan-key="${f.key}"
                                placeholder="${f.placeholder || ''}" value="${val}">
                            <span class="fsa-plan-currency-symbol" style="left:auto;right:12px;">%</span>
                        </div>
                    </div>`;
                } else {
                    return `<div class="fsa-plan-field">
                        <label class="fsa-plan-label">${f.label}</label>
                        <input type="text" class="fsa-plan-input"
                            data-plan-module="${moduleId}" data-plan-key="${f.key}"
                            placeholder="${f.placeholder || ''}" value="${val}">
                    </div>`;
                }
            }).join('');

            const completed = Object.keys(saved).length > 0;
            el.innerHTML = `
                <div class="fsa-plan-widget">
                    <div class="fsa-plan-widget__header">
                        <span class="fsa-plan-widget__icon">${def.icon}</span>
                        <div>
                            <div class="fsa-plan-widget__title">My Plan: ${def.label}</div>
                            <div class="fsa-plan-widget__subtitle">These decisions stay with you across all modules</div>
                        </div>
                        ${completed ? '<span class="fsa-plan-badge">✓ Saved</span>' : ''}
                    </div>
                    <div class="fsa-plan-fields">${fieldHTML}</div>
                    <div style="display:flex; gap:1rem; align-items:center; margin-top:1rem; flex-wrap:wrap;">
                        <button class="fsa-plan-save-btn" onclick="FSAPlan._saveWidget(${moduleId}, this)">
                            Save My Decisions
                        </button>
                        <a href="/modules/financial-master-plan.html?from=${_moduleSlug(moduleId)}" style="font-size:0.85rem; color:#10b981; text-decoration:none;">
                            View My Full Plan →
                        </a>
                    </div>
                    <div class="fsa-plan-saved-msg" id="fsa-plan-msg-${moduleId}" style="display:none; margin-top:0.75rem; color:#10b981; font-size:0.9rem;">
                        ✓ Saved! This updates your Financial Master Plan in Module 10.
                    </div>
                </div>`;

            // Wire up budget method helper descriptions
            _wireBudgetHelpers();
        },

        _saveWidget(moduleId, btn) {
            const inputs = document.querySelectorAll(`[data-plan-module="${moduleId}"]`);
            inputs.forEach(input => {
                const key = input.getAttribute('data-plan-key');
                const value = input.value.trim();
                if (key && value) { window.FSAPlan.set(moduleId, key, value); }
            });
            // Show confirmation
            const msg = document.getElementById(`fsa-plan-msg-${moduleId}`);
            if (msg) {
                msg.style.display = 'block';
                setTimeout(() => { msg.style.display = 'none'; }, 3000);
            }

            // Wire up budget method helper after save in case DOM re-rendered
            _wireBudgetHelpers();
            // Update badge
            if (btn && btn.closest) {
                const header = btn.closest('.fsa-plan-widget')?.querySelector('.fsa-plan-widget__header');
                if (header && !header.querySelector('.fsa-plan-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'fsa-plan-badge';
                    badge.textContent = '✓ Saved';
                    header.appendChild(badge);
                }
            }
        },

        /** Renders the full plan summary — used in Module 10 */
        renderSummary(containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const plan = _load();
            const completedCount = Object.keys(plan.modules).length;

            if (completedCount === 0) {
                el.innerHTML = `<div class="fsa-plan-summary-empty">
                    <p>You haven't filled in your plan yet.</p>
                    <p>Go through modules 1–9 and complete the "My Plan" section in each one. Your decisions will appear here automatically.</p>
                </div>`;
                return;
            }

            const sections = Object.entries(MODULE_FIELDS).map(([id, def]) => {
                const saved = plan.modules[id];
                if (!saved || Object.keys(saved).length === 0) {
                    return `<div class="fsa-plan-section fsa-plan-section--empty">
                        <div class="fsa-plan-section__header">
                            <span>${def.icon}</span> ${def.label}
                            <span class="fsa-plan-section__status fsa-plan-section__status--pending">Not filled</span>
                        </div>
                        <a href="/modules/${_moduleSlug(Number(id))}.html" class="fsa-plan-section__link">Complete this module →</a>
                    </div>`;
                }
                const items = def.fields.map(f => {
                    const v = saved[f.key];
                    if (!v) return '';
                    const display = (f.type === 'currency') ? '$' + Number(v).toLocaleString() :
                                    (f.type === 'percent') ? v + '%' : v;
                    return `<div class="fsa-plan-item">
                        <span class="fsa-plan-item__label">${f.label}</span>
                        <span class="fsa-plan-item__value">${display}</span>
                    </div>`;
                }).filter(Boolean).join('');

                return `<div class="fsa-plan-section">
                    <div class="fsa-plan-section__header">
                        <span>${def.icon}</span> ${def.label}
                        <span class="fsa-plan-section__status">✓ Complete</span>
                    </div>
                    ${items}
                </div>`;
            }).join('');

            const exportData = _buildExportText(plan);

            el.innerHTML = `
                <div class="fsa-plan-summary">
                    <div class="fsa-plan-summary__header">
                        <h3>My Financial Plan</h3>
                        <div class="fsa-plan-progress-bar">
                            <div class="fsa-plan-progress-fill" style="width:${completedCount * 10}%"></div>
                        </div>
                        <p>${completedCount}/10 modules completed · Last updated: ${plan.updatedAt || 'never'}</p>
                    </div>
                    <div class="fsa-plan-sections">${sections}</div>
                    <div class="fsa-plan-export">
                        <h4>Export Your Plan</h4>
                        <textarea class="fsa-plan-export-text" readonly rows="8">${exportData}</textarea>
                        <div style="display:flex; gap:1rem; margin-top:0.75rem; flex-wrap:wrap;">
                            <button class="fsa-plan-save-btn" onclick="FSAPlan._copyPlan(this)">Copy to Clipboard</button>
                            <button class="fsa-plan-save-btn" style="background:transparent; border:2px solid #10b981; color:#10b981;"
                                onclick="FSAPlan._downloadPlan()">Download as Text</button>
                            <button class="fsa-plan-save-btn" style="background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.5); color:#ef4444;"
                                onclick="FSAPlan._resetPlan()">Reset Plan</button>
                        </div>
                    </div>
                </div>`;
        },

        _copyPlan(btn) {
            const ta = btn.closest('.fsa-plan-export')?.querySelector('textarea');
            if (!ta) return;
            navigator.clipboard.writeText(ta.value).then(() => {
                const orig = btn.textContent;
                btn.textContent = '✓ Copied!';
                setTimeout(() => btn.textContent = orig, 2000);
            });
        },

        _downloadPlan() {
            const plan = _load();
            const text = _buildExportText(plan);
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'my-financial-plan.txt';
            a.click();
        },

        _resetPlan() {
            if (!confirm('Reset your financial plan? This cannot be undone.')) return;
            try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
            window.location.reload();
        }
    };

    function _wireBudgetHelpers() {
        document.querySelectorAll('[data-plan-helper]').forEach(function(sel) {
            if (sel._fsaPlanHelperBound) return;
            sel._fsaPlanHelperBound = true;
            sel.addEventListener('change', function() {
                var helpDiv = document.getElementById(sel.getAttribute('data-plan-helper'));
                if (helpDiv) helpDiv.textContent = BUDGET_METHOD_HELP[sel.value] || '';
            });
        });
    }

    function _moduleSlug(id) {
        const slugs = {
            1: 'money-mindset-cash-flow', 2: 'emergency-funds-saving',
            3: 'banking-basics', 4: 'credit-scores', 5: 'debt-strategy',
            6: 'taxes-paychecks', 7: 'investing-fundamentals',
            8: 'risk-insurance', 9: 'consumer-protection', 10: 'financial-master-plan'
        };
        return slugs[id] || '';
    }

    function _buildExportText(plan) {
        let out = `MY FINANCIAL PLAN\nCreated with Financially Sovereign Academy\nLast updated: ${plan.updatedAt || 'N/A'}\n`;
        out += '='.repeat(50) + '\n\n';
        Object.entries(MODULE_FIELDS).forEach(([id, def]) => {
            const saved = plan.modules[id];
            if (!saved || Object.keys(saved).length === 0) return;
            out += `${def.icon} ${def.label.toUpperCase()}\n`;
            def.fields.forEach(f => {
                const v = saved[f.key];
                if (!v) return;
                const display = (f.type === 'currency') ? '$' + Number(v).toLocaleString() :
                                (f.type === 'percent') ? v + '%' : v;
                out += `  • ${f.label}: ${display}\n`;
            });
            out += '\n';
        });
        out += '='.repeat(50) + '\n';
        out += 'financiallysovereign.academy\n';
        return out;
    }

    // ─── Inject widget CSS ───────────────────────────────────────────────────
    function _injectCSS() {
        if (document.getElementById('fsa-plan-builder-css')) return;
        const style = document.createElement('style');
        style.id = 'fsa-plan-builder-css';
        style.textContent = `
        .fsa-plan-widget {
            background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.03));
            border: 2px solid rgba(16,185,129,0.35);
            border-radius: 16px;
            padding: 1.75rem;
            margin: 2.5rem 0;
        }
        .fsa-plan-widget__header {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        .fsa-plan-widget__icon { font-size: 2rem; flex-shrink: 0; }
        .fsa-plan-widget__title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #10b981;
        }
        .fsa-plan-widget__subtitle {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.5);
            margin-top: 0.25rem;
        }
        .fsa-plan-badge {
            margin-left: auto;
            background: rgba(16,185,129,0.15);
            color: #10b981;
            border: 1px solid rgba(16,185,129,0.3);
            border-radius: 999px;
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 600;
            flex-shrink: 0;
        }
        .fsa-plan-fields {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1rem;
        }
        .fsa-plan-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .fsa-plan-label {
            font-size: 0.82rem;
            color: rgba(255,255,255,0.65);
            font-weight: 500;
        }
        .fsa-plan-input {
            background: rgba(0,0,0,0.3);
            border: 1.5px solid rgba(16,185,129,0.25);
            border-radius: 8px;
            color: #fff;
            padding: 0.6rem 0.75rem;
            font-size: 0.95rem;
            width: 100%;
            transition: border-color 0.2s;
        }
        .fsa-plan-input:focus {
            outline: none;
            border-color: #10b981;
        }
        select.fsa-plan-input option { background: #1a2e22; }
        .fsa-plan-currency-wrap { position: relative; }
        .fsa-plan-currency-symbol {
            position: absolute;
            left: 10px; top: 50%;
            transform: translateY(-50%);
            color: rgba(255,255,255,0.4);
            font-size: 0.9rem;
        }
        .fsa-plan-currency { padding-left: 1.5rem; }
        .fsa-plan-save-btn {
            background: #10b981;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 0.65rem 1.5rem;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .fsa-plan-save-btn:hover { background: #059669; }

        /* Summary styles */
        .fsa-plan-summary { display: flex; flex-direction: column; gap: 1.5rem; }
        .fsa-plan-summary__header { margin-bottom: 0.5rem; }
        .fsa-plan-summary__header h3 { font-size: 1.5rem; color: #10b981; margin-bottom: 0.75rem; }
        .fsa-plan-progress-bar {
            background: rgba(255,255,255,0.1);
            border-radius: 999px;
            height: 8px;
            margin-bottom: 0.5rem;
        }
        .fsa-plan-progress-fill {
            background: linear-gradient(90deg, #10b981, #34d399);
            height: 100%;
            border-radius: 999px;
            transition: width 0.5s ease;
        }
        .fsa-plan-sections { display: flex; flex-direction: column; gap: 1rem; }
        .fsa-plan-section {
            background: rgba(0,0,0,0.2);
            border: 1.5px solid rgba(16,185,129,0.2);
            border-radius: 12px;
            padding: 1.25rem;
        }
        .fsa-plan-section--empty {
            border-color: rgba(255,255,255,0.1);
            opacity: 0.6;
        }
        .fsa-plan-section__header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 0.75rem;
            flex-wrap: wrap;
        }
        .fsa-plan-section__status {
            margin-left: auto;
            font-size: 0.8rem;
            font-weight: 600;
            color: #34d399;
        }
        .fsa-plan-section__status--pending { color: rgba(255,255,255,0.3); }
        .fsa-plan-section__link {
            font-size: 0.85rem;
            color: #10b981;
            text-decoration: none;
        }
        .fsa-plan-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 0.4rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            gap: 1rem;
            flex-wrap: wrap;
        }
        .fsa-plan-item:last-child { border-bottom: none; }
        .fsa-plan-item__label { font-size: 0.85rem; color: rgba(255,255,255,0.6); }
        .fsa-plan-item__value { font-size: 0.95rem; font-weight: 600; color: #fff; }
        .fsa-plan-export {
            background: rgba(0,0,0,0.2);
            border-radius: 12px;
            padding: 1.5rem;
        }
        .fsa-plan-export h4 { color: #10b981; margin-bottom: 0.75rem; }
        .fsa-plan-export-text {
            width: 100%;
            background: rgba(0,0,0,0.3);
            border: 1.5px solid rgba(16,185,129,0.2);
            border-radius: 8px;
            color: rgba(255,255,255,0.8);
            padding: 1rem;
            font-family: monospace;
            font-size: 0.8rem;
            resize: vertical;
        }
        .fsa-plan-summary-empty {
            padding: 2rem;
            text-align: center;
            color: rgba(255,255,255,0.5);
        }
        .fsa-plan-methods-guide {
            margin: 0.1rem 0 0.2rem;
            font-size: 0.82rem;
        }
        .fsa-plan-methods-guide > summary {
            cursor: pointer;
            color: #34d399;
            font-weight: 600;
            list-style: none;
            padding: 0.35rem 0;
        }
        .fsa-plan-methods-guide > summary::-webkit-details-marker { display: none; }
        .fsa-plan-methods-guide > summary::before {
            content: '\\25B8';
            display: inline-block;
            margin-right: 0.4rem;
            transition: transform 0.2s;
        }
        .fsa-plan-methods-guide[open] > summary::before { transform: rotate(90deg); }
        .fsa-plan-methods-guide dl {
            margin: 0.35rem 0 0;
            padding: 0.6rem 0.85rem;
            background: rgba(16,185,129,0.06);
            border-left: 3px solid rgba(16,185,129,0.4);
            border-radius: 0 6px 6px 0;
        }
        .fsa-plan-methods-guide dt {
            font-weight: 700;
            color: #fff;
            margin-top: 0.55rem;
        }
        .fsa-plan-methods-guide dt:first-child { margin-top: 0; }
        .fsa-plan-methods-guide dd {
            margin: 0.15rem 0 0;
            color: rgba(255,255,255,0.72);
            line-height: 1.5;
        }
        .fsa-plan-method-help {
            font-size: 0.8rem;
            color: rgba(16,185,129,0.85);
            background: rgba(16,185,129,0.08);
            border-left: 3px solid rgba(16,185,129,0.4);
            padding: 0.5rem 0.75rem;
            border-radius: 0 6px 6px 0;
            margin-top: 0.4rem;
            min-height: 1.6rem;
            line-height: 1.5;
            transition: opacity 0.2s;
        }
        .fsa-plan-method-help:empty {
            display: none;
        }
        `;
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _injectCSS);
    } else {
        _injectCSS();
    }

})();
