import { useState, useEffect } from 'react'

// To test offline support:
// 1. Open the app in Chrome DevTools
// 2. Go to Network tab → set to "Offline"
// 3. Scan an asset on the Scan page
// 4. You should see "Offline — scan queued" toast
// 5. Check the browser console → see offline queue in localStorage
// 6. Switch Network back to "Online"
// 7. You should see "Back online — syncing X pending scans..." banner
// 8. Queue will clear after simulated API call

const QUEUE_KEY = 'assetpulse_offline_queue'

export function useOfflineQueue() {
  const [queue, setQueue] = useState(() => {
    const stored = localStorage.getItem(QUEUE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const addToQueue = (scanEvent) => {
    const newEvent = {
      id: Date.now().toString(),
      action: scanEvent.action,
      assetId: scanEvent.assetId,
      timestamp: scanEvent.timestamp || Date.now(),
    }

    const updated = [...queue, newEvent]
    setQueue(updated)
    localStorage.setItem(QUEUE_KEY, JSON.stringify(updated))
    console.log('Added to offline queue:', newEvent)
  }

  const syncQueue = async () => {
    if (queue.length === 0) return

    console.log(`Syncing ${queue.length} offline events:`, queue)

    // Simulate API call with 1.5s delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Log each event as if it was sent to backend
    queue.forEach(event => {
      console.log(`[SYNCED] ${event.action} for asset ${event.assetId} at ${new Date(event.timestamp).toISOString()}`)
    })

    // Clear the queue
    setQueue([])
    localStorage.removeItem(QUEUE_KEY)
    console.log('Offline queue synced and cleared')
  }

  return { queue, isOnline, addToQueue, syncQueue }
}
