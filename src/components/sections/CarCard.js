import Price from '../ui/Price';
import EnquireButton from './EnquireButton';

// Modern fleet card — rounded, image-forward layout mirroring the site's hero /
// category-card visual language: full-bleed photo, title + category pill, a
// clean icon row of the car's specs, and a price + circular arrow footer.
//
// Only data that already lives on the car (name, type, seats, doors,
// transmission, fuel, priceUsd) is shown; nothing is invented. The single arrow
// opens the shared enquiry modal.
export default function CarCard({ car }) {
  const { img, name, type, seats, doors, transmission, fuel, priceUsd } = car;

  const specs = [
    { key: 'seats', label: String(seats).padStart(2, '0'), title: `${seats} seats`, icon: SeatIcon },
    { key: 'doors', label: String(doors).padStart(2, '0'), title: `${doors} doors`, icon: DoorIcon },
    { key: 'transmission', label: transmission, title: `${transmission} transmission`, icon: GearIcon },
    { key: 'fuel', label: fuel, title: `${fuel} engine`, icon: FuelIcon },
  ];

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <article className="car-card h-100">
        <div className="car-card__media">
          <img className="car-card__img" src={`/images/${img}`} alt={name} loading="lazy" />
        </div>

        <div className="car-card__body">
          <div className="car-card__head">
            <h3 className="car-card__title">{name}</h3>
            <span className="car-card__pill">{type}</span>
          </div>

          <ul className="car-card__specs">
            {specs.map(({ key, label, title, icon: Icon }) => (
              <li key={key} className="car-card__spec" title={title}>
                <Icon />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="car-card__foot">
            <p className="car-card__price">
              <span className="car-card__price-value"><Price usd={priceUsd} /></span>
              <span className="car-card__price-label">/Per Day</span>
            </p>
            <EnquireButton
              car={name}
              asLink
              className="car-card__arrow"
              ariaLabel={`Enquire about the ${name}`}
            >
              <ArrowIcon />
            </EnquireButton>
          </div>
        </div>
      </article>
    </div>
  );
}

/* --- Inline line icons (stroke = currentColor), matching the reference's thin,
   monochrome spec glyphs and the CategoryCard's inline-SVG approach. --------- */
const svgProps = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true, focusable: false,
};

function SeatIcon() {
  return (
    <svg {...svgProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg {...svgProps}>
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg {...svgProps}>
      <line x1="3" y1="22" x2="15" y2="22" />
      <line x1="4" y1="9" x2="14" y2="9" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}
