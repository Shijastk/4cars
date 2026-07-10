// Single source of truth for the DriveAway fleet.
//
// Prices are stored ONCE, in USD, as the base currency. Every price shown in
// the UI is converted to the visitor's local currency at display time
// (see src/lib/currency.js + <Price/>). Never hard-code a currency symbol
// alongside these numbers.
// Card images are transparent PNG renders in /public/images/cars, shown on the
// flat #F2F2F2 panel via object-fit: contain. Sedans without a dedicated render
// fall back to the generic `sedan.png`; Nissan Patrol and Land Cruiser reuse
// `rangerover.png` as an SUV placeholder until dedicated renders are supplied.
// Filenames are case-sensitive in production — keep the exact casing below.
export const CARS = [
  { id: 'toyota-corolla',   img: 'cars/Corolla.png',    name: 'Toyota Corolla',       brand: 'Toyota',     type: 'Sedan',    seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 45,  featured: true,  rating: 5 },
  { id: 'nissan-altima',    img: 'cars/sedan.png',      name: 'Nissan Altima',        brand: 'Nissan',     type: 'Sedan',    seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 48,  featured: true,  rating: 5 },
  { id: 'hyundai-elantra',  img: 'cars/sedan.png',      name: 'Hyundai Elantra',      brand: 'Hyundai',    type: 'Sedan',    seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 42,  featured: true,  rating: 4 },
  { id: 'mercedes-c-class', img: 'cars/Mercedes.png',   name: 'Mercedes C-Class',     brand: 'Mercedes',   type: 'Luxury',   seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 89,  featured: true,  rating: 5 },
  { id: 'bmw-3-series',     img: 'cars/bmw.png',        name: 'BMW 3 Series',         brand: 'BMW',        type: 'Luxury',   seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 92,  featured: true,  rating: 5 },
  { id: 'vw-golf',          img: 'cars/Volkswagen.png', name: 'Volkswagen Golf',      brand: 'Volkswagen', type: 'Hatchback',seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 44,  featured: true,  rating: 4 },
  { id: 'chevrolet-malibu', img: 'cars/sedan.png',      name: 'Chevrolet Malibu',     brand: 'Chevrolet',  type: 'Sedan',    seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 52,  featured: true,  rating: 4 },
  { id: 'audi-a4',          img: 'cars/audi.png',       name: 'Audi A4',              brand: 'Audi',       type: 'Luxury',   seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 85,  featured: true,  rating: 5 },
  { id: 'nissan-patrol',    img: 'cars/rangerover.png', name: 'Nissan Patrol',        brand: 'Nissan',     type: 'SUV',      seats: 7, doors: 5, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 130, featured: false, rating: 5 },
  { id: 'tesla-model-3',    img: 'cars/sedan.png',      name: 'Tesla Model 3',        brand: 'Tesla',      type: 'Electric', seats: 5, doors: 4, transmission: 'Automatic', fuel: 'Electric', priceUsd: 110, featured: false, rating: 5 },
  { id: 'land-cruiser',     img: 'cars/rangerover.png', name: 'Toyota Land Cruiser',  brand: 'Toyota',     type: 'SUV',      seats: 7, doors: 5, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 140, featured: false, rating: 5 },
  { id: 'range-rover',      img: 'cars/rangerover.png', name: 'Range Rover Sport',    brand: 'Land Rover', type: 'Luxury',   seats: 5, doors: 5, transmission: 'Automatic', fuel: 'Petrol',   priceUsd: 175, featured: false, rating: 5 },
];

// Distinct, sorted option lists for the search / filter widgets.
export const CAR_TYPES  = [...new Set(CARS.map((c) => c.type))].sort();
export const CAR_BRANDS = [...new Set(CARS.map((c) => c.brand))].sort();

// Budget buckets (in USD) used by the "Find a car" widget. Currency-independent
// keys so they survive in the URL; labels are formatted per-currency in the UI.
export const BUDGET_BUCKETS = [
  { key: 'economy', label: 'Economy',  maxUsd: 60 },
  { key: 'premium', label: 'Premium',  minUsd: 60, maxUsd: 110 },
  { key: 'luxury',  label: 'Luxury',   minUsd: 110 },
];

export function budgetMatches(car, key) {
  const b = BUDGET_BUCKETS.find((x) => x.key === key);
  if (!b) return true;
  if (b.minUsd != null && car.priceUsd < b.minUsd) return false;
  if (b.maxUsd != null && car.priceUsd >= b.maxUsd) return false;
  return true;
}

// Filter the fleet by any combination of query params. Empty / missing filters
// are ignored, so passing `{}` returns the whole fleet.
export function filterCars({ q = '', type = '', brand = '', budget = '' } = {}) {
  const needle = q.trim().toLowerCase();
  return CARS.filter((car) => {
    if (type && car.type !== type) return false;
    if (brand && car.brand !== brand) return false;
    if (budget && !budgetMatches(car, budget)) return false;
    if (needle && !`${car.name} ${car.brand} ${car.type}`.toLowerCase().includes(needle)) return false;
    return true;
  });
}
