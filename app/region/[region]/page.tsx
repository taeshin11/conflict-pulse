import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CountryCard from '@/components/CountryCard'

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

const regionNames: Record<string, string> = {
  africa: 'Africa', 'middle-east': 'Middle East', europe: 'Europe', asia: 'Asia', americas: 'Americas',
}
const intensityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export async function generateStaticParams() {
  return Object.keys(regionNames).map(region => ({ region }))
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params
  if (!regionNames[region]) notFound()

  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const filtered = countries
    .filter(c => c.region === region)
    .sort((a, b) => (intensityOrder[a.intensity] ?? 4) - (intensityOrder[b.intensity] ?? 4))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back to All Conflicts</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{regionNames[region]} — Active Conflicts</h1>
        <p className="text-gray-500 mb-6">{filtered.length} conflicts tracked in this region.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => <CountryCard key={c.id} country={c} />)}
        </div>
      </main>
    </div>
  )
}
