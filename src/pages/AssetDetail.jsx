import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, CheckCircle, LogOut, AlertTriangle, Printer } from 'lucide-react'
import { Badge, SimBadge } from '../components/ui'
import { RFID_DETAIL, ASSETS } from '../data/mockData'
import clsx from 'clsx'

const STATUS_LABEL = { active: 'Active', transit: 'In Transit', idle: 'Idle', missing: 'Missing' }

export default function AssetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const asset = ASSETS.find(a => a.id === id)
  const detail = RFID_DETAIL[id]

  if (!asset) {
    return (
      <div className="p-4 fade-in">
        <SimBadge />
        <button onClick={() => navigate('/assets')} className="flex items-center gap-1 text-emb-textsecondary hover:text-emb-green transition-colors mb-4">
          <ChevronLeft size={16} />
          <span className="text-xs font-medium">Back</span>
        </button>
        <div className="bg-white border border-emb-border rounded-xl p-8 text-center text-emb-textsecondary">
          Asset not found
        </div>
      </div>
    )
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const timeline = detail?.timeline || []

  return (
    <div className="p-4 fade-in">
      <SimBadge />

      {/* HEADER ROW */}
      <div className="flex items-start gap-4 mb-6">
        <button
          onClick={() => navigate('/assets')}
          className="flex items-center gap-1 text-emb-textsecondary hover:text-emb-green transition-colors flex-shrink-0 mt-1"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-2xl font-bold text-emb-textprimary">{asset.name}</h1>
            <span className="bg-emb-green/10 text-emb-green border border-emb-green/25 text-[10px] px-2.5 py-1 rounded-full font-mono">
              {id}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Badge status={asset.status}>{STATUS_LABEL[asset.status]}</Badge>
        </div>
      </div>

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="space-y-4">
          <div className="bg-white border border-emb-border rounded-xl p-6 animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-emb-surface rounded w-3/4" />
            ))}
          </div>
          <div className="bg-white border border-emb-border rounded-xl p-6 h-64 animate-pulse" />
        </div>
      ) : (
        <>
          {/* INFO GRID */}
          <div className="bg-white border border-emb-border rounded-xl p-6 shadow-sm mb-4 slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['Asset Type', asset.type],
                ['Current Location', asset.loc],
                ['Vendor Custody', asset.vendor],
                ['Assigned Event', asset.event],
                ['Weight', detail?.weight || 'N/A'],
                ['Tagged Since', detail?.added || 'N/A'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-xs font-semibold text-emb-textsecondary uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  <div className="text-sm font-medium text-emb-textprimary">{value}</div>
                </div>
              ))}
              <div>
                <div className="text-xs font-semibold text-emb-textsecondary uppercase tracking-wider mb-1">
                  Last Scan
                </div>
                <div className="text-sm font-medium text-emb-textprimary font-mono">{asset.scan}</div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 slide-up">
            <button
              onClick={() => showToast('✓ Check-in recorded successfully')}
              className="bg-emb-green text-white font-semibold rounded-lg px-3 py-2.5 text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <CheckCircle size={14} />
              <span className="hidden sm:inline">Check In</span>
              <span className="sm:hidden">Check In</span>
            </button>

            <button
              onClick={() => showToast('Asset marked as dispatched')}
              className="border border-emb-green text-emb-green font-semibold rounded-lg px-3 py-2.5 text-xs flex items-center justify-center gap-1.5 hover:bg-emb-light active:scale-95 transition-all"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Check Out</span>
              <span className="sm:hidden">Check Out</span>
            </button>

            <button
              onClick={() => showToast('⚠ Asset flagged as missing')}
              className="border border-red-500 text-red-600 font-semibold rounded-lg px-3 py-2.5 text-xs flex items-center justify-center gap-1.5 hover:bg-red-50 active:scale-95 transition-all"
            >
              <AlertTriangle size={14} />
              <span className="hidden sm:inline">Flag Missing</span>
              <span className="sm:hidden">Flag</span>
            </button>

            <button
              onClick={() => showToast('QR label ready to print')}
              className="border border-gray-300 text-gray-600 font-semibold rounded-lg px-3 py-2.5 text-xs flex items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print QR</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>

          {/* MOVEMENT HISTORY */}
          {timeline.length > 0 && (
            <div className="bg-white border border-emb-border rounded-xl p-6 shadow-sm slide-up">
              <h2 className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-wider mb-4">
                Full Movement History
              </h2>
              <div className="space-y-0">
                {timeline.map((t, i) => (
                  <div key={i} className="flex gap-3 pb-4 relative last:pb-0">
                    {i < timeline.length - 1 && (
                      <div
                        className="absolute left-[6px] top-4 w-px bg-emb-border"
                        style={{ height: 'calc(100% - 4px)' }}
                      />
                    )}
                    <div
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 border-2 flex items-center justify-center"
                      style={{ borderColor: t.color, background: t.color + '22' }}
                    >
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
          )}
        </>
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
