import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Replace with your actual Stripe coupon ID for Founding Member
const FOUNDING_COUPON_ID = 'NUMWNGRY';

// Set to false after the 30-day founding window closes
const FOUNDING_WINDOW_OPEN = true;

export async function POST(request) {
  try {
    const { priceId, founding } = await request.json();

    const params = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 7,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://nehama.vercel.app'}?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://nehama.vercel.app'}?paid=cancel`,
    };

    // During founding window, auto-apply founding coupon
    // Otherwise, allow promotion codes (for GRACE scholarship codes)
    if (founding && FOUNDING_WINDOW_OPEN && FOUNDING_COUPON_ID !== 'FOUNDING_MEMBER_COUPON_ID') {
      params.discounts = [{ coupon: FOUNDING_COUPON_ID }];
    } else {
      params.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
