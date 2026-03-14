"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, GitFork, GitCommit, Github, ExternalLink, Code, Globe, Server, Brain, Cpu, Wrench, Eye, Sparkles, Trophy, Zap, Crown, Cloud } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllProjects } from '@/lib/projects-data'

const filters = [
  { label: 'All',                   icon: Globe,   activeGradient: 'from-blue-500 to-blue-700',         activeShadow: 'shadow-blue-500/40' },
  { label: 'Full-Stack',            icon: Code,    activeGradient: 'from-cyan-500 to-blue-600',          activeShadow: 'shadow-cyan-500/40' },
  { label: 'AI/ML',                 icon: Brain,   activeGradient: 'from-orange-500 to-red-600',         activeShadow: 'shadow-orange-500/40' },
  { label: 'Embedded',              icon: Cpu,     activeGradient: 'from-indigo-500 to-purple-600',      activeShadow: 'shadow-indigo-500/40' },
  { label: 'Productivity',          icon: Wrench,  activeGradient: 'from-green-500 to-emerald-600',      activeShadow: 'shadow-green-500/40' },
  { label: 'DevOps',                icon: Server,  activeGradient: 'from-red-500 to-rose-600',           activeShadow: 'shadow-red-500/40' },
  { label: 'Cloud/Infrastructure',  icon: Cloud,   activeGradient: 'from-yellow-500 to-orange-500',      activeShadow: 'shadow-yellow-500/40' },
]

