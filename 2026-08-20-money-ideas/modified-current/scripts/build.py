# -*- coding: utf-8 -*-
"""
build.py: Generate the FSA Money Ideas article library from library_data.py.

Emits (into the repo-relative tree rooted at OUT):
  articles/article-library.json      canonical registry (26 records)
  articles/index.html                library homepage
  articles/series/<slug>.html        4 series pages
  articles/<seriesSlug>/<slug>.html  25 article pages
  articles/foundations/<slug>.html   1 featured intro
  articles/sources/<slug>.sources.md 26 companion source stubs

Public status = approved | published. Everything else renders with a visible
status banner + robots noindex, and never appears as "published".
"""
import json, os, html, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from library_data import (ARTICLES, SERIES, MODULES, MODULE_NAMES, MODULE_FILE,
                          CONCEPTS, SITE, PUBLIC_STATUSES, STATUS_VALUES,
                          REVIEW_STATUS_VALUES, DIFFICULTY_VALUES, AUDIENCE_VALUES,
                          FORMAT_VALUES)
from prototype_content import PROTOTYPE
from later_content import LATER
from four_jobs_content import FOUR_JOBS

OUT = os.environ.get("FSA_ARTICLES_OUT") or os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "articles")
REVISION_DATE = "2026-07-16"   # static; the build date recorded in registry/footers

# Development mode: when set, index/series/foundations pages show ALL articles
# (planned included) with status badges and are served noindex. The DEFAULT
# (production) build shows only approved/published articles on those pages, and
# never exposes a planned card or a link to a planned article. Set FSA_DEV_MODE=1
# for a local preview build.
DEV_MODE = bool(os.environ.get("FSA_DEV_MODE"))

def esc(s):
    return html.escape(s or "", quote=True)

def is_public(a):
    return a["status"] in PUBLIC_STATUSES

def _dedupe(seq):
    """Order-preserving de-duplication (used for JSON-LD keywords)."""
    seen, out = set(), []
    for x in seq:
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out

def public_only(arts):
    """Articles that may appear on public library/series pages. In dev mode,
    everything is shown; in production, only approved/published."""
    return list(arts) if DEV_MODE else [a for a in arts if is_public(a)]

def dev_banner():
    if not DEV_MODE:
        return ""
    return ("""
  <div class="mi-devnote" role="note" style="margin:1rem 1.5rem 0">
    <span class="mi-devnote__tag">DEVELOPMENT MODE</span>
    <span>This preview lists planned articles that are <strong>not published</strong>. """
            """It is not the public view, and this page is served noindex.</span>
  </div>""")

def empty_state(kind="series"):
    where = "this series" if kind == "series" else "the library"
    return ("""
  <section class="fsa-section">
    <div class="fsa-wrap">
      <p class="mi-muted">Articles for %s are in preparation and will appear here once they
      pass review. Nothing is published yet.</p>
    </div>
  </section>""" % where)

# ---- enrich records with computed fields -----------------------------------
BY_SLUG = {a["slug"]: a for a in ARTICLES}
BY_SERIES = {}
for a in ARTICLES:
    BY_SERIES.setdefault(a["seriesSlug"], []).append(a)
for k in BY_SERIES:
    BY_SERIES[k].sort(key=lambda x: x["seriesOrder"])

def canonical_path(a):
    return "/articles/%s/%s.html" % (a["seriesSlug"], a["slug"])

def sources_rel(a):
    return "/articles/sources/%s.sources.md" % a["slug"]

def default_related(a):
    """Series neighbors + the featured intro, as slugs; all guaranteed to exist."""
    sibs = BY_SERIES.get(a["seriesSlug"], [])
    idx = next((i for i, s in enumerate(sibs) if s["slug"] == a["slug"]), None)
    rel = []
    if idx is not None:
        if idx + 1 < len(sibs): rel.append(sibs[idx + 1]["slug"])
        if idx - 1 >= 0:        rel.append(sibs[idx - 1]["slug"])
    intro = "the-most-expensive-word-is-later"
    if a["slug"] != intro and intro not in rel:
        rel.append(intro)
    return rel[:3]

for a in ARTICLES:
    a["canonicalPath"] = canonical_path(a)
    a["sourcesFile"] = sources_rel(a)
    a["language"] = "en"
    a["translationOf"] = None
    a["availableLanguages"] = ["en"]
    a["formats"] = ["web", "print"]
    a["publishedDate"] = None
    a["updatedDate"] = None
    if not a.get("relatedArticles"):
        a["relatedArticles"] = default_related(a)

# ============================================================================
# Shared HTML chrome
# ============================================================================
def head(title, description, canonical, noindex, extra_css=None, jsonld=None):
    css = ['<link rel="stylesheet" href="/css/fsa-brand.css">',
           '<link rel="stylesheet" href="/css/fsa-articles.css">']
    for c in (extra_css or []):
        css.append('<link rel="stylesheet" href="%s">' % c)
    robots = '\n  <meta name="robots" content="noindex, follow">' if noindex else ''
    ld = ''
    if jsonld:
        ld = '\n  <script type="application/ld+json">%s</script>' % json.dumps(jsonld, ensure_ascii=False)
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>%s</title>
  <meta name="description" content="%s">
  <link rel="canonical" href="%s%s">%s
  %s%s
