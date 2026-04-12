'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string[]
  published: boolean
  author?: { name: string }
  createdAt: string
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    const res = await fetch('/api/admin/blog')
    if (res.ok) setPosts(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const togglePublish = async (post: BlogPost) => {
    await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return
    await fetch('/api/admin/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    fetchPosts()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">New Post</Link>
      </div>

      <div className="bg-secondary rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm">Title</th>
              <th className="text-left p-4 text-gray-400 text-sm">Category</th>
              <th className="text-left p-4 text-gray-400 text-sm">Author</th>
              <th className="text-left p-4 text-gray-400 text-sm">Status</th>
              <th className="text-left p-4 text-gray-400 text-sm">Date</th>
              <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-gray-700">
                <td className="p-4 text-white">{post.title}</td>
                <td className="p-4"><span className="text-xs bg-primary text-accent px-2 py-0.5 rounded">{post.category}</span></td>
                <td className="p-4 text-gray-400">{post.author?.name}</td>
                <td className="p-4">
                  <button onClick={() => togglePublish(post)} className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="p-4 text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-accent hover:text-blue-400 mr-3">Edit</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="p-8 text-center text-gray-400">No blog posts yet</p>}
      </div>
    </div>
  )
}
