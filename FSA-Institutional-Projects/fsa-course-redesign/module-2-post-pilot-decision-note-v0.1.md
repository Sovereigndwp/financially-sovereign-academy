# FSA 10-Module Redesign — Module 2 Post-Pilot Decision Note

Pilot module: **Module 2: Emergency Funds & Saving**
Branch: **feat/fsa-module-2-hybrid-pilot**
Status: Post-pilot decision note for the redesigned FSA foundation course
Design reference: **TSA Token Sheet v0.1 and System Hub v0.1**

The Module 2 pilot tested the new hybrid course structure before applying it across the full 10-module FSA foundation course.

This note governs two things:
1. The course structure proven in Module 2.
2. The visual and component direction that should now be aligned with the TSA/FSA/BSA design system.

Module 2 should not become a one-off. It should become the first working example of the new course standard.

---

## 1. What becomes the standard

Each FSA foundation module should use a hybrid learning structure. A standard module should include:

- a clear "Is this for you?" gate near the top
- a real-life situation, pressure point, or learner problem
- short teaching sections
- one interactive tool, scenario, quiz, calculator, or decision exercise
- a standardized traps or pressure callout
- a downloadable worksheet or checklist when useful
- a print-friendly paper layer
- a clear bridge to the next module

The goal is not to make every module look identical. The goal is to make every module feel like part of the same course system.

## 2. Visual standard

The FSA redesign should follow the TSA design-system direction. Use:

- graphite and elevated neutral surfaces for web
- warm paper surfaces for printable and worksheet layers
- neutral body text
- Playfair/serif only for major editorial headings
- Inter/sans for body, cards, buttons, and UI
- JetBrains Mono/mono only for labels, data, results, and system-like elements
- emerald as the FSA signal color
- small-radius components
- restrained borders
- calm spacing

FSA should feel practical, institutional, and calm. It should not feel like a marketing landing page, a crypto dashboard, or a collection of unrelated templates.

## 3. Color and signal rule

The Token Sheet defines the broader system:

- paper is the canonical reference layer
- graphite is the derived web skin
- each platform has its own signal color
- FSA uses emerald as its signal

For FSA, emerald may be used for: thin signal bars, borders, small markers, focus states, labels, subtle hover tint, selected states, and data or result emphasis when appropriate.

Do not use emerald as a large surface. Avoid: green-wash cards, large solid emerald buttons, gradient buttons, heavy green backgrounds, blue/cyan template cards, and making every card look like a call-to-action.

Gradients may exist as brand signal accents, such as thin bars or marks, but not as course action buttons.

## 4. Typography standard

Use the design-system type roles consistently:

- major headings: Playfair/serif
- body text: Inter/sans
- card headings: Inter/sans, not serif
- buttons: Inter/sans
- labels, data, calculation results, small system text: JetBrains Mono/mono

This corrects the main typography issue from the pilot: body, cards, buttons, and learner-facing UI should not inherit the editorial serif. The serif is for major editorial framing only.

## 5. Button standard

Action buttons across the redesigned FSA course should use the outline/ghost standard. Buttons should have:

- transparent or neutral background
- emerald border
- emerald text
- subtle emerald hover tint
- small radius, preferably 2px
- clear focus-visible state
- readable Inter/sans typography
- adequate tap target size

Avoid: large solid emerald fills, gradients, pill-shaped buttons, inconsistent button fonts, and button styles that differ module by module.

The standard should apply to primary actions, worksheet downloads, save-plan actions, calculator actions, and module navigation actions unless there is a clear reason to create a separate component.

## 6. Card and surface standard

Cards should use neutral surfaces and restrained borders. Use:

- graphite surface and elevated surface on web
- warm paper surfaces for print and worksheet modes
- 8px radius for cards
- 4px radius for callouts
- 2px radius for buttons
- clear but quiet borders

Avoid: bright colored card backgrounds, heavy green card fills, gradient card surfaces, blue/cyan inherited template cards, overly rounded cards, and making cards compete with the lesson content.

Course cards should support the teaching. They should not become the visual subject.

## 7. Worksheet and paper layer standard

Each module should include a downloadable worksheet or checklist when it helps the learner act on the lesson. Worksheets should be:

- paper-friendly
- black-and-white readable
- useful without the web page
- introduced as planning tools, not financial advice
- simple enough to complete by hand
- aligned with the warm-paper design direction

A worksheet should not be added just to satisfy the template. It should only appear when the module needs a paper action layer.

## 8. Accessibility baseline

Each redesigned module should include:

- visible keyboard focus states
- reduced-motion support
- aria-live where calculator or result areas update
- clear labels for interactive tools
- mobile tap targets of at least 44px where possible
- readable contrast
- print behavior that removes nav, buttons, and site chrome
- print behavior that preserves the worksheet or checklist layer

