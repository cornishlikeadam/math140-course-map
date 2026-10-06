# 🌸 Proof Garden: MATH 140 Interactive Course Map

DIGI 230 Milestone 1 (due Oct 1, 2026, 11:00 AM ET): an interactive map of SCAD MATH 140 "The Geometry of Physical Space", scoped to one unit, Constructions & Proof. It replaces the team's earlier SUST 720 map (kept at ~/Documents/sust720-course-map).

- **Live site:** https://math140-course-map.vercel.app (Vercel project `math140-course-map`)
- **Repo:** https://github.com/cornishlikeadam/math140-course-map (public)

## 📁 Files
- `index.html`: the whole page as one file, with no build step. The course data lives in the `R` (steps), `P` (people) and `CARDS` (evidence) arrays in the script at the bottom, and the SVG map is drawn from those. Each step is a different geometric figure (circle, triangle, hexagon, square, golden rectangle).
- `api/proof-check.js`: a Vercel function behind the Proof check hint tutor. It calls free OpenCode Zen models with `reasoning_effort: "low"`, and reads its key from `OPENCODE_API_KEY` (or `OPENROUTER_API_KEY`).
- `PROMPT.md`: the prompt for rebuilding or extending the map.
- `prototype/`: the M3 practice helper. It uses simulated hints and makes no AI calls. Open it with a double-click.
- `guide/`: the Garden Guide. It renders `notes/` and answers questions from `guide/qa.json` by keyword matching (no AI).
- `explainers/`: 5 canvas animations (`1.html`–`5.html` + `engine.js`), one per stop. Render them with the javascript-animation skill's `render.mjs`; the MP4s and GIFs live in `explainers/media/`.
- `assets/garden.css` + `assets/garden.js`: the shared palette, fonts, top menu and video pop-up.
- `notes/`: a copy of the Obsidian notes in `~/Documents/Obsidian Vault/DIGI 230`. Never edit it by hand: run `scripts/sync-notes.sh`, which converts wikilinks, rewrites `manifest.json`, commits, pushes and deploys.

## 🎨 Style rules (Oct 6, 2026)
- **Palette:** white, strawberry pink `#FF5FA2`, blueberry blue `#2F5BFF`, and water cyan `#22D3EE` used sparingly. Cyan means AI, pink means "no AI here", blue means a person decides.
- **Fonts:** Fondamento (calligraphy) for headings only; Lexend for all reading text.
- **Garden theme:** 🌱 Seed = Draw · 🌿 Sprout = Write · 💧 Water = Hint (AI) · 🌸 Bloom = Explain · 🍓 Fruit = Quiz. The teacher is the 🧑‍🌾 gardener and the partner is the 🐝 bee.
- **Writing:** ASD-STE100 style, so an 8-year-old can read it. Short sentences, one idea each, active voice, numbered steps, emojis and **bold** on the key words.
- **Obsidian notes** use `cssclasses: [garden]` (styled by `.obsidian/snippets/proof-garden.css`) and GitHub-style callouts (`> [!TIP]`, `> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) so they render in Obsidian, on GitHub and in the Guide.

## 📏 Rules the map encodes (don't break these)
- AI is used in one place only: Step 3, Proof check. It is hint-only: one gap per reply, and it never writes a statement or reason. It only responds to a student draft of 2 or more steps.
- The student marks each hint Agree, Not sure or Disagree. The instructor reviews every Not sure or Disagree hint within 48 hours, before the Step 4 defense, and is accountable for wrong hints. (Revision of Oct 1: a struggling student is not the last check on a hint.)
- Steps 1 (Construct) and 4 (Defend) are non-use boundaries.
- Steps 1, 2, 4 and 5 are preserve-human-judgment zones. The instructor grades everything.
- The non-AI alternative is a printed justification checklist plus office hours.
- The page has two reading levels: "Simple words" (default, written so a 10-year-old can follow it, including the nuance) and "Full detail". Any content change must be made in both: static HTML pairs use `.m-s` / `.m-f`, and the map and step text live in the `K` (simple) and `R` (full) objects. The PDF is exported from `index.html#full`.
- The unit steps are assumptions built from the catalog description; confirm them with the MATH 140 syllabus.
- Tag claims as evidence, assumption, proposed test or constructed. Never invent citations.
- Keep the transparency log honest about what the tool can't do.

## 🚀 Deploy
- Deploy with `vercel deploy --prod`.
- The PDF deliverable is `[TeamName]_M1_CourseMap.pdf`, exported with headless Chrome using `--print-to-pdf`, with the live link on page 1.
