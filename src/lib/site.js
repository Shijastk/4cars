// Central company configuration for DriveAway (Dubai, UAE).
//
// ⚠️  UPDATE THESE PLACEHOLDER DETAILS with the real business contacts.
//     `whatsapp` must be digits only — no "+", spaces or dashes.
export const SITE = {
  brand: 'DriveAway',
  brandTail: 'Away',           // the part rendered in the accent colour
  tagline: 'Premium Car Rental in Dubai & across the UAE',
  established: 2014,           // "10+ years on the road" is derived from this

  phone: '+971 4 123 4567',
  phoneHref: 'tel:+97141234567',
  whatsapp: '971501234567',    // digits only, international format, no leading +
  email: 'hello@driveaway.ae',
  address: 'Sheikh Zayed Road, Business Bay, Dubai, United Arab Emirates',
  city: 'Dubai',
  country: 'United Arab Emirates',
  hours: 'Open 24 / 7, every day of the year',

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
};

// How many completed years of operation (kept as a live figure, min 10+).
export function yearsOfExperience(currentYear = 2026) {
  return Math.max(10, currentYear - SITE.established);
}

// Build a WhatsApp "click to chat" deep link with a pre-filled message.
export function whatsappLink(message = '') {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// A ready-made enquiry message for a specific vehicle (or a general one).
export function enquiryMessage(carName) {
  return carName
    ? `Hi ${SITE.brand}, I'd like to enquire about renting the ${carName}. Could you share availability and rates?`
    : `Hi ${SITE.brand}, I'd like to enquire about renting a car. Could you help me?`;
}
