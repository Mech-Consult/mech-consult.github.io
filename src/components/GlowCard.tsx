'use client'

import { useRef, useState } from 'react'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

export default function GlowCard({ children, className = '' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl bg-secondary border border-gray-700/50 transition-all duration-300 ${
        isHovered ? 'border-accent/30 shadow-lg shadow-accent/5 -translate-y-1' : ''
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: glowPos.x - 150,
            top: glowPos.y - 150,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
          }}
        />
      )}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  )
}
