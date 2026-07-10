'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { SITE } from '@/lib/site';

// Existing customer feedback — do not invent or add reviews here. The card's
// top marker surfaces the reviewer's role (`pos`), the short label we hold.
const testimonials = [
  { img: 'person_1.jpg', text: 'Picked up at DXB the moment I landed. Two-minute enquiry, spotless car, clear all-in price. The smoothest rental I have had in Dubai.', name: 'Sarah Mitchell', pos: 'Frequent Traveller' },
  { img: 'person_2.jpg', text: 'I rent every week for work between Dubai and Abu Dhabi. Pick-up is always quick and hassle-free — clear prices, no surprises.', name: 'Omar Al Farsi', pos: 'Business Owner' },
  { img: 'person_3.jpg', text: 'Needed an SUV last minute for a desert shoot and had one within the hour. The team was friendly and genuinely helpful.', name: 'Elena Rossi', pos: 'Photographer' },
  { img: 'person_1.jpg', text: 'Great value and helpful support. When my plans changed they adjusted my dates with zero fuss over WhatsApp.', name: 'David Kim', pos: 'Freelancer' },
  { img: 'person_2.jpg', text: 'I arrange cars for events across the UAE all the time and this has become my go-to. Reliable vehicles, fair rates.', name: 'Aisha Bello', pos: 'Event Planner' },
];

const INTERVAL_MS = 4500;

// The starting card index of each "page". We step by `perView`, but clamp the
// last page so it never overruns the end (keeping every page a full row of
// cards). e.g. 5 cards, 3-per-view → pages start at [0, 2] → groups (1-3),(3-5).
function buildPages(total, perView) {
  const starts = [];
  for (let i = 0; i < total; i += perView) {
    starts.push(Math.min(i, Math.max(0, total - perView)));
  }
  return starts.filter((v, i) => i === 0 || v !== starts[i - 1]);
}

function ReviewCard({ img, text, name, pos }) {
  return (
    <figure className="review-card">
      {/* Top — a small role marker (icon + label) */}
      <div className="review-card__meta">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>{pos}</span>
      </div>

      {/* Middle — the review itself */}
      <blockquote className="review-card__quote">“{text}”</blockquote>

      {/* Bottom — circular avatar + name */}
      <figcaption className="review-card__person">
        <img className="review-card__avatar" src={`/images/${img}`} alt={name} width="52" height="52" loading="lazy" />
        <span className="review-card__name">{name}</span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialSlider() {
  const viewportRef = useRef(null);
  const [perView, setPerView] = useState(3); // desktop default (used for SSR)
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = useMemo(() => buildPages(testimonials.length, perView), [perView]);

  // Track how many cards fit per view (mirrors the CSS breakpoints) so paging
  // advances by exactly one screenful.
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 992px)');
    const mqTablet = window.matchMedia('(min-width: 576px)');
    const update = () => setPerView(mqDesktop.matches ? 3 : mqTablet.matches ? 2 : 1);
    update();
    mqDesktop.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  // Keep the active page in range when the number of pages changes (resize).
  useEffect(() => {
    setPage((p) => Math.min(p, pages.length - 1));
  }, [pages.length]);

  // Scroll the viewport to the current page's first card.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.children[pages[page] ?? 0];
    if (card) vp.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }, [page, pages]);

  // Auto-advance on a timer — paused on hover/focus and under reduced-motion.
  useEffect(() => {
    if (paused || pages.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, pages.length]);

  return (
    <section className="ftco-section reviews-section">
      <div className="container">
        <div className="row justify-content-center">
          <SectionHeading
            sub="Testimonials"
            title="What Our Customers Say"
            text={`Real feedback from travellers who hit the road with ${SITE.brand}.`}
          />
        </div>

        {/* Auto-advancing carousel: pages three cards at a time on a timer.
            Pauses while hovered or keyboard-focused so a card can be read. */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="reviews-viewport" ref={viewportRef} aria-label="Customer testimonials">
            {testimonials.map((t) => <ReviewCard key={t.name} {...t} />)}
          </div>

          {pages.length > 1 && (
            <div className="reviews-dots" role="tablist" aria-label="Testimonial pages">
              {pages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`reviews-dot${i === page ? ' reviews-dot--active' : ''}`}
                  aria-label={`Go to testimonials ${i + 1} of ${pages.length}`}
                  aria-selected={i === page}
                  role="tab"
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
