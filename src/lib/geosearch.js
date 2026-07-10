// Free place search using Photon (OpenStreetMap-based, no API key required).
// Docs: https://photon.komoot.io — CORS-enabled, fair-use only.
const PHOTON_URL = 'https://photon.komoot.io/api/';

// Build a readable one-line label from a Photon result's properties,
// dropping empty and duplicated parts (e.g. "Dubai, Dubai, UAE").
export function formatPlaceLabel(p = {}) {
  const primary = p.name || [p.street, p.housenumber].filter(Boolean).join(' ');
  const parts = [primary, p.city, p.state, p.country].filter(Boolean);
  const seen = new Set();
  return parts
    .filter((part) => {
      const key = part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(', ');
}

// Returns [{ id, label, lat, lng }]. Pass an AbortSignal to cancel stale requests.
export async function searchPlaces(query, signal) {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = `${PHOTON_URL}?q=${encodeURIComponent(q)}&limit=6&lang=en`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data = await res.json();
  return (data.features || [])
    .map((f, i) => ({
      id: `photon-${i}`,
      label: formatPlaceLabel(f.properties),
      lat: f.geometry?.coordinates?.[1],
      lng: f.geometry?.coordinates?.[0],
    }))
    .filter((x) => x.label && Number.isFinite(x.lat) && Number.isFinite(x.lng));
}
