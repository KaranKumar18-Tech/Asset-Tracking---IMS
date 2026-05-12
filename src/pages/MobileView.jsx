import { useState } from 'react'
import { Home, ScanLine, Package, Bell, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionTitle, SimBadge } from '../components/ui'
import { MOBILE_ASSETS } from '../data/mockData'
import clsx from 'clsx'

const STATUS_COLOR = { active: '#47bf72', transit: '#60a5fa', idle: '#f59e0b', missing: '#ef4444' }
const STATUS_LABEL = { active: 'Checked In', transit: 'In Transit', idle: 'Pending Return', missing: 'Overdue' }

function PhoneScreen() {
  const [tab, setTab] = useState('home')
  const [scanned, setScanned] = useState(null)

  const doMobileScan = (asset) => {
    setScanned(asset)
    setTab('scan')
  }

  return (
    <div className="w-[260px] bg-emb-deep rounded-[32px] border-[5px] border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col" style={{ boxShadow: '0 0 0 1px #2a2a2a, 0 32px 60px rgba(0,0,0,0.7)' }}>
      {/* NOTCH */}
      <div className="bg-[#111] h-6 flex items-end justify-center pb-0.5">
        <div className="w-20 h-4 bg-black rounded-b-xl" />
      </div>

      {/* STATUS BAR */}
      <div className="bg-emb-dark flex justify-between items-center px-3 py-1">
        <span className="text-[10px] font-bold text-white">9:41</span>
        <span className="text-[9px] text-white">▲ ◉ 100%</span>
      </div>

      {/* HEADER */}
      <div className="bg-emb-dark border-b border-emb-mid px-3 py-2.5">
        <div className="text-sm font-bold text-white">AssetPulse</div>
        <div className="text-[9px] text-emb-med">Vendor A — Mumbai</div>
      </div>

      {/* BODY — scroll */}
      <div className="flex-1 overflow-y-auto bg-emb-deep px-2.5 py-2.5 space-y-2" style={{ maxHeight: 380 }}>
        {tab === 'home' && (
          <>
            <button
              onClick={() => setTab('scan')}
              className="w-full bg-emb-green text-emb-dark font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ScanLine size={16} /> Scan RFID / QR Tag
            </button>

            <div className="text-[9px] text-emb-med uppercase tracking-wider mt-1">Assets in My Custody (4)</div>

            {MOBILE_ASSETS.map(a => (
              <div key={a.id} onClick={() => doMobileScan(a)} className="bg-emb-dark border border-emb-mid rounded-lg p-2.5 cursor-pointer active:bg-emb-mid/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">{a.name}</span>
                  <span className="text-[9px] font-bold" style={{ color: STATUS_COLOR[a.status] }}>{STATUS_LABEL[a.status]}</span>
                </div>
                <div className="text-[9px] text-emb-med">{a.loc} · {a.scanned}</div>
              </div>
            ))}
          </>
        )}

        {tab === 'scan' && (
          <>
            {scanned ? (
              <div className="space-y-2">
                <div className="bg-emb-green/10 border border-emb-green/30 rounded-xl p-3">
                  <div className="text-[9px] font-mono text-emb-green mb-1">{scanned.id}</div>
                  <div className="text-xs font-bold text-white">{scanned.name}</div>
                  <div className="text-[9px] text-emb-med mt-0.5">{scanned.loc}</div>
                </div>
                <button onClick={() => alert('Check-in recorded!')} className="w-full bg-emb-green text-emb-dark font-bold rounded-lg py-2 text-xs flex items-center justify-center gap-1.5">
                  <CheckCircle size={13} /> Check In
                </button>
                <button onClick={() => alert('Asset dispatched!')} className="w-full border border-emb-green text-emb-green font-semibold rounded-lg py-2 text-xs flex items-center justify-center gap-1.5">
                  Check Out
                </button>
                <button onClick={() => { setScanned(null); setTab('home') }} className="w-full text-emb-med text-xs py-1">← Back</button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 border-2 border-dashed border-emb-green/40 rounded-xl mx-auto flex items-center justify-center">
                  <ScanLine size={24} className="text-emb-green/60" />
                </div>
                <div className="text-xs text-emb-med">Point camera at QR code<br />or tap an asset above</div>
              </div>
            )}
          </>
        )}

        {tab === 'alerts' && (
          <div className="space-y-2">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 flex items-start gap-2">
              <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white">Vodka Brand POSM — Overdue</div>
                <div className="text-[9px] text-emb-med">Return due 3 days ago</div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 flex items-start gap-2">
              <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white">Gin Brand Backbar — Idle</div>
                <div className="text-[9px] text-emb-med">No scan in 8 days</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bg-emb-dark border-t border-emb-mid flex">
        {[
          { id: 'home',   Icon: Home,    label: 'Home'   },
          { id: 'scan',   Icon: ScanLine,label: 'Scan'   },
          { id: 'assets', Icon: Package, label: 'Assets' },
          { id: 'alerts', Icon: Bell,    label: 'Alerts' },
        ].map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={clsx('flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[8px] border-none cursor-pointer transition-colors',
              tab === id ? 'text-emb-green bg-emb-green/5' : 'text-emb-med bg-transparent')}
          >
            <Icon size={15} strokeWidth={tab === id ? 2 : 1.5} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

const CAPABILITIES = [
  { icon: ScanLine,   label: 'Scan & Check-in',    desc: 'Scan RFID/QR to mark asset received', color: 'text-emb-green' },
  { icon: Package,    label: 'View My Custody',     desc: 'All assets assigned to this vendor',  color: 'text-emb-green' },
  { icon: CheckCircle,label: 'Check-out / Return',  desc: 'Mark asset dispatched or returned',   color: 'text-blue-400'  },
  { icon: Bell,       label: 'Overdue Alerts',      desc: 'Notified when past return deadline',  color: 'text-amber-400' },
]

const ROLES = [
  { role: 'Admin',            desc: 'Full access · All cities · All vendors', badge: 'Admin',   bc: 'badge-active'  },
  { role: 'City Manager',     desc: 'City-level view · Assigned vendors',     badge: 'Manager', bc: 'badge-transit' },
  { role: 'Vendor / Field',   desc: 'Mobile only · Own custody assets',       badge: 'Field',   bc: 'badge-checkin' },
]

export default function MobileView() {
  return (
    <div className="p-4 fade-in">
      <SimBadge />
      <SectionTitle>Mobile Field App — Vendor / On-ground View</SectionTitle>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* PHONE */}
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
          <PhoneScreen />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 space-y-3">
          <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm">
            <div className="card-title">What field teams can do on mobile</div>
            <div className="grid grid-cols-2 gap-2">
              {CAPABILITIES.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="bg-emb-light rounded-lg p-3">
                  <div className={clsx('text-xs font-semibold mb-1 flex items-center gap-1.5', color)}>
                    <Icon size={13} /> {label}
                  </div>
                  <div className="text-[11px] text-emb-textsecondary">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm">
            <div className="card-title">Role-based access</div>
            <div className="space-y-2">
              {ROLES.map(r => (
                <div key={r.role} className="flex items-center justify-between bg-emb-light rounded-lg px-3 py-2.5">
                  <div>
                    <div className="text-xs font-semibold text-emb-textprimary">{r.role}</div>
                    <div className="text-[10px] text-emb-textsecondary">{r.desc}</div>
                  </div>
                  <span className={clsx('badge', r.bc === 'badge-checkin'
                    ? 'bg-emb-purple/20 text-emb-purple border-emb-purple/30'
                    : r.bc)}>{r.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
