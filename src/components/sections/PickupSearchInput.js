'use client';
import { useEffect, useRef, useState } from 'react';
import { PICKUP_LOCATIONS } from '@/lib/pickupLocations';
import { searchPlaces } from '@/lib/geosearch';

// Location picker for the booking widget. Focusing the field lists all our UAE
// branches straight away; typing filters them and blends in free Photon place
// search (no API key needed).
export default function PickupSearchInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);

  // Branches to show: all of them when the field is empty, else name/address matches.
  const q = query.trim().toLowerCase();
  const branchMatches = q.length
    ? PICKUP_LOCATIONS.filter((l) =>
        `${l.name} ${l.address} ${l.type}`.toLowerCase().includes(q)
      )
    : PICKUP_LOCATIONS;

  useEffect(() => {
    if (query.trim().length < 3) { setSuggestions([]); setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        setSuggestions(await searchPlaces(query, controller.signal));
        setOpen(true);
      } catch (err) {
        if (err.name !== 'AbortError') setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  // Close the dropdown on outside click.
  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(label) {
    setQuery(label);
    setOpen(false);
  }

  const showBranchHeading = q.length === 0 && branchMatches.length > 0;
  const showDropdown = open && (branchMatches.length > 0 || suggestions.length > 0);

  return (
    <div className="form-group da-pick" ref={wrapRef}>
      <label className="label">Pick-up location</label>
      <input
        type="text"
        name="pickup"
        className="form-control"
        placeholder="City, Airport, Station, etc"
        value={query}
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
      />
      {loading && <span className="da-pick-spin">…</span>}

      {showDropdown && (
        <ul className="da-pick-suggest">
          {showBranchHeading && <li className="da-pick-head">Our UAE branches</li>}
          {branchMatches.map((l) => (
            <li key={l.id} className="da-pick-branch" onMouseDown={() => pick(l.name)}>
              <span className="da-pick-tag">Branch</span>
              <span className="da-pick-branch-text">
                <strong>{l.name}</strong>
                <small>{l.type} · {l.address}</small>
              </span>
            </li>
          ))}
          {suggestions.map((s) => (
            <li key={s.id} className="da-pick-place" onMouseDown={() => pick(s.label)}>{s.label}</li>
          ))}
        </ul>
      )}

      <style>{`
        .da-pick { position: relative; }
        .da-pick-spin { position: absolute; right: 16px; bottom: 16px; color: #bbb; }
        .da-pick-suggest {
          list-style: none; margin: 4px 0 0; padding: 6px 0;
          position: absolute; z-index: 1200; left: 0; right: 0;
          background: #fff; border: 1px solid #e6e6e6; border-radius: 6px;
          box-shadow: 0 12px 30px rgba(0,0,0,.15); max-height: 300px; overflow-y: auto;
          text-align: left;
        }
        .da-pick-head {
          padding: 8px 14px 6px; font-size: 10px; text-transform: uppercase;
          letter-spacing: .1em; color: #999; font-weight: 700; cursor: default;
        }
        .da-pick-suggest li {
          padding: 9px 14px; cursor: pointer; font-size: 14px; color: #333;
          display: flex; align-items: center; gap: 10px;
        }
        .da-pick-suggest li.da-pick-branch { align-items: flex-start; }
        .da-pick-suggest li:not(.da-pick-head):hover { background: #f7f7f7; }
        .da-pick-branch-text { display: flex; flex-direction: column; line-height: 1.3; }
        .da-pick-branch-text strong { color: #222; font-weight: 600; font-size: 14px; }
        .da-pick-branch-text small { color: #888; font-size: 12px; }
        .da-pick-tag {
          font-size: 10px; text-transform: uppercase; letter-spacing: .05em;
          background: #e23744; color: #fff; padding: 2px 6px; border-radius: 4px;
          font-weight: 600; margin-top: 2px; flex: 0 0 auto;
        }
      `}</style>
    </div>
  );
}
