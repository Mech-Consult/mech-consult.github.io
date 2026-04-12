'use client'

import { useEffect, useState } from 'react'

interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  content: string
  rating: number
  featured: boolean
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState({ name: '', company: '', role: '', content: '', rating: 5, featured: false })

  const fetchTestimonials = async () => {
    const res = await fetch('/api/admin/testimonials')
    if (res.ok) setTestimonials(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchTestimonials() }, [])

  const resetForm = () => { setForm({ name: '', company: '', role: '', content: '', rating: 5, featured: false }); setEditing(null); setShowForm(false) }

  const handleEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({ name: t.name, company: t.company || '', role: t.role || '', content: t.content, rating: t.rating, featured: t.featured })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/admin/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...form }) })
    } else {
      await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    resetForm()
    fetchTestimonials()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch('/api/admin/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchTestimonials()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">Add Testimonial</button>
      </div>

      {showForm && (
        <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit' : 'Add'} Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Role" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Testimonial content" required rows={3} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Rating</label>
                <select value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value)})} className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent">
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-gray-300 mt-6">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
                Featured
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-secondary rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex gap-1 mb-2">{Array.from({length: 5}).map((_, i) => <span key={i} className={i < t.rating ? 'text-accent' : 'text-gray-600'}>&#9733;</span>)}</div>
                <p className="text-gray-300 italic mb-3">&quot;{t.content}&quot;</p>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role && `${t.role} at `}{t.company}</p>
              </div>
              <div className="flex gap-3 shrink-0 ml-4">
                {t.featured && <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">Featured</span>}
                <button onClick={() => handleEdit(t)} className="text-accent hover:text-blue-400 text-sm">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="p-8 text-center text-gray-400">No testimonials yet</p>}
      </div>
    </div>
  )
}
