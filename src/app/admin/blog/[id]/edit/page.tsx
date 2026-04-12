'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: '', tags: '', coverImage: '', published: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch('/api/admin/blog')
      if (res.ok) {
        const posts = await res.json()
        const post = posts.find((p: any) => p.id === params.id)
        if (post) {
          setForm({
            title: post.title, excerpt: post.excerpt, content: post.content,
            category: post.category, tags: post.tags.join(', '), coverImage: post.coverImage || '',
            published: post.published,
          })
        }
      }
      setLoading(false)
    }
    fetchPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { id: params.id, ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }

    await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    router.push('/admin/blog')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Post Title" required className="w-full bg-secondary border border-gray-600 rounded-lg px-4 py-3 text-white text-xl focus:outline-none focus:border-accent" />

        <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Short excerpt" required rows={2} className="w-full bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />

        <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Content (Markdown)" required rows={20} className="w-full bg-secondary border border-gray-600 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent" />

        <div className="grid md:grid-cols-3 gap-4">
          <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Category" required className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Tags (comma-separated)" className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          <input type="text" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} placeholder="Cover Image URL" className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
        </div>

        <label className="flex items-center gap-2 text-gray-300">
          <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} />
          Published
        </label>

        <div className="flex gap-3">
          <button type="submit" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">Update Post</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition">Cancel</button>
        </div>
      </form>
    </div>
  )
}
