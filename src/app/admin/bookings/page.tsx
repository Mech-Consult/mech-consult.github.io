'use client'

import { useEffect, useState } from 'react'

interface Booking {
  id: string
  date: string
  status: string
  amount: number
  notes?: string
  service: { title: string; price: number }
  user: { name: string; email: string }
  payment?: { status: string; stripeId?: string }
  createdAt: string
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings')
    if (res.ok) setBookings(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchBookings() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchBookings()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-400/20 text-yellow-400',
    CONFIRMED: 'bg-accent/20 text-accent',
    COMPLETED: 'bg-green-400/20 text-green-400',
    CANCELLED: 'bg-red-400/20 text-red-400',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Bookings</h1>

      <div className="bg-secondary rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm">Service</th>
              <th className="text-left p-4 text-gray-400 text-sm">Client</th>
              <th className="text-left p-4 text-gray-400 text-sm">Date</th>
              <th className="text-left p-4 text-gray-400 text-sm">Amount</th>
              <th className="text-left p-4 text-gray-400 text-sm">Payment</th>
              <th className="text-left p-4 text-gray-400 text-sm">Status</th>
              <th className="text-left p-4 text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-700">
                <td className="p-4 text-white">{booking.service.title}</td>
                <td className="p-4">
                  <p className="text-white">{booking.user.name}</p>
                  <p className="text-xs text-gray-400">{booking.user.email}</p>
                </td>
                <td className="p-4 text-gray-400">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="p-4 text-accent font-semibold">${booking.amount}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${booking.payment?.status === 'COMPLETED' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                    {booking.payment?.status || 'Unpaid'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                </td>
                <td className="p-4">
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="bg-primary border border-gray-600 rounded px-2 py-1 text-xs text-white"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p className="p-8 text-center text-gray-400">No bookings yet</p>}
      </div>
    </div>
  )
}
