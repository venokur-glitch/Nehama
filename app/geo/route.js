import { NextResponse } from 'next/server';

export async function GET(request) {
  // Vercel provides this header automatically on deployed apps
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  return NextResponse.json({ country });
}
