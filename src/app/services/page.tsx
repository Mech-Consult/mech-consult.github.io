'use client'

import { useState, useMemo } from 'react'
import ServiceCard from '@/components/ServiceCard'
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
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">Services & Solutions</h1>
          <p className="text-xl text-gray-300">Professional engineering services tailored to your needs</p>
        </div>
      </section>

      {/* Search & Sort */}
      <section className="py-8 bg-primary border-b border-gray-800">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition w-full md:w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
            >
              <option value="default">Default Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary">
        <div className="container">
          <h2 className="section-title text-center mb-4">What I Offer</h2>
          <p className="section-subtitle text-center mb-12">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
          </p>

          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg">No services found.</p>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center mb-12">How I Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Consultation', description: 'Initial meeting to understand your requirements and goals' },
              { num: '2', title: 'Planning', description: 'Develop detailed project plan and technical approach' },
              { num: '3', title: 'Execution', description: 'Implement solution with regular progress updates' },
              { num: '4', title: 'Delivery', description: 'Final testing, training, and handover' },
            ].map((step) => (
              <div key={step.num} className="card text-center">
                <div className="text-4xl font-bold text-accent mb-3">{step.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-accent to-blue-400">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Need a Custom Solution?</h2>
          <p className="text-primary/80 mb-8 text-lg">Let&apos;s discuss your specific requirements and find the perfect solution</p>
          <a href="/contact" className="inline-block bg-primary text-accent px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition">Get Free Consultation</a>
        </div>
      </section>
    </div>
  )
}
