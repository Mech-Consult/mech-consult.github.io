'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">Get In Touch</h1>
          <p className="text-xl text-gray-300">Let&apos;s discuss your project and find the perfect solution</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '📧', title: 'Email', value: 'info@mechconsult.com', link: 'mailto:info@mechconsult.com' },
              { icon: '📱', title: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
              { icon: '📍', title: 'Location', value: '123 Tech Street, City, Country', link: '#' },
            ].map((contact) => (
              <a key={contact.title} href={contact.link} className="card text-center hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{contact.title}</h3>
                <p className="text-gray-400">{contact.value}</p>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

            {status === 'success' && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
                Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition" placeholder="+1 (555) 000-0000" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition" placeholder="Project inquiry" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition" placeholder="Tell me about your project..."></textarea>
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full btn-primary disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: 'What is your typical project timeline?', a: 'Timeline varies based on project complexity. A consultation can take 1-2 weeks, while larger projects like robotics systems may take 3-6 months.' },
              { q: 'Do you offer ongoing support after project completion?', a: 'Yes, I offer post-project support packages. This includes troubleshooting, updates, and optimization.' },
              { q: 'What is your minimum project requirement?', a: 'I work on projects of all sizes, from small consultations to large-scale implementations. Minimum engagement is typically one day of consultation.' },
              { q: 'How do you ensure project confidentiality?', a: 'All projects are covered by NDA agreements. I maintain strict confidentiality and only discuss projects with explicit client permission.' },
            ].map((faq, idx) => (
              <details key={idx} className="card cursor-pointer">
                <summary className="font-semibold text-white hover:text-accent transition">{faq.q}</summary>
                <p className="text-gray-400 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
