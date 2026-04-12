export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  profile?: Profile
}

export interface Profile {
  id: string
  userId: string
  phone?: string
  avatar?: string
  bio?: string
  company?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  category: string
  technologies: string[]
  skills: string[]
  results?: string
  featured: boolean
  order?: number
  createdAt?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  price: number
  duration: number
  features: string[]
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  service?: Service
  user?: User
  date: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  amount: number
  payment?: Payment
  createdAt?: string
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  stripeId?: string
}

export interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  content: string
  rating: number
  image?: string
  featured: boolean
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED'
  createdAt?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: string
  tags: string[]
  published: boolean
  authorId: string
  author?: User
  createdAt?: string
  updatedAt?: string
}

export interface AnalyticsEvent {
  id: string
  event: string
  page: string
  metadata?: string
  sessionId?: string
  createdAt?: string
}

export interface AnalyticsSummary {
  totalPageViews: number
  totalContacts: number
  totalBookings: number
  totalRevenue: number
  recentEvents: AnalyticsEvent[]
  pageViewsByPage: { page: string; count: number }[]
  bookingsByStatus: { status: string; count: number }[]
  revenueByMonth: { month: string; revenue: number }[]
}
