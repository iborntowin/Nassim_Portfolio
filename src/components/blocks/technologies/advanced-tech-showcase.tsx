"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Brain, 
  Server, 
  Globe, 
  Zap,
  Layers,
  GitBranch,
  Shield,
  Cpu
} from 'lucide-react'

interface Technology {
  name: string
  category: string
  icon: string
  color: string
  description: string
  proficiency: number
  projects: number
}

const technologies: Technology[] = [
  // Frontend
  { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-cyan-400 to-blue-500', description: 'Modern UI development with hooks and context', proficiency: 95, projects: 12 },
  { name: 'Next.js', category: 'Frontend', icon: '▲', color: 'from-gray-700 to-gray-900', description: 'Full-stack React framework with SSR', proficiency: 90, projects: 8 },
  { name: 'TypeScript', category: 'Frontend', icon: '📘', color: 'from-blue-500 to-blue-700', description: 'Type-safe JavaScript development', proficiency: 92, projects: 15 },
  { name: 'Svelte', category: 'Frontend', icon: '🔥', color: 'from-orange-400 to-red-500', description: 'Compile-time optimized framework', proficiency: 85, projects: 3 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', color: 'from-teal-400 to-cyan-500', description: 'Utility-first CSS framework', proficiency: 93, projects: 10 },

  // Backend
  { name: 'Spring Boot', category: 'Backend', icon: '🍃', color: 'from-green-400 to-green-600', description: 'Enterprise Java application framework', proficiency: 88, projects: 6 },
  { name: 'Node.js', category: 'Backend', icon: '🟢', color: 'from-green-500 to-green-700', description: 'JavaScript runtime for server-side development', proficiency: 87, projects: 9 },
  { name: 'Python', category: 'Backend', icon: '🐍', color: 'from-yellow-400 to-blue-500', description: 'Versatile language for web and AI development', proficiency: 91, projects: 14 },
  { name: 'Symfony', category: 'Backend', icon: '🎼', color: 'from-gray-800 to-black', description: 'PHP framework for web applications', proficiency: 82, projects: 4 },

  // Database
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'from-blue-600 to-blue-800', description: 'Advanced open-source relational database', proficiency: 89, projects: 11 },
  { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'from-green-600 to-green-800', description: 'NoSQL document database', proficiency: 84, projects: 7 },
  { name: 'Redis', category: 'Database', icon: '🔴', color: 'from-red-500 to-red-700', description: 'In-memory data structure store', proficiency: 86, projects: 5 },
  { name: 'Supabase', category: 'Database', icon: '⚡', color: 'from-green-400 to-teal-500', description: 'Open-source Firebase alternative', proficiency: 83, projects: 3 },

  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML', icon: '🧠', color: 'from-orange-400 to-orange-600', description: 'Machine learning and neural networks', proficiency: 87, projects: 8 },
  { name: 'OpenCV', category: 'AI/ML', icon: '👁️', color: 'from-blue-400 to-purple-500', description: 'Computer vision and image processing', proficiency: 85, projects: 6 },
  { name: 'Hugging Face', category: 'AI/ML', icon: '🤗', color: 'from-yellow-400 to-orange-500', description: 'NLP models and transformers', proficiency: 81, projects: 4 },
  { name: 'scikit-learn', category: 'AI/ML', icon: '📊', color: 'from-blue-500 to-indigo-600', description: 'Machine learning algorithms and tools', proficiency: 88, projects: 7 },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud', icon: '☁️', color: 'from-orange-400 to-yellow-500', description: 'Amazon Web Services cloud platform', proficiency: 86, projects: 9 },
  { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-blue-400 to-blue-600', description: 'Containerization and deployment', proficiency: 89, projects: 12 },
  { name: 'Kubernetes', category: 'DevOps', icon: '⚙️', color: 'from-blue-500 to-purple-600', description: 'Container orchestration platform', proficiency: 82, projects: 5 },
  { name: 'Ansible', category: 'DevOps', icon: '🔧', color: 'from-red-500 to-red-700', description: 'Infrastructure automation and configuration', proficiency: 84, projects: 6 },

  // Mobile & Other
  { name: 'React Native', category: 'Mobile', icon: '📱', color: 'from-cyan-400 to-blue-500', description: 'Cross-platform mobile development', proficiency: 83, projects: 4 },
  { name: 'C++', category: 'Systems', icon: '⚡', color: 'from-blue-600 to-indigo-700', description: 'High-performance systems programming', proficiency: 79, projects: 5 },
  { name: 'C#', category: 'Desktop', icon: '💜', color: 'from-purple-500 to-purple-700', description: '.NET framework development', proficiency: 81, projects: 6 },
  { name: 'Java', category: 'Enterprise', icon: '☕', color: 'from-red-600 to-orange-600', description: 'Enterprise application development', proficiency: 85, projects: 8 }
]

const categories = [
  { name: 'All', icon: Globe, color: 'text-blue-400' },
  { name: 'Frontend', icon: Code, color: 'text-cyan-400' },
  { name: 'Backend', icon: Server, color: 'text-green-400' },
  { name: 'Database', icon: Database, color: 'text-purple-400' },
  { name: 'AI/ML', icon: Brain, color: 'text-orange-400' },
  { name: 'Cloud', icon: Cloud, color: 'text-yellow-400' },
  { name: 'DevOps', icon: GitBranch, color: 'text-red-400' },
  { name: 'Mobile', icon: Smartphone, color: 'text-pink-400' },
  { name: 'Systems', icon: Cpu, color: 'text-indigo-400' },
  { name: 'Desktop', icon: Layers, color: 'text-purple-400' },
  { name: 'Enterprise', icon: Shield, color: 'text-emerald-400' }
]

export default function AdvancedTechShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const filteredTechnologies = activeCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        {isClient && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
                animate={{
                  x: [0, (i * 37) % 100 - 50],
                  y: [0, (i * 73) % 100 - 50],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: (i % 10) + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${(i * 17) % 100}%`,
                  top: `${(i * 23) % 100}%`
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Technologies I </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Master & Love
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive toolkit spanning full-stack development, AI/ML, cloud infrastructure, 
            and emerging technologies. Each skill represents years of hands-on experience and continuous learning.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.name}
                variants={categoryVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === category.name
                    ? `bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 ${category.color}`
                    : 'bg-gray-800/50 border-gray-600/50 text-gray-400 hover:border-gray-500/50 hover:text-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Technologies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTechnologies.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                onHoverStart={() => setHoveredTech(tech.name)}
                onHoverEnd={() => setHoveredTech(null)}
                className="group relative"
              >
                <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${tech.color} opacity-90 hover:opacity-100 transition-all duration-300 border border-white/10 backdrop-blur-sm`}>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon and Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{tech.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                        <p className="text-xs text-white/70 uppercase tracking-wide">{tech.category}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-3">
                      {/* Proficiency Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-white/70">Proficiency</span>
                          <span className="text-xs text-white font-medium">{tech.proficiency}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <motion.div
                            className="bg-white rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Projects Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70">Projects Built</span>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-white" />
                          <span className="text-sm font-bold text-white">{tech.projects}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredTech === tech.name && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="text-white text-center"
                          >
                            <div className="text-4xl mb-2">{tech.icon}</div>
                            <div className="text-lg font-bold">{tech.name}</div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">150+</div>
              <div className="text-sm text-gray-400">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-sm text-gray-400">Learning Mode</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}