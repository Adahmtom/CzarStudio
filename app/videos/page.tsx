'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Play } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string | null
  category: string
  videoUrl: string
  thumbnailUrl: string
  duration: string | null
  location: string | null
  date: string
}

const videoCategories = ['All', 'Weddings', 'Birthdays', 'Events', 'Highlights']

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      if (response.ok) {
        const data = await response.json()
        setVideos(data)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center bg-dark">
        <div className="text-white">Loading videos...</div>
      </main>
    )
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden bg-dark-darker">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
            <source src="/videos/Czar_About.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-dark/60" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] mb-6"
          >
            VIDEO PORTFOLIO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Cinematic storytelling that brings your moments to life
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6 lg:px-12 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {videoCategories.map((category) => (
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

      {/* Video Grid */}
      <section className="py-16 px-6 lg:px-12 bg-dark-darker">
        <div className="max-w-7xl mx-auto">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No videos in this category yet.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="aspect-video overflow-hidden relative mb-4">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                        <Play size={28} className="text-dark ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-serif text-xl mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-white/60 text-sm line-clamp-2 mb-2">{video.description}</p>
                  )}
                  <div className="flex gap-3 text-white/40 text-xs">
                    <span>{video.category}</span>
                    {video.location && <span>• {video.location}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white z-50"
          >
            <X size={32} />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video mb-6">
              {selectedVideo.videoUrl.includes('youtube.com') || selectedVideo.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedVideo.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={selectedVideo.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-white font-serif text-2xl mb-2">{selectedVideo.title}</h2>
              {selectedVideo.description && (
                <p className="text-white/70 mb-3">{selectedVideo.description}</p>
              )}
              <div className="flex gap-4 justify-center text-white/50 text-sm">
                <span>{selectedVideo.category}</span>
                {selectedVideo.location && <span>• {selectedVideo.location}</span>}
                <span>• {new Date(selectedVideo.date).toLocaleDateString()}</span>
                {selectedVideo.duration && <span>• {selectedVideo.duration}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
