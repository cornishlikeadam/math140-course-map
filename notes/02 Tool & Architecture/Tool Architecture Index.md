---
course: DIGI 230 Ethics of Emerging Technology
tags: [digi230, tool-architecture, proof-check]
cssclasses: [garden]
---
# 🛠️ How the Hint Helper Is Built

🧭 🌸 Start · 🗺️ Map · [👥 People](../01%20Build/05%20Stakeholder%20Snapshot.md) · ⚠️ Risks · 💧 Hint Helper · 📝 M2 Plan · 🧪 Build · 📗 Guide

The main page is DIGI 230/01 Build/03 Proof Check Tool & Build Log.

## 🧩 The parts
| # | Part | File | Job |
|---|---|---|---|
| **1** | 🗺️ The page | `index.html` | Shows the map and the chat box |
| **2** | 💧 The helper | `api/proof-check.js` | Sends your proof to the AI |
| **3** | 🧪 The practice helper | `prototype/index.html` | Pretend hints. Nothing is sent. |
| **4** | 🎬 The videos | `explainers/` | 5 short videos, 1 for each stop |
| **5** | 📗 The Garden Guide | `guide/` | Ask box + **48 answers** in closed tabs |

📁 **Folder:** `~/Documents/math140-course-map`

## 📏 The helper's 6 rules
1. **No help** until you write **2 steps**.
2. **Only** the **first** weak step.
3. **Never** write steps or answers.
4. Replies stay **under 120 words**.
5. It ends with **1 question** for you.
6. It always says: *"Check this hint against your theorem list; your instructor decides what is correct."*

## 🤖 Which AI it uses
1. **Space Bunny** first. It is free. It keeps **no data**.
2. **Big Pickle.** This is a backup.
3. **MiMo.** This is a second backup.

> [!WARNING]
> ⚠️ Backups **2** and **3** **can keep data**. We plan to turn them off.

## 📋 The hint list
For each hint, the list saves:
1. the run number
2. the time
3. which AI answered
4. how long it took
5. your answer (Makes sense / Not sure / I disagree)
6. if it gave away a step

💾 The list stays **only on your computer**. You give it in with your proof.
