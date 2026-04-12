import type { Project } from '@/types'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      {project.image && (
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.featured && (
            <span className="bg-accent text-primary px-3 py-1 text-xs rounded-full font-semibold">
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
                className="bg-primary text-accent text-xs px-2 py-1 rounded"
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
                className="bg-accent/10 text-accent text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
