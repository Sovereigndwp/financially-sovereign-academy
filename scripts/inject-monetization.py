#!/usr/bin/env python3
"""
Inject analytics and email capture components into all FSA pages.
Idempotent: skips files that already have the components.
"""

import os
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SNIPPET = """
<!-- FSA Analytics & Email Capture -->
<div style="margin: 2rem auto; max-width: 900px; padding: 0 1.5rem;">
    <div data-fsa-email-capture="page-footer" data-title="📬 Level Up Your Finances" data-subtitle="Weekly money tips and financial strategies. No spam, ever."></div>
</div>
<script src="/js/analytics.js"></script>
<script src="/js/email-capture.js"></script>
"""

MARKER = "/js/analytics.js"

stats = {"injected": 0, "skipped": 0}


def process_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        if MARKER in content:
            stats["skipped"] += 1
            return

        lower = content.lower()
        idx = lower.rfind("</body>")
        if idx == -1:
            stats["skipped"] += 1
            return

        snippet = SNIPPET
        if "/js/email-capture.js" in content:
            lines = snippet.split("\n")
            lines = [l for l in lines if "email-capture" not in l]
            snippet = "\n".join(lines)

        new_content = content[:idx] + snippet + "\n" + content[idx:]

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)

        stats["injected"] += 1
    except Exception as e:
        print(f"  ERROR: {filepath}: {e}")


def main():
    # Find all HTML files in root and content directories
    patterns = [
        os.path.join(ROOT, "*.html"),
        os.path.join(ROOT, "modules", "**", "*.html"),
        os.path.join(ROOT, "calculators", "**", "*.html"),
    ]

    files = []
    for p in patterns:
        files.extend(glob.glob(p, recursive=True))

    # Exclude google verification files
    files = [f for f in files if "google" not in os.path.basename(f).lower()]

    print(f"Found {len(files)} HTML files to process")

    for f in sorted(files):
        process_file(f)

    print(f"\nDone!")
    print(f"  Injected: {stats['injected']}")
    print(f"  Skipped: {stats['skipped']}")


if __name__ == "__main__":
    main()
