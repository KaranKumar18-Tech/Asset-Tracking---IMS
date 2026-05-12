import { useState, useEffect } from 'react'

const DEMO_USERS = [
  { email: 'admin@emb.global',   password: 'admin123',   role: 'admin',   name: 'Admin User'    },
  { email: 'manager@emb.global', password: 'manager123', role: 'manager', name: 'City Manager'  },
  { email: 'vendor@emb.global',  password: 'vendor123',  role: 'vendor',  name: 'Field Vendor'  },
]

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('auth_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        localStorage.removeItem('auth_user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const userData = { email: found.email, role: found.role, name: found.name }
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return { user, loading, signIn, signOut }
}
