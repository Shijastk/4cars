// Enquiry endpoint. Delivers car enquiries straight to the business inbox — no
// mail-client redirect for the visitor.
//
// Transport: Web3Forms (https://web3forms.com) — free, no server to run. Set the
// access key in an env var and enquiries land in the inbox tied to that key:
//
//   WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//
// Until it's configured the endpoint responds with `email_not_configured`, and
// the UI falls back to the always-available WhatsApp channel.

export async function POST(request) {
  const data = await request.json().catch(() => null);

  if (!data || !data.email || !data.message) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return Response.json({ ok: false, error: 'email_not_configured' }, { status: 200 });
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New car enquiry: ${data.car || 'General'}`,
        from_name: data.name || 'Website visitor',
        name: data.name || '',
        email: data.email,
        phone: data.phone || '',
        car: data.car || '',
        message: data.message,
      }),
    });
    const out = await res.json().catch(() => ({}));
    const ok = res.ok && out.success !== false;
    return Response.json({ ok, error: ok ? undefined : 'delivery_failed' }, { status: ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }
}
