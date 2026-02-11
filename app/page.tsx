'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Camera, Video, Users } from 'lucide-react'
import { TrophyIcon, FilmSlateIcon, UserCircleIcon } from '@phosphor-icons/react'

// Custom SVG Icons for Services
const WeddingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
    <path d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm-9.333 9.333h4l2 4h9.333l2-4h4c2.205 0 4 1.795 4 4v17.334c0 2.205-1.795 4-4 4H18c-2.205 0-4-1.795-4-4V21.333c0-2.205 1.795-4 4-4zM32 25.333c-4.412 0-8 3.588-8 8s3.588 8 8 8 8-3.588 8-8-3.588-8-8-8zm0 2.667c2.941 0 5.333 2.392 5.333 5.333S34.941 38.667 32 38.667s-5.333-2.392-5.333-5.334S29.059 28 32 28z"/>
  </svg>
)

const BirthdayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
    <path d="M24 10.667v5.333H8v37.333h48V16H40v-5.333h-5.333V16h-5.334v-5.333zM10.667 18.667h42.666v29.333H10.667zM32 24l-5.333 10.667h2.666V42.667h5.334V34.667h2.666z"/>
  </svg>
)

const RetirementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
    <path d="M32 5.333C17.272 5.333 5.333 17.272 5.333 32S17.272 58.667 32 58.667 58.667 46.728 58.667 32 46.728 5.333 32 5.333zm0 8c10.309 0 18.667 8.358 18.667 18.667S42.309 50.667 32 50.667 13.333 42.309 13.333 32 21.691 13.333 32 13.333zM30.667 17.333v16.552l11.057 11.058 1.885-1.886L32 31.448V17.333z"/>
  </svg>
)

const SocialIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
    <path d="M32 5.333C17.272 5.333 5.333 17.272 5.333 32S17.272 58.667 32 58.667 58.667 46.728 58.667 32 46.728 5.333 32 5.333zM21.333 16h6.667l2.667 5.333h8l2.666-5.333h6.667v26.667H21.333zm5.334 8v5.333h5.333V24zm10.666 0v5.333h5.334V24zM21.333 34.667v5.333h21.334v-5.333z"/>
  </svg>
)

// Direct Pexels image URLs for Our Services (stable, no query params)
const PEXELS = {
  wedding: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg',
  birthday: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
  retirement: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  social: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
}

const services = [
  {
    icon: WeddingIcon,
    title: 'Weddings',
    description: 'Capture every magical moment of your special day with cinematic elegance',
    image: PEXELS.wedding,
    href: '/portfolio#weddings'
  },
  {
    icon: BirthdayIcon,
    title: 'Birthday Celebrations',
    description: 'Preserve the joy and excitement of milestone birthday parties',
    image: PEXELS.birthday,
    href: '/portfolio#birthdays'
  },
  {
    icon: RetirementIcon,
    title: 'Retirement Parties',
    description: 'Honor career achievements with professional event coverage',
    image: PEXELS.retirement,
    href: '/portfolio#retirements'
  },
  {
    icon: SocialIcon,
    title: 'Social Events',
    description: 'From galas to gatherings, we capture the atmosphere perfectly',
    image: PEXELS.social,
    href: '/portfolio#social'
  },
]

const whyFeatures = [
  {
    title: 'Professional Excellence',
    description: 'Award-winning photographers and videographers with years of experience capturing special moments',
    icon: TrophyIcon,
  },
  {
    title: 'Cinematic Quality',
    description: 'State-of-the-art equipment and techniques to deliver stunning, high-resolution memories',
    icon: FilmSlateIcon,
  },
  {
    title: 'Personalized Service',
    description: 'Customized packages tailored to your event and budget with dedicated support',
    icon: UserCircleIcon,
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark/90" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] mb-6"
          >
            CZAR STUDIO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="text-xl md:text-2xl tracking-[0.2em] text-white/80 font-light mb-12"
          >
            CAPTURING LIFE&apos;S PRECIOUS MOMENTS
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/book">
              <button className="px-10 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20">
                BOOK YOUR EVENT
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-10 py-4 border border-white/30 text-white tracking-[0.2em] text-sm font-light hover:bg-white/10 transition-all duration-300">
                VIEW PORTFOLIO
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} className="text-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 lg:px-12 bg-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] mb-6">
              OUR SERVICES
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Specializing in capturing the essence of life&apos;s most important celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={service.href}>
                    <div className="group relative overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-500">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="text-gold mb-4">
                          <Icon />
                        </div>
                        <h3 className="font-serif text-3xl font-medium mb-2 group-hover:text-gold transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/book">
              <button className="px-12 py-4 bg-gold text-dark tracking-[0.2em] text-sm font-medium hover:bg-gold-light transition-all duration-300">
                BOOK YOUR SESSION
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.15em] mb-6">
              WHY CZAR STUDIO
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {whyFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-gold" size={32} weight="duotone" />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-gold">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(212, 175, 55) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-[0.1em] mb-6">
              Ready to Capture Your Moment?
            </h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Let&apos;s create stunning memories together. Book your session today and receive a complimentary consultation.
            </p>
            <Link href="/book">
              <button className="px-14 py-5 bg-gold text-dark tracking-[0.2em] text-base font-medium hover:bg-gold-light transition-all duration-300 shadow-2xl shadow-gold/20">
                START BOOKING
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}