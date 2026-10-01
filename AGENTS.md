# MATH 140 Interactive Course Map

DIGI 230 Milestone 1 (due Oct 1, 2026, 11:00 AM ET): an interactive map of SCAD MATH 140 "The Geometry of Physical Space", scoped to one unit, Constructions & Proof. It replaces the team's earlier SUST 720 map (kept at ~/Documents/sust720-course-map).

- **Live site:** https://math140-course-map.vercel.app (Vercel project `math140-course-map`)
- **Repo:** https://github.com/cornishlikeadam/math140-course-map (public)

## Files
- `index.html`: the whole page as one file, with no build step. The course data lives in the `R` (steps), `P` (people) and `CARDS` (evidence) arrays in the script at the bottom, and the SVG map is drawn from those. Each step is a different geometric figure (circle, triangle, hexagon, square, golden rectangle).
- `api/proof-check.js`: a Vercel function behind the Proof check hint tutor. It calls free OpenCode Zen models with `reasoning_effort: "low"`, and reads its key from `OPENCODE_API_KEY` (or `OPENROUTER_API_KEY`).
- `PROMPT.md`: the prompt for rebuilding or extending the map.

## Rules the map encodes (don't break these)
- AI is used in one place only: Step 3, Proof check. It is hint-only: one gap per reply, and it never writes a statement or reason. It only responds to a student draft of 2 or more steps.
- The student marks each hint Agree, Not sure or Disagree. The instructor reviews every Not sure or Disagree hint within 48 hours, before the Step 4 defense, and is accountable for wrong hints. (Revision of Oct 1: a struggling student is not the last check on a hint.)
- Steps 1 (Construct) and 4 (Defend) are non-use boundaries.
- Steps 1, 2, 4 and 5 are preserve-human-judgment zones. The instructor grades everything.
- The non-AI alternative is a printed justification checklist plus office hours.
- The unit steps are assumptions built from the catalog description; confirm them with the MATH 140 syllabus.
- Tag claims as evidence, assumption, proposed test or constructed. Never invent citations.
- Keep the transparency log honest about what the tool can't do.

## Deploy
- Deploy with `vercel deploy --prod`.
- The PDF deliverable is `[TeamName]_M1_CourseMap.pdf`, exported with headless Chrome using `--print-to-pdf`, with the live link on page 1.
