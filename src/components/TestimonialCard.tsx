import type { Testimonial } from '@/types'
import Image from 'next/image'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 hover:shadow-xl transition duration-300">
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < testimonial.rating ? 'text-accent' : 'text-gray-600'}
          >
            ★
          </span>
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>

      {/* Author */}
      <div className="flex items-center">
        {testimonial.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          {testimonial.company && (
            <p className="text-sm text-gray-400">
              {testimonial.role ? `${testimonial.role} at ` : ''}{testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
