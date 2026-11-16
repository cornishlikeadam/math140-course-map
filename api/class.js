// 🧑‍🏫 Class log for the Professor tab.
//
// Two modes, chosen by environment variables (Vercel → Project → Settings → Environment Variables):
//   • Saved:  a Redis store (Vercel Marketplace → Upstash Redis) sets KV_REST_API_URL + KV_REST_API_TOKEN
//             (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN), and TEACHER_PIN is the Professor code.
//             POST keeps the check, GET (with the code) lists them, DELETE (with the code) clears them.
//   • Demo:   no store or no code. GET shows made-up students, POST answers { saved: false }.
// The student page only says "saved" when POST answers { saved: true }.
import { KEY, DEMO_ATTEMPTS } from "./_class-data.js";

const LIST = "m140:attempts";
const MAX_KEPT = 2000;

function store() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !process.env.TEACHER_PIN) return null;
  return async (...command) => {
    const r = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(command) });
    if (!r.ok) throw new Error(`class log store: ${r.status}`);
    return (await r.json()).result;
  };
}

function demo(setup) {
  const now = Date.now() - 60000;
  const attempts = DEMO_ATTEMPTS.map(({ offset, ...a }) => ({ ...a, ts: now - offset }));
  return { demo: true, setup, attempts, key: KEY, storage: "none" };
}

// Keep only the fields the Professor tab shows, with size caps.
const str = (v, n) => String(v ?? "").replace(/[<>]/g, "").slice(0, n);
function clean(b) {
  return {
    ts: Date.now(),
    nick: str(b.nick || "Guest", 24), world: str(b.world, 16), path: Number(b.path) || 0,
    text: str(b.text, 4000), guess: str(b.guess, 40), round: Number(b.round) || 0,
    verdict: str(b.verdict, 16), mode: str(b.mode, 16), step: Number(b.step) || null, hint: str(b.hint, 800),
    rubricPass: Boolean(b.rubricPass), rewarded: Boolean(b.rewarded), needsHelp: Boolean(b.needsHelp),
    steps: Array.isArray(b.steps) ? b.steps.slice(0, 12).map((s) => ({ n: Number(s.n) || 0, ok: Boolean(s.ok) })) : [],
  };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const kv = store();
  const pinOk = kv && req.headers["x-teacher-pin"] === process.env.TEACHER_PIN;
  try {
    if (req.method === "POST") {
      if (!kv) return res.status(202).json({ saved: false, reason: "No class log is connected. Nothing was kept." });
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      await kv("LPUSH", LIST, JSON.stringify(clean(body)));
      await kv("LTRIM", LIST, 0, MAX_KEPT - 1);
      return res.status(201).json({ saved: true });
    }
    if (req.method === "GET") {
      if (!kv) return res.status(200).json(demo(true));
      if (req.query?.demo === "1") return res.status(200).json(demo(false));
      if (!pinOk) return res.status(401).json({ error: "Professor code needed." });
      const rows = (await kv("LRANGE", LIST, 0, MAX_KEPT - 1)) || [];
      return res.status(200).json({ demo: false, setup: false, attempts: rows.map((r) => JSON.parse(r)), key: KEY, storage: "redis" });
    }
    if (req.method === "DELETE") {
      if (!kv) return res.status(200).json({ cleared: 0 });
      if (!pinOk) return res.status(401).json({ error: "Professor code needed." });
      return res.status(200).json({ cleared: (await kv("DEL", LIST)) || 0 });
    }
  } catch (err) {
    // The page treats any error as "not saved", which is the truth.
    return res.status(503).json({ saved: false, error: "Class log is not answering. Try again later." });
  }
  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Use GET, POST or DELETE." });
}
