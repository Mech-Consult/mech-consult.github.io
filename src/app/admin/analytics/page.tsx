'use client'

import { useEffect, useState } from 'react'

interface AnalyticsData {
  totalPageViews: number
  totalContacts: number
  totalBookings: number
  totalRevenue: number
  pageViewsByPage: { page: string; count: number }[]
  bookingsByStatus: { status: string; count: number }[]
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch('/api/admin/analytics')
      if (res.ok) setData(await res.json())
      setLoading(false)
    }
    fetchAnalytics()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  const stats = [
    { label: 'Total Page Views', value: data?.totalPageViews ?? 0, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Contact Messages', value: data?.totalContacts ?? 0, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Total Bookings', value: data?.totalBookings ?? 0, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Total Revenue', value: `$${(data?.totalRevenue ?? 0).toLocaleString()}`, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-6 border border-gray-700`}>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Top Pages</h2>
          {data?.pageViewsByPage && data.pageViewsByPage.length > 0 ? (
            <div className="space-y-3">
              {data.pageViewsByPage.map((pv, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-300">{pv.page}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-primary rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2"
                        style={{ width: `${Math.min(100, (pv.count / (data.pageViewsByPage[0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-accent font-semibold text-sm w-12 text-right">{pv.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No page view data yet</p>
          )}
        </div>

        {/* Bookings by Status */}
        <div className="bg-secondary rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Bookings by Status</h2>
          {data?.bookingsByStatus && data.bookingsByStatus.length > 0 ? (
            <div className="space-y-3">
              {data.bookingsByStatus.map((b, i) => {
                const colors: Record<string, string> = {
                  PENDING: 'bg-yellow-400', CONFIRMED: 'bg-blue-400',
                  COMPLETED: 'bg-green-400', CANCELLED: 'bg-red-400',
                }
                return (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-300">{b.status}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-primary rounded-full h-2">
                        <div className={`${colors[b.status] || 'bg-gray-400'} rounded-full h-2`} style={{ width: `${Math.min(100, (b.count / (data.totalBookings || 1)) * 100)}%` }} />
                      </div>
                      <span className="text-accent font-semibold text-sm w-12 text-right">{b.count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-400">No booking data yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
