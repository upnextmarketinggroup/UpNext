import { NextResponse } from 'next/server';

/**
 * Lead intake -> GoHighLevel.
 *
 * The GHL inbound-webhook URL lives in the `GHL_WEBHOOK_URL` server env var, so
 * it never ships to the browser. With the var unset (local development) the
 * payload is logged to the terminal and the form still reports success, so the
 * whole flow is testable before the CRM is wired up.
 *
 * See README > "Wiring the form to GoHighLevel".
 */

export const runtime = 'nodejs';

type LeadPayload = {
  name?: string;
  business?: string;
  industry?: string;
  phone?: string;
  email?: string;
  challenge?: string;
  budget?: string;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Server-side validation mirrors the client's, so the endpoint is safe on its own.
  const missing = (['name', 'business', 'phone', 'email'] as const).filter(
    (field) => !body[field]?.trim()
  );

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(', ')}` },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(body.email!.trim())) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const lead = {
    // GHL inbound webhooks map on field name; these keys line up with the
    // standard contact fields plus custom values for the qualifiers.
    first_name: body.name!.trim().split(' ')[0],
    last_name: body.name!.trim().split(' ').slice(1).join(' '),
    full_name: body.name!.trim(),
    business_name: body.business?.trim() ?? '',
    industry: body.industry?.trim() ?? '',
    phone: body.phone!.trim(),
    email: body.email!.trim(),
    marketing_challenge: body.challenge?.trim() ?? '',
    monthly_budget: body.budget?.trim() ?? '',
    source: body.source || 'website',
    submitted_at: new Date().toISOString(),
  };

  const webhook = process.env.GHL_WEBHOOK_URL;

  if (!webhook) {
    console.info('[lead] GHL_WEBHOOK_URL is not set — lead logged only:', lead);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      // Never leave the visitor hanging on a slow CRM.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error('[lead] GHL webhook rejected the lead:', response.status, lead);
      return NextResponse.json({ error: 'CRM rejected the lead.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[lead] Failed to reach the GHL webhook:', error, lead);
    return NextResponse.json({ error: 'Could not reach the CRM.' }, { status: 502 });
  }
}
