import { MetadataRoute } from 'next'
import countries from '@/public/data/countries.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://conflict-pulse.vercel.app'
  const countryPages = countries.map(c => ({
    url: `${base}/country/${c.slug}`,
    lastModified: new Date(c.last_updated),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/most-dangerous-countries`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/countries-at-war`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/active-conflicts-list`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...countryPages,
  ]
}
