'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import TestimonialCard from '@/components/TestimonialCard'
import type { Testimonial } from '@/types'

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials')
        if (res.ok) setTestimonials(await res.json())
      } catch {
        // Use fallback data
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="container text-center animate-fadeIn relative z-10">
          <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            15+ Years of Engineering Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Advanced Mechatronics <span className="text-accent">Engineering Solutions</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your ideas into reality with cutting-edge mechatronics engineering,
            robotics automation, and IoT solutions. Expert consultation for projects of all scales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-primary">Explore Services</Link>
            <Link href="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-primary">
        <div className="container">
          <h2 className="section-title text-center">Core Services</h2>
          <p className="section-subtitle text-center">Comprehensive solutions for your engineering needs</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '&#128295;', title: 'Design & Engineering', description: 'Custom mechatronics systems design and technical consultation' },
              { icon: '&#9881;', title: 'Automation Development', description: 'Industrial automation and robotics implementation' },
              { icon: '&#128225;', title: 'IoT Solutions', description: 'Smart systems and IoT integration for modern applications' },
              { icon: '&#128300;', title: 'Testing & Validation', description: 'Quality assurance and system performance testing' },
              { icon: '&#128202;', title: 'Project Management', description: 'End-to-end project oversight and technical leadership' },
              { icon: '&#128101;', title: 'Team Training', description: 'Expert training and knowledge transfer for your team' },
            ].map((service, idx) => (
              <Link key={idx} href="/services" className="card text-center group hover:border-accent/30 border border-transparent transition">
                <div className="text-5xl mb-4" dangerouslySetInnerHTML={{ __html: service.icon }}></div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center">Featured Projects</h2>
          <p className="section-subtitle text-center">Showcasing recent completed projects</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Autonomous Robotic Arm', category: 'Robotics', description: 'A 6-DOF robotic arm with computer vision integration for precision manufacturing' },
              { title: 'Smart Building Automation', category: 'IoT/Automation', description: 'Complete building automation system with sensor networks and control systems' },
              { title: 'Drone Delivery System', category: 'Unmanned Systems', description: 'Autonomous drone delivery platform with AI pathfinding and obstacle avoidance' },
            ].map((project, idx) => (
              <div key={idx} className="card">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-accent text-sm mb-3">{project.category}</p>
                <p className="text-gray-400">{project.description}</p>
                <Link href="/projects" className="inline-block mt-4 text-accent hover:text-blue-400 transition">
                  View Projects &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-primary">
          <div className="container">
            <h2 className="section-title text-center">What Clients Say</h2>
            <p className="section-subtitle text-center">Trusted by industry leaders worldwide</p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center">Why Choose MechConsult?</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '100+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="section-title">Latest Insights</h2>
              <p className="section-subtitle">Technical articles and industry news</p>
            </div>
            <Link href="/blog" className="text-accent hover:text-blue-400 transition hidden md:block">
              View All &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'The Future of Industrial Automation', category: 'Automation', excerpt: 'Exploring the latest trends in industrial automation, from collaborative robots to AI-driven quality control.' },
              { title: 'Getting Started with ROS2', category: 'Robotics', excerpt: 'A practical guide to Robot Operating System 2 and how it can accelerate your robotics workflow.' },
              { title: 'Building Reliable IoT Networks', category: 'IoT', excerpt: 'Best practices for designing and deploying industrial IoT sensor networks.' },
            ].map((post, idx) => (
              <Link key={idx} href="/blog" className="card group border border-transparent hover:border-accent/30 transition">
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">{post.category}</span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2 group-hover:text-accent transition">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link href="/blog" className="text-accent hover:text-blue-400 transition mt-6 inline-block md:hidden">View All Posts &rarr;</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-blue-400">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to Start Your Project?</h2>
          <p className="text-primary/80 mb-8 text-lg">
            Get in touch with us for a free consultation and project assessment
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-accent px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
