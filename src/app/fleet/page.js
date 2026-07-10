import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import FleetExplorer from '@/components/sections/FleetExplorer';
import Loader from '@/components/ui/Loader';
import { SITE } from '@/lib/site';

export const metadata = { title: `Our Fleet – ${SITE.brand} Dubai` };

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
