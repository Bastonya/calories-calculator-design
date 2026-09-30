Calories Calculator: build brief for Claude Code
Goal
Design an AI-first, cross-platform mobile app for calorie tracking and personalized recipe discovery. Deliver three parts: Branding / stylescapes, Design System, Key screens / flows. Work AI-natively: generate, review, refine. Avoid manual pixel work.
The two user stories to cover:
1. As a user, I want to calculate the amount of calories in a dish or a specific product.
2. As a user, I want to find a recipe for a dish that is suitable for me.
Rules
* All deliverables, UI copy, code comments, file names and commits are in English.
* Everything must open in an incognito browser with no login. Publish HTML deliverables via GitHub Pages.
* Prefer generated output over hand-made work. Keep iterations short.
Repository structure
/README.md          overview, how to open each part, video link
/CLAUDE.md          this brief
/00-research/       competitor pain points + user stories
/01-branding/       stylescape(s), logo, app icon
/02-design-system/  tokens + components + gallery page
/03-screens/        key screens and flows (device frames)
/video-link.txt     link to the video presentation
Part 1: Branding / stylescapes
Mood: bright, modern, simple, dynamic. Rounded shapes, flat surfaces, generous whitespace, motion through progress rings.
The stylescape must be a rich collage, not just a style guide. Include:
* App name, logo and app icon (simple geometric mark, ring motif)
* Mood words and short tone of voice (friendly, direct, no shaming, no diet-culture language)
* Color palette with usage rules
* Typography specimens (display, headline, body, caption)
* Imagery direction (bright food photography, flat illustration, or abstract shapes; state which and why)
* Motion motif (progress rings, quick count-up, gentle bounce on save)
* UI snippets in the brand style (calorie ring, macro cards, primary button)
Reference files already produced: 01-branding/calories-calculator-stylescape.html (first draft to expand), home-dashboard-screen.svg (screen target).
Color tokens
Token	Hex	Usage
coral	#FF5A36	primary CTA, calorie progress
yellow	#FFC93C	secondary progress, highlights
green	#2ECC71	success, health-positive states
ink	#161615	primary text
muted	#66655F	secondary text
border	#E8E6DD	hairline borders
bg / card	#FAFAF7 / #FFFFFF	light surfaces
Dark mode: bg #121210, card #1C1C19, border #2E2E29, muted #B5B3A9, text #F3F2ED. Accents stay the same.
Typography
Space Grotesk (display and headlines, 500 to 700), Inter (body and labels, 400 to 500). Scale: display 28-34, headline 18-22, body 14-15, caption 11-12.
Part 2: Design system
Tech stack for the app: React Native + Expo (react-native-reanimated, react-native-svg). Build the design system as code and show it on a single gallery page.
1. Design tokens file: colors, spacing, radii, typography, shadows (single source of truth)
2. Components: Button (primary, secondary, pill), Input, Card, Chip (with removable variant), ProgressRing, StatCard, BottomSheet, Badge (AI confidence), TabBar
3. Show every component in all states: default, pressed, disabled, error, loading
4. Gallery page listing tokens and components, with light and dark mode
Part 3: Key screens / flows
Compose screens only from design system components. Show them in device frames on one page, with the two flows connected.
Flow A: calculate calories
1. Home dashboard: calorie ring, macro cards, quick actions, recent entries
2. Log food: one bottom sheet with 4 input methods (photo, voice, barcode, search)
3. Confirm and edit: AI-detected item, confidence badge, inline-editable portion, calories and macros, one save action
4. Result: updated daily ring and diary entry
Flow B: find a suitable recipe
1. Recipe discovery: tabs "Browse recipes" and "From my fridge" (removable ingredient chips, "Find recipes")
2. Recipe list filtered by profile (goal, diet, allergies, calorie budget)
3. Recipe detail: ingredients, steps, macros per serving, time
4. Calorie limit for this dish: user sets a target, the app rescales ingredient quantities (dense ingredients like oil and cheese scale more, structural ones like water and spices stay near the original), shows the adjusted list, then "Add to diary"
Also show: History (calendar + daily totals) and Settings (profile, goals, subscription with in-app upgrade and one-step cancel). Include at least one empty state, one loading state and one error state (for example, AI could not recognize the photo).
Design principles (each tied to a competitor pain point)
* Fewest possible taps to log a meal (MyFitnessPal redesign complaints)
* Always show AI confidence and allow inline correction (YAZIO, Lose It! photo recognition complaints)
* No ads inside the logging flow (Cronometer complaints)
* Honest free tier, no hidden paywalls (Lose It!, MyFitnessPal complaints)
* Subscription visible in Settings, cancel in the app (Lifesum, MyFitnessPal billing complaints)
* Personalized recipes that are easy to find (Lifesum meal plan complaints)
Video presentation (English, Loom or similar)
Cover all three parts: Branding, Design System, Final designs. Explain why each decision was made, and briefly show how Claude Code was used. Put the link in video-link.txt.
Final check
* Repository is public and everything opens in incognito
* README explains each part and links to the published pages
* No Ukrainian text anywhere in the repository
