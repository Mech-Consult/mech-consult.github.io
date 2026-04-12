'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function PortalProfile() {
  const { data: session } = useSession()
  const [form, setForm] = useState({ name: '', phone: '', company: '', bio: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setForm({
          name: data.name || '',
          phone: data.profile?.phone || '',
          company: data.profile?.company || '',
          bio: data.profile?.bio || '',
        })
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

      <div className="max-w-2xl">
        <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Email</p>
              <p className="text-white">{session?.user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Account Type</p>
              <p className="text-white">{(session?.user as any)?.role === 'ADMIN' ? 'Administrator' : 'Client'}</p>
            </div>
          </div>
        </div>

        {saved && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-secondary rounded-xl p-6 border border-gray-700 space-y-6">
          <h3 className="text-lg font-semibold text-white mb-4">Edit Profile</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({...form, company: e.target.value})}
              className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({...form, bio: e.target.value})}
              rows={3}
              className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
