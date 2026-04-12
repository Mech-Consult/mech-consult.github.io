'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Booking {
  id: string
  date: string
  status: string
  amount: number
  notes?: string
  service: { title: string; description: string; duration: number }
  payment?: { status: string }
  createdAt: string
}

export default function PortalBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch('/api/bookings')
      if (res.ok) setBookings(await res.json())
      setLoading(false)
    }
    fetchBookings()
  }, [])

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter)

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-400/20 text-yellow-400',
    CONFIRMED: 'bg-accent/20 text-accent',
    COMPLETED: 'bg-green-400/20 text-green-400',
    CANCELLED: 'bg-red-400/20 text-red-400',
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">My Bookings</h2>
        <Link href="/services" className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition text-sm">
          Book New Service
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filter === f ? 'bg-accent text-primary' : 'bg-secondary text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-secondary rounded-xl p-12 border border-gray-700 text-center">
          <p className="text-gray-400 mb-4">No bookings found.</p>
          <Link href="/services" className="text-accent hover:text-blue-400 transition">Browse services</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-secondary rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{booking.service.title}</h3>
                  <p className="text-sm text-gray-400">{booking.service.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-400">Date: {new Date(booking.date).toLocaleDateString()}</span>
                    <span className="text-sm text-gray-400">Duration: {booking.service.duration}h</span>
                    <span className="text-sm text-gray-400">Booked: {new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                  {booking.notes && <p className="text-sm text-gray-500 mt-2 italic">Notes: {booking.notes}</p>}
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-xl font-bold text-accent">${booking.amount}</p>
                    <p className="text-xs text-gray-400">
                      {booking.payment?.status === 'COMPLETED' ? 'Paid' : 'Payment pending'}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
