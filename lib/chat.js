import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./cv.js";

// Shared handler used by both Vercel (api/chat.js) and Netlify (netlify/functions/chat.mjs).
// Uses the Web-standard Request/Response API, which both platforms support.

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const MAX_TURNS = 12; // most recent messages kept as context
const MAX_CHARS = 1200; // per message, guards against abuse

let client;
function getClient() {
  // Reads ANTHROPIC_API_KEY from the environment.
  if (!client) client = new Anthropic();
  return client;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function sanitize(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .slice(-MAX_TURNS);

  // The conversation must start with a user turn and alternate roles.
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  const out = [];
  for (const m of msgs) {
    if (out.length && out[out.length - 1].role === m.role) out[out.length - 1] = m;
    else out.push(m);
  }
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function handleChat(request) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: "The assistant is not configured yet (missing ANTHROPIC_API_KEY)." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const messages = sanitize(body?.messages);
  if (!messages) return json({ error: "Send a non-empty conversation ending with a user message." }, 400);

  try {
    const response = await getClient().beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages,
      // Low effort keeps spoken replies fast; the task is simple Q&A over a short CV.
      output_config: { effort: "low" },
      // If a safety classifier declines, the API retries on a suitable fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });

    if (response.stop_reason === "refusal") {
      return json({
        reply:
          "I'm sorry, I can't help with that. I'm happy to tell you about Laila's experience, skills, or achievements though.",
      });
    }

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim();

    return json({
      reply: reply || "Sorry, I didn't catch that. Could you rephrase your question?",
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return json({ error: "The assistant is busy right now. Please try again in a moment." }, 429);
    }
    if (err instanceof Anthropic.APIStatusError) {
      console.error("Claude API error", err.status, err.message);
      return json({ error: "The assistant had a problem answering. Please try again." }, 502);
    }
    if (err instanceof Anthropic.APIConnectionError) {
      console.error("Claude connection error", err.message);
      return json({ error: "Couldn't reach the assistant. Please try again." }, 503);
    }
    console.error(err);
    return json({ error: "Unexpected error." }, 500);
  }
}
