'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Users, Camera, Heart } from 'lucide-react'

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero with Video */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/Czar_About.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/70" />
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-serif text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] mb-4"
          >
            OUR STORY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }} 
            className="text-xl tracking-[0.2em] text-white/80"
          >
            PASSION MEETS ARTISTRY
          </motion.p>
        </div>
      </section>

      {/* Story Section 1 - Image Right */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl lg:text-5xl text-gold">
                Crafting Visual Stories Since 2015
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                CZAR STUDIO was born from a simple belief: every moment matters. What started as a passion for 
                capturing candid smiles at family gatherings has evolved into a premier event photography and 
                videography service trusted by hundreds of families across Toronto.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                We specialize in turning life&apos;s milestones into timeless visual narratives. Whether it&apos;s the intimate 
                exchange of vows at a wedding, the joyful chaos of a birthday celebration, the heartfelt tributes at 
                a retirement party, or the energy of a social gathering—we&apos;re there to preserve it all with cinematic 
                precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] group overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professional photographer at work"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section 2 - Image Left */}
      <section className="py-24 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] group overflow-hidden order-2 lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Bride and groom portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h2 className="font-serif text-4xl lg:text-5xl text-gold">
                Our Approach
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Our team of award-winning photographers and videographers combines technical excellence with artistic 
                intuition. We don&apos;t just document events; we craft stories that you&apos;ll treasure for generations.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Every frame, every transition, every moment is carefully considered to reflect the genuine emotion and 
                beauty of your celebration. We use state-of-the-art equipment including 4K cameras, professional lighting, 
                and advanced editing software to ensure your memories are preserved in stunning detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section 3 - Image Right */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl lg:text-5xl text-gold">
                Behind the Lens
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                What sets us apart is our commitment to understanding your unique story. From the first consultation 
                to final delivery, we work closely with you to capture the moments that matter most.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Our passion for visual storytelling drives us to constantly innovate and push creative boundaries, 
                ensuring that your memories are preserved not just as photos and videos, but as timeless works of art.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] group overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professional camera equipment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery Strip */}
      <section className="py-16 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
              'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=600'
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square overflow-hidden group"
              >
                <img
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl lg:text-6xl font-light tracking-[0.15em] text-center mb-20"
          >
            WHAT DRIVES US
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Camera, title: 'Artistry', description: 'Every shot composed with cinematic precision' },
              { icon: Heart, title: 'Passion', description: 'We genuinely love what we do' },
              { icon: Users, title: 'Connection', description: 'Building relationships to understand your story' },
              { icon: Award, title: 'Excellence', description: 'Committed to exceptional quality' }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: '500+', label: 'Events Captured' },
              { number: '15K+', label: 'Happy Clients' },
              { number: '8+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center border border-white/10 p-12"
              >
                <div className="font-serif text-6xl font-light text-gold mb-3">
                  {stat.number}
                </div>
                <div className="text-white/60 tracking-[0.2em] text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.1em] mb-6">
              Let&apos;s Create Together
            </h2>
            <p className="text-white/70 text-lg mb-12">
              Ready to preserve your special moments with CZAR STUDIO?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <button className="px-12 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300">
                  BOOK NOW
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="px-12 py-4 border border-white/20 text-white tracking-[0.2em] text-sm font-light hover:bg-white/10 transition-all duration-300">
                  VIEW WORK
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
