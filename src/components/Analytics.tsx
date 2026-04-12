'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'page_view',
            page: pathname,
            sessionId: getSessionId(),
          }),
        })
      } catch {
        // Silently fail - analytics should never break the app
      }
    }

    trackPageView()
  }, [pathname])

  return null
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('analytics_session')
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('analytics_session', id)
  }
  return id
}
