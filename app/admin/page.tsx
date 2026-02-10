'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Store token
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (error) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl tracking-[0.2em] text-gold mb-4">
            CZAR STUDIO
          </h1>
          <p className="text-white/60 tracking-[0.15em] text-sm">ADMIN PORTAL</p>
        </div>

        <div className="glass p-8 lg:p-12">
          <h2 className="font-serif text-3xl mb-8">Sign In</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="admin@czarstudio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-10 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-white/40 hover:text-gold text-sm transition-colors">
              ← Back to Website
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-white/40 text-xs">
          <p>Demo Credentials:</p>
          <p>Email: admin@czarstudio.com</p>
          <p>Password: admin123</p>
        </div>
      </motion.div>
    </div>
  )
}