export default function TechnicalPortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()
  const projects = getAllProjects()

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  // Split projects into pages: page 0 = all except NeuroVigil, page 1 = NeuroVigil
  const page1Projects = filteredProjects.filter(p => p.id !== '4')
  const page2Projects = filteredProjects.filter(p => p.id === '4')
  const pages = page2Projects.length > 0 ? [page1Projects, page2Projects] : [page1Projects]
  const currentProjects = pages[currentPage] || pages[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="bg-[var(--color-primary-background)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 mb-4 text-[var(--color-text-primary)]">
            Technical Portfolio
          </h2>
          <p className="text-body text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            A selection of engineering projects across full-stack development, AI/ML, embedded systems,
            cloud infrastructure, and productivity tools. Each solution reflects real-world impact, strong UX thinking,
            and multidisciplinary execution.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => {
              const Icon = f.icon
              const isActive = activeFilter === f.label
              return (
                <motion.button
                  key={f.label}
                  onClick={() => { setActiveFilter(f.label); setCurrentPage(0) }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    border transition-all duration-200 select-none
                    ${isActive
                      ? `bg-gradient-to-r ${f.activeGradient} text-white border-transparent shadow-lg ${f.activeShadow}`
                      : 'bg-[var(--color-secondary-background)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-secondary)]/40'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{f.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentProjects.map((project) => {
            // Check if this is the Cession App or ERP (featured flagship projects)
            const isCessionApp = project.id === '2'
            const isErpApp = project.id === '7'
            const isOpenStackProject = project.id === '8'
            const isFlagship = isCessionApp || isErpApp
            
            return (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className={isFlagship || isOpenStackProject ? 'md:col-span-2 lg:col-span-1 relative' : ''}
            >
              {/* Flagship Special Glow Effect */}
              {isFlagship && (
                <div className={`absolute -inset-1 bg-gradient-to-r ${
                  isErpApp 
                    ? 'from-orange-600 via-red-500 to-amber-500' 
                    : 'from-purple-600 via-pink-500 to-orange-500'
                } rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse`} />
              )}

              {isOpenStackProject && (
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-sky-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 animate-pulse" />
              )}
              
              <Card className={`h-full relative ${
                isFlagship 
                  ? isErpApp
                    ? 'bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 border-2 border-orange-500/50 hover:border-orange-400 shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:scale-[1.02]'
                    : 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-purple-500/50 hover:border-purple-400 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-[1.02]' 
                  : isOpenStackProject
                    ? 'bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 border-2 border-yellow-500/50 hover:border-yellow-300 shadow-2xl shadow-yellow-500/20 hover:shadow-yellow-500/40 transform hover:scale-[1.03] ring-1 ring-yellow-400/40'
                  : 'bg-[var(--color-secondary-background)] border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30'
              } transition-all duration-300 group cursor-pointer`}
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/projects/${project.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    router.push(`/projects/${project.id}`)
                  }
                }}
              >
                
                {/* Flagship Crown Badge */}
                {isFlagship && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      className={`bg-gradient-to-r ${
                        isErpApp 
                          ? 'from-orange-400 via-red-500 to-amber-500' 
                          : 'from-yellow-400 via-orange-500 to-red-500'
                      } p-2 rounded-full shadow-lg`}
                    >
                      <Crown className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                )}

                {isOpenStackProject && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-sky-500 p-2 rounded-full shadow-lg"
                    >
                      <Cloud className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {isFlagship && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className={`w-5 h-5 ${isErpApp ? 'text-orange-400' : 'text-yellow-400'}`} />
                        </motion.div>
                      )}
                      {isOpenStackProject && (
                        <motion.div
                          animate={{ rotate: [0, 8, -8, 0] }}
                          transition={{ duration: 2.8, repeat: Infinity }}
                        >
                          <Zap className="w-5 h-5 text-yellow-300" />
                        </motion.div>
                      )}
                      <CardTitle className={`text-lg font-semibold transition-colors ${
                        isFlagship 
                          ? isErpApp
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 group-hover:from-orange-300 group-hover:via-red-300 group-hover:to-amber-300'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-orange-300' 
                          : isOpenStackProject
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-sky-300 group-hover:from-yellow-200 group-hover:via-orange-200 group-hover:to-sky-200'
                          : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary-accent)]'
                      }`}>
                        {project.name}
                      </CardTitle>
                    </div>
                    {isFlagship ? (
                      <Badge className={`text-xs bg-gradient-to-r ${
                        isErpApp 
                          ? 'from-orange-500 to-red-500' 
                          : 'from-purple-500 to-pink-500'
                      } text-white border-none shadow-lg animate-pulse`}>
                        <Trophy className="w-3 h-3 mr-1" />
                        Flagship
                      </Badge>
                    ) : isOpenStackProject ? (
                      <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none shadow-lg animate-pulse">
                        <Cloud className="w-3 h-3 mr-1" />
                        Cloud Highlight
                      </Badge>
                    ) : project.featured && (
                      <Badge variant="outline" className="text-xs bg-[var(--color-warning-energy)]/10 text-[var(--color-warning-energy)] border-[var(--color-warning-energy)]/20">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className={`text-sm leading-relaxed ${
                    isFlagship || isOpenStackProject ? 'text-gray-300' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    {project.description}
                  </CardDescription>
                  
                  {/* Flagship Special Tagline */}
                  {isFlagship && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 text-xs"
                    >
                      <Zap className={`w-4 h-4 ${isErpApp ? 'text-orange-400' : 'text-yellow-400'}`} />
                      <span className={`font-medium ${isErpApp ? 'text-orange-300' : 'text-purple-300'}`}>
                        {isErpApp ? 'Desktop Native • Tauri + Rust • 11 Screenshots' : 'Enterprise-grade • Production Ready • 10+ Screenshots'}
                      </span>
                    </motion.div>
                  )}

                  {isOpenStackProject && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 text-xs"
                    >
                      <Cloud className="w-4 h-4 text-yellow-300" />
                      <span className="font-medium text-yellow-200">
                        Private Cloud • OpenStack • Telegram Automation
                      </span>
                    </motion.div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        className={`text-xs font-mono ${
                          isFlagship 
                            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                            : isOpenStackProject
                              ? 'bg-yellow-500/10 border-yellow-300/30 text-yellow-100 hover:bg-yellow-500/20'
                            : `${tech.color} border-current/20`
                        }`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  {/* GitHub Stats */}
                  <div className={`flex items-center justify-between pt-2 border-t ${
                    isFlagship 
                      ? isErpApp ? 'border-orange-500/30' : 'border-purple-500/30'
                      : 'border-[var(--color-border)]'
                  }`}>
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-1">
                        <Star className={`w-3 h-3 ${isFlagship ? 'text-yellow-400' : ''}`} />
                        <span className={`font-medium ${isFlagship ? 'text-yellow-400' : 'text-[var(--color-warning-energy)]'}`}>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span className={isFlagship ? 'text-gray-300' : ''}>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitCommit className="w-3 h-3" />
                        <span className={isFlagship ? 'text-gray-300' : ''}>{project.stats.commits}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 text-sm px-3 py-2 ${
                        isFlagship 
                          ? isErpApp
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-500/25'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                          : isOpenStackProject
                            ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg shadow-yellow-500/25'
                          : 'bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80 text-[var(--color-text-primary)]'
                      }`}
                      asChild
                    >
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="w-3 h-3 mr-2" />
                        {isFlagship || isOpenStackProject ? 'Explore Project' : 'Details'}
                      </Link>
                    </Button>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 text-sm px-3 py-2 ${
                        isFlagship
                          ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                          : isOpenStackProject
                            ? 'bg-black/20 hover:bg-black/35 border border-yellow-300/30 text-yellow-100'
                          : 'bg-transparent hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-[var(--color-secondary-accent)] hover:bg-[var(--color-secondary-accent)]/80 text-[var(--color-text-primary)] text-sm px-3 py-2"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
            )
          })}
        </motion.div>

        {/* Pagination Dots */}
        {pages.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-10"
          >
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`relative transition-all duration-300 rounded-full ${
                  currentPage === index
                    ? 'w-8 h-3 bg-[var(--color-primary-accent)]'
                    : 'w-3 h-3 bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]'
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {currentPage === index && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-[var(--color-primary-accent)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Removed Interactive Terminal Experience */}
      </div>
    </section>
  )
} 