import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import Dashboard  from './pages/Dashboard'
import Assets     from './pages/Assets'
import Scan       from './pages/Scan'
import Alerts     from './pages/Alerts'
import MobileView from './pages/MobileView'

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Desktop top nav — hidden on mobile */}
      <div className="hidden md:block">
        <TopNav />
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"       element={<Dashboard  />} />
          <Route path="/assets" element={<Assets     />} />
          <Route path="/scan"   element={<Scan       />} />
          <Route path="/alerts" element={<Alerts     />} />
          <Route path="/mobile" element={<MobileView />} />
          <Route path="*"       element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile bottom nav — hidden on desktop */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
