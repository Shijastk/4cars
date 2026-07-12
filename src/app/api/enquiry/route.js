// Enquiry endpoint. Delivers car enquiries straight to the business inbox — no
// mail-client redirect for the visitor.
//
// Transport: FormSubmit (https://formsubmit.co) — no API key, no account, no
// server to run. We POST to the AJAX endpoint for SITE.email and the enquiry
// lands in that inbox.
//
// ⚠️  ONE-TIME ACTIVATION: the very first submission makes FormSubmit send a
// confirmation link to SITE.email. Nothing is delivered until someone opens that
// email and clicks the link. Until then this endpoint answers `not_activated`
// and the UI asks the visitor to call the business phone instead.

import { SITE } from '@/lib/site';

const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`;

export async function POST(request) {
  const data = await request.json().catch(() => null);

  if (!data || !data.email || !data.message) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Without a Referer, FormSubmit assumes the form is a local HTML file and
        // rejects the submission outright. A server-side fetch sends none, so we
        // supply the canonical site URL ourselves.
        Referer: `https://${SITE.domain}/`,
      },
      body: JSON.stringify({
        _subject: `New car enquiry: ${data.car || 'General'}`,
        _template: 'table',
        _captcha: 'false',
        name: data.name || 'Website visitor',
        email: data.email,
        phone: data.phone || '',
        car: data.car || '',
        message: data.message,
      }),
    });
    const out = await res.json().catch(() => ({}));

    // FormSubmit reports success as the *string* "true", not a boolean.
    if (res.ok && String(out.success) === 'true') {
      return Response.json({ ok: true });
    }

    // Before the confirmation link is clicked FormSubmit replies with a message
    // about activating the form. Flag that separately so the UI can fall back to
    // the phone number rather than blaming the visitor's input.
    const pending = /activat|confirm/i.test(out.message || '');
    return Response.json(
      { ok: false, error: pending ? 'not_activated' : 'delivery_failed' },
      { status: pending ? 200 : 502 },
    );
  } catch {
    return Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
}
