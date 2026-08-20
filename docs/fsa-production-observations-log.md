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

- 2026-07-18 · "Four Jobs" (FSA-ARTICLE-002) · The THIRD hardcoded body module
  (`four_jobs_content.py` + a third parallel `elif` in `build.py`) has now been added. The
  pilot retrospective named exactly this moment ("the moment we would write a third elif")
  as the trigger to decide on the `slug -> body` registry refactor. The engine was NOT
  changed in this pass (v1.0 freeze); the trigger condition is now met and the decision is
  due at the next engine review. Status: trigger reached, decision pending.
- 2026-07-18 · "Four Jobs" · Roadmap ambiguity surfaced at intake: the retrospective's
  "only then begin Economic Thinking" pointed one way while `initialCollection` and the
  existing proposed brief pointed at FSA-ARTICLE-002. A human had to adjudicate. Possible:
  a single explicit "next up" marker (registry field or a one-line roadmap note) so the
  institution names its own next asset. Status: observation only.
- 2026-07-18 · "Four Jobs" · Production decisions made in conversation (taxonomy
  Live/Prepare/Protect/Grow; Tier B statistic excluded; brief adoption) have no canonical
  on-repo home. They are recorded in the draft audit and the source file's review note,
  but a reader of the repo alone cannot find "decisions made and why" in one place.
  Possible: a small append-only decisions log next to this file. Status: observation only.
- 2026-07-18 · "Four Jobs" · `docs/proposed-briefs/` has no lifecycle: an adopted brief
  (002) stays labeled "proposed" with no adopted/rejected/superseded marker, so the
  registry record and the brief can silently disagree about which is current. Status:
  observation only.
- 2026-07-18 · "Four Jobs" · The canonical-context pointer in `CLAUDE.md`
  (`~/Documents/Claude/Projects/TSA`: `TSA/MEMORY.md`, `standards/content-operating-system.md`)
  could not be reached from this production session, and the TSA monorepo's own
  `memory/projects/fsa.md` predates the entire Money Ideas library (still says
  "Folder: properties/fsa/", "build second"). FSA-local docs were sufficient to produce the
  article, but the cross-repo memory chain did not participate. Status: observation only.

## Reviewed / promoted to v2.0

- (none yet)
