import type { Service } from '@/types'
import Link from 'next/link'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-secondary rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-2 flex flex-col border border-transparent hover:border-accent/20 relative overflow-hidden">
      {/* Hover glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        {service.icon && (
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
            <span className="text-2xl text-accent">{service.icon}</span>
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{service.description}</p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">Features:</p>
          <ul className="space-y-1.5">
            {service.features.map((feature) => (
              <li key={feature} className="text-sm text-gray-300 flex items-center">
                <span className="text-accent mr-2 text-xs">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
          <div>
            <p className="text-2xl font-bold text-accent">${service.price}</p>
            <p className="text-xs text-gray-400">{service.duration} hours</p>
          </div>
          <Link
            href={`/services/${service.id}`}
            className="bg-accent text-primary px-5 py-2 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
