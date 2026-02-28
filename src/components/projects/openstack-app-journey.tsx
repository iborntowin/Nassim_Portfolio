"use client"

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Server, Network, HardDrive, Shield, BarChart3, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useCallback, useRef, useMemo } from 'react'

interface JourneyStep {
  id: string
  title: string
  description: string
  image: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  features: string[]
}

const journeySteps: JourneyStep[] = [
  {
    id: 'architecture',
    title: 'Architecture & Planning',
    description: 'Designed the complete cloud topology — multi-node deployment with compute, networking, and storage layers. Defined the security model with Security Groups, WAF policies, and network isolation boundaries across tenants.',
    image: '/images/projects/openstack/1770235637771.jpeg',
    icon: Server,
    color: 'from-red-500 to-orange-500',
    features: ['Multi-node topology', 'Network design', 'Storage planning', 'Security model']
  },
  {
    id: 'core-services',
    title: 'Core Service Deployment',
    description: 'Provisioned and configured the full OpenStack service catalog: Nova for compute orchestration, Neutron for software-defined networking with floating IPs and tenant isolation, Glance for image management, and Cinder + Swift for block and object storage.',
    image: '/images/projects/openstack/1770235639020.jpeg',
    icon: Network,
    color: 'from-blue-500 to-cyan-500',
    features: ['Nova compute', 'Neutron SDN', 'Glance images', 'Cinder & Swift storage']
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code',
    description: 'Automated the entire provisioning lifecycle with Heat orchestration templates — parameterized, reusable, and capable of full stack creation and teardown. Every resource from networks to instances is defined declaratively.',
    image: '/images/projects/openstack/1770235639023.jpeg',
    icon: HardDrive,
    color: 'from-amber-500 to-yellow-500',
    features: ['Heat templates', 'Parameterized stacks', 'Auto provisioning', 'Full teardown']
  },
  {
    id: 'security',
    title: 'Security Hardening',
    description: 'Implemented enterprise-grade security across every layer: least-privilege Security Groups, WAF for application protection, Floating IPs for controlled external access, and persistent volumes for data durability under failure conditions.',
    image: '/images/projects/openstack/1770235639246.jpeg',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    features: ['Security Groups', 'WAF protection', 'Floating IPs', 'Persistent volumes']
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    description: 'Built a full-stack monitoring solution with Prometheus collecting metrics across all services and Grafana dashboards visualizing compute, network, and storage KPIs in real time. Configured alerting rules for proactive incident response.',
    image: '/images/projects/openstack/1770235639020.jpeg',
    icon: BarChart3,
    color: 'from-purple-500 to-violet-500',
    features: ['Prometheus metrics', 'Grafana dashboards', 'Alert rules', 'Log aggregation']
  },
  {
    id: 'validation',
    title: 'Operational Validation',
    description: 'End-to-end validation of every infrastructure capability: instance boot and lifecycle, volume attach/detach and persistence, floating IP assignment and external connectivity, and secure SSH access through security groups.',
    image: '/images/projects/openstack/1770235639246.jpeg',
    icon: CheckCircle,
    color: 'from-teal-500 to-cyan-500',
    features: ['Instance boot ✔', 'Volume attach ✔', 'Floating IP ✔', 'SSH access ✔']
  }
]

export default function OpenStackAppJourney() {
  const shouldReduceMotion = useReducedMotion()
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }, [])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      }
    }
  }), [shouldReduceMotion])

  const stepVariants = useMemo(() => ({
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: "easeOut" as const
      }
    }
  }), [shouldReduceMotion])

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Deployment Journey
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Follow the complete path — from architecture planning to operational validation — 
            and see how every OpenStack service was deployed and hardened.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-blue-500 to-green-500 opacity-30" />

          {journeySteps.map((step, index) => {
            const isEven = index % 2 === 0
            const StepIcon = step.icon
            
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg ring-4 ring-[var(--color-primary-background)]`}
                  >
                    <StepIcon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-4' : 'md:pl-4'} pl-20 md:pl-0`}>
                  <Card className="bg-[var(--color-primary-background)] border-[var(--color-border)] overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      {!loadedImages.has(index) && (
                        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                      )}
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={600}
                        height={350}
                        className={`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ${
                          loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                          Phase {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        {step.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {step.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} flex-shrink-0`} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow connector (hidden on mobile) */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-10">
                    <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] rotate-90 opacity-40" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
