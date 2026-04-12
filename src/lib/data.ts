// Example data file for projects, services, and testimonials
// Use this as reference for your actual data

export const PROJECTS_DATA = [
  {
    id: '1',
    title: 'Autonomous Robotic Arm',
    description: 'A 6-degree-of-freedom robotic arm with advanced control systems and computer vision integration.',
    image: '/images/project1.jpg',
    category: 'Robotics',
    technologies: ['ROS', 'C++', 'Python', 'OpenCV'],
    skills: ['Robotics', 'Control Systems', 'Vision Processing'],
    results: 'Successfully deployed for precision manufacturing. 99.2% accuracy, 40% productivity increase',
    featured: true,
  },
  // Add more projects here
]

export const SERVICES_DATA = [
  {
    id: '1',
    title: 'Design Consultation',
    description: 'Expert consultation for mechatronics system design and technical planning',
    icon: '🎨',
    price: 200,
    duration: 1,
    features: ['System analysis', 'Design recommendations', 'Technical specifications', 'Feasibility study']
  },
  // Add more services here
]

export const TESTIMONIALS_DATA = [
  {
    id: '1',
    name: 'John Smith',
    company: 'TechCorp Industries',
    role: 'Engineering Manager',
    content: 'Exceptional work! The robotic system delivered beyond our expectations. Highly professional and detail-oriented.',
    rating: 5,
    image: '/images/testimonial1.jpg',
    featured: true,
  },
  // Add more testimonials here
]

// FAQ Data
export const FAQ_DATA = [
  {
    q: 'What is your typical project timeline?',
    a: 'Timeline varies based on project complexity. A consultation can take 1-2 weeks, while larger projects like robotics systems may take 3-6 months.'
  },
  {
    q: 'Do you offer ongoing support after project completion?',
    a: 'Yes, I offer post-project support packages. This includes troubleshooting, updates, and optimization.'
  },
  // Add more FAQs here
]
