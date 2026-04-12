import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const bookingId = paymentIntent.metadata.bookingId

      // Update payment status
      await prisma.payment.update({
        where: { stripeId: paymentIntent.id },
        data: { status: 'COMPLETED' },
      })

      // Update booking status
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CONFIRMED' },
      })

      // Track analytics
      await prisma.analyticsEvent.create({
        data: {
          event: 'payment_completed',
          page: '/payments',
          metadata: JSON.stringify({ bookingId, amount: paymentIntent.amount / 100 }),
        },
      })
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await prisma.payment.update({
        where: { stripeId: paymentIntent.id },
        data: { status: 'FAILED' },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}
