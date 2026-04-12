import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactConfirmation, sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to database
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    })

    // Send confirmation email to user
    await sendContactConfirmation(email, name).catch(console.error)

    // Notify admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@mechconsult.com',
      subject: `New Contact: ${subject}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }).catch(console.error)

    // Track analytics
    await prisma.analyticsEvent.create({
      data: { event: 'contact_form_submit', page: '/contact', metadata: JSON.stringify({ subject }) },
    }).catch(console.error)

    return NextResponse.json({ message: 'Message received. We will contact you soon!' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
