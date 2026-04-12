'use client'

import { useState, useMemo } from 'react'
import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import { PROJECTS } from '@/lib/static-data'

const categories = ['All', 'Robotics', 'IoT & Automation', 'Unmanned Systems', 'Vision Systems', 'Power Systems', 'IoT & ML']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const otherProjects = filteredProjects.filter(p => !p.featured)

  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="container relative animate-fadeIn">
          <h1 className="section-title text-4xl md:text-5xl">Portfolio</h1>
          <p className="text-xl text-gray-300">Showcase of completed projects and case studies</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-primary border-b border-gray-800 sticky top-[72px] z-30 backdrop-blur-lg bg-primary/90">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all w-full md:w-64"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-primary bg-dots">
          <div className="container">
            <ScrollReveal>
              <h2 className="section-title text-center mb-12">Featured Projects</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 100}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      {otherProjects.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container">
            <ScrollReveal>
              <h2 className="section-title text-center mb-4">
                {activeCategory === 'All' ? 'All Projects' : activeCategory}
              </h2>
              <p className="section-subtitle text-center mb-12">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, idx) => (
                <ScrollReveal key={project.id} delay={idx * 100}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredProjects.length === 0 && (
        <section className="py-20 bg-primary">
          <div className="container text-center">
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            <button onClick={() => { setActiveCategory('All'); setSearchQuery('') }} className="mt-4 text-accent hover:text-blue-400 transition">
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Project Statistics */}
      <section className="py-24 bg-gradient-to-b from-primary to-secondary relative">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center mb-12">Project Statistics</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { end: 100, suffix: '+', label: 'Total Projects' },
              { end: 12, suffix: '+', label: 'Industries Served' },
              { end: 50, suffix: '+', label: 'Team Collaborators' },
              { end: 98, suffix: '%', label: 'Success Rate' },
            ].map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 100} direction="none">
                <div className="text-center p-6 rounded-xl bg-secondary/50 backdrop-blur-sm border border-gray-700/50 hover-lift">
                  <p className="text-4xl font-bold text-accent mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-accent to-blue-400 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <ScrollReveal className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Have a Project in Mind?</h2>
          <p className="text-primary/80 mb-8 text-lg">Let&apos;s discuss how I can help bring your vision to life</p>
          <a href="/contact" className="inline-block bg-primary text-accent px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg">Start a Project</a>
        </ScrollReveal>
      </section>
    </div>
  )
}
