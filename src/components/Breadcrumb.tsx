import Link from 'next/link'

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-accent transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-300">{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="text-gray-600">/</span>}
        </div>
      ))}
    </nav>
  )
}
