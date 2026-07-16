/**
 * article-reading-progress.js — reading progress bar + article analytics.
 * Progressive enhancement: the article reads perfectly without this file.
 * Documented events (see docs/fsa-article-metadata.md):
 *   article_opened, article_completed, article_print_selected, article_exercise_expanded
 */
(function () {
  'use strict';

  function track(name, props) {
    try { if (window.fsaAnalytics) window.fsaAnalytics.track(name, props || {}); } catch (e) {}
  }

  var meta = window.MI_ARTICLE || {};
  var article = document.querySelector('.mi-prose');
  var bar = document.getElementById('mi-progress');

  // Open event
  track('article_opened', meta);

  // Progress bar + completion (fires once at ~90% read)
  var completed = false;
  function onScroll() {
    if (!article || !bar) return;
    var rect = article.getBoundingClientRect();
    var total = article.offsetHeight - window.innerHeight;
    var passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    var pct = total > 0 ? passed / total : 1;
    bar.style.width = (pct * 100).toFixed(1) + '%';
    if (!completed && pct >= 0.9) {
      completed = true;
      track('article_completed', meta);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Print
  window.addEventListener('beforeprint', function () {
    track('article_print_selected', meta);
  });

  // Exercise disclosure (any <details> inside an exercise/section)
  document.querySelectorAll('.mi-exercise details, .mi-prose details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) track('article_exercise_expanded', meta);
    });
  });
})();
