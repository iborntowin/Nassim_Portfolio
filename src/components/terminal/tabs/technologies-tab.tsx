"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Palette, 
  Shield,
  Zap,
  Globe,
  Server,
  GitBranch,
  Monitor,
  Cpu,
  Layers,
  Settings,
  Star,
  TrendingUp
} from 'lucide-react'

interface Technology {
  name: string
  description: string
  proficiency: number
  yearsOfExperience: string
  projects: number
  icon?: any
  color: string
  category: string
}

interface TechCategory {
  id: string
  name: string
  icon: any
  description: string
  color: string
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Globe,
    description: 'Modern web technologies and frameworks',
    color: 'text-blue-400'
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    description: 'Server-side technologies and APIs',
    color: 'text-green-400'
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    description: 'Data storage and management systems',
    color: 'text-purple-400'
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Cloud platforms and deployment tools',
    color: 'text-orange-400'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    description: 'Mobile app development frameworks',
    color: 'text-pink-400'
  },
  {
    id: 'ai',
    name: 'AI/ML',
    icon: Cpu,
    description: 'Machine learning and AI technologies',
    color: 'text-cyan-400'
  }
]

const technologies: Technology[] = [
  // Frontend
  {
    name: 'React',
    description: 'Component-based UI library with hooks and context',
    proficiency: 95,
    yearsOfExperience: '4+ years',
    projects: 15,
    color: 'text-blue-400 bg-blue-400/10',
    category: 'frontend'
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework with SSR and SSG',
    proficiency: 92,
    yearsOfExperience: '3+ years',
    projects: 12,
    color: 'text-gray-400 bg-gray-400/10',
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript with advanced type system',
    proficiency: 90,
    yearsOfExperience: '3+ years',
    projects: 18,
    color: 'text-blue-500 bg-blue-500/10',
    category: 'frontend'
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    proficiency: 88,
    yearsOfExperience: '2+ years',
    projects: 14,
    color: 'text-teal-400 bg-teal-400/10',
    category: 'frontend'
  },
  {
    name: 'Svelte',
    description: 'Compile-time optimized frontend framework',
    proficiency: 85,
    yearsOfExperience: '2+ years',
    projects: 6,
    color: 'text-orange-400 bg-orange-400/10',
    category: 'frontend'
  },

  // Backend
  {
    name: 'Spring Boot',
    description: 'Enterprise Java framework for microservices',
    proficiency: 90,
    yearsOfExperience: '3+ years',
    projects: 10,
    color: 'text-green-400 bg-green-400/10',
    category: 'backend'
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development',
    proficiency: 87,
    yearsOfExperience: '4+ years',
    projects: 16,
    color: 'text-green-500 bg-green-500/10',
    category: 'backend'
  },
  {
    name: 'Python',
    description: 'Versatile language for web development and AI/ML',
    proficiency: 92,
    yearsOfExperience: '5+ years',
    projects: 20,
    color: 'text-yellow-400 bg-yellow-400/10',
    category: 'backend'
  },
  {
    name: 'Java',
    description: 'Enterprise-grade object-oriented programming',
    proficiency: 88,
    yearsOfExperience: '4+ years',
    projects: 12,
    color: 'text-red-400 bg-red-400/10',
    category: 'backend'
  },

  // Database
  {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database',
    proficiency: 88,
    yearsOfExperience: '3+ years',
    projects: 12,
    color: 'text-blue-400 bg-blue-400/10',
    category: 'database'
  },
  {
    name: 'MongoDB',
    description: 'NoSQL document database for modern applications',
    proficiency: 82,
    yearsOfExperience: '2+ years',
    projects: 8,
    color: 'text-green-500 bg-green-500/10',
    category: 'database'
  },
  {
    name: 'Redis',
    description: 'In-memory data structure store for caching',
    proficiency: 80,
    yearsOfExperience: '2+ years',
    projects: 6,
    color: 'text-red-500 bg-red-500/10',
    category: 'database'
  },

  // Cloud & DevOps
  {
    name: 'AWS',
    description: 'Comprehensive cloud computing platform',
    proficiency: 87,
    yearsOfExperience: '3+ years',
    projects: 10,
    color: 'text-orange-400 bg-orange-400/10',
    category: 'cloud'
  },
  {
    name: 'Docker',
    description: 'Containerization platform for application deployment',
    proficiency: 85,
    yearsOfExperience: '3+ years',
    projects: 14,
    color: 'text-blue-400 bg-blue-400/10',
    category: 'cloud'
  },
  {
    name: 'Kubernetes',
    description: 'Container orchestration for scalable deployments',
    proficiency: 82,
    yearsOfExperience: '2+ years',
    projects: 6,
    color: 'text-blue-500 bg-blue-500/10',
    category: 'cloud'
  },

  // Mobile
  {
    name: 'React Native',
    description: 'Cross-platform mobile app development framework',
    proficiency: 85,
    yearsOfExperience: '2+ years',
    projects: 4,
    color: 'text-blue-400 bg-blue-400/10',
    category: 'mobile'
  },

  // AI/ML
  {
    name: 'TensorFlow',
    description: 'Open-source machine learning framework',
    proficiency: 88,
    yearsOfExperience: '3+ years',
    projects: 8,
    color: 'text-orange-400 bg-orange-400/10',
    category: 'ai'
  },
  {
    name: 'PyTorch',
    description: 'Dynamic neural network framework for research',
    proficiency: 82,
    yearsOfExperience: '2+ years',
    projects: 5,
    color: 'text-red-400 bg-red-400/10',
    category: 'ai'
  },
  {
    name: 'OpenCV',
    description: 'Computer vision library for image processing',
    proficiency: 85,
    yearsOfExperience: '3+ years',
    projects: 6,
    color: 'text-green-400 bg-green-400/10',
    category: 'ai'
  }
]

