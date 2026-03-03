/**
 * FSA Email Capture Component
 * Green-themed newsletter signup with server-side persistence
 */

(function() {
    'use strict';

    const CONFIG = {
        subscribeEndpoint: '/api/subscribe',
        storageKey: 'fsa-email-captures',
        hideAfterCapture: true,
        exitIntent: true,
        mobileDelayMs: 45000  // show popup after 45s on mobile
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
                .fsa-email-form .fsa-email-btn-loading {
                    pointer-events: none; opacity: 0.7;
                }
                .fsa-email-privacy { font-size: 0.8rem; color: #666; margin-top: 0.75rem; }
                .fsa-email-privacy a { color: #10b981; }
                .fsa-email-success {
                    color: #10b981; font-weight: 600; padding: 1.5rem;
                    font-size: 1.1rem; line-height: 1.6;
                }
                .fsa-email-success .checkmark {
                    display: inline-block; font-size: 2rem; margin-bottom: 0.5rem;
                    animation: fsaPopIn 0.4s ease;
                }
                @keyframes fsaPopIn {
                    0% { transform: scale(0); opacity: 0; }
                    60% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }

                /* Modal */
                .fsa-email-modal-overlay {
                    position:fixed; top:0; left:0; right:0; bottom:0;
                    background:rgba(0,0,0,0.85); display:none;
                    justify-content:center; align-items:center; z-index:10001; padding:1rem;
                    backdrop-filter: blur(4px);
                }
                .fsa-email-modal-overlay.active { display:flex; }
                .fsa-email-modal {
                    background: linear-gradient(135deg, #0f2922 0%, #1a3a2e 100%);
                    border:2px solid #10b981; border-radius:20px;
                    padding:2.5rem; max-width:480px; width:100%; position:relative; text-align:center;
                    animation: fsaSlideUp 0.35s ease;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                }
                @keyframes fsaSlideUp {
                    from { opacity:0; transform:translateY(30px); }
                    to { opacity:1; transform:translateY(0); }
                }
                .fsa-email-modal-close {
                    position:absolute; top:1rem; right:1rem; background:none;
                    border:none; color:#666; font-size:1.5rem; cursor:pointer;
                    transition: color 0.2s;
                }
                .fsa-email-modal-close:hover { color: #ef4444; }
                .fsa-email-modal h3 { color:#10b981; font-size:1.5rem; margin-bottom:0.75rem; }
                .fsa-email-modal p { color:#9ca3af; margin-bottom:1.5rem; line-height:1.6; }
                .fsa-email-modal .fsa-email-benefit {
                    display:flex; align-items:center; gap:0.5rem;
                    color:#e0e0e0; font-size:0.9rem; text-align:left;
                    margin:0.35rem 0; padding-left:1rem;
                }
                .fsa-email-modal .fsa-email-benefit::before {
                    content:'✓'; color:#10b981; font-weight:700; flex-shrink:0;
                }
            `;
            document.head.appendChild(styles);
        }

        handleSubmit(event, source = 'unknown') {
            event.preventDefault();
            const form = event.target;
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailInput.style.borderColor = '#ef4444';
                emailInput.setAttribute('placeholder', 'Please enter a valid email');
                return;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.classList.add('fsa-email-btn-loading');
                submitBtn.textContent = 'Subscribing...';
            }

            // Store locally
            try {
                const captures = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
                captures.push({ email, source, timestamp: Date.now(), page: window.location.pathname });
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(captures));
            } catch (e) {}

            // Persist to server
            fetch(CONFIG.subscribeEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'fsa-' + source, page: window.location.pathname }),
            }).then(res => {
                if (!res.ok) throw new Error('Subscribe failed');
                return res.json();
            }).then(() => {
                this._showSuccess(form, source);
            }).catch(() => {
                // Still show success — email is saved locally and we don't want to block UX
                this._showSuccess(form, source);
            });
        }

        _showSuccess(form, source) {
            // Track analytics
            if (window.fsaAnalytics) window.fsaAnalytics.trackEmailCapture(source);

            localStorage.setItem('fsa-email-submitted', 'true');
            this.hasSubmitted = true;

            const container = form.closest('.fsa-email-capture') || form.closest('.fsa-email-modal');
            if (container) {
                const isModal = container.classList.contains('fsa-email-modal');
                container.innerHTML = '<div class="fsa-email-success">'
                    + '<div class="checkmark">✅</div>'
                    + '<div>You\'re in! Weekly financial tips are on the way.</div>'
                    + '<div style="font-size:0.85rem;color:#6b7280;margin-top:0.5rem;">No spam, ever. Unsubscribe anytime.</div>'
                    + (isModal ? '<button onclick="fsaEmailCapture.closeModal()" style="margin-top:1rem;padding:0.6rem 1.5rem;background:#10b981;color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Continue Learning</button>' : '')
                    + '</div>';
            }
        }

        showModal(options = {}) {
            if (this.hasSubmitted && CONFIG.hideAfterCapture) return;
            const title = options.title || '💰 Level Up Your Finances';
            const subtitle = options.subtitle || 'Get weekly money tips and financial strategies — straight to your inbox.';
            const buttonText = options.buttonText || 'Subscribe Free';
            const source = options.source || 'modal';

            let overlay = document.getElementById('fsa-email-modal-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'fsa-email-modal-overlay';
                overlay.className = 'fsa-email-modal-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });
            }
            overlay.innerHTML = `
                <div class="fsa-email-modal">
                    <button class="fsa-email-modal-close" onclick="fsaEmailCapture.closeModal()">&times;</button>
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                    <div class="fsa-email-benefit">Budgeting tips that actually work</div>
                    <div class="fsa-email-benefit">How to start investing with $50</div>
                    <div class="fsa-email-benefit">Debt payoff strategies explained simply</div>
                    <form class="fsa-email-form" style="margin-top:1.25rem;" onsubmit="fsaEmailCapture.handleSubmit(event, '${source}')">
                        <input type="email" name="email" placeholder="your@email.com" required>
                        <button type="submit">${buttonText}</button>
                    </form>
                    <p class="fsa-email-privacy">No spam. Unsubscribe anytime.</p>
                </div>
            `;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        closeModal() {
            const overlay = document.getElementById('fsa-email-modal-overlay');
            if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
        }

        initExitIntent() {
            if (!CONFIG.exitIntent || this.hasSubmitted) return;
            const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            let fired = false;

            const exitModalOpts = {
                title: '💰 Before You Go...',
                subtitle: 'Join thousands learning to take control of their money — one email per week.',
                buttonText: 'Yes, Keep Me Updated',
                source: 'exit_intent'
            };

            if (isMobile) {
                // Mobile: show after time delay (user has been engaged)
                setTimeout(() => {
                    if (fired || this.hasSubmitted) return;
                    fired = true;
                    this.showModal(exitModalOpts);
                }, CONFIG.mobileDelayMs);
            } else {
                // Desktop: show on mouse leaving viewport
                document.addEventListener('mouseout', (e) => {
                    if (fired) return;
                    if (e.clientY <= 0 && e.relatedTarget === null) {
                        fired = true;
                        this.showModal(exitModalOpts);
                    }
                });
            }
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
