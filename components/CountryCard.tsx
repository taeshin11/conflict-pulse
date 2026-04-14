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

const intensityGradient: Record<string, string> = {
  critical: 'from-red-500 to-red-600',
  high: 'from-orange-500 to-orange-600',
  medium: 'from-yellow-400 to-yellow-500',
  low: 'from-green-500 to-green-600',
}

const intensityBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

function IntensityBadge({ intensity }: { intensity: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${intensityBadge[intensity] ?? 'bg-slate-100 text-slate-600'}`}>
      {intensity}
    </span>
  )
}

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.slug}`} className="block group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${intensityGradient[country.intensity] ?? 'from-slate-400 to-slate-500'}`}></div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{country.flag}</span>
              <div>
                <h3 className="font-black text-slate-900 group-hover:text-rose-600 transition-colors">{country.name}</h3>
                <p className="text-xs text-slate-500 capitalize">{country.region.replace('-', ' ')}</p>
              </div>
            </div>
            <IntensityBadge intensity={country.intensity} />
          </div>
          <div className="bg-slate-50 rounded-xl p-3 mb-3">
            <div className="text-xs font-bold text-slate-700 mb-1">{country.conflict_name}</div>
            <p className="text-xs text-slate-600 line-clamp-2">{country.summary}</p>
          </div>
          {country.recent_change && (
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <span className="text-amber-500 mt-0.5">▲</span>
              <span className="line-clamp-1">{country.recent_change}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
