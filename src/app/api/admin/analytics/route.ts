import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function isAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user && (session.user as any).role === 'ADMIN'
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    totalPageViews,
    totalContacts,
    totalBookings,
    payments,
    recentEvents,
    bookings,
  ] = await Promise.all([
    prisma.analyticsEvent.count({ where: { event: 'page_view' } }),
    prisma.contactMessage.count(),
    prisma.booking.count(),
    prisma.payment.findMany({ where: { status: 'COMPLETED' } }),
    prisma.analyticsEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
    prisma.booking.groupBy({
      by: ['status'],
      _count: true,
    }),
  ])

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

  // Page views by page
  const pageViews = await prisma.analyticsEvent.groupBy({
    by: ['page'],
    where: { event: 'page_view' },
    _count: true,
    orderBy: { _count: { page: 'desc' } },
    take: 10,
  })

  const pageViewsByPage = pageViews.map((pv) => ({
    page: pv.page,
    count: pv._count,
  }))

  const bookingsByStatus = bookings.map((b) => ({
    status: b.status,
    count: b._count,
  }))

  return NextResponse.json({
    totalPageViews,
    totalContacts,
    totalBookings,
    totalRevenue,
    recentEvents,
    pageViewsByPage,
    bookingsByStatus,
    revenueByMonth: [],
  })
}
