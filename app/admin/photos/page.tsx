'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Plus, Edit, Trash2, X, Save, Eye, Star } from 'lucide-react'

interface Photo {
  id: string
  title: string
  description: string | null
  category: string
  imageUrl: string
  location: string | null
  date: string
  featured: boolean
  published: boolean
  createdAt: string
}

const categories = ['Weddings', 'Birthdays', 'Retirements', 'Social Events']

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Weddings',
    imageUrl: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    published: true,
  })

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/photos', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('admin_token')
      const url = '/api/photos'
      const method = editingPhoto ? 'PATCH' : 'POST'
      
      const payload = editingPhoto 
        ? { id: editingPhoto.id, ...formData }
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
        fetchPhotos()
        closeModal()
        alert(editingPhoto ? 'Photo updated!' : 'Photo added!')
      } else {
        alert('Error saving photo')
      }
    } catch (error) {
      console.error('Error saving photo:', error)
      alert('Error saving photo')
    }
  }

  const deletePhoto = async (id: string) => {
    if (!confirm('Delete this photo?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/photos?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (response.ok) {
        fetchPhotos()
        alert('Photo deleted!')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }

  const openModal = (photo?: Photo) => {
    if (photo) {
      setEditingPhoto(photo)
      setFormData({
        title: photo.title,
        description: photo.description || '',
        category: photo.category,
        imageUrl: photo.imageUrl,
        location: photo.location || '',
        date: photo.date.split('T')[0],
        featured: photo.featured,
        published: photo.published,
      })
    } else {
      setEditingPhoto(null)
      setFormData({
        title: '',
        description: '',
        category: 'Weddings',
        imageUrl: '',
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
    setEditingPhoto(null)
  }

  const stats = {
    total: photos.length,
    byCategory: {
      Weddings: photos.filter(p => p.category === 'Weddings').length,
      Birthdays: photos.filter(p => p.category === 'Birthdays').length,
      Retirements: photos.filter(p => p.category === 'Retirements').length,
      'Social Events': photos.filter(p => p.category === 'Social Events').length,
    },
    featured: photos.filter(p => p.featured).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading photos...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">Photo Gallery</h2>
          <p className="text-white/60">Manage your photography portfolio</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Photo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Total Photos</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="glass p-4">
            <p className="text-white/60 text-sm mb-1">{cat}</p>
            <p className="text-2xl font-bold text-white">{stats.byCategory[cat as keyof typeof stats.byCategory]}</p>
          </div>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="glass p-6">
        {photos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto mb-4 text-white/40" size={64} />
            <h3 className="text-xl font-medium text-white mb-2">No photos yet</h3>
            <p className="text-white/60 mb-6">Add your first photo to get started</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors"
            >
              Add Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative"
              >
                <div className="aspect-square overflow-hidden border border-white/10 mb-3">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-medium line-clamp-1">{photo.title}</h3>
                    {photo.featured && (
                      <Star size={16} className="text-gold flex-shrink-0" fill="currentColor" />
                    )}
                  </div>
                  <p className="text-white/40 text-sm">{photo.category}</p>
                  {photo.description && (
                    <p className="text-white/60 text-sm line-clamp-2">{photo.description}</p>
                  )}
                  <p className="text-white/40 text-xs">
                    {new Date(photo.date).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => window.open(photo.imageUrl, '_blank')}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      onClick={() => openModal(photo)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => deletePhoto(photo.id)}
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
                {editingPhoto ? 'Edit Photo' : 'Add Photo'}
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
                  placeholder="e.g., Sparkler Send-Off"
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
                  placeholder="Brief description of the photo"
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
                  IMAGE URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-white/40 text-xs mt-2">
                  Paste image URL from Imgur, Cloudinary, or direct link
                </p>
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

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-white/80 text-sm">Featured Photo</span>
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

              {formData.imageUrl && (
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    PREVIEW
                  </label>
                  <div className="aspect-video w-full overflow-hidden border border-white/10">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
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
                  {editingPhoto ? 'Update Photo' : 'Add Photo'}
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
