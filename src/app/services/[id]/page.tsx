import Link from 'next/link'
import { SERVICES } from '@/lib/static-data'

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }))
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = SERVICES.find(s => s.id === params.id)

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Service not found</p>
    </div>
  )

  return (
    <div>
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <Link href="/services" className="text-accent hover:text-blue-400 transition text-sm mb-4 inline-block">&larr; Back to Services</Link>
          <h1 className="section-title">{service.title}</h1>
          <p className="text-xl text-gray-300">{service.description}</p>
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

            {/* Contact CTA */}
            <div>
              <div className="bg-secondary rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Interested in this service?</h2>
                <p className="text-gray-400 mb-6">
                  Get in touch to discuss your requirements and schedule a consultation.
                </p>

                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full bg-accent text-primary py-3 rounded-lg font-semibold hover:bg-blue-400 transition text-center"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="mailto:info@mechconsult.com"
                    className="block w-full bg-primary text-accent py-3 rounded-lg font-semibold hover:bg-secondary transition text-center border border-accent/30"
                  >
                    Email Directly
                  </a>
                </div>

                <div className="mt-8 p-4 bg-primary rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Why choose this service?</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-0.5">&#10003;</span>
                      Professional expertise with 15+ years experience
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-0.5">&#10003;</span>
                      Customized solutions for your specific needs
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-0.5">&#10003;</span>
                      Ongoing support and maintenance
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2 mt-0.5">&#10003;</span>
                      Satisfaction guaranteed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
