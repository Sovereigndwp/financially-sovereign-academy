/**
 * FSA Email Capture Component
 * Green-themed newsletter signup with server-side persistence
 */

(function() {
    'use strict';

    const CONFIG = {
        subscribeEndpoint: 'https://bitcoinsovereign.academy/api/subscribe',
        storageKey: 'fsa-email-captures',
        hideAfterCapture: true,
        exitIntent: true
    };

    class EmailCapture {
        constructor() {
            this.hasSubmitted = localStorage.getItem('fsa-email-submitted') === 'true';
            this.injectStyles();
        }

        injectStyles() {
            if (document.getElementById('fsa-email-capture-styles')) return;
            const styles = document.createElement('style');
            styles.id = 'fsa-email-capture-styles';
            styles.textContent = `
                .fsa-email-capture {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
                    border: 2px solid rgba(16, 185, 129, 0.25);
                    border-radius: 16px;
                    padding: 1.5rem 2rem;
                    margin: 2rem 0;
                    text-align: center;
                }
                .fsa-email-capture h3 { color: #10b981; font-size: 1.25rem; margin-bottom: 0.5rem; }
                .fsa-email-capture p { color: #999; font-size: 0.95rem; margin-bottom: 1rem; }
                .fsa-email-form {
                    display: flex; gap: 0.75rem; justify-content: center;
                    flex-wrap: wrap; max-width: 500px; margin: 0 auto;
                }
                .fsa-email-form input[type="email"] {
                    flex: 1; min-width: 200px; padding: 0.75rem 1rem;
                    border: 2px solid #2d2d2d; border-radius: 10px;
                    background: #1a1a1a; color: #e0e0e0; font-size: 1rem;
                }
                .fsa-email-form input[type="email"]:focus { outline: none; border-color: #10b981; }
                .fsa-email-form button {
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
                    color: #000; border: none; border-radius: 10px;
                    font-weight: 700; font-size: 1rem; cursor: pointer;
                    transition: all 0.3s ease;
                }
                .fsa-email-form button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
                .fsa-email-privacy { font-size: 0.8rem; color: #666; margin-top: 0.75rem; }
                .fsa-email-privacy a { color: #10b981; }
                .fsa-email-success { color: #4CAF50; font-weight: 600; padding: 1rem; }

                /* Modal */
                .fsa-email-modal-overlay {
                    position:fixed; top:0; left:0; right:0; bottom:0;
                    background:rgba(0,0,0,0.85); display:none;
                    justify-content:center; align-items:center; z-index:10001; padding:1rem;
                }
                .fsa-email-modal-overlay.active { display:flex; }
                .fsa-email-modal {
                    background:#1a1a1a; border:2px solid #10b981; border-radius:20px;
                    padding:2.5rem; max-width:480px; width:100%; position:relative; text-align:center;
                }
                .fsa-email-modal-close {
                    position:absolute; top:1rem; right:1rem; background:none;
                    border:none; color:#666; font-size:1.5rem; cursor:pointer;
                }
                .fsa-email-modal h3 { color:#10b981; font-size:1.5rem; margin-bottom:0.75rem; }
                .fsa-email-modal p { color:#999; margin-bottom:1.5rem; }
            `;
            document.head.appendChild(styles);
        }

        handleSubmit(event, source = 'unknown') {
            event.preventDefault();
            const form = event.target;
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Store locally
            try {
                const captures = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
                captures.push({ email, source, timestamp: Date.now(), page: window.location.pathname });
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(captures));
            } catch (e) {}

            // Persist to server
            try {
                fetch(CONFIG.subscribeEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, source: 'fsa-' + source, page: window.location.pathname }),
                    keepalive: true
                }).catch(() => {});
            } catch (e) {}

            // Track analytics
            if (window.fsaAnalytics) window.fsaAnalytics.trackEmailCapture(source);

            localStorage.setItem('fsa-email-submitted', 'true');
            this.hasSubmitted = true;

            const container = form.closest('.fsa-email-capture');
            if (container) {
                container.innerHTML = '<div class="fsa-email-success">✓ Thanks for subscribing! You\'ll get actionable finance tips.</div>';
            }
        }

        showModal(options = {}) {
            if (this.hasSubmitted && CONFIG.hideAfterCapture) return;
            const title = options.title || '💰 Level Up Your Finances';
            const subtitle = options.subtitle || 'Get weekly money tips and financial strategies. No spam, ever.';
            const buttonText = options.buttonText || 'Subscribe Free';
            const source = options.source || 'modal';

            let overlay = document.getElementById('fsa-email-modal-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'fsa-email-modal-overlay';
                overlay.className = 'fsa-email-modal-overlay';
                overlay.innerHTML = `
                    <div class="fsa-email-modal">
                        <button class="fsa-email-modal-close" onclick="fsaEmailCapture.closeModal()">&times;</button>
                        <h3>${title}</h3>
                        <p>${subtitle}</p>
                        <form class="fsa-email-form" onsubmit="fsaEmailCapture.handleSubmit(event, '${source}')">
                            <input type="email" name="email" placeholder="your@email.com" required>
                            <button type="submit">${buttonText}</button>
                        </form>
                        <p class="fsa-email-privacy">No spam. Unsubscribe anytime.</p>
                    </div>
                `;
                document.body.appendChild(overlay);
                overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
            }
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        closeModal() {
            const overlay = document.getElementById('fsa-email-modal-overlay');
            if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
        }

        initExitIntent() {
            if (!CONFIG.exitIntent || this.hasSubmitted) return;
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
            let fired = false;
            document.addEventListener('mouseout', (e) => {
                if (fired) return;
                if (e.clientY <= 0 && e.relatedTarget === null) {
                    fired = true;
                    this.showModal({
                        title: '💰 Before You Go...',
                        subtitle: 'Get weekly financial tips and strategies to build real wealth. Join for free.',
                        buttonText: 'Yes, Keep Me Updated',
                        source: 'exit_intent'
                    });
                }
            });
        }

        autoInject() {
            document.querySelectorAll('[data-fsa-email-capture]').forEach(el => {
                if (this.hasSubmitted && CONFIG.hideAfterCapture) { el.style.display = 'none'; return; }
                const source = el.getAttribute('data-fsa-email-capture') || 'auto';
                const title = el.getAttribute('data-title') || '📬 Level Up Your Finances';
                const subtitle = el.getAttribute('data-subtitle') || 'Weekly money tips, no spam. Build real financial skills.';
                const button = el.getAttribute('data-button') || 'Subscribe Free';
                el.innerHTML = `
                    <div class="fsa-email-capture">
                        <h3>${title}</h3>
                        <p>${subtitle}</p>
                        <form class="fsa-email-form" onsubmit="fsaEmailCapture.handleSubmit(event, '${source}')">
                            <input type="email" name="email" placeholder="your@email.com" required>
                            <button type="submit">${button}</button>
                        </form>
                        <p class="fsa-email-privacy">No spam. Unsubscribe anytime.</p>
                    </div>
                `;
            });
        }
    }

    const emailCapture = new EmailCapture();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { emailCapture.autoInject(); emailCapture.initExitIntent(); });
    } else {
        emailCapture.autoInject();
        emailCapture.initExitIntent();
    }

    window.fsaEmailCapture = emailCapture;
})();
