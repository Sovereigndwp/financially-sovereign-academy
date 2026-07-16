#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
test_source_persistence.py: proves the generator never overwrites a hand-filled
source file, and that the validator still gates stub sources on public articles.

It runs the real scripts/build.py into a temporary tree (via the FSA_ARTICLES_OUT
environment variable) and the real scripts/validate_articles.py against it. Stdlib
only. Exit 0 = all four cases pass; non-zero on the first failure.

Cases:
  1. a missing source file is generated
  2. a completed source file survives a second build unchanged (sha256 equal)
  3. a planned/drafted stub source file remains valid for a non-public article
  4. an approved/published article with stub markers still fails validation
"""
import os, sys, json, hashlib, shutil, subprocess, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build.py")
VALIDATE = os.path.join(HERE, "validate_articles.py")
PROTO_SLUG = "why-saving-money-feels-so-hard"
STUB_SLUG = "scarcity-never-disappears"   # stays a stub; used for the public-fail case

def sha(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def run_build(out_articles):
    env = dict(os.environ, FSA_ARTICLES_OUT=out_articles)
    r = subprocess.run([sys.executable, BUILD], env=env, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stdout.write(r.stdout); sys.stderr.write(r.stderr)
        raise SystemExit("build failed")
    return r.stdout

def run_validate(root):
    r = subprocess.run([sys.executable, VALIDATE, root], capture_output=True, text=True)
    return r.returncode, r.stdout + r.stderr

def make_placeholders(root):
    """Minimal css/js/modules so the validator's internal-link check resolves."""
    for p in ("css/fsa-brand.css", "css/fsa-articles.css", "js/analytics.js",
              "js/article-library.js", "js/article-reading-progress.js",
              "js/article-related-content.js"):
        fp = os.path.join(root, p)
        os.makedirs(os.path.dirname(fp), exist_ok=True)
        open(fp, "w").write("/* test placeholder */\n")
    for m in ("money-mindset-cash-flow", "emergency-funds-saving", "banking-basics",
              "credit-scores", "debt-strategy", "taxes-paychecks",
              "investing-fundamentals", "risk-insurance", "consumer-protection",
              "financial-master-plan"):
        fp = os.path.join(root, "modules", m + ".html")
        os.makedirs(os.path.dirname(fp), exist_ok=True)
        open(fp, "w").write("<title>module stub</title>\n")

def main():
    tmp = tempfile.mkdtemp(prefix="fsa-src-test-")
    try:
        arts = os.path.join(tmp, "articles")
        make_placeholders(tmp)

        # Case 1: missing source file is generated
        out1 = run_build(arts)
        src = os.path.join(arts, "sources", PROTO_SLUG + ".sources.md")
        assert os.path.exists(src), "case 1: source file was not generated"
        assert "[created]" in out1, "case 1: build did not report any created source"
        print("PASS case 1: missing source file is generated")

        # Case 2: a completed source file survives a second build unchanged
        completed = ("# Sources: completed\n\nReal citation content with no stub markers. "
                     + ("verified " * 40) + "\n")
        with open(src, "w", encoding="utf-8") as f:
            f.write(completed)
        before = sha(src)
        out2 = run_build(arts)
        after = sha(src)
        assert before == after, "case 2: completed source file was overwritten on rebuild"
        assert ("[preserved] sources/%s.sources.md" % PROTO_SLUG) in out2, \
            "case 2: rebuild did not report the file as preserved"
        print("PASS case 2: completed source file preserved on rebuild (sha256 unchanged)")

        # Case 3: planned/drafted stub sources remain valid for non-public articles
        code3, log3 = run_validate(tmp)
        assert code3 == 0, "case 3: validation failed on a non-public tree with stub sources:\n" + log3
        print("PASS case 3: stub sources valid for non-public (planned/drafted) articles")

        # Case 4: an approved/published article with stub markers still fails validation
        reg_path = os.path.join(arts, "article-library.json")
        reg = json.load(open(reg_path, encoding="utf-8"))
        found = False
        for a in reg["articles"]:
            if a["slug"] == STUB_SLUG:
                a["status"] = "published"       # make it public
                a["reviewStatus"] = "approved"  # pass the review gate so the STUB gate is what fails
                found = True
        assert found, "case 4 setup: target stub article not found in registry"
        json.dump(reg, open(reg_path, "w", encoding="utf-8"))
        code4, log4 = run_validate(tmp)
        assert code4 != 0, "case 4: validation passed for a published article with a stub source"
        assert "stub" in log4.lower(), "case 4: failure was not the stub-source check:\n" + log4
        print("PASS case 4: published article with stub source fails validation")

        print("\nALL 4 CASES PASSED")
        return 0
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

if __name__ == "__main__":
    sys.exit(main())
