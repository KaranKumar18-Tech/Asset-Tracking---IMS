import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const DEMO_CREDENTIALS = [
  { email: 'admin@emb.global', password: 'admin123', role: 'Admin' },
  { email: 'manager@emb.global', password: 'manager123', role: 'City Manager' },
  { email: 'vendor@emb.global', password: 'vendor123', role: 'Field Vendor' },
]

export default function Login() {
  const nav = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600))

    const result = signIn(email, password)
    setLoading(false)

    if (result.success) {
      if (result.user.role === 'vendor') {
        nav('/mobile')
      } else {
        nav('/')
      }
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-emb-light flex items-center justify-center p-4">
      <div className="bg-white border border-emb-border rounded-2xl shadow-lg p-8 w-full max-w-96">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emb-green flex items-center justify-center text-white font-black text-lg">
            E
          </div>
          <div>
            <div className="font-bold text-lg text-emb-textprimary">AssetPulse</div>
            <div className="text-[10px] font-mono text-emb-textsecondary">EMB GLOBAL</div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <p className="text-xs text-emb-textsecondary">Asset Tracking Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4 mb-6">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-emb-textprimary mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input-base"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-emb-textprimary mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-base pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emb-textsecondary hover:text-emb-textprimary transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emb-green hover:bg-emb-green/90 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="border-t border-emb-border pt-6">
          <p className="text-[10px] font-semibold text-emb-textsecondary uppercase tracking-wide mb-3 text-center">
            Demo Credentials
          </p>
          <div className="space-y-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <div
                key={cred.email}
                className="bg-emb-surface border border-emb-border rounded-lg px-3 py-2 cursor-pointer hover:border-emb-green transition-colors"
                onClick={() => {
                  setEmail(cred.email)
                  setPassword(cred.password)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    <div className="font-mono text-emb-green font-semibold">{cred.email}</div>
                    <div className="text-[10px] text-emb-textsecondary">{cred.password}</div>
                  </div>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emb-green/10 border border-emb-green/25">
                    <span className="text-[10px] font-semibold text-emb-green">{cred.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-emb-textsecondary mt-3 text-center">
            Click any credential to auto-fill
          </p>
        </div>
      </div>
    </div>
  )
}
