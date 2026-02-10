'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string
  location: string | null
  date: string
}

const photoCategories = ['All', 'Weddings', 'Birthdays', 'Retirements', 'Social Events']

export default function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data)
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredPhotos.length
      : (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    
    setCurrentIndex(newIndex)
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center bg-dark">
        <div className="text-white">Loading gallery...</div>
      </main>
    )
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden bg-dark-darker">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
            <source src="/videos/Home_hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-dark/60" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] mb-6"
          >
            PHOTO GALLERY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Capturing life&apos;s most precious moments with cinematic precision
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6 lg:px-12 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {photoCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 border transition-all ${
                  selectedCategory === category
                    ? 'border-gold bg-gold text-dark'
                    : 'border-white/20 hover:border-white/40 text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No photos in this category yet.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(photo, index)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6">
                    <h3 className="text-white font-serif text-xl mb-2 text-center">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-white/80 text-sm text-center line-clamp-2">{photo.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white z-50"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePhoto('prev')
            }}
            className="absolute left-6 text-white/80 hover:text-white z-50"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePhoto('next')
            }}
            className="absolute right-6 text-white/80 hover:text-white z-50"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
            <div className="mt-6 text-center">
              <h2 className="text-white font-serif text-2xl mb-2">{selectedPhoto.title}</h2>
              {selectedPhoto.description && (
                <p className="text-white/70 mb-2">{selectedPhoto.description}</p>
              )}
              <div className="flex gap-4 justify-center text-white/50 text-sm">
                {selectedPhoto.location && <span>{selectedPhoto.location}</span>}
                <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
