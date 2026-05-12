import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { useOfflineQueue } from '../hooks/useOfflineQueue'

export default function OfflineBanner() {
  const { isOnline, queue, syncQueue } = useOfflineQueue()
  const [showSyncBanner, setShowSyncBanner] = useState(false)
  const [wasPreviouslyOffline, setWasPreviouslyOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setWasPreviouslyOffline(true)
    }
  }, [isOnline])

  // Show sync banner when coming back online with pending items
  useEffect(() => {
    if (isOnline && wasPreviouslyOffline && queue.length > 0) {
      setShowSyncBanner(true)
      syncQueue()
      const timer = setTimeout(() => setShowSyncBanner(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline])

  // Offline banner
  if (!isOnline) {
    return (
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-amber-50 border-t-4 border-amber-500 px-4 py-3 flex items-center gap-3 z-40">
        <WifiOff size={18} className="text-amber-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900">You are offline</p>
          <p className="text-xs text-amber-700">Scans will sync when reconnected</p>
        </div>
      </div>
    )
  }

  // Sync banner (shown briefly when coming back online)
  if (showSyncBanner && queue.length > 0) {
    return (
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-emb-green/10 border-t-4 border-emb-green px-4 py-3 flex items-center gap-3 z-40 animate-pulse">
        <Wifi size={18} className="text-emb-green flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-emb-green">Back online</p>
          <p className="text-xs text-emb-green/80">Syncing {queue.length} pending scan{queue.length !== 1 ? 's' : ''}...</p>
        </div>
      </div>
    )
  }

  return null
}
