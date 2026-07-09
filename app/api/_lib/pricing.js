// Server-only. Maps a country -> pricing tier -> Stripe price IDs.
// Fixes red-team High-3: the client no longer chooses the price ID, so a
// user can't submit the cheapest region's ID. The server resolves the price
// from the request's x-vercel-ip-country.

export const TIER_PRICES = {
  us:    { monthly: 'price_1TRCFu3M9jKTDmprPvMoqOlU', annual: 'price_1TRCFu3M9jKTDmprXK5SFPVW' },
  uk:    { monthly: 'price_1TRCFt3M9jKTDmprWEQhYvjh', annual: 'price_1TRCFt3M9jKTDmprxL3JDiKG' },
  eu:    { monthly: 'price_1TRCFt3M9jKTDmprSmhOHCSX', annual: 'price_1TRCFs3M9jKTDmprzNjAno2B' },
  ca:    { monthly: 'price_1TRCFs3M9jKTDmprAxqDuub0', annual: 'price_1TRCFs3M9jKTDmprCrDNxZwd' },
  au:    { monthly: 'price_1TRCFr3M9jKTDmprqsPIjppZ', annual: 'price_1TRCFr3M9jKTDmprnAF7qepF' },
  mx:    { monthly: 'price_1TRCFr3M9jKTDmprIJvqAiQ7', annual: 'price_1TRCFq3M9jKTDmprI31wksU1' },
  br:    { monthly: 'price_1TRCFq3M9jKTDmprofnBGW4K', annual: 'price_1TRCFq3M9jKTDmprVjjpdUlR' },
  latam: { monthly: 'price_1TRCFp3M9jKTDmprwSr7yiC7', annual: 'price_1TRCFp3M9jKTDmprY0740SAq' },
};

const COUNTRY_TIER = {
  US: 'us', GB: 'uk', CA: 'ca', AU: 'au', NZ: 'au', MX: 'mx', BR: 'br',
  DE: 'eu', FR: 'eu', IT: 'eu', ES: 'eu', NL: 'eu', BE: 'eu', AT: 'eu', PT: 'eu',
  IE: 'eu', FI: 'eu', GR: 'eu', LU: 'eu', MT: 'eu', SK: 'eu', SI: 'eu', EE: 'eu',
  LV: 'eu', LT: 'eu', CY: 'eu', HR: 'eu', BG: 'eu', RO: 'eu', CZ: 'eu', DK: 'eu',
  HU: 'eu', PL: 'eu', SE: 'eu', NO: 'eu', CH: 'eu', IS: 'eu',
  JP: 'us', KR: 'us', SG: 'us', IL: 'us', HK: 'us', TW: 'us',
  CO: 'latam', AR: 'latam', CL: 'latam', PE: 'latam', EC: 'latam', GT: 'latam',
  DO: 'latam', VE: 'latam', CR: 'latam', PA: 'latam', UY: 'latam', PY: 'latam',
  BO: 'latam', HN: 'latam', SV: 'latam', NI: 'latam', CU: 'latam',
};

export function getTier(countryCode) {
  return COUNTRY_TIER[countryCode] || 'us';
}

// Resolve a Stripe price ID from country + plan, server-side.
export function resolvePriceId(countryCode, plan) {
  const tier = getTier(countryCode);
  const p = TIER_PRICES[tier] || TIER_PRICES.us;
  return plan === 'annual' ? p.annual : p.monthly;
}
