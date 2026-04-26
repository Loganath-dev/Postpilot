import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '@/components/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Supabase Database Webhook payload structure when an insert happens:
    // { type: 'INSERT', table: 'users', schema: 'auth', record: { id, email, ... }, old_record: null }
    
    // Safety check - Ensure it's an insert event
    if (payload.type !== 'INSERT') {
      return NextResponse.json({ message: 'Ignored non-insert event' }, { status: 200 });
    }

    const { email } = payload.record;

    if (!email) {
      return NextResponse.json({ error: 'No email found in payload' }, { status: 400 });
    }

    // Send the welcome email
    const data = await resend.emails.send({
      from: 'PostPilot <smartonboardai@gmail.com>', // Update this domain once verified in Resend
      to: [email],
      subject: 'Welcome to PostPilot 🚀',
      react: WelcomeEmail({ userEmail: email }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
