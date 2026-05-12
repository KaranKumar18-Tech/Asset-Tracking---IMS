import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ScanLine, Bell, Smartphone } from 'lucide-react'
import clsx from 'clsx'

const ITEMS = [
  { id: '/',        label: 'Home',    Icon: LayoutDashboard },
  { id: '/assets',  label: 'Assets',  Icon: Package         },
  { id: '/scan',    label: 'Scan',    Icon: ScanLine        },
  { id: '/alerts',  label: 'Alerts',  Icon: Bell            },
  { id: '/mobile',  label: 'Field',   Icon: Smartphone      },
]

export default function BottomNav() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bg-emb-dark border-t border-emb-mid flex safe-area-pb">
      {ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => nav(id)}
          className={clsx('nav-item', pathname === id && 'active border-t-2 border-emb-green')}
        >
          <Icon size={20} strokeWidth={pathname === id ? 2 : 1.5} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
