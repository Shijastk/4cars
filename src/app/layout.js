import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScriptLoader from '@/components/layout/ScriptLoader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';
import { EnquiryProvider } from '@/components/providers/EnquiryProvider';
import { SITE } from '@/lib/site';

const BASE_URL = `https://${SITE.domain}`;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE.brand} – Car Rental in Dubai & UAE | Affordable & Luxury Cars`,
    template: `%s | ${SITE.brand}`,
  },
  description: `${SITE.tagline}. Rent economy, SUV and luxury cars in Dubai, Abu Dhabi & Sharjah. Transparent all-in pricing, 24/7 support, airport pickup. Book online today.`,
  keywords: [
    'car rental Dubai', 'rent a car Dubai', 'car hire Dubai', 'cheap car rental Dubai',
    'luxury car rental Dubai', 'SUV rental Dubai', 'car rental UAE', 'rent a car UAE',
    'car rental Abu Dhabi', 'car rental Sharjah', 'airport car rental Dubai',
    'DXB car rental', 'monthly car rental Dubai', 'daily car rental Dubai',
    'affordable car hire UAE', 'RegelDrive', 'car rental near me Dubai',
  ],
  authors: [{ name: SITE.brand, url: BASE_URL }],
  creator: SITE.brand,
  publisher: SITE.brand,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: BASE_URL,
    siteName: SITE.brand,
    title: `${SITE.brand} – Car Rental in Dubai & UAE`,
    description: `Rent economy, SUV and luxury cars across the UAE. Transparent pricing, 24/7 support, airport pickup.`,
    images: [{ url: '/images/bg_1.jpg', width: 1200, height: 630, alt: `${SITE.brand} car rental Dubai` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.brand} – Car Rental in Dubai & UAE`,
    description: `Rent economy, SUV and luxury cars across the UAE. Transparent pricing, 24/7 support, airport pickup.`,
    images: ['/images/bg_1.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CarRental',
            name: SITE.brand,
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            telephone: SITE.phone,
            email: SITE.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: SITE.address,
              addressLocality: SITE.city,
              addressCountry: 'AE',
            },
            openingHours: 'Mo-Su 00:00-23:59',
            priceRange: '$$',
            areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'United Arab Emirates'],
            sameAs: Object.values(SITE.social),
          }) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ScriptLoader can only start fetching after React hydrates. These hints let
          * the browser pull the first (dependency-gating) wave during HTML parse
          * instead, so jQuery/Popper/AOS are warm by the time the effect runs. */}
        <link rel="preload" as="script" href="/js/jquery.min.js" />
        <link rel="preload" as="script" href="/js/popper.min.js" />
        <link rel="preload" as="script" href="/js/aos.js" />

        <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/ionicons.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="/css/jquery.timepicker.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        <CurrencyProvider>
          <EnquiryProvider>
            <Navbar />
            {children}
            <Footer />
          </EnquiryProvider>
        </CurrencyProvider>
        <SmoothScroll />
        <ScriptLoader />
      </body>
    </html>
  );
}
