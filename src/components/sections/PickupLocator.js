'use client';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { PICKUP_LOCATIONS } from '@/lib/pickupLocations';
import { searchPlaces } from '@/lib/geosearch';

const ACCENT = '#e23744';   // brand colour — DriveAway branches
const PICKED = '#1a73e8';   // searched / chosen location

function pinSvg(color) {
  return `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/>
    <circle cx="15" cy="15" r="6" fill="#fff"/>
  </svg>`;
}

function makeIcon(L, color) {
  return L.divIcon({
    className: 'da-loc-pin',
    html: pinSvg(color),
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  });
}

export default function PickupLocator() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const pickedMarkerRef = useRef(null);
  const focusRef = useRef(null);

  // --- Build the map once (Leaflet loaded dynamically so it never runs on the server) ---
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current || containerRef.current._leaflet_id) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const branchIcon = makeIcon(L, ACCENT);
      const bounds = [];
      PICKUP_LOCATIONS.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], { icon: branchIcon }).addTo(map);
        marker.bindPopup(
          `<strong>${loc.name}</strong><br/><span style="color:${ACCENT};font-weight:600">${loc.type}</span><br/>${loc.address}`
        );
        marker.on('click', () => setActiveId(loc.id));
        markersRef.current[loc.id] = marker;
        bounds.push([loc.lat, loc.lng]);
      });
      map.fitBounds(bounds, { padding: [40, 40] });

      focusRef.current = (lat, lng, label, isSearch) => {
        map.flyTo([lat, lng], 12, { duration: 0.8 });
        if (isSearch) {
          if (pickedMarkerRef.current) pickedMarkerRef.current.remove();
          const m = L.marker([lat, lng], { icon: makeIcon(L, PICKED) })
            .addTo(map)
            .bindPopup(`<strong>Pick-up here</strong><br/>${label}`)
            .openPopup();
          pickedMarkerRef.current = m;
        }
      };

      setTimeout(() => { if (!cancelled) map.invalidateSize(); }, 0);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      markersRef.current = {};
      pickedMarkerRef.current = null;
      focusRef.current = null;
    };
  }, []);

  // --- Debounced free search (Photon) ---
  useEffect(() => {
    if (query.trim().length < 3) { setSuggestions([]); setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const items = await searchPlaces(query, controller.signal);
        setSuggestions(items);
        setOpen(true);
      } catch (err) {
        if (err.name !== 'AbortError') setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  function selectSuggestion(s) {
    setQuery(s.label);
    setOpen(false);
    setActiveId(null);
    focusRef.current?.(s.lat, s.lng, s.label, true);
  }

  function selectBranch(loc) {
    setActiveId(loc.id);
    setQuery(loc.name);
    setOpen(false);
    focusRef.current?.(loc.lat, loc.lng, loc.name, false);
    markersRef.current[loc.id]?.openPopup();
  }

  return (
    <section className="ftco-section ftco-no-pt">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 heading-section text-center ftco-animate">
            <span className="subheading">Where to find us</span>
            <h2 className="mb-3">Our pick-up locations</h2>
            <p>Search any address or pick one of our branches — powered by OpenStreetMap, always free.</p>
          </div>
        </div>

        <div className="da-loc row">
          {/* Search + branch list */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="da-loc-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search a city, airport or address…"
                value={query}
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length && setOpen(true)}
              />
              {loading && <span className="da-loc-spin">Searching…</span>}
              {open && suggestions.length > 0 && (
                <ul className="da-loc-suggest">
                  {suggestions.map((s) => (
                    <li key={s.id} onMouseDown={() => selectSuggestion(s)}>
                      <span className="da-loc-dot" style={{ background: PICKED }} />
                      {s.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="da-loc-count">{PICKUP_LOCATIONS.length} branches near you</p>
            <ul className="da-loc-branches">
              {PICKUP_LOCATIONS.map((loc) => (
                <li
                  key={loc.id}
                  className={activeId === loc.id ? 'is-active' : ''}
                  onClick={() => selectBranch(loc)}
                >
                  <span className="da-loc-dot" style={{ background: ACCENT }} />
                  <span className="da-loc-branch-text">
                    <strong>{loc.name}</strong>
                    <small>{loc.type} · {loc.address}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="col-lg-7">
            <div ref={containerRef} className="da-loc-map" />
          </div>
        </div>
      </div>

      <style>{`
        .da-loc-search { position: relative; }
        .da-loc-spin {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          font-size: 12px; color: #888;
        }
        .da-loc-suggest {
          list-style: none; margin: 6px 0 0; padding: 6px 0;
          position: absolute; z-index: 1200; left: 0; right: 0;
          background: #fff; border: 1px solid #e6e6e6; border-radius: 6px;
          box-shadow: 0 12px 30px rgba(0,0,0,.12); max-height: 280px; overflow-y: auto;
        }
        .da-loc-suggest li {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; cursor: pointer; font-size: 14px; color: #333;
        }
        .da-loc-suggest li:hover { background: #f7f7f7; }
        .da-loc-count { margin: 22px 0 10px; font-size: 12px; letter-spacing: .1em;
          text-transform: uppercase; color: #999; font-weight: 600; }
        .da-loc-branches { list-style: none; margin: 0; padding: 0;
          max-height: 360px; overflow-y: auto; }
        .da-loc-branches li {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 14px; cursor: pointer; border: 1px solid #eee;
          border-radius: 8px; margin-bottom: 8px; transition: border-color .15s, background .15s;
        }
        .da-loc-branches li:hover { border-color: ${ACCENT}; background: #fff7f8; }
        .da-loc-branches li.is-active { border-color: ${ACCENT}; background: #fff2f4; }
        .da-loc-branch-text { display: flex; flex-direction: column; line-height: 1.35; }
        .da-loc-branch-text strong { color: #222; font-weight: 600; font-size: 15px; }
        .da-loc-branch-text small { color: #777; font-size: 12.5px; }
        .da-loc-dot { flex: 0 0 auto; width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; }
        .da-loc-map {
          width: 100%; height: 480px; border-radius: 10px; overflow: hidden;
          border: 1px solid #e6e6e6; z-index: 0;
        }
        @media (max-width: 991px) { .da-loc-map { height: 360px; } }
      `}</style>
    </section>
  );
}
