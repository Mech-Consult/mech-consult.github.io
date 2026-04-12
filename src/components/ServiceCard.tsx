import type { Service } from '@/types'
import Link from 'next/link'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 hover:shadow-xl transition duration-300 flex flex-col">
      {service.icon && (
        <div className="text-4xl mb-4">{service.icon}</div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
      <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 mb-2">Features:</p>
        <ul className="space-y-1">
          {service.features.map((feature) => (
            <li key={feature} className="text-sm text-gray-300 flex items-center">
              <span className="text-accent mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div>
          <p className="text-2xl font-bold text-accent">${service.price}</p>
          <p className="text-xs text-gray-400">{service.duration} hours</p>
        </div>
        <Link
          href={`/services/${service.id}`}
          className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition"
        >
          Book
        </Link>
      </div>
    </div>
  )
}
