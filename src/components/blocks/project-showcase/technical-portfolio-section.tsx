"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, GitFork, GitCommit, Github, ExternalLink, Code, Database, Globe, Server, Brain, Cpu, Wrench, Eye, Sparkles, Trophy, Zap, Crown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllProjects } from '@/lib/projects-data'
// Removed InteractiveTerminal import

const categoryIcons = {
  'All': Globe,
  'Full-Stack': Globe,
  'AI/ML': Brain,
  'Embedded': Cpu,
  'Productivity': Wrench,
  'DevOps': Server
}

export default function TechnicalPortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const projects = getAllProjects()

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter)

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
            and productivity tools. Each solution reflects real-world impact, strong UX thinking,
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
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-6 bg-[var(--color-secondary-background)] border border-[var(--color-border)]">
              {['All', 'Full-Stack', 'AI/ML', 'Embedded', 'Productivity', 'DevOps'].map((filter) => {
                const IconComponent = categoryIcons[filter as keyof typeof categoryIcons]
                return (
                  <TabsTrigger
                    key={filter}
                    value={filter}
                    className="relative flex items-center gap-2 text-xs font-medium transition-all data-[state=active]:bg-[var(--color-primary-accent)] data-[state=active]:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <IconComponent className="w-3 h-3" />
                    <span className="hidden sm:inline">{filter}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => {
            // Check if this is the Cession App (featured flagship project)
            const isCessionApp = project.id === '2'
            
            return (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className={isCessionApp ? 'md:col-span-2 lg:col-span-1 relative' : ''}
            >
              {/* Cession App Special Glow Effect */}
              {isCessionApp && (
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse" />
              )}
              
              <Card className={`h-full relative ${
                isCessionApp 
                  ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-purple-500/50 hover:border-purple-400 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:scale-[1.02]' 
                  : 'bg-[var(--color-secondary-background)] border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30'
              } transition-all duration-300 group`}>
                
                {/* Cession App Crown Badge */}
                {isCessionApp && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-2 rounded-full shadow-lg"
                    >
                      <Crown className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {isCessionApp && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5 text-yellow-400" />
                        </motion.div>
                      )}
                      <CardTitle className={`text-lg font-semibold transition-colors ${
                        isCessionApp 
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-orange-300' 
                          : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary-accent)]'
                      }`}>
                        {project.name}
                      </CardTitle>
                    </div>
                    {isCessionApp ? (
                      <Badge className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg animate-pulse">
                        <Trophy className="w-3 h-3 mr-1" />
                        Flagship
                      </Badge>
                    ) : project.featured && (
                      <Badge variant="outline" className="text-xs bg-[var(--color-warning-energy)]/10 text-[var(--color-warning-energy)] border-[var(--color-warning-energy)]/20">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className={`text-sm leading-relaxed ${
                    isCessionApp ? 'text-gray-300' : 'text-[var(--color-text-secondary)]'
                  }`}>
                    {project.description}
                  </CardDescription>
                  
                  {/* Cession App Special Tagline */}
                  {isCessionApp && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 text-xs"
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-purple-300 font-medium">Enterprise-grade • Production Ready • 10+ Screenshots</span>
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
                          isCessionApp 
                            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                            : `${tech.color} border-current/20`
                        }`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  {/* GitHub Stats */}
                  <div className={`flex items-center justify-between pt-2 border-t ${
                    isCessionApp ? 'border-purple-500/30' : 'border-[var(--color-border)]'
                  }`}>
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-1">
                        <Star className={`w-3 h-3 ${isCessionApp ? 'text-yellow-400' : ''}`} />
                        <span className={`font-medium ${isCessionApp ? 'text-yellow-400' : 'text-[var(--color-warning-energy)]'}`}>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span className={isCessionApp ? 'text-gray-300' : ''}>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitCommit className="w-3 h-3" />
                        <span className={isCessionApp ? 'text-gray-300' : ''}>{project.stats.commits}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      className={`flex-1 text-sm px-3 py-2 ${
                        isCessionApp 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80 text-[var(--color-text-primary)]'
                      }`}
                      asChild
                    >
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="w-3 h-3 mr-2" />
                        {isCessionApp ? 'Explore Project' : 'Details'}
                      </Link>
                    </Button>
                    <Button
                      className={`flex-1 text-sm px-3 py-2 ${
                        isCessionApp
                          ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
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

        {/* Removed Interactive Terminal Experience */}
      </div>
    </section>
  )
} 