'use client';
import { useState } from 'react';
import { SITE } from '@/lib/site';

// Full-page contact form. Sends straight to the business inbox via /api/enquiry
// (no mail-client redirect), with the business phone as a fallback.
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | unconfigured

  function set(key) {
    return (e) => setForm({ ...form, [key]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          car: form.subject || 'Contact form',
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus('sent');
      else if (data.error === 'email_not_configured') setStatus('unconfigured');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-light p-5 text-center">
        <div style={{ fontSize: 40, color: '#25a35a' }}>✓</div>
        <h3 className="mt-2">Message sent</h3>
        <p style={{ color: '#666' }}>Thanks for reaching out — our Dubai team will reply shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-light p-5 contact-form">
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Your Name" required value={form.name} onChange={set('name')} />
      </div>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Your Email" required value={form.email} onChange={set('email')} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Subject" value={form.subject} onChange={set('subject')} />
      </div>
      <div className="form-group">
        <textarea cols="30" rows="7" className="form-control" placeholder="Message" required value={form.message} onChange={set('message')}></textarea>
      </div>

      {status === 'error' && <p style={{ color: '#c40809' }}>Couldn&apos;t send your message — please call us on {SITE.phone}.</p>}
      {status === 'unconfigured' && <p style={{ color: '#c40809' }}>Email isn&apos;t configured yet — please call us on {SITE.phone}.</p>}

      <div className="form-group d-flex flex-wrap" style={{ gap: 10 }}>
        <button type="submit" className="btn btn-primary py-3 px-5" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
