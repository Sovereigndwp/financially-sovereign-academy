/**
 * The Sovereignty Path — Ladder Engine
 *
 * Maps FSA's 10 modules to 6 rungs of the sovereignty path.
 * Reads progress from FSAProgressManager (localStorage).
 * Provides full and compact render modes.
 *
 * @version 1.0.0
 */

(function () {
    'use strict';

    /* ================================================================
       RUNG DEFINITIONS
       ================================================================ */

    var RUNGS = [
        {
            id: 1,
            title: 'Stop the Bleeding',
            icon: '🩸',
            desc: 'Know where your money goes. You can\'t fix what you can\'t see.',
            modules: [1],
            unlocks: 'Clarity on your cash flow — the single most important first step.'
        },
        {
            id: 2,
            title: 'Build Your Floor',
            icon: '🧱',
            desc: 'Emergency fund and banking basics. One bad month won\'t destroy you.',
            modules: [2, 3],
            unlocks: 'A buffer between you and disaster. You can breathe.'
        },
        {
            id: 3,
            title: 'Break the Chains',
            icon: '⛓️‍💥',
            desc: 'Credit and debt under your control, not the other way around.',
            modules: [4, 5],
            unlocks: 'Debt stops running your life. Credit becomes a tool, not a trap.'
        },
        {
            id: 4,
            title: 'Make It Grow',
            icon: '🌱',
            desc: 'Taxes, investing, and compound time. Your money starts working for you.',
            modules: [6, 7],
            unlocks: 'Your money works while you sleep. Time becomes your ally.'
        },
        {
            id: 5,
            title: 'Lock It Down',
            icon: '🔒',
            desc: 'Insurance, scam-proofing, and protection. What you built can\'t be easily taken.',
            modules: [8, 9],
            unlocks: 'Resilience. Bad actors and bad luck can\'t wipe out your progress.'
        },
        {
            id: 6,
            title: 'Live Free',
            icon: '🏔️',
            desc: 'Your plan, your terms. Work because you want to, not because you have to.',
            modules: [10],
            unlocks: 'Financial sovereignty. This is the summit.'
        }
    ];

    var MODULE_INFO = [
        { id: 1, name: 'Money Mindset & Cash Flow', slug: 'money-mindset-cash-flow', file: 'money-mindset-cash-flow.html', time: '20-30 min' },
        { id: 2, name: 'Emergency Funds & Saving', slug: 'emergency-funds-saving', file: 'emergency-funds-saving.html', time: '25 min' },
        { id: 3, name: 'Banking Without Getting Robbed', slug: 'banking-basics', file: 'banking-basics.html', time: '20 min' },
        { id: 4, name: 'Credit Scores Decoded', slug: 'credit-scores', file: 'credit-scores.html', time: '25 min' },
        { id: 5, name: 'Debt Strategy', slug: 'debt-strategy', file: 'debt-strategy.html', time: '30 min' },
        { id: 6, name: 'Taxes & Paychecks Demystified', slug: 'taxes-paychecks', file: 'taxes-paychecks.html', time: '25 min' },
        { id: 7, name: 'Investing for Humans', slug: 'investing-fundamentals', file: 'investing-fundamentals.html', time: '35 min' },
        { id: 8, name: 'Protect What You\'ve Built', slug: 'risk-insurance', file: 'risk-insurance.html', time: '25 min' },
        { id: 9, name: 'Don\'t Get Scammed', slug: 'consumer-protection', file: 'consumer-protection.html', time: '20 min' },
        { id: 10, name: 'Your Financial Master Plan', slug: 'financial-master-plan', file: 'financial-master-plan.html', time: '30 min' }
    ];

    /* ================================================================
       PROGRESS HELPERS
       ================================================================ */

    function getProgressManager() {
        if (window.FSAProgressManager) {
            var pm = new window.FSAProgressManager();
            pm.init();
            return pm;
        }
        return null;
    }

    function getModuleStatus(pm, moduleId) {
        if (!pm) return 'not-started';
        var data = pm.getModuleData(moduleId);
        if (!data) return 'not-started';
        if (data.completed) return 'completed';
        if (data.visited) return 'visited';
        return 'not-started';
    }

    function getRungStatus(pm, rung) {
        var statuses = rung.modules.map(function (mid) {
            return getModuleStatus(pm, mid);
        });

        var allComplete = statuses.every(function (s) { return s === 'completed'; });
        var anyStarted = statuses.some(function (s) { return s !== 'not-started'; });

        if (allComplete) return 'complete';
        if (anyStarted) return 'active';
        return 'locked';
    }

    function getActiveRungIndex(pm) {
        for (var i = 0; i < RUNGS.length; i++) {
            var status = getRungStatus(pm, RUNGS[i]);
            if (status === 'active') return i;
            if (status === 'locked') return Math.max(0, i);
        }
        return RUNGS.length - 1; // all complete
    }

    function getOverallProgress(pm) {
        if (!pm) return { completed: 0, total: 10, percentage: 0 };
        var completed = 0;
        for (var i = 1; i <= 10; i++) {
            if (getModuleStatus(pm, i) === 'completed') completed++;
        }
        return {
            completed: completed,
            total: 10,
            percentage: Math.round((completed / 10) * 100)
        };
    }

    function getRungProgress(pm, rung) {
        var completed = 0;
        rung.modules.forEach(function (mid) {
            if (getModuleStatus(pm, mid) === 'completed') completed++;
        });
        return {
            completed: completed,
            total: rung.modules.length,
            percentage: rung.modules.length > 0 ? Math.round((completed / rung.modules.length) * 100) : 0
        };
    }

    /* ================================================================
       MODULE PATH HELPER
       ================================================================ */

    function getModulePath(file) {
        // Detect if we're on a module page or root
        if (window.location.pathname.indexOf('/modules/') !== -1) {
            return file;
        }
        return 'modules/' + file;
    }

    /* ================================================================
       FULL LADDER RENDER
       ================================================================ */

    function renderLadder(containerId, options) {
        var container = document.getElementById(containerId);
        if (!container) return;

        options = options || {};
        var showTitle = options.showTitle !== false;
        var expanded = options.expanded || false;
        var pm = getProgressManager();
        var activeIdx = getActiveRungIndex(pm);
        var overall = getOverallProgress(pm);

        // Calculate progress spine height
        var completedRungs = 0;
        RUNGS.forEach(function (r) {
            if (getRungStatus(pm, r) === 'complete') completedRungs++;
        });
        var spinePercent = RUNGS.length > 1
            ? Math.round((completedRungs / (RUNGS.length - 1)) * 100)
            : 0;

        var html = '<div class="sovereignty-path">';

        if (showTitle) {
            html += '<h2 class="sovereignty-path-title">The Sovereignty Path</h2>';
            html += '<p class="sovereignty-path-subtitle">6 steps from surviving to sovereign. Where are you?</p>';
        }

        html += '<div class="sp-ladder' + (expanded ? ' journey-ladder' : '') + '" style="--sp-progress-height: ' + spinePercent + '%;">';

        RUNGS.forEach(function (rung, idx) {
            var status = getRungStatus(pm, rung);
            var rungProg = getRungProgress(pm, rung);

            // First rung is never locked — always accessible
            if (idx === 0 && status === 'locked') status = 'active';

            // Mark first incomplete rung as active if nothing is active yet
            if (status === 'locked' && idx <= activeIdx + 1) {
                // Allow one rung ahead to be unlocked for exploration
            }

            html += '<div class="sp-rung ' + status + '">';

            // Number circle
            html += '<div class="sp-rung-number">';
            if (status === 'complete') {
                html += '✓';
            } else {
                html += (idx + 1);
            }
            html += '</div>';

            // Body
            html += '<div class="sp-rung-body">';

            // Title row
            html += '<div class="sp-rung-title">';
            html += '<span>' + rung.icon + '</span>';
            html += '<span>' + rung.title + '</span>';
            html += '<span class="sp-check">✓</span>';
            html += '<span class="sp-active-badge">You are here</span>';
            html += '</div>';

            // Description
            html += '<div class="sp-rung-desc">' + rung.desc + '</div>';

            // Module tags
            html += '<div class="sp-modules">';
            rung.modules.forEach(function (mid) {
                var mod = MODULE_INFO[mid - 1];
                var modStatus = getModuleStatus(pm, mid);
                html += '<a href="' + getModulePath(mod.file) + '" class="sp-module-tag ' + modStatus + '">';
                html += '<span class="sp-tag-dot"></span>';
                html += 'M' + mid + ': ' + mod.name;
                html += '</a>';
            });
            html += '</div>';

            // Expanded detail (for journey page)
            if (expanded) {
                html += '<div style="margin-top: 1rem;">';
                rung.modules.forEach(function (mid) {
                    var mod = MODULE_INFO[mid - 1];
                    var modStatus = getModuleStatus(pm, mid);
                    var modData = pm ? pm.getModuleData(mid) : null;
                    var statusIcon = modStatus === 'completed' ? '✓' : modStatus === 'visited' ? '◐' : '○';

                    html += '<div class="journey-module-detail">';
                    html += '<div class="journey-module-status ' + modStatus + '">' + statusIcon + '</div>';
                    html += '<div class="journey-module-name"><a href="' + getModulePath(mod.file) + '">Module ' + mid + ': ' + mod.name + '</a></div>';

                    if (modData && modData.completedAt) {
                        var date = new Date(modData.completedAt);
                        html += '<div class="journey-module-time">' + date.toLocaleDateString() + '</div>';
                    } else if (modData && modData.startedAt) {
                        html += '<div class="journey-module-time" style="color:#fbbf24;">Started</div>';
                    } else {
                        html += '<div class="journey-module-time">' + mod.time + '</div>';
                    }

                    html += '</div>';
                });
                html += '</div>';
            }

            // Progress bar within rung
            if (rungProg.total > 1 || status === 'active') {
                html += '<div class="sp-rung-progress">';
                html += '<div class="sp-rung-progress-fill" style="width: ' + rungProg.percentage + '%;"></div>';
                html += '</div>';
            }

            html += '</div>'; // .sp-rung-body
            html += '</div>'; // .sp-rung
        });

        html += '</div>'; // .sp-ladder
        html += '</div>'; // .sovereignty-path

        container.innerHTML = html;
    }

    /* ================================================================
       COMPACT RENDER — For module pages
       ================================================================ */

    function renderCompact(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var pm = getProgressManager();
        var currentModuleId = getCurrentModuleId();
        if (!currentModuleId) return;

        // Find which rung this module belongs to
        var currentRung = null;
        var rungIdx = -1;
        for (var i = 0; i < RUNGS.length; i++) {
            if (RUNGS[i].modules.indexOf(currentModuleId) !== -1) {
                currentRung = RUNGS[i];
                rungIdx = i;
                break;
            }
        }
        if (!currentRung) return;

        var overall = getOverallProgress(pm);
        var rungProg = getRungProgress(pm, currentRung);
        var journeyPath = window.location.pathname.indexOf('/modules/') !== -1 ? '../my-journey.html' : 'my-journey.html';

        var html = '<div class="sp-compact">';
        html += '<div class="sp-compact-icon">' + currentRung.icon + '</div>';
        html += '<div class="sp-compact-info">';
        html += '<div class="sp-compact-rung">Step ' + (rungIdx + 1) + ': ' + currentRung.title + '</div>';
        html += '<div class="sp-compact-module">Module ' + currentModuleId + ' of 10 · The Sovereignty Path</div>';
        html += '</div>';
        html += '<div class="sp-compact-progress"><div class="sp-compact-progress-fill" style="width: ' + overall.percentage + '%;"></div></div>';
        html += '<a href="' + journeyPath + '" class="sp-compact-link">My Journey →</a>';
        html += '</div>';

        container.innerHTML = html;
    }

    /* ================================================================
       JOURNEY HERO RENDER
       ================================================================ */

    function renderJourneyHero(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var pm = getProgressManager();
        var overall = getOverallProgress(pm);
        var activeIdx = getActiveRungIndex(pm);
        var activeRung = RUNGS[activeIdx];

        // Estimate remaining time
        var remainingMinutes = 0;
        MODULE_INFO.forEach(function (mod) {
            if (getModuleStatus(pm, mod.id) !== 'completed') {
                var mins = parseInt(mod.time) || 25;
                remainingMinutes += mins;
            }
        });
        var remainingHours = (remainingMinutes / 60).toFixed(1);

        var html = '<div class="journey-hero">';
        html += '<h1 class="journey-hero-title">Your Sovereignty Path</h1>';

        if (overall.completed === 0) {
            html += '<p class="journey-current-rung">Ready to start? Step 1: <strong>' + RUNGS[0].title + '</strong></p>';
        } else if (overall.completed === 10) {
            html += '<p class="journey-current-rung">You\'ve reached the summit. <strong>Live Free.</strong></p>';
        } else {
            html += '<p class="journey-current-rung">You\'re on Step ' + (activeIdx + 1) + ': <strong>' + activeRung.title + '</strong></p>';
        }

        html += '<div class="journey-stats">';
        html += '<div class="journey-stat"><div class="journey-stat-value">' + overall.completed + '/10</div><div class="journey-stat-label">Modules</div></div>';
        html += '<div class="journey-stat"><div class="journey-stat-value">' + overall.percentage + '%</div><div class="journey-stat-label">Complete</div></div>';

        var completedRungs = 0;
        RUNGS.forEach(function (r) {
            if (getRungStatus(pm, r) === 'complete') completedRungs++;
        });
        html += '<div class="journey-stat"><div class="journey-stat-value">' + completedRungs + '/6</div><div class="journey-stat-label">Steps</div></div>';

        if (overall.completed < 10) {
            html += '<div class="journey-stat"><div class="journey-stat-value">~' + remainingHours + 'h</div><div class="journey-stat-label">Remaining</div></div>';
        }

        html += '</div>'; // .journey-stats
        html += '</div>'; // .journey-hero

        container.innerHTML = html;
    }

    /* ================================================================
       AUTO-INJECT ON MODULE PAGES
       ================================================================ */

    function getCurrentModuleId() {
        var path = window.location.pathname;
        var file = path.substring(path.lastIndexOf('/') + 1);
        for (var i = 0; i < MODULE_INFO.length; i++) {
            if (MODULE_INFO[i].file === file) return MODULE_INFO[i].id;
        }
        return null;
    }

    function autoInjectCompact() {
        // Only on module pages
        if (window.location.pathname.indexOf('/modules/') === -1) return;

        var moduleId = getCurrentModuleId();
        if (!moduleId) return;

        // Don't inject on lab pages (investing-scorecard-lab, etc.)
        var path = window.location.pathname;
        if (path.indexOf('investing-scorecard') !== -1 ||
            path.indexOf('investing-fee') !== -1 ||
            path.indexOf('investing-dca') !== -1 ||
            path.indexOf('investing-risk') !== -1) {
            return;
        }

        // Inject after module header
        var header = document.querySelector('.module-header');
        if (!header) return;

        var compactDiv = document.createElement('div');
        compactDiv.id = 'sp-compact-auto';
        compactDiv.style.marginTop = '1.5rem';
        header.parentNode.insertBefore(compactDiv, header.nextSibling);

        renderCompact('sp-compact-auto');
    }

    /* ================================================================
       INIT
       ================================================================ */

    function init() {
        // Load CSS if not already present
        if (!document.querySelector('link[href*="sovereignty-ladder"]')) {
            var cssPath = window.location.pathname.indexOf('/modules/') !== -1
                ? '../css/sovereignty-ladder.css'
                : 'css/sovereignty-ladder.css';

            // Check if we're on my-journey.html at root
            if (window.location.pathname.indexOf('my-journey') !== -1 && window.location.pathname.indexOf('/modules/') === -1) {
                cssPath = 'css/sovereignty-ladder.css';
            }

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            document.head.appendChild(link);
        }

        // Auto-inject compact on module pages
        autoInjectCompact();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ================================================================
       PUBLIC API
       ================================================================ */

    window.SovereigntyPath = {
        RUNGS: RUNGS,
        MODULE_INFO: MODULE_INFO,
        renderLadder: renderLadder,
        renderCompact: renderCompact,
        renderJourneyHero: renderJourneyHero,
        getOverallProgress: function () {
            return getOverallProgress(getProgressManager());
        },
        getActiveRung: function () {
            var pm = getProgressManager();
            return RUNGS[getActiveRungIndex(pm)];
        },
        getRungForModule: function (moduleId) {
            for (var i = 0; i < RUNGS.length; i++) {
                if (RUNGS[i].modules.indexOf(moduleId) !== -1) return RUNGS[i];
            }
            return null;
        }
    };

})();
