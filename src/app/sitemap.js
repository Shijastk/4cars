import { SITE } from '@/lib/site';

const BASE = `https://${SITE.domain}`;

export default function sitemap() {
  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/fleet`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/pricing`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ];
}
