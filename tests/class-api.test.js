// The class log must never say "saved" unless it really kept the proof.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/class.js";

function call(method, { body, headers = {}, query = {} } = {}) {
  return new Promise((done) => {
    const res = { code: 0, setHeader() {}, status(c) { this.code = c; return this; }, json(j) { done({ code: this.code, json: j }); } };
    handler({ method, body, headers, query }, res);
  });
}

beforeEach(() => {
  for (const k of ["KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "TEACHER_PIN"]) delete process.env[k];
});

test("no database: POST says saved: false", async () => {
  const r = await call("POST", { body: { nick: "Sam", path: 1 } });
  assert.equal(r.json.saved, false);
});

test("no database: GET shows the demo class", async () => {
  const r = await call("GET");
  assert.equal(r.json.demo, true);
  assert.equal(r.json.setup, true);
});

test("with a database: POST keeps the check and says saved: true", async () => {
  Object.assign(process.env, { KV_REST_API_URL: "https://kv.test", KV_REST_API_TOKEN: "t", TEACHER_PIN: "1234" });
  const sent = [];
  globalThis.fetch = async (_u, o) => { sent.push(JSON.parse(o.body)); return { ok: true, json: async () => ({ result: 1 }) }; };
  const r = await call("POST", { body: { nick: "<b>Sam</b>", path: 1, text: "1. x + 3 = 7 (Given)" } });
  assert.equal(r.json.saved, true);
  assert.equal(sent[0][0], "LPUSH");
  assert.equal(JSON.parse(sent[0][2]).nick, "bSam/b"); // tags stripped
});

test("with a database: GET needs the Professor code", async () => {
  Object.assign(process.env, { KV_REST_API_URL: "https://kv.test", KV_REST_API_TOKEN: "t", TEACHER_PIN: "1234" });
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ result: [] }) });
  assert.equal((await call("GET")).code, 401);
  assert.equal((await call("GET", { headers: { "x-teacher-pin": "1234" } })).code, 200);
});

test("database down: POST says saved: false", async () => {
  Object.assign(process.env, { KV_REST_API_URL: "https://kv.test", KV_REST_API_TOKEN: "t", TEACHER_PIN: "1234" });
  globalThis.fetch = async () => ({ ok: false, status: 500 });
  const r = await call("POST", { body: {} });
  assert.equal(r.json.saved, false);
});
