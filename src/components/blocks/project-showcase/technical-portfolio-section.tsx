"use client"

import { useState } from 'react'
import { motion } from 'motion/react'
import { Star, GitFork, GitCommit, Github, ExternalLink, Code, Database, Globe, Server } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface TechStackItem {
  name: string
  color: string
}

interface ProjectStats {
  stars: number
  forks: number
  commits: number
}

interface Project {
  id: string
  name: string
  description: string
  category: 'Frontend' | 'Backend' | 'Full-Stack' | 'DevOps'
  techStack: TechStackItem[]
  stats: ProjectStats
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    category: 'Full-Stack',
    techStack: [
      { name: 'React', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Node.js', color: 'text-green-400 bg-green-400/10' },
      { name: 'PostgreSQL', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Stripe', color: 'text-purple-400 bg-purple-400/10' }
    ],
    stats: { stars: 234, forks: 45, commits: 156 },
    githubUrl: 'https://github.com/username/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true
  },
  {
    id: '2',
    name: 'DevOps Automation Suite',
    description: 'Comprehensive CI/CD pipeline automation with Docker containerization, Kubernetes orchestration, and monitoring.',
    category: 'DevOps',
    techStack: [
      { name: 'Docker', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Kubernetes', color: 'text-blue-300 bg-blue-300/10' },
      { name: 'Jenkins', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Terraform', color: 'text-purple-400 bg-purple-400/10' }
    ],
    stats: { stars: 189, forks: 32, commits: 203 },
    githubUrl: 'https://github.com/username/devops-suite',
    featured: true
  },
  {
    id: '3',
    name: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard for visualizing real-time data streams with customizable widgets and export functionality.',
    category: 'Frontend',
    techStack: [
      { name: 'Next.js', color: 'text-white bg-white/10' },
      { name: 'TypeScript', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'D3.js', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Socket.io', color: 'text-green-400 bg-green-400/10' }
    ],
    stats: { stars: 167, forks: 28, commits: 134 },
    githubUrl: 'https://github.com/username/analytics-dashboard',
    liveUrl: 'https://analytics-demo.vercel.app'
  },
  {
    id: '4',
    name: 'Microservices API Gateway',
    description: 'Scalable API gateway for microservices architecture with rate limiting, authentication, and service discovery.',
    category: 'Backend',
    techStack: [
      { name: 'Go', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Redis', color: 'text-red-400 bg-red-400/10' },
      { name: 'gRPC', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Consul', color: 'text-pink-400 bg-pink-400/10' }
    ],
    stats: { stars: 298, forks: 67, commits: 245 },
    githubUrl: 'https://github.com/username/api-gateway',
    featured: true
  },
  {
    id: '5',
    name: 'React Component Library',
    description: 'Production-ready React component library with comprehensive documentation, testing, and Storybook integration.',
    category: 'Frontend',
    techStack: [
      { name: 'React', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Storybook', color: 'text-pink-400 bg-pink-400/10' },
      { name: 'Jest', color: 'text-red-400 bg-red-400/10' },
      { name: 'Rollup', color: 'text-orange-400 bg-orange-400/10' }
    ],
    stats: { stars: 145, forks: 23, commits: 89 },
    githubUrl: 'https://github.com/username/component-library',
    liveUrl: 'https://component-lib-docs.vercel.app'
  },
  {
    id: '6',
    name: 'Cloud Infrastructure Monitor',
    description: 'Multi-cloud monitoring solution with alerting, cost optimization insights, and resource usage analytics.',
    category: 'DevOps',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Prometheus', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Grafana', color: 'text-orange-500 bg-orange-500/10' },
      { name: 'AWS', color: 'text-orange-400 bg-orange-400/10' }
    ],
    stats: { stars: 176, forks: 34, commits: 167 },
    githubUrl: 'https://github.com/username/cloud-monitor'
  }
]

const categoryIcons = {
  'All': Globe,
  'Frontend': Code,
  'Backend': Database,
  'Full-Stack': Globe,
  'DevOps': Server
}

export default function TechnicalPortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')

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
            A collection of projects showcasing full-stack development, DevOps automation, 
            and modern web technologies. Each repository demonstrates production-ready code 
            with comprehensive documentation and testing.
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
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 bg-[var(--color-secondary-background)] border border-[var(--color-border)]">
              {['All', 'Frontend', 'Backend', 'Full-Stack', 'DevOps'].map((filter) => {
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
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card className="h-full bg-[var(--color-secondary-background)] border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary-accent)] transition-colors">
                      {project.name}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="outline" className="text-xs bg-[var(--color-warning-energy)]/10 text-[var(--color-warning-energy)] border-[var(--color-warning-energy)]/20">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        className={`text-xs font-mono ${tech.color} border-current/20`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  {/* GitHub Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span className="text-[var(--color-warning-energy)] font-medium">{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitCommit className="w-3 h-3" />
                        <span>{project.stats.commits}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-[var(--color-border)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-[var(--color-secondary-accent)] hover:bg-[var(--color-secondary-accent)]/80 text-[var(--color-text-primary)]"
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
          ))}
        </motion.div>

        {/* Terminal-style footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 bg-[var(--color-secondary-background)] border border-[var(--color-border)] rounded-lg"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">~/technical-portfolio</span>
          </div>
          <div className="font-mono text-sm">
            <p className="text-[var(--color-text-secondary)]">
              <span className="text-[var(--color-primary-accent)]">$</span> git status
            </p>
            <p className="text-[var(--color-text-secondary)] mt-1">
              On branch <span className="text-[var(--color-secondary-accent)]">main</span>
            </p>
            <p className="text-[var(--color-text-secondary)]">
              Your branch is up to date with <span className="text-[var(--color-secondary-accent)]">'origin/main'</span>
            </p>
            <p className="text-[var(--color-primary-accent)] mt-2">
              ✓ All projects are production-ready and actively maintained
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 