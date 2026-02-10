'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Plus, Edit, Trash2, X, Save, Eye, Star, Play } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string | null
  category: string
  videoUrl: string
  thumbnailUrl: string
  duration: string | null
  location: string | null
  date: string
  featured: boolean
  published: boolean
  createdAt: string
}

const categories = ['Weddings', 'Birthdays', 'Events', 'Highlights']

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Weddings',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    published: true,
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/videos', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('admin_token')
      const url = '/api/videos'
      const method = editingVideo ? 'PATCH' : 'POST'
      
      const payload = editingVideo 
        ? { id: editingVideo.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchVideos()
        closeModal()
        alert(editingVideo ? 'Video updated!' : 'Video added!')
      } else {
        alert('Error saving video')
      }
    } catch (error) {
      console.error('Error saving video:', error)
      alert('Error saving video')
    }
  }

  const deleteVideo = async (id: string) => {
    if (!confirm('Delete this video?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/videos?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (response.ok) {
        fetchVideos()
        alert('Video deleted!')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const openModal = (video?: VideoItem) => {
    if (video) {
      setEditingVideo(video)
      setFormData({
        title: video.title,
        description: video.description || '',
        category: video.category,
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration || '',
        location: video.location || '',
        date: video.date.split('T')[0],
        featured: video.featured,
        published: video.published,
      })
    } else {
      setEditingVideo(null)
      setFormData({
        title: '',
        description: '',
        category: 'Weddings',
        videoUrl: '',
        thumbnailUrl: '',
        duration: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        featured: false,
        published: true,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingVideo(null)
  }

  const stats = {
    total: videos.length,
    byCategory: {
      Weddings: videos.filter(v => v.category === 'Weddings').length,
      Birthdays: videos.filter(v => v.category === 'Birthdays').length,
      Events: videos.filter(v => v.category === 'Events').length,
      Highlights: videos.filter(v => v.category === 'Highlights').length,
    },
    featured: videos.filter(v => v.featured).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading videos...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">Video Portfolio</h2>
          <p className="text-white/60">Manage your videography showcase</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Video
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Total Videos</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="glass p-4">
            <p className="text-white/60 text-sm mb-1">{cat}</p>
            <p className="text-2xl font-bold text-white">{stats.byCategory[cat as keyof typeof stats.byCategory]}</p>
          </div>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="glass p-6">
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <Video className="mx-auto mb-4 text-white/40" size={64} />
            <h3 className="text-xl font-medium text-white mb-2">No videos yet</h3>
            <p className="text-white/60 mb-6">Add your first video to get started</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors"
            >
              Add Video
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative"
              >
                <div className="aspect-video overflow-hidden border border-white/10 mb-3 relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={48} className="text-white" fill="white" />
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-medium line-clamp-1">{video.title}</h3>
                    {video.featured && (
                      <Star size={16} className="text-gold flex-shrink-0" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-white/40 text-sm">{video.category}</p>
                  {video.description && (
                    <p className="text-white/60 text-sm line-clamp-2">{video.description}</p>
                  )}
                  <p className="text-white/40 text-xs">
                    {new Date(video.date).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => window.open(video.videoUrl, '_blank')}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye size={14} />
                      Watch
                    </button>
                    <button
                      onClick={() => openModal(video)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={closeModal}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-white">
                {editingVideo ? 'Edit Video' : 'Add Video'}
              </h2>
              <button onClick={closeModal}>
                <X className="text-white/60 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="e.g., Sarah & Michael Wedding Film"
                />
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  DESCRIPTION
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all resize-none"
                  placeholder="Brief description of the video"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    CATEGORY *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  VIDEO URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="https://example.com/video.mp4 or YouTube/Vimeo link"
                />
                <p className="text-white/40 text-xs mt-2">
                  Paste video URL from YouTube, Vimeo, or direct link
                </p>
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  THUMBNAIL URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="text-white/40 text-xs mt-2">
                  Image URL for video thumbnail/preview
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    DURATION
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="e.g., 4:32"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="e.g., Toronto, ON"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-white/80 text-sm">Featured Video</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-white/80 text-sm">Published</span>
                </label>
              </div>

              {formData.thumbnailUrl && (
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    THUMBNAIL PREVIEW
                  </label>
                  <div className="aspect-video w-full overflow-hidden border border-white/10">
                    <img
                      src={formData.thumbnailUrl}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
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