export function TechnologiesTab({ isActive }: TerminalTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [animatedTechs, setAnimatedTechs] = useState<Set<string>>(new Set())

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory)

  const currentCategory = techCategories.find(cat => cat.id === selectedCategory)

  useEffect(() => {
    if (isActive) {
      // Animate technologies one by one
      const timer = setTimeout(() => {
        filteredTechnologies.forEach((tech, index) => {
          setTimeout(() => {
            setAnimatedTechs(prev => new Set([...prev, tech.name]))
          }, index * 100)
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isActive, filteredTechnologies])

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'bg-green-400'
    if (proficiency >= 80) return 'bg-blue-400'
    if (proficiency >= 70) return 'bg-yellow-400'
    return 'bg-gray-400'
  }

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert'
    if (proficiency >= 80) return 'Advanced'
    if (proficiency >= 70) return 'Intermediate'
    return 'Beginner'
  }

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Technologies I Work With</h3>
          </div>
        </div>
        
        <TerminalSlideIn delay={0.1}>
          <TypewriterText 
            text="I have experience with a wide range of modern technologies for building robust and scalable solutions."
            speed={20}
            className="text-gray-400 text-sm"
          />
        </TerminalSlideIn>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4">
          {/* Category Filter */}
          <TerminalSlideIn delay={0.2}>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All ({technologies.length})
                </button>
                {techCategories.map((category) => {
                  const count = technologies.filter(t => t.category === category.id).length
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <IconComponent className="w-3 h-3" />
                      {category.name} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          </TerminalSlideIn>

          {/* Category Description */}
          {currentCategory && (
            <TerminalSlideIn delay={0.3}>
              <div className="mb-6 p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <currentCategory.icon className={`w-5 h-5 ${currentCategory.color}`} />
                  <h4 className="text-white font-medium">{currentCategory.name}</h4>
                </div>
                <p className="text-gray-400 text-sm">{currentCategory.description}</p>
              </div>
            </TerminalSlideIn>
          )}

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: animatedTechs.has(tech.name) ? 1 : 0,
                  y: animatedTechs.has(tech.name) ? 0 : 20
                }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-white">{tech.name}</h5>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tech.proficiency >= 90 ? 'bg-green-400/20 text-green-400' :
                    tech.proficiency >= 80 ? 'bg-blue-400/20 text-blue-400' :
                    'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {getProficiencyLabel(tech.proficiency)}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {tech.description}
                </p>
                
                {/* Proficiency Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-white font-medium">{tech.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getProficiencyColor(tech.proficiency)}`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: animatedTechs.has(tech.name) ? `${tech.proficiency}%` : '0%' 
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-700">
                  <div>
                    <div className="text-xs text-gray-400">Experience</div>
                    <div className="text-sm font-medium text-white">
                      {tech.yearsOfExperience}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Projects</div>
                    <div className="text-sm font-medium text-white">
                      {tech.projects}+
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <TerminalSlideIn delay={0.8}>
            <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Technical Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {technologies.length}+
                  </div>
                  <div className="text-xs text-gray-400">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {technologies.reduce((sum, tech) => sum + tech.projects, 0)}+
                  </div>
                  <div className="text-xs text-gray-400">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">5+</div>
                  <div className="text-xs text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {techCategories.length}
                  </div>
                  <div className="text-xs text-gray-400">Specializations</div>
                </div>
              </div>
            </div>
          </TerminalSlideIn>
        </div>
      </div>
    </div>
  )
}