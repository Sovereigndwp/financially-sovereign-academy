/**
 * FSA Analytics Service
 * Lightweight event tracking for funnel analytics
 * Events persist to Supabase via the shared API.
 */

(function() {
    'use strict';

    const CONFIG = {
        storageKey: 'fsa-analytics-events',
        sessionKey: 'fsa-session',
        maxStoredEvents: 500,
        trackEndpoint: 'https://bitcoinsovereign.academy/api/track',
        flushIntervalMs: 10000,
        debug: false
    };

    class AnalyticsService {
        constructor() {
            this.sessionId = this.getOrCreateSession();
            this.serverQueue = [];
            this.initialized = false;
            this._flushTimer = null;
        }

        init() {
            if (this.initialized) return;

            this.track('page_view', {
                path: window.location.pathname,
                referrer: document.referrer || 'direct',
                site: 'fsa'
            });

            this._flushTimer = setInterval(() => this.flushToServer(), CONFIG.flushIntervalMs);

            window.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') this.flushToServer();
            });

            this.initialized = true;
        }

        getOrCreateSession() {
            let session = sessionStorage.getItem(CONFIG.sessionKey);
            if (!session) {
                session = 'fsa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem(CONFIG.sessionKey, session);
            }
            return session;
        }

        track(eventName, properties = {}) {
            const event = {
                event: eventName,
                timestamp: Date.now(),
                sessionId: this.sessionId,
                path: window.location.pathname,
                referrer: document.referrer || '',
                props: { ...properties, site: 'fsa' }
            };

            this.storeEvent(event);
            this.serverQueue.push(event);

            if (['email_capture', 'module_complete', 'assessment_complete'].includes(eventName)) {
                this.flushToServer();
            }

            window.dispatchEvent(new CustomEvent('fsa:analytics', { detail: event }));
        }

        storeEvent(event) {
            try {
                const events = this.getStoredEvents();
                events.push(event);
                if (events.length > CONFIG.maxStoredEvents) {
                    events.splice(0, events.length - CONFIG.maxStoredEvents);
                }
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(events));
            } catch (e) {}
        }

        getStoredEvents() {
            try {
                const data = localStorage.getItem(CONFIG.storageKey);
                return data ? JSON.parse(data) : [];
            } catch { return []; }
        }

        flushToServer() {
            if (this.serverQueue.length === 0) return;
            const batch = this.serverQueue.splice(0, 25);
            try {
                const payload = JSON.stringify({ events: batch });
                if (document.visibilityState === 'hidden' && navigator.sendBeacon) {
                    navigator.sendBeacon(CONFIG.trackEndpoint, new Blob([payload], { type: 'application/json' }));
                } else {
                    fetch(CONFIG.trackEndpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: payload,
                        keepalive: true
                    }).catch(() => { this.serverQueue.unshift(...batch); });
                }
            } catch (e) {
                this.serverQueue.unshift(...batch);
            }
        }

        trackEmailCapture(source) { this.track('email_capture', { source }); }
        trackModuleComplete(moduleId) { this.track('module_complete', { moduleId }); }
        trackAssessmentComplete(persona) { this.track('assessment_complete', { persona }); }
        trackCalculatorUse(calcId) { this.track('calculator_use', { calcId }); }
    }

    const analytics = new AnalyticsService();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => analytics.init());
    } else {
        analytics.init();
    }

    window.fsaAnalytics = analytics;
})();