Accessibility should be part of the shared course system, not handled as one-off fixes in each module.

## 9. What stays Module-2-specific

Reuse the structure. Rewrite the content. Do not copy these Module 2 items into every module:

- "Starter Cushion Tracker"
- emergency-fund calculator language
- emergency-specific traps
- credit card or payday loan examples as emergency-fund substitutes
- "My Plan: Emergency Funds & Saving" wording
- three-rung emergency cushion structure
- Module 2 scenario choices
- Module 2 quiz questions
- local overrides added only because global CSS is not ready

Future modules should follow the same learning pattern, but each one needs its own pressure point, traps, scenario, worksheet, and bridge.

## 10. What should move to shared CSS

The Module 2 pilot used local styles because it was a controlled one-file test. Before rolling out the redesign, reusable patterns should move into shared course CSS.

Move to shared CSS: hybrid gate styles; traps/pressure callout styles; worksheet download block styles; print-only worksheet rules; standard outline/ghost button style; module action-button style; neutral card surface rules; card heading and body typography rules; focus-visible rules; reduced-motion rules; calculator result and aria-live styling pattern; neutral web surface tokens; paper/print worksheet tokens; standard spacing, radius, and tap-target rules.

Do not move yet: Module 2 content; emergency-specific worksheet styles; emergency-specific calculator language; one-off overrides for JS-injected Module 2 widgets; styles added only to patch legacy Module 2 issues.

Any `!important` rules in the pilot should be treated as temporary. They exist because the pilot had to override legacy shared styles. They should disappear once the global card, button, typography, and interaction defaults are corrected.

## 11. Shared CSS extraction recommendation

The next artifact should be a shared-CSS extraction plan. That plan should separate styles into clear shared layers:

1. **Tokens** — color, type, spacing, radius, focus, print variables
2. **Base course typography** — body text, major headings, card headings, labels, data/results
3. **Course components** — gate, traps callout, worksheet block, neutral cards, action buttons, calculator result panels
4. **Accessibility** — focus-visible, reduced-motion, aria-live result styling, tap targets
5. **Print** — worksheet-only print behavior, hide nav/buttons/site chrome, black-and-white readable surfaces, paper spacing and writing lines

This should happen before Module 1 is redesigned.

## 12. Rollout recommendation

Do not redesign all remaining modules at once. Recommended sequence:

1. Merge the Module 2 pilot.
2. Review it live in production.
3. Create the shared-CSS extraction plan.
4. Move only proven reusable styles into shared CSS.
5. Correct global button, card, typography, focus, reduced-motion, and print defaults.
6. Redesign Module 1 next because it sets expectations for the course.
7. Then redesign Modules 3 and 4.
8. Continue in small batches only after visual and interaction standards are stable.

The course should move module by module, not through a full-site redesign that creates ten different kinds of problems at once.

## 13. Design rule going forward

FSA modules should feel practical, institutional, calm, and usable.

Use: real-life scenarios, short teaching sections, neutral surfaces, readable sans body text, serif only for major editorial headings, emerald as a signal, downloadable paper tools, clear traps and pressure points, simple interactive decisions, and print-friendly worksheets.

Avoid: green-wash cards, large solid emerald buttons, gradient buttons, pill-shaped buttons, blue/cyan template cards, emoji-led instructional headings, email capture prompts inside free learning modules, one-off module styling, and making every module feel like a different product.

The standard is not "make everything prettier." The standard is: make every module easier to understand, easier to use, easier to print, and clearly part of the same FSA course system.

---

## Appendix: Pilot to shared-CSS map

| Standard | Move to shared CSS | Leave Module-2-specific |
|---|---|---|
| Gate | `.fsa-gate`, `.fsa-gate__title`, `.fsa-gate__outcome` | Gate copy |
| Traps callout | `.fsa-traps`, `.fsa-traps__title` | Emergency-specific traps |
| Worksheet block | `.fsa-worksheet`, `.fsa-worksheet__print`, `.fsa-worksheet__actions`, `.fsa-worksheet__note` | Starter Cushion Tracker content |
| Print layer | `@media print` worksheet-only rule | Module 2 worksheet content |
| Buttons | `.btn`, `.fsa-ws-btn`, `.fsa-plan-save-btn` unified typography and outline/ghost treatment | Temporary Module 2 overrides |
| Card surfaces | Neutral surface/elevated rules, quiet borders, small radii | JS-injected Module 2 widget patches |
| Typography | Body to Inter/sans, major headings to Playfair/serif, card headings to Inter/sans, labels/data to mono | None |
| Accessibility | `:focus-visible`, `prefers-reduced-motion`, `aria-live="polite"` result pattern | None |
| Print | Hide chrome, preserve worksheet, black-and-white readable output | Module 2 worksheet language |

Next artifact: shared-CSS extraction plan before Module 1 redesign.
