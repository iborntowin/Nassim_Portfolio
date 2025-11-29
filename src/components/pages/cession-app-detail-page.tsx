"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Star, GitFork, GitCommit, Calendar, Users, User, Zap, Target, Lightbulb, CheckCircle, Shield, Database, Smartphone, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DetailedProject } from '@/lib/projects-data'
import { ProjectStructuredData } from '@/components/seo/structured-data'
import CessionAppJourney from '@/components/projects/cession-app-journey'
import CessionAdvancedFeatures from '@/components/projects/cession-advanced-features'
import CessionPremiumShowcase from '@/components/projects/cession-premium-showcase'
import CessionKeyboardShortcuts from '@/components/projects/cession-keyboard-shortcuts'

interface CessionAppDetailPageProps {
  project: DetailedProject
}

export default function CessionAppDetailPage({ project }: CessionAppDetailPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const architectureFeatures = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'JWT authentication, role-based access control, and comprehensive audit trails',
      color: 'text-green-500'
    },
    {
      icon: Database,
      title: 'Robust Backend',
      description: 'Spring Boot architecture with PostgreSQL for reliable data management',
      color: 'text-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Svelte frontend optimized for all devices and screen sizes',
      color: 'text-purple-500'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Web-based solution accessible from any modern browser',
      color: 'text-orange-500'
    }
  ]

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
                  <Badge className="bg-[var(--color-warning-energy)]/10 text-[var(--color-warning-energy)] border-[var(--color-warning-energy)]/20">
                    Featured
                  </Badge>
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
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/projects/1/dashboard.png"
                    alt="Cession App Dashboard Overview"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Architecture & Technology
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                Built with modern technologies and best practices for scalability, security, and performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-[var(--color-primary-background)] border-[var(--color-border)] h-full hover:border-[var(--color-primary-accent)]/30 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* User Journey Pipeline */}
        <CessionAppJourney />

        {/* Premium Module Showcase */}
        <CessionPremiumShowcase />

        {/* Advanced Features */}
        <CessionAdvancedFeatures />

        {/* Technical Details */}
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

      {/* Keyboard Shortcuts */}
      <CessionKeyboardShortcuts />
    </>
  )
}