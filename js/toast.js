/**
 * FSA Toast — lightweight, non-blocking confirmation banner.
 * Replaces native alert() for module-completion messages so the page
 * doesn't stall on a modal dialog. Auto-injects its own styles on first use,
 * matching the pattern used by js/email-capture.js.
 */
(function () {
    'use strict';

    function injectStyles() {
        if (document.getElementById('fsa-toast-styles')) return;
        var style = document.createElement('style');
        style.id = 'fsa-toast-styles';
        style.textContent = [
            '.fsa-toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,12px);',
            'max-width:min(92vw,480px);background:var(--color-elevated,#1a1d24);',
            'border:1px solid var(--color-mint,#34d399);color:var(--color-text,#e0e0e0);',
            'border-radius:0.75rem;padding:1rem 1.25rem;box-shadow:0 12px 32px rgba(0,0,0,0.35);',
            'font-family:var(--font-body,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif);',
            'font-size:0.95rem;line-height:1.5;white-space:pre-line;cursor:pointer;z-index:9999;',
            'opacity:0;transition:opacity 0.25s ease,transform 0.25s ease;}',
            '.fsa-toast.fsa-toast--visible{opacity:1;transform:translate(-50%,0);}',
            '.fsa-toast .fsa-toast-hint{display:block;margin-top:0.5rem;font-size:0.78rem;',
            'color:var(--color-muted,#9ca3af);}',
            '@media (prefers-reduced-motion: reduce){.fsa-toast{transition:none;}}'
        ].join('');
        document.head.appendChild(style);
    }

    /**
     * @param {string} message - text to show (line breaks preserved)
     * @param {Object} [opts]
     * @param {Function} [opts.onDismiss] - called once, either when the toast
     *   is clicked or after its auto duration elapses
     * @param {number} [opts.duration] - ms before auto-dismiss; defaults to a
     *   length scaled to the message so short and long messages both get a
     *   readable amount of time on screen
     */
    function showFsaToast(message, opts) {
        opts = opts || {};
        injectStyles();

        var toast = document.createElement('div');
        toast.className = 'fsa-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');

        var text = document.createElement('span');
        text.textContent = message;
        toast.appendChild(text);

        var hint = document.createElement('span');
        hint.className = 'fsa-toast-hint';
        hint.textContent = 'Tap to continue now';
        toast.appendChild(hint);

        document.body.appendChild(toast);
        requestAnimationFrame(function () {
            toast.classList.add('fsa-toast--visible');
        });

        var done = false;
        function finish() {
            if (done) return;
            done = true;
            toast.classList.remove('fsa-toast--visible');
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
            if (typeof opts.onDismiss === 'function') opts.onDismiss();
        }

        toast.addEventListener('click', finish);

        var duration = opts.duration || Math.max(2200, Math.min(6000, message.length * 40));
        setTimeout(finish, duration);

        return { dismiss: finish };
    }

    window.showFsaToast = showFsaToast;
})();
