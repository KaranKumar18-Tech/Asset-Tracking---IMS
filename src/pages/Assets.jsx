import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Badge, SectionTitle } from '../components/ui'
import { ASSETS } from '../data/mockData'

const TYPES    = ['All Types',    'Bar Counter', 'Backbar', 'POSM', 'Fabrication', 'Branding']
const CITIES   = ['All Cities',   'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune']
const STATUSES = ['All Status',   'active', 'transit', 'idle', 'missing']
const STATUS_LABEL = { active: 'Active', transit: 'In Transit', idle: 'Idle', missing: 'Missing' }

export default function Assets() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [typeF, setTypeF] = useState('All Types')
  const [cityF, setCityF] = useState('All Cities')
  const [statF, setStatF] = useState('All Status')

  const filtered = ASSETS.filter(a => {
    const q = query.toLowerCase()
    const matchQ = !q || JSON.stringify(a).toLowerCase().includes(q)
    const matchT = typeF === 'All Types'   || a.type === typeF
    const matchC = cityF === 'All Cities'  || a.loc.toLowerCase().includes(cityF.toLowerCase())
    const matchS = statF === 'All Status'  || a.status === statF
    return matchQ && matchT && matchC && matchS
  })

  const handleRow = (id) => nav(`/scan?id=${id}`)

  return (
    <div className="p-4 fade-in">
      <SectionTitle>Asset Registry — {filtered.length} assets</SectionTitle>

      {/* FILTERS */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emb-textsecondary" />
          <input
            className="input-base pl-8"
            placeholder="Search by name, ID, vendor, location..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { val: typeF, set: setTypeF, opts: TYPES },
            { val: cityF, set: setCityF, opts: CITIES },
            { val: statF, set: setStatF, opts: STATUSES },
          ].map((f, i) => (
            <select
              key={i}
              value={f.val}
              onChange={e => f.set(e.target.value)}
              className="input-base text-xs flex-shrink-0 w-auto cursor-pointer"
            >
              {f.opts.map(o => <option key={o} value={o}>{STATUS_LABEL[o] || o}</option>)}
            </select>
          ))}
        </div>
      </div>

      {/* TABLE — scrollable on mobile */}
      <div className="bg-white border border-emb-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse" style={{ minWidth: 720 }}>
            <thead>
              <tr className="bg-emb-surface border-b border-emb-border">
                {['RFID / QR ID','Asset Name','Type','Location','Vendor','Last Scan','Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-semibold text-emb-textsecondary uppercase tracking-wider px-3 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-emb-textsecondary text-sm">No assets match your filters</td></tr>
              ) : filtered.map((a, i) => (
                <tr
                  key={a.id}
                  onClick={() => handleRow(a.id)}
                  className={`border-b border-emb-border hover:bg-emb-light cursor-pointer transition-colors last:border-0 ${i % 2 === 1 ? 'bg-emb-surface' : 'bg-white'}`}
                >
                  <td className="px-3 py-2.5 font-mono text-[10px] text-emb-green">{a.id}</td>
                  <td className="px-3 py-2.5 font-medium text-emb-textprimary">{a.name}</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-emb-purple/15 text-emb-purple border border-emb-purple/30 text-[10px] px-1.5 py-0.5 rounded">
                      {a.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-emb-textprimary">{a.loc}</td>
                  <td className="px-3 py-2.5 text-emb-textsecondary">{a.vendor}</td>
                  <td className="px-3 py-2.5 font-mono text-[10px] text-emb-textsecondary">{a.scan}</td>
                  <td className="px-3 py-2.5"><Badge status={a.status}>{STATUS_LABEL[a.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
