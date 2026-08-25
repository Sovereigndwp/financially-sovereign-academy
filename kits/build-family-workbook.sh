#!/usr/bin/env bash
# build-family-workbook.sh — rebuild the Trump Accounts family workbook PDFs
# from kits/src/*.md. Requires pandoc + xelatex + DejaVu fonts.
#
#   ./kits/build-family-workbook.sh
#
# Output: kits/assets/TrumpAccountFamilyWorkbookEN-v1.pdf
#         kits/assets/CuadernoFamiliarCuentasTrumpES-v1.pdf
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/kits/src"
OUT="$ROOT/kits/assets"
HDR="$(mktemp /tmp/fsa-wb-header.XXXX.tex)"

cat > "$HDR" <<'TEX'
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}
\fancyfoot[L]{\scriptsize Financially Sovereign Academy}
\fancyfoot[C]{\small \thepage}
\fancyfoot[R]{\scriptsize Educational information, not financial advice.}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0.2pt}
\usepackage{sectsty}
\allsectionsfont{\sffamily}
\setlength{\parskip}{3pt}
\setlength{\parindent}{0pt}
\usepackage{array}
\usepackage{longtable}
\usepackage{booktabs}
TEX

build () {
  pandoc "$SRC/$1.md" -o "$OUT/$2.pdf" \
    --pdf-engine=xelatex -f markdown-task_lists \
    -V mainfont="DejaVu Serif" -V sansfont="DejaVu Sans" -V monofont="DejaVu Sans Mono" \
    -V geometry:margin=0.7in -V fontsize=9.5pt \
    -H "$HDR"
  echo "built: $OUT/$2.pdf"
}

build trump-account-family-workbook-EN-v1 TrumpAccountFamilyWorkbookEN-v1
build cuaderno-familiar-cuentas-trump-ES-v1 CuadernoFamiliarCuentasTrumpES-v1
rm -f "$HDR"
