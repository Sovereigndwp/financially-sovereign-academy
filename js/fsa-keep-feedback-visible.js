/**
 * FSA: Keep Feedback Visible
 * @description After a learner makes a choice in a course interactive, ensure the
 *   revealed feedback is visible. Scenario activities hide the intro block above the
 *   outcome, which collapses layout and can push the feedback out of view. This helper
 *   gently brings the revealed feedback into view using the minimum scroll needed.
 *
 *   It does NOT change any activity logic, focus, or saved answers. It only adjusts
 *   scroll position, and only when the feedback is not already fully visible.
 *
 * Behavior:
 *   - Delegated click listener, runs AFTER the existing inline onclick handler.
 *   - Targets '.scenario-choice' and '.quiz-option'.
 *   - Finds the nearest revealed feedback near the clicked control:
 *       [id^="outcome"]:not(.hidden), .scenario-outcome:not(.hidden),
 *       .outcome:not(.hidden), .quiz-feedback:not(.hidden)
 *   - scrollIntoView({ block: 'nearest' }) only if the feedback is out of view.
 *   - Never moves focus. Never auto-advances. Defensive: if nothing is found, does nothing.
 */
(function () {
    'use strict';

    var CONTROL_SELECTOR = '.scenario-choice, .quiz-option';
    var FEEDBACK_SELECTOR = [
        '[id^="outcome"]:not(.hidden)',
        '.scenario-outcome:not(.hidden)',
        '.outcome:not(.hidden)',
        '.quiz-feedback:not(.hidden)'
    ].join(', ');

    // Small scroll offset so feedback does not hug the very top edge.
    function injectScrollMargin() {
        if (document.getElementById('fsa-keep-feedback-visible-css')) return;
        var style = document.createElement('style');
        style.id = 'fsa-keep-feedback-visible-css';
        style.textContent = '.outcome, .scenario-outcome, .quiz-feedback { scroll-margin-top: 16px; scroll-margin-bottom: 16px; }';
        (document.head || document.documentElement).appendChild(style);
    }

    function isFullyVisible(el) {
        var r = el.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        return r.top >= 0 && r.bottom <= vh;
    }

    // Find the revealed feedback nearest the clicked control.
    function findFeedback(control) {
        // Climb to the nearest ancestor that contains a revealed feedback element.
        var scope = control.parentElement;
        var matchScope = null;
        while (scope && scope !== document.body) {
            if (scope.querySelector(FEEDBACK_SELECTOR)) { matchScope = scope; break; }
            scope = scope.parentElement;
        }
        if (!matchScope) return null;

        var candidates = matchScope.querySelectorAll(FEEDBACK_SELECTOR);
        if (!candidates.length) return null;

        // Prefer the first revealed feedback that appears after the control in the DOM
        // (feedback/outcome normally follows the choice). Fall back to the last one before it.
        var after = null, before = null;
        for (var i = 0; i < candidates.length; i++) {
            var fb = candidates[i];
            var pos = control.compareDocumentPosition(fb);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) { if (!after) after = fb; }
            else { before = fb; }
        }
        return after || before || candidates[0];
    }

    function handleChoice(e) {
        var control = e.target && e.target.closest ? e.target.closest(CONTROL_SELECTOR) : null;
        if (!control) return;

        // Run after the existing inline handler has revealed/hidden content and layout settled.
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                try {
                    var fb = findFeedback(control);
                    if (!fb) return;                 // nothing revealed -> do nothing
                    if (isFullyVisible(fb)) return;  // already visible -> do not move
                    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    fb.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
                    // No focus change: keyboard/screen-reader focus is left exactly where it was.
                } catch (_) { /* defensive: never break the activity */ }
            });
        });
    }

    function init() {
        injectScrollMargin();
        document.addEventListener('click', handleChoice, false); // bubble phase: runs after inline onclick
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
