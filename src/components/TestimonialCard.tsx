import type { Testimonial } from '@/types'
import Image from 'next/image'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group bg-secondary rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 border border-transparent hover:border-accent/20 relative overflow-hidden">
      {/* Subtle glow on hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        {/* Quote icon */}
        <div className="text-accent/20 text-5xl font-serif leading-none mb-2">&ldquo;</div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg transition-all duration-300 ${
                i < testimonial.rating
                  ? 'text-accent group-hover:scale-110'
                  : 'text-gray-600'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              &#9733;
            </span>
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-300 mb-6 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>

        {/* Author */}
        <div className="flex items-center pt-4 border-t border-gray-700/50">
          {testimonial.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-accent/20 group-hover:ring-accent/50 transition">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full mr-4 bg-accent/10 flex items-center justify-center ring-2 ring-accent/20 group-hover:ring-accent/50 transition">
              <span className="text-accent font-bold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-white group-hover:text-accent transition">{testimonial.name}</p>
            {testimonial.company && (
              <p className="text-sm text-gray-400">
                {testimonial.role ? `${testimonial.role} at ` : ''}{testimonial.company}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
