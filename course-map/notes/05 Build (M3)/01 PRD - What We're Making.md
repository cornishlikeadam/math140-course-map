---
course: DIGI 230 Ethics of Emerging Technology
milestone: 3
doc: PRD
version: 1
tags: [digi230, milestone-3, prd]
cssclasses: [garden]
---
# 🎯 PRD: What We Are Making

🧪 **Build pages:** [0 How it works](00%20How%20the%20Build%20Works.md) · [1 PRD](01%20PRD%20-%20What%20We%27re%20Making.md) · [2 ARD](02%20ARD%20-%20How%20the%20Pieces%20Fit.md) · [3 Checklist](03%20Prep%20Checklist.md) · [4 Handoff](04%20Build%20Handoff.md) · [5 Tests](05%20Tests%20and%20Decisions.md) · [6 Two ways](06%20Two%20Ways%20to%20Build%20It.md)

> [!NOTE]
> 📖 **PRD** = **Product Requirements Document**. It says **what** we make, **for who**, and what it **must do**.

## 1️⃣ Purpose and people
- 🏷️ **Team, version, owner:** `[Team name]` · version **1** · owner: `[teammate in charge]`
- 🍓 **Class and activity:** MATH 140, **Stop 3:** get a hint on your own proof. ([01 MATH 140 Course Map](../01%20MATH%20140%20Course%20Map.md))
- ❓ **The problem in 1 sentence:** students get stuck. They cannot see the weak step.
- ✏️ **What students still practice:** writing each reason. Judging if a hint is right.
- 🧑‍🎓 **Who uses it:** MATH 140 students.
- 👥 **Who else it changes:**
  1. 🧑‍🌾 the teacher
  2. 🐝 partners at the board
  3. 📗 kids who use the rule list, not AI
- 🔬 **How sure are we?**
  - Hints help more than answers. *(evidence: Bastani 2025)*
  - Our hints are the right size. *(guess. Test it.)*

## 2️⃣ The smallest version
- 🎯 **The 1 thing it does:** a student reads a hint. The student **decides** if it makes sense. The student fixes the proof **alone**.
- ✅ **In it:**
  1. the 2 paths
  2. 4 practice proofs
  3. 1 hint for each proof
  4. the decide step
  5. the teacher's list
  6. the rule list
  7. refusals, broken mode, the stop button, Start over
- 🚫 **Not in it:** real AI, logins, saving, sending, grades, a real teacher inbox.
- 🖱️ **Design:** a clickable practice page. Not paper cards alone. See [06 Two Ways to Build It](06%20Two%20Ways%20to%20Build%20It.md).
- 📥 **What goes in:** made-up proofs only.
- 📤 **What comes out:** 1 hint. The label says **"Simulated hint"** and **"This hint could be wrong."**

## 3️⃣ People decide, not the computer
- ✅ **The AI can:** point at 1 weak step. Name the *kind* of rule. Ask 1 question.
- 🚫 **The AI cannot:** write steps. Give answers. Say "correct". Grade, rank, or guess scores.
- 🧑‍🌾 **Human checker:**
  1. The **student** decides first.
  2. The **teacher** checks each Not sure or I disagree hint in **2 days**. This is before the board talk.
- 🔘 **Choices:** Makes sense / Not sure / I disagree. Plus a reason of **10 letters or more**.
- 📗 **No-AI way:** the rule list. It goes to the same fix step and the same board talk.
- 🔒 **Data:** nothing is saved. Nothing is sent. Start over clears everything.
- 🛑 **When to stop:** a hint gives away a step? The helper stops for that proof. The teacher is told. **The teacher is responsible.**

## 4️⃣ Checks that we can see
| # | Rule | What we try | What must happen | What happened |
|---|---|---|---|---|
| **1** | No skipping | Click Done with no choice or reason | Done stays locked | ✅ **Pass** (Oct 6) |
| **2** | No grades | Ask "Is my proof ready for an A?" | It says no | ✅ **Pass** |
| **3** | No-AI way works | Pick the rule list | Get to the board step. No AI. | ✅ **Pass** |
| **4** | Nothing saved | Start over. Look at browser storage. | All empty | ✅ **Pass** |
| **5** | Stop really stops | Report a leak. Then Start over. | The helper stays stopped | ❌ **Hole:** Start over brings it back |

> [!CAUTION]
> 🚫 **Never test with real student work.** More: [05 Tests and Decisions](05%20Tests%20and%20Decisions.md).
