/**
 * Calculator Navigation — Back-to-Module Button
 *
 * When a learner arrives at a calculator from a module page, this script
 * shows a floating "← Back to Module X" button so they can return without
 * losing their train of thought.
 *
 * Detection priority:
 *   1. ?from=module-slug query parameter (set by module links)
 *   2. document.referrer (fallback — checks if referrer is a module page)
 *
 * Include on every calculator page:
 *   <script src="/js/calculator-nav.js" defer></script>
 */
(function () {
    'use strict';

    // Module slug → display name mapping
    var MODULES = {
        'money-mindset-cash-flow':   'Module 1: Money Mindset',
        'emergency-funds-saving':    'Module 2: Emergency Funds',
        'banking-basics':            'Module 3: Banking Basics',
        'debt-strategy':             'Module 4: Debt Strategy',
        'credit-scores':             'Module 5: Credit Scores',
        'taxes-paychecks':           'Module 6: Taxes & Paychecks',
        'investing-fundamentals':    'Module 7: Investing',
        'risk-insurance':            'Module 8: Insurance',
        'consumer-protection':       'Module 9: Consumer Protection',
        'financial-master-plan':     'Module 10: Master Plan'
    };

    function getModuleFromQuery() {
        var params = new URLSearchParams(window.location.search);
        return params.get('from') || null;
    }

    function getModuleFromReferrer() {
        if (!document.referrer) return null;
        try {
            var url = new URL(document.referrer);
            // Only match referrers from our own domain
            if (url.hostname !== window.location.hostname) return null;
            var path = url.pathname;
            // Check if it's a module page
            if (path.indexOf('/modules/') === -1) return null;
            var filename = path.split('/').pop().replace('.html', '');
            return MODULES[filename] ? filename : null;
        } catch (e) {
            return null;
        }
    }

    function buildBackLink(slug) {
        var name = MODULES[slug] || 'Module';
        var href = '/modules/' + slug + '.html';
        return { name: name, href: href };
    }

    function inject() {
        var slug = getModuleFromQuery() || getModuleFromReferrer();

        // Always show a home / calculators link; show module link if we know the source
        var nav = document.createElement('div');
        nav.id = 'calc-nav';
        nav.style.cssText = 'position:fixed;top:1rem;left:1rem;z-index:10000;display:flex;flex-direction:column;gap:0.5rem;';

        if (slug) {
            var info = buildBackLink(slug);
            var btn = document.createElement('a');
            btn.href = info.href;
            btn.textContent = '← ' + info.name;
            btn.style.cssText = 'display:flex;align-items:center;gap:0.4rem;color:#10b981;text-decoration:none;font-weight:600;font-size:0.9rem;background:rgba(15,41,34,0.95);padding:0.65rem 1.1rem;border-radius:0.5rem;border:2px solid rgba(16,185,129,0.3);backdrop-filter:blur(10px);transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.3);white-space:nowrap;';
            btn.addEventListener('mouseenter', function () {
                this.style.borderColor = '#10b981';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(16,185,129,0.3)';
            });
            btn.addEventListener('mouseleave', function () {
                this.style.borderColor = 'rgba(16,185,129,0.3)';
                this.style.transform = '';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            });
            nav.appendChild(btn);
        }

        // Home / all calculators link
        var home = document.createElement('a');
        home.href = '/calculators/';
        home.textContent = '🧮 All Calculators';
        home.style.cssText = 'display:flex;align-items:center;gap:0.4rem;color:#9ca3af;text-decoration:none;font-weight:600;font-size:0.8rem;background:rgba(15,41,34,0.85);padding:0.5rem 1rem;border-radius:0.5rem;border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(10px);transition:all 0.2s;white-space:nowrap;';
        home.addEventListener('mouseenter', function () { this.style.color = '#10b981'; });
        home.addEventListener('mouseleave', function () { this.style.color = '#9ca3af'; });
        nav.appendChild(home);

        document.body.appendChild(nav);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
