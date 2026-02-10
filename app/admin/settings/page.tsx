'use client'

import { useState } from 'react'
import { Settings as SettingsIcon, Save, User, Mail, Lock } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@czarstudio.com',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleProfileSave = () => {
    alert('Profile settings will be saved to database in future update')
  }

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    alert('Password change will be implemented in future update')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-white mb-2">Settings</h2>
        <p className="text-white/60">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'site', label: 'Site Settings', icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass p-8 max-w-2xl">
          <h3 className="text-xl font-medium text-white mb-6">Profile Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                FULL NAME
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <button
              onClick={handleProfileSave}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="glass p-8 max-w-2xl">
          <h3 className="text-xl font-medium text-white mb-6">Change Password</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                CURRENT PASSWORD
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                NEW PASSWORD
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm tracking-[0.15em] text-white/60 mb-2">
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <button
              onClick={handlePasswordSave}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-dark rounded hover:bg-gold-light transition-colors"
            >
              <Lock size={18} />
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* Site Settings Tab */}
      {activeTab === 'site' && (
        <div className="glass p-8 max-w-2xl">
          <h3 className="text-xl font-medium text-white mb-6">Site Configuration</h3>
          <p className="text-white/60 mb-4">
            Advanced site settings coming soon. This will include:
          </p>
          <ul className="space-y-2 text-white/60 ml-6">
            <li>• SEO settings</li>
            <li>• Social media links</li>
            <li>• Contact information</li>
            <li>• Email notifications</li>
            <li>• API integrations</li>
          </ul>
        </div>
      )}
    </div>
  )
}
