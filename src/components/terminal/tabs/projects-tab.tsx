"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import {
  FolderOpen,
  ExternalLink,
  Github,
  Code,
  Database,
  Brain,
  Smartphone,
  Cloud,
  Server,
  Wrench,
  Calendar,
  ArrowUpRight,
} from 'lucide-react'
import { getAllProjects, type DetailedProject } from '@/lib/projects-data'

const categoryIcons = {
  'Full-Stack': Code,
  'AI/ML': Brain,
  'Embedded': Database,
  'DevOps': Server,
  'Cloud/Infrastructure': Cloud,
  'Productivity': Wrench,
  'Mobile': Smartphone,
} as const

export function ProjectsTab({ isActive }: TerminalTabProps) {
  const [selectedProject, setSelectedProject] = useState<DetailedProject | null>(null)
  const [filter, setFilter] = useState('all')

  const projects = getAllProjects()
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Project Explorer</h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!selectedProject ? (
          /* Project list */
          <div className="h-full overflow-y-auto p-4">
            <TerminalSlideIn delay={0.1}>
              <div className="mb-4">
                <TypewriterText
                  text={`${filteredProjects.length} projects — filter: ${filter}`}
                  speed={20}
                  className="text-green-400 text-sm"
                />
              </div>
            </TerminalSlideIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project, index) => {
                const CategoryIcon =
                  categoryIcons[project.category as keyof typeof categoryIcons] || Code

                return (
                  <TerminalSlideIn key={project.id} delay={0.15 + index * 0.06}>
                    <motion.div
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <CategoryIcon className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                          <h4 className="font-semibold text-white text-sm leading-snug">
                            {project.name}
                          </h4>
                        </div>
                        <span className="shrink-0 text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.description}</p>

                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3 h-3" />
                          {project.timeline}
                        </span>
                        <span className="flex items-center gap-2">
                          {project.liveUrl && <ExternalLink className="w-3 h-3" />}
                          {project.githubUrl && <Github className="w-3 h-3" />}
                        </span>
                      </div>
                    </motion.div>
                  </TerminalSlideIn>
                )
              })}
            </div>
          </div>
        ) : (
          /* Project detail */
          <div className="h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-700 bg-gray-800/30">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  ← Back to projects
                </button>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/projects/${selectedProject.id}`}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    Full write-up
                  </Link>

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{selectedProject.name}</h3>
              <p className="text-gray-400 text-sm">{selectedProject.description}</p>
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  {/* Facts */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Timeline
                      </div>
                      <div className="text-sm text-white">{selectedProject.timeline}</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Role
                      </div>
                      <div className="text-sm text-white">{selectedProject.role}</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Repository
                      </div>
                      <div className="text-sm text-white">
                        {selectedProject.githubUrl ? 'Public' : 'Private / internal'}
                      </div>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Tech stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className="text-[11px] font-mono px-2 py-0.5 rounded border border-gray-600 text-gray-300"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Outcomes</h4>
                    <ul className="space-y-1.5">
                      {selectedProject.impact.map((item) => (
                        <li key={item} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
