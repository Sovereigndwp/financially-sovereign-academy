# Printable PDF and DOCX versions (Program 1 materials): DONE

Status: done as of June 24, 2026.

Print-ready PDF and editable Word (DOCX) versions of all eight Program 1 materials now exist in:
`institutional/correctional/banking-credit/print/`

Files (one PDF and one DOCX each):
- facilitator-guide
- student-workbook
- pre-post-assessment
- facility-implementation-guide
- follow-up-survey
- partner-network-checklist
- grant-funder-one-pager
- source-and-claims-ledger

The landing page `banking-credit.html` links to the web page, the PDF, and the DOCX for each material. The "coming soon" note has been replaced.

How they were generated: PDFs from the rendered HTML pages with weasyprint (keeps the brand styling, nav bar hidden for print). DOCX from the same HTML with pandoc (nav stripped). To regenerate after a content change, rebuild the HTML page, then re-run the same conversion into `print/`.