</head>""" % (esc(title), esc(description), SITE, esc(canonical), robots, "\n  ".join(css), ld)

def site_header(active="", crumbs=None):
    crumb_html = ""
    if crumbs:
        parts = []
        for label, href in crumbs:
            if href:
                parts.append('<a href="%s">%s</a>' % (href, esc(label)))
            else:
                parts.append('<span aria-current="page">%s</span>' % esc(label))
        crumb_html = ('\n  <nav class="mi-crumbs" aria-label="Breadcrumb">%s</nav>'
                      % '<span class="mi-crumbs__sep" aria-hidden="true">/</span>'.join(parts))
    return """
<a class="fsa-skip-link" href="#main">Skip to content</a>
<header class="mi-topbar">
  <div class="mi-topbar__inner">
    <a class="mi-wordmark" href="/">Financially Sovereign Academy</a>
    <nav class="mi-topnav" aria-label="Primary">
      <a href="/articles/"%s>Money Ideas</a>
      <a href="/#modules">Modules</a>
    </nav>
  </div>%s
</header>""" % (' aria-current="page"' if active == "library" else '', crumb_html)

def site_footer(article_id=None):
    idline = ""
    if article_id:
        idline = ('\n  <p class="mi-print-meta">%s &middot; Revision %s</p>'
                  % (esc(article_id), REVISION_DATE))
    return """
<footer class="fsa-legal-footer">
  Created by Dalia &middot; financiallysovereign.academy &middot; Educational content only &middot; Not financial, legal, tax, or investment advice.%s
