'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import GlowCard from '@/components/GlowCard'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, phone, subject, message } = formData
    const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone || 'N/A'}%0A%0A${message}`
    window.location.href = `mailto:info@mechconsult.com?subject=${encodeURIComponent(subject)}&body=${body}`
    setStatus('success')
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
        <div className="container relative animate-fadeIn">
          <h1 className="section-title text-4xl md:text-5xl">Get In Touch</h1>
          <p className="text-xl text-gray-300">Let&apos;s discuss your project and find the perfect solution</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-primary bg-dots">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '&#128231;', title: 'Email', value: 'info@mechconsult.com', link: 'mailto:info@mechconsult.com' },
              { icon: '&#128241;', title: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
              { icon: '&#128205;', title: 'Location', value: '123 Tech Street, City, Country', link: '#' },
            ].map((contact, idx) => (
              <ScrollReveal key={contact.title} delay={idx * 150}>
                <a href={contact.link} className="block group">
                  <GlowCard>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300">
                        <span className="text-3xl" dangerouslySetInnerHTML={{ __html: contact.icon }}></span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition">{contact.title}</h3>
                      <p className="text-gray-400">{contact.value}</p>
                    </div>
                  </GlowCard>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-secondary rounded-xl p-8 border border-gray-700/50 hover-glow transition-all duration-500">
              <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

              {status === 'success' && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 animate-fadeIn">
                  Your email client should open shortly. If it doesn&apos;t, please email us directly at info@mechconsult.com
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all" placeholder="Project inquiry" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                </div>

                <button type="submit" className="w-full btn-primary text-lg py-4">
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-secondary relative">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: 'What is your typical project timeline?', a: 'Timeline varies based on project complexity. A consultation can take 1-2 weeks, while larger projects like robotics systems may take 3-6 months.' },
              { q: 'Do you offer ongoing support after project completion?', a: 'Yes, I offer post-project support packages. This includes troubleshooting, updates, and optimization.' },
              { q: 'What is your minimum project requirement?', a: 'I work on projects of all sizes, from small consultations to large-scale implementations. Minimum engagement is typically one day of consultation.' },
              { q: 'How do you ensure project confidentiality?', a: 'All projects are covered by NDA agreements. I maintain strict confidentiality and only discuss projects with explicit client permission.' },
            ].map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <details className="group bg-primary/50 rounded-xl p-6 border border-gray-700/50 cursor-pointer hover:border-accent/20 transition-all duration-300">
                  <summary className="font-semibold text-white hover:text-accent transition flex items-center justify-between">
                    {faq.q}
                    <span className="text-accent group-open:rotate-45 transition-transform duration-300 text-xl ml-2">+</span>
                  </summary>
                  <p className="text-gray-400 mt-4 animate-fadeIn">{faq.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
