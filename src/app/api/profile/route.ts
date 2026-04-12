import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: { profile: true },
  })

  return NextResponse.json(user)
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, phone, company, bio } = await request.json()
  const userId = (session.user as any).id

  await prisma.user.update({
    where: { id: userId },
    data: { name },
  })

  await prisma.profile.upsert({
    where: { userId },
    update: { phone, company, bio },
    create: { userId, phone, company, bio },
  })

  return NextResponse.json({ success: true })
}
