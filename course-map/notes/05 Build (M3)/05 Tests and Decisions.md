---
course: DIGI 230 Ethics of Emerging Technology
milestone: 3
tags: [digi230, milestone-3, tests, transparency]
cssclasses: [garden]
---
# 🧪 Tests and Decisions

🧪 **Build pages:** [0 How it works](00%20How%20the%20Build%20Works.md) · [1 PRD](01%20PRD%20-%20What%20We%27re%20Making.md) · [2 ARD](02%20ARD%20-%20How%20the%20Pieces%20Fit.md) · [3 Checklist](03%20Prep%20Checklist.md) · [4 Handoff](04%20Build%20Handoff.md) · [5 Tests](05%20Tests%20and%20Decisions.md) · [6 Two ways](06%20Two%20Ways%20to%20Build%20It.md)

These are notes for our **Transparency Log**. **Only real results** go here.

## 📋 Test results: Oct 6, 2026
🤖 **Who tested:** Claude (an AI). It clicked through the prototype in a browser. **No person tested it yet.**

| # | Rule | What we tried | Must happen | What happened | Result |
|---|---|---|---|---|---|
| **1** | No skipping | Done with no choice. Then a 5-letter reason. | Done stays locked | Locked both times. Opened after a real reason. | ✅ |
| **2** | Helper writes nothing | Picked Makes sense | No hint text on the fix screen | Only the checklist | ✅ |
| **3** | No grades or answers | 4 questions: "ready for an A?", "what grade?", "write step 6", "is this correct?" | It says no each time | No, 4 of 4 | ✅ |
| **4** | Off-topic | "What is a triangle?" | A safe reply | "I only talk about the practice proofs" | ✅ |
| **5** | Unsure goes to teacher | I disagree, with a reason | On the teacher list, not the fix list | Correct | ✅ |
| **6–7** | No-AI way | Picked the rule list | Get to the board. No hint. | Correct | ✅ |
| **8–9** | Broken helper | Turned on "pretend broken" | Go to the rule list. It works. | Correct | ✅ |
| **10–11** | Stop rule | Pressed "gave away a step". Picked the same proof. | It stays stopped | Stayed stopped. *Check 11 used a shortcut. It set the state in code.* | ✅ |
| **12** | 2 steps | Picked the 1-step proof | Asks for 2 steps. No hint. | Correct | ✅ |
| **13** | Never "correct" | Picked the finished proof | Does not say correct | "Only your teacher can" | ✅ |
| **14** | Start over | Pressed Start over | Back to step 1. List empty. | Correct | ✅ |
| **15** | Nothing saved | Looked at browser storage | Empty | 0 items | ✅ |
| **16** | Nothing sent | Looked at requests to other sites | None | 0 (before the Oct 6 font change) | ✅ |
| — | 🛑 **Stop stays after Start over** | Stopped a proof. Pressed Start over. | It stays stopped | **It came back** | ❌ **Fix next** |
| — | 🐝 Another team's test | They use it alone | Write what happens | — | ⬜ Not run |
| — | 🔊 Screen reader | Use VoiceOver | All parts can be read | — | ⬜ Not run |

> [!WARNING]
> 🔤 **Oct 6 change:** the new look loads **Google Fonts**. So check 16 now finds font requests. No typed text goes with them. **Run check 16 again.**

## 🔁 Test re-run: Oct 6, 2026 (new look)
🤖 **Who tested:** Claude (an AI), in a browser. **No person tested it yet.**

| # | Check | Result |
|---|---|---|
| **1–10** | Same checks as above | ✅ **10 of 10 pass** |
| **11** | Stays stopped. **This time with real clicks**, no shortcut. | ✅ **Pass** |
| **12–15** | Same checks as above | ✅ **4 of 4 pass** |
| **16** | Other sites contacted | ⚠️ **Only** `fonts.googleapis.com` and `fonts.gstatic.com`. These load the font. **No typed text is sent.** |
| — | 🛑 Stop survives Start over | ❌ **Still open.** Fix next. |

## 🤔 Decisions
| # | The AI suggested | We… | Why |
|---|---|---|---|
| **1** | Pretend hints, not a real AI | ✅ **Kept** | The backup AIs can keep data. |
| **2** | Remove Google Fonts | 🔄 **Changed Oct 6** | The new look needs the calligraphy font. The label now says "nothing **you type** is sent". |
| **3** | A word filter for grade questions | ⚠️ **Kept, with a warning** | Tricky words can get past it. That is OK with pretend hints. Not OK with real AI. |
| **4** | Hints about "matching parts" | 🔄 **Changed** | An old live hint named the exact rule (CPCTC). The new hint points back to step 5 and the rule list. |

- 🔬 **How sure:** the checks are **evidence** from 1 AI test run. "Kids like it" and "the hints are the right size" are **guesses**.
- 👥 **Who did what:** `[each teammate writes what they did and can explain]`
- ⚠️ **Open risks:** the Start over hole · no person tested it · a real AI is not checked · do kids say "Not sure" honestly?
- 🛑 **When to stop:** a hint gives away a step. The helper stops. The teacher decides.

## 📢 Disclosure (draft)
> [!IMPORTANT]
> 🤖 AI (Claude) helped plan this prototype. It wrote all of the code. It ran 16 checks in a browser on Oct 6, 2026. Our team and the AI made up all proofs and hints. No real student work was used. No real AI runs in the prototype. We found 1 problem. It is not fixed yet. No other team tested it yet.
