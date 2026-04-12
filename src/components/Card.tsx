interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-secondary rounded-lg p-6 ${hover ? 'hover:shadow-xl' : ''} transition duration-300 ${className}`}
    >
      {children}
    </div>
  )
}
