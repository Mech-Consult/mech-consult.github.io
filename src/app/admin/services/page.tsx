'use client'

import { useEffect, useState } from 'react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  price: number
  duration: number
  features: string[]
  _count?: { bookings: number }
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({
    title: '', description: '', icon: '', price: 0, duration: 0, features: '',
  })

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services')
    if (res.ok) setServices(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchServices() }, [])

  const resetForm = () => {
    setForm({ title: '', description: '', icon: '', price: 0, duration: 0, features: '' })
    setEditing(null)
    setShowForm(false)
  }

  const handleEdit = (service: Service) => {
    setEditing(service)
    setForm({
      title: service.title, description: service.description, icon: service.icon || '',
      price: service.price, duration: service.duration, features: service.features.join(', '),
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...form, features: form.features.split(',').map(f => f.trim()).filter(Boolean) }

    if (editing) {
      await fetch('/api/admin/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...payload }) })
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    resetForm()
    fetchServices()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch('/api/admin/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchServices()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Services</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">Add Service</button>
      </div>

      {showForm && (
        <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit' : 'Add'} Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="text" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} placeholder="Icon (e.g. design, robotics)" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" required rows={3} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            <div className="grid md:grid-cols-2 gap-4">
              <input type="number" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} placeholder="Price ($)" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="number" value={form.duration} onChange={e => setForm({...form, duration: parseInt(e.target.value) || 0})} placeholder="Duration (hours)" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <input type="text" value={form.features} onChange={e => setForm({...form, features: e.target.value})} placeholder="Features (comma-separated)" className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            <div className="flex gap-3">
              <button type="submit" className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={resetForm} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-secondary rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <span className="text-accent font-bold">${service.price}</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{service.description}</p>
            <p className="text-xs text-gray-500 mb-3">{service.duration} hours | {service._count?.bookings ?? 0} bookings</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {service.features.map(f => <span key={f} className="text-xs bg-primary text-gray-300 px-2 py-0.5 rounded">{f}</span>)}
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(service)} className="text-accent hover:text-blue-400 text-sm">Edit</button>
              <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {services.length === 0 && <p className="p-8 text-center text-gray-400">No services yet</p>}
    </div>
  )
}
