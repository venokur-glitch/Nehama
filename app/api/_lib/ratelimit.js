// Rate limiter backed by Vercel KV / Upstash Redis when configured, with a
// safe in-memory fallback (per-instance) when it isn't. Uses the store's REST
// API via fetch, so there is NO SDK dependency to install. Fails OPEN to the
// in-memory limiter on any KV error, so a KV hiccup can never take chat down.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
export const kvActive = !!(KV_URL && KV_TOKEN);

// ---- in-memory fallback (per serverless instance) ----
const mem = new Map();
function memLimited(key, max, windowMs) {
  const now = Date.now();
  const arr = (mem.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  mem.set(key, arr);
  if (mem.size > 5000) mem.clear();
  return arr.length > max;
}

// ---- shared KV limiter (global across instances) ----
async function kvLimited(key, max, windowSec) {
  try {
    const inc = await fetch(`${KV_URL}/incr/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!inc.ok) return memLimited(key, max, windowSec * 1000);
    const { result } = await inc.json();
    if (result === 1) {
      // first hit in this window: set the expiry
      await fetch(`${KV_URL}/expire/${encodeURIComponent(key)}/${windowSec}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: "no-store",
      });
    }
    return result > max;
  } catch {
    return memLimited(key, max, windowSec * 1000);
  }
}

// key: unique per route+ip. max: allowed hits per window. windowSec: window length.
export async function isRateLimited(key, max, windowSec) {
  if (kvActive) return kvLimited(key, max, windowSec);
  return memLimited(key, max, windowSec * 1000);
}
