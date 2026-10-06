# Hint Helper prototype (M3 first slice)

A practice version of the Step 3 hint helper, for DIGI 230 Milestone 3. It uses **made-up practice proofs** and **hints our team wrote ahead of time**. No real AI runs, nothing is saved, and nothing is sent anywhere.

## Run it
- **Easiest:** double-click `prototype/index.html`. It works offline, with no install, account or key.
- **Or serve it:**
  1. Run `python3 -m http.server 8765` from the project folder.
  2. Open http://127.0.0.1:8765/prototype/

## What a tester can try
1. Pick **Get a hint** or **Use the rule list (no AI)**.
2. Pick a practice proof.
3. Read the hint, then decide: **Makes sense**, **Not sure** or **I disagree**. A reason is required.
4. Try asking "Is my proof ready for an A?" It should refuse.
5. Click **Pretend the helper is broken** or **This hint gave away a step**.
6. Click **Start over** to clear everything.

## Undo
- The last working version before this build is the git tag `checkpoint-before-m3-build`.
- To go back: `git checkout checkpoint-before-m3-build -- .`
