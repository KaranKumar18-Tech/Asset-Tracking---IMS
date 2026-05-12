import { useState } from 'react'
import { Download } from 'lucide-react'
import { SectionTitle, SimBadge } from '../components/ui'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import clsx from 'clsx'

// Dummy data
const UTIL_DATA = [
  { name: 'Bar Counters', value: 82 },
  { name: 'Backbars', value: 74 },
  { name: 'POSM Sets', value: 68 },
  { name: 'Fabrication Units', value: 51 },
  { name: 'Branding Assets', value: 43 },
]

const VENDOR_DATA = [
  { vendor: 'Vendor A — Mumbai', city: 'Mumbai', assigned: 148, ontime: 134, overdue: 14, rate: 90.5 },
  { vendor: 'Vendor B — Delhi', city: 'Delhi', assigned: 121, ontime: 105, overdue: 16, rate: 86.8 },
  { vendor: 'Vendor C — Bengaluru', city: 'Bengaluru', assigned: 98, ontime: 91, overdue: 7, rate: 92.9 },
  { vendor: 'Vendor D — Hyderabad', city: 'Hyderabad', assigned: 87, ontime: 74, overdue: 13, rate: 85.1 },
  { vendor: 'Vendor E — Chennai', city: 'Chennai', assigned: 64, ontime: 61, overdue: 3, rate: 95.3 },
  { vendor: 'Vendor F — Pune', city: 'Pune', assigned: 43, ontime: 43, overdue: 0, rate: 100 },
]

const CITY_DEPLOYMENT = [
  { city: 'Mumbai', active: 240, idle: 50, transit: 22 },
  { city: 'Delhi NCR', active: 195, idle: 45, transit: 28 },
  { city: 'Bengaluru', active: 180, idle: 40, transit: 21 },
  { city: 'Hyderabad', active: 145, idle: 30, transit: 12 },
  { city: 'Chennai', active: 110, idle: 25, transit: 8 },
  { city: 'Pune', active: 75, idle: 18, transit: 5 },
  { city: 'Kolkata', active: 25, idle: 8, transit: 2 },
]

const getReturnRateColor = (rate) => {
  if (rate > 90) return 'text-emb-green'
  if (rate >= 80) return 'text-amber-600'
  return 'text-red-600'
}

export default function Reports() {
  const [dateRange, setDateRange] = useState('Last 30 days')
  const [sortedVendors, setSortedVendors] = useState([...VENDOR_DATA].sort((a, b) => a.rate - b.rate))

  const exportCSV = () => {
    const headers = ['Vendor Name', 'City', 'Assets Assigned', 'On-time Returns', 'Overdue', 'Return Rate']
    const rows = sortedVendors.map(v => [
      v.vendor,
      v.city,
      v.assigned,
      v.ontime,
      v.overdue,
      `${v.rate}%`,
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vendor-accountability-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 fade-in">
      <SimBadge />

      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Reports & Analytics</SectionTitle>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-3 py-2 border border-emb-green text-emb-green font-semibold rounded-lg text-xs hover:bg-emb-light active:scale-95 transition-all"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* DATE RANGE SELECTOR */}
      <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm mb-4 slide-up">
        <div className="flex flex-wrap gap-2">
          {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All Time'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={clsx(
                'px-4 py-2 rounded-full text-xs font-semibold transition-all',
                dateRange === range
                  ? 'bg-emb-green text-white'
                  : 'bg-white border border-emb-green text-emb-green hover:bg-emb-light'
              )}
            >
              {range}
            </button>
          ))}
        </div>
        <div className="text-[10px] text-emb-textsecondary mt-2">
          Showing data for: {dateRange}
        </div>
      </div>

      {/* UTILIZATION CHART */}
      <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm mb-4 slide-up">
        <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-3">
          Utilization by Asset Type
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={UTIL_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 150, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5ede7" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: '#f7faf8', border: '1px solid #d4e8db', borderRadius: '8px' }} />
            <Bar dataKey="value" fill="#47bf72" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* VENDOR ACCOUNTABILITY TABLE */}
      <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm mb-4 slide-up overflow-x-auto">
        <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-3">
          Vendor Accountability Report
        </div>
        <table className="w-full text-xs border-collapse" style={{ minWidth: 720 }}>
          <thead>
            <tr className="bg-emb-surface border-b border-emb-border">
              {['Vendor Name', 'City', 'Assets Assigned', 'On-time Returns', 'Overdue', 'Return Rate'].map(h => (
                <th key={h} className="text-left text-[10px] font-semibold text-emb-textsecondary uppercase tracking-wider px-3 py-2.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedVendors.map((v, i) => (
              <tr key={v.vendor} className={`border-b border-emb-border hover:bg-emb-light transition-colors ${i % 2 === 1 ? 'bg-emb-surface' : 'bg-white'}`}>
                <td className="px-3 py-2.5 font-medium text-emb-textprimary">{v.vendor}</td>
                <td className="px-3 py-2.5 text-emb-textsecondary">{v.city}</td>
                <td className="px-3 py-2.5 text-emb-textprimary font-mono">{v.assigned}</td>
                <td className="px-3 py-2.5 text-emb-textprimary font-mono">{v.ontime}</td>
                <td className="px-3 py-2.5 text-red-600 font-mono">{v.overdue}</td>
                <td className={clsx('px-3 py-2.5 font-semibold', getReturnRateColor(v.rate))}>
                  {v.rate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CITY DEPLOYMENT CHART */}
      <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm slide-up">
        <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-3">
          City Deployment Breakdown
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={CITY_DEPLOYMENT} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5ede7" />
            <XAxis dataKey="city" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#f7faf8', border: '1px solid #d4e8db', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Bar dataKey="active" stackId="a" fill="#47bf72" name="Active" />
            <Bar dataKey="idle" stackId="a" fill="#f59e0b" name="Idle" />
            <Bar dataKey="transit" stackId="a" fill="#60a5fa" name="In Transit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
