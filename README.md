# 🌸 Proof Garden: MATH 140 + AI

![Class](https://img.shields.io/badge/DIGI_230-Ethics_of_Emerging_Tech-FF5FA2?style=for-the-badge) ![Client](https://img.shields.io/badge/Client-MATH_140_Geometry-2F5BFF?style=for-the-badge) ![AI](https://img.shields.io/badge/AI-Stop_3_only-22D3EE?style=for-the-badge)

> [!IMPORTANT]
> **Our project in 1 sentence:** we found the **1 safe place** for an AI helper in a geometry class. We also found where AI must **stay out**.

## 🔗 Open it
| # | Page | Link |
|---|---|---|
| **1** | 🗺️ **The map** | https://math140-course-map.vercel.app |
| **2** | 🧪 **The practice helper** | https://math140-course-map.vercel.app/prototype/ |
| **3** | 📗 **The Garden Guide** (all the answers) | https://math140-course-map.vercel.app/guide/ |
| **4** | 💧 **The hint tool** (live AI, hints only) | https://math140-course-map.vercel.app/#tool |

## 🎬 Watch the 5 parts
Each video is about **20 seconds**. 🎥 The MP4 files are in [`explainers/media/`](explainers/media/).

| # | Part | Video |
|---|---|---|
| **1** | 🌱 **Seed: Draw by hand.** Draw a line that cuts a segment in half. **No AI.** | ![Part 1](explainers/media/part1.gif) |
| **2** | 🌿 **Sprout: Write your proof.** Each step needs a reason. **No AI.** | ![Part 2](explainers/media/part2.gif) |
| **3** | 💧 **Water: Get 1 hint.** The AI points at 1 weak step. **The only AI part.** | ![Part 3](explainers/media/part3.gif) |
| **4** | 🌸 **Bloom: Explain out loud.** Flip the triangle. Your partner asks why. **No AI.** | ![Part 4](explainers/media/part4.gif) |
| **5** | 🍓 **Fruit: Show what you know.** The golden ratio. **Only the teacher grades.** | ![Part 5](explainers/media/part5.gif) |

> [!TIP]
> 💧 **A little water helps a plant grow. Too much water drowns it.** A small hint helps. A hint that gives the answer is too much.

## 📜 Disclosure, interview, and plan
| # | Page | Video |
|---|---|---|
| **A** | 📜 **How we made it.** Our full disclosure, in the AI 101 order. Every prompt and source. → [`notes/06 Disclosure/`](notes/06%20Disclosure/) | ![How we made it](explainers/media/extra6.gif) |
| **B** | 🎥 **Professor interview kit.** Consent script, 20 questions, a place for the video. → [`notes/Professor Interview Kit.md`](notes/Professor%20Interview%20Kit.md) | ![Interview](explainers/media/extra7.gif) |
| **C** | 🗓️ **White paper.** The 6-week plan, the trial class, what we measure, and the quick syllabus. → [`notes/White Paper - Plan, Trial and Metrics.md`](notes/White%20Paper%20-%20Plan,%20Trial%20and%20Metrics.md) | ![Plan](explainers/media/extra8.gif) |

## 🌱 The 5 stops
| # | Stop | What happens | AI? | Boss |
|---|---|---|---|---|
| **1** | 🌱 Draw | Draw shapes with a compass. | ❌ | 🧑‍🌾 Teacher |
| **2** | 🌿 Write | Write a proof alone. | ❌ | 🧑‍🎓 Student |
| **3** | 💧 Hint | The AI points at 1 weak step. You fix it. | ✅ **Only here** | 🧑‍🌾 Teacher (unsure hints) |
| **4** | 🌸 Explain | Explain your proof at the board. | ❌ | 🧑‍🌾 Teacher |
| **5** | 🍓 Quiz | Show what you know. | ❌ | 🧑‍🌾 Teacher (all grades) |

## 💧 How a hint gets checked
1. You write **2 steps or more**.
2. The AI gives **1 hint**. It **never** gives the answer.
3. You pick **Makes sense**, **Not sure**, or **I disagree**.
4. **Not sure** or **I disagree** goes to the teacher.
5. The teacher checks it **in 2 days**, before you present.

> [!CAUTION]
> 🚫 **The AI never** writes a step. **It never** says a proof is correct. **It never** grades.

## 📁 What is in this repo
| # | Folder or file | What it is |
|---|---|---|
| **1** | `index.html` | 🗺️ The map. **Simple words** and **Full detail** modes. |
| **2** | `api/proof-check.js` | 💧 The live hint helper. It uses free **OpenCode Zen** models. |
| **3** | `prototype/` | 🧪 The M3 practice helper. Pretend hints. Nothing you type is sent. |
| **4** | `guide/` | 📗 The Garden Guide. An Ask box and **48 answers** in closed tabs. No AI. |
| **5** | `explainers/` | 🎬 The **8** videos (5 parts + 3 extras). Each frame is drawn in code. |
| **6** | `notes/` | 📒 A copy of our **Obsidian** notes (the DIGI 230 folder). |
| **7** | `assets/` | 🎨 The shared look: colors, fonts, and the video pop-up. |
| **8** | `scripts/sync-notes.sh` | 🔄 Copies the Obsidian notes here. Then updates the site. |
| **9** | `AGENTS.md` · `PROMPT.md` | 🤖 Instructions for AI coding tools. |

## 🔄 Update the notes
1. **Edit** a note in Obsidian (`Obsidian Vault/DIGI 230`).
2. **Run** this command:
```bash
cd ~/Documents/math140-course-map && ./scripts/sync-notes.sh
```
3. **Wait** about 1 minute. GitHub and the live site now show your change.

## 🎨 The look
- 🤍 **White** background
- 🍓 **Pink** `#FF5FA2` = people and "no AI here"
- 🫐 **Blue** `#2F5BFF` = a person decides
- 💧 **Cyan** `#22D3EE` = the AI (water)
- ✍️ **Fondamento** for titles. 📖 **Lexend** for reading. Lexend is made for easy reading.
- 📏 **Words:** short sentences. 1 idea in each sentence. (Simplified Technical English, ASD-STE100.)

## 🔬 Our 3 sources
1. 📄 Bastani et al. (2025). *Generative AI without guardrails can harm learning.* PNAS. https://doi.org/10.1073/pnas.2422633122
2. 📄 Kestin et al. (2025). *AI tutoring outperforms in-class active learning.* Scientific Reports. https://doi.org/10.1038/s41598-025-97652-6
3. 📄 Petrov et al. (2025). *Proof or Bluff?* arXiv. https://arxiv.org/abs/2503.21934

> [!NOTE]
> 🤖 **Disclosure:** AI (Claude) helped plan this project. It wrote the code and the videos. It ran the tests. Our team chose the rules. All proofs and hints are **made up**. No real student work is used.
