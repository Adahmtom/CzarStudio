'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-darker">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-serif text-3xl tracking-[0.2em] text-gold mb-4">
              CZAR STUDIO
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              Capturing life&apos;s most precious moments with artistry and passion. 
              Professional event photography and videography services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-[0.2em] text-gold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/60 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/photos" className="text-white/60 hover:text-white transition-colors">Photos</Link></li>
              <li><Link href="/videos" className="text-white/60 hover:text-white transition-colors">Videos</Link></li>
              <li><Link href="/portfolio" className="text-white/60 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/book" className="text-white/60 hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm tracking-[0.2em] text-gold mb-4">CONTACT</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 text-gold flex-shrink-0" />
                <a href="mailto:hello@czarstudio.com" className="hover:text-white transition-colors">
                  hello@czarstudio.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 text-gold flex-shrink-0" />
                <a href="tel:+14165551234" className="hover:text-white transition-colors">
                  +1 (416) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-gold flex-shrink-0" />
                <span>Toronto, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} CZAR STUDIO. All rights reserved. Crafted with excellence.</p>
        </div>
      </div>
    </footer>
  )
}
