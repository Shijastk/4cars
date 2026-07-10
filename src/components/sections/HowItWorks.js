import ServiceCard from './ServiceCard';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  { icon: 'flaticon-rent', title: 'Choose A Car', text: 'Browse the fleet and compare models, specs and prices in your local currency.' },
  { icon: 'flaticon-online-booking', title: 'Send An Enquiry', text: 'Email or call us with your dates — no accounts, no paperwork.' },
  { icon: 'flaticon-select', title: 'We Confirm', text: 'We check availability and send your all-in rate, usually within the hour.' },
  { icon: 'flaticon-review', title: 'Enjoy The Ride', text: "Pick up in Dubai, Abu Dhabi or Sharjah and hit the road — we've handled the rest." },
];

export default function HowItWorks() {
  return (
    <section className="ftco-section services-section img" style={{ backgroundImage: 'url(/images/bg_2.jpg)' }}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <SectionHeading sub="Work flow" title="How it works" white />
        </div>
        <div className="row">
          {steps.map(s => <ServiceCard key={s.title} {...s} dark />)}
        </div>
      </div>
    </section>
  );
}