</footer>""" % idline

def status_badge(a):
    s = a["status"]
    if s == "published": return '<span class="mi-badge mi-badge--live">Published</span>'
    if s == "approved":  return '<span class="mi-badge mi-badge--live">Available</span>'
    if s == "drafted":   return '<span class="mi-badge mi-badge--draft">Draft &middot; in review</span>'
    return '<span class="mi-badge mi-badge--planned">Planned</span>'

def status_banner(a):
    """Visible, unmistakable non-published notice for dev/preview pages."""
    if is_public(a):
        return ""
    if a["status"] == "drafted":
        msg = ("This is a working draft using temporary content. It is pending "
               "educational review and is <strong>not approved or published</strong>.")
    else:
        msg = ("This article is <strong>planned but not yet written</strong>. "
               "The structure below is a placeholder for the FSA writing process.")
    return """
  <div class="mi-devnote" role="note">
    <span class="mi-devnote__tag">%s</span>
    <span>%s</span>
  </div>""" % (esc(a["status"].upper()), msg)

# ============================================================================
# Article page
# ============================================================================
def reading_meta(a):
    series_label = a["series"] or a["collection"] or "Foundations"
    return ('<div class="mi-articlemeta">'
            '<span class="fsa-eyebrow">%s</span>'
            '<span class="mi-dot" aria-hidden="true">&middot;</span>'
            '<span>%s min read</span>'
            '<span class="mi-dot" aria-hidden="true">&middot;</span>'
            '<span>%s</span>'
            '</div>') % (esc(series_label), a["readingMinutes"], esc(a["difficulty"]))

def related_learning(a):
    # When the CURRENT article is public, its related links are filtered to public
    # articles only, so a published page never links out to planned content. A
    # non-public preview page (itself noindex) keeps its links, and dev mode shows all.
    show_all = DEV_MODE or (not is_public(a))
    art_links = []
    for slug in a["relatedArticles"]:
        r = BY_SLUG.get(slug)
        if r and (show_all or is_public(r)):
            art_links.append('<li><a href="%s">%s</a></li>' % (r["canonicalPath"], esc(r["title"])))
    # next in series (shown when the current page may link it, per show_all)
    sibs = BY_SERIES.get(a["seriesSlug"], [])
    idx = next((i for i, s in enumerate(sibs) if s["slug"] == a["slug"]), None)
    nxt = ""
    if idx is not None and idx + 1 < len(sibs):
        n = sibs[idx + 1]
        if show_all or is_public(n):
            nxt = ('<p class="mi-next"><span class="fsa-eyebrow">Next in this series</span>'
                   '<a class="fsa-btn fsa-btn--secondary" href="%s">%s &rarr;</a></p>'
                   % (n["canonicalPath"], esc(n["title"])))
    # modules
    mod_links = []
    for m in a["fsaModules"]:
        f = MODULE_FILE.get(m)
        if f:
            mod_links.append('<li><a href="/modules/%s">%s module</a></li>' % (f, esc(m)))
    return """
  <section class="mi-related" aria-labelledby="related-h">
    <h2 class="fsa-h3" id="related-h">Explore the idea further</h2>
    <div class="mi-related__grid">
      <div>
        <span class="fsa-eyebrow">Related articles</span>
        <ul class="mi-linklist">%s</ul>
      </div>
      <div>
        <span class="fsa-eyebrow">Related FSA modules</span>
        <ul class="mi-linklist">%s</ul>
      </div>
    </div>
    %s
  </section>""" % ("".join(art_links) or "<li class='mi-muted'>Coming soon.</li>",
                   "".join(mod_links), nxt)

def sources_section(a):
    if a["slug"] == PROTOTYPE["slug"]:
        body = """
      <p class="mi-muted">Grouped by type; full citations are in the companion source file.</p>
      <dl class="mi-sources">
        <dt>Established research</dt><dd>Present bias and time discounting are supported by established peer-reviewed research.</dd>
        <dt>Supporting research</dt><dd>The point that making saving automatic increases saving is supported by research from an employer retirement-plan setting.</dd>
        <dt>Illustrative example (FSA)</dt><dd>"A payday, up close" (Marcus) is an FSA illustration for teaching, not evidence.</dd>
      </dl>
      <p class="mi-reviewnote"><strong>Review note:</strong> This article is under human review. See
      <a href="%s">the companion source file</a> for full citations.</p>""" % a["sourcesFile"]
    elif a["slug"] == LATER["slug"]:
        body = """
      <p class="mi-muted">Grouped by type; full citations are in the companion source file.</p>
      <dl class="mi-sources">
        <dt>Established research</dt><dd>Present bias, time discounting, and present-biased procrastination are supported by established peer-reviewed research.</dd>
        <dt>Concept and arithmetic</dt><dd>How interest compounds on a debt, and how starting earlier gives savings longer to grow, are stable mathematical relationships shown with rounded illustrative numbers, not cited statistics.</dd>
        <dt>Illustrative example (FSA)</dt><dd>"A small later, one season long" (Rosa and the twelve-dollar app) is an FSA illustration for teaching, not evidence.</dd>
      </dl>
      <p class="mi-reviewnote"><strong>Review note:</strong> This article is under human review. See
      <a href="%s">the companion source file</a> for full citations.</p>""" % a["sourcesFile"]
    elif a["slug"] == FOUR_JOBS["slug"]:
        body = """
      <p class="mi-muted">Grouped by type; full citations are in the companion source file.</p>
      <dl class="mi-sources">
        <dt>Established research</dt><dd>Opportunity cost is a foundational concept in economics, and the tendency to treat money as assigned to purposes is supported by established peer-reviewed research on mental accounting.</dd>
        <dt>Concept</dt><dd>That a dollar allocated to one use is unavailable to others is a stable accounting relationship, shown with rounded illustrative numbers, not cited statistics. The article carries no dated statistical claim.</dd>
        <dt>Illustrative example (FSA)</dt><dd>"One free forty dollars" (Teresa and the freed installment payment) is an FSA illustration for teaching, not evidence.</dd>
      </dl>
      <p class="mi-reviewnote"><strong>Review note:</strong> This article is under human review. See
      <a href="%s">the companion source file</a> for full citations.</p>""" % a["sourcesFile"]
    else:
        body = """
      <p class="mi-muted">This article is planned. Its factual claims, source list, and the
      line between evidence and illustration will be recorded in the
      <a href="%s">companion source file</a> during drafting.</p>""" % a["sourcesFile"]
    return """
  <section class="mi-sourcesbox" aria-labelledby="sources-h">
    <h2 class="fsa-h3" id="sources-h">Sources and review note</h2>%s
  </section>""" % body

def render_article(a):
    proto = (a["slug"] == PROTOTYPE["slug"])
    noindex = not is_public(a)
    desc = a["subtitle"] or a["coreQuestion"]
    jsonld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": a["title"],
        "description": desc,
        "author": {"@type": "Person", "name": "Dalia Platt"},
        "publisher": {"@type": "EducationalOrganization",
                      "name": "Financially Sovereign Academy", "url": SITE},
        "inLanguage": "en",
        "isAccessibleForFree": True,
        "keywords": ", ".join(_dedupe([a["primaryConcept"]] + a.get("concepts", []))),
    }
    crumbs = [("Money Ideas", "/articles/")]
    if a["series"]:
        crumbs.append((a["series"], "/articles/series/%s.html" % a["seriesSlug"]))
    else:
        crumbs.append(("Foundations", "/articles/series/foundations.html"))
    crumbs.append((a["title"], None))

    parts = [head(a["title"] + " | FSA Money Ideas", desc, a["canonicalPath"], noindex, jsonld=jsonld)]
    parts.append("<body>")
    parts.append('<div class="mi-progress" id="mi-progress" aria-hidden="true"></div>')
    parts.append(site_header(crumbs=crumbs))
    parts.append('<main id="main" class="mi-article">')
    parts.append('  <article class="mi-prose">')
    parts.append(status_banner(a))
    # 1 title + meta
    parts.append('    <header class="mi-articlehead">')
    parts.append('      %s' % reading_meta(a))
    parts.append('      <h1 class="fsa-h1">%s</h1>' % esc(a["title"]))
    if a["subtitle"]:
        parts.append('      <p class="fsa-lede">%s</p>' % esc(a["subtitle"]))
    parts.append('      <div class="mi-actions fsa-no-print">'
                 '<button type="button" class="fsa-chip" onclick="window.print()">Print / PDF</button>'
                 '</div>')
    parts.append('    </header>')

    if proto:
        # 2 opening
        parts.append(PROTOTYPE["opening"])
        # 3 common belief
        parts.append('    <h2 class="fsa-h2">The common belief</h2>')
        parts.append(PROTOTYPE["common_belief_html"])
        # 4 what's actually happening
        parts.append('    <h2 class="fsa-h2">What&rsquo;s actually happening</h2>')
        parts.append(PROTOTYPE["actually_html"])
        # 5 scenario
        parts.append(PROTOTYPE["scenario_html"])
        # 6 mental model callout
        parts.append(mental_model_box(a["mentalModel"] and PROTOTYPE["mental_model"]))
        # 7 boundary
        parts.append('    <h2 class="fsa-h2">When it&rsquo;s not about willpower at all</h2>')
        parts.append(PROTOTYPE["boundary_html"])
        # 8 why matters
        parts.append('    <h2 class="fsa-h2">Why this matters</h2>')
        parts.append(PROTOTYPE["why_html"])
        # 9 look for this today
        parts.append(exercise_box("Look for this today", PROTOTYPE["look_html"]))
        # 10 try it
        parts.append(exercise_box("Try it yourself", PROTOTYPE["try_html"]))
        # 11 closing question
        parts.append(closing_box(PROTOTYPE["closing_question"]))
    elif a["slug"] == LATER["slug"]:
        # 2 opening
        parts.append(LATER["opening"])
        # 3 common belief
        parts.append('    <h2 class="fsa-h2">The common belief</h2>')
        parts.append(LATER["common_belief_html"])
        # 4 what's actually happening
        parts.append('    <h2 class="fsa-h2">What&rsquo;s actually happening</h2>')
        parts.append(LATER["actually_html"])
        # 5 scenario
        parts.append(LATER["scenario_html"])
        # 6 mental model callout
        parts.append(mental_model_box(LATER["mental_model"]))
        # 7 boundary
        parts.append('    <h2 class="fsa-h2">When waiting is the right call</h2>')
        parts.append(LATER["boundary_html"])
        # 8 why matters
        parts.append('    <h2 class="fsa-h2">Why this matters</h2>')
        parts.append(LATER["why_html"])
        # 9 look for this today
        parts.append(exercise_box("Look for this today", LATER["look_html"]))
        # 10 try it
        parts.append(exercise_box("Try it yourself", LATER["try_html"]))
        # 11 closing question
        parts.append(closing_box(LATER["closing_question"]))
    elif a["slug"] == FOUR_JOBS["slug"]:
        # 2 opening
        parts.append(FOUR_JOBS["opening"])
        # 3 common belief
        parts.append('    <h2 class="fsa-h2">The common belief</h2>')
        parts.append(FOUR_JOBS["common_belief_html"])
        # 4 what's actually happening
        parts.append('    <h2 class="fsa-h2">What&rsquo;s actually happening</h2>')
        parts.append(FOUR_JOBS["actually_html"])
        # 5 scenario
        parts.append(FOUR_JOBS["scenario_html"])
        # 6 mental model callout
        parts.append(mental_model_box(FOUR_JOBS["mental_model"]))
        # 7 boundary
        parts.append('    <h2 class="fsa-h2">When the obvious job is the wrong one</h2>')
        parts.append(FOUR_JOBS["boundary_html"])
        # 8 why matters
        parts.append('    <h2 class="fsa-h2">Why this matters</h2>')
        parts.append(FOUR_JOBS["why_html"])
        # 9 look for this today
        parts.append(exercise_box("Look for this today", FOUR_JOBS["look_html"]))
        # 10 try it
        parts.append(exercise_box("Try it yourself", FOUR_JOBS["try_html"]))
        # 11 closing question
        parts.append(closing_box(FOUR_JOBS["closing_question"]))
    else:
        parts.append(placeholder_body(a))

    parts.append('  </article>')
    parts.append(related_learning(a))
    parts.append(sources_section(a))
    parts.append('</main>')
    parts.append(site_footer(article_id=a["id"]))
    parts.append('<script>window.MI_ARTICLE=%s;</script>' %
                 json.dumps({"id": a["id"], "slug": a["slug"], "series": a["seriesSlug"]}))
    parts.append('<script src="/js/analytics.js" defer></script>')
    parts.append('<script src="/js/article-reading-progress.js" defer></script>')
    parts.append('<script src="/js/article-related-content.js" defer></script>')
    parts.append("</body>\n</html>\n")
    return "\n".join(parts)

def mental_model_box(text):
    return """
    <aside class="mi-model" aria-label="The mental model">
      <span class="fsa-eyebrow">The mental model</span>
      <p class="mi-model__text">%s</p>
    </aside>""" % esc(text)

def exercise_box(title, inner_html):
    return """
    <section class="mi-exercise" aria-label="%s">
      <h2 class="fsa-h3 mi-exercise__title">%s</h2>
      %s
    </section>""" % (esc(title), esc(title), inner_html)

def closing_box(question):
    return """
    <section class="mi-closing" aria-label="One question to carry with you">
      <span class="fsa-eyebrow">One question to carry with you</span>
      <p class="mi-closing__q">%s</p>
    </section>""" % esc(question)

def placeholder_body(a):
    """Fully structured placeholder: every part of the template, labeled, with the
    article's authored brief so a writer can pick it up. No fabricated prose."""
    supp = ", ".join(a["supportingConcepts"])
    rows = [
        ("Opening tension", "Open with a recognizable situation, contradiction, or question. Not a definition."),
        ("The common belief", "State the misconception this article examines: &ldquo;%s&rdquo;" % esc(a["misconception"])),
        ("What&rsquo;s actually happening", "Explain the underlying idea (%s) in plain language." % esc(a["primaryConcept"])),
        ("A concrete scenario", "A realistic, numerically simple example from ordinary life."),
        ("The mental model", "&ldquo;%s&rdquo;" % esc(a["mentalModel"])),
        ("A boundary case", esc(a["boundaryCase"]) if a.get("boundaryCase")
         else "Show where the idea changes with circumstances. Avoid one universal rule."),
        ("Why this matters", "Connect the concept to real financial decisions."),
        ("Look for this today", "One observation exercise the reader can do before the day ends."),
        ("Try it yourself", "One short reflection, comparison, or calculation."),
        ("One question to carry with you", "&ldquo;%s&rdquo;" % esc(a["coreQuestion"])),
    ]
    out = ['    <div class="mi-brief">',
           '      <p><span class="fsa-eyebrow">Editorial brief</span></p>',
           '      <p class="mi-muted">%s</p>' % esc(a["brief"]),
           '      <dl class="mi-briefmeta">',
           '        <dt>Core question</dt><dd>%s</dd>' % esc(a["coreQuestion"]),
           '        <dt>Mental model</dt><dd>%s</dd>' % esc(a["mentalModel"]),
           '        <dt>Learner outcome</dt><dd>%s</dd>' % esc(a["learnerOutcome"]),
           '        <dt>Supporting concepts</dt><dd>%s</dd>' % esc(supp),
           '      </dl>',
           '    </div>',
           '    <ol class="mi-structure">']
    for label, note in rows:
        out.append('      <li><span class="mi-structure__label">%s</span>'
                   '<span class="mi-structure__note">%s</span></li>' % (label, note))
    out.append('    </ol>')
    return "\n".join(out)

