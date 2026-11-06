---
name: design-md
description: Write, read, or apply a DESIGN.md file, a single markdown file with design tokens (colors, typography, spacing, radius, components) in YAML plus prose rationale, that tells coding agents how a product should look. Use when starting UI for a new project, when the user wants a site to "look like" a known brand (Stripe, Linear, Apple, Vercel, Notion...), when extracting a design system from an existing app, or before generating many screens that must stay consistent.
---

# DESIGN.md

A DESIGN.md is the project's single source of truth for its visual identity. It combines:

- **Tokens** (YAML front matter): exact values for colors, typography, spacing, rounded, and components.
- **Prose**: why those values exist and how to apply them (mood, hierarchy, do/don't).

## Reference files

- `references/spec.md` is the full format spec (google-labs-code/design.md). Read it before writing a new DESIGN.md.
- `references/examples/*/DESIGN.md` holds three complete examples from the spec authors.
- `references/brands/<brand>/DESIGN.md` holds 80+ DESIGN.md files inspired by real products (stripe, linear.app, vercel, apple, notion, airbnb, spotify, supabase, raycast, framer, ...). List the folder to see them all.

## Workflow

1. **Look for an existing file.** Search the project root for `DESIGN.md`. If it exists, read it first and follow it. Do not invent new tokens.
2. **If there is no DESIGN.md, create one before building UI:**
   - If the user names a brand or vibe, open the closest `references/brands/<brand>/DESIGN.md` as a starting point. Adapt it into an original identity: change the name and accent color, and never copy logos or brand names into the product.
   - Otherwise, derive it from the brief: product type, audience, mood. Then follow the section order in `references/spec.md`.
   - Save it at the project root as `DESIGN.md`.
3. **Map the tokens into code.** Use Tailwind theme / CSS variables / design tokens JSON so components reference tokens, not raw hex values.
4. **Validate** (optional, needs network): `npx @google/design.md lint DESIGN.md` checks broken references and WCAG contrast.
5. **Keep it current.** When a design decision changes, update DESIGN.md in the same change.

## Pairs well with

- `ui-ux-pro-max` to pick a style, palette, and font pairing, then write the result into DESIGN.md.
- `impeccable` / `taste-skill` / `hallmark` for building and polishing screens that follow DESIGN.md.
