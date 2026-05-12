import { useState, useEffect } from 'react'
import { getToken, onMessage, messaging } from '../lib/firebase'

export function useNotifications() {
  const [permission, setPermission] = useState(Notification.permission)
  const [fcmToken, setFcmToken] = useState(null)

  // Listen for foreground messages
  useEffect(() => {
    if (permission === 'granted' && messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        const { title, body } = payload.notification
        new Notification(title, { body, icon: '/icon-192.png' })
      })
      return () => unsubscribe()
    }
  }, [permission])

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === 'granted' && messaging) {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })
        setFcmToken(token)
        console.log('FCM Token:', token)
        console.log('Send this token to your backend and use it to target notifications to this device.')
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error)
    }
  }

  const simulateAlert = (assetName, city) => {
    if (permission === 'granted') {
      new Notification('⚠ Asset Alert — AssetPulse', {
        body: `${assetName} has not been scanned in 10+ days — ${city}`,
        icon: '/icon-192.png',
      })
    } else {
      alert('Notification permission not granted. Enable in browser settings.')
    }
  }

  return { permission, fcmToken, requestPermission, simulateAlert }
}
