'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  price: number
  duration: number
  features: string[]
}

export default function BookServicePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [booking, setBooking] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchService() {
      const res = await fetch('/api/services')
      if (res.ok) {
        const services = await res.json()
        const found = services.find((s: Service) => s.id === params.id)
        setService(found || null)
      }
      setLoading(false)
    }
    fetchService()
  }, [params.id])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      router.push('/login')
      return
    }

    setBooking(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: params.id, date, notes }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Booking failed')
      }

      const bookingData = await res.json()
      setSuccess(true)

      // Initiate payment
      const payRes = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: bookingData.id }),
      })

      if (payRes.ok) {
        // Payment intent created - in production you'd redirect to Stripe checkout
        setTimeout(() => router.push('/portal/bookings'), 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBooking(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>
  if (!service) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Service not found</p></div>

  // Min date is tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div>
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">Book Service</h1>
          <p className="text-xl text-gray-300">{service.title}</p>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Service Details */}
            <div>
              <div className="bg-secondary rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-gray-300 mb-6">{service.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">What&apos;s Included:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <span className="text-accent mr-2">&#10003;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center p-4 bg-primary rounded-lg">
                  <div>
                    <p className="text-3xl font-bold text-accent">${service.price}</p>
                    <p className="text-sm text-gray-400">{service.duration} hours</p>
                  </div>
                  <p className="text-sm text-gray-400">${(service.price / service.duration).toFixed(0)}/hour</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              {success ? (
                <div className="bg-secondary rounded-xl p-8 border border-green-500/50 text-center">
                  <div className="text-5xl mb-4">&#10003;</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-400 mb-6">Your booking has been created. You&apos;ll receive a confirmation email shortly.</p>
                  <Link href="/portal/bookings" className="btn-primary inline-block">View My Bookings</Link>
                </div>
              ) : (
                <div className="bg-secondary rounded-xl p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Session</h2>

                  {!session && (
                    <div className="bg-accent/10 border border-accent/30 text-accent px-4 py-3 rounded-lg mb-6">
                      Please <Link href="/login" className="underline font-semibold">sign in</Link> to book a service.
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">{error}</div>
                  )}

                  <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={minDate}
                        required
                        className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <div className="bg-primary rounded-lg p-4">
                      <div className="flex justify-between text-gray-300 mb-2">
                        <span>{service.title}</span>
                        <span>${service.price}</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 flex justify-between text-white font-bold">
                        <span>Total</span>
                        <span className="text-accent">${service.price}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={booking || !session}
                      className="w-full bg-accent text-primary py-3 rounded-lg font-semibold hover:bg-blue-400 transition disabled:opacity-50"
                    >
                      {booking ? 'Processing...' : `Book Now - $${service.price}`}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
