import { SITE } from '@/lib/site';

// Forward-pointing arrow — matches the reference's "→" button glyphs. (The hero
// pills use a diagonal ↗; this CTA deliberately uses a straight arrow that
// nudges right on hover, per the design.)
function ArrowRight() {
  return (
    <svg
      className="cta-btn__arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Full-width call-to-action that closes the home page: a vibrant purple card
// with a subtle grid overlay for depth, headline + supporting copy and two pill
// buttons on the left, and a luxury car image bleeding past the card's edge on
// the right. Reuses the hero/category rounded-card + Poppins visual language.
//
// The car is a transparent-background PNG cut-out (`/images/cars/ctacar.png`),
// so `.cta-card__car` carries no card frame — just a soft `drop-shadow` that
// hugs the silhouette while the layout lets it overlap the card edge.
export default function CtaSection() {
  return (
    <section className="ftco-section cta-section">
      <div className="container">
        <div className="cta-card">
          <span className="cta-card__grid" aria-hidden="true"></span>

          <div className="cta-card__content">
            <h2 className="cta-card__title">
              Your Next Drive
              <br />
              Awaits.
            </h2>
            <p className="cta-card__text">
              Step into comfort, confidence, and class — {SITE.brand} brings the
              open road to your doorstep.
            </p>
            <div className="cta-card__actions">
              <a href="/contact" className="cta-btn cta-btn--solid">
                Start Your Journey <ArrowRight />
              </a>
              <a href="/fleet" className="cta-btn cta-btn--ghost">
                View All Cars <ArrowRight />
              </a>
            </div>
          </div>

          <div className="cta-card__media" aria-hidden="true">
            <img src="/images/cars/ctacar.png" alt="" className="cta-card__car" />
          </div>
        </div>
      </div>
    </section>
  );
}
