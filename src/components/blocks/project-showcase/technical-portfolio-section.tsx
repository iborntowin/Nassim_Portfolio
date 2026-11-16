"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Github, Globe, Server, Brain, Cpu, Wrench, Cloud, Calendar, ExternalLink } from 'lucide-react'
import { getAllProjects } from '@/lib/projects-data'

const filters = [
  { label: 'All', icon: Globe },
  { label: 'Cloud/Infrastructure', icon: Cloud },
  { label: 'DevOps', icon: Server },
  { label: 'Full-Stack', icon: Wrench },
  { label: 'AI/ML', icon: Brain },
  { label: 'Embedded', icon: Cpu },
]

export default function TechnicalPortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const projects = getAllProjects()

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="technical-portfolio" className="bg-[var(--color-primary-background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
            Selected work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Projects, with the details that matter
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            Infrastructure I have deployed and operated, and applications I have shipped. Every entry below
            links to the code when it is public, and to a live deployment when there is one.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => {
            const Icon = f.icon
            const isActive = activeFilter === f.label
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm border transition-colors ${
                  isActive
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-primary-background)] border-transparent font-medium'
                    : 'bg-transparent border-[var(--color-secondary-background)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-secondary)]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="group relative flex flex-col rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6 hover:border-[var(--color-secondary-accent)]/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-secondary-accent)]">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[var(--color-text-primary)]/10 text-[var(--color-text-primary)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] leading-snug">
                    <Link href={`/projects/${project.id}`} className="hover:underline decoration-1 underline-offset-4">
                      {project.name}
                    </Link>
                  </h3>
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  aria-label={`Open ${project.name}`}
                  className="shrink-0 mt-1 text-[var(--color-text-secondary)] group-hover:text-[var(--color-secondary-accent)] transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.slice(0, 6).map((tech) => (
                  <span
                    key={tech.name}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)]"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-text-secondary)]/15">
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.timeline}
                </span>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)] py-12 text-center">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
