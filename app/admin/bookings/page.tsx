'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, Phone, MapPin, Clock, Check, X, Trash2, Eye, Plus } from 'lucide-react'

interface Booking {
  id: string
  name: string
  email: string
  phone: string | null
  eventType: string
  eventDate: string
  eventTime: string
  location: string | null
  message: string | null
  status: string
  createdAt: string
}

const eventTypes = ['Wedding', 'Birthday', 'Retirement', 'Corporate', 'Social', 'Other']

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createFormData, setCreateFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    eventDate: '',
    eventTime: '',
    location: '',
    message: '',
  })

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const url = filter === 'all' 
        ? '/api/bookings' 
        : `/api/bookings?status=${filter}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const createBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createFormData),
      })

      if (response.ok) {
        fetchBookings()
        setShowCreateModal(false)
        setCreateFormData({
          name: '',
          email: '',
          phone: '',
          eventType: 'Wedding',
          eventDate: '',
          eventTime: '',
          location: '',
          message: '',
        })
        alert('Booking created successfully!')
      } else {
        alert('Error creating booking')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Error creating booking')
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        fetchBookings()
        setSelectedBooking(null)
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/bookings?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchBookings()
        setSelectedBooking(null)
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/30'
      default: return 'text-white/60 bg-white/5 border-white/10'
    }
  }

  const filteredBookings = bookings
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Confirmed</p>
          <p className="text-3xl font-bold text-green-400">{stats.confirmed}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Cancelled</p>
          <p className="text-3xl font-bold text-red-400">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters and Create Button */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
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
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Create Booking
        </button>
      </div>

      {/* Bookings List */}
      <div className="glass">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Client</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Event</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Date & Time</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-white/40">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{booking.name}</p>
                        <p className="text-white/40 text-sm">{booking.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{booking.eventType}</p>
                      {booking.location && (
                        <p className="text-white/40 text-sm">{booking.location}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-white">
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </p>
                      <p className="text-white/40 text-sm">{booking.eventTime}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                          title="View details"
                        >
                          <Eye size={16} className="text-white/60" />
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="p-2 hover:bg-green-400/10 rounded transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} className="text-green-400" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 hover:bg-red-400/10 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setSelectedBooking(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-serif text-white">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)}>
                <X className="text-white/60 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="text-gold mt-1" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Client Name</p>
                  <p className="text-white">{selectedBooking.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-gold mt-1" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white">{selectedBooking.email}</p>
                </div>
              </div>

              {selectedBooking.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="text-gold mt-1" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white">{selectedBooking.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Calendar className="text-gold mt-1" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Event Type</p>
                  <p className="text-white">{selectedBooking.eventType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-gold mt-1" size={20} />
                <div>
                  <p className="text-white/60 text-sm">Date & Time</p>
                  <p className="text-white">
                    {new Date(selectedBooking.eventDate).toLocaleDateString()} at {selectedBooking.eventTime}
                  </p>
                </div>
              </div>

              {selectedBooking.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="text-gold mt-1" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white">{selectedBooking.location}</p>
                  </div>
                </div>
              )}

              {selectedBooking.message && (
                <div className="flex items-start gap-3">
                  <Mail className="text-gold mt-1" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Message</p>
                    <p className="text-white">{selectedBooking.message}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">Current Status</p>
                <span className={`px-4 py-2 rounded-full text-sm border ${getStatusColor(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Confirm Booking
                </button>
              )}
              {selectedBooking.status !== 'cancelled' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                  className="flex-1 px-6 py-3 bg-red-500/20 text-red-400 border border-red-400/30 rounded hover:bg-red-500/30 transition-colors"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Booking Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={() => setShowCreateModal(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-serif text-white">Create New Booking</h2>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="text-white/60 hover:text-white" />
              </button>
            </div>

            <form onSubmit={createBooking} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    CLIENT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={createFormData.name}
                    onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={createFormData.email}
                    onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    value={createFormData.phone}
                    onChange={(e) => setCreateFormData({ ...createFormData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    EVENT TYPE *
                  </label>
                  <select
                    required
                    value={createFormData.eventType}
                    onChange={(e) => setCreateFormData({ ...createFormData, eventType: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    EVENT DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={createFormData.eventDate}
                    onChange={(e) => setCreateFormData({ ...createFormData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    EVENT TIME *
                  </label>
                  <input
                    type="time"
                    required
                    value={createFormData.eventTime}
                    onChange={(e) => setCreateFormData({ ...createFormData, eventTime: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  LOCATION
                </label>
                <input
                  type="text"
                  value={createFormData.location}
                  onChange={(e) => setCreateFormData({ ...createFormData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="Toronto, ON"
                />
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  MESSAGE / NOTES
                </label>
                <textarea
                  value={createFormData.message}
                  onChange={(e) => setCreateFormData({ ...createFormData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all resize-none"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors"
                >
                  Create Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
