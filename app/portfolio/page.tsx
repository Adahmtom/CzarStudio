'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const items = [
  { title: 'Wedding Celebrations', category: 'WEDDINGS', image: '/images/Wedding.jpg', projects: '120+ Weddings' },
  { title: 'Birthday Parties', category: 'BIRTHDAYS', image: '/images/Birthday.jpg', projects: '200+ Celebrations' },
  { title: 'Retirement Events', category: 'RETIREMENTS', image: '/images/Retirement.jpg', projects: '80+ Events' },
  { title: 'Social Gatherings', category: 'SOCIAL EVENTS', image: '/images/Social_Events.jpg', projects: '150+ Events' },
]

export default function Portfolio() {
  return (
    <main className="pt-20">
      <section className="py-24 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] mb-6">
            OUR PORTFOLIO
          </motion.h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">A curated selection of our finest work</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-500">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold text-sm tracking-[0.2em] mb-2 block">{item.category}</span>
                <h3 className="font-serif text-3xl lg:text-4xl font-medium mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.projects}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.1em] mb-6">Ready to Create Your Story?</h2>
          <p className="text-white/70 text-lg mb-12">Let&apos;s discuss your event and create something extraordinary</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book"><button className="px-12 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all">BOOK YOUR EVENT</button></Link>
            <Link href="/contact"><button className="px-12 py-4 border border-white/20 text-white tracking-[0.2em] text-sm font-light hover:bg-white/10 transition-all">GET IN TOUCH</button></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
