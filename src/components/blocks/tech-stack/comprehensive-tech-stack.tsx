"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Technology {
  name: string
  description: string
  proficiency: number
  yearsOfExperience: string
  projects: number
  icon?: string
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
  {
    name: 'Framer Motion',
    description: 'Production-ready motion library for React',
    proficiency: 82,
    yearsOfExperience: '2+ years',
    projects: 8,
    color: 'text-pink-400 bg-pink-400/10',
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
  {
    name: 'C++',
    description: 'High-performance systems programming language',
    proficiency: 85,
    yearsOfExperience: '3+ years',
    projects: 8,
    color: 'text-blue-600 bg-blue-600/10',
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
  {
    name: 'Supabase',
    description: 'Open-source Firebase alternative with PostgreSQL',
    proficiency: 85,
    yearsOfExperience: '1+ years',
    projects: 5,
    color: 'text-green-400 bg-green-400/10',
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
  {
    name: 'Terraform',
    description: 'Infrastructure as Code for cloud provisioning',
    proficiency: 80,
    yearsOfExperience: '2+ years',
    projects: 5,
    color: 'text-purple-400 bg-purple-400/10',
    category: 'cloud'
  },
  {
    name: 'Vercel',
    description: 'Frontend deployment platform with edge functions',
    proficiency: 88,
    yearsOfExperience: '2+ years',
    projects: 12,
    color: 'text-gray-400 bg-gray-400/10',
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
  {
    name: 'Flutter',
    description: 'Google\'s UI toolkit for cross-platform development',
    proficiency: 78,
    yearsOfExperience: '1+ years',
    projects: 3,
    color: 'text-blue-500 bg-blue-500/10',
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
  },
  {
    name: 'scikit-learn',
    description: 'Machine learning library for Python',
    proficiency: 87,
    yearsOfExperience: '3+ years',
    projects: 10,
    color: 'text-orange-500 bg-orange-500/10',
    category: 'ai'
  },
  {
    name: 'Hugging Face',
    description: 'Transformers library for NLP and AI models',
    proficiency: 80,
    yearsOfExperience: '1+ years',
    projects: 4,
    color: 'text-yellow-400 bg-yellow-400/10',
    category: 'ai'
  }
]

export default function ComprehensiveTechStack() {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const filteredTechnologies = technologies.filter(tech => tech.category === activeCategory)
  const currentCategory = techCategories.find(cat => cat.id === activeCategory)

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

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Technology Expertise
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Comprehensive technical skills across modern development stacks, 
            from frontend frameworks to AI/ML technologies and cloud infrastructure.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 lg:grid-cols-6 bg-[var(--color-secondary-background)] border border-[var(--color-border)]">
              {techCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="relative flex flex-col items-center gap-1 p-3 text-xs font-medium transition-all data-[state=active]:bg-[var(--color-primary-accent)] data-[state=active]:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <IconComponent className={`w-4 h-4 ${category.color}`} />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Category Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              {currentCategory && (
                <>
                  <currentCategory.icon className={`w-6 h-6 ${currentCategory.color}`} />
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {currentCategory.name}
                  </h3>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <p className="text-[var(--color-text-secondary)] mt-2">
            {currentCategory?.description}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
              >
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30 transition-all duration-300 h-full group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-accent)] transition-colors">
                        {tech.name}
                      </CardTitle>
                      <Badge className={getProficiencyColor(tech.proficiency) + ' text-white text-xs'}>
                        {getProficiencyLabel(tech.proficiency)}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {tech.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Proficiency Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--color-text-secondary)]">Proficiency</span>
                        <span className="text-[var(--color-text-primary)] font-medium">
                          {tech.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-[var(--color-border)] rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getProficiencyColor(tech.proficiency)}`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: hoveredTech === tech.name ? `${tech.proficiency}%` : '0%' 
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--color-border)]">
                      <div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Experience</div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">
                          {tech.yearsOfExperience}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--color-text-secondary)]">Projects</div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">
                          {tech.projects}+
                        </div>
                      </div>
                    </div>

                    {/* Technology Badge */}
                    <Badge
                      variant="outline"
                      className={`w-full justify-center ${tech.color} border-current/20`}
                    >
                      <Code className="w-3 h-3 mr-1" />
                      {tech.name}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
                Technical Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-primary-accent)] mb-2">
                    {technologies.length}+
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Technologies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-secondary-accent)] mb-2">
                    {technologies.reduce((sum, tech) => sum + tech.projects, 0)}+
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Total Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-warning-energy)] mb-2">
                    5+
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--color-success-energy)] mb-2">
                    {techCategories.length}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Specializations
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}