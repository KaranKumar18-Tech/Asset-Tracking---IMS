import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import OfflineBanner from './components/OfflineBanner'
import Login        from './pages/Login'
import Dashboard    from './pages/Dashboard'
import Assets       from './pages/Assets'
import AssetDetail  from './pages/AssetDetail'
import Scan         from './pages/Scan'
import Alerts       from './pages/Alerts'
import Reports      from './pages/Reports'
import MobileView   from './pages/MobileView'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-emb-light flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-emb-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Auth guard: check both React state and localStorage
  const storedUser = localStorage.getItem('assetpulse_user')
  const isAuthenticated = user && storedUser

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Desktop top nav — hidden on mobile */}
      <div className="hidden md:block">
        <TopNav />
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"           element={<Dashboard    />} />
          <Route path="/assets"     element={<Assets       />} />
          <Route path="/assets/:id" element={<AssetDetail  />} />
          <Route path="/scan"       element={<Scan         />} />
          <Route path="/alerts"     element={<Alerts       />} />
          <Route path="/reports"    element={<Reports      />} />
          <Route path="/mobile"     element={<MobileView   />} />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Offline banner — fixed at bottom above nav */}
      <OfflineBanner />

      {/* Mobile bottom nav — hidden on desktop */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
