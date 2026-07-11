'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, getServerSnapshot } from '@/lib/loadProgress';
import Brand from '@/components/ui/Brand';

// How long the fade-out runs; must match the transition in globals.css.
const EXIT_MS = 350;

// Deliberately NOT `#ftco-loader`: that id is styled by the vendored style.css and
// torn down by main.js's `removeClass('show')`. Owning our own element keeps the
// overlay's visibility purely a function of React state, so a throw anywhere in the
// legacy jQuery chain can no longer leave the user stranded behind a white screen.
export default function Loader() {
  const { progress, done } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (!done) return undefined;
    const t = setTimeout(() => setExited(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [done]);

  // Already booted (i.e. a client-side navigation) — never flash the overlay again.
  if (exited) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      className={`page-loader${done ? ' page-loader--complete' : ''}`}
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className="page-loader__inner">
        {/* The loader backdrop is always dark — pin the mark to its white ink. */}
        <Brand tone="light" className="page-loader__brand" />

        <div className="page-loader__track">
          {/* scaleX is compositor-only — no layout thrash while the bar fills. */}
          <div
            className="page-loader__bar"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>

        <span className="page-loader__pct">{pct}%</span>
      </div>
    </div>
  );
}
