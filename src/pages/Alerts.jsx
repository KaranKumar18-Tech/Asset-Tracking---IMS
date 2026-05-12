import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Clock, CalendarX } from 'lucide-react'
import { SectionTitle } from '../components/ui'
import { ALERTS } from '../data/mockData'

const CONFIG = {
  missing: { icon: AlertTriangle, color: '#ef4444', bg: 'bg-red-500/8',   border: 'border-l-red-500'   },
  idle:    { icon: Clock,         color: '#f59e0b', bg: 'bg-amber-500/8', border: 'border-l-amber-500' },
  overdue: { icon: CalendarX,     color: '#60a5fa', bg: 'bg-blue-500/8',  border: 'border-l-blue-500'  },
}

export default function Alerts() {
  const nav = useNavigate()

  const counts = {
    missing: ALERTS.filter(a => a.type === 'missing').length,
    idle:    ALERTS.filter(a => a.type === 'idle').length,
    overdue: ALERTS.filter(a => a.type === 'overdue').length,
  }

  return (
    <div className="p-4 fade-in">
      <SectionTitle>Active Alerts — {ALERTS.length} Total</SectionTitle>

      {/* SUMMARY PILLS */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 text-xs px-3 py-1.5 rounded-full font-semibold">
          🔴 {counts.missing} Missing
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs px-3 py-1.5 rounded-full font-semibold">
          🟡 {counts.idle} Idle
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs px-3 py-1.5 rounded-full font-semibold">
          🔵 {counts.overdue} Overdue
        </div>
      </div>

      {/* ALERT LIST */}
      <div className="space-y-2">
        {ALERTS.map((a, i) => {
          const { icon: Icon, color, border } = CONFIG[a.type]
          return (
            <div
              key={i}
              onClick={() => nav(`/scan?id=${a.id}`)}
              className={`bg-white border border-emb-border border-l-4 ${border} rounded-xl p-3.5 flex items-start gap-3 cursor-pointer hover:bg-emb-light transition-colors slide-up shadow-sm`}
            >
              <Icon size={18} style={{ color }} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-emb-textprimary leading-snug">{a.title}</div>
                <div className="text-xs text-emb-textsecondary mt-1 leading-snug">{a.desc}</div>
              </div>
              <div className="text-[10px] font-mono text-emb-textsecondary flex-shrink-0 text-right">{a.time}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
