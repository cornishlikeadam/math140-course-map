# 🪜 Stepping Stone

**A helper for writing geometry proofs, one step at a time.**
You watch a short video, answer a simple question, then write the reasons.
The AI points at one weak step. It never writes the proof for you. Your Professor still grades it.

**Try it:** https://math140-study-tool.vercel.app

## What's in this repo

| File or folder | What it is |
|---|---|
| `index.html` | The app page |
| `app.js` | Makes the page work |
| `proof-attempt.js` | The rules for one try: watch → answer → write → check → try again (3 tries) → pass or ask your Professor |
| `reason-check.js` | Looks for a real rule word in each reason (no AI) |
| `professor.js` | The Professor tab |
| `shell.js` | The side menu and top bar |
| `course-data.js` | Weeks, dates and the 8 keys |
| `styles.css`, `assets/`, `favicon.svg` | How it looks |
| `videos/` | The short videos and the reward movie |
| `api/` | The server parts: the AI hint, the class log, the calendar file |
| `tests/` | Checks that the rules still work |
| `course-map/` | The older course map, research notes and explainers. Still online at `/map/`. |

## Share a page
Add one of these to the link: `#path-1` to `#path-4` · `#calendar` · `#syllabus` · `#keys` · `#coursemap` · `#professor`

## Change something
```bash
npm run check   # finds typing mistakes in every script
npm test        # makes sure the rules still work (nothing to install)
```
GitHub runs both on every change. Push to `main` and the site updates by itself.

## Turn on saving
Right now the app says **"Practice only"**, because nothing is saved. To save each check for the Professor:
1. Vercel → this project → **Storage** → add **Upstash Redis**.
2. **Settings → Environment Variables** → add `TEACHER_PIN` (the Professor code).
3. Redeploy. Students then see **"Saved. Your Professor can see it."**

Team 04 · MATH 140 / DIGI 230 · SCAD
