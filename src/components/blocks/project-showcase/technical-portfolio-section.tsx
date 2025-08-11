"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, GitFork, GitCommit, Github, ExternalLink, Code, Database, Globe, Server, Brain, Cpu, Wrench, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
// Removed InteractiveTerminal import

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
  category: 'Full-Stack' | 'AI/ML' | 'Embedded' | 'Productivity' | 'DevOps'
  techStack: TechStackItem[]
  stats: ProjectStats
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Cession App – Session & Contract Management',
    description: 'A smart platform for managing session-based contracts with secure authentication, dynamic user roles, and audit trails. Designed for clean UX and cross-device compatibility.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Spring Boot', color: 'text-green-400 bg-green-400/10' },
      { name: 'Svelte', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'PostgreSQL', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'JWT Auth', color: 'text-purple-400 bg-purple-400/10' }
    ],
    stats: { stars: 194, forks: 42, commits: 87 },
    githubUrl: 'https://github.com/nassimmaaoui/cession-app',
    featured: true
  },
  {
    id: '2',
    name: 'Board-AI: Electronic Component Detection',
    description: 'Trained a CNN model (92% accuracy) on 50,000+ PCB component images to identify parts in real-time, reducing inference time to 120ms using TensorRT.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'OpenCV', color: 'text-green-400 bg-green-400/10' },
      { name: 'TensorFlow', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'TensorRT', color: 'text-green-500 bg-green-500/10' }
    ],
    stats: { stars: 271, forks: 64, commits: 142 },
    githubUrl: 'https://github.com/nassimmaaoui/board-ai',
    featured: true
  },
  {
    id: '3',
    name: 'NeuroVigil: Driver Fatigue Detection',
    description: 'Developed an EEG-based alert system detecting drowsiness with 89% precision. Early warning algorithm reduced false positives to under 5%.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'SciPy', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'EEG Processing', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'Signal Analysis', color: 'text-pink-400 bg-pink-400/10' }
    ],
    stats: { stars: 198, forks: 49, commits: 91 },
    githubUrl: 'https://github.com/nassimmaaoui/neurovigil'
  },
  {
    id: '4',
    name: 'Nanosatellite Communication System',
    description: 'Built an optimized LoRaWAN communication module achieving 1.2 Mbps and 40% performance gain across 5 hardware platforms.',
    category: 'Embedded',
    techStack: [
      { name: 'C++', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'STM32', color: 'text-green-400 bg-green-400/10' },
      { name: 'LoRaWAN', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'Low-Power Protocols', color: 'text-cyan-400 bg-cyan-400/10' }
    ],
    stats: { stars: 305, forks: 77, commits: 198 },
    githubUrl: 'https://github.com/nassimmaaoui/nanosatellite-comm',
    featured: true
  },
  {
    id: '5',
    name: 'GoldenTouch – AI Event Platform',
    description: 'Smart platform for event pack management with admin dashboards, AI-powered feedback analysis, Telegram/email notifications, and booking logic.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Symfony', color: 'text-black bg-black/10' },
      { name: 'JavaFX', color: 'text-red-400 bg-red-400/10' },
      { name: 'Hugging Face API', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'PDF/Email Integration', color: 'text-blue-400 bg-blue-400/10' }
    ],
    stats: { stars: 221, forks: 41, commits: 116 },
    githubUrl: 'https://github.com/nassimmaaoui/goldentouch',
    featured: true
  },
  {
    id: '6',
    name: 'BridgeTrack – Developer Productivity Tool',
    description: 'C# app monitoring code activity and app usage. Reduced daily reporting time by 25% via automated tracking and reports.',
    category: 'Productivity',
    techStack: [
      { name: 'C#', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'WPF', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'PowerShell', color: 'text-blue-300 bg-blue-300/10' }
    ],
    stats: { stars: 144, forks: 38, commits: 73 },
    githubUrl: 'https://github.com/nassimmaaoui/bridgetrack'
  },
  {
    id: '7',
    name: 'Folder Lock',
    description: 'Desktop utility to protect sensitive directories using secure encryption and password-lock mechanism.',
    category: 'Productivity',
    techStack: [
      { name: 'C#', color: 'text-purple-400 bg-purple-400/10' },
      { name: '.NET', color: 'text-blue-400 bg-blue-400/10' }
    ],
    stats: { stars: 98, forks: 20, commits: 55 },
    githubUrl: 'https://github.com/nassimmaaoui/folder-lock'
  },
  {
    id: '8',
    name: 'Sticky Notes',
    description: 'Simple note-taking app built for speed and persistence with tagging and pinning features.',
    category: 'Productivity',
    techStack: [
      { name: 'Java', color: 'text-red-400 bg-red-400/10' },
      { name: 'JavaFX', color: 'text-orange-400 bg-orange-400/10' }
    ],
    stats: { stars: 89, forks: 17, commits: 38 },
    githubUrl: 'https://github.com/nassimmaaoui/sticky-notes'
  },
  {
    id: '9',
    name: 'Listen to Your Notes',
    description: 'Desktop app converting text notes to speech for the visually impaired or for auditory reinforcement.',
    category: 'Productivity',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'TTS APIs', color: 'text-green-400 bg-green-400/10' }
    ],
    stats: { stars: 112, forks: 25, commits: 44 },
    githubUrl: 'https://github.com/nassimmaaoui/listen-to-notes'
  },
  {
    id: '10',
    name: 'ML-Based Anomaly Detection',
    description: 'Developed an ML model for real-time anomaly detection in system logs. Can be plugged into CI/CD pipelines for monitoring.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'scikit-learn', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Docker', color: 'text-blue-400 bg-blue-400/10' }
    ],
    stats: { stars: 156, forks: 33, commits: 66 },
    githubUrl: 'https://github.com/nassimmaaoui/ml-anomaly-detection'
  },
  {
    id: '11',
    name: 'EPMA – Smart Learning Platform',
    description: 'Project-based learning manager with role-based access (Admin, Coach, Student), milestone grading UI, GitHub integration, and real-time dashboards.',
    category: 'Full-Stack',
    techStack: [
      { name: 'React Native', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Spring Boot', color: 'text-green-400 bg-green-400/10' },
      { name: 'Supabase', color: 'text-green-500 bg-green-500/10' },
      { name: 'GitHub API', color: 'text-gray-400 bg-gray-400/10' }
    ],
    stats: { stars: 247, forks: 55, commits: 142 },
    githubUrl: 'https://github.com/nassimmaaoui/epma-platform'
  }
]

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
                      className="flex-1 bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80 text-[var(--color-text-primary)] text-sm px-3 py-2"
                      asChild
                    >
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="w-3 h-3 mr-2" />
                        Details
                      </Link>
                    </Button>
                    <Button
                      className="flex-1 bg-transparent hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm px-3 py-2"
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
          ))}
        </motion.div>

        {/* Removed Interactive Terminal Experience */}
      </div>
    </section>
  )
} 