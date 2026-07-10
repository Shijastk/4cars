// Country-aware pricing. All catalogue prices are stored in USD (see cars.js)
// and converted to the visitor's local currency at display time.
//
// - CURRENCIES: display metadata (symbol + locale) for the currencies we show.
// - FALLBACK_RATES: static USD-based rates used until (and if) live rates load.
// - COUNTRY_CURRENCY: ISO-3166 alpha-2 country code -> currency code.
//
// Live rates are fetched at runtime from the free open.er-api.com endpoint and
// merged over these fallbacks, so the numbers stay reasonable even offline.

export const DEFAULT_CURRENCY = 'AED'; // UAE home currency when detection fails

export const CURRENCIES = {
  AED: { symbol: 'AED', name: 'UAE Dirham',        locale: 'en-AE' },
  USD: { symbol: '$',   name: 'US Dollar',         locale: 'en-US' },
  EUR: { symbol: '€',   name: 'Euro',              locale: 'en-IE' },
  GBP: { symbol: '£',   name: 'British Pound',     locale: 'en-GB' },
  INR: { symbol: '₹',   name: 'Indian Rupee',      locale: 'en-IN' },
  SAR: { symbol: 'SAR', name: 'Saudi Riyal',       locale: 'en-SA' },
  QAR: { symbol: 'QAR', name: 'Qatari Riyal',      locale: 'en-QA' },
  KWD: { symbol: 'KWD', name: 'Kuwaiti Dinar',     locale: 'en-KW' },
  OMR: { symbol: 'OMR', name: 'Omani Rial',        locale: 'en-OM' },
  BHD: { symbol: 'BHD', name: 'Bahraini Dinar',    locale: 'en-BH' },
  EGP: { symbol: 'EGP', name: 'Egyptian Pound',    locale: 'en-EG' },
  PKR: { symbol: '₨',   name: 'Pakistani Rupee',   locale: 'en-PK' },
  PHP: { symbol: '₱',   name: 'Philippine Peso',   locale: 'en-PH' },
  CAD: { symbol: 'C$',  name: 'Canadian Dollar',   locale: 'en-CA' },
  AUD: { symbol: 'A$',  name: 'Australian Dollar', locale: 'en-AU' },
};

export const FALLBACK_RATES = {
  USD: 1,     AED: 3.6725, EUR: 0.92,  GBP: 0.79,  INR: 83.4,
  SAR: 3.75,  QAR: 3.64,   KWD: 0.307, OMR: 0.385, BHD: 0.376,
  EGP: 47.8,  PKR: 278,    PHP: 58.2,  CAD: 1.37,  AUD: 1.51,
};

const EURO_ZONE = ['AT','BE','CY','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MT','NL','PT','SK','SI','ES'];

export const COUNTRY_CURRENCY = {
  AE: 'AED', US: 'USD', GB: 'GBP', IN: 'INR', SA: 'SAR', QA: 'QAR',
  KW: 'KWD', OM: 'OMR', BH: 'BHD', EG: 'EGP', PK: 'PKR', PH: 'PHP',
  CA: 'CAD', AU: 'AUD',
  ...Object.fromEntries(EURO_ZONE.map((c) => [c, 'EUR'])),
};

export function currencyForCountry(code) {
  return COUNTRY_CURRENCY[(code || '').toUpperCase()] || DEFAULT_CURRENCY;
}

export function isSupported(code) {
  return Boolean(code && CURRENCIES[code]);
}

// Convert a USD amount and format it for the given currency. Rounds to a whole
// unit (no fractional dirhams/rupees on a price card).
export function formatMoney(usd, code = DEFAULT_CURRENCY, rates = FALLBACK_RATES) {
  const meta = CURRENCIES[code] || CURRENCIES[DEFAULT_CURRENCY];
  const rate = rates[code] ?? FALLBACK_RATES[code] ?? 1;
  const value = Math.round(usd * rate);
  const number = new Intl.NumberFormat(meta.locale, { maximumFractionDigits: 0 }).format(value);
  const gap = meta.symbol.length > 1 ? ' ' : '';
  return `${meta.symbol}${gap}${number}`;
}
