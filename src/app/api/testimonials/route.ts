import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json([], { status: 200 })
  }
}
