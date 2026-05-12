import { useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const TABS = [
  { id: '/',        label: 'Dashboard' },
  { id: '/assets',  label: 'Assets'    },
  { id: '/scan',    label: 'RFID Scan' },
  { id: '/alerts',  label: 'Alerts', badge: 4 },
]

export default function TopNav() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bg-emb-dark border-b border-emb-mid flex items-center justify-between px-5 py-2.5 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-emb-green flex items-center justify-center text-emb-dark font-black text-base select-none">E</div>
        <div>
          <div className="text-sm font-bold text-white leading-tight">AssetPulse</div>
          <div className="text-[10px] font-mono text-emb-med leading-tight">EMB GLOBAL · ASSET TRACKING PLATFORM</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => nav(t.id)}
            className={clsx(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer border-none',
              pathname === t.id
                ? 'bg-emb-mid text-emb-green'
                : 'bg-transparent text-emb-med hover:text-white hover:bg-white/5'
            )}
          >
            {t.label}
            {t.badge && (
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Live badge */}
      <div className="flex items-center gap-1.5 bg-emb-green/10 border border-emb-green/25 text-emb-green text-[10px] font-mono px-2.5 py-1 rounded-full">
        <div className="live-dot" />
        LIVE
      </div>
    </nav>
  )
}
