import PageHero from '@/components/ui/PageHero';
import Loader from '@/components/ui/Loader';
import PickupLocator from '@/components/sections/PickupLocator';
import ContactForm from '@/components/sections/ContactForm';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Contact Us | Car Rental Dubai – ${SITE.brand}`,
  description: `Contact ${SITE.brand} for car rental enquiries in Dubai & UAE. Call, email or message us — we respond within the hour. Pickup locations across Dubai, Abu Dhabi & Sharjah.`,
  keywords: ['contact car rental Dubai', 'car hire enquiry UAE', 'Dubai car rental phone', 'car rental Sharjah contact'],
  alternates: { canonical: `https://${SITE.domain}/contact` },
  openGraph: { title: `Contact ${SITE.brand} | Car Rental Dubai`, description: 'Get in touch for car rental enquiries. We respond within the hour.', url: `https://${SITE.domain}/contact` },
};

const contactInfo = [
  { icon: 'icon-map-o', label: 'Address', value: SITE.address },
  { icon: 'icon-mobile-phone', label: 'Phone', value: SITE.phone, href: SITE.phoneHref },
  { icon: 'icon-envelope-o', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
];

export default function Contact() {
  return (
    <>
      <PageHero title="Contact us" breadcrumb="Contact" />

      <section className="ftco-section contact-section w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6"> 
          {/* Added px-4 to prevent touching screen edges on mobile */}
          
          <div className="row d-flex mb-5 contact-info justify-content-center">
            <div className="col-md-8">
              <div className="row mb-5">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <div key={label} className="col-md-4 text-center py-4 px-2">
                    <div className="icon"><span className={icon}></span></div>
                    <p className="break-words"> {/* Added break-words to handle long strings */}
                      <span className="block font-bold">{label}:</span>
                      {href ? <a href={href} className="break-all">{value}</a> : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row block-9 justify-content-center mb-5">
            <div className="col-md-8 mb-md-5">
              <h2 className="text-center px-2">Have a question about a car? <br />Send us a message and we&apos;ll get back to you</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <PickupLocator />
      <Loader />
    </>
  );
}
