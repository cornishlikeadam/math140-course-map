// Free OpenCode Zen models, tried in order. Space Bunny keeps no data (best
// for students); the others are backups if it is busy or retired.
const MODELS = ["space-bunny-free", "big-pickle", "mimo-v2.6-flash-free"];
const API_URL = "https://opencode.ai/zen/v1/chat/completions";

const SYSTEM = `You are the Proof Check hint tutor for SCAD MATH 140 "The Geometry of Physical Space", Step 3 of the Constructions & Proof unit. This is the only step in the unit where AI is allowed.

Your only job: read a proof the student has ALREADY drafted and point to the FIRST step whose reason is missing, wrong, or does not follow. Then name the kind of justification they need (for example "a triangle congruence postulate", "a property of parallel lines cut by a transversal", "a theorem about inscribed angles"), without naming the exact statement to write.

Hard rules:
- Never write a proof step, statement, or reason for the student. Never complete, rewrite, or fix their proof. Never give the final answer.
- If the message has no attempted proof with at least 2 steps, do not help with the problem. Ask the student to write their own draft first (two-column or paragraph).
- If the student asks for the answer or the next step, decline kindly and give only the hint described above.
- You cannot see diagrams or constructions. If the proof depends on a figure, say which given fact you are assuming from the description.
- You can be wrong about proofs. End every reply with: "Check this hint against your theorem list; your instructor decides what is correct."
- Keep replies under 120 words. One gap per reply. End with one question that makes the student justify their own step.`;

const MAX_TURNS = 20;
const MAX_CHARS = 4000;

// Accepts the key under either name, since it was first saved as OPENROUTER_API_KEY.
const apiKey = () => (process.env.OPENCODE_API_KEY || process.env.OPENROUTER_API_KEY || "").trim().replace(/^["']|["']$/g, "");

async function ask(model, messages) {
  const t0 = Date.now();
  const r = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, max_tokens: 4000, reasoning_effort: "low", messages: [{ role: "system", content: SYSTEM }, ...messages] }),
  });
  const data = await r.json().catch(() => ({}));
  console.log("timing", model, r.status, `${Date.now() - t0}ms`, JSON.stringify(data.usage || {}), `reasoning_chars=${(data.choices?.[0]?.message?.reasoning_content || "").length}`);
  return { status: r.status, ok: r.ok && !data.error, data };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (!apiKey()) {
    return res.status(503).json({ error: "The chat isn't set up yet: the site owner needs to add an OpenCode API key." });
  }

  const history = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Send a message to start." });
  }

  try {
    let last, authFailures = 0;
    for (const model of MODELS) {
      last = await ask(model, messages);
      const reply = (last.data.choices?.[0]?.message?.content || "").trim();
      if (last.ok && reply) return res.status(200).json({ reply, model });
      if (last.status === 401 || last.status === 403) authFailures++;
      console.error("OpenCode model failed", model, last.status, JSON.stringify(last.data).slice(0, 300));
    }
    if (authFailures === MODELS.length) {
      return res.status(503).json({ error: "The chat's API key isn't working. The site owner needs to check it." });
    }
    if (last?.status === 429) {
      return res.status(429).json({ error: "The free AI models are busy or at their limit right now. Try again in a few minutes." });
    }
    return res.status(502).json({ error: "The AI service returned an error. Try again shortly." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Couldn't reach the AI service. Try again." });
  }
}
