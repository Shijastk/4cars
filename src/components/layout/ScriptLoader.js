'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setProgress, finishLoading } from '@/lib/loadProgress';

// Order only matters BETWEEN stages — every script within a stage downloads and
// executes in parallel. Four waves instead of fifteen serial round-trips.
//
//   1. Independent globals: jQuery, Popper and AOS depend on nothing.
//   2. jquery-migrate patches jQuery, so it must land before any plugin reads it.
//   3. The jQuery/Popper plugins — mutually independent, all deps satisfied.
//   4. main.js wires the plugins to the DOM, so it goes last.
const STAGES = [
  ['/js/jquery.min.js', '/js/popper.min.js', '/js/aos.js'],
  ['/js/jquery-migrate-3.0.1.min.js'],
  [
    '/js/bootstrap.min.js',
    '/js/jquery.easing.1.3.js',
    '/js/jquery.waypoints.min.js',
    '/js/jquery.stellar.min.js',
    '/js/owl.carousel.min.js',
    '/js/jquery.magnific-popup.min.js',
    '/js/jquery.animateNumber.min.js',
    '/js/bootstrap-datepicker.js',
    '/js/jquery.timepicker.min.js',
    '/js/scrollax.min.js',
  ],
];

const MAIN = '/js/main.js';
const TOTAL = STAGES.flat().length + 1;

// If a script never fires load OR error (offline, blocked by an extension), the
// overlay would sit there forever. Cut it loose after this and show the page.
const WATCHDOG_MS = 8000;

// The vendor bundle is global, stateful and expensive — boot it exactly once per
// full page load. main.js is the only part that re-runs on navigation, because it
// binds to per-page DOM (datepicker, owl carousel, magnific popup, custom select).
let vendorsReady = null;
let mainInFlight = null;
let booted = false;
let ticks = 0;

function tick() {
  if (booted) return;
  ticks += 1;
  setProgress(ticks / TOTAL);
}

function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    // Resolve on error too: one dead plugin must not block the rest of the boot.
    s.onload = s.onerror = () => {
      tick();
      resolve();
    };
    document.body.appendChild(s);
  });
}

function bootVendors() {
  if (!vendorsReady) {
    vendorsReady = (async () => {
      for (const stage of STAGES) {
        await Promise.all(stage.map(loadScript));
      }
    })();
  }
  return vendorsReady;
}

function runMain() {
  // StrictMode double-invokes effects in dev; dedupe so main.js runs once per nav.
  if (mainInFlight) return mainInFlight;

  mainInFlight = (async () => {
    document.querySelectorAll(`script[src="${MAIN}"]`).forEach((el) => el.remove());
    await loadScript(MAIN);
  })().finally(() => {
    mainInFlight = null;
  });

  return mainInFlight;
}

export default function ScriptLoader() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    // Show immediate movement on the bar rather than a dead 0%.
    setProgress(0.05);
    const watchdog = setTimeout(finishLoading, WATCHDOG_MS);

    (async () => {
      await bootVendors();
      if (cancelled) return;
      await runMain();
      if (cancelled) return;
      booted = true;
      finishLoading();
    })();

    return () => {
      cancelled = true;
      clearTimeout(watchdog);
    };
  }, [pathname]);

  return null;
}
