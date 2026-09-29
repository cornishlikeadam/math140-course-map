# Prompt: develop the MATH 140 Interactive Course Map

Copy everything below the line into your AI tool (Claude, Claude Design, OpenCode). Attach the MATH 140 syllabus if you have it.

---

You are helping a DIGI 230 team build Milestone 1 (due October 1): an **Interactive Course Map** of the SCAD course **MATH 140 The Geometry of Physical Space**. The map should be a visual page people can explore, not a written report or a slide deck. Map one unit only: **Constructions & Proof**.

**Course description:** Students explore, analyze and quantify 2D and 3D space. Topics include proofs, Euclidean constructions, right-triangle theorems, properties of figures, tessellations, circle theorems and the Golden Ratio.

**Bounded question** (actor, activity, capability, purpose, protected value): How might MATH 140 students revising their own two-column proofs use a hint-only AI tutor that points to the first unjustified step to find gaps in their reasoning before the graded quiz, while every proof step stays the student's own and grading stays with the instructor?

**The five unit steps, in order:**
1. **Construct:** compass and straightedge constructions in class.
   - Non-use boundary. The instructor decides.
2. **Draft:** the student writes a two-column proof alone.
   - No AI. The student decides.
3. **Proof check:** the only AI insertion point.
   - A hint tutor reads the student's own draft (2+ steps) and names the first weak step and the kind of theorem to review. It never writes a step.
   - Hand-off: the student checks the hint against the theorem list, and the instructor reads the hint log.
4. **Defend:** the student presents the proof at the whiteboard.
   - Non-use boundary. The instructor decides.
5. **Assess:** a no-device unit quiz.
   - The instructor grades.

**Build a single self-contained HTML page with these five switchable layers:**
1. Territory
2. People: MATH 140 Student, Proof Partner, MATH 140 Instructor, Learning Center Tutor, and students without the tool
3. AI touchpoints and non-use boundaries
4. Hand-offs: who verifies, who overrides, and what happens if it fails
5. Decision power: formal and informal

**Also include:**
- The three markers: AI insertion point, non-use boundary, and preserve-human-judgment zone.
- The Milestone 1 items: the stakeholder snapshot (users, decision makers, people affected, people who may be excluded, people who carry the risk), one documented concern labeled as a constructed scenario, one safeguard with a non-AI alternative, one non-goal, and one unresolved question.
- Evidence cards, with claims tagged as evidence, assumption or proposed test. Use real sources:
  - Bastani et al., PNAS 2025
  - Kestin et al., Scientific Reports 2025
  - Petrov et al., arXiv 2025
- A transparency log for the AI tool: what it does, what it was supposed to do, what it doesn't do, and what the human has to do.
- A peer trace test checklist.

**Rules for the page:**
- Text supports the map; text does not lead.
- It must pass the five-minute test.
- It must work on a phone, in dark mode, and printed to PDF, with the live link on page 1.
