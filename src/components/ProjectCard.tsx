import type { Project } from '@/types'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-secondary rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 border border-transparent hover:border-accent/20">
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{project.title}</h3>
          {project.featured && (
            <span className="bg-accent text-primary px-3 py-1 text-xs rounded-full font-semibold animate-glow-pulse">
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4">{project.category}</p>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-primary text-accent text-xs px-2.5 py-1 rounded-md border border-accent/10 hover:border-accent/30 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2">Skills Applied:</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="bg-accent/10 text-accent text-xs px-2.5 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Results on hover */}
        {project.results && (
          <div className="mt-4 pt-4 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs font-semibold text-accent mb-1">Results:</p>
            <p className="text-gray-400 text-sm">{project.results}</p>
          </div>
        )}
      </div>
    </div>
  )
}
