import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'
import Analytics from '@/components/Analytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MechConsult - Mechatronics Engineering & Consulting',
  description: 'Professional Mechatronics Engineer providing consultation, design, and development services in robotics, automation, and IoT.',
  keywords: 'mechatronics, engineering, consulting, robotics, automation, IoT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary text-gray-100`}>
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  )
}
