'use client'

import { useEffect, useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/types'

const categories = ['All', 'Robotics', 'IoT & Automation', 'Unmanned Systems', 'Vision Systems', 'Power Systems', 'IoT & ML']

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      const params = new URLSearchParams()
      if (activeCategory !== 'All') params.set('category', activeCategory)
      if (searchQuery) params.set('search', searchQuery)

      const res = await fetch(`/api/projects?${params}`)
      if (res.ok) setProjects(await res.json())
      setLoading(false)
    }
    fetchProjects()
  }, [activeCategory, searchQuery])

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">Portfolio</h1>
          <p className="text-xl text-gray-300">Showcase of completed projects and case studies</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-primary border-b border-gray-800">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setLoading(true) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeCategory === cat
                      ? 'bg-accent text-primary'
                      : 'bg-secondary text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setLoading(true) }}
              placeholder="Search projects..."
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition w-full md:w-64"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-20 bg-primary">
          <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>
        </section>
      ) : (
        <>
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="py-20 bg-primary">
              <div className="container">
                <h2 className="section-title text-center mb-12">Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Projects */}
          {otherProjects.length > 0 && (
            <section className="py-20 bg-secondary">
              <div className="container">
                <h2 className="section-title text-center mb-4">
                  {activeCategory === 'All' ? 'All Projects' : activeCategory}
                </h2>
                <p className="section-subtitle text-center mb-12">
                  {projects.length} project{projects.length !== 1 ? 's' : ''} found
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {projects.length === 0 && (
            <section className="py-20 bg-primary">
              <div className="container text-center">
                <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
                <button onClick={() => { setActiveCategory('All'); setSearchQuery('') }} className="mt-4 text-accent hover:text-blue-400 transition">
                  Clear filters
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {/* Project Statistics */}
      <section className="py-20 bg-primary">
        <div className="container">
          <h2 className="section-title text-center mb-12">Project Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Total Projects', value: '100+' },
              { label: 'Industries Served', value: '12+' },
              { label: 'Team Size', value: '5-50' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center card">
                <p className="text-3xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-blue-400">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Have a Project in Mind?</h2>
          <p className="text-primary/80 mb-8 text-lg">Let&apos;s discuss how I can help bring your vision to life</p>
          <a href="/contact" className="inline-block bg-primary text-accent px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition">Start a Project</a>
        </div>
      </section>
    </div>
  )
}
