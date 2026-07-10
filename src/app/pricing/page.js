import PageHero from '@/components/ui/PageHero';
import Loader from '@/components/ui/Loader';
import Price from '@/components/ui/Price';
import EnquireButton from '@/components/sections/EnquireButton';
import { CARS } from '@/lib/cars';
import { SITE } from '@/lib/site';

export const metadata = { title: `Pricing – ${SITE.brand} Dubai` };

// Rates derived from each car's daily USD base — converted to the visitor's
// currency at display time. Hourly ≈ 1/6 of daily; monthly includes a discount.
const pricingCars = CARS.filter((c) => c.featured).slice(0, 6).map((c) => ({
  ...c,
  hourlyUsd: Math.round(c.priceUsd / 6),
  dailyUsd: c.priceUsd,
  monthlyUsd: Math.round(c.priceUsd * 22),
}));

function PriceCell({ amountUsd, period }) {
  return (
    <td className="price">
      <p className="btn-custom"><EnquireButton asLink>Enquire</EnquireButton></p>
      <div className="price-rate">
        <h3><span className="num"><Price usd={amountUsd} /></span><span className="per">/{period}</span></h3>
        <span className="subheading">All-in rate · no hidden fees</span>
      </div>
    </td>
  );
}

export default function Pricing() {
  return (
    <>
      <PageHero title="Car Rates Pricing" breadcrumb="Pricing" />

      <section className="ftco-section ftco-cart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ftco-animate">
              <div className="car-list">
                <table className="table">
                  <thead className="thead-primary">
                    <tr className="text-center">
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                      <th className="bg-primary heading">Per Hour Rate</th>
                      <th className="bg-dark heading">Per Day Rate</th>
                      <th className="bg-black heading">Leasing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingCars.map((car) => (
                      <tr key={car.id}>
                        <td className="car-image"><div className="img" style={{ backgroundImage: `url(/images/${car.img})` }}></div></td>
                        <td className="product-name">
                          <h3>{car.name}</h3>
                          <p className="mb-0 rated">
                            <span>rated:</span>
                            {[...Array(5)].map((_, i) => <span key={i} className="ion-ios-star"></span>)}
                          </p>
                        </td>
                        <PriceCell amountUsd={car.hourlyUsd} period="per hour" />
                        <PriceCell amountUsd={car.dailyUsd} period="per day" />
                        <PriceCell amountUsd={car.monthlyUsd} period="per month" />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Loader />
    </>
  );
}
