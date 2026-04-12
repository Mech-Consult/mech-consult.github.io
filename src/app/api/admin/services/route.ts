import { NextRequest, NextResponse } from 'next/server'
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

  const services = await prisma.service.findMany({
    include: { _count: { select: { bookings: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(services)
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const service = await prisma.service.create({ data })
  return NextResponse.json(service, { status: 201 })
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const service = await prisma.service.update({ where: { id }, data })
  return NextResponse.json(service)
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.json()
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
