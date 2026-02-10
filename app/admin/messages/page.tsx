'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Trash2, Eye, Check, X } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: string
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)

  const fetchMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const url = filter === 'all' 
        ? '/api/contacts' 
        : `/api/contacts?status=${filter}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/contacts', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        fetchMessages()
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status })
        }
      }
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/contacts?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchMessages()
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'replied': return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'read': return 'text-blue-400 bg-blue-400/10 border-blue-400/30'
      case 'new': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      default: return 'text-white/60 bg-white/5 border-white/10'
    }
  }

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading messages...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Total Messages</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">New</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.new}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Read</p>
          <p className="text-3xl font-bold text-blue-400">{stats.read}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Replied</p>
          <p className="text-3xl font-bold text-green-400">{stats.replied}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'new', 'read', 'replied'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm rounded transition-all ${
              filter === status
                ? 'bg-gold text-dark'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="glass">
        <div className="divide-y divide-white/5">
          {messages.length === 0 ? (
            <div className="text-center p-8 text-white/40">
              No messages found
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-white/5 transition-colors cursor-pointer ${
                  message.status === 'new' ? 'bg-white/[0.02]' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message)
                  if (message.status === 'new') {
                    updateStatus(message.id, 'read')
                  }
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{message.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{message.email}</p>
                    <p className="text-white/80 line-clamp-2">{message.message}</p>
                    <p className="text-white/40 text-xs mt-2">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMessage(message)
                      }}
                      className="p-2 hover:bg-white/10 rounded transition-colors"
                      title="View"
                    >
                      <Eye size={16} className="text-white/60" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteMessage(message.id)
                      }}
                      className="p-2 hover:bg-red-400/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setSelectedMessage(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-serif text-white">Message Details</h2>
              <button onClick={() => setSelectedMessage(null)}>
                <X className="text-white/60 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-sm mb-1">From</p>
                <p className="text-white text-lg">{selectedMessage.name}</p>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-1">Email</p>
                <a href={`mailto:${selectedMessage.email}`} className="text-gold hover:text-gold-light">
                  {selectedMessage.email}
                </a>
              </div>

              {selectedMessage.phone && (
                <div>
                  <p className="text-white/60 text-sm mb-1">Phone</p>
                  <a href={`tel:${selectedMessage.phone}`} className="text-gold hover:text-gold-light">
                    {selectedMessage.phone}
                  </a>
                </div>
              )}

              <div>
                <p className="text-white/60 text-sm mb-1">Message</p>
                <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-1">Received</p>
                <p className="text-white">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">Status</p>
                <span className={`px-4 py-2 rounded-full text-sm border ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a
                href={`mailto:${selectedMessage.email}`}
                className="flex-1 px-6 py-3 bg-gold text-dark text-center rounded hover:bg-gold-light transition-colors"
                onClick={() => updateStatus(selectedMessage.id, 'replied')}
              >
                Reply via Email
              </a>
              {selectedMessage.status !== 'replied' && (
                <button
                  onClick={() => updateStatus(selectedMessage.id, 'replied')}
                  className="px-6 py-3 bg-green-500/20 text-green-400 border border-green-400/30 rounded hover:bg-green-500/30 transition-colors"
                >
                  Mark as Replied
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
