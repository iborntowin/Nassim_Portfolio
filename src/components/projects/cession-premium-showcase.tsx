"use client"

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { 
  Shield, 
  Users, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings, 
  Smartphone, 
  Globe,
  DollarSign,
  UserCheck,
  Lock,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ModuleImage {
  src: string
  label: string
}

interface Module {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
  images: ModuleImage[]
  features: { icon: React.ComponentType<any>; title: string; description: string }[]
  stats?: { label: string; value: string; trend?: string }[]
}

const modules: Module[] = [
  {
    id: 'authentication',
    title: 'Secure Authentication',
    subtitle: 'Enterprise-grade security with seamless user experience',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/1/signup.png', label: 'User Registration' },
      { src: '/images/projects/1/login.png', label: 'Secure Login' },
      { src: '/images/projects/1/auth.jpg', label: 'Authentication Flow' }
    ],
    features: [
      { icon: Lock, title: 'JWT Authentication', description: 'Secure token-based authentication system' },
      { icon: UserCheck, title: 'Role-Based Access', description: 'Granular permission management' },
      { icon: Shield, title: 'Multi-Layer Security', description: 'Advanced encryption and protection' }
    ],
    stats: [
      { label: 'Security Score', value: '99.9%', trend: '+5%' },
      { label: 'Auth Time', value: '< 100ms', trend: '-20ms' }
    ]
  },
  {
    id: 'clients',
    title: 'Client Management',
    subtitle: 'Comprehensive client relationship and data management',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    images: [
      { src: '/images/projects/1/clients.png', label: 'Client Directory' },
      { src: '/images/projects/1/create_new_client.png', label: 'Create New Client' },
      { src: '/images/projects/1/clients-analytics.png', label: 'Client Performance Analytics' },
      { src: '/images/projects/1/clients-analytics2.png', label: 'Client Engagement Insights' }
    ],
    features: [
      { icon: Users, title: 'Client Directory', description: 'Centralized client information hub' },
      { icon: BarChart3, title: 'Client Analytics', description: 'Deep insights into client behavior' },
      { icon: CheckCircle2, title: 'Quick Actions', description: 'Streamlined client operations' }
    ],
    stats: [
      { label: 'Active Clients', value: '2,500+', trend: '+12%' },
      { label: 'Satisfaction', value: '98%', trend: '+3%' }
    ]
  },
  {
    id: 'payments',
    title: 'Payment Intelligence',
    subtitle: 'AI-powered payment processing and analytics',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    images: [
      { src: '/images/projects/1/Intelligence_des_Paiements.png', label: 'AI Payment Intelligence Dashboard' },
      { src: '/images/projects/1/intel-payments.png', label: 'Smart Payment Processing' },
      { src: '/images/projects/1/client-payment-analytics.png', label: 'Client Payment Overview' },
      { src: '/images/projects/1/client-payment-analytics2.png', label: 'Payment Trends Analysis' },
      { src: '/images/projects/1/client-payment-analytics3.png', label: 'Revenue Distribution' },
      { src: '/images/projects/1/client-payment-analytics4.png', label: 'Payment Success Metrics' },
      { src: '/images/projects/1/cession-payment-chart.png', label: 'Contract Payment Charts' },
      { src: '/images/projects/1/risq.png', label: 'Risk Assessment Dashboard' }
    ],
    features: [
      { icon: DollarSign, title: 'Smart Processing', description: 'AI-optimized payment flows' },
      { icon: BarChart3, title: 'Advanced Analytics', description: 'Comprehensive payment insights' },
      { icon: Shield, title: 'Risk Management', description: 'Fraud detection and prevention' }
    ],
    stats: [
      { label: 'Transactions', value: '$2.4M', trend: '+28%' },
      { label: 'Success Rate', value: '99.7%', trend: '+0.4%' }
    ]
  },
  {
    id: 'cessions',
    title: 'Contract Management',
    subtitle: 'Streamlined session and contract lifecycle management',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    images: [
      { src: '/images/projects/1/cession.png', label: 'Contract Creation Interface' },
      { src: '/images/projects/1/Détails_Cession.png', label: 'Detailed Contract View' },
      { src: '/images/projects/1/contracts.jpg', label: 'Contract Management Overview' }
    ],
    features: [
      { icon: FileText, title: 'Digital Contracts', description: 'Paperless contract management' },
      { icon: CheckCircle2, title: 'Auto Workflows', description: 'Automated approval processes' },
      { icon: Shield, title: 'Legal Compliance', description: 'Built-in compliance checking' }
    ],
    stats: [
      { label: 'Contracts', value: '5,200+', trend: '+450' },
      { label: 'Processing', value: '2 days', trend: '-3 days' }
    ]
  },
  {
    id: 'mobile-updates',
    title: 'Mobile & System Updates',
    subtitle: 'Cross-platform access with seamless maintenance',
    icon: Smartphone,
    color: 'from-teal-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/1/Mobile Data Export & Sync.png', label: 'Mobile Data Synchronization' },
      { src: '/images/projects/1/mobile.jpg', label: 'Mobile App Interface' },
      { src: '/images/projects/1/update.png', label: 'System Update Process' },
      { src: '/images/projects/1/update2.png', label: 'Automated Maintenance' }
    ],
    features: [
      { icon: Smartphone, title: 'Mobile Optimized', description: 'Native-like mobile experience' },
      { icon: Globe, title: 'Data Sync', description: 'Real-time cross-device synchronization' },
      { icon: Zap, title: 'Auto Updates', description: 'Seamless system maintenance' }
    ],
    stats: [
      { label: 'Mobile Users', value: '65%', trend: '+12%' },
      { label: 'Uptime', value: '99.99%', trend: '+0.05%' }
    ]
  },
  {
    id: 'settings',
    title: 'Advanced Configuration',
    subtitle: 'Comprehensive system customization and preferences',
    icon: Settings,
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10',
    images: [
      { src: '/images/projects/1/Settings.png', label: 'System Configuration Panel' },
      { src: '/images/projects/1/language.png', label: 'Multi-Language Settings' }
    ],
    features: [
      { icon: Settings, title: 'System Config', description: 'Granular control over all settings' },
      { icon: Globe, title: 'Multi-Language', description: 'International localization support' },
      { icon: Shield, title: 'Privacy Controls', description: 'Advanced privacy management' }
    ]
  }
]

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (!videoRef.current) return

    if (isInView && !isPlaying) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, user interaction required
      })
      setIsPlaying(true)
    } else if (!isInView && isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isInView, isPlaying])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div ref={containerRef} className="relative group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`w-full h-auto object-cover ${className}`}
        loop
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          {isPlaying ? (
            <Pause className="w-8 h-8 text-black" />
          ) : (
            <Play className="w-8 h-8 text-black ml-1" />
          )}
        </div>
      </button>
    </div>
  )
}

