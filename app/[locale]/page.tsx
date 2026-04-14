import { promises as fs } from 'fs'
import path from 'path'
import CountryCard from '@/components/CountryCard'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Conflict Pulse | Real-Time Conflict Intelligence',
  description: 'Live pulse monitoring of global conflict intensity, escalation trends, and active war zones',
  keywords: 'conflict pulse, war monitor, conflict escalation, global conflicts, war tracker',
}

const intensityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const dataPath = path.join(process.cwd(), 'public/data/countries.json')
  const raw = await fs.readFile(dataPath, 'utf-8')
  const countries = JSON.parse(raw)
  const sorted = [...countries].sort((a: { intensity: string }, b: { intensity: string }) =>
    (intensityOrder[a.intensity] ?? 4) - (intensityOrder[b.intensity] ?? 4)
  )

  const critical = sorted.filter((c: { intensity: string }) => c.intensity === 'critical').length
  const regions = new Set(sorted.map((c: { region: string }) => c.region)).size

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

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-rose-500 text-xs font-semibold uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-rose-500 opacity-60"></span>ALL ACTIVE CONFLICTS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{t('home.title')}</h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">{t('home.subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { value: sorted.length, label: 'Active Wars' },
                { value: sorted.length, label: 'Countries' },
                { value: regions, label: 'Regions' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 text-center min-w-[100px]">
                  <div className="text-3xl font-black text-rose-500">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <AdHeader />

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20">{critical} Critical</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20">{sorted.length} Total</span>
          </div>
          <VisitorCounter />
        </div>

        <AdInContent />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((country: { id: string }) => (
            <CountryCard key={country.id} country={country as Parameters<typeof CountryCard>[0]['country']} />
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold">Conflict Pulse</div>
              <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
            </div>
            <VisitorCounter />
          </div>
        </div>
      </footer>
      <AdMobileSticky />
    </div>
  )
}
