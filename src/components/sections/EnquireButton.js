'use client';
import { useEnquiry } from '@/components/providers/EnquiryProvider';

// Opens the shared enquiry modal, pre-filled for a specific car when `car` is
// passed. Renders as a normal <button> by default, or as an <a> (asLink) so it
// can inherit template styles such as `.btn-custom a` on the pricing table.
export default function EnquireButton({ car = '', children = 'Enquire Now', variant = 'primary', className = '', asLink = false, ariaLabel }) {
  const { openEnquiry } = useEnquiry();

  if (asLink) {
    return (
      <a
        href="#"
        className={className}
        aria-label={ariaLabel}
        onClick={(e) => { e.preventDefault(); openEnquiry(car); }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`btn btn-${variant} ${className}`}
      aria-label={ariaLabel}
      onClick={() => openEnquiry(car)}
    >
      {children}
    </button>
  );
}
