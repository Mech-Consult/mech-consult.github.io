'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">MechConsult</h3>
            <p className="text-gray-400">
              Professional Mechatronics Engineering & Consulting Services
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition">Projects</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-accent transition">Design Consultation</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Robotics Development</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Automation Systems</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">IoT Integration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:info@mechconsult.com" className="hover:text-accent transition">info@mechconsult.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-accent transition">+1 (234) 567-890</a></li>
              <li>123 Tech Street, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">&copy; {currentYear} MechConsult. All rights reserved.</p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="/login" className="hover:text-accent transition">Client Login</Link>
            <Link href="/register" className="hover:text-accent transition">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
