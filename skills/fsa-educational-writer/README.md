# fsa-educational-writer

A reusable professional writing skill for the **FSA Money Ideas** library: short
educational articles that teach the reasoning underneath a money rule, so learners
can rebuild the rule and know when it bends. It is the writing and review layer that
sits on top of the article registry and the build tooling. It does not deploy
anything and it does not decide what ships.

## What it is

The skill acts as an educational writer, curriculum designer, Socratic tutor,
financial-literacy editor, evidence reviewer, misconception analyst, plain-language
specialist, and originality reviewer, all in service of one goal: help a learner
reason about money rather than memorize a rule. Its standards are fixed and encoded
in `references/`; its working documents are in `templates/`; its illustrative
techniques are in `examples/`.

## When it activates

Use it only for FSA educational-article work:

- writing a new Money Ideas article from a concept or a registry record,
- auditing or reviewing an existing FSA article draft against FSA standards,
- adapting an FSA article for a different FSA audience,
- creating a print companion for an FSA article,
- preparing a Spanish adaptation brief for an approved FSA article,
- checking an FSA article against the FSA standards and rubric.

Do not use it for marketing or ad copy, personal emails, social posts, product or
landing-page copy, technical or API documentation, legal or contract translation, or
general Bitcoin essays and price commentary. Those are out of scope by design, so the
skill triggers narrowly.

## The six modes

Each mode is operationally distinct and defines its own required input, expected output,
files to read, standards, stopping point, and unresolved questions (see `SKILL.md`).

1. **Editorial brief** plan an article before drafting (misconception, model, scenario,
   source plan). Stops at the brief.
2. **Article draft** concept or brief to a full 13-part draft, source file, rubric, and
   originality note.
3. **Article audit** review an existing draft (findings table plus scored rubric); a
   fast standards check is the lightweight variant.
4. **Audience adaptation** re-express for a different audience (change examples and
   barriers, keep the concept).
5. **Print companion** black-and-white, offline, pencil-and-paper facilitator packet.
6. **Spanish adaptation brief** localize after English approval.

## How it fits the library

Article facts live in one place: `scripts/library_data.py`. The build script
`scripts/build.py` renders pages from those records into `articles/<seriesSlug>/`,
and `scripts/validate_articles.py` checks every field, including the rule that only
`approved` and `published` render publicly. The schema, vocabularies, and analytics
events are documented in `docs/fsa-article-metadata.md`. The shared page shape is the
repo-root `templates/educational-article-template.html`.

This skill produces the human-readable inputs to that pipeline: the editorial brief,
the drafted 13-part body, the companion source file, the audit, the print companion,
and the Spanish brief. When a draft is written, the normal path is to place its body
in the build (mirroring `scripts/prototype_content.py`), add or adjust the record in
`library_data.py`, run `python3 scripts/build.py`, then `python3
scripts/validate_articles.py`. The skill never edits approved records to raise a
status.

## The human-review handoff

The skill stops at `status: drafted`, `reviewStatus: human-review-required`. Its
final output always lists the unresolved decisions a human must make (source
citations to confirm, boundary judgments, audience fit, anything the skill could not
verify). It never marks its own work `approved` or `published`, and it never invents
a source to clear a gap. Approval and publication are human steps.
