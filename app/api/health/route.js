import { NextResponse } from "next/server";

// Health check that exercises the REAL chat path (a tiny 1-token Anthropic
// call) so an uptime monitor catches model/key breakage — the exact silent
// failure that took the app down before. Returns 200 only if the model
// actually responds; 503 if Anthropic errors (retired model, bad key).
//
// Protected by NEHAMA_HEALTH_KEY so strangers can't trigger (and bill) it.
// Point UptimeRobot at:  https://findnehama.com/api/health?key=YOUR_KEY
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

export async function GET(req) {
  const key = new URL(req.url).searchParams.get("key");
  if (!process.env.NEHAMA_HEALTH_KEY || key !== process.env.NEHAMA_HEALTH_KEY) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 1, messages: [{ role: "user", content: "ping" }] }),
    });
    const data = await r.json();
    if (!r.ok || (data && data.type === "error")) {
      return NextResponse.json({ ok: false, model: MODEL, error: data && data.error ? data.error : "upstream error" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, model: MODEL });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e && e.message) }, { status: 503 });
  }
}
