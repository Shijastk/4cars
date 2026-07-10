'use client';
import { useEffect, useRef } from 'react';

/**
 * Modern hero with a scroll-driven reveal:
 *
 *  - `.hero-sticky` keeps the hero in view (CSS `position: sticky`) while the
 *    opaque `.page-panel` that follows in `page.js` rises up and covers it.
 *  - The hero background does NOT sit rigidly frozen — it drifts up a little
 *    (parallax) as you scroll, for a more premium, layered feel.
 *  - The hero content lifts up faster and fades out.
 *  - A dark scrim deepens the hero the further you scroll.
 *
 * All of this is driven off the (Lenis-smoothed) scroll position and only runs
 * on desktop where the sticky reveal is active; it is skipped entirely for
 * `prefers-reduced-motion`.
 */
export default function HeroModern() {
  const bgRef = useRef(null);
  const scrimRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const scrim = scrimRef.current;
    const inner = innerRef.current;

    const desktop = window.matchMedia('(min-width: 992px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;

    const reset = () => {
      if (bg) bg.style.transform = '';
      if (scrim) scrim.style.opacity = '';
      if (inner) {
        inner.style.transform = '';
        inner.style.opacity = '';
        inner.style.pointerEvents = '';
      }
    };

    const apply = () => {
      ticking = false;
      if (!desktop.matches || reduce.matches) {
        reset();
        return;
      }
      const vh = window.innerHeight || 1;
      // 0 at the top → 1 after roughly one viewport of scrolling.
      const p = Math.min(Math.max(window.scrollY / vh, 0), 1);

      // Background drifts up gently — the "little move to top" premium feel.
      if (bg) bg.style.transform = `translate3d(0, ${(-p * vh * 0.12).toFixed(1)}px, 0)`;
      // Hero deepens as the sheet climbs over it.
      if (scrim) scrim.style.opacity = (p * 0.6).toFixed(3);
      // Content lifts faster than the page (parallax) and fades away.
      if (inner) {
        inner.style.transform = `translate3d(0, ${(-p * vh * 0.4).toFixed(1)}px, 0)`;
        inner.style.opacity = String(Math.max(0, 1 - p * 1.05));
        // Once it is essentially gone, let clicks reach the panel above.
        inner.style.pointerEvents = p > 0.85 ? 'none' : '';
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apply);
    desktop.addEventListener('change', apply);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', apply);
      desktop.removeEventListener('change', apply);
    };
  }, []);

  return (
    <div className="hero-sticky">
      <section className="hero-modern">
        <div className="hero-modern__bg" ref={bgRef} style={{ backgroundImage: "url('/images/bg_1.jpg')" }}></div>
        <div className="hero-modern__scrim" ref={scrimRef}></div>
        <div className="container hero-modern__inner" ref={innerRef}>
          <h1 className="hero-modern__title">Find The Perfect Car<br />For Every Journey</h1>
          <div className="hero-modern__row">
            <p className="hero-modern__subtitle">Experience seamless car rentals across the UAE — reliable, fast, and built around your schedule.</p>
            <div className="hero-modern__actions">
              <a href="/contact" className="hero-pill hero-pill--active">
                <span>Book Now</span>
                <span className="hero-pill__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </a>
              <a href="/fleet" className="hero-pill hero-pill--ghost">
                <span>View Cars</span>
                <span className="hero-pill__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
