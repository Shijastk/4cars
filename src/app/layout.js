import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScriptLoader from '@/components/layout/ScriptLoader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';
import { EnquiryProvider } from '@/components/providers/EnquiryProvider';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `${SITE.brand} – Car Rental in Dubai & across the UAE`,
  description: `${SITE.tagline}. 10+ years renting well-kept cars with transparent, all-in rates and 24/7 support.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
