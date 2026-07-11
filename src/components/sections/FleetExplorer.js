'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CARS, CAR_TYPES, CAR_BRANDS, BUDGET_BUCKETS, filterCars } from '@/lib/cars';
import CarCard from './CarCard';

const PER_PAGE = 6;

// Full fleet browser: live text + dropdown filters and working pagination.
// Initial filters come from the URL (?type=&brand=&budget=&q=) so the hero
// "Find your car" widget deep-links straight into a filtered result set.
export default function FleetExplorer() {
  const params = useSearchParams();
  const [q, setQ] = useState('');
  const [type, setType] = useState(params.get('type') || '');
  const [brand, setBrand] = useState(params.get('brand') || '');
  const [budget, setBudget] = useState(params.get('budget') || '');
  const [page, setPage] = useState(1);

  const results = useMemo(
    () => filterCars({ q, type, brand, budget }),
    [q, type, brand, budget]
  );

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  // Any filter change resets to the first page.
  function update(setter) {
    return (value) => { setter(value); setPage(1); };
  }

  function reset() {
    setQ(''); setType(''); setBrand(''); setBudget(''); setPage(1);
  }

  return (
    <>
      {/* Filter bar */}
      {/* <div className="search-wrap-1 ftco-animate mb-5">
        <form className="search-property-1" onSubmit={(e) => e.preventDefault()}>
          <div className="row align-items-end">
            <div className="col-lg">
              <div className="form-group">
                <label>Search</label>
                <div className="form-field">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Model, brand…"
                    value={q}
                    onChange={(e) => update(setQ)(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label>Type</label>
                <div className="form-field"><div className="select-wrap">
                  <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                  <select className="form-control" value={type} onChange={(e) => update(setType)(e.target.value)}>
                    <option value="">All types</option>
                    {CAR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div></div>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label>Brand</label>
                <div className="form-field"><div className="select-wrap">
                  <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                  <select className="form-control" value={brand} onChange={(e) => update(setBrand)(e.target.value)}>
                    <option value="">All brands</option>
                    {CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div></div>
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label>Budget</label>
                <div className="form-field"><div className="select-wrap">
                  <div className="icon"><span className="ion-ios-arrow-down"></span></div>
                  <select className="form-control" value={budget} onChange={(e) => update(setBudget)(e.target.value)}>
                    <option value="">Any budget</option>
                    {BUDGET_BUCKETS.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
                  </select>
                </div></div>
              </div>
            </div>
          </div>
        </form>
      </div> */}

      {/* Result count */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
        <p className="mb-0" style={{ color: '#777' }}>
          Showing <strong>{results.length ? (current - 1) * PER_PAGE + 1 : 0}–{(current - 1) * PER_PAGE + visible.length}</strong> of <strong>{results.length}</strong> vehicles
        </p>
        {(q || type || brand || budget) && (
          <button type="button" className="btn btn-black btn-outline-black" onClick={reset}>Clear filters</button>
        )}
      </div>

      {/* Results grid */}
      {visible.length > 0 ? (
        <div className="row">
          {visible.map((c) => <CarCard key={c.id} car={c} />)}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3 className="mb-2">No cars match those filters</h3>
          <p style={{ color: '#777' }}>Try widening your budget or clearing a filter.</p>
          <button type="button" className="btn btn-primary" onClick={reset}>Show all cars</button>
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="row mt-5">
          <div className="col text-center">
            <div className="block-27">
              <ul>
                <li className={current === 1 ? 'disabled' : ''}>
                  <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous page">&lt;</button>
                </li>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <li key={n} className={n === current ? 'active' : ''}>
                    {n === current ? <span>{n}</span> : <button type="button" onClick={() => setPage(n)}>{n}</button>}
                  </li>
                ))}
                <li className={current === pageCount ? 'disabled' : ''}>
                  <button type="button" onClick={() => setPage((p) => Math.min(pageCount, p + 1))} aria-label="Next page">&gt;</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .block-27 ul li button {
          background: #fff; border: 1px solid rgba(0,0,0,.1); cursor: pointer;
          font-size: 14px; width: 40px; height: 40px; line-height: 38px; color: #2f2f2f;
          padding: 0;
        }
        .block-27 ul li button:hover { background: var(--color-brand, #ee0b0d); color: #fff; border-color: var(--color-brand, #ee0b0d); }
        .block-27 ul li.active span {
          background: var(--color-brand, #ee0b0d); color: #fff; border-color: var(--color-brand, #ee0b0d);
        }
        .block-27 ul li.disabled button { opacity: .4; cursor: not-allowed; }
        .block-27 ul li.disabled button:hover { background: #fff; color: #2f2f2f; border-color: rgba(0,0,0,.1); }
      `}</style>
    </>
  );
}
