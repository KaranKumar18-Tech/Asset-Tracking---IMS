import { useState, useEffect } from 'react'

const DEMO_USERS = [
  { email: 'admin@emb.global',   password: 'admin123',   role: 'admin',   name: 'Admin User'    },
  { email: 'manager@emb.global', password: 'manager123', role: 'manager', name: 'City Manager'  },
  { email: 'vendor@emb.global',  password: 'vendor123',  role: 'vendor',  name: 'Field Vendor'  },
]

const AUTH_KEY = 'assetpulse_user'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const userData = JSON.parse(stored)
        setUser(userData)
      } catch (e) {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setLoading(false)
  }, [])

  const signIn = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const userData = { email: found.email, role: found.role, name: found.name }
      setUser(userData)
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
      return { success: true, user: userData }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  return { user, loading, signIn, signOut }
}
