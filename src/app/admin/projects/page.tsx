'use client'

import { useEffect, useState } from 'react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  skills: string[]
  results?: string
  featured: boolean
  image?: string
  order: number
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState({
    title: '', description: '', category: '', technologies: '',
    skills: '', results: '', featured: false, image: '', order: 0,
  })

  const fetchProjects = async () => {
    const res = await fetch('/api/admin/projects')
    if (res.ok) setProjects(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const resetForm = () => {
    setForm({ title: '', description: '', category: '', technologies: '', skills: '', results: '', featured: false, image: '', order: 0 })
    setEditing(null)
    setShowForm(false)
  }

  const handleEdit = (project: Project) => {
    setEditing(project)
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies.join(', '),
      skills: project.skills.join(', '),
      results: project.results || '',
      featured: project.featured,
      image: project.image || '',
      order: project.order,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    }

    if (editing) {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...payload }),
      })
    } else {
      await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    resetForm()
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch('/api/admin/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchProjects()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">{editing ? 'Edit' : 'Add'} Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Category" required className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" required rows={3} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} placeholder="Technologies (comma-separated)" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="text" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="Skills (comma-separated)" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <textarea value={form.results} onChange={e => setForm({...form, results: e.target.value})} placeholder="Results" rows={2} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            <div className="grid md:grid-cols-3 gap-4">
              <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Image URL" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} placeholder="Order" className="bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded" />
                Featured
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
                {editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-secondary rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm">Title</th>
              <th className="text-left p-4 text-gray-400 text-sm">Category</th>
              <th className="text-left p-4 text-gray-400 text-sm">Technologies</th>
              <th className="text-left p-4 text-gray-400 text-sm">Featured</th>
              <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-700">
                <td className="p-4 text-white">{project.title}</td>
                <td className="p-4 text-gray-400">{project.category}</td>
                <td className="p-4"><div className="flex flex-wrap gap-1">{project.technologies.map(t => <span key={t} className="text-xs bg-primary text-accent px-2 py-0.5 rounded">{t}</span>)}</div></td>
                <td className="p-4">{project.featured ? <span className="text-green-400">Yes</span> : <span className="text-gray-500">No</span>}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(project)} className="text-accent hover:text-blue-400 mr-3">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && <p className="p-8 text-center text-gray-400">No projects yet</p>}
      </div>
    </div>
  )
}
