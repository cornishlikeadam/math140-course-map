#!/usr/bin/env python3
"""🔄 Copy the DIGI 230 Obsidian notes into notes/ for GitHub and the Garden Guide.

1. Copies every .md note (skips the archive folder).
2. Changes Obsidian links [[Note|Text]] into normal links that work on GitHub.
3. Changes ==highlight== into <mark>highlight</mark>.
4. Writes notes/manifest.json. The Garden Guide reads this list.
"""
import json, os, re, shutil, sys, urllib.parse
from pathlib import Path

SRC = Path(os.environ.get("NOTES_SRC", Path.home() / "Documents/Obsidian Vault/DIGI 230"))
DST = Path(__file__).resolve().parent.parent / "notes"
SKIP = ("_Archive",)

if not SRC.is_dir():
    sys.exit(f"❌ Notes folder not found: {SRC}")
notes = sorted(p for p in SRC.rglob("*.md") if not any(part.startswith(SKIP) for part in p.relative_to(SRC).parts))
by_name = {p.stem: p.relative_to(SRC) for p in notes}

# Videos in the vault's _media folder → the same video in the repo.
MEDIA = {"how-we-made-it.mp4": "explainers/media/extra6.mp4",
         "professor-interview-explainer.mp4": "explainers/media/extra7.mp4",
         "our-plan.mp4": "explainers/media/extra8.mp4"}

def video(m, here):
    name = m.group(1).split("|")[0].strip()
    if name in MEDIA:
        href = os.path.relpath(Path("..") / MEDIA[name], here.parent).replace(os.sep, "/")
        return f"🎥 [Watch the video (MP4)]({urllib.parse.quote(href)})"
    return "> 📼 *This video stays in Obsidian only. It is not on GitHub or the site.*"

def link(m, here):
    target, _, text = m.group(1).partition("|")
    name, _, heading = target.partition("#")
    rel = by_name.get(name.strip())
    if not rel:
        return text or target
    href = os.path.relpath(rel, here.parent).replace(os.sep, "/")
    href = urllib.parse.quote(href) + (("#" + urllib.parse.quote(heading.strip().lower().replace(" ", "-"))) if heading else "")
    return f"[{text or name}]({href})"

if DST.exists():
    shutil.rmtree(DST)
items = []
for p in notes:
    rel = p.relative_to(SRC)
    text = p.read_text(encoding="utf-8")
    text = re.sub(r"!\[\[([^\]]+\.(?:mp4|mov|webm))\]\]", lambda m: video(m, rel), text)
    text = re.sub(r"\[\[([^\]]+)\]\]", lambda m: link(m, rel), text)
    text = re.sub(r"==([^=\n]+)==", r"<mark>\1</mark>", text)
    out = DST / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text, encoding="utf-8")
    title = next((l[2:].strip() for l in text.splitlines() if l.startswith("# ")), p.stem)
    items.append({"path": str(rel).replace(os.sep, "/"), "folder": str(rel.parent).replace(os.sep, "/") if str(rel.parent) != "." else "", "name": p.stem, "title": title})
(DST / "manifest.json").write_text(json.dumps({"source": "Obsidian Vault/DIGI 230", "notes": items}, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"✅ Copied {len(items)} notes to {DST}")
