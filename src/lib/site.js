// Central company configuration for RegelDrive (Dubai, UAE).
//
// ⚠️  UPDATE THESE PLACEHOLDER DETAILS with the real business contacts.
export const SITE = {
  brand: 'RegelDrive',
  brandTail: 'Drive',          // the part rendered in the accent colour
  domain: 'regeldrive.com',
  tld: '.com',                 // shown as a muted suffix on the wordmark
  tagline: 'Premium Car Rental in Dubai & across the UAE',
  established: 2014,           // "10+ years on the road" is derived from this

  phone: '0544019068',
  phoneHref: 'tel:+971551981194',
  email: 'info@regeldrive.com',
  address: 'Street No. 13B, Dubai, United Arab Emirates',
  city: 'Dubai',
  country: 'United Arab Emirates',
  hours: 'Open 24 / 7, every day of the year',

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
};

// The wordmark splits into a plain head and an accent-coloured tail
// ("Regel" + "Drive"). Derived once here so the navbar, footer and loader
// can't drift apart.
export const BRAND_HEAD = SITE.brand.slice(0, SITE.brand.length - SITE.brandTail.length);

// How many completed years of operation (kept as a live figure, min 10+).
export function yearsOfExperience(currentYear = 2026) {
  return Math.max(10, currentYear - SITE.established);
}

// A ready-made enquiry message for a specific vehicle (or a general one).
export function enquiryMessage(carName) {
  return carName
    ? `Hi ${SITE.brand}, I'd like to enquire about renting the ${carName}. Could you share availability and rates?`
    : `Hi ${SITE.brand}, I'd like to enquire about renting a car. Could you help me?`;
}
