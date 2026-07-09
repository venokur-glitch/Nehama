// Server-only. Signs/verifies a short-lived access token (HMAC-SHA256).
// Used by /api/verify-access (issue) and /api/chat (check). Never shipped
// to the client. Requires env NEHAMA_ACCESS_SECRET (a long random string).
import crypto from 'crypto';

const SECRET = process.env.NEHAMA_ACCESS_SECRET || '';
const b64url = (buf) => Buffer.from(buf).toString('base64url');

// payload: { access: 'paid'|'beta'|'lifetime'|'scholarship', exp: <unix seconds> }
export function signToken(payload) {
  if (!SECRET) throw new Error('NEHAMA_ACCESS_SECRET is not set');
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyToken(token) {
  try {
    if (!SECRET || !token || !token.includes('.')) return null;
    const [body, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
    // constant-time compare
    if (sig.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// Pull the token out of the Cookie header.
export function readAccessCookie(req) {
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)nehama_access=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export const ACCESS_COOKIE = 'nehama_access';
export const ACCESS_TTL_SECONDS = 60 * 60 * 12; // 12h; refreshed on each verified return
