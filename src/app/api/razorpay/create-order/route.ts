import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    // Initialize Razorpay inside the handler so it always uses runtime env vars
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay keys missing:', { keyId: !!keyId, keySecret: !!keySecret });
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in first.' }, { status: 401 });
    }

    const { amount, planId } = await req.json();

    if (!amount || !planId) {
      return NextResponse.json({ error: 'Amount and planId are required' }, { status: 400 });
    }

    // Create Razorpay order
    // amount is expected in smallest currency unit (paise for INR)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'USD',
      receipt: `receipt_${user.id.substring(0, 8)}_${Date.now()}`,
      notes: {
        userId: user.id,
        planId: planId,
      },
    };

    console.log('Creating Razorpay order with options:', { ...options, userId: user.id });
    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
