'use client';
import { useCurrency } from '@/components/providers/CurrencyProvider';

// Renders a USD base amount in the visitor's detected/selected currency.
// Usage: <Price usd={45} /> or <Price usd={45} suffix="/day" />
export default function Price({ usd, suffix, className = '' }) {
  const { convertAndFormat } = useCurrency();
  return (
    <span className={className}>
      {convertAndFormat(usd)}
      {suffix ? <span className="da-price-suffix">{suffix}</span> : null}
    </span>
  );
}
