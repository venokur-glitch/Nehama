import { NextResponse } from 'next/server';
import { signToken, ACCESS_COOKIE, ACCESS_TTL_SECONDS } from '../_lib/access';

// L1/B3: invitation codes validated SERVER-side so they are no longer sitting
// in the client bundle. Configure the real codes via env (comma-separated):
//   NEHAMA_INVITE_CODES="LOVE"        -> grants 'beta'
//   NEHAMA_GIFT_CODES="GIFT4U"        -> grants 'lifetime'
// Falls back to the original defaults if env is unset so nothing breaks.
const INVITE = (process.env.NEHAMA_INVITE_CODES || 'LOVE').split(',').map((s) => s.trim().toUpperCase());
const GIFT = (process.env.NEHAMA_GIFT_CODES || 'GIFT4U').split(',').map((s) => s.trim().toUpperCase());

export async function POST(request) {
  try {
    const { code } = await request.json().catch(() => ({}));
    const c = String(code || '').trim().toUpperCase();
    if (!c) return NextResponse.json({ ok: false }, { status: 400 });

    let access = null;
    if (INVITE.includes(c)) access = 'beta';
    else if (GIFT.includes(c)) access = 'lifetime';
    if (!access) return NextResponse.json({ ok: false, error: 'Code not recognized' }, { status: 404 });

    const token = signToken({ access, exp: Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS });
    const res = NextResponse.json({ ok: true, access });
    res.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: ACCESS_TTL_SECONDS,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
