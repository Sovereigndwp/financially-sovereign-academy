#!/usr/bin/env bash
#
# fsa-style-check.sh — guardrail audit for FSA program / brand-sensitive pages.
# Flags the deprecated broad-green theme and other forbidden brand patterns.
# See docs/fsa-program-style-contract.md
#
# SCOPE: this gate is for NEW pages built clean from css/fsa-brand.css.
# Bridge-migrated LEGACY pages (which intentionally keep fsa-theme.css + token
# fallbacks like var(--fsa-bg-dark, #0a1f1a)) will report hits and are OUT OF
# SCOPE for this gate — do not run it as a pass/fail on them.
#
# Usage:
#   scripts/fsa-style-check.sh <path>     # a file or a directory (recursed)
#   scripts/fsa-style-check.sh .          # whole repo (slow)
#
# Exit codes: 0 = clean (warnings allowed), 1 = forbidden pattern found, 2 = bad usage.

set -u

TARGET="${1:-}"
if [ -z "$TARGET" ] || [ ! -e "$TARGET" ]; then
  echo "usage: $0 <file-or-directory>" >&2
  exit 2
fi

# Only scan HTML/CSS files.
if [ -d "$TARGET" ]; then
  FILES=$(find "$TARGET" -type f \( -name '*.html' -o -name '*.css' \))
else
  FILES="$TARGET"
fi
[ -z "$FILES" ] && { echo "No .html/.css files found under: $TARGET"; exit 0; }

fail=0

# fail <regex> <message>
fail_rule() {
  local pattern="$1" msg="$2" hits
  hits=$(grep -nEi "$pattern" $FILES 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "FORBIDDEN: $msg"
    echo "$hits" | sed 's/^/  /'
    echo
    fail=1
  fi
}

# warn <regex> <message>  (does not fail the build)
warn_rule() {
  local pattern="$1" msg="$2" hits
  hits=$(grep -nEi "$pattern" $FILES 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "WARNING (review): $msg"
    echo "$hits" | sed 's/^/  /'
    echo
  fi
}

echo "FSA style check — scanning:"
echo "$FILES" | sed 's/^/  /'
echo

# --- Hard failures: the deprecated green theme ---
fail_rule 'fsa-theme\.css'                              "links the deprecated green theme (use /css/fsa-brand.css)"
fail_rule '#0a1f1a'                                     "dark-green surface #0a1f1a"
fail_rule '#0f2922'                                     "dark-green surface #0f2922"
fail_rule '#1a3a2e'                                     "dark-green surface #1a3a2e"
fail_rule '#234a3c'                                     "dark-green surface #234a3c"
fail_rule 'background[^;}{]*rgba\(16, ?185, ?129'       "green-tinted background fill rgba(16,185,129,...) — use a neutral surface token"
fail_rule 'linear-gradient\([^)]*#0f2922'               "green gradient using old dark-green values"
fail_rule 'linear-gradient\([^)]*#1a3a2e'               "green gradient using old dark-green values"
fail_rule '--fsa-green[[:space:]]*:'                    "defines --fsa-green (do not re-declare brand tokens)"
fail_rule '--fsa-bg-[a-z]+[[:space:]]*:[[:space:]]*#0'  "defines a green --fsa-bg-* token"

# --- Warnings: review-gated, not auto-fail ---
warn_rule ':root[[:space:]]*\{'                         "page-local :root block — allowed only with maintainer sign-off"
warn_rule 'background:[[:space:]]*(var\(--fsa-green|#10b981)' "hue-filled green button/element — prefer .fsa-btn--primary (gradient-outline)"

if [ "$fail" -eq 0 ]; then
  echo "PASS — no forbidden patterns. (Resolve any warnings above if they apply.)"
  exit 0
else
  echo "FAIL — forbidden brand patterns found. See docs/fsa-program-style-contract.md"
  exit 1
fi
