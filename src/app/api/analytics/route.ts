import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { event, page, metadata, sessionId } = await request.json()

    await prisma.analyticsEvent.create({
      data: {
        event: event || 'page_view',
        page: page || '/',
        metadata: metadata ? JSON.stringify(metadata) : null,
        sessionId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Silently handle analytics errors
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
