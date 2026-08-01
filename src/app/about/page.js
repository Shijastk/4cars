import PageHero from '@/components/ui/PageHero';
import ServiceCard from '@/components/sections/ServiceCard';
import HowItWorks from '@/components/sections/HowItWorks';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `About ${SITE.brand} | 10+ Years Car Rental in Dubai & UAE`,
  description: `Learn about ${SITE.brand} — Dubai’s trusted car rental company since ${SITE.established}. 24/7 support, UAE-wide branches, transparent pricing and a fleet for every trip.`,
  keywords: ['about RegelDrive', 'car rental company Dubai', 'trusted car hire UAE', 'Dubai car rental history'],
  alternates: { canonical: `https://${SITE.domain}/about` },
  openGraph: { title: `About ${SITE.brand} | Car Rental Dubai`, description: `Trusted Dubai car rental since ${SITE.established}. 24/7 support, UAE-wide branches.`, url: `https://${SITE.domain}/about` },
};

const services = [
  { icon: 'flaticon-placeholder', title: '24/7 Road Support', text: 'A flat tyre at midnight? Our support line is staffed around the clock, every day of the year.' },
  { icon: 'flaticon-placeholder', title: 'Branches Across the UAE', text: 'Pick up and drop off in Dubai, Abu Dhabi and Sharjah — including DXB, AUH and SHJ airports.' },
  { icon: 'flaticon-placeholder', title: 'Quick Enquiry', text: 'Message us and we confirm availability and your all-in rate, usually within the hour.' },
  { icon: 'flaticon-placeholder', title: 'A Car For Every Trip', text: 'From economical city cars to seven-seat SUVs and luxury saloons — a vehicle for every plan and budget.' },
];

export default function About() {
  return (
    <>
      <PageHero title="About Us" breadcrumb="About us" />

      <section className="ftco-section services-section">
        <div className="container">
          <div className="row justify-content-center">
            <SectionHeading sub="Our Services" title="Our Services" />
          </div>
          <div className="row d-flex">
            {services.map(s => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(/images/about.jpg)' }}></div>
            <div className="col-md-6 wrap-about py-md-5 ftco-animate">
              <div className="heading-section mb-5 pl-md-5">
                <span className="subheading">About us</span>
                <h2 className="mb-4">10+ Years On The Road With You</h2>
                <p>Founded in {SITE.established} and headquartered in Dubai, {SITE.brand} brings 10+ years of experience to car rental across the United Arab Emirates. What started as a single branch has grown into a trusted UAE-wide service — and more than a decade later we are still helping residents and visitors get on the road without the usual rental hassle. Every car in our fleet is serviced, sanitised and safety-checked before it reaches you.</p>
                <p>Over 10+ years we have built our reputation on transparent, all-in pricing, a hassle-free enquiry you can complete on your phone in minutes, and a support team that actually picks up — the same promise we made in {SITE.established}, kept every day since.</p>
                <Button href="/fleet">Explore Our Fleet</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Loader />
    </>
  );
}
