// Vercel AI Gateway authenticates deployed functions with a short-lived OIDC
// token, so this project does not need a long-lived model-provider key.
const MODELS = ["google/gemini-2.5-flash-lite"];
const API_URL = "https://ai-gateway.vercel.sh/v1/chat/completions";

const SYSTEM = `You are the Proof Check hint tutor for SCAD MATH 140 "The Geometry of Physical Space", Step 3 of the Constructions & Proof unit. This is the only step in the unit where AI is allowed.

Your only job: read a proof the student has ALREADY drafted and point to the FIRST step whose reason is missing, wrong, or does not follow. Then name the kind of justification they need (for example "a triangle congruence postulate", "a property of parallel lines cut by a transversal", "a theorem about inscribed angles"), without naming the exact statement to write.

Hard rules:
- Never write a proof step, statement, or reason for the student. Never complete, rewrite, or fix their proof. Never give the final answer.
- If the message has no attempted proof with at least 2 steps, do not help with the problem. Ask the student to write their own draft first (two-column or paragraph).
- If the student asks for the answer or the next step, decline kindly and give only the hint described above.
- You cannot see diagrams or constructions. If the proof depends on a figure, say which given fact you are assuming from the description.
- Keep replies under 120 words. One gap per reply. Ask one question that makes the student justify their own step.
- You can be wrong about proofs. The exact final sentence of every reply must be: "Check this hint against your theorem list; your instructor decides what is correct."`;

const MAX_TURNS = 20;
const MAX_CHARS = 4000;
const MAX_TOTAL_CHARS = 12000;
const DISCLAIMER = "Check this hint against your theorem list; your instructor decides what is correct.";

// OIDC is injected automatically on Vercel. The API key fallback makes local
// testing and a future non-Vercel deployment possible.
const apiKey = () => (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || "").trim().replace(/^["']|["']$/g, "");

async function ask(model, messages) {
  const t0 = Date.now();
  const r = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(15000),
    body: JSON.stringify({
      model,
      max_tokens: 240,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      providerOptions: { gateway: { disallowPromptTraining: true, sort: "cost" } },
    }),
  });
  const data = await r.json().catch(() => ({}));
  console.log("timing", model, r.status, `${Date.now() - t0}ms`, JSON.stringify(data.usage || {}));
  return { status: r.status, ok: r.ok && !data.error, data };
}

function formatReply(reply) {
  let text = reply.split(DISCLAIMER).join("").trim();
  if (!text.includes("?")) text += "\n\nWhat rule can justify this step?";
  return `${text}\n\n${DISCLAIMER}`;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (!apiKey()) {
    return res.status(503).json({ error: "The chat isn't set up yet: the site owner needs to connect the AI gateway." });
  }

  const history = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const cleaned = history
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  const messages = [];
  let remaining = MAX_TOTAL_CHARS;
  for (let i = cleaned.length - 1; i >= 0 && remaining > 0; i--) {
    const content = cleaned[i].content.slice(0, remaining);
    messages.unshift({ role: cleaned[i].role, content });
    remaining -= content.length;
  }
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Send a message to start." });
  }

  try {
    let last, authFailures = 0;
    for (const model of MODELS) {
      last = await ask(model, messages);
      const reply = (last.data.choices?.[0]?.message?.content || "").trim();
      if (last.ok && reply) return res.status(200).json({ reply: formatReply(reply), model });
      if (last.status === 401 || last.status === 403) authFailures++;
      console.error("AI Gateway model failed", model, last.status, JSON.stringify(last.data).slice(0, 300));
    }
    if (authFailures === MODELS.length) {
      return res.status(503).json({ error: "The chat's secure connection isn't working. The site owner needs to check it." });
    }
    if (last?.status === 429) {
      return res.status(429).json({ error: "The AI helper is busy or at its limit right now. Try again in a few minutes." });
    }
    return res.status(502).json({ error: "The AI service returned an error. Try again shortly." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Couldn't reach the AI service. Try again." });
  }
}
