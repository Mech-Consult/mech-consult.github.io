'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/static-data'

const categories = ['All', 'Automation', 'Robotics', 'IoT', 'Engineering', 'Tutorial']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      if (!p.published) return false
      if (activeCategory === 'All') return true
      return p.category === activeCategory
    })
  }, [activeCategory])

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">Blog & Insights</h1>
          <p className="text-xl text-gray-300">Technical articles, tutorials, and industry insights</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-primary border-b border-gray-800">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === cat ? 'bg-accent text-primary' : 'bg-secondary text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-primary">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-secondary rounded-xl overflow-hidden hover:shadow-xl transition duration-300 h-full flex flex-col">
                    {post.coverImage && (
                      <div className="h-48 bg-gradient-to-br from-accent/20 to-blue-500/20 flex items-center justify-center">
                        <span className="text-4xl text-accent/50">&#9998;</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition">{post.title}</h2>
                      <p className="text-gray-400 text-sm flex-grow line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-primary text-gray-400 px-2 py-0.5 rounded">#{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">By {post.authorName}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No blog posts found.</p>
              {activeCategory !== 'All' && (
                <button onClick={() => setActiveCategory('All')} className="text-accent hover:text-blue-400 transition">View all posts</button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
