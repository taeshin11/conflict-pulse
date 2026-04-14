import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Back to Conflict Pulse</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Conflict Pulse</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <p className="text-gray-700">Conflict Pulse is an independent project tracking active armed conflicts and war zones around the world. Our data is sourced from ACLED, UN OCHA, BBC, Reuters, and other reliable international news and humanitarian organizations.</p>
          <p className="text-gray-700">We update conflict data regularly to provide the most current information on intensity levels, recent changes, and humanitarian impacts.</p>
          <p className="text-gray-600 text-sm">Data is for informational purposes only. For emergency travel advice, consult your government&apos;s official travel advisories.</p>
        </div>
      </main>
    </div>
  )
}
