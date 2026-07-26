# FSA Production Observations Log

Append-only log of hypothetical engine, constitution, or workflow improvements noticed
during production. Per the v1.0 freeze, these are RECORDED, not implemented. The default
answer to "should the engine change now?" is No. After roughly 20 to 30 articles, these are
reviewed together to decide whether a version 2.0 is warranted. An entry here is an
observation, not a decision, and not a rule.

Format: date · article/context · observation · why it might matter · status.

## Open observations

- 2026-07-17 · Pilot · `build.py` hardcodes one body per article (`prototype_content.py`,
  `later_content.py`, each with a parallel `elif`). A `slug -> body` registry would remove the
  per-article code edit. Possible trigger to revisit: when a 3rd hardcoded body is about to be
  added. Status: observation only; deferred per the pilot decision and the v1.0 freeze.
- 2026-07-17 · "Later" · The compounding idea ("delay changes the size of the number, not its
  date") is the one passage where prose strains; a small "cost of later" calculator would likely
  teach it better. Status: observation for the future companion-asset layer, not an engine change.
- 2026-07-17 · Pilot · A source file's status/reviewStatus header can drift from the registry
  (the prototype's had to be hand-synced). Possible: have `build.py` stamp those header lines
  from the registry while preserving the researched body. Status: observation only.
- 2026-07-17 · Pilot · Per-article section headings live in `build.py`, not in the body module.
  If the registry refactor ever happens, headings should move next to the prose. Status:
  observation, contingent on the registry item above.

## Reviewed / promoted to v2.0

- (none yet)
