/**
 * article-library.js — FSA Money Ideas homepage.
 * Progressive enhancement only: the article grid is server-rendered and fully
 * usable with JavaScript disabled. This adds concept filtering + light analytics.
 * No hard-coded copy that a translation would need to change (labels come from
 * the DOM / data attributes), so the component stays localization-safe.
 */
(function () {
  'use strict';

  function track(name, props) {
    try { if (window.fsaAnalytics) window.fsaAnalytics.track(name, props || {}); } catch (e) {}
  }

  var grid = document.getElementById('mi-grid');
  var chips = document.getElementById('mi-concepts');
  var noResult = document.getElementById('mi-noresult');
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.mi-card'));

  function applyConcept(concept) {
    var shown = 0;
    cards.forEach(function (card) {
      var list = (card.getAttribute('data-concepts') || '').split('|');
      var match = !concept || list.indexOf(concept) !== -1;
      if (match) { card.hidden = false; shown++; } else { card.hidden = true; }
    });
    if (noResult) noResult.hidden = shown !== 0;
  }

  if (chips) {
    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.mi-chip');
      if (!btn) return;
      chips.querySelectorAll('.mi-chip').forEach(function (c) { c.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var concept = btn.getAttribute('data-concept') || '';
      applyConcept(concept);
      if (concept) track('library_filter', { concept: concept });
    });
  }

  // Card clicks (navigation to an article) — useful funnel signal.
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      track('library_article_click', {
        href: card.getAttribute('href'),
        status: card.getAttribute('data-status')
      });
    });
  });

  // Module chip clicks.
  document.querySelectorAll('.mi-modchip').forEach(function (m) {
    m.addEventListener('click', function () {
      track('library_module_click', { module: m.getAttribute('data-module') });
    });
  });
})();
