'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CURRENCIES, FALLBACK_RATES, DEFAULT_CURRENCY,
  isSupported, formatMoney,
} from '@/lib/currency';

const CurrencyContext = createContext(null);
const STORAGE_KEY = 'da_currency';

export function CurrencyProvider({ children }) {
  // UAE is home, so prices anchor in AED. Server and first client render MUST
  // match, so we always start from the AED default and apply any saved choice
  // after mount. We deliberately do NOT geo-switch away from AED.
  const [code, setCodeState] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState(FALLBACK_RATES);

  const setCode = useCallback((next) => {
    if (!isSupported(next)) return;
    setCodeState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }, []);

  // Restore the visitor's own currency choice if they made one; otherwise the
  // UAE dirham stays selected.
  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
    if (isSupported(stored)) setCodeState(stored);
  }, []);

  // Refresh exchange rates in the background; fall back to the static table.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (!cancelled && data?.rates) setRates((prev) => ({ ...prev, ...data.rates }));
      } catch { /* keep fallback rates */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const value = useMemo(() => ({
    code,
    setCode,
    currencies: CURRENCIES,
    meta: CURRENCIES[code],
    convertAndFormat: (usd) => formatMoney(usd, code, rates),
  }), [code, setCode, rates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within <CurrencyProvider>');
  return ctx;
}
