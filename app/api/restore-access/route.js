import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { signToken, ACCESS_COOKIE, ACCESS_TTL_SECONDS } from '../_lib/access';

// "I already paid, let me back in." Covers existing subscribers, expired
// cookies, and device switches — without accounts. The user enters their
// email; we check Stripe live for an active/trialing subscription and, if
// found, issue the same access cookie verify-access issues.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ALLOWED_HOSTS = ['findnehama.com', 'www.findnehama.com', 'nehama.app', 'www.nehama.app'];

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now); hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > MAX_PER_WINDOW;
}
function originAllowed(req) {
  const src = req.headers.get('origin') || req.headers.get('referer');
  if (!src) return false;
  try { const h = new URL(src).hostname; const host = (req.headers.get('host') || '').split(':')[0]; return ALLOWED_HOSTS.includes(h) || (!!host && h === host); } catch { return false; }
}
const emailOk = (e) => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length < 254;

export async function POST(req) {
  try {
    if (!originAllowed(req)) return NextResponse.json({ ok: false }, { status: 403 });
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) return NextResponse.json({ ok: false, error: 'Too many attempts' }, { status: 429 });

    const { email } = await req.json().catch(() => ({}));
    if (!emailOk(email)) return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });

    // Find the customer(s) for this email, then look for a live subscription.
    const customers = await stripe.customers.list({ email: email.toLowerCase(), limit: 5 });
    let active = false;
    for (const c of customers.data) {
      const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 10 });
      if (subs.data.some((s) => s.status === 'trialing' || s.status === 'active')) { active = true; break; }
    }
    if (!active) {
      // Deliberately vague so this can't be used to enumerate who has a subscription.
      return NextResponse.json({ ok: false, error: 'No active subscription found for that email' }, { status: 404 });
    }

    const token = signToken({ access: 'paid', exp: Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS });
    const res = NextResponse.json({ ok: true, access: 'paid' });
    res.cookies.set(ACCESS_COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: ACCESS_TTL_SECONDS });
    return res;
  } catch (e) {
    console.error('restore-access error:', e.message);
    return NextResponse.json({ ok: false, error: 'Restore failed' }, { status: 500 });
  }
}
