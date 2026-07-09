import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { signToken, ACCESS_COOKIE, ACCESS_TTL_SECONDS } from '../_lib/access';

// B3: verify a Stripe Checkout session server-side before granting access,
// instead of trusting ?paid=true. Gates on SUBSCRIPTION status (trialing OR
// active) — NOT payment_status — so 7-day trial users are not locked out.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json().catch(() => ({}));
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing session' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });

    const sub = session.subscription;
    const status = sub && typeof sub === 'object' ? sub.status : null;
    const active = status === 'trialing' || status === 'active';

    if (!active) {
      return NextResponse.json({ ok: false, error: 'No active subscription' }, { status: 402 });
    }

    const token = signToken({
      access: 'paid',
      sub: typeof sub === 'object' ? sub.id : String(sub),
      exp: Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS,
    });

    const res = NextResponse.json({ ok: true, access: 'paid' });
    res.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: ACCESS_TTL_SECONDS,
    });
    return res;
  } catch (error) {
    console.error('verify-access error:', error.message);
    return NextResponse.json({ ok: false, error: 'Verification failed' }, { status: 500 });
  }
}