export default function CessionPremiumShowcase() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
            Complete Platform Modules
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Explore the comprehensive suite of features designed to streamline every aspect 
            of your business operations with cutting-edge technology and intuitive design.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-32">
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Module Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-xl`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                      {module.title}
                    </h3>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                      {module.subtitle}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                {module.stats && (
                  <div className="flex gap-6 mt-8">
                    {module.stats.map((stat, index) => (
                      <Card key={index} className={`${module.gradient} border-none`}>
                        <CardContent className="p-6">
                          <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                            {stat.label}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                              {stat.value}
                            </span>
                            {stat.trend && (
                              <span className="text-sm font-medium text-green-500 flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.trend}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Grid */}
              <div className={`grid grid-cols-1 ${module.images.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
                {/* Features Card */}
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                  <CardContent className="p-8">
                    <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success-energy)]" />
                      Key Features
                    </h4>
                    <div className="space-y-6">
                      {module.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center flex-shrink-0`}>
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                              {feature.title}
                            </h5>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Images Grid */}
                {module.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: imgIndex * 0.1 }}
                    className="relative group"
                  >
                    <Card className="bg-white border-[var(--color-border)] overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-0">
                        {/* Loading skeleton */}
                        {!loadedImages.has(image.src) && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                        )}

                        {/* Image or Video */}
                        {(module.id === 'mobile-updates' && (image.src.includes('update.png') || image.src.includes('update2.png'))) ? (
                          <VideoPlayer
                            src="/videos/update.mp4"
                            poster={image.src}
                            className="w-full h-auto"
                          />
                        ) : (
                          <div className={`transition-opacity duration-500 ${loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0'}`}>
                            <Image
                              src={image.src}
                              alt={image.label}
                              width={800}
                              height={600}
                              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onLoad={() => handleImageLoad(image.src)}
                            />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-medium text-sm">
                              {image.label}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20 p-12">
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Experience the Full Power
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              From authentication to analytics, from mobile to desktop, every module is crafted 
              with precision to deliver an exceptional user experience and drive business growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Enterprise Security', 'Real-Time Analytics', 'AI Intelligence', 'Mobile First', 'Scalable Architecture', 'Cloud Native'].map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-6 py-3 bg-[var(--color-primary-accent)]/20 text-[var(--color-primary-accent)] rounded-full text-sm font-semibold"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
