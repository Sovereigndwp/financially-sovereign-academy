#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_public_visibility.py: proves the production build never exposes planned
articles on the library homepage or series pages, and that development mode does.

Builds the site twice into temp trees: production (default) and development
(FSA_DEV_MODE=1). Stdlib only. Exit 0 = all checks pass.

Checks:
  Production (index.html, series/*.html, series/foundations.html):
    - contain NO href to any non-public (planned/drafted) article page
    - render NO article cards when the series/library has no public articles
    - are indexable (no robots noindex)
  Development:
    - index/series pages ARE served noindex
    - index shows planned content (article cards / links appear)
  Both:
    - individual article pages are still generated
    - the production tree passes validation
"""
import os, re, sys, json, shutil, subprocess, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build.py")
VALIDATE = os.path.join(HERE, "validate_articles.py")
PUBLIC = {"approved", "published"}

def build(out_articles, dev):
    env = dict(os.environ, FSA_ARTICLES_OUT=out_articles)
    if dev:
        env["FSA_DEV_MODE"] = "1"
    else:
        env.pop("FSA_DEV_MODE", None)
    r = subprocess.run([sys.executable, BUILD], env=env, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stdout.write(r.stdout); sys.stderr.write(r.stderr)
        raise SystemExit("build failed")

def make_placeholders(root):
    for p in ("css/fsa-brand.css", "css/fsa-articles.css", "js/analytics.js",
              "js/article-library.js", "js/article-reading-progress.js",
              "js/article-related-content.js"):
        fp = os.path.join(root, p); os.makedirs(os.path.dirname(fp), exist_ok=True)
        open(fp, "w").write("/* test */\n")
    for m in ("money-mindset-cash-flow", "emergency-funds-saving", "banking-basics",
              "credit-scores", "debt-strategy", "taxes-paychecks",
              "investing-fundamentals", "risk-insurance", "consumer-protection",
              "financial-master-plan"):
        fp = os.path.join(root, "modules", m + ".html"); os.makedirs(os.path.dirname(fp), exist_ok=True)
        open(fp, "w").write("<title>stub</title>\n")

def read(p):
    return open(p, encoding="utf-8").read()

def library_pages(arts_dir):
    pages = [os.path.join(arts_dir, "index.html")]
    series_dir = os.path.join(arts_dir, "series")
    for fn in sorted(os.listdir(series_dir)):
        if fn.endswith(".html"):
            pages.append(os.path.join(series_dir, fn))
    return pages

def main():
    prod = tempfile.mkdtemp(prefix="fsa-vis-prod-")
    dev = tempfile.mkdtemp(prefix="fsa-vis-dev-")
    try:
        make_placeholders(prod); make_placeholders(dev)
        build(os.path.join(prod, "articles"), dev=False)
        build(os.path.join(dev, "articles"), dev=True)
        prod_arts = os.path.join(prod, "articles")
        dev_arts = os.path.join(dev, "articles")

        reg = json.load(open(os.path.join(prod_arts, "article-library.json"), encoding="utf-8"))
        nonpublic_paths = [a["canonicalPath"] for a in reg["articles"] if a["status"] not in PUBLIC]
        public_paths = [a["canonicalPath"] for a in reg["articles"] if a["status"] in PUBLIC]

        # --- Production: no planned links, no cards, indexable ---
        for page in library_pages(prod_arts):
            html = read(page)
            rel = os.path.relpath(page, prod_arts)
            for path in nonpublic_paths:
                assert ('href="%s"' % path) not in html, \
                    "PROD %s exposes planned article link %s" % (rel, path)
            if not public_paths:
                assert 'class="mi-card"' not in html, "PROD %s renders article cards with 0 public articles" % rel
            assert 'content="noindex' not in html, "PROD %s is noindex (should be indexable)" % rel
        print("PASS production: library/series pages expose no planned links or cards, and are indexable")

        # --- Development: noindex + planned content visible ---
        dev_index = read(os.path.join(dev_arts, "index.html"))
        assert 'content="noindex' in dev_index, "DEV index should be noindex"
        assert 'class="mi-card"' in dev_index, "DEV index should show planned article cards"
        # at least one planned link present somewhere in dev library pages
        found_planned = any(('href="%s"' % p) in read(pg)
                            for pg in library_pages(dev_arts) for p in nonpublic_paths)
        assert found_planned, "DEV pages should link planned articles"
        for pg in library_pages(dev_arts):
            assert 'content="noindex' in read(pg), "DEV %s should be noindex" % os.path.relpath(pg, dev_arts)
        print("PASS development: library/series pages are noindex and show planned content")

        # --- Article pages still generated ---
        proto = os.path.join(prod_arts, "money-decisions", "why-saving-money-feels-so-hard.html")
        assert os.path.exists(proto), "article pages should still be generated in production"
        print("PASS: individual article pages are still generated")

        # --- Production tree validates ---
        r = subprocess.run([sys.executable, VALIDATE, prod], capture_output=True, text=True)
        assert r.returncode == 0, "production tree failed validation:\n" + r.stdout + r.stderr
        print("PASS: production tree passes validation")

        print("\nALL PUBLIC-VISIBILITY CHECKS PASSED")
        return 0
    finally:
        shutil.rmtree(prod, ignore_errors=True)
        shutil.rmtree(dev, ignore_errors=True)

if __name__ == "__main__":
    sys.exit(main())
