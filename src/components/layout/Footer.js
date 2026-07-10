import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">About {SITE.brand}</h2>
              <p>{SITE.brand} makes car rental in Dubai and across the UAE simple, transparent and affordable. 10+ years on the road — send an enquiry and drive away.</p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li className="ftco-animate"><a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer"><span className="icon-twitter"></span></a></li>
                <li className="ftco-animate"><a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer"><span className="icon-facebook"></span></a></li>
                <li className="ftco-animate"><a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"><span className="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Explore</h2>
              <ul className="list-unstyled">
                <li><Link href="/about" className="py-2 d-block">About us</Link></li>
                <li><Link href="/fleet" className="py-2 d-block">Our Fleet</Link></li>
                <li><Link href="/pricing" className="py-2 d-block">Pricing</Link></li>
                <li><Link href="/contact" className="py-2 d-block">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Our Emirates</h2>
              <ul className="list-unstyled">
                {['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ras Al Khaimah'].map(item => (
                  <li key={item}><Link href="/contact" className="py-2 d-block">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Have a Question?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li><span className="icon icon-map-marker"></span><span className="text">{SITE.address}</span></li>
                  <li><a href={SITE.phoneHref}><span className="icon icon-phone"></span><span className="text">{SITE.phone}</span></a></li>
                  <li><a href={`mailto:${SITE.email}`}><span className="icon icon-envelope"></span><span className="text">{SITE.email}</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Copyright &copy; {new Date().getFullYear()} {SITE.brand}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
