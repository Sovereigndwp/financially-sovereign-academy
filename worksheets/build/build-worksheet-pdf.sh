#!/usr/bin/env bash
# build-worksheet-pdf.sh — convert an FSA worksheet markdown source into a
# black-and-white printable PDF. Offline only (pandoc + local LaTeX engine).
#
# Usage:
#   build-worksheet-pdf.sh <source.md> [output.pdf]
#   build-worksheet-pdf.sh --all            # build every worksheets/src/*.md
#
# Output default: worksheets/pdf/<same-basename>.pdf
# Requires: pandoc, and xelatex (preferred) or pdflatex.
set -euo pipefail

BUILD_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$(cd "$BUILD_DIR/../src" && pwd)"
PDF_DIR="$(cd "$BUILD_DIR/../pdf" && pwd)"
HEADER="$BUILD_DIR/worksheet-header.tex"

if ! command -v pandoc >/dev/null 2>&1; then
  echo "ERROR: pandoc not found. Install pandoc to build worksheet PDFs." >&2
  exit 1
fi

ENGINE="xelatex"
if ! command -v xelatex >/dev/null 2>&1; then
  if command -v pdflatex >/dev/null 2>&1; then
    ENGINE="pdflatex"
    echo "NOTE: xelatex not found; falling back to pdflatex (unicode glyphs may be limited)." >&2
  else
    echo "ERROR: no LaTeX engine (xelatex or pdflatex) found." >&2
    exit 1
  fi
fi

build_one() {
  local src="$1"
  local out="${2:-}"
  [ -f "$src" ] || { echo "ERROR: source not found: $src" >&2; return 1; }
  if [ -z "$out" ]; then
    out="$PDF_DIR/$(basename "${src%.md}").pdf"
  fi

  local -a fontargs=()
  if [ "$ENGINE" = "xelatex" ]; then
    # DejaVu covers the unicode glyphs (arrows, checkboxes) used in worksheets.
    fontargs=(-V mainfont="DejaVu Serif" -V sansfont="DejaVu Sans" -V monofont="DejaVu Sans Mono")
  fi

  pandoc "$src" -o "$out" \
    --pdf-engine="$ENGINE" \
    "${fontargs[@]}" \
    -V geometry:margin=0.7in \
    -V fontsize=10pt \
    -H "$HEADER"

  echo "built: $out"
}

if [ "${1:-}" = "--all" ]; then
  shopt -s nullglob
  for f in "$SRC_DIR"/*.md; do build_one "$f"; done
elif [ -n "${1:-}" ]; then
  build_one "$1" "${2:-}"
else
  echo "Usage: $(basename "$0") <source.md> [output.pdf]   |   --all" >&2
  exit 2
fi
