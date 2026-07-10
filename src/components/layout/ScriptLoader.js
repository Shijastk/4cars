'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SCRIPTS = [
  '/js/jquery.min.js',
  '/js/jquery-migrate-3.0.1.min.js',
  '/js/popper.min.js',
  '/js/bootstrap.min.js',
  '/js/jquery.easing.1.3.js',
  '/js/jquery.waypoints.min.js',
  '/js/jquery.stellar.min.js',
  '/js/owl.carousel.min.js',
  '/js/jquery.magnific-popup.min.js',
  '/js/aos.js',
  '/js/jquery.animateNumber.min.js',
  '/js/bootstrap-datepicker.js',
  '/js/jquery.timepicker.min.js',
  '/js/scrollax.min.js',
  '/js/main.js',
];

function loadScript(src) {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = resolve;
    document.body.appendChild(s);
  });
}

async function loadAll() {
  for (const src of SCRIPTS) await loadScript(src);
}

export default function ScriptLoader() {
  const pathname = usePathname();
  useEffect(() => {
    SCRIPTS.forEach((src) => {
      const el = document.querySelector(`script[src="${src}"]`);
      if (el) el.remove();
    });
    loadAll();
  }, [pathname]);
  return null;
}
