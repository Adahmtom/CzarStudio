'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Image, Video, Mail, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  bookings: { total: number; pending: number; confirmed: number }
  photos: { total: number; published: number }
  videos: { total: number; published: number }
  messages: { total: number; unread: number }
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    bookings: { total: 0, pending: 0, confirmed: 0 },
    photos: { total: 0, published: 0 },
    videos: { total: 0, published: 0 },
    messages: { total: 0, unread: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      
      // Fetch bookings
      const bookingsRes = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const bookings = bookingsRes.ok ? await bookingsRes.json() : []

      // Fetch contacts
      const contactsRes = await fetch('/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const contacts = contactsRes.ok ? await contactsRes.json() : []

      setStats({
        bookings: {
          total: bookings.length,
          pending: bookings.filter((b: any) => b.status === 'pending').length,
          confirmed: bookings.filter((b: any) => b.status === 'confirmed').length,
        },
        photos: { total: 16, published: 16 }, // Static for now
        videos: { total: 12, published: 12 }, // Static for now
        messages: {
          total: contacts.length,
          unread: contacts.filter((c: any) => c.status === 'new').length,
        },
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.bookings.total,
      subtitle: `${stats.bookings.pending} pending`,
      icon: Calendar,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      href: '/admin/bookings',
    },
    {
      title: 'Photos',
      value: stats.photos.total,
      subtitle: `${stats.photos.published} published`,
      icon: Image,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      href: '/admin/photos',
    },
    {
      title: 'Videos',
      value: stats.videos.total,
      subtitle: `${stats.videos.published} published`,
      icon: Video,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      href: '/admin/videos',
    },
    {
      title: 'Messages',
      value: stats.messages.total,
      subtitle: `${stats.messages.unread} unread`,
      icon: Mail,
      color: 'text-gold',
      bg: 'bg-gold/10',
      href: '/admin/messages',
    },
  ]

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Welcome Back!</h1>
        <p className="text-white/60">Here&apos;s what&apos;s happening with your studio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Link key={card.title} href={card.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 hover:border-gold/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.bg}`}>
                    <Icon className={card.color} size={24} />
                  </div>
                  <TrendingUp className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                  <p className="text-xs text-white/40">{card.subtitle}</p>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-white">Recent Bookings</h3>
            <Link href="/admin/bookings" className="text-gold hover:text-gold-light text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                <div>
                  <p className="text-white font-medium">Wedding - Sarah & Michael</p>
                  <p className="text-white/40 text-sm">March 15, 2024</p>
                </div>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-white">Recent Messages</h3>
            <Link href="/admin/messages" className="text-gold hover:text-gold-light text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-white/10 last:border-0">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">John Doe</p>
                  <p className="text-white/60 text-sm truncate">Interested in birthday package...</p>
                  <p className="text-white/40 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass p-6"
      >
        <h3 className="text-xl font-medium text-white mb-6">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/bookings">
            <button className="w-full px-6 py-3 bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all">
              View Bookings
            </button>
          </Link>
          <Link href="/admin/photos">
            <button className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              Manage Photos
            </button>
          </Link>
          <Link href="/admin/videos">
            <button className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              Manage Videos
            </button>
          </Link>
          <Link href="/admin/settings">
            <button className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              Settings
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
