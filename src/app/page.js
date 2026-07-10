import HeroModern from '@/components/sections/HeroModern';
import CategoryCard from '@/components/sections/CategoryCard';
import CarCard from '@/components/sections/CarCard';
import HowItWorks from '@/components/sections/HowItWorks';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import CtaSection from '@/components/sections/CtaSection';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { CARS } from '@/lib/cars';
import { SITE } from '@/lib/site';

export const metadata = { title: `${SITE.brand} – Car Rental in Dubai & across the UAE` };

// Trip-type gateways into the fleet. Images are placeholders drawn from the
// existing fleet gallery — swap `image` for dedicated lifestyle shots when
// available. Each `href` deep-links into the fleet filter (?type=/?budget=)
// so the card lands the visitor on a curated, non-empty result set.
const categories = [
  { title: 'Business Trip',   image: 'car-4.jpg',  href: '/fleet?type=Luxury',   desc: 'Executive sedans and luxury saloons for meetings, airport runs and client drives.' },
  { title: 'Family Vacation', image: 'car-11.jpg', href: '/fleet?type=SUV',      desc: 'Spacious seven-seat SUVs with room for everyone and all the luggage.' },
  { title: 'Adventure Trip',  image: 'car-9.jpg',  href: '/fleet?type=SUV',      desc: 'Rugged 4x4s built for dunes, mountain roads and off-the-map getaways.' },
  { title: 'Wedding',         image: 'car-5.jpg',  href: '/fleet?budget=luxury', desc: 'Elegant, photo-ready cars to arrive in style on your big day.' },
];

// Six featured cars fill two clean rows of the 3-up grid; the rest live behind
// the "View the full fleet" button.
const featured = CARS.filter((c) => c.featured).slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero — sticky background; content lifts + fades on scroll */}
      <HeroModern />

      {/* Everything below rides up over the pinned hero as one opaque sheet */}
      <div className="page-panel">
      {/* Explore car categories — trip-type gateways into the fleet */}
      <section className="ftco-section ftco-no-pt mt-25 categories-section">
        <div className="container">
          <div className="row justify-content-center">
            <SectionHeading
              sub={`Why ${SITE.brand}`}
              title="Explore Our Car Categories"
              text="Find the perfect car for your trip — whether it's city cruising, family adventures, or luxury travel."
            />
          </div>
          <div className="row">
            {categories.map(c => <CategoryCard key={c.title} {...c} />)}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="ftco-section" style={{ background: '#F0F5FA' }}>
        <div className="container">
          <div className="row justify-content-center">
            <SectionHeading sub="Our Fleet" title="Choose Your Car" />
          </div>
          <div className="row">
            {featured.map(c => <CarCard key={c.id} car={c} />)}
          </div>
          <div className="row justify-content-center mt-4">
            <Button href="/fleet" className="py-3 px-5">View the full fleet</Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialSlider />

      {/* About snippet */}
      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(/images/about.jpg)' }}></div>
            <div className="col-md-6 wrap-about py-md-5 ftco-animate">
              <div className="heading-section mb-5 pl-md-5">
                <span className="subheading">About us</span>
                <h2 className="mb-4">10+ Years On The Road With You</h2>
                <p>Founded in {SITE.established} and based in Dubai, {SITE.brand} brings 10+ years of experience to car rental across the Emirates. What began with a single branch is now a trusted UAE-wide service, still helping residents and visitors get on the road without the usual rental hassle.</p>
                <p>Every car is serviced, cleaned and safety-checked before it reaches you — backed by transparent, all-in pricing and a support team that actually picks up.</p>
                <Button href="/fleet">Explore Our Fleet</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <CtaSection />
      </div>

      <Loader />
    </>
  );
}
