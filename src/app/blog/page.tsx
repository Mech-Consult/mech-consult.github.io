'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import GlowCard from '@/components/GlowCard'
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
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="container relative animate-fadeIn">
          <h1 className="section-title text-4xl md:text-5xl">Blog & Insights</h1>
          <p className="text-xl text-gray-300">Technical articles, tutorials, and industry insights</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-primary border-b border-gray-800 sticky top-[72px] z-30 backdrop-blur-lg bg-primary/90">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent text-primary shadow-lg shadow-accent/25'
                    : 'bg-secondary text-gray-400 hover:text-white hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-primary bg-dots">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 150}>
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <GlowCard className="h-full">
                      <div className="flex flex-col h-full">
                        {post.coverImage && (
                          <div className="h-48 -mx-6 -mt-6 mb-6 bg-gradient-to-br from-accent/20 to-blue-500/20 flex items-center justify-center rounded-t-xl overflow-hidden">
                            <span className="text-5xl text-accent/40 group-hover:scale-110 transition-transform duration-500">&#9998;</span>
                          </div>
                        )}
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
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                          <p className="text-xs text-gray-500">By {post.authorName}</p>
                          <span className="text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Read
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </ScrollReveal>
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
