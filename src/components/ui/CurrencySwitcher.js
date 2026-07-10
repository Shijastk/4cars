'use client';
import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '@/components/providers/CurrencyProvider';

// Navbar currency selector — a custom dropdown (no native <select>, no emoji).
// Prices across the site update instantly. Sits quietly in the dark navbar and
// opens a clean white menu of every supported currency.
export default function CurrencySwitcher() {
  const { code, setCode, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = currencies[code];
  // Avoid "AED AED": only append the symbol when it differs from the code.
  const label = current && current.symbol !== code ? `${code} ${current.symbol}` : code;

  function choose(next) {
    setCode(next);
    setOpen(false);
  }

  return (
    <span className="da-currency" ref={wrapRef}>
      <button
        type="button"
        className="da-currency-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change currency"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="da-currency-label">{label}</span>
        <span className={`da-currency-caret${open ? ' is-open' : ''}`} aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className="da-currency-menu" role="listbox" aria-label="Currency">
          {Object.entries(currencies).map(([c, meta]) => (
            <li key={c} role="option" aria-selected={c === code}>
              <button
                type="button"
                className={`da-currency-opt${c === code ? ' is-active' : ''}`}
                onClick={() => choose(c)}
              >
                <span className="da-currency-code">{c}</span>
                <span className="da-currency-name">{meta.name}</span>
                <span className="da-currency-sym">{meta.symbol}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .da-currency { position: relative; display: inline-flex; }
        .da-currency-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff; cursor: pointer;
          border: 1px solid rgba(255,255,255,.28); border-radius: 4px;
          padding: 5px 10px; line-height: 1; font-size: 13px; font-weight: 600;
          transition: border-color .15s, background .15s;
        }
        .da-currency-btn:hover { border-color: rgba(255,255,255,.6); background: rgba(255,255,255,.06); }
        .da-currency-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
        .da-currency-label { letter-spacing: .02em; }
        .da-currency-caret { font-size: 11px; color: rgba(255,255,255,.7); transition: transform .15s; }
        .da-currency-caret.is-open { transform: rotate(180deg); }

        .da-currency-menu {
          list-style: none; margin: 8px 0 0; padding: 6px;
          position: absolute; z-index: 1300; top: 100%; right: 0;
          min-width: 224px; background: #fff; border: 1px solid #e6e6e6;
          border-radius: 8px; box-shadow: 0 16px 40px rgba(0,0,0,.22);
          max-height: 320px; overflow-y: auto;
        }
        .da-currency-opt {
          width: 100%; display: flex; align-items: center; gap: 10px;
          background: transparent; border: 0; cursor: pointer; text-align: left;
          padding: 9px 10px; border-radius: 6px; font-size: 14px; color: #333;
        }
        .da-currency-opt:hover { background: #f5f5f5; }
        .da-currency-opt.is-active { background: #fff2f4; }
        .da-currency-code { font-weight: 700; color: #111; width: 42px; flex: 0 0 auto; }
        .da-currency-name { flex: 1 1 auto; color: #666; font-size: 13px; }
        .da-currency-sym { color: #999; font-weight: 600; }
        .da-currency-opt.is-active .da-currency-sym { color: #e23744; }

        @media (max-width: 991px) {
          .da-currency { margin: 8px 0; }
          .da-currency-menu { right: auto; left: 0; }
        }
      `}</style>
    </span>
  );
}
