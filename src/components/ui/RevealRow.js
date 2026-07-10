'use client';
import { useEffect, useRef } from 'react';

/**
 * Wraps a Bootstrap `.row` and gives its immediate children (the `.col-*`
 * cards) a light, gently-staggered scroll reveal — a soft fade + rise as the
 * row scrolls into view.
 *
 * Why not the template's `.ftco-animate`? That legacy jQuery/Waypoints path
 * hides elements up-front (`opacity:0; visibility:hidden` in style.css) and only
 * reveals them if a one-time waypoint fires *after* the scripts finish loading —
 * a race that hydration and client re-renders regularly lose, leaving whole
 * sections blank or motionless. This is self-contained and reliable:
 *
 *  - It only ever hides a card *after* mount (it adds `.reveal-item` in the
 *    effect), so with JS off — or before this runs — cards stay fully visible.
 *  - IntersectionObserver reports the initial state on observe, so cards already
 *    in view reveal immediately; there's no permanent-hidden failure mode.
 *  - `prefers-reduced-motion` skips the whole thing and leaves cards static.
 *
 * The stagger is applied per intersection batch (each row of cards that crosses
 * together starts from 0), so every row cascades cleanly rather than the later
 * rows carrying an ever-growing delay.
 */
export default function RevealRow({ children, className = 'row', stagger = 70, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || typeof IntersectionObserver === 'undefined') return;

    const items = Array.from(row.children);
    // Arm each card: hide it and mark it for reveal. Done here (not in the
    // markup) so the hidden state never applies without the observer to undo it.
    items.forEach((el) => el.classList.add('reveal-item'));

    const io = new IntersectionObserver(
      (entries) => {
        const showing = entries.filter((e) => e.isIntersecting);
        showing.forEach((entry, i) => {
          const el = entry.target;
          el.style.setProperty('--reveal-delay', `${i * stagger}ms`);
          el.classList.add('is-visible');
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
