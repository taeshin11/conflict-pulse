import Link from 'next/link'
import VisitorCounter from '@/components/VisitorCounter'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/countries-at-war', label: 'Countries' },
  { href: '/region/middle-east', label: 'Regions' },
  { href: '/most-dangerous-countries', label: 'Most Dangerous' },
  { href: '/about', label: 'About' },
]

export default function AboutPage() {
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
        <Link href="/" className="text-sm text-rose-500 hover:text-rose-600 font-medium mb-6 inline-block">← Back to Conflict Pulse</Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">About Conflict Pulse</h1>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <p className="text-slate-700">Conflict Pulse is an independent project tracking active armed conflicts and war zones around the world. Our data is sourced from ACLED, UN OCHA, BBC, Reuters, and other reliable international news and humanitarian organizations.</p>
          <p className="text-slate-700">We update conflict data regularly to provide the most current information on intensity levels, recent changes, and humanitarian impacts.</p>
          <p className="text-slate-600 text-sm">Data is for informational purposes only. For emergency travel advice, consult your government&apos;s official travel advisories.</p>
        </div>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 mt-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Team &amp; Independence</h2>
          <p className="text-slate-600 leading-relaxed mb-4">The platform was developed by a team of data engineers, journalists, and security researchers passionate about making conflict intelligence accessible to the public. Our backgrounds span open-source intelligence (OSINT), data visualization, and international security studies.</p>
          <p className="text-slate-600 leading-relaxed">We are not affiliated with any government, military organization, or political group. Our work is funded entirely through advertising revenue, allowing us to remain independent and freely accessible to all users worldwide.</p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 mt-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Continuous Monitoring vs. News Cycles</h2>
          <p className="text-slate-600 leading-relaxed mb-4">Traditional news media covers conflicts reactively — a story today, silence tomorrow. Conflict Pulse provides continuous, structured monitoring that persists beyond news cycles. Where newspapers provide narrative, we provide data. Where TV coverage provides emotion, we provide quantified context.</p>
          <p className="text-slate-600 leading-relaxed">Our structured data format makes it easy for researchers to track trends over time, compare conflicts across regions, and identify patterns that would be invisible in unstructured reporting.</p>
        </section>
      </main>
      <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <a href="/about" className="hover:text-white transition-colors">About Us</a>
            <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
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
