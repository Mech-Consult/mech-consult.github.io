import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mechconsult.com' },
    update: {},
    create: {
      email: 'admin@mechconsult.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {
          phone: '+1 (555) 123-4567',
          bio: 'MechConsult Administrator',
          company: 'MechConsult',
        },
      },
    },
  })

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
      profile: {
        create: {
          phone: '+1 (555) 987-6543',
          bio: 'Demo client account',
          company: 'TechCorp Industries',
        },
      },
    },
  })

  // Seed Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'svc-1' },
      update: {},
      create: {
        id: 'svc-1',
        title: 'Design Consultation',
        description: 'Expert consultation for mechatronics system design and technical planning. Get detailed analysis, recommendations, and specifications for your project.',
        icon: 'design',
        price: 200,
        duration: 1,
        features: ['System analysis', 'Design recommendations', 'Technical specifications', 'Feasibility study'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-2' },
      update: {},
      create: {
        id: 'svc-2',
        title: 'Robotics Development',
        description: 'Custom robotics solutions including design, integration, and programming. From concept to deployment with full support.',
        icon: 'robotics',
        price: 5000,
        duration: 40,
        features: ['Hardware design', 'Programming & control', 'Integration support', 'Testing & validation'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-3' },
      update: {},
      create: {
        id: 'svc-3',
        title: 'Automation Systems',
        description: 'Industrial automation implementation for manufacturing and production. Complete turnkey solutions with training.',
        icon: 'automation',
        price: 7500,
        duration: 60,
        features: ['System design', 'Hardware installation', 'Software development', 'Staff training'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-4' },
      update: {},
      create: {
        id: 'svc-4',
        title: 'IoT Integration',
        description: 'Smart systems and IoT solutions for connected devices and data management. Real-time monitoring and cloud integration.',
        icon: 'iot',
        price: 3500,
        duration: 35,
        features: ['Sensor network setup', 'Data pipeline', 'Cloud integration', 'Real-time monitoring'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-5' },
      update: {},
      create: {
        id: 'svc-5',
        title: 'Project Management',
        description: 'End-to-end technical project management and oversight for complex engineering endeavors.',
        icon: 'management',
        price: 250,
        duration: 1,
        features: ['Planning & scheduling', 'Risk management', 'Progress tracking', 'Stakeholder reporting'],
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-6' },
      update: {},
      create: {
        id: 'svc-6',
        title: 'Training & Support',
        description: 'Technical training and ongoing support for your team. Customized programs for your specific needs.',
        icon: 'training',
        price: 150,
        duration: 1,
        features: ['Customized training', 'Documentation', 'Q&A sessions', 'Ongoing support'],
      },
    }),
  ])

  // Seed Projects
  await Promise.all([
    prisma.project.upsert({
      where: { id: 'proj-1' },
      update: {},
      create: {
        id: 'proj-1',
        title: 'Autonomous Robotic Arm',
        description: 'A 6-degree-of-freedom robotic arm with advanced control systems and computer vision integration for precision manufacturing tasks.',
        image: '/images/project1.jpg',
        category: 'Robotics',
        technologies: ['ROS', 'C++', 'Python', 'OpenCV'],
        skills: ['Robotics', 'Control Systems', 'Vision Processing'],
        results: 'Successfully deployed for precision manufacturing. 99.2% accuracy, 40% productivity increase.',
        featured: true,
        order: 1,
      },
    }),
    prisma.project.upsert({
      where: { id: 'proj-2' },
      update: {},
      create: {
        id: 'proj-2',
        title: 'Smart Building Automation',
        description: 'Complete building automation system with sensor networks, IoT devices, and intelligent environmental control.',
        image: '/images/project2.jpg',
        category: 'IoT & Automation',
        technologies: ['IoT', 'MQTT', 'Python', 'Raspberry Pi'],
        skills: ['System Integration', 'IoT', 'Automation'],
        results: '35% energy savings. Real-time monitoring across 200+ sensors.',
        featured: true,
        order: 2,
      },
    }),
    prisma.project.upsert({
      where: { id: 'proj-3' },
      update: {},
      create: {
        id: 'proj-3',
        title: 'Autonomous Drone System',
        description: 'AI-powered autonomous drone with pathfinding, obstacle avoidance, and delivery capabilities for logistics.',
        image: '/images/project3.jpg',
        category: 'Unmanned Systems',
        technologies: ['Python', 'CUDA', 'ROS', 'TensorFlow'],
        skills: ['AI/ML', 'Control Systems', 'Embedded Systems'],
        results: '50km+ flight range, 2hr flight time, 95% autonomous operation.',
        featured: true,
        order: 3,
      },
    }),
    prisma.project.upsert({
      where: { id: 'proj-4' },
      update: {},
      create: {
        id: 'proj-4',
        title: 'Industrial Quality Control System',
        description: 'Computer vision-based quality control system for manufacturing production lines with real-time defect detection.',
        image: '/images/project4.jpg',
        category: 'Vision Systems',
        technologies: ['OpenCV', 'Python', 'Machine Learning', 'C++'],
        skills: ['Computer Vision', 'Machine Learning', 'Quality Assurance'],
        results: '99.8% defect detection rate, 1000+ units/hour throughput.',
        featured: false,
        order: 4,
      },
    }),
    prisma.project.upsert({
      where: { id: 'proj-5' },
      update: {},
      create: {
        id: 'proj-5',
        title: 'Renewable Energy System',
        description: 'Integrated renewable energy management system with solar and wind power optimization algorithms.',
        image: '/images/project5.jpg',
        category: 'Power Systems',
        technologies: ['MATLAB', 'Simulink', 'Arduino', 'IoT'],
        skills: ['Power Systems', 'Control Theory', 'Renewable Energy'],
        results: '45% energy cost reduction, real-time optimization algorithms.',
        featured: false,
        order: 5,
      },
    }),
    prisma.project.upsert({
      where: { id: 'proj-6' },
      update: {},
      create: {
        id: 'proj-6',
        title: 'Predictive Maintenance Platform',
        description: 'IoT-based predictive maintenance system for industrial equipment monitoring using machine learning models.',
        image: '/images/project6.jpg',
        category: 'IoT & ML',
        technologies: ['Python', 'TensorFlow', 'IoT', 'Cloud Services'],
        skills: ['Machine Learning', 'IoT', 'Predictive Analytics'],
        results: '60% reduction in unexpected downtime, ROI in 8 months.',
        featured: false,
        order: 6,
      },
    }),
  ])

  // Seed Testimonials
  await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 'test-1' },
      update: {},
      create: {
        id: 'test-1',
        name: 'John Smith',
        company: 'TechCorp Industries',
        role: 'Engineering Manager',
        content: 'Exceptional work on our robotic assembly line. The system delivered beyond our expectations with 99%+ accuracy. Highly professional and detail-oriented throughout the entire project.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'test-2' },
      update: {},
      create: {
        id: 'test-2',
        name: 'Sarah Johnson',
        company: 'GreenEnergy Solutions',
        role: 'CTO',
        content: 'The renewable energy optimization system has reduced our costs by 45%. The technical expertise and attention to detail were outstanding. Would definitely work together again.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'test-3' },
      update: {},
      create: {
        id: 'test-3',
        name: 'Michael Chen',
        company: 'AutomateX',
        role: 'Operations Director',
        content: 'Our predictive maintenance platform has saved us millions in avoided downtime. The ML models are incredibly accurate and the dashboard is intuitive for our operators.',
        rating: 5,
        featured: true,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'test-4' },
      update: {},
      create: {
        id: 'test-4',
        name: 'Emily Davis',
        company: 'SmartBuild Corp',
        role: 'Facility Manager',
        content: 'The building automation system transformed how we manage our facilities. Energy savings exceeded projections and the system is incredibly reliable.',
        rating: 4,
        featured: false,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'test-5' },
      update: {},
      create: {
        id: 'test-5',
        name: 'Robert Williams',
        company: 'DroneLogistics Inc',
        role: 'CEO',
        content: 'The autonomous drone delivery system was a game-changer for our logistics operations. Professional execution from start to finish.',
        rating: 5,
        featured: false,
      },
    }),
  ])

  // Seed Blog Posts
  await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: 'future-of-industrial-automation' },
      update: {},
      create: {
        title: 'The Future of Industrial Automation in 2026',
        slug: 'future-of-industrial-automation',
        excerpt: 'Exploring the latest trends in industrial automation, from collaborative robots to AI-driven quality control systems.',
        content: `# The Future of Industrial Automation in 2026

Industrial automation is evolving rapidly, driven by advances in artificial intelligence, collaborative robotics, and edge computing. Here's what to expect in the coming years.

## Collaborative Robots (Cobots)

Cobots are transforming manufacturing floors. Unlike traditional industrial robots that operate in caged environments, cobots work alongside human workers, combining human creativity with robotic precision.

### Key Advantages:
- **Flexibility**: Easy to reprogram for different tasks
- **Safety**: Built-in force and torque sensors
- **Cost-effective**: Lower total cost of ownership
- **Scalable**: Start small and expand

## AI-Driven Quality Control

Machine learning models are now capable of detecting defects invisible to the human eye. Computer vision systems inspect thousands of products per hour with near-perfect accuracy.

## Edge Computing in Manufacturing

Processing data locally reduces latency and enables real-time decision-making on the factory floor. Edge devices can run ML models for predictive maintenance without cloud connectivity.

## Digital Twins

Virtual replicas of physical systems enable simulation, testing, and optimization before implementing changes in the real world. This reduces risk and accelerates innovation.

## Conclusion

The convergence of AI, robotics, and IoT is creating unprecedented opportunities for manufacturers. Companies that embrace these technologies will gain significant competitive advantages.`,
        coverImage: '/images/blog-automation.jpg',
        category: 'Automation',
        tags: ['automation', 'industry-4.0', 'robotics', 'AI'],
        published: true,
        authorId: admin.id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'getting-started-with-ros2' },
      update: {},
      create: {
        title: 'Getting Started with ROS2 for Robotics Projects',
        slug: 'getting-started-with-ros2',
        excerpt: 'A practical guide to Robot Operating System 2 and how it can accelerate your robotics development workflow.',
        content: `# Getting Started with ROS2 for Robotics Projects

ROS2 (Robot Operating System 2) is the next generation of the widely-used robotics middleware. Here's how to get started.

## Why ROS2?

- **Real-time capable**: Built on DDS for deterministic communication
- **Multi-platform**: Runs on Linux, Windows, and macOS
- **Security**: Built-in security features
- **Scalable**: From embedded systems to cloud

## Installation

ROS2 Jazzy Jalisco is the latest LTS release. Install it on Ubuntu 24.04:

\`\`\`bash
sudo apt update && sudo apt install ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
\`\`\`

## Your First Node

Create a simple publisher node:

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World'
        self.publisher_.publish(msg)
\`\`\`

## Key Concepts

### Topics
Asynchronous publish/subscribe communication. Best for streaming data like sensor readings.

### Services
Synchronous request/response. Use for one-time operations like starting a calibration.

### Actions
Asynchronous request with feedback. Perfect for long-running tasks like navigation goals.

## Conclusion

ROS2 provides a robust foundation for building complex robotic systems. Start with simple examples and gradually build up to more complex applications.`,
        coverImage: '/images/blog-ros2.jpg',
        category: 'Robotics',
        tags: ['ROS2', 'robotics', 'programming', 'tutorial'],
        published: true,
        authorId: admin.id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'iot-sensor-networks-guide' },
      update: {},
      create: {
        title: 'Building Reliable IoT Sensor Networks',
        slug: 'iot-sensor-networks-guide',
        excerpt: 'Best practices for designing and deploying industrial IoT sensor networks that are reliable, secure, and scalable.',
        content: `# Building Reliable IoT Sensor Networks

Deploying IoT sensors in industrial environments requires careful planning for reliability, security, and scalability.

## Architecture Considerations

### Network Topology
Choose the right topology for your use case:
- **Star**: Simple, central gateway, suitable for small deployments
- **Mesh**: Redundant paths, self-healing, ideal for large areas
- **Hybrid**: Combines both for flexibility

### Communication Protocols
- **MQTT**: Lightweight, publish/subscribe, ideal for constrained devices
- **CoAP**: RESTful, UDP-based, good for resource-constrained networks
- **LoRaWAN**: Long range, low power, perfect for outdoor deployments

## Sensor Selection

Match sensors to your requirements:
- **Temperature**: RTDs for accuracy, thermocouples for range
- **Vibration**: Accelerometers for predictive maintenance
- **Pressure**: Piezoelectric for dynamic, strain gauge for static
- **Flow**: Ultrasonic for non-invasive, magnetic for conductive fluids

## Data Pipeline

1. **Collection**: Edge devices aggregate sensor data
2. **Processing**: Local filtering and anomaly detection
3. **Transmission**: Compressed, encrypted data to cloud
4. **Storage**: Time-series database (InfluxDB, TimescaleDB)
5. **Visualization**: Real-time dashboards (Grafana)

## Security Best Practices

- Use TLS for all communications
- Implement device authentication with certificates
- Regular firmware updates via OTA
- Network segmentation and monitoring

## Conclusion

A well-designed IoT sensor network provides invaluable data for operational optimization. Start with a pilot, validate assumptions, then scale.`,
        coverImage: '/images/blog-iot.jpg',
        category: 'IoT',
        tags: ['IoT', 'sensors', 'networking', 'industrial'],
        published: true,
        authorId: admin.id,
      },
    }),
  ])

  console.log('Database seeded successfully!')
  console.log({ admin: admin.email, user: user.email, services: services.length })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