# ============================================================================
# Series page
# ============================================================================
SERIES_ORDER = ["money-decisions", "financial-systems", "financial-independence", "economic-thinking"]

def series_num(slug):
    return {"money-decisions": "01", "financial-systems": "02",
            "financial-independence": "03", "economic-thinking": "04",
            "foundations": "00"}[slug]

def article_card(a, context="home"):
    badge = status_badge(a)
    modline = " &middot; ".join(a["fsaModules"][:1]) if a["fsaModules"] else ""
    sub = a["subtitle"] or a["coreQuestion"]
    return """
      <a class="mi-card%s" href="%s" data-status="%s" data-series="%s" data-concepts="%s" data-modules="%s">
        <div class="mi-card__top">
          <span class="mi-card__series">%s</span>
          %s
        </div>
        <h3 class="mi-card__title">%s</h3>
        <p class="mi-card__desc">%s</p>
        <div class="mi-card__foot">
          <span>%s min</span>
          <span class="mi-dot" aria-hidden="true">&middot;</span>
          <span>%s</span>
          %s
        </div>
      </a>""" % (
        "" ,
        a["canonicalPath"], a["status"], a["seriesSlug"],
        esc("|".join(a.get("concepts", []))), esc("|".join(a["fsaModules"])),
        esc(a["series"] or a["collection"] or "Foundations"), badge,
        esc(a["title"]), esc(sub),
        a["readingMinutes"], esc(a["primaryConcept"]),
        ('<span class="mi-dot" aria-hidden="true">&middot;</span><span>%s</span>' % esc(modline)) if modline else "")

