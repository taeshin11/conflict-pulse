import { Link } from '@/i18n/navigation'
import VisitorCounter from '@/components/VisitorCounter'
import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'Learn how to use Conflict Pulse. Frequently asked questions about our data, methodology, and features.',
  keywords: 'conflict pulse, war monitor, conflict escalation, global conflicts, war tracker, how to use, FAQ, guide',
}

const faqs = [
  {
    q: 'What is Conflict Pulse and who is it for?',
    a: 'Conflict Pulse is a free, publicly accessible intelligence platform that provides live pulse monitoring of global conflict intensity, escalation trends, and active war zones. It is designed for journalists, researchers, policy analysts, students, NGO workers, and anyone with a professional or personal interest in understanding global conflict dynamics. No registration or payment is required.'
  },
  {
    q: 'Where does the data on this platform come from?',
    a: 'Our data is sourced from publicly available datasets including ACLED, SIPRI, Uppsala Conflict Data Program, United Nations agencies, official government sources, and verified open-source intelligence. Each data entry cites its primary source where possible.'
  },
  {
    q: 'How frequently is the data updated?',
    a: 'Breaking conflict events are updated within 24-48 hours of verification. Statistical summaries are reviewed weekly or monthly. The "last updated" timestamp on each data section indicates when that specific data was most recently refreshed.'
  },
  {
    q: 'Is this platform free to use?',
    a: 'Conflict Pulse is entirely free. We believe conflict intelligence should be accessible to everyone. We sustain the platform through advertising revenue. There are no paywalls, premium tiers, or registration requirements.'
  },
  {
    q: 'Can I use or cite data from Conflict Pulse in my research or reporting?',
    a: 'You are welcome to reference and cite our data provided you credit the platform and the original primary source. For academic publications, always cross-reference against primary sources. For partnership or bulk data access inquiries, contact us at contact@conflict-pulse.vercel.app.'
  }
]

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

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
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">{t('nav.home')}</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use Conflict Pulse</h1>
        <p className="text-xl text-slate-600 mb-10">A guide to navigating the platform and getting the most from our conflict intelligence data.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage to get a high-level overview of current conflict activity. The main dashboard displays key metrics, recent events, and interactive visualizations that update regularly.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use the filter controls to narrow data by region, date range, conflict type, or severity level. Click on any event, country, or data point to access detailed information and sourced reports.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use the timeline and historical views to understand how conflicts evolve. Bookmark specific pages or check our update sections to stay current on developments that matter to you.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
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
    </div>
  )
}
