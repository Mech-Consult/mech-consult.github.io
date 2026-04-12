'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PortalDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch('/api/bookings')
      if (res.ok) setBookings(await res.json())
      setLoading(false)
    }
    fetchBookings()
  }, [])

  const activeBookings = bookings.filter(b => b.status === 'PENDING' || b.status === 'CONFIRMED')
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED')
  const totalSpent = bookings.filter(b => b.status !== 'CANCELLED').reduce((sum: number, b: any) => sum + b.amount, 0)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Active Bookings</p>
          <p className="text-3xl font-bold text-accent">{activeBookings.length}</p>
        </div>
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Completed Projects</p>
          <p className="text-3xl font-bold text-green-400">{completedBookings.length}</p>
        </div>
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Invested</p>
          <p className="text-3xl font-bold text-yellow-400">${totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Recent Bookings</h3>
          <Link href="/portal/bookings" className="text-accent hover:text-blue-400 transition text-sm">View All</Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No bookings yet.</p>
            <Link href="/services" className="btn-primary inline-block">Browse Services</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-primary rounded-lg">
                <div>
                  <p className="text-white font-medium">{booking.service?.title}</p>
                  <p className="text-sm text-gray-400">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-accent font-semibold">${booking.amount}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400' :
                    booking.status === 'CONFIRMED' ? 'bg-accent/20 text-accent' :
                    booking.status === 'COMPLETED' ? 'bg-green-400/20 text-green-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/services" className="bg-secondary rounded-xl p-6 border border-gray-700 hover:border-accent transition text-center">
          <div className="text-3xl mb-2">&#128736;</div>
          <h3 className="text-white font-semibold">Browse Services</h3>
          <p className="text-sm text-gray-400">Explore available services</p>
        </Link>
        <Link href="/portal/bookings" className="bg-secondary rounded-xl p-6 border border-gray-700 hover:border-accent transition text-center">
          <div className="text-3xl mb-2">&#128197;</div>
          <h3 className="text-white font-semibold">My Bookings</h3>
          <p className="text-sm text-gray-400">View booking history</p>
        </Link>
        <Link href="/contact" className="bg-secondary rounded-xl p-6 border border-gray-700 hover:border-accent transition text-center">
          <div className="text-3xl mb-2">&#128172;</div>
          <h3 className="text-white font-semibold">Contact Support</h3>
          <p className="text-sm text-gray-400">Get help or ask questions</p>
        </Link>
      </div>
    </div>
  )
}
