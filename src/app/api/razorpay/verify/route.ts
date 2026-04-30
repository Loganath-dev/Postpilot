import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/utils/supabase/server';

// We need the admin client to update user credits/plans bypassing RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    
    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Payment is valid! Upgrade the user's plan.
    // Determine token bonus based on selected plan
    let tokensToAdd = 0;
    if (planId === 'pro') {
      // Pro plan – 5,000 tokens included
      tokensToAdd = 5000;
    } else if (planId === 'starter') {
      // Starter plan – 2,000 tokens included
      tokensToAdd = 2000;
    } else if (planId === 'lifetime') {
      // Lifetime deal – 8,000 tokens one‑time
      tokensToAdd = 8000;
    } else {
      // Default fallback for unknown planIds
      tokensToAdd = 50;
    }

    // Update or create the profile with the new plan and token balance
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('tokens, plan_type')
      .eq('id', user.id)
      .single();

    if (profile) {
      await supabaseAdmin
        .from('profiles')
        .update({
          plan_type: planId,
          tokens: (profile.tokens ?? 0) + tokensToAdd,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    } else {
      await supabaseAdmin
        .from('profiles')
        .insert({
          id: user.id,
          plan_type: planId,
          tokens: tokensToAdd,
        });
    }

    // Fetch the updated profile to send back to the client
    const { data: updatedProfile } = await supabaseAdmin
      .from('profiles')
      .select('tokens, plan_type')
      .eq('id', user.id)
      .single();

    return NextResponse.json({ success: true, profile: updatedProfile }, { status: 200 });
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', details: error.message },
      { status: 500 }
    );
  }
}
