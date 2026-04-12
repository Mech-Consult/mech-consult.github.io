'use client'

import Link from 'next/link'
import TestimonialCard from '@/components/TestimonialCard'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import ParticleField from '@/components/ParticleField'
import TypeWriter from '@/components/TypeWriter'
import GlowCard from '@/components/GlowCard'
import { TESTIMONIALS, BLOG_POSTS } from '@/lib/static-data'

export default function Home() {
  const featuredTestimonials = TESTIMONIALS.filter(t => t.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-secondary px-4 relative overflow-hidden">
        {/* Particle background */}
        <ParticleField />

        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-glow-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-glow-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-[30%] left-[20%] w-4 h-4 bg-accent/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[60%] right-[10%] w-2 h-2 bg-cyan-300/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-[40%] left-[5%] w-6 h-6 border border-accent/20 rounded-lg animate-float-slow rotate-45" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-[20%] right-[25%] w-5 h-5 border border-blue-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>

          {/* Orbiting ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-accent/5 rounded-full animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-accent/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="animate-fadeIn">
            <div className="inline-block bg-accent/10 text-accent px-5 py-2.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/20">
              15+ Years of Engineering Excellence
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp">
            Advanced Mechatronics{' '}
            <span className="gradient-text">Engineering Solutions</span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-400 mb-4 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <TypeWriter
              words={['Robotics Automation', 'IoT Solutions', 'Control Systems', 'AI Integration', 'Industrial Innovation']}
              className="text-accent font-semibold"
            />
          </div>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            Transform your ideas into reality with cutting-edge mechatronics engineering.
            Expert consultation for projects of all scales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '600ms' }}>
            <Link href="/services" className="btn-primary text-lg px-8 py-4">Explore Services</Link>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">Get in Touch</Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-float" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-primary bg-grid relative">
        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center">Core Services</h2>
            <p className="section-subtitle text-center">Comprehensive solutions for your engineering needs</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '&#128295;', title: 'Design & Engineering', description: 'Custom mechatronics systems design and technical consultation' },
              { icon: '&#9881;', title: 'Automation Development', description: 'Industrial automation and robotics implementation' },
              { icon: '&#128225;', title: 'IoT Solutions', description: 'Smart systems and IoT integration for modern applications' },
              { icon: '&#128300;', title: 'Testing & Validation', description: 'Quality assurance and system performance testing' },
              { icon: '&#128202;', title: 'Project Management', description: 'End-to-end project oversight and technical leadership' },
              { icon: '&#128101;', title: 'Team Training', description: 'Expert training and knowledge transfer for your team' },
            ].map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <Link href="/services" className="block">
                  <GlowCard>
                    <div className="text-center">
                      <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${idx * 0.3}s`, animationDuration: '5s' }} dangerouslySetInnerHTML={{ __html: service.icon }}></div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </GlowCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-secondary bg-dots relative">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">Featured Projects</h2>
            <p className="section-subtitle text-center">Showcasing recent completed projects</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Autonomous Robotic Arm', category: 'Robotics', description: 'A 6-DOF robotic arm with computer vision integration for precision manufacturing', icon: '&#129302;' },
              { title: 'Smart Building Automation', category: 'IoT/Automation', description: 'Complete building automation system with sensor networks and control systems', icon: '&#127970;' },
              { title: 'Drone Delivery System', category: 'Unmanned Systems', description: 'Autonomous drone delivery platform with AI pathfinding and obstacle avoidance', icon: '&#128747;' },
            ].map((project, idx) => (
              <ScrollReveal key={idx} delay={idx * 150} direction="up">
                <GlowCard>
                  <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: project.icon }}></div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-accent text-sm mb-3 font-medium">{project.category}</p>
                  <p className="text-gray-400">{project.description}</p>
                  <Link href="/projects" className="inline-flex items-center mt-4 text-accent hover:text-blue-400 transition group/link">
                    View Projects
                    <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary relative">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">What Clients Say</h2>
            <p className="section-subtitle text-center">Trusted by industry leaders worldwide</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.slice(0, 3).map((testimonial, idx) => (
              <ScrollReveal key={testimonial.id} delay={idx * 150} direction="up">
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-secondary to-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid opacity-50"></div>

        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center">Why Choose MechConsult?</h2>
            <p className="section-subtitle text-center">Numbers that speak for themselves</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { end: 15, suffix: '+', label: 'Years Experience' },
              { end: 100, suffix: '+', label: 'Projects Completed' },
              { end: 50, suffix: '+', label: 'Happy Clients' },
              { end: 98, suffix: '%', label: 'Success Rate' },
            ].map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} direction="none">
                <div className="text-center p-6 rounded-xl bg-secondary/50 backdrop-blur-sm border border-gray-700/50 hover-lift">
                  <p className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2500} />
                  </p>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-primary bg-dots relative">
        <div className="container">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="section-title">Latest Insights</h2>
                <p className="section-subtitle">Technical articles and industry news</p>
              </div>
              <Link href="/blog" className="text-accent hover:text-blue-400 transition hidden md:flex items-center gap-1 group">
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post, idx) => (
              <ScrollReveal key={post.id} delay={idx * 150}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <GlowCard>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">{post.category}</span>
                    <h3 className="text-lg font-bold text-white mt-3 mb-2 group-hover:text-accent transition">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.excerpt}</p>
                    <span className="text-accent text-sm mt-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </GlowCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <Link href="/blog" className="text-accent hover:text-blue-400 transition mt-6 inline-block md:hidden">View All Posts &rarr;</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-accent to-blue-400 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <ScrollReveal className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ready to Start Your Project?</h2>
          <p className="text-primary/80 mb-8 text-lg max-w-xl mx-auto">
            Get in touch with us for a free consultation and project assessment
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-accent px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-lg"
          >
            Schedule Consultation
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
