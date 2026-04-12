'use client'

import { useEffect, useState } from 'react'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/types'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default')

  useEffect(() => {
    async function fetchServices() {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)

      const res = await fetch(`/api/services?${params}`)
      if (res.ok) setServices(await res.json())
      setLoading(false)
    }
    fetchServices()
  }, [searchQuery])

  const sortedServices = [...services].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

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
              onChange={(e) => { setSearchQuery(e.target.value); setLoading(true) }}
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
            {services.length} service{services.length !== 1 ? 's' : ''} available
          </p>

          {loading ? (
            <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>
          ) : sortedServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((service) => (
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
