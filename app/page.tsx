import { promises as fs } from 'fs'
import path from 'path'
import CountryCard from '@/components/CountryCard'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'

const intensityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export default async function Home() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries = JSON.parse(raw)
  const sorted = [...countries].sort((a: { intensity: string }, b: { intensity: string }) =>
    (intensityOrder[a.intensity] ?? 4) - (intensityOrder[b.intensity] ?? 4)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">🌍 Conflict Pulse</h1>
            <p className="text-xs text-gray-400">Active Conflicts Worldwide</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/most-dangerous-countries" className="text-gray-300 hover:text-white">Most Dangerous</Link>
            <Link href="/countries-at-war" className="text-gray-300 hover:text-white">Countries at War</Link>
            <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
          </nav>
        </div>
        <AdHeader />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Conflicts Around the World</h2>
          <p className="text-gray-600">Tracking {sorted.length} active armed conflicts and war zones in real-time.</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-4 text-sm">
              <span className="text-red-600 font-semibold">{sorted.filter((c: { intensity: string }) => c.intensity === 'critical').length} Critical</span>
              <span className="text-orange-500 font-semibold">{sorted.filter((c: { intensity: string }) => c.intensity === 'high').length} High</span>
            </div>
            <VisitorCounter />
          </div>
        </div>

        <AdInContent />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((country: { id: string }) => (
            <CountryCard key={country.id} country={country as Parameters<typeof CountryCard>[0]['country']} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>Conflict Pulse — Data sourced from ACLED, UN OCHA, BBC, Reuters, and other trusted sources.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/most-dangerous-countries" className="hover:text-white">Most Dangerous Countries</Link>
            <Link href="/countries-at-war" className="hover:text-white">Countries at War</Link>
            <Link href="/active-conflicts-list" className="hover:text-white">All Active Conflicts</Link>
          </div>
        </div>
      </footer>
      <AdMobileSticky />
    </div>
  )
}