def render_series(slug):
    """Renders a series page (including Foundations). Production shows only
    approved/published articles; dev mode shows all with badges + noindex.
    Foundations shares this path so it never accidentally omits the framing
    question, the connected-modules section, or the analytics script."""
    is_foundations = (slug == "foundations")
    meta = SERIES[slug]
    all_arts = BY_SERIES.get(slug, [])
    visible = public_only(all_arts)
    start = visible[0] if visible else None
    label = "Foundations" if is_foundations else "Series"
    crumbs = [("Money Ideas", "/articles/"), (meta["title"], None)]
    canonical = "/articles/series/%s.html" % slug
    parts = [head(meta["title"] + " | FSA Money Ideas",
                  meta["purpose"], canonical, noindex=DEV_MODE)]
    parts.append("<body>")
    parts.append(site_header(crumbs=crumbs))
    parts.append('<main id="main">')
    parts.append(dev_banner())
    parts.append("""
  <header class="fsa-section--deep fsa-section--glow mi-serieshero">
    <div class="fsa-wrap">
      <div class="mi-seriesnum">%s</div>
      <div class="fsa-eyebrow">FSA Money Ideas &middot; %s</div>
      <h1 class="fsa-h1">%s</h1>
      <p class="fsa-lede">%s</p>
      <p class="mi-framing">%s</p>
    </div>
  </header>""" % (series_num(slug), label, esc(meta["title"]),
                  esc(meta["purpose"]), esc(meta["question"])))
    # what you'll learn + start here (start points only at a public/visible article)
    start_html = ""
    if start:
        start_html = ('<a class="fsa-btn fsa-btn--primary" href="%s">Start here: %s &rarr;</a>'
                      % (start["canonicalPath"], esc(start["title"])))
    parts.append("""
  <section class="fsa-section">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">What you&rsquo;ll learn</div>
      <p class="mi-learn">%s</p>
      <div class="mi-starthere">%s</div>
    </div>
  </section>""" % (esc(meta["learn"]), start_html))
    # article cards (visible only). No public articles -> empty state, no planned cards.
    if visible:
        cards = "".join(article_card(a) for a in visible)
        parts.append("""
  <section class="fsa-section fsa-section--alt">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">Articles &middot; recommended order</div>
      <div class="mi-grid">%s</div>
    </div>
  </section>""" % cards)
    else:
        parts.append(empty_state("series"))
    # connected modules, derived from visible articles only (so a series with no
    # public articles does not reveal the planned set through its module links)
    mods = []
    for a in visible:
        for m in a["fsaModules"]:
            if m not in mods:
                mods.append(m)
    if mods:
        modlis = "".join('<li><a href="/modules/%s">%s</a></li>' % (MODULE_FILE[m], esc(m)) for m in mods)
        parts.append("""
  <section class="fsa-section">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">Connected FSA modules</div>
      <ul class="mi-linklist mi-linklist--wrap">%s</ul>
    </div>
  </section>""" % modlis)
    parts.append('</main>')
    parts.append(site_footer())
    parts.append('<script src="/js/analytics.js" defer></script>')
    parts.append("</body>\n</html>\n")
    return "\n".join(parts)

