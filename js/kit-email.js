/**
 * FSA Kit Email Capture
 * Minimal, accessible email capture for the /kits/ storefront.
 * Posts to the existing /api/subscribe endpoint. Stores nothing sensitive.
 * Bilingual: strings are selected from the document's lang attribute.
 */
(function () {
    'use strict';

    var STRINGS = {
        en: {
            invalid: 'Please enter a valid email address.',
            sending: 'Sending...',
            ok: 'Done. You are on the list. Nothing else is required of you.',
            fail: 'That did not go through. Please email dalia@thesovereign.academy and you will be added by hand.'
        },
        es: {
            invalid: 'Por favor escriba un correo electrónico válido.',
            sending: 'Enviando...',
            ok: 'Listo. Ya está en la lista. No se requiere nada más de usted.',
            fail: 'No se pudo enviar. Por favor escriba a dalia@thesovereign.academy y la agregaremos manualmente.'
        }
    };

    function strings() {
        var lang = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
        return STRINGS[lang] || STRINGS.en;
    }

    function valid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function init() {
        var forms = document.querySelectorAll('[data-kit-email-form]');
        if (!forms.length) return;

        var t = strings();

        for (var i = 0; i < forms.length; i++) {
            (function (form) {
                var status = document.querySelector('[data-kit-email-status]');
                var input = form.querySelector('input[type="email"]');
                var button = form.querySelector('button[type="submit"]');
                var kitRoot = document.querySelector('[data-kit-id]');
                var kitId = kitRoot ? kitRoot.getAttribute('data-kit-id') : 'kits';

                form.addEventListener('submit', function (ev) {
                    ev.preventDefault();
                    var email = (input.value || '').trim();

                    if (!valid(email)) {
                        if (status) status.textContent = t.invalid;
                        input.setAttribute('aria-invalid', 'true');
                        input.focus();
                        return;
                    }
                    input.removeAttribute('aria-invalid');

                    if (status) status.textContent = t.sending;
                    if (button) button.disabled = true;

                    var done = function (message, ok) {
                        if (status) status.textContent = message;
                        if (button) button.disabled = false;
                        if (ok) {
                            form.hidden = true;
                            try {
                                if (window.fsaAnalytics) {
                                    window.fsaAnalytics.track('kit_email_capture', {
                                        kitId: kitId,
                                        lang: document.documentElement.getAttribute('lang') || 'en'
                                    });
                                }
                            } catch (e) {}
                        }
                    };

                    fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            source: 'fsa-kit-' + kitId,
                            page: window.location.pathname
                        })
                    }).then(function (res) {
                        if (!res.ok) throw new Error('subscribe failed');
                        done(t.ok, true);
                    }).catch(function () {
                        done(t.fail, false);
                    });
                });
            })(forms[i]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
