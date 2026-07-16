#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validate_articles.py: integrity checks for the FSA Money Ideas article library.

Usage:
    python3 scripts/validate_articles.py [REPO_ROOT]

REPO_ROOT defaults to the repository root (two levels up from this script).
Exit code 0 = all checks pass; 1 = one or more errors.

Checks (per the build brief, section 19.17):
  - duplicate article IDs
  - duplicate slugs
  - broken internal paths (article/series/home hrefs + src to /articles /modules /css /js)
  - missing required metadata
  - values outside the controlled vocabularies
  - invalid series order (duplicate or non-contiguous order within a series)
  - published/approved articles without a real (non-stub) source file
  - published/approved articles without review approval
"""
import json, os, re, sys

REQUIRED = [
    "id", "slug", "title", "series", "seriesSlug", "seriesOrder", "status",
    "featured", "language", "readingMinutes", "difficulty", "primaryConcept",
    "supportingConcepts", "misconception", "coreQuestion", "mentalModel",
    "learnerOutcome", "fsaModules", "audiences", "formats", "canonicalPath",
    "relatedArticles", "sourcesFile", "reviewStatus",
]
PUBLIC_STATUSES = {"approved", "published"}

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.dirname(script_dir)
    articles_dir = os.path.join(root, "articles")
    reg_path = os.path.join(articles_dir, "article-library.json")

    errors, warnings = [], []
    def err(m): errors.append(m)
    def warn(m): warnings.append(m)

    if not os.path.exists(reg_path):
        print("FATAL: registry not found at %s" % reg_path); sys.exit(1)
    reg = json.load(open(reg_path, encoding="utf-8"))
    arts = reg["articles"]
    vocab = reg["vocab"]

    # ---- duplicate IDs / slugs ----
    ids, slugs = {}, {}
    for a in arts:
        ids.setdefault(a.get("id"), []).append(a.get("slug"))
        slugs.setdefault(a.get("slug"), []).append(a.get("id"))
    for k, v in ids.items():
        if len(v) > 1: err("duplicate id %s used by %s" % (k, v))
    for k, v in slugs.items():
        if len(v) > 1: err("duplicate slug %s used by %s" % (k, v))

    # ---- required metadata + vocab ----
    valid_status = set(vocab["status"])
    valid_review = set(vocab["reviewStatus"])
    valid_diff = set(vocab["difficulty"])
    valid_aud = set(vocab["audiences"])
    valid_fmt = set(vocab["formats"])
    valid_mod = set(vocab["modules"])
    valid_series = set(vocab["series"].keys())
    all_slugs = set(slugs.keys())

    for a in arts:
        sid = a.get("id", "?")
        for f in REQUIRED:
            if f not in a or a[f] in (None, "") and f not in ("series",):
                # series may legitimately be null (foundations intro)
                if f == "series":
                    continue
                if a.get(f) in (None, ""):
                    err("%s missing required field '%s'" % (sid, f))
        if a.get("status") not in valid_status: err("%s invalid status '%s'" % (sid, a.get("status")))
        if a.get("reviewStatus") not in valid_review: err("%s invalid reviewStatus '%s'" % (sid, a.get("reviewStatus")))
        if a.get("difficulty") not in valid_diff: err("%s invalid difficulty '%s'" % (sid, a.get("difficulty")))
        if a.get("seriesSlug") not in valid_series: err("%s invalid seriesSlug '%s'" % (sid, a.get("seriesSlug")))
        for m in a.get("fsaModules", []):
            if m not in valid_mod: err("%s unknown module '%s'" % (sid, m))
        for au in a.get("audiences", []):
            if au not in valid_aud: err("%s unknown audience '%s'" % (sid, au))
        for fm in a.get("formats", []):
            if fm not in valid_fmt: err("%s unknown format '%s'" % (sid, fm))
        for rel in a.get("relatedArticles", []):
            if rel not in all_slugs: err("%s relatedArticles -> unknown slug '%s'" % (sid, rel))

    # ---- series order: unique + contiguous ----
    per_series = {}
    for a in arts:
        per_series.setdefault(a["seriesSlug"], []).append(a["seriesOrder"])
    for s, orders in per_series.items():
        if len(set(orders)) != len(orders):
            err("series '%s' has duplicate seriesOrder values: %s" % (s, sorted(orders)))
        nonzero = sorted(o for o in orders if o != 0)
        expected = list(range(1, len(nonzero) + 1))
        if nonzero != expected:
            err("series '%s' order not contiguous 1..n: got %s" % (s, sorted(orders)))

    # ---- file existence: canonical page + source file ----
    def local(path):  # "/articles/x" -> abs file
        p = path.split("#")[0].split("?")[0]
        if p.endswith("/"): p += "index.html"
        return os.path.join(root, p.lstrip("/"))
    for a in arts:
        cp = local(a["canonicalPath"])
        if not os.path.exists(cp): err("%s canonicalPath file missing: %s" % (a["id"], a["canonicalPath"]))
        sf = local(a["sourcesFile"])
        if not os.path.exists(sf): err("%s sourcesFile missing: %s" % (a["id"], a["sourcesFile"]))

    # ---- published/approved gates ----
    for a in arts:
        if a.get("status") in PUBLIC_STATUSES:
            if a.get("reviewStatus") != "approved":
                err("%s is %s but reviewStatus is '%s' (must be 'approved')"
                    % (a["id"], a["status"], a.get("reviewStatus")))
            sf = local(a["sourcesFile"])
            content = open(sf, encoding="utf-8").read() if os.path.exists(sf) else ""
            if "_None recorded yet_" in content or "_example_" in content or "_add citation_" in content or len(content) < 200:
                err("%s is %s but its source file still looks like a stub" % (a["id"], a["status"]))

    # ---- broken internal links across LIBRARY-OWNED HTML only ----
    # Scope to pages the library generates (homepage, series pages, article
    # canonical paths). Legacy/unrelated files living in articles/ (e.g. older
    # SEO guides) are not this library's responsibility and are not scanned.
    owned = set()
    owned.add(os.path.join(articles_dir, "index.html"))
    for s in vocab["series"].keys():
        owned.add(os.path.join(articles_dir, "series", "%s.html" % s))
    for a in arts:
        owned.add(local(a["canonicalPath"]))
    href_re = re.compile(r'(?:href|src)="(/[^"#?]*)(?:[#?][^"]*)?"')
    scanned = 0
    for fp in sorted(owned):
        if not os.path.exists(fp):
            continue  # existence already reported above for canonical paths
        scanned += 1
        text = open(fp, encoding="utf-8").read()
        for m in href_re.finditer(text):
            target = m.group(1)
            if target in ("/",): continue
            fpath = local(target)
            if not os.path.exists(fpath):
                err("broken link in %s -> %s" % (os.path.relpath(fp, root), target))

    # ---- report ----
    print("FSA Money Ideas: library validation")
    print("  root:        %s" % root)
    print("  articles:    %d" % len(arts))
    print("  html scanned:%d" % scanned)
    print("  public:      %d (approved/published)" % sum(1 for a in arts if a["status"] in PUBLIC_STATUSES))
    for w in warnings: print("  WARN: %s" % w)
    if errors:
        print("\nFAILED: %d error(s):" % len(errors))
        for e in errors: print("  ERROR: %s" % e)
        sys.exit(1)
    print("\nPASS: no errors.")
    sys.exit(0)

if __name__ == "__main__":
    main()
