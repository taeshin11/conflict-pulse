import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import VisitorCounter from '@/components/VisitorCounter'

interface Country {
  id: string; slug: string; name: string; flag: string; region: string;
  intensity: string; conflict_name: string; start_date: string; summary: string;
  casualties_estimate: string; last_updated: string;
}

const intensityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

const intensityBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/countries-at-war', label: 'Countries' },
  { href: '/region/middle-east', label: 'Regions' },
  { href: '/most-dangerous-countries', label: 'Most Dangerous' },
  { href: '/about', label: 'About' },
]

export default async function ActiveConflictsListPage() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const sorted = [...countries].sort((a, b) => (intensityOrder[a.intensity] ?? 4) - (intensityOrder[b.intensity] ?? 4))

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <Link href="/" className="text-lg font-bold tracking-tight">Conflict Pulse</Link>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-0.5 hidden sm:block">LIVE</span>
            </div>
            <nav className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1">
        <Link href="/" className="text-sm text-rose-500 hover:text-rose-600 font-medium mb-6 inline-block">← Back</Link>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">List of Active Conflicts in 2026</h1>
          <p className="text-slate-600">{sorted.length} active armed conflicts currently tracked worldwide.</p>
        </div>
        <div className="space-y-3">
          {sorted.map((c, i) => (
            <Link key={c.id} href={`/country/${c.slug}`} className="block bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono text-sm w-6">{i + 1}.</span>
                <span className="text-2xl">{c.flag}</span>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{c.name}</span>
                  <span className="text-slate-500 text-sm ml-2">— {c.conflict_name}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${intensityBadge[c.intensity] ?? 'bg-slate-100 text-slate-600'}`}>
                  {c.intensity.toUpperCase()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold">Conflict Pulse</div>
            <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
          </div>
          <VisitorCounter />
        </div>
      </footer>
    </div>
  )
}
