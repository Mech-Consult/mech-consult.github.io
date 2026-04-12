'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  totalPageViews: number
  totalContacts: number
  totalBookings: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, messagesRes, bookingsRes] = await Promise.all([
          fetch('/api/admin/analytics'),
          fetch('/api/admin/messages'),
          fetch('/api/admin/bookings'),
        ])

        if (analyticsRes.ok) {
          const data = await analyticsRes.json()
          setStats(data)
        }
        if (messagesRes.ok) {
          const msgs = await messagesRes.json()
          setRecentMessages(msgs.slice(0, 5))
        }
        if (bookingsRes.ok) {
          const bks = await bookingsRes.json()
          setRecentBookings(bks.slice(0, 5))
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    )
  }

  const statCards = [
    { label: 'Page Views', value: stats?.totalPageViews ?? 0, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Messages', value: stats?.totalContacts ?? 0, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Bookings', value: stats?.totalBookings ?? 0, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Revenue', value: `$${(stats?.totalRevenue ?? 0).toLocaleString()}`, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-6 border border-gray-700`}>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Messages</h2>
          {recentMessages.length === 0 ? (
            <p className="text-gray-400">No messages yet</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="flex items-start justify-between p-3 bg-primary rounded-lg">
                  <div>
                    <p className="text-white font-medium">{msg.name}</p>
                    <p className="text-sm text-gray-400">{msg.subject}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    msg.status === 'NEW' ? 'bg-accent/20 text-accent' :
                    msg.status === 'READ' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-green-400/20 text-green-400'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-400">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-start justify-between p-3 bg-primary rounded-lg">
                  <div>
                    <p className="text-white font-medium">{booking.service?.title}</p>
                    <p className="text-sm text-gray-400">{booking.user?.name} - {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400' :
                    booking.status === 'CONFIRMED' ? 'bg-accent/20 text-accent' :
                    booking.status === 'COMPLETED' ? 'bg-green-400/20 text-green-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
