'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SITE, whatsappLink, enquiryMessage } from '@/lib/site';

const EnquiryContext = createContext(null);

const EMPTY = { name: '', email: '', phone: '', message: '' };

export function EnquiryProvider({ children }) {
  const [openFor, setOpenFor] = useState(null); // null = closed; string = car name (or '')
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | unconfigured

  const openEnquiry = useCallback((carName = '') => {
    setForm({ ...EMPTY, message: enquiryMessage(carName) });
    setStatus('idle');
    setOpenFor(carName);
  }, []);

  const close = useCallback(() => setOpenFor(null), []);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  const carName = openFor || '';

  async function submitEmail(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, car: carName || 'General enquiry' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus('sent');
      else if (data.error === 'email_not_configured') setStatus('unconfigured');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  function openWhatsApp() {
    const lines = [
      enquiryMessage(carName),
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
    ].filter(Boolean).join('\n');
    window.open(whatsappLink(lines), '_blank', 'noopener');
  }

  return (
    <EnquiryContext.Provider value={value}>
      {children}

      {openFor !== null && (
        <div className="da-modal" role="dialog" aria-modal="true" aria-label="Enquiry form" onMouseDown={close}>
          <div className="da-modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <button className="da-modal-x" onClick={close} aria-label="Close">×</button>

            <h3 className="da-modal-title">
              {carName ? `Enquire about the ${carName}` : 'Send us an enquiry'}
            </h3>
            <p className="da-modal-sub">
              Tell us your dates and we&apos;ll confirm availability and the best rate — usually within the hour.
            </p>

            {status === 'sent' ? (
              <div className="da-modal-done">
                <div className="da-modal-tick">✓</div>
                <p>Thanks! Your enquiry is on its way. Our Dubai team will be in touch shortly.</p>
                <button className="btn btn-primary py-2 px-4" onClick={close}>Done</button>
              </div>
            ) : (
              <form onSubmit={submitEmail} className="da-modal-form">
                <input className="form-control" placeholder="Your name" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="form-control" type="email" placeholder="Email" required
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="form-control" placeholder="Phone / WhatsApp"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <textarea className="form-control" rows="3" placeholder="Message"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

                {status === 'error' && (
                  <p className="da-modal-note da-modal-err">Something went wrong sending your email. Please try WhatsApp below.</p>
                )}
                {status === 'unconfigured' && (
                  <p className="da-modal-note da-modal-err">Email isn&apos;t set up yet — please reach us on WhatsApp below.</p>
                )}

                <div className="da-modal-actions">
                  <button type="submit" className="btn btn-primary py-2 px-4 flex-fill" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send by email'}
                  </button>
                  <button type="button" className="btn da-wa flex-fill" onClick={openWhatsApp}>
                    <span aria-hidden="true">💬</span> WhatsApp
                  </button>
                </div>
                <p className="da-modal-note">Prefer to talk? Call {SITE.phone}</p>
              </form>
            )}
          </div>

          <style>{`
            .da-modal {
              position: fixed; inset: 0; z-index: 3000; display: flex;
              align-items: center; justify-content: center; padding: 20px;
              background: rgba(17,17,17,.55); backdrop-filter: blur(2px);
              animation: da-fade .15s ease-out;
            }
            @keyframes da-fade { from { opacity: 0 } to { opacity: 1 } }
            .da-modal-card {
              width: 100%; max-width: 460px; background: #fff; border-radius: 14px;
              padding: 30px 28px; position: relative; box-shadow: 0 24px 60px rgba(0,0,0,.3);
              max-height: 92vh; overflow-y: auto;
            }
            .da-modal-x {
              position: absolute; top: 12px; right: 16px; background: none; border: 0;
              font-size: 26px; line-height: 1; color: #999; cursor: pointer;
            }
            .da-modal-x:hover { color: #333; }
            .da-modal-title { font-size: 22px; font-weight: 700; margin: 0 0 6px; color: #1a1a1a; }
            .da-modal-sub { font-size: 14px; color: #777; margin: 0 0 18px; }
            .da-modal-form { display: flex; flex-direction: column; gap: 12px; }
            .da-modal-form .form-control { font-size: 15px; }
            .da-modal-actions { display: flex; gap: 10px; margin-top: 4px; }
            .da-wa {
              background: #25d366; color: #fff; border: 0; font-weight: 600;
              display: inline-flex; align-items: center; justify-content: center; gap: 6px;
            }
            .da-wa:hover { background: #1eb257; color: #fff; }
            .da-modal-note { font-size: 12.5px; color: #999; margin: 6px 0 0; text-align: center; }
            .da-modal-err { color: #e23744; }
            .da-modal-done { text-align: center; padding: 10px 0; }
            .da-modal-tick {
              width: 56px; height: 56px; border-radius: 50%; background: #e8f7ee; color: #25a35a;
              font-size: 30px; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;
            }
            .da-modal-done p { color: #555; margin-bottom: 16px; }
          `}</style>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within <EnquiryProvider>');
  return ctx;
}
