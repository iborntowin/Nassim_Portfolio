"use client"

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Image from 'next/image'
import { FileText, Smartphone, Settings, CreditCard, Database, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useCallback, useRef, useMemo } from 'react'

interface AdvancedFeature {
  id: string
  title: string
  description: string
  image: string
  icon: React.ComponentType<any>
  color: string
  highlights: string[]
}

const advancedFeatures: AdvancedFeature[] = [
  {
    id: 'cession-details',
    title: 'Detailed Cession Management',
    description: 'Comprehensive cession details with advanced tracking and management capabilities',
    image: '/images/projects/1/Détails_Cession.png',
    icon: FileText,
    color: 'from-indigo-500 to-purple-500',
    highlights: ['Contract details view', 'Status tracking', 'Document management', 'Audit trail']
  },
  {
    id: 'payment-intelligence',
    title: 'Payment Intelligence',
    description: 'AI-powered payment analytics providing insights and automated processing',
    image: '/images/projects/1/Intelligence_des_Paiements.png',
    icon: CreditCard,
    color: 'from-emerald-500 to-teal-500',
    highlights: ['Payment analytics', 'AI insights', 'Automated processing', 'Risk assessment']
  },
  {
    id: 'mobile-sync',
    title: 'Mobile Data Export & Sync',
    description: 'Seamless data synchronization and export capabilities for mobile devices',
    image: '/images/projects/1/Mobile Data Export & Sync.png',
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    highlights: ['Real-time sync', 'Data export', 'Mobile optimization', 'Offline support']
  },
  {
    id: 'settings',
    title: 'Advanced Settings',
    description: 'Comprehensive configuration panel for system customization and preferences',
    image: '/images/projects/1/Settings.png',
    icon: Settings,
    color: 'from-orange-500 to-red-500',
    highlights: ['User preferences', 'System configuration', 'Security settings', 'Integration options']
  }
]

export default function CessionAdvancedFeatures() {
  const shouldReduceMotion = useReducedMotion()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }, [])

  // Optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        duration: shouldReduceMotion ? 0.2 : 0.6
      }
    }
  }), [shouldReduceMotion])

  const featureVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: "easeOut"
      }
    }
  }), [shouldReduceMotion])

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Advanced Features
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Discover the powerful features that make Cession App a comprehensive solution 
            for session and contract management with AI-powered insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {advancedFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={featureVariants}
              className="group"
            >
              <Card className="bg-[var(--color-primary-background)] border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary-accent)]/30 transition-all duration-500 h-full">
                {/* Feature Image */}
                <div className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Loading skeleton */}
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                  )}
                  
                  {/* Optimized image */}
                  <div className={`transition-opacity duration-500 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  
                  {/* Feature Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Feature Content */}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-accent)] transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Feature Highlights */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">
                      Key Capabilities
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <motion.div
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: highlightIndex * 0.1 }}
                          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} flex-shrink-0`}></div>
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Integration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20 p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Zap className="w-8 h-8 text-[var(--color-primary-accent)]" />
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Integrated Technology Stack
              </h3>
            </div>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-6">
              All features are seamlessly integrated using modern technologies including Spring Boot for robust backend processing, 
              Svelte for responsive frontend interactions, PostgreSQL for reliable data management, and JWT for secure authentication.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Real-time Processing', 'Secure Authentication', 'Mobile Optimization', 'AI Integration', 'Data Analytics', 'Cloud Sync'].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 bg-[var(--color-primary-accent)]/20 text-[var(--color-primary-accent)] rounded-full text-sm font-medium"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}