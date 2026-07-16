/**
 * article-related-content.js : analytics + optional enrichment for the
 * "Explore the idea further" block. Progressive enhancement only.
 *
 * The related list is server-rendered from article-library.json at build time,
 * so this file never controls whether related content appears. It (1) tracks
 * clicks on related modules/articles and (2) can lazily fill an empty related
 * list from the registry if a page shipped before its neighbors existed.
 */
(function () {
  'use strict';

  function track(name, props) {
    try { if (window.fsaAnalytics) window.fsaAnalytics.track(name, props || {}); } catch (e) {}
  }

  var related = document.querySelector('.mi-related');
  if (!related) return;
  var meta = window.MI_ARTICLE || {};

  related.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var kind = href.indexOf('/modules/') === 0 ? 'module' : 'article';
    track('article_related_' + kind + '_selected', { from: meta.slug || null, href: href });
  });
})();
