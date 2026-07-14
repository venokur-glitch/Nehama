import { NextResponse } from "next/server";
import { buildFullPrompt, buildFreePrompt } from "./prompts";
import { verifyToken, readAccessCookie } from "../_lib/access";
import { isRateLimited } from "../_lib/ratelimit";

// ── Fixes red-team Blockers 0, 1, 2 and High-1 ───────────────────────────
//  B0: model is set here (server-side), no longer a stale client constant.
//  B1: endpoint is origin-checked, rate-limited, token/size validated, and
//      the full tier requires a verified access token.
//  B2: the system prompt is built HERE and never sent by the client.
//  H1: crisis resources are localized from lang + x-vercel-ip-country.
// ─────────────────────────────────────────────────────────────────────────

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
// Sonnet 5 spends part of its output budget on internal reasoning, so the old
// 1000 ceiling (fine for Sonnet 4) starved the visible reflection and cut it
// off before the [REFLECTION_CARD] block. 8000 leaves ample room for the full
// reflection + the card in both the free and full journeys.
const MAX_TOKENS = 8000;
const ALLOWED_HOSTS = ["findnehama.com", "www.findnehama.com", "nehama.app", "www.nehama.app"];

// Rate limiting via the shared limiter (Vercel KV when configured, in-memory
// fallback otherwise): 15 requests / 60s per IP.
const RL_MAX = 15;
const RL_WINDOW_SEC = 60;

function originAllowed(req) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const src = origin || referer;
  if (!src) return false; // block direct/no-referer calls (curl, bots)
  try {
    const h = new URL(src).hostname;
    const host = (req.headers.get("host") || "").split(":")[0];
    // allow same-origin (the app calling its own API on any domain: prod, preview, etc.)
    return ALLOWED_HOSTS.includes(h) || (!!host && h === host);
  } catch {
    return false;
  }
}

export async function POST(req) {
  try {
    if (!originAllowed(req)) {
      return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
    }

    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (await isRateLimited(`chat:${ip}`, RL_MAX, RL_WINDOW_SEC)) {
      return NextResponse.json({ error: { message: "Too many requests. Please slow down." } }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: { message: "Bad request" } }, { status: 400 });
    }

    const tier = body.tier === "full" ? "full" : "free";
    const lang = ["en", "es", "pt"].includes(body.lang) ? body.lang : "en";
    const testament = ["old", "new", "both"].includes(body.testament) ? body.testament : "both";
    const mode = body.mode === "couple" ? "couple" : "individual";
    const name = String(body.name || "").slice(0, 60);
    const partnerName = String(body.partnerName || "").slice(0, 60);
    const country = req.headers.get("x-vercel-ip-country") || null;

    // Validate messages: array, bounded count, bounded size, known roles.
    const messages = Array.isArray(body.messages) ? body.messages : null;
    if (!messages || messages.length === 0 || messages.length > 120) {
      return NextResponse.json({ error: { message: "Invalid messages" } }, { status: 400 });
    }
    let total = 0;
    for (const m of messages) {
      if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
        return NextResponse.json({ error: { message: "Invalid message shape" } }, { status: 400 });
      }
      total += m.content.length;
    }
    if (total > 200_000) {
      return NextResponse.json({ error: { message: "Conversation too large" } }, { status: 413 });
    }

    // B3 gate: the full journey requires a verified access token.
    if (tier === "full") {
      const payload = verifyToken(readAccessCookie(req));
      if (!payload) {
        return NextResponse.json({ error: { message: "Access required", code: "no_access" } }, { status: 402 });
      }
    }

    const system =
      tier === "free"
        ? buildFreePrompt({ name, testament, lang, country })
        : buildFullPrompt({ name, partnerName, mode, testament, lang, country });

    // Prompt caching (cost only; output is unchanged). Mark the system prompt
    // (identical across a session's turns) and the conversation prefix as
    // cacheable. Within a session, the resent prompt + history bill at ~0.1x
    // on cache reads. Cache TTL is ~5 min, which covers an active session.
    const cachedSystem = [{ type: "text", text: system, cache_control: { type: "ephemeral" } }];
    const apiMessages = messages.map((m) => ({ role: m.role, content: m.content }));
    if (apiMessages.length > 0) {
      const last = apiMessages[apiMessages.length - 1];
      last.content = [{ type: "text", text: String(last.content), cache_control: { type: "ephemeral" } }];
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: cachedSystem,
        messages: apiMessages,
      }),
    });

    const data = await anthropicRes.json();

    // Surface upstream errors as real error statuses + log for alerting.
    if (data && data.type === "error") {
      console.error("Anthropic API error:", data.error);
      return NextResponse.json({ error: { message: "The guide is unavailable right now." } }, { status: 502 });
    }

    // Return only the assistant text; never echo the system prompt.
    const text = Array.isArray(data.content)
      ? data.content.map((c) => c.text || "").filter(Boolean).join("\n")
      : "";
    return NextResponse.json({ content: [{ type: "text", text }] });
  } catch (error) {
    console.error("chat route error:", error);
    return NextResponse.json({ error: { message: "Server error" } }, { status: 500 });
  }
}
