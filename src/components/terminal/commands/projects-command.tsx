'use client'

import React from 'react'
import TerminalizedProjects from '../terminalized/terminalized-projects'
import { getAllProjects, DetailedProject } from '@/lib/projects-data'

interface ProjectsCommandProps {
  args: string[]
  onComplete?: () => void
  onProjectSelect?: (project: DetailedProject) => void
}

const ProjectsCommand: React.FC<ProjectsCommandProps> = ({ 
  args, 
  onComplete,
  onProjectSelect 
}) => {
  const projects = getAllProjects()
  const category = args[0]?.toLowerCase()

  // Handle specific project view
  if (category && category !== 'all') {
    const filteredProjects = projects.filter(p => 
      p.category.toLowerCase().includes(category) ||
      p.name.toLowerCase().includes(category)
    )

    if (filteredProjects.length === 0) {
      return (
        <div className="font-mono text-sm">
          <div className="text-red-400 mb-2">
            Project category "{category}" not found.
          </div>
          <div className="text-gray-400">
            Available categories: Full-Stack, AI/ML, Embedded, Productivity, DevOps
          </div>
        </div>
      )
    }

    return (
      <TerminalizedProjects 
        projects={filteredProjects}
        viewMode="list"
        showStats={true}
        animateOnMount={true}
        onProjectSelect={onProjectSelect}
      />
    )
  }

  // Show all projects
  return (
    <div>
      <TerminalizedProjects 
        projects={projects}
        viewMode="list"
        showStats={true}
        animateOnMount={true}
        onProjectSelect={onProjectSelect}
      />
      
      <div className="mt-4 font-mono text-sm text-gray-400">
        <div className="text-green-400 mb-2">💡 Usage Examples:</div>
        <div className="space-y-1 ml-4">
          <div>• <span className="text-cyan-400">projects</span>           - Show all projects</div>
          <div>• <span className="text-cyan-400">projects full-stack</span> - Filter by Full-Stack projects</div>
          <div>• <span className="text-cyan-400">projects ai</span>         - Filter by AI/ML projects</div>
          <div>• <span className="text-cyan-400">projects embedded</span>   - Filter by Embedded projects</div>
        </div>
        <div className="mt-2 text-xs">
          💡 Click on any project directory to view details
        </div>
      </div>
    </div>
  )
}

export default ProjectsCommand