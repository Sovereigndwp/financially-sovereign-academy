/**
 * Module Navigation System for Financially Sovereign Academy
 * Provides consistent navigation between modules with progress tracking
 */

class ModuleNavigation {
    constructor() {
        this.modules = [
            { id: 1, title: 'Money Mindset & Cash Flow', file: 'money-mindset-cash-flow.html' },
            { id: 2, title: 'Emergency Funds & Saving', file: 'emergency-funds-saving.html' },
            { id: 3, title: 'Banking Without Getting Robbed', file: 'banking-basics.html' },
            { id: 4, title: 'Credit Scores Decoded', file: 'credit-scores.html' },
            { id: 5, title: 'Debt Strategy', file: 'debt-strategy.html' },
            { id: 6, title: 'Taxes & Paychecks Demystified', file: 'taxes-paychecks.html' },
            { id: 7, title: 'Investing for Humans', file: 'investing-fundamentals.html' },
            { id: 8, title: 'Protect What You\'ve Built', file: 'risk-insurance.html' },
            { id: 9, title: 'Consumer Protection', file: 'consumer-protection.html' },
            { id: 10, title: 'Your Financial Master Plan', file: 'financial-master-plan.html' }
        ];
    }

    getCurrentModuleId() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        const module = this.modules.find(m => m.file === currentFile);
        return module ? module.id : 1;
    }

    getModule(id) {
        return this.modules.find(m => m.id === id);
    }

    getPreviousModule(currentId) {
        return currentId > 1 ? this.getModule(currentId - 1) : null;
    }

    getNextModule(currentId) {
        return currentId < this.modules.length ? this.getModule(currentId + 1) : null;
    }

    createNavigationHTML(currentId) {
        const current = this.getModule(currentId);
        const previous = this.getPreviousModule(currentId);
        const next = this.getNextModule(currentId);
        
        return `
            <div class="module-navigation" style="
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 1rem;
                padding: 2rem;
                margin: 3rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
            ">
                <div style="flex: 1; min-width: 200px;">
                    ${previous ? `
                        <a href="${previous.file}" class="nav-btn nav-prev" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.75rem 1.5rem;
                            background: transparent;
                            border: 1px solid var(--color-border);
                            border-radius: 0.5rem;
                            color: var(--fsa-text-secondary, #9ca3af);
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.2s;
                        " onmouseover="this.style.borderColor='var(--fsa-green, #10b981)'; this.style.color='var(--fsa-green, #10b981)';" onmouseout="this.style.borderColor='var(--color-border)'; this.style.color='var(--fsa-text-secondary, #9ca3af)';">
                            <span>←</span>
                            <div>
                                <div style="font-size: 0.8rem; opacity: 0.7;">Previous</div>
                                <div style="font-size: 0.9rem;">${previous.title}</div>
                            </div>
                        </a>
                    ` : ''}
                </div>
                
                <div style="text-align: center; color: var(--fsa-green, #10b981);">
                    <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">Module ${currentId} of ${this.modules.length}</div>
                    <div class="progress-bar" style="
                        width: 200px;
                        height: 8px;
                        background: var(--color-deepest);
                        border-radius: 4px;
                        overflow: hidden;
                        margin: 0 auto;
                    ">
                        <div style="
                            height: 100%;
                            background: var(--brand-gradient);
                            width: ${(currentId / this.modules.length) * 100}%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
                
                <div style="flex: 1; min-width: 200px; text-align: right;">
                    ${next ? `
                        <a href="${next.file}" class="nav-btn nav-next" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.75rem 1.5rem;
                            background: linear-gradient(var(--color-bg), var(--color-bg)) padding-box, var(--brand-gradient) border-box;
                            border: 1.5px solid transparent;
                            border-radius: 0.5rem;
                            color: var(--color-text);
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.2s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 0 18px rgba(16,185,129,0.18)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='';">
                            <div>
                                <div style="font-size: 0.8rem; opacity: 0.9;">Next</div>
                                <div style="font-size: 0.9rem;">${next.title}</div>
                            </div>
                            <span>→</span>
                        </a>
                    ` : `
                        <a href="../index.html" class="nav-btn nav-complete" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0.75rem 1.5rem;
                            background: linear-gradient(var(--color-bg), var(--color-bg)) padding-box, var(--brand-gradient) border-box;
                            border: 1.5px solid transparent;
                            border-radius: 0.5rem;
                            color: var(--color-text);
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.2s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 0 18px rgba(16,185,129,0.18)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='';">
                            <span>🎉</span>
                            <div>
                                <div style="font-size: 0.8rem; opacity: 0.9;">Complete</div>
                                <div style="font-size: 0.9rem;">Academy Finished!</div>
                            </div>
                        </a>
                    `}
                </div>
            </div>
            
            @media (max-width: 768px) {
                <style>
                    .module-navigation {
                        flex-direction: column;
                        text-align: center;
                    }
                    .module-navigation > div {
                        flex: none !important;
                        text-align: center !important;
                    }
                </style>
            }
        `;
    }

    renderNavigation(currentId = null) {
        if (currentId === null) {
            currentId = this.getCurrentModuleId();
        }
        
        const navHTML = this.createNavigationHTML(currentId);
        
        // Find insertion point (end of main content, before scripts)
        const main = document.querySelector('main');
        if (main) {
            const existingNav = main.querySelector('.module-navigation');
            if (existingNav) {
                existingNav.remove();
            }
            main.insertAdjacentHTML('beforeend', navHTML);
        }
    }

    // Quick access methods for use in module pages
    static init(moduleId) {
        const nav = new ModuleNavigation();
        nav.renderNavigation(moduleId);
        return nav;
    }
}

// Auto-initialize if on a module page
if (typeof window !== 'undefined' && window.location.pathname.includes('/modules/')) {
    document.addEventListener('DOMContentLoaded', () => {
        ModuleNavigation.init();
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuleNavigation;
}