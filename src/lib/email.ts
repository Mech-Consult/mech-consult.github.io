// Utility functions for email sending
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export async function sendEmail({
  to,
  subject,
  html,
  text
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendContactConfirmation(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'We received your message',
    text: `Hello ${name}, Thank you for reaching out. We will review your message and get back to you soon.`,
    html: `
      <h2>Thank you for reaching out, ${name}!</h2>
      <p>We have received your message and will review it shortly.</p>
      <p>We will get back to you as soon as possible.</p>
      <p>Best regards,<br>MechConsult Team</p>
    `
  })
}

export async function sendBookingConfirmation(
  email: string,
  serviceName: string,
  date: string
) {
  return sendEmail({
    to: email,
    subject: 'Booking Confirmation',
    text: `Your booking for ${serviceName} on ${date} has been confirmed.`,
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Service: ${serviceName}</p>
      <p>Date: ${date}</p>
      <p>Thank you for booking with MechConsult.</p>
    `
  })
}
