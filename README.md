# Calories Calculator — Design

AI-first mobile app design for a calorie tracker with personalized recipe discovery.
Built end-to-end using Claude and Claude Code.

## Contents

- [`claude.md`](claude.md) — the build brief used to generate this work in Claude Code
- `00-research/` — [competitor analysis](00-research/competitor-analysis.md) and [user stories](00-research/user-stories.md)
- `01-branding/` — [branding stylescape](https://bastonya.github.io/calories-calculator-design/01-branding/stylescape.html) (app name, logo, tone of voice, palette, typography, imagery, motion, UI snippets)
- `02-design-system/` — [design system gallery](https://bastonya.github.io/calories-calculator-design/02-design-system/gallery.html) (tokens and nine components in every state, light and dark), with [`tokens.js`](02-design-system/tokens.js), [`kalo.css`](02-design-system/kalo.css) and [`kalo.js`](02-design-system/kalo.js) as the source of truth
- `03-screens/` — [key screens and flows](https://bastonya.github.io/calories-calculator-design/03-screens/screens.html), a clickable prototype of both user stories plus History and Settings
- [`video-link.txt`](video-link.txt) — link to the video presentation

Every page is a single self-contained HTML file that opens without a login. `node build.js` regenerates `gallery.html` and `screens.html` from the templates in each `src/` folder, inlining `tokens.js`, `kalo.css` and `kalo.js` verbatim.

## User stories covered

1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.

## Status

The three design deliverables (branding, design system, screens and flows) are complete. A video walkthrough link is in `video-link.txt`.
