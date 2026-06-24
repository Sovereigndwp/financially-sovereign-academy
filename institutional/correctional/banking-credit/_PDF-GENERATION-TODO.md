# TODO: Printable PDF versions (Program 1 materials)

Status: not done yet. The site currently links to the rendered HTML pages, which print cleanly from a browser. The hub page tells users "Printable PDF versions coming soon." No fake PDF links exist. Do not add a PDF link until the file exists.

## What to generate

Generate one PDF per material into a new `print/` folder beside the HTML pages:
`institutional/correctional/banking-credit/print/`

| Material | Source markdown (TSA repo) | Existing .docx (TSA repo) | Target PDF |
|---|---|---|---|
| Facilitator Guide | `_src/04-facilitator-guide.md` | `04-Facilitator-Guide.docx` | `print/facilitator-guide.pdf` |
| Facility Implementation Guide | `_src/09-facility-implementation-guide.md` | `09-Facility-Implementation-Guide.docx` | `print/facility-implementation-guide.pdf` |
| Pre and Post Assessment | `_src/06-pre-and-post-assessment.md` | `06-Pre-and-Post-Assessment.docx` | `print/pre-post-assessment.pdf` |
| 90-Day Follow-Up Survey | `_src/08-90-day-follow-up-survey.md` | `08-90-Day-Follow-Up-Survey.docx` | `print/follow-up-survey.pdf` |
| Partner Network Checklist | `_src/11-partner-network-checklist.md` | `11-Partner-Network-Checklist.docx` | `print/partner-network-checklist.pdf` |
| Grant and Funder One-Pager | `_src/10-grant-funder-one-pager.md` | `10-Grant-Funder-One-Pager.docx` | `print/grant-funder-one-pager.pdf` |
| Student Workbook | `_src/05-student-workbook.md` | `05-Student-Workbook.docx` | `print/student-workbook.pdf` |
| Source and Claims Ledger | `SOURCE-AND-CLAIMS-LEDGER.md` | (none) | `print/source-and-claims-ledger.pdf` |

TSA repo path: `~/Documents/Claude/Projects/TSA/reentry-programs/program-1-banking-credit/`

## Two ways to generate

Option A, from the existing Word files (fastest, keeps formatting):
```
# needs LibreOffice
soffice --headless --convert-to pdf --outdir <print/> *.docx
```

Option B, from markdown with the same brand styling as the HTML pages:
```
# needs a HTML-to-PDF engine such as weasyprint or wkhtmltopdf
pandoc <src.md> -s -H header-style.html -o <out.html>
weasyprint <out.html> <print/out.pdf>
```
The `header-style.html` used for the HTML pages is the print-friendly stylesheet (light background, green and teal headings, print rules).

## After generating

1. Place PDFs in `institutional/correctional/banking-credit/print/`.
2. On `banking-credit.html`, change each material row to add a second link, for example: `Open` (HTML) and `PDF`.
3. Update the note "Printable PDF versions coming soon" once they are live.
4. Keep the student workbook PDF easy to find for facilitators who print for a class.

No deadline set. The HTML print path covers the need until then.
