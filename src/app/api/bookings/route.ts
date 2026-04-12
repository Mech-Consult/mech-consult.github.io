import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { serviceId, date, notes } = await request.json()

    if (!serviceId || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const userId = (session.user as any).id

    const booking = await prisma.booking.create({
      data: {
        userId,
        serviceId,
        date: new Date(date),
        notes,
        amount: service.price,
        status: 'PENDING',
      },
      include: { service: true },
    })

    // Send confirmation email
    await sendBookingConfirmation(
      session.user.email!,
      service.title,
      new Date(date).toLocaleDateString()
    ).catch(console.error)

    // Track analytics
    await prisma.analyticsEvent.create({
      data: {
        event: 'booking_created',
        page: `/services/${serviceId}`,
        metadata: JSON.stringify({ serviceId, amount: service.price }),
      },
    }).catch(console.error)

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { service: true, payment: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Booking fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
