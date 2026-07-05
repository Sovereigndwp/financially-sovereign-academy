# FSA Token Reconciliation — A/B Comparison (v0.1)

Comparison only. **No code changes, no commit.** Decides which neutral scale becomes the canonical FSA web skin.

Question: should FSA adopt the **Token Sheet graphite scale** as its canonical web skin, or keep the **current FSA neutrals** already in `fsa-brand.css`?

Stated bias (owner): follow the Token Sheet exactly **if the change is subtle and controlled**.

---

## Option A — Token Sheet graphite as canonical FSA web skin

Adopt the hub Token Sheet graphite `--n-*` scale as the source of truth; FSA's `--color-*` neutrals alias to it.

**Graphite scale (from `tsa-shared-tokens.css`):**
`--n-bg #121316` · `--n-surface #191B1F` · `--n-elevated #212429` · `--n-deepest #0C0D0F` · `--n-border #2C2F36` · `--n-border-strong #3C4047` · `--n-ink #ECECE6` · `--n-ink-strong #FBFBF7` · `--n-muted #A7ABB3` · `--n-faint #6E727A`.

Pros: one source of truth across TSA/BSA/FSA; graphite is warmer/less pure-black than FSA's current near-black; ends token drift; makes the "paper is print, graphite is web" authority split real. Cons: requires a token edit + regression; a few hex values shift by small amounts.

## Option B — keep current FSA neutrals

Leave `fsa-brand.css` neutrals as authored.

**Current neutrals:** `--color-bg #0E1013` · `--color-surface #16181C` · `--color-elevated #1C1F24` · `--color-deepest #08090B` · `--color-border #2A2E35` · `--color-border-strong #3A3F47` · `--color-text #F4F6F7` · `--color-text-strong #FFFFFF` · `--color-muted #A8B0B8` · `--color-faint #6B7280`.

Pros: zero change now. Cons: perpetuates two neutral systems; FSA stays slightly colder/pure-black; the Token Sheet authority split stays theoretical.

## Side-by-side delta

| Role | Current (B) | Graphite (A) | Δ |
|---|---|---|---|
| bg | `#0E1013` | `#121316` | +slightly lighter, warmer |
| surface | `#16181C` | `#191B1F` | subtle |
| elevated | `#1C1F24` | `#212429` | subtle |
| deepest | `#08090B` | `#0C0D0F` | subtle |
| border | `#2A2E35` | `#2C2F36` | near-identical |
| border-strong | `#3A3F47` | `#3C4047` | near-identical |
| ink (text) | `#F4F6F7` | `#ECECE6` | slightly softer, warmer |
| ink-strong | `#FFFFFF` | `#FBFBF7` | off-pure-white |
| muted | `#A8B0B8` | `#A7ABB3` | near-identical |
| faint | `#6B7280` | `#6E727A` | near-identical |

Every delta is small. The largest perceptual shifts are bg (a touch lighter/warmer) and ink (a touch softer, off-pure-white) — both **toward** the warmer, less-clinical Token Sheet intent. Nothing is a hue flip; contrast direction is preserved.

## Contrast check (Option A)

- emerald `#10B981` on `--n-bg #121316` → ~7.3:1 (AA/AAA large + AA normal).
- `--n-ink #ECECE6` on `--n-bg #121316` → ~15.7:1 (AAA).
- `--n-ink` on `--n-elevated #212429` (card) → ~6.1:1 (AA).

All pass AA at the sizes used. No contrast regression vs current neutrals.

## Recommendation

**Adopt Option A (graphite), via alias with literal fallbacks.** The change is subtle and controlled — exactly the owner's bias condition — and it makes the Token Sheet the real source of truth. Implement as: add `--n-*`/`--p-*` to `tsa-shared-tokens.css`; re-point `fsa-brand.css` `--color-*` to `var(--n-*, <literal>)`; neutralize the green `--fsa-bg-*` surfaces in `fsa-theme.css` to `var(--n-*, <literal>)`. Literal fallbacks guarantee a missing import can never collapse a color.

This is exactly the Layer-1 change. Paper `--p-*` is added but stays print-only (Layer 5).

---

*Comparison only. Option A is the working assumption for the Layer-1 spec and the hardcoded-neutrals audit.*
