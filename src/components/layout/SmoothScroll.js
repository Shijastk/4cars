'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global smooth / inertia scrolling powered by Lenis.
 *
 * Lenis runs in its default "window" mode — it drives the real document scroll
 * position rather than transforming a wrapper — so native `position: sticky`
 * (the hero reveal) and the jQuery scroll handlers in main.js keep working.
 *
 * Mounted once from the root layout so it survives client-side navigation.
 * Disabled entirely for visitors who prefer reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // easeOutExpo — quick to react, long gentle settle.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native inertia already feels good on touch; smoothing it fights the OS.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
