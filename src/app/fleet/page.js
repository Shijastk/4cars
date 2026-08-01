import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import FleetExplorer from '@/components/sections/FleetExplorer';
import Loader from '@/components/ui/Loader';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Our Car Fleet | Rent Economy, SUV & Luxury Cars in Dubai – ${SITE.brand}`,
  description: 'Browse our full fleet of economy, SUV, and luxury rental cars in Dubai & UAE. Filter by type, brand and budget. Transparent all-in pricing with no hidden fees.',
  keywords: ['car fleet Dubai', 'rent SUV Dubai', 'luxury car hire UAE', 'economy car rental Dubai', 'BMW rental Dubai', 'Mercedes rental UAE', 'Audi hire Dubai'],
  alternates: { canonical: `https://${SITE.domain}/fleet` },
  openGraph: { title: 'Our Car Fleet | Economy, SUV & Luxury Rentals in Dubai', description: 'Browse economy, SUV and luxury cars. Transparent pricing, no hidden fees.', url: `https://${SITE.domain}/fleet` },
};

export default function Fleet() {
  return (
    <>
      <PageHero title="Choose Your Car" breadcrumb="Our Fleet" />

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center heading-section ftco-animate">
              <span className="subheading">Our Fleet</span>
              <h2 className="mb-3">Search our cars across the UAE</h2>
              <p style={{ color: '#777' }}>Filter by type, brand and budget. Prices show in your local currency — found your car? Send a quick enquiry and we&apos;ll confirm availability.</p>
            </div>
          </div>

          <Suspense fallback={<p className="text-center py-5">Loading the fleet…</p>}>
            <FleetExplorer />
          </Suspense>
        </div>
      </section>

      <Loader />
    </>
  );
}
