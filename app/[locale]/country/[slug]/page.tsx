import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import VisitorCounter from '@/components/VisitorCounter'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import { setRequestLocale, getTranslations } from 'next-intl/server'

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

const intensityBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

const intensityGradient: Record<string, string> = {
  critical: 'from-red-500 to-red-600',
  high: 'from-orange-500 to-orange-600',
  medium: 'from-yellow-400 to-yellow-500',
  low: 'from-green-500 to-green-600',
}

export async function generateStaticParams() {
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt']
  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  return locales.flatMap(locale => countries.map(c => ({ locale, slug: c.slug })))
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries: Country[] = JSON.parse(raw)
  const country = countries.find(c => c.slug === slug)
  if (!country) notFound()

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/countries-at-war' as const, label: 'Countries' },
    { href: '/region/middle-east' as const, label: 'Regions' },
    { href: '/most-dangerous-countries' as const, label: 'Most Dangerous' },
    { href: '/about' as const, label: t('nav.about') },
  ]

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
        <Link href="/" className="text-sm text-rose-500 hover:text-rose-600 font-medium mb-6 inline-block">← Back to Conflict Pulse</Link>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div className={`h-2 bg-gradient-to-r ${intensityGradient[country.intensity] ?? 'from-slate-400 to-slate-500'}`}></div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{country.flag}</span>
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">{country.name}</h1>
                  <p className="text-slate-500 capitalize">{country.region.replace('-', ' ')}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase ${intensityBadge[country.intensity] ?? 'bg-slate-100 text-slate-600'}`}>
                {country.intensity}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">{country.conflict_name}</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">{country.summary}</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-amber-800 mb-1 text-sm">Recent Development</h3>
              <p className="text-amber-900 text-sm">{country.recent_change}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Cities</h3>
                <div className="flex flex-wrap gap-2">
                  {country.key_cities.map(city => (
                    <span key={city} className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-lg">{city}</span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Parties Involved</h3>
                <ul className="text-xs text-slate-700 space-y-1">
                  {country.parties.map(p => <li key={p} className="flex items-start gap-1"><span className="text-slate-400">•</span>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <AdInContent />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Estimated Casualties</h3>
            <p className="text-2xl font-black text-red-600">{country.casualties_estimate}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Displaced Persons</h3>
            <p className="text-2xl font-black text-orange-600">{country.displaced_estimate}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center">Conflict started: {country.start_date} · Last updated: {country.last_updated}</p>
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
      <AdMobileSticky />
    </div>
  )
}
