#!/bin/bash
# 🔄 Sync Obsidian → GitHub → live site.
# 1. Copy the notes.  2. Save them to GitHub.  3. Update the live site.
# Use --no-deploy to skip step 3.
set -e
cd "$(dirname "$0")/.."
python3 scripts/sync_notes.py
git add notes
if git diff --cached --quiet; then echo "ℹ️  No note changes."; else git commit -q -m "🔄 Sync notes from Obsidian" && git push -q && echo "✅ Saved to GitHub."; fi
if [ "$1" != "--no-deploy" ]; then vercel deploy --prod --yes >/dev/null && echo "✅ Live site updated."; fi
