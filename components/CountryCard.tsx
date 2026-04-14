import Link from 'next/link'

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

const intensityConfig: Record<string, { label: string; className: string; border: string }> = {
  critical: { label: 'CRITICAL', className: 'bg-red-100 text-red-800', border: 'border-red-200' },
  high: { label: 'HIGH', className: 'bg-orange-100 text-orange-800', border: 'border-orange-200' },
  medium: { label: 'MEDIUM', className: 'bg-yellow-100 text-yellow-800', border: 'border-yellow-200' },
  low: { label: 'LOW', className: 'bg-green-100 text-green-800', border: 'border-green-200' },
}

export default function CountryCard({ country }: { country: Country }) {
  const cfg = intensityConfig[country.intensity] ?? intensityConfig.medium
  return (
    <div className={`bg-white rounded-xl border-2 ${cfg.border} shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{country.name}</h3>
            <p className="text-xs text-gray-500 capitalize">{country.region.replace('-', ' ')}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.className}`}>
          {cfg.label}
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">{country.conflict_name}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{country.summary}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-amber-700 mb-0.5">Recent Change</p>
        <p className="text-xs text-amber-800">{country.recent_change}</p>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Since {country.start_date}</span>
        <Link
          href={`/country/${country.slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View details →
        </Link>
      </div>
    </div>
  )
}
