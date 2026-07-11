import { SITE, BRAND_HEAD } from '@/lib/site';

/**
 * The brand lockup — logo mark + wordmark.
 *
 * The mark is black-and-red artwork, so it disappears on a dark backdrop. It
 * therefore ships in two inks — /logo.png (black) and /logo-light.png (white,
 * red preserved) — because the navbar sits on THREE different backdrops:
 * transparent over the dark hero, solid black on mobile, and solid white once
 * `.scrolled` is on. Both inks are rendered and cross-faded in CSS on that
 * class, so the swap never flashes and never waits on a request mid-scroll.
 *
 * `tone="light"` pins it to the white ink for permanently dark surfaces
 * (footer, loader) and skips the second image entirely.
 */
export default function Brand({ tone = 'adaptive', className = '' }) {
  return (
    <span className={`brand ${className}`.trim()}>
      <span className="brand__mark" aria-hidden="true">
        <img src="/logo-light.png" alt="" className="brand__img brand__img--on-dark" />
        {tone === 'adaptive' && (
          <img src="/logo.png" alt="" className="brand__img brand__img--on-light" />
        )}
      </span>
      <span className="brand__word">
        {BRAND_HEAD}
        <span className="brand__word-tail">{SITE.brandTail}</span>
        <span className="brand__word-tld">{SITE.tld}</span>
      </span>
    </span>
  );
}
