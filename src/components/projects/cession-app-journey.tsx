"use client"

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, UserPlus, LogIn, LayoutDashboard, Users, UserCheck, FileText, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { useState, useCallback, useRef, useMemo } from 'react'

interface JourneyStep {
  id: string
  title: string
  description: string
  image: string
  icon: React.ComponentType<any>
  color: string
  features: string[]
}

const journeySteps: JourneyStep[] = [
  {
    id: 'signup',
    title: 'User Registration',
    description: 'Secure account creation with validation',
    image: '/images/projects/1/signup.png',
    icon: UserPlus,
    color: 'from-blue-500 to-cyan-500',
    features: ['Email validation', 'Password strength check', 'Terms acceptance', 'Account verification']
  },
  {
    id: 'login',
    title: 'Secure Authentication',
    description: 'JWT-based login with session management',
    image: '/images/projects/1/login.png',
    icon: LogIn,
    color: 'from-green-500 to-emerald-500',
    features: ['JWT token authentication', 'Remember me option', 'Password recovery', 'Session security']
  },
  {
    id: 'dashboard',
    title: 'Main Dashboard',
    description: 'Comprehensive overview of all activities',
    image: '/images/projects/1/dashboard.png',
    icon: LayoutDashboard,
    color: 'from-purple-500 to-violet-500',
    features: ['Activity overview', 'Quick stats', 'Recent actions', 'Navigation hub']
  },
  {
    id: 'clients',
    title: 'Client Management',
    description: 'View and manage all client information',
    image: '/images/projects/1/clients.png',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    features: ['Client directory', 'Search & filter', 'Client details', 'Bulk operations']
  },
  {
    id: 'create-client',
    title: 'Add New Client',
    description: 'Streamlined client creation process',
    image: '/images/projects/1/create_new_client.png',
    icon: UserCheck,
    color: 'from-teal-500 to-cyan-500',
    features: ['Form validation', 'Contact information', 'Client categorization', 'Auto-save drafts']
  },
  {
    id: 'cession',
    title: 'Cession Management',
    description: 'Create and manage session contracts',
    image: '/images/projects/1/cession.png',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    features: ['Contract creation', 'Terms definition', 'Digital signatures', 'Status tracking']
  }
]

export default function CessionAppJourney() {
  const shouldReduceMotion = useReducedMotion()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

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

  const stepVariants = useMemo(() => ({
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

  const imageVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: "easeOut"
      }
    }
  }), [shouldReduceMotion])

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-primary-background)] to-[var(--color-secondary-background)] overflow-hidden"
    >
      {isInView && <AnimatedBackground />}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            User Journey Pipeline
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-8">
            Experience the complete workflow from registration to contract management. 
            Each step is designed for maximum efficiency and user satisfaction.
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-8">
            {journeySteps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-3 h-3 rounded-full bg-[var(--color-primary-accent)] shadow-lg"></div>
                {index < journeySteps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] mx-2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-24"
        >
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 items-center`}
            >
              {/* Step Number & Arrow */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {index + 1}
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 lg:max-w-lg">
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] overflow-hidden group hover:border-[var(--color-primary-accent)]/30 transition-all duration-500">
                  <CardContent className="p-8">
                    {/* Step Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-[var(--color-text-secondary)] font-medium">
                          Step {index + 1}
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-accent)] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--color-text-secondary)] text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                          >
                            <CheckCircle className="w-4 h-4 text-[var(--color-success-energy)] flex-shrink-0" />
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Image Side */}
              <div className="flex-1 lg:max-w-2xl">
                <motion.div
                  variants={imageVariants}
                  className="relative group"
                >
                  {/* Decorative Background */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}></div>
                  
                  {/* Main Image Container */}
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
                    {/* Loading skeleton */}
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
                    )}
                    
                    {/* Optimized image */}
                    <div className={`transition-opacity duration-500 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}>
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        priority={index < 2}
                        loading={index < 2 ? "eager" : "lazy"}
                        onLoad={() => handleImageLoad(index)}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-white font-semibold text-lg mb-2">{step.title}</h4>
                        <p className="text-white/90 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step Number for Desktop */}
                  <div className="hidden lg:block absolute -top-6 -right-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-[var(--color-secondary-background)]`}>
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Arrow Connector */}
              {index < journeySteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 lg:hidden"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-accent)] flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6 text-white transform rotate-90" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Success Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-lg">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">Complete Workflow Achieved!</span>
          </div>
          <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
            From user registration to contract management, every step is optimized for efficiency, 
            security, and user experience. The platform handles complex business logic while 
            maintaining an intuitive interface.
          </p>
        </motion.div>
      </div>
    </section>
  )
}