"use client"

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Star, GitFork, GitCommit, Calendar, Users, User, Zap, Target, Lightbulb, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DetailedProject } from '@/lib/projects-data'
import { ProjectStructuredData } from '@/components/seo/structured-data'
import { Suspense, lazy, useRef, useState, useCallback, useMemo } from 'react'

// Lazy load heavy components
const LazyImageGallery = lazy(() => import('@/components/ui/lazy-image-gallery'))
const LazyWorkflowSection = lazy(() => import('@/components/ui/lazy-workflow-section'))

interface ProjectDetailPageProps {
  project: DetailedProject
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const shouldReduceMotion = useReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })

  // Optimized animation variants with reduced motion support
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        duration: shouldReduceMotion ? 0.2 : 0.6
      }
    }
  }), [shouldReduceMotion])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: "easeOut"
      }
    }
  }), [shouldReduceMotion])

  // Optimized image loading callback
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  return (
    <>
      <ProjectStructuredData project={project} />
      <div className="min-h-screen bg-[var(--color-primary-background)]">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-secondary-accent)]/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/#technical-portfolio" 
              className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {project.featured && (
                  <Badge className="bg-[var(--color-warning-energy)]/10 text-[var(--color-warning-energy)] border-[var(--color-warning-energy)]/20">
                    Featured
                  </Badge>
                )}
                <Badge className="bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] border-[var(--color-primary-accent)]/20">
                  {project.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
                {project.name}
              </h1>
              
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Project Stats */}
              <div className="flex items-center gap-6 mb-8 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[var(--color-warning-energy)]" />
                  <span className="text-[var(--color-warning-energy)] font-medium">{project.stats.stars}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  <span>{project.stats.forks}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4" />
                  <span>{project.stats.commits}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  className="bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80 text-[var(--color-text-primary)] px-6 py-3"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button
                    className="bg-[var(--color-secondary-accent)] hover:bg-[var(--color-secondary-accent)]/80 text-[var(--color-text-primary)] px-6 py-3"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                {/* Optimized hero image with loading state */}
                <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src={project.images[0]?.src || '/images/placeholder-project.jpg'}
                    alt={project.images[0]?.alt || project.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    onLoad={handleImageLoad}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
                )}
                
                {/* Futuristic overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 to-[var(--color-secondary-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Project Info */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[var(--color-primary-accent)]" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">Timeline</p>
                    <p className="text-[var(--color-text-primary)] font-medium">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">Team Size</p>
                    <p className="text-[var(--color-text-primary)] font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {project.teamSize || 'Solo project'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-1">Role</p>
                    <p className="text-[var(--color-text-primary)] font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {project.role}
                    </p>
                  </div>
                  {project.architecture && (
                    <div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Architecture</p>
                      <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">{project.architecture}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[var(--color-secondary-accent)]" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech.name}
                        className={`${tech.color} border-current/20 font-mono text-xs`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Features */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[var(--color-success-energy)]" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.keyFeatures.slice(0, 6).map((feature, index) => (
                      <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-[var(--color-success-energy)] mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Development Workflow - Lazy Loaded */}
          <Suspense fallback={
            <div className="mb-16 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          }>
            <LazyWorkflowSection 
              workflow={project.workflow} 
              shouldReduceMotion={shouldReduceMotion}
            />
          </Suspense>

          {/* Challenges & Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--color-error-energy)]" />
                  Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3">
                      <span className="w-2 h-2 bg-[var(--color-error-energy)] rounded-full mt-2 flex-shrink-0"></span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[var(--color-warning-energy)]" />
                  Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3">
                      <span className="w-2 h-2 bg-[var(--color-warning-energy)] rounded-full mt-2 flex-shrink-0"></span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Images Gallery - Lazy Loaded */}
          {project.images.length > 1 && (
            <Suspense fallback={
              <div className="mb-16 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            }>
              <LazyImageGallery 
                images={project.images.slice(1)} 
                shouldReduceMotion={shouldReduceMotion}
              />
            </Suspense>
          )}

          {/* Impact & Results */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">
              Impact & Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.impact.map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] p-6 text-center">
                    <div className="text-2xl mb-3">🎯</div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{impact}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
              Interested in This Project?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Explore the code, see it in action, or get in touch to discuss similar projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80 text-[var(--color-text-primary)] px-8 py-3"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </a>
              </Button>
              <Button
                className="bg-transparent hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-8 py-3"
                asChild
              >
                <Link href="/#contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}