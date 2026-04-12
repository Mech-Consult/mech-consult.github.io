'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-accent">
          MechConsult
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-300 hover:text-accent transition">
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden bg-secondary px-4 py-4 space-y-2 border-t border-gray-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block text-gray-300 hover:text-accent transition py-2" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <hr className="border-gray-700" />
          <Link
            href="/contact"
            className="block bg-accent text-primary px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      )}
    </header>
  )
}
