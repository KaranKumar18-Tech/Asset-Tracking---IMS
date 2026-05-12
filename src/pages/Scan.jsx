import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Wifi, CheckCircle, LogOut, ChevronLeft } from 'lucide-react'
import { Badge, SectionTitle, SimBadge } from '../components/ui'
import { RFID_DETAIL } from '../data/mockData'
import { useOfflineQueue } from '../hooks/useOfflineQueue'
import clsx from 'clsx'

const STATUS_LABEL = { active: 'Active', transit: 'In Transit', idle: 'Idle', missing: 'Missing' }
const QUICK = [
  { id: 'RFID-DG-0042', label: 'Premium Whisky Counter'     },
  { id: 'RFID-DG-0118', label: 'Vodka Brand POSM'      },
  { id: 'RFID-DG-0205', label: 'Whisky Brand Backbar'  },
  { id: 'RFID-DG-0391', label: 'Missing Asset', danger: true },
]

export default function Scan() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { isOnline, addToQueue, syncQueue } = useOfflineQueue()
  const [input, setInput]       = useState(params.get('id') || 'RFID-DG-0042')
  const [result, setResult]     = useState(null)
  const [scanning, setScanning] = useState(false)
  const [toast, setToast]       = useState(null)

  useEffect(() => {
    const id = params.get('id')
    if (id) { setInput(id); doScan(id) }
    else doScan('RFID-DG-0042')
  }, [])

  // Sync queue when coming back online
  useEffect(() => {
    if (isOnline) {
      syncQueue()
    }
  }, [isOnline])

  const doScan = (id) => {
    const target = id || input
    setScanning(true)
    setTimeout(() => {
      setResult(RFID_DETAIL[target] || null)
      setScanning(false)
    }, 600)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="p-4 fade-in">
      <SimBadge />
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-emb-textsecondary hover:text-emb-green transition-colors mb-2"
      >
        <ChevronLeft size={16} />
        <span className="text-xs font-medium">Back</span>
      </button>
      <SectionTitle>RFID / QR Asset Scanner</SectionTitle>

      {/* INPUT ROW */}
      <div className="flex gap-2 mb-3">
        <input
          className="input-base font-mono text-sm flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter RFID tag ID..."
          onKeyDown={e => e.key === 'Enter' && doScan()}
        />
        <button className="btn-primary flex items-center gap-1.5 flex-shrink-0" onClick={() => doScan()}>
          <Wifi size={15} />
          Scan
        </button>
      </div>

      {/* QUICK LOAD */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK.map(q => (
          <button
            key={q.id}
            onClick={() => { setInput(q.id); doScan(q.id) }}
            className={clsx(
              'text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium',
              q.danger
                ? 'bg-red-500/10 text-red-600 border-red-500/30 hover:bg-red-500/20'
                : 'bg-emb-light text-emb-green border-emb-border hover:border-emb-green'
            )}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* SCANNING STATE */}
      {scanning && (
        <div className="flex items-center gap-3 bg-white border border-emb-border rounded-xl p-4 mb-4 shadow-sm">
          <div className="w-5 h-5 border-2 border-emb-green border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-emb-textsecondary">Reading RFID tag...</span>
        </div>
      )}

      {/* NO RESULT */}
      {!scanning && result === null && (
        <div className="bg-white border border-emb-border rounded-xl p-6 text-center text-emb-textsecondary text-sm shadow-sm">
          No asset found for ID: <span className="font-mono text-emb-green">{input}</span>
        </div>
      )}

      {/* RESULT */}
      {!scanning && result && (
        <div className="space-y-3 slide-up">
          {/* RFID CHIP HEADER */}
          <div className="bg-gradient-to-r from-emb-green to-emb-med rounded-xl p-3.5 flex items-center gap-3">
            <Wifi size={22} className="text-emb-dark flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm font-semibold text-emb-dark truncate">{input}</div>
              <div className="text-[10px] text-emb-dark/70">RFID Tag · Asset Identified</div>
            </div>
            <Badge status={result.status}>{STATUS_LABEL[result.status]}</Badge>
          </div>

          {/* TWO-COL DETAIL + TIMELINE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* DETAIL CARD */}
            <div className="bg-white border border-emb-border rounded-xl p-4 space-y-2 shadow-sm">
              <div className="text-sm font-bold text-emb-textprimary mb-3">{result.name}</div>
              {[
                ['Asset Type',       result.type   ],
                ['Current Location', result.loc    ],
                ['Vendor Custody',   result.vendor ],
                ['Assigned Event',   result.event  ],
                ['Weight',           result.weight ],
                ['Tagged Since',     result.added  ],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs py-1.5 border-b border-emb-border last:border-0">
                  <span className="text-emb-textsecondary">{k}</span>
                  <span className="text-emb-textprimary font-medium text-right ml-2">{v}</span>
                </div>
              ))}
              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3 pt-1">
                <button
                  className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                  onClick={() => {
                    if (isOnline) {
                      showToast('✓ Check-in recorded successfully')
                    } else {
                      addToQueue({ assetId: input, action: 'checkin' })
                      showToast('⚠ Offline — scan queued, will sync when reconnected')
                    }
                  }}
                >
                  <CheckCircle size={14} /> Check In
                </button>
                <button
                  className="btn-outline flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                  onClick={() => {
                    if (isOnline) {
                      showToast('Asset marked as dispatched')
                    } else {
                      addToQueue({ assetId: input, action: 'checkout' })
                      showToast('⚠ Offline — scan queued, will sync when reconnected')
                    }
                  }}
                >
                  <LogOut size={14} /> Check Out
                </button>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-white border border-emb-border rounded-xl p-4 shadow-sm">
              <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-3">Movement History</div>
              <div className="space-y-0">
                {result.timeline.map((t, i) => (
                  <div key={i} className="flex gap-2.5 pb-3 relative">
                    {i < result.timeline.length - 1 && (
                      <div className="absolute left-[6px] top-4 w-px bg-emb-border" style={{ height: 'calc(100% - 4px)' }} />
                    )}
                    <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 border-2 flex items-center justify-center" style={{ borderColor: t.color, background: t.color + '22' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-emb-textprimary leading-snug">{t.title}</div>
                      <div className="text-[10px] text-emb-textsecondary mt-0.5 leading-snug">{t.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emb-green text-emb-dark text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-50 slide-up">
          {toast}
        </div>
      )}
    </div>
  )
}
