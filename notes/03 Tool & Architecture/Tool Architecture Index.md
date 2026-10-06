---
course: DIGI 230 Ethics of Emerging Technology
tags: [digi230, tool-architecture, proof-check]
cssclasses: [garden]
---
# 🛠️ How the Hint Helper Is Built

🧭 [🌸 Start](../00%20Start%20Here.md) · [🗺️ Map](../01%20MATH%20140%20Course%20Map.md) · [👥 People](../Stakeholder%20Snapshot.md) · [⚠️ Risks](../02%20Stakeholders%2C%20Risk%20%26%20Evidence.md) · [💧 Hint Helper](../03%20Proof%20Check%20Tool%20%26%20Build%20Log.md) · [📝 M2 Plan](../01%20Milestones/M2%20Responsible%20AI%20Use%20Proposal.md) · [🧪 Build](../05%20Build%20%28M3%29/00%20How%20the%20Build%20Works.md) · [📗 Guide](../00%20Garden%20Guide%20%28live%29.md)

The main page is [03 Proof Check Tool & Build Log](../03%20Proof%20Check%20Tool%20%26%20Build%20Log.md).

## 🧩 The parts
| # | Part | File | Job |
|---|---|---|---|
| **1** | 🗺️ The page | `index.html` | Shows the map and the chat box |
| **2** | 💧 The helper | `api/proof-check.js` | Sends your proof to the AI |
| **3** | 🧪 The practice helper | `prototype/index.html` | Pretend hints. Nothing is sent. |
| **4** | 🎬 The videos | `explainers/` | 5 short videos, 1 for each stop |
| **5** | 📗 The Garden Guide | `guide/` | Our notes and all the answers |

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
