import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import CountryCard from '@/components/CountryCard'

interface Country {
  id: string; slug: string; name: string; flag: string; region: string; status: string;
  intensity: string; conflict_name: string; start_date: string; summary: string;
  recent_change: string; key_cities: string[]; parties: string[];
  casualties_estimate: string; displaced_estimate: string; last_updated: string; color: string;
}

export default async function MostDangerousPage() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const critical = countries.filter(c => c.intensity === 'critical')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back to Conflict Pulse</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Most Dangerous Countries in the World (2026)</h1>
        <p className="text-gray-600 mb-6">
          These {critical.length} countries are experiencing the highest-intensity armed conflicts, with active large-scale military operations and severe humanitarian crises.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {critical.map(c => <CountryCard key={c.id} country={c} />)}
        </div>
      </main>
    </div>
  )
}
