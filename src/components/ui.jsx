import clsx from 'clsx'

export function Badge({ status, children }) {
  const cls = {
    active:  'badge-active',
    transit: 'badge-transit',
    idle:    'badge-idle',
    missing: 'badge-missing',
  }
  return <span className={clsx('badge', cls[status] || 'badge-idle')}>{children || status}</span>
}

export function Card({ title, children, className = '', noPad = false }) {
  return (
    <div className={clsx('card', noPad ? 'p-0 overflow-hidden' : '', className)}>
      {title && <div className="card-title px-4 pt-4">{title}</div>}
      {children}
    </div>
  )
}

export function StatCard({ label, value, sub, subColor = 'text-emb-textsecondary', accent, borderAccent }) {
  return (
    <div className={clsx('bg-white border border-emb-border rounded-xl p-4 shadow-sm', borderAccent)}>
      <div className="text-[11px] text-emb-textsecondary mb-1">{label}</div>
      <div className={clsx('text-2xl font-bold leading-none', accent || 'text-emb-textprimary')}>{value}</div>
      {sub && <div className={clsx('text-[11px] mt-1', subColor)}>{sub}</div>}
    </div>
  )
}

export function SectionTitle({ children }) {
  return (
    <div className="text-[11px] font-semibold text-emb-textsecondary uppercase tracking-widest mb-3">
      {children}
    </div>
  )
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-emb-textsecondary gap-2">
      {Icon && <Icon size={32} strokeWidth={1} />}
      <p className="text-sm">{message}</p>
    </div>
  )
}

export function SimBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-dashed border-amber-500/40 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded mb-3">
      ⚙ SIMULATED — Demo Mode
    </div>
  )
}
