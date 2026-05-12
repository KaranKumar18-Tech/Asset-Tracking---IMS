import { useEffect, useState, Suspense, lazy } from 'react'
import { StatCard, Card, SectionTitle } from '../components/ui'
import { CITIES, STATS, UTIL, VENDORS, ACTIVITY } from '../data/mockData'

const MapView = lazy(() => import('../components/MapView'))

const LIVE_TICKS = [
  { color: '#47bf72', text: "Whisky Brand POSM #P-204 checked in — Business Hotel, Bengaluru" },
  { color: '#60a5fa', text: 'Reserve Brand Display #D-088 dispatched — Delhi → Gurgaon'  },
  { color: '#47bf72', text: 'Blended Brand Standee returned — Kolkata warehouse'    },
  { color: '#f59e0b', text: 'Blended Scotch Brand Backbar flagged idle — Vendor C Chennai'         },
]

export default function Dashboard() {
  const [feed, setFeed] = useState(ACTIVITY)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setFeed(prev => [LIVE_TICKS[tick % LIVE_TICKS.length], ...prev.slice(0, 5)])
      setTick(p => p + 1)
    }, 6000)
    return () => clearInterval(t)
  }, [tick])

  return (
    <div className="p-4 space-y-4 fade-in">
      <SectionTitle>Overview — Asset Tracking Dashboard</SectionTitle>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <StatCard label="Total Assets Tracked" value="1,284" sub="↑ 38 added this month" subColor="text-emb-green" />
        <StatCard label="Active / In Use"       value="847"  sub="66% utilization rate"  subColor="text-emb-green" accent="text-emb-green" borderAccent="border-l-4 border-emb-green" />
        <StatCard label="In Transit"            value="214"  sub="Across 9 cities"       subColor="text-emb-textsecondary"   accent="text-blue-400" />
        <StatCard label="Flagged / Missing"     value="23"   sub="↑ 4 new alerts today"  subColor="text-red-400"   accent="text-red-400" borderAccent="border-l-4 border-red-400" />
      </div>

      {/* MAP */}
      <div className="hidden md:block bg-white border border-emb-border rounded-xl p-4 shadow-sm">
        <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-3">Asset Distribution — India</div>
        <Suspense fallback={<div className="h-72 bg-emb-surface rounded-lg animate-pulse" />}>
          <MapView />
        </Suspense>
      </div>

      {/* CITY + ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card title="City-wise Distribution">
          <div className="px-4 pb-3 space-y-2">
            {CITIES.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emb-textprimary font-medium">{c.name}</span>
                  <span className="font-mono text-emb-textsecondary">{c.count}</span>
                </div>
                <div className="h-1 bg-emb-light rounded-full">
                  <div className="h-1 rounded-full transition-all duration-700" style={{ width: `${Math.round(c.count / 400 * 100)}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Live Activity Feed">
          <div className="px-4 pb-3 space-y-0 divide-y divide-emb-border">
            {feed.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 text-xs slide-up">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 text-emb-textprimary leading-snug">{a.text}</div>
                <div className="text-[10px] font-mono text-emb-textsecondary flex-shrink-0">{a.time || 'just now'}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* UTIL + VENDORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card title="Utilization by Asset Type">
          <div className="px-4 pb-3 space-y-3">
            {UTIL.map(u => (
              <div key={u.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-emb-textprimary">{u.name}</span>
                  <span className="font-mono text-emb-textsecondary">{u.pct}%</span>
                </div>
                <div className="h-1.5 bg-emb-mid rounded-full">
                  <div className="h-1.5 rounded-full" style={{ width: `${u.pct}%`, background: u.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Vendors by Custody">
          <div className="px-4 pb-3 divide-y divide-emb-border">
            {VENDORS.map(v => (
              <div key={v.name} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-medium text-emb-textprimary">{v.name}</div>
                  <div className="text-[10px] text-emb-textsecondary">{v.city}</div>
                </div>
                <div className="text-xs font-mono text-emb-green">{v.count} assets</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
