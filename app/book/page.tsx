'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const eventTypes = [
  { value: 'wedding', label: 'Wedding', icon: '💒' },
  { value: 'birthday', label: 'Birthday Party', icon: '🎂' },
  { value: 'retirement', label: 'Retirement Party', icon: '🎉' },
  { value: 'corporate', label: 'Corporate Event', icon: '💼' },
  { value: 'social', label: 'Social Gathering', icon: '🥂' },
  { value: 'other', label: 'Other Event', icon: '📸' },
]

export default function Book() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', eventDate: '', eventTime: '', location: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Booking request submitted! We will contact you within 24 hours to confirm details.')
        setFormData({ name: '', email: '', phone: '', eventType: '', eventDate: '', eventTime: '', location: '', message: '' })
      } else {
        alert('There was an error submitting your booking. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      <section className="py-16 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] mb-4">
            BOOK YOUR EVENT
          </motion.h1>
          <p className="text-lg text-white/70">Let&apos;s create something extraordinary together</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl mb-6">What type of event?</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {eventTypes.map((type) => (
                  <button key={type.value} type="button" onClick={() => setFormData({ ...formData, eventType: type.value })} className={`p-6 border text-left transition-all ${formData.eventType === type.value ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-white/30 bg-white/[0.02]'}`}>
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <div className="font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">EVENT DATE *</label>
                <input type="date" value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} required min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" />
              </div>
              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">START TIME *</label>
                <input type="time" value={formData.eventTime} onChange={(e) => setFormData({...formData, eventTime: e.target.value})} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm tracking-[0.15em] text-white/60 mb-2">YOUR NAME *</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" /></div>
              <div><label className="block text-sm tracking-[0.15em] text-white/60 mb-2">EMAIL *</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" /></div>
              <div><label className="block text-sm tracking-[0.15em] text-white/60 mb-2">PHONE *</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" /></div>
              <div><label className="block text-sm tracking-[0.15em] text-white/60 mb-2">EVENT LOCATION</label><input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" /></div>
            </div>

            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">ADDITIONAL DETAILS</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all resize-none" placeholder="Tell us more about your vision..." />
            </div>

            <button type="submit" className="w-full px-12 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all">SUBMIT BOOKING REQUEST</button>
          </form>
        </div>
      </section>
    </main>
  )
}
