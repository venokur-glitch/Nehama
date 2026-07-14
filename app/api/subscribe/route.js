import { NextResponse } from "next/server";
import { isRateLimited } from "../_lib/ratelimit";

// M5: origin-check + rate-limit + validate so this can't be used as an open
// relay to bomb arbitrary emails into your MailerLite lists. For strong
// protection add a captcha (hCaptcha/Turnstile) on the email capture too.
const ALLOWED_HOSTS = ["findnehama.com", "www.findnehama.com", "nehama.app", "www.nehama.app"];
const RL_MAX = 5;
const RL_WINDOW_SEC = 60;

function originAllowed(req) {
  const src = req.headers.get("origin") || req.headers.get("referer");
  if (!src) return false;
  try { const h = new URL(src).hostname; const host = (req.headers.get("host") || "").split(":")[0]; return ALLOWED_HOSTS.includes(h) || (!!host && h === host); } catch { return false; }
}
const emailOk = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 254;

export async function POST(req) {
  try {
    if (!originAllowed(req)) {
      return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 });
    }
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    if (await isRateLimited(`subscribe:${ip}`, RL_MAX, RL_WINDOW_SEC)) {
      return NextResponse.json({ error: { message: "Too many requests" } }, { status: 429 });
    }

    const { email, groupId, fields } = await req.json();
    if (!emailOk(email) || !groupId) {
      return NextResponse.json({ error: { message: "Invalid email or groupId" } }, { status: 400 });
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email, groups: [groupId], ...(fields ? { fields } : {}) }),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: { message: data.message || "MailerLite request failed" } }, { status: response.status });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: { message: "Server error" } }, { status: 500 });
  }
}
