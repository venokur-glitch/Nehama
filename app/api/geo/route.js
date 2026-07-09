import { NextResponse } from 'next/server';

// H4 fix: the client calls /api/geo. The route previously only existed at
// /geo, so the fetch 404'd and every user fell back to US pricing. This route
// lives at /api/geo to match the client. (The old app/geo/route.js is removed.)
export async function GET(request) {
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  return NextResponse.json({ country });
}
