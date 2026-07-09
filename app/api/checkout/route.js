import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { resolvePriceId } from '../_lib/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Your Stripe coupon ID for the Founding Member discount.
const FOUNDING_COUPON_ID = process.env.STRIPE_FOUNDING_COUPON_ID || 'NUMWNGRY';
// Set to false (or unset the env) after the 30-day founding window closes.
const FOUNDING_WINDOW_OPEN = process.env.FOUNDING_WINDOW_OPEN !== 'false';

export async function POST(request) {
  try {
    // H3 fix: the client sends a PLAN ('monthly'|'annual'), never a raw price
    // ID. The server resolves the price from the request's country, so a user
    // cannot pick the cheapest region's price.
    const { plan, founding } = await request.json();
    const chosenPlan = plan === 'annual' ? 'annual' : 'monthly';
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    const priceId = resolvePriceId(country, chosenPlan);

    const base = process.env.NEXT_PUBLIC_URL || 'https://findnehama.com';
    const params = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      // B3: return with the session id so we can verify server-side.
      success_url: `${base}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}?paid=cancel`,
    };

    if (founding && FOUNDING_WINDOW_OPEN) {
      params.discounts = [{ coupon: FOUNDING_COUPON_ID }];
    } else {
      params.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error.message);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }
}