# ============================================================================
# Homepage
# ============================================================================
def render_home():
    intro = BY_SLUG["the-most-expensive-word-is-later"]
    visible_all = public_only(ARTICLES)
    canonical = "/articles/"
    parts = [head("FSA Money Ideas | Financially Sovereign Academy",
                  "Short articles for understanding how money decisions really work.",
                  canonical, noindex=DEV_MODE)]
    parts.append("<body>")
    parts.append(site_header(active="library"))
    parts.append('<main id="main">')
    parts.append(dev_banner())
    # hero
    parts.append("""
  <header class="fsa-section--deep fsa-section--glow mi-hero">
    <div class="fsa-wrap">
      <div class="fsa-eyebrow">Financially Sovereign Academy</div>
      <h1 class="fsa-h1">FSA <em>Money Ideas</em></h1>
      <p class="fsa-lede">Short articles for understanding how money decisions really work.</p>
      <p class="mi-intro">These are not quick financial tips. Each one takes about four to eight
      minutes and looks at a force beneath everyday money choices: tradeoffs, incentives, time,
      risk, credit, prices, banking, and wealth. Read one, and you should understand something
      you can use, without being sold anything.</p>
      <p class="mi-eduonly">Educational content only. Not financial, legal, tax, or investment advice.</p>
    </div>
  </header>""")
    # featured intro: only when the featured article is itself public/visible
    if DEV_MODE or is_public(intro):
        parts.append("""
  <section class="fsa-section">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">Start here</div>
      <a class="fsa-card--gradient mi-featured" href="%s">
        <div>
          <span class="fsa-eyebrow">Featured &middot; %s min read</span>
          <h2 class="fsa-h2">%s</h2>
          <p class="mi-featured__sub">%s</p>
        </div>
        <span class="mi-featured__go">Read the introduction &rarr;</span>
      </a>
    </div>
  </section>""" % (intro["canonicalPath"], intro["readingMinutes"],
                   esc(intro["title"]), esc(intro["subtitle"])))
    # browse by series: counts reflect only public/visible articles
    series_cards = []
    for slug in SERIES_ORDER:
        meta = SERIES[slug]
        n = len(public_only(BY_SERIES.get(slug, [])))
        count_label = ("%d article%s" % (n, "" if n == 1 else "s")) if n else "In preparation"
        series_cards.append("""
        <a class="mi-seriescard" href="/articles/series/%s.html">
          <span class="mi-seriescard__num">%s</span>
          <h3 class="mi-card__title">%s</h3>
          <p class="mi-card__desc">%s</p>
          <span class="mi-seriescard__count">%s</span>
        </a>""" % (slug, series_num(slug), esc(meta["title"]), esc(meta["purpose"]), count_label))
    parts.append("""
  <section class="fsa-section fsa-section--alt">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">Browse by series</div>
      <h2 class="fsa-h2">Four ways in</h2>
      <div class="mi-seriesgrid">%s</div>
    </div>
  </section>""" % "".join(series_cards))
    # browse-by-concept / module / article grid: only over public/visible articles.
    # With nothing public yet, show an honest in-preparation notice instead, and
    # never render a planned card.
    if visible_all:
        chips = "".join('<button type="button" class="mi-chip" data-concept="%s">%s</button>'
                        % (esc(c), esc(c)) for c in CONCEPTS)
        mod_counts = {m: 0 for m in MODULE_NAMES}
        for a in visible_all:
            for m in a["fsaModules"]:
                mod_counts[m] += 1
        mod_lis = "".join(
            '<a class="mi-modchip" href="/modules/%s" data-module="%s"><span>%s</span>'
            '<span class="mi-modchip__n">%d</span></a>' % (MODULE_FILE[m], esc(m), esc(m), mod_counts[m])
            for m in MODULE_NAMES)
        all_cards = "".join(article_card(a) for a in
                            sorted(visible_all, key=lambda x: (x["seriesOrder"] == 0 and -1 or x["seriesOrder"],
                                                               x["seriesSlug"])))
        legend = ("""<p class="mi-legend"><span class="mi-badge mi-badge--live">Available</span>
        <span class="mi-badge mi-badge--draft">Draft</span>
        <span class="mi-badge mi-badge--planned">Planned</span>
        <span class="mi-muted">Development preview: planned articles are not published.</span></p>"""
                  if DEV_MODE else "")
        parts.append("""
  <section class="fsa-section">
    <div class="fsa-wrap">
      <div class="fsa-section-tag">Browse by concept</div>
      <div class="mi-chips" id="mi-concepts">
        <button type="button" class="mi-chip is-active" data-concept="">All</button>
        %s
      </div>

      <div class="fsa-section-tag" style="margin-top:2rem">Browse by FSA module</div>
      <div class="mi-modrow">%s</div>

      <div class="mi-gridhead">
        <div class="fsa-section-tag" style="margin-top:2rem">All articles</div>
        %s
      </div>
      <div class="mi-grid" id="mi-grid" data-total="%d">%s</div>
      <p class="mi-noresult" id="mi-noresult" hidden>No articles match that filter yet.</p>
    </div>
  </section>""" % (chips, mod_lis, legend, len(visible_all), all_cards))
    else:
        parts.append(empty_state("library"))
    parts.append('</main>')
    parts.append(site_footer())
    parts.append('<script src="/js/analytics.js" defer></script>')
    parts.append('<script src="/js/article-library.js" defer></script>')
    parts.append("</body>\n</html>\n")
    return "\n".join(parts)

