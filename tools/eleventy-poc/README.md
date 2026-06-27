# FSA Eleventy PoC — Stage 1B (deployment-isolated)

This folder is a **sandbox**. It exists to prove we can templatize FSA modules
with Eleventy **without changing how Vercel serves production**.

## The deploy-safety invariant (why this lives here, not at repo root)
Vercel decides "static site" vs "build project" by inspecting the **deploy root**.
PR #57 broke production by adding a root `package.json`, which made Vercel treat the
repo as a build project. To prevent that:

- No `package.json`, `package-lock.json`, `.eleventy.js`, or `_site/` at the repo root.
- All Eleventy tooling stays under `tools/eleventy-poc/`.
- The Vercel project Root Directory stays `/`, so this nested `package.json` is never auto-detected.
- Production keeps serving the committed static HTML in `/modules/*.html`. Eleventy output here is **local-only and gitignored**.

## Model: generate-and-commit (later stages)
Eleventy runs **locally** and regenerates a module's HTML; the **committed static file**
is what ships. Vercel never runs a build. Stage 1B only proves byte-identity for one module.

## Use
```
cd tools/eleventy-poc
npm install            # installs Eleventy into THIS folder only (gitignored node_modules)
npm run verify         # builds to _site/ and prints md5 of generated vs committed risk-insurance.html
```
A matching md5 means the template reproduces the real module byte-for-byte.

## Scope guardrails (Stage 1B)
- One module only (risk-insurance). Do NOT migrate the other 9 yet.
- Do NOT add a build step to `vercel.json`. Do NOT touch `/modules/*.html`.
- `_data/modules.json` is committed as the prepared catalog but is NOT yet wired to the page.
