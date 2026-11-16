// 🪜 One proof attempt as a list of named states. No DOM here, so tests can run it in Node.
//
//   watching ──WATCHED──▶ answering ──ANSWERED──▶ writing ──SUBMIT──▶ checking
//       ▲                    │                       ▲                    │
//       └────REWATCH─────────┘                       └──── retry ◀────────┤  (tries left)
//                                                                         ├──▶ passed    ──REWARD──▶ rewarded
//                                                                         └──▶ needs_professor (3 tries used)
//
// app.js asks this file "what happens next?" and only draws the answer.

export const MAX_ROUNDS = 3;

export const STATES = ["watching", "answering", "writing", "checking", "retry", "passed", "needs_professor", "rewarded"];

// A student can type in the box at any time, so SUBMIT works from every state except "checking"
// (that is the double-click guard). Editing after a pass or after 3 tries is still allowed.
const MOVES = {
  watching: { WATCHED: "answering", SUBMIT: "checking" },
  answering: { REWATCH: "watching", ANSWERED: "writing", SUBMIT: "checking" },
  writing: { SUBMIT: "checking" },
  retry: { SUBMIT: "checking" },
  checking: { RETRY: "retry", PASS: "passed", CAP: "needs_professor" },
  passed: { REWARD: "rewarded", SUBMIT: "checking" },
  needs_professor: { REWARD: "rewarded", SUBMIT: "checking" }, // the reward only shows when every reason has a rule word
  rewarded: { REWARD: "rewarded", SUBMIT: "checking" },
};

export function newAttempt() {
  return { state: "watching", round: 0, locked: {}, guess: "", guessV: "" };
}

// Move to the next state. A move that isn't allowed throws, so a bug can't skip a step quietly.
export function move(attempt, event) {
  const to = MOVES[attempt.state]?.[event];
  if (!to) throw new Error(`Proof attempt: can't ${event} while ${attempt.state}`);
  attempt.state = to;
  return attempt;
}

export const canMove = (attempt, event) => Boolean(MOVES[attempt.state]?.[event]);

// Steps stay checked only while their words stay the same.
export function keepLocked(locked, steps) {
  const out = {};
  for (const [n, line] of Object.entries(locked)) {
    if (steps.find((s) => s.n === Number(n))?.line === line) out[n] = line;
  }
  return out;
}

// Decide one round. Inputs: the word check (check.steps, check.pass), the AI reply (verdict, step),
// the steps already locked, and which round this is. Returns the per-step status and the outcome.
//   verdict: "gap" | "no_gap" | "need_draft" | "busy" (busy = the AI did not answer)
export function decideRound({ check, verdict, flaggedStep, locked, round, max = MAX_ROUNDS }) {
  const flagged = verdict === "gap" ? flaggedStep : null;
  const status = {};
  for (const s of check.steps) {
    if (s.given || locked[s.n]) status[s.n] = "ok";
    else if (flagged && s.n === flagged) status[s.n] = "hint";
    else if (flagged && s.n > flagged) status[s.n] = "todo";
    else if (verdict === "need_draft") status[s.n] = "todo";
    else status[s.n] = s.ok ? "ok" : "hint";
  }
  const nextLocked = { ...locked };
  for (const s of check.steps) if (status[s.n] === "ok" && (verdict !== "gap" || flagged)) nextLocked[s.n] = s.line;

  const allOk = check.steps.every((s) => status[s.n] === "ok");
  const agree = Boolean(check.pass && allOk && (verdict === "no_gap" || verdict === "busy"));
  const outcome = agree ? "PASS" : round >= max ? "CAP" : "RETRY";
  return { status, locked: nextLocked, outcome, busy: verdict === "busy", canRewardAnyway: outcome === "CAP" && Boolean(check.pass) };
}
