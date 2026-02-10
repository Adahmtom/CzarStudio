'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Edit, Trash2, X, Save, Shield, ShieldCheck, Eye } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
  active: boolean
  createdAt: string
  createdBy: string | null
}

const roles = [
  { value: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-red-400' },
  { value: 'user', label: 'User', icon: Shield, color: 'text-blue-400' },
  { value: 'viewer', label: 'Viewer', icon: Eye, color: 'text-green-400' },
]

const availablePermissions = [
  { key: 'view_bookings', label: 'View Bookings' },
  { key: 'manage_bookings', label: 'Manage Bookings' },
  { key: 'view_messages', label: 'View Messages' },
  { key: 'reply_messages', label: 'Reply to Messages' },
  { key: 'upload_photos', label: 'Upload Photos' },
  { key: 'delete_photos', label: 'Delete Photos' },
  { key: 'upload_videos', label: 'Upload Videos' },
  { key: 'delete_videos', label: 'Delete Videos' },
  { key: 'manage_users', label: 'Manage Users' },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    permissions: [] as string[],
    active: true,
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('admin_token')
      const url = '/api/users'
      const method = editingUser ? 'PATCH' : 'POST'
      
      const payload = editingUser 
        ? { id: editingUser.id, ...formData, password: formData.password || undefined }
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
        fetchUsers()
        closeModal()
        alert(editingUser ? 'User updated!' : 'User created!')
      } else {
        const error = await response.json()
        alert(error.error || 'Error saving user')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      alert('Error saving user')
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })

      if (response.ok) {
        fetchUsers()
        alert('User deleted!')
      } else {
        const error = await response.json()
        alert(error.error || 'Error deleting user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        permissions: user.permissions || [],
        active: user.active,
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        permissions: [],
        active: true,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingUser(null)
  }

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.value === role) || roles[1]
  }

  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    user: users.filter(u => u.role === 'user').length,
    viewer: users.filter(u => u.role === 'viewer').length,
    active: users.filter(u => u.active).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">User Management</h2>
          <p className="text-white/60">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Admins</p>
          <p className="text-2xl font-bold text-red-400">{stats.admin}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Users</p>
          <p className="text-2xl font-bold text-blue-400">{stats.user}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Viewers</p>
          <p className="text-2xl font-bold text-green-400">{stats.viewer}</p>
        </div>
        <div className="glass p-4">
          <p className="text-white/60 text-sm mb-1">Active</p>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-white/60 text-sm font-medium">User</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Role</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Permissions</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-white/40">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const roleInfo = getRoleInfo(user.role)
                  const RoleIcon = roleInfo.icon
                  return (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/40 text-sm">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <RoleIcon size={16} className={roleInfo.color} />
                          <span className="text-white capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white/60 text-sm">
                          {user.permissions.length} permissions
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${
                          user.active
                            ? 'text-green-400 bg-green-400/10 border-green-400/30'
                            : 'text-red-400 bg-red-400/10 border-red-400/30'
                        }`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(user)}
                            className="p-2 hover:bg-white/10 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} className="text-white/60" />
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-2 hover:bg-red-400/10 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6" onClick={closeModal}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-white">
                {editingUser ? 'Edit User' : 'Create User'}
              </h2>
              <button onClick={closeModal}>
                <X className="text-white/60 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                  PASSWORD {editingUser && '(leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-3">
                  ROLE *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: role.value })}
                        className={`p-4 border rounded transition-all ${
                          formData.role === role.value
                            ? 'border-gold bg-gold/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Icon className={`mx-auto mb-2 ${role.color}`} size={24} />
                        <p className="text-white text-sm">{role.label}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm tracking-[0.15em] text-white/60 mb-3">
                  PERMISSIONS
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {availablePermissions.map((perm) => (
                    <label
                      key={perm.key}
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm.key)}
                        onChange={() => togglePermission(perm.key)}
                        className="w-4 h-4"
                      />
                      <span className="text-white text-sm">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-white">Account Active</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {editingUser ? 'Update User' : 'Create User'}
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
