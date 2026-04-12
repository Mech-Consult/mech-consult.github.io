'use client'

import { useState, useMemo } from 'react'
import ServiceCard from '@/components/ServiceCard'
import ScrollReveal from '@/components/ScrollReveal'
import { SERVICES } from '@/lib/static-data'

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default')

  const filteredServices = useMemo(() => {
    let result = SERVICES.filter(s => {
      if (!searchQuery) return true
      return s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    })

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price)

    return result
  }, [searchQuery, sortBy])

  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="container relative animate-fadeIn">
          <h1 className="section-title text-4xl md:text-5xl">Services & Solutions</h1>
          <p className="text-xl text-gray-300">Professional engineering services tailored to your needs</p>
        </div>
      </section>

      {/* Search & Sort */}
      <section className="py-8 bg-primary border-b border-gray-800 sticky top-[72px] z-30 backdrop-blur-lg bg-primary/90">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all w-full md:w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition"
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary bg-dots">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center mb-4">What I Offer</h2>
            <p className="section-subtitle text-center mb-12">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
            </p>
          </ScrollReveal>

          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => (
                <ScrollReveal key={service.id} delay={idx * 100}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg">No services found.</p>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center mb-16">How I Work</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/50 via-accent to-accent/50"></div>

            {[
              { num: '1', title: 'Consultation', description: 'Initial meeting to understand your requirements and goals' },
              { num: '2', title: 'Planning', description: 'Develop detailed project plan and technical approach' },
              { num: '3', title: 'Execution', description: 'Implement solution with regular progress updates' },
              { num: '4', title: 'Delivery', description: 'Final testing, training, and handover' },
            ].map((step, idx) => (
              <ScrollReveal key={step.num} delay={idx * 200} direction="up">
                <div className="text-center relative">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary border-2 border-accent flex items-center justify-center relative z-10 hover-glow transition-all duration-300">
                    <span className="text-3xl font-bold gradient-text-static">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Need a Custom Solution?</h2>
          <p className="text-primary/80 mb-8 text-lg">Let&apos;s discuss your specific requirements and find the perfect solution</p>
          <a href="/contact" className="inline-block bg-primary text-accent px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg">Get Free Consultation</a>
        </ScrollReveal>
      </section>
    </div>
  )
}
