/** @type {import('next').NextConfig} */

// M7 fix: security headers. CSP allows the app's known origins (Google Fonts,
// Adobe Typekit, self). 'unsafe-inline' is required for styles because the app
// uses inline style objects and a small inline <script> in layout.js; tighten
// with nonces later if you refactor those out.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net",
  "font-src 'self' https://fonts.gstatic.com https://use.typekit.net data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.anthropic.com https://formspree.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
