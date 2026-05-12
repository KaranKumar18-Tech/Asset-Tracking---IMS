import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Clock, CalendarX, Bell } from 'lucide-react'
import { SectionTitle } from '../components/ui'
import { ALERTS } from '../data/mockData'
import { useNotifications } from '../hooks/useNotifications'

const CONFIG = {
  missing: { icon: AlertTriangle, color: '#ef4444', bg: 'bg-red-500/8',   border: 'border-l-red-500'   },
  idle:    { icon: Clock,         color: '#f59e0b', bg: 'bg-amber-500/8', border: 'border-l-amber-500' },
  overdue: { icon: CalendarX,     color: '#60a5fa', bg: 'bg-blue-500/8',  border: 'border-l-blue-500'  },
}

export default function Alerts() {
  const nav = useNavigate()
  const { simulateAlert } = useNotifications()

  const counts = {
    missing: ALERTS.filter(a => a.type === 'missing').length,
    idle:    ALERTS.filter(a => a.type === 'idle').length,
    overdue: ALERTS.filter(a => a.type === 'overdue').length,
  }

  return (
    <div className="p-4 fade-in">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>Active Alerts — {ALERTS.length} Total</SectionTitle>
        <button
          onClick={() => simulateAlert('Rum Brand Standee', 'Hyderabad')}
          className="flex items-center gap-1.5 px-3 py-2 border border-emb-green text-emb-green font-semibold rounded-lg text-xs hover:bg-emb-light active:scale-95 transition-all"
        >
          <Bell size={14} />
          Test Notification
        </button>
      </div>

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
