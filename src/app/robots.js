import { SITE } from '@/lib/site';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