# ============================================================================
# Source stub
# ============================================================================
def render_source(a):
    proto = (a["slug"] == PROTOTYPE["slug"])
    lines = []
    lines.append("# Sources: %s\n" % a["title"])
    lines.append("- **Article ID:** %s" % a["id"])
    lines.append("- **Slug:** %s" % a["slug"])
    lines.append("- **Status:** %s" % a["status"])
    lines.append("- **Review status:** %s" % a["reviewStatus"])
    lines.append("- **Last updated:** %s\n" % REVISION_DATE)
    lines.append("> Every quantitative or factual claim in the published article must appear below")
    lines.append("> with a named, primary or authoritative source. Concepts (present bias, opportunity")
    lines.append("> cost, etc.) may rest on established research. FSA scenarios are illustrations, not")
    lines.append("> evidence, and are labeled as such.\n")
    lines.append("## Claims requiring support\n")
    if proto:
        lines.append("| Claim | Type | Source | Org / author | Pub date | URL | Accessed | Primary? | Limitations |")
        lines.append("|---|---|---|---|---|---|---|---|---|")
        lines.append("| People weight near rewards over distant ones (present bias) | research | _add citation_ | behavioral economics | _tbd_ | _tbd_ | _tbd_ | secondary | summarize, don't overclaim |")
        lines.append("| High-interest debt can outpace low-interest savings | concept/math | _illustrative_ | FSA | n/a | n/a | n/a | n/a | depends on actual rates |")
        lines.append("")
        lines.append("## Illustrative examples created by FSA\n")
        lines.append('- "A payday, up close" (Marcus): invented scenario. Not a data point. Numbers are round and for teaching only.\n')
        lines.append("## Statistics requiring future updates\n")
        lines.append("- None in this draft. If a savings-rate or emergency-expense statistic is added, date it and cite a primary source (e.g. Federal Reserve SHED).\n")
    else:
        lines.append("_None recorded yet. Fill this in during drafting, before the article can reach `approved`._\n")
        lines.append("| Claim | Type | Source | Org / author | Pub date | URL | Accessed | Primary? | Limitations |")
        lines.append("|---|---|---|---|---|---|---|---|---|")
        lines.append("| _example_ | factual / research / regulatory | | | | | | primary / secondary | |")
        lines.append("")
        lines.append("## Illustrative examples created by FSA\n")
        lines.append("- _List invented scenarios here so reviewers never mistake them for evidence._\n")
        lines.append("## Statistics requiring future updates\n")
        lines.append("- _List any dated figure that will go stale, with its source and as-of date._\n")
    return "\n".join(lines) + "\n"

