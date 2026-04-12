'use client'

import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import GlowCard from '@/components/GlowCard'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="container relative animate-fadeIn">
          <h1 className="section-title text-4xl md:text-5xl">About Me</h1>
          <p className="text-xl text-gray-300">Engineer, Innovator, Problem Solver</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-primary bg-dots">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Professional <span className="gradient-text-static">Profile</span>
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  With over 15 years of experience in mechatronics engineering, I specialize in designing
                  and implementing advanced automation and robotics solutions for diverse industries.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  My passion lies in transforming complex engineering challenges into elegant, efficient solutions.
                  I combine deep technical knowledge with innovative thinking to deliver cutting-edge projects.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Whether working on autonomous systems, industrial automation, or IoT solutions, I bring
                  excellence to every project and ensure client satisfaction through transparent communication
                  and meticulous execution.
                </p>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { end: 15, suffix: '+', label: 'Years' },
                    { end: 100, suffix: '+', label: 'Projects' },
                    { end: 50, suffix: '+', label: 'Clients' },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-secondary/50 border border-gray-700/50">
                      <p className="text-2xl font-bold text-accent">
                        <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-secondary rounded-xl p-8 border border-gray-700/50 hover-glow transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-6">Key Expertise</h3>
                <ul className="space-y-3">
                  {[
                    'Robotics & Automation',
                    'Control Systems Design',
                    'Industrial IoT',
                    'PCB & Embedded Systems',
                    'Project Management',
                    'System Integration',
                    'Technical Consulting',
                    'Research & Development'
                  ].map((skill, idx) => (
                    <li key={skill} className="flex items-center text-gray-300 group" style={{ animationDelay: `${idx * 50}ms` }}>
                      <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-3 group-hover:bg-accent/20 transition">
                        <span className="text-accent text-sm">&#10003;</span>
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-24 bg-secondary relative">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="container relative">
          <ScrollReveal>
            <h2 className="section-title text-center">Education & Certifications</h2>
            <p className="section-subtitle text-center">Academic foundation and professional credentials</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={0} direction="left">
              <GlowCard>
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-sm">&#127891;</span>
                  Education
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-accent/30 pl-4">
                    <p className="font-semibold text-white">Master of Science in Mechatronics</p>
                    <p className="text-sm text-gray-400">University Name, 2015</p>
                  </li>
                  <li className="border-l-2 border-accent/30 pl-4">
                    <p className="font-semibold text-white">Bachelor of Engineering - Mechanical</p>
                    <p className="text-sm text-gray-400">University Name, 2010</p>
                  </li>
                </ul>
              </GlowCard>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="right">
              <GlowCard>
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-sm">&#127942;</span>
                  Certifications
                </h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-accent/30 pl-4">
                    <p className="font-semibold text-white">Certified Robotics Engineer</p>
                    <p className="text-sm text-gray-400">International Robotics Association, 2020</p>
                  </li>
                  <li className="border-l-2 border-accent/30 pl-4">
                    <p className="font-semibold text-white">Lean Six Sigma - Black Belt</p>
                    <p className="text-sm text-gray-400">Certification Board, 2018</p>
                  </li>
                </ul>
              </GlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 bg-primary bg-dots">
        <div className="container">
          <ScrollReveal>
            <h2 className="section-title text-center">Technical Skills</h2>
            <p className="section-subtitle text-center">Tools and technologies I work with</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Programming',
                icon: '&#128187;',
                skills: ['Python', 'C/C++', 'Java', 'MATLAB', 'ROS', 'Arduino']
              },
              {
                category: 'CAD & Simulation',
                icon: '&#128208;',
                skills: ['SolidWorks', 'AutoCAD', 'ANSYS', 'Simulink', 'COMSOL', 'Fusion 360']
              },
              {
                category: 'Electronics',
                icon: '&#9889;',
                skills: ['PCB Design', 'Circuit Analysis', 'Microcontrollers', 'Sensors', 'Power Systems', 'Signal Processing']
              },
            ].map((skillGroup, idx) => (
              <ScrollReveal key={skillGroup.category} delay={idx * 150}>
                <GlowCard>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl" dangerouslySetInnerHTML={{ __html: skillGroup.icon }}></span>
                    <h3 className="text-xl font-bold text-accent">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary text-accent px-3 py-1.5 rounded-full text-sm border border-accent/20 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
