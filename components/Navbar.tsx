'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'PHOTOS', href: '/photos' },
  { name: 'VIDEOS', href: '/videos' },
  { name: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark/95 backdrop-blur-lg border-b border-white/10 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-serif text-2xl lg:text-3xl font-bold tracking-[0.25em] text-gold cursor-pointer"
              >
                CZAR STUDIO
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm tracking-[0.15em] font-light transition-colors duration-300 group ${
                      pathname === link.href ? 'text-gold' : 'text-white/90 hover:text-gold'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.div>
              ))}
              
              <Link href="/book">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="px-6 py-2 bg-gold text-dark text-sm tracking-[0.15em] font-medium hover:bg-gold-light transition-colors duration-300"
                >
                  BOOK NOW
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 bg-dark-darker z-40 lg:hidden"
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 50,
              }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-serif tracking-[0.15em] transition-colors duration-300 ${
                  pathname === link.href ? 'text-gold' : 'text-white/90 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              x: isMobileMenuOpen ? 0 : 50,
            }}
            transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
          >
            <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="px-8 py-3 bg-gold text-dark text-lg tracking-[0.15em] font-medium hover:bg-gold-light transition-colors duration-300">
                BOOK NOW
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
