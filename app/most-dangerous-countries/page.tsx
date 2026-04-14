import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import CountryCard from '@/components/CountryCard'
import VisitorCounter from '@/components/VisitorCounter'

interface Country {
  id: string; slug: string; name: string; flag: string; region: string; status: string;
  intensity: string; conflict_name: string; start_date: string; summary: string;
  recent_change: string; key_cities: string[]; parties: string[];
  casualties_estimate: string; displaced_estimate: string; last_updated: string; color: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/countries-at-war', label: 'Countries' },
  { href: '/region/middle-east', label: 'Regions' },
  { href: '/most-dangerous-countries', label: 'Most Dangerous' },
  { href: '/about', label: 'About' },
]

export default async function MostDangerousPage() {
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const critical = countries.filter(c => c.intensity === 'critical')

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
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <Link href="/" className="text-sm text-rose-500 hover:text-rose-600 font-medium mb-6 inline-block">← Back to Conflict Pulse</Link>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Most Dangerous Countries in the World (2026)</h1>
          <p className="text-slate-600">
            These {critical.length} countries are experiencing the highest-intensity armed conflicts, with active large-scale military operations and severe humanitarian crises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {critical.map(c => <CountryCard key={c.id} country={c} />)}
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
