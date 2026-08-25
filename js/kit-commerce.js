/**
 * FSA Kit Commerce
 * Single configuration point for the /kits/ storefront.
 *
 * WHAT THIS FILE DOES
 *   1. Holds the Stripe-hosted Payment Link for each kit (public buy.stripe.com URL only).
 *   2. Holds the displayed price for each kit, so page copy and checkout cannot drift apart.
 *   3. Fires analytics events for page view, checkout click, and purchase confirmation.
 *   4. Refuses to send a buyer to a placeholder link.
 *
 * WHAT THIS FILE MUST NEVER CONTAIN
 *   No Stripe secret key (sk_...). No restricted key (rk_...). No webhook signing secret (whsec_...).
 *   No bank or routing information. No Stripe account password or recovery codes.
 *   Everything here is public by design: it ships to every visitor's browser.
 *   Secrets, if ever needed, belong only in hosting-platform environment variables.
 *
 * TO GO LIVE
 *   Replace the paymentLink placeholder below with the public Payment Link URL
 *   copied from the Stripe Dashboard. That is the only edit required.
 */
(function () {
    'use strict';

    var PLACEHOLDER = 'REPLACE_WITH_STRIPE_PAYMENT_LINK';

    var KITS = {
        'trump-account-family-decision-guide': {
            // Paste the public Payment Link here, e.g. 'https://buy.stripe.com/xxxxxxxxxxxx'
            paymentLink: PLACEHOLDER,
            price: 49,
            currency: 'USD',
            priceDisplay: '$49 USD'
        }
    };

    function isLive(link) {
        return typeof link === 'string' && link.indexOf('https://buy.stripe.com/') === 0;
    }

    function track(eventName, props) {
        try {
            if (window.fsaAnalytics && typeof window.fsaAnalytics.track === 'function') {
                window.fsaAnalytics.track(eventName, props || {});
            }
            window.dispatchEvent(new CustomEvent('fsa:kit-event', {
                detail: { event: eventName, props: props || {} }
            }));
        } catch (e) {}
    }

    function renderPrices(kitId) {
        var kit = KITS[kitId];
        if (!kit) return;
        var nodes = document.querySelectorAll('[data-kit-price]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].textContent = kit.priceDisplay;
        }
    }

    function wireButtons(kitId) {
        var kit = KITS[kitId] || {};
        var live = isLive(kit.paymentLink);
        var buttons = document.querySelectorAll('[data-kit-buy]');

        for (var i = 0; i < buttons.length; i++) {
            (function (btn) {
                var placement = btn.getAttribute('data-kit-buy') || 'unknown';

                if (!live) {
                    // Never send a real buyer to a placeholder. Degrade to a visible, honest state.
                    btn.setAttribute('aria-disabled', 'true');
                    btn.classList.add('is-pending');
                    btn.removeAttribute('href');
                    btn.setAttribute('role', 'button');
                    btn.setAttribute('tabindex', '0');
                    var pendingLabel = btn.getAttribute('data-pending-label');
                    if (pendingLabel) btn.textContent = pendingLabel;
                    btn.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        track('kit_checkout_unavailable', { kitId: kitId, placement: placement });
                    });
                    return;
                }

                btn.setAttribute('href', kit.paymentLink);
                btn.setAttribute('rel', 'noopener');
                btn.addEventListener('click', function () {
                    track('kit_checkout_click', {
                        kitId: kitId,
                        placement: placement,
                        price: kit.price,
                        currency: kit.currency
                    });
                });
            })(buttons[i]);
        }
    }

    function initKitPage() {
        var root = document.querySelector('[data-kit-id]');
        if (!root) return;
        var kitId = root.getAttribute('data-kit-id');
        var lang = document.documentElement.getAttribute('lang') || 'en';

        renderPrices(kitId);
        wireButtons(kitId);
        track('kit_page_view', { kitId: kitId, lang: lang });
    }

    function initThankYouPage() {
        var root = document.querySelector('[data-kit-thankyou]');
        if (!root) return;
        var kitId = root.getAttribute('data-kit-thankyou');

        var sessionId = '';
        try {
            sessionId = new URLSearchParams(window.location.search).get('session_id') || '';
        } catch (e) {}

        // Show the buyer a reference they can quote in a support email.
        var refNodes = document.querySelectorAll('[data-order-ref]');
        if (sessionId) {
            var shortRef = sessionId.slice(-12);
            for (var i = 0; i < refNodes.length; i++) {
                refNodes[i].textContent = shortRef;
            }
            var refBlocks = document.querySelectorAll('[data-order-ref-block]');
            for (var j = 0; j < refBlocks.length; j++) {
                refBlocks[j].hidden = false;
            }
        }

        track('kit_purchase_confirmed', {
            kitId: kitId,
            hasSessionId: sessionId ? true : false
        });
    }

    function init() {
        initKitPage();
        initThankYouPage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.FSAKitCommerce = { kits: KITS, isLive: isLive };
})();
