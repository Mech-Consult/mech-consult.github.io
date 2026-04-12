interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'primary' | 'secondary'
}

export default function Section({
  children,
  className = '',
  background = 'primary'
}: SectionProps) {
  const bgClass = background === 'primary' ? 'bg-primary' : 'bg-secondary'

  return (
    <section className={`py-20 ${bgClass} ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}
