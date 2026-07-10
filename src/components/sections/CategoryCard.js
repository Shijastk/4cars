// Explore Our Car Categories — an imagery-first "gateway" card.
//
// Visually it mirrors the hero's language: a rounded, full-bleed image with a
// bottom gradient, an overlaid title and a circular arrow badge (the same ↗
// glyph as the hero pills). Each card is a single anchor that deep-links into
// the fleet, pre-filtered to the vehicles that suit that kind of trip.
export default function CategoryCard({ title, image, href, desc }) {
  return (
    <div className="col-sm-6 col-lg-3 d-flex align-self-stretch ftco-animate mb-4">
      <a
        href={href}
        className="category-card w-100"
        style={{ backgroundImage: `url(/images/${image})` }}
        aria-label={`Explore cars for ${title}`}
      >
        <span className="category-card__overlay" aria-hidden="true"></span>
        <span className="category-card__body">
          <span className="category-card__text">
            <span className="category-card__title">{title}</span>
            {/* {desc && <span className="category-card__desc">{desc}</span>} */}
          </span>
          <span className="category-card__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </span>
      </a>
    </div>
  );
}
