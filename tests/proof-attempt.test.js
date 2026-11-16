// Run with: npm test   (Node 20+, no packages to install)
import { test } from "node:test";
import assert from "node:assert/strict";
import { newAttempt, move, canMove, keepLocked, decideRound, MAX_ROUNDS } from "../proof-attempt.js";
import { checkReasons } from "../reason-check.js";

const GOOD_1 = "1. x + 3 = 7 (Given)\n2. x + 3 − 3 = 7 − 3 (because take 3 off both sides)\n3. x = 4 (because 3 − 3 is 0)";
const PICTURE_1 = "1. x + 3 = 7 (Given)\n2. x + 3 − 3 = 7 − 3 (because it looks right)\n3. x = 4 (because 3 − 3 is 0)";

const round = (text, verdict, n, locked = {}, flaggedStep = null) =>
  decideRound({ check: checkReasons(1, text), verdict, flaggedStep, locked, round: n });

test("a new attempt starts on the video", () => {
  const a = newAttempt();
  assert.equal(a.state, "watching");
  assert.equal(a.round, 0);
});

test("the happy path: watch → answer → write → check → pass → reward", () => {
  const a = newAttempt();
  for (const e of ["WATCHED", "ANSWERED", "SUBMIT", "PASS", "REWARD"]) move(a, e);
  assert.equal(a.state, "rewarded");
});

test("a second submit while checking is blocked (no double click)", () => {
  const a = move(move(move(newAttempt(), "WATCHED"), "ANSWERED"), "SUBMIT");
  assert.equal(canMove(a, "SUBMIT"), false);
  assert.throws(() => move(a, "SUBMIT"));
});

test("you can't skip to the reward without passing", () => {
  const a = move(move(newAttempt(), "WATCHED"), "ANSWERED");
  assert.throws(() => move(a, "REWARD"));
});

test("good reasons + AI 'no gap' = pass", () => {
  const r = round(GOOD_1, "no_gap", 1);
  assert.equal(r.outcome, "PASS");
  assert.equal(r.busy, false);
});

test("AI busy: the word check alone can pass, and it says so", () => {
  const r = round(GOOD_1, "busy", 1);
  assert.equal(r.outcome, "PASS");
  assert.equal(r.busy, true);
});

test("a picture reason ('it looks right') does not pass", () => {
  const r = round(PICTURE_1, "no_gap", 1);
  assert.equal(r.outcome, "RETRY");
  assert.equal(r.status[2], "hint");
});

test("AI flags a gap: that step is the hint, later steps wait", () => {
  const r = round(GOOD_1, "gap", 1, {}, 2);
  assert.equal(r.outcome, "RETRY");
  assert.equal(r.status[2], "hint");
  assert.equal(r.status[3], "todo");
});

test(`after ${MAX_ROUNDS} tries the student is sent to the Professor`, () => {
  const r = round(PICTURE_1, "gap", MAX_ROUNDS, {}, 2);
  assert.equal(r.outcome, "CAP");
  assert.equal(r.canRewardAnyway, false); // a picture reason never unlocks the movie
});

test("a checked step un-checks when its words change", () => {
  const steps = checkReasons(1, GOOD_1).steps;
  const locked = { 2: steps[1].line };
  assert.deepEqual(keepLocked(locked, steps), locked);
  assert.deepEqual(keepLocked(locked, checkReasons(1, PICTURE_1).steps), {});
});

test("deleting the reason steps can't pass (only 'Given' left)", () => {
  const r = round("1. x + 3 = 7 (Given)", "no_gap", 1);
  assert.notEqual(r.outcome, "PASS");
});
