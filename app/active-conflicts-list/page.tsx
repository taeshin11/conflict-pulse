import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'

interface Country {
  id: string; slug: string; name: string; flag: string; region: string;
  intensity: string; conflict_name: string; start_date: string; summary: string;
  casualties_estimate: string; last_updated: string;
}

const intensityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export default async function ActiveConflictsListPage() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const sorted = [...countries].sort((a, b) => (intensityOrder[a.intensity] ?? 4) - (intensityOrder[b.intensity] ?? 4))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">List of Active Conflicts in 2026</h1>
        <p className="text-gray-600 mb-6">{sorted.length} active armed conflicts currently tracked worldwide.</p>
        <div className="space-y-3">
          {sorted.map((c, i) => (
            <Link key={c.id} href={`/country/${c.slug}`} className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-mono text-sm w-6">{i + 1}.</span>
                <span className="text-2xl">{c.flag}</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{c.name}</span>
                  <span className="text-gray-500 text-sm ml-2">— {c.conflict_name}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  c.intensity === 'critical' ? 'bg-red-100 text-red-700' :
                  c.intensity === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{c.intensity.toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
