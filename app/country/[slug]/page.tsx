import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'

interface Country {
  id: string
  slug: string
  name: string
  flag: string
  region: string
  status: string
  intensity: string
  conflict_name: string
  start_date: string
  summary: string
  recent_change: string
  key_cities: string[]
  parties: string[]
  casualties_estimate: string
  displaced_estimate: string
  last_updated: string
  color: string
}

const intensityConfig: Record<string, { label: string; className: string }> = {
  critical: { label: 'CRITICAL', className: 'bg-red-100 text-red-800 border border-red-200' },
  high: { label: 'HIGH', className: 'bg-orange-100 text-orange-800 border border-orange-200' },
  medium: { label: 'MEDIUM', className: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
  low: { label: 'LOW', className: 'bg-green-100 text-green-800 border border-green-200' },
}

export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  return countries.map(c => ({ slug: c.slug }))
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const country = countries.find(c => c.slug === slug)
  if (!country) notFound()

  const cfg = intensityConfig[country.intensity] ?? intensityConfig.medium

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back to Conflict Pulse</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{country.name}</h1>
                <p className="text-gray-500 capitalize">{country.region.replace('-', ' ')}</p>
              </div>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${cfg.className}`}>
              {cfg.label}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{country.conflict_name}</h2>
          <p className="text-gray-700 mb-4">{country.summary}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-amber-800 mb-1">Recent Development</h3>
            <p className="text-amber-900">{country.recent_change}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Key Cities</h3>
              <div className="flex flex-wrap gap-2">
                {country.key_cities.map(city => (
                  <span key={city} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{city}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Parties Involved</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                {country.parties.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <AdInContent />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Estimated Casualties</h3>
            <p className="text-xl font-bold text-red-600">{country.casualties_estimate}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-1">Displaced Persons</h3>
            <p className="text-xl font-bold text-orange-600">{country.displaced_estimate}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center">Conflict started: {country.start_date} · Last updated: {country.last_updated}</p>
      </main>

      <footer className="bg-gray-900 text-white mt-12 py-6 text-center text-sm text-gray-400">
        <Link href="/" className="hover:text-white">← Back to All Active Conflicts</Link>
      </footer>
      <AdMobileSticky />
    </div>
  )
}
