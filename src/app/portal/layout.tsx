'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

const portalLinks = [
  { label: 'Dashboard', href: '/portal' },
  { label: 'My Bookings', href: '/portal/bookings' },
  { label: 'Profile', href: '/portal/profile' },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-primary">
      {/* Portal Header */}
      <div className="bg-secondary border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Client Portal</h1>
              <p className="text-sm text-gray-400">Welcome, {session?.user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition text-sm">View Site</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-400 hover:text-red-300 transition text-sm">
                Sign Out
              </button>
            </div>
          </div>

          <nav className="flex gap-1 mt-4">
            {portalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? 'bg-accent/20 text-accent'
                    : 'text-gray-400 hover:text-white hover:bg-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