# ============================================================================
# Registry
# ============================================================================
def build_registry():
    records = []
    for a in ARTICLES:
        records.append({
            "id": a["id"], "slug": a["slug"], "title": a["title"],
            "subtitle": a["subtitle"], "series": a["series"],
            "seriesSlug": a["seriesSlug"], "seriesOrder": a["seriesOrder"],
            "collection": a["collection"], "seriesPosition": a.get("seriesPosition"),
            "status": a["status"], "featured": a["featured"],
            "initialCollection": a.get("initialCollection", False),
            "language": a["language"], "translationOf": a["translationOf"],
            "availableLanguages": a["availableLanguages"],
            "readingMinutes": a["readingMinutes"], "difficulty": a["difficulty"],
            "primaryConcept": a["primaryConcept"], "concepts": a.get("concepts", []),
            "supportingConcepts": a["supportingConcepts"],
            "misconception": a["misconception"], "coreQuestion": a["coreQuestion"],
            "mentalModel": a["mentalModel"], "learnerOutcome": a["learnerOutcome"],
            "boundaryCase": a.get("boundaryCase"),
            "editorialBrief": a["brief"],
            "fsaModules": a["fsaModules"], "audiences": a["audiences"],
            "formats": a["formats"], "publishedDate": a["publishedDate"],
            "updatedDate": a["updatedDate"], "canonicalPath": a["canonicalPath"],
            "relatedArticles": a["relatedArticles"], "sourcesFile": a["sourcesFile"],
            "reviewStatus": a["reviewStatus"],
        })
    return {
        "$schema": "./article-library.schema.md",
        "library": "FSA Money Ideas",
        "generated": REVISION_DATE,
        "counts": {
            "total": len(records),
            "byStatus": _count(records, "status"),
            "public": sum(1 for r in records if r["status"] in PUBLIC_STATUSES),
        },
        "vocab": {
            "status": STATUS_VALUES, "publicStatuses": PUBLIC_STATUSES,
            "reviewStatus": REVIEW_STATUS_VALUES, "difficulty": DIFFICULTY_VALUES,
            "audiences": AUDIENCE_VALUES, "formats": FORMAT_VALUES,
            "concepts": CONCEPTS, "modules": MODULE_NAMES,
            "series": {s: SERIES[s]["title"] for s in SERIES},
        },
        "articles": records,
    }

def _count(records, key):
    out = {}
    for r in records:
        out[r[key]] = out.get(r[key], 0) + 1
    return out

# ============================================================================
# Write everything
# ============================================================================
def w(path, content):
    """Always (re)write a generated file: pages, registry, series. These are
    fully derived from library_data and are safe to overwrite every build."""
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)

def write_source(path, content):
    """Write a companion source file ONLY if it does not already exist.

    Source files hold hand-researched citations that a human fills in after the
    stub is first generated. A normal build must never overwrite one, or a rebuild
    would silently destroy researched sources. We create the stub the first time
    and preserve whatever is on disk thereafter. There is no migration and no
    deletion: an existing file is left byte-for-byte untouched. The validator still
    inspects existing files for stub markers on public articles.

    Returns "created" or "preserved".
    """
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    if os.path.exists(full):
        return "preserved"
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)
    return "created"

def main():
    os.makedirs(OUT, exist_ok=True)
    # registry
    with open(os.path.join(OUT, "article-library.json"), "w", encoding="utf-8") as f:
        json.dump(build_registry(), f, ensure_ascii=False, indent=2)
    # homepage
    w("index.html", render_home())
    # series pages (Foundations shares the same renderer)
    for slug in SERIES_ORDER:
        w("series/%s.html" % slug, render_series(slug))
    w("series/foundations.html", render_series("foundations"))
    # article pages (always regenerated) + source stubs (created once, then preserved)
    created, preserved = [], []
    for a in ARTICLES:
        rel = a["canonicalPath"].replace("/articles/", "", 1)
        w(rel, render_article(a))
        result = write_source("sources/%s.sources.md" % a["slug"], render_source(a))
        (created if result == "created" else preserved).append(a["slug"])
    print("OK: %d articles, %d series pages, registry written to %s"
          % (len(ARTICLES), len(SERIES_ORDER) + 1, OUT))
    print("Source files: %d created, %d preserved (existing source files are never overwritten)."
          % (len(created), len(preserved)))
    for s in created:
        print("  [created]   sources/%s.sources.md" % s)
    for s in preserved:
        print("  [preserved] sources/%s.sources.md" % s)

if __name__ == "__main__":
    main()
