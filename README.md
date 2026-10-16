# 📐 SCAD MATH 140: Study Tool & Ethical Course Map

[![Live Front-Facing Study Tool](https://img.shields.io/badge/🚀_Primary_App-Math140_Study_Tool-FF5FA2?style=for-the-badge&logo=vercel)](https://math140-study-tool.vercel.app)
[![Course Map & Governance Tab](https://img.shields.io/badge/🌸_Embedded_Tab-Course_Map_%26_Governance-2F5BFF?style=for-the-badge)](https://math140-study-tool.vercel.app/#coursemap)
[![Standalone Course Map](https://img.shields.io/badge/🗺️_Direct_Portal-Course_Map-22D3EE?style=for-the-badge)](https://math140-course-map.vercel.app)

---

### 🌟 Executive Overview for Professors & Stakeholders

> **The Math 140 Study Tool is the primary front-facing web application.**  
> It equips SCAD geometry students with an ethically constrained Socratic tutor (SLM), a dynamic 10-week syllabus calendar planner, and an interactive **Course Map & Governance tab** for deep evaluation.

| Resource | Purpose | Access Link |
|---|---|---|
| ⚡ **Main Study Tool & Calendar** | **Primary front-facing web app.** Socratic hint tutor, weekly milestones, .ics export, and 8 student account keys. | **[math140-study-tool.vercel.app ↗](https://math140-study-tool.vercel.app)** |
| 🌸 **Course Map & Governance Tab** | **Embedded tab within the study tool.** Interactive 5-stop pedagogical arc, stakeholder ledger, and audit files. | **[Open as Tab in Study Tool ↗](https://math140-study-tool.vercel.app/#coursemap)** |
| 🗺️ **Standalone Course Map Portal** | Full-screen direct view of the SVG Proof Garden, 8 explainer videos, and interactive tutor testing sandbox. | **[math140-course-map.vercel.app ↗](https://math140-course-map.vercel.app)** |
| 🪶 **Lite Reference Repo** | Minimal 14-file reference implementation. | **[github.com/cornishlikeadam/math140-course-map-lite ↗](https://github.com/cornishlikeadam/math140-course-map-lite)** |

---

## ⚡ The Front-Facing Experience: Math 140 Study Tool

Students, faculty, and stakeholders interact with the unified tool at **[math140-study-tool.vercel.app](https://math140-study-tool.vercel.app)**:

1. **⚡ Socratic Tutor (SLM)**: Operates strictly at **Stop 3 (Water / Hint)**. It never solves problems, never completes steps, and never grades. It identifies the first weak reasoning step and asks a guiding question.
2. **📅 10-Week Dynamic Calendar Planner**: Interactive milestone planner mapping exams (40%), activities (15%), discussions (25%), and final project (20%) with one-click `.ics` calendar sync for Apple/Google calendars.
3. **🗺️ Course Syllabus**: Week-by-week topic index (Euclidean constructions, non-Euclidean spaces, projective geometry, fractals, golden ratio) connected to creative majors.
4. **🌸 Course Map & Governance (Integrated Tab)**: Deep-dive view of the complete pedagogical territory, risk evidence, stakeholder matrix, and Obsidian disclosures embedded right inside the application.
5. **🔑 8 Essential Keys for Student Accounts**: Institutional principles ensuring board defense authenticity, 48-hour instructor escalation loops, and zero prompt training.
6. **📦 CLI & Embed**: Terminal interface (`npx math140-cli`) and LMS embed mode for seamless Canvas integration.

---

## 🌸 The 5-Stop Pedagogical Arc

To protect genuine student learning, AI is quarantined into a single bounded touchpoint:

```
[🌱 1. Draw]   --> Compass & straightedge by hand (No AI)
     │
[🌿 2. Write]  --> Student draft proof ≥ 2 steps (No AI)
     │
[💧 3. Hint]   --> Socratic SLM flags 1 weak link + theorem class (ONLY AI)
     │
[🌸 4. Explain]--> Blackboard oral defense to peer partner (No AI)
     │
[🍓 5. Quiz]   --> Human-graded proctored assessment (No AI)
```

- **Bastani et al. (*PNAS* 2025)**: Unrestricted ChatGPT access caused students to score **17% worse** on subsequent unassisted exams. A hint-only tutor boosted practice scores without hurting retention.
- **Kestin et al. (*Scientific Reports* 2025)**: Socratic, question-driven AI tutoring achieves superior conceptual mastery over passive answers.
- **Single Touchpoint Rule**: If a draft has fewer than 2 steps, the AI refuses assistance and prompts the student to write their own draft first.

---

## 🏛️ Governance, Stakeholders & Disclosures

- **Shareholder & Stakeholder Evaluation**: Evaluates Students, Faculty (Prof. Patrick Bahls), Peer Tutors, No-AI/Assistive Cohort, Integrity Board, and Systems Architects. &rarr; [`notes/01 Build/02 Shareholder & Stakeholder Governance Evaluation.md`](notes/01%20Build/02%20Shareholder%20&%20Stakeholder%20Governance%20Evaluation.md)
- **Professor Interview Kit**: Consent script, 20 structured interview questions, and video recording log. &rarr; [`notes/01 Build/04 Professor Interview Kit.md`](notes/01%20Build/04%20Professor%20Interview%20Kit.md)
- **White Paper (Implementation & Metrics)**: 6-week rollout plan, trial metrics, and syllabus schedule. &rarr; [`notes/01 Build/06 White Paper - Plan, Trial and Metrics.md`](notes/01%20Build/06%20White%20Paper%20-%20Plan,%20Trial%20and%20Metrics.md)
- **Full Transparency & AI Use Log**: Every prompt, verification test, and model configuration logged in the AI 101 format. &rarr; [`notes/03 Disclosure/`](notes/03%20Disclosure/)

---

## 📁 Repository Structure

```
math140-course-map/
├── index.html               # Standalone interactive Course Map portal (SVG visual garden)
├── api/
│   └── proof-check.js       # Vercel Serverless Function (Meta Llama 3.3 70B via AI Gateway)
├── notes/                   # Synced Obsidian Vault (DIGI 230 Course Materials)
│   ├── 01 Build/            # Course Map, Governance Evaluation, White Paper, Interview Kit
│   ├── 02 Tool & Architecture/ # Technical specifications and build handoff
│   └── 03 Disclosure/       # Intent, AI use log, source verification, decision notes
├── guide/                   # Garden Guide Q&A knowledge base (48 verified answers)
├── prototype/               # M3 interactive testing sandbox
├── explainers/              # 8 code-drawn explainer videos (MP4 / GIF)
└── scripts/
    └── sync-notes.sh        # Obsidian Vault ↔ GitHub synchronization script
```

---

## 🔄 Notes Synchronization

To synchronize notes from the private Obsidian Vault (`Obsidian Vault/DIGI 230`) into this repository:
```bash
./scripts/sync-notes.sh
```
This updates `notes/`, regenerates `manifest.json`, commits, pushes to GitHub (`main` & `develop`), and redeploys to Vercel.
