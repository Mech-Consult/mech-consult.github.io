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

  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const testimonial = await prisma.testimonial.create({ data })
  return NextResponse.json(testimonial, { status: 201 })
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, ...data } = await request.json()
  const testimonial = await prisma.testimonial.update({ where: { id }, data })
  return NextResponse.json(testimonial)
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.json()
  await prisma.testimonial.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
