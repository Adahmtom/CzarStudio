'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Thank you for your message! We will get back to you within 24 hours.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="pt-20">
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden bg-dark-darker">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/Home_hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-dark/70" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-serif text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] mb-6"
          >
            GET IN TOUCH
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions or ready to book? We would love to hear from you
          </p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="space-y-12"
          >
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-gold mb-8">
                Let&apos;s Connect
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Whether you&apos;re planning a wedding, birthday, retirement party, or any special event, 
                we&apos;re here to help capture those precious moments.
              </p>
            </div>

            <div className="space-y-6">
              <a 
                href="mailto:hello@czarstudio.com" 
                className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Email Us</div>
                  <span className="text-lg">hello@czarstudio.com</span>
                </div>
              </a>

              <a 
                href="tel:+14165551234" 
                className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Call Us</div>
                  <span className="text-lg">+1 (416) 555-1234</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <MapPin className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Location</div>
                  <span className="text-lg">Toronto, Ontario, Canada</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm tracking-[0.2em] text-white/50 mb-4">FOLLOW US</p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-dark transition-all text-white"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-dark transition-all text-white"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-dark transition-all text-white"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/book">
                <button className="w-full px-10 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300">
                  BOOK YOUR EVENT
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            onSubmit={handleSubmit} 
            className="space-y-6 glass p-8 lg:p-12"
          >
            <h3 className="font-serif text-3xl mb-8">Send Us a Message</h3>
            
            <div className="space-y-2">
              <label className="block text-sm tracking-[0.15em] text-white/60">
                YOUR NAME *
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm tracking-[0.15em] text-white/60">
                EMAIL ADDRESS *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm tracking-[0.15em] text-white/60">
                PHONE NUMBER
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm tracking-[0.15em] text-white/60">
                YOUR MESSAGE *
              </label>
              <textarea 
                name="message"
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows={6} 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all resize-none" 
                placeholder="Tell us about your event..."
              />
            </div>

            <button 
              type="submit" 
              className="w-full px-10 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300"
            >
              SEND MESSAGE
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
