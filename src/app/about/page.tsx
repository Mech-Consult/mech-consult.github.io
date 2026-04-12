export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container">
          <h1 className="section-title">About Me</h1>
          <p className="text-xl text-gray-300">Engineer, Innovator, Problem Solver</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Professional Profile</h2>
              <p className="text-gray-300 mb-4">
                With over 15 years of experience in mechatronics engineering, I specialize in designing 
                and implementing advanced automation and robotics solutions for diverse industries.
              </p>
              <p className="text-gray-300 mb-4">
                My passion lies in transforming complex engineering challenges into elegant, efficient solutions. 
                I combine deep technical knowledge with innovative thinking to deliver cutting-edge projects.
              </p>
              <p className="text-gray-300">
                Whether working on autonomous systems, industrial automation, or IoT solutions, I bring 
                excellence to every project and ensure client satisfaction through transparent communication 
                and meticulous execution.
              </p>
            </div>

            <div>
              <div className="bg-secondary rounded-lg p-8">
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
                  ].map((skill) => (
                    <li key={skill} className="flex items-center text-gray-300">
                      <span className="text-accent text-xl mr-3">✓</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="section-title text-center">Education & Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-accent mb-2">Education</h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold text-white">Master of Science in Mechatronics</p>
                  <p className="text-sm text-gray-400">University Name, 2015</p>
                </li>
                <li>
                  <p className="font-semibold text-white">Bachelor of Engineering - Mechanical</p>
                  <p className="text-sm text-gray-400">University Name, 2010</p>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-accent mb-2">Certifications</h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold text-white">Certified Robotics Engineer</p>
                  <p className="text-sm text-gray-400">International Robotics Association, 2020</p>
                </li>
                <li>
                  <p className="font-semibold text-white">Lean Six Sigma - Black Belt</p>
                  <p className="text-sm text-gray-400">Certification Board, 2018</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-primary">
        <div className="container">
          <h2 className="section-title text-center">Technical Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Programming',
                skills: ['Python', 'C/C++', 'Java', 'MATLAB', 'ROS', 'Arduino']
              },
              {
                category: 'CAD & Simulation',
                skills: ['SolidWorks', 'AutoCAD', 'ANSYS', 'Simulink', 'COMSOL', 'Fusion 360']
              },
              {
                category: 'Electronics',
                skills: ['PCB Design', 'Circuit Analysis', 'Microcontrollers', 'Sensors', 'Power Systems', 'Signal Processing']
              },
            ].map((skillGroup) => (
              <div key={skillGroup.category} className="card">
                <h3 className="text-xl font-bold text-accent mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary text-accent px-3 py-1 rounded-full text-sm border border-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
