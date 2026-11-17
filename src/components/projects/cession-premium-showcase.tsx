"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
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
  Package,
  FileBarChart2
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
      { src: '/images/projects/1/shots/login.png', label: 'Sign-in with health check' }
    ],
    features: [
      { icon: Lock, title: 'JWT Authentication', description: 'Secure token-based authentication system' },
      { icon: UserCheck, title: 'Role-Based Access', description: 'Granular permission management' },
      { icon: Shield, title: 'Multi-Layer Security', description: 'Advanced encryption and protection' }
    ],
    stats: [
      { label: 'Authentication', value: 'JWT' },
      { label: 'Access control', value: 'Per role' }
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
      { src: '/images/projects/1/shots/clients.png', label: 'Client Directory' },
      { src: '/images/projects/1/shots/client-new.png', label: 'Create New Client' }
    ],
    features: [
      { icon: Users, title: 'Client Directory', description: 'Centralized client information hub' },
      { icon: BarChart3, title: 'Client Analytics', description: 'Deep insights into client behavior' },
      { icon: CheckCircle2, title: 'Quick Actions', description: 'Streamlined client operations' }
    ],
    stats: [
      { label: 'Client records', value: 'Searchable' },
      { label: 'Analytics', value: 'Per client' }
    ]
  },
  {
    id: 'payments',
    title: 'Payment Intelligence',
    subtitle: 'Payment tracking, monthly analysis and per-client breakdowns',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    images: [
      { src: '/images/projects/1/shots/payments.png', label: 'Payment Ledger' },
      { src: '/images/projects/1/shots/payments-analytics.png', label: 'Collection Trends' }
    ],
    features: [
      { icon: DollarSign, title: 'Payment Ledger', description: 'Every payment recorded against a cession' },
      { icon: BarChart3, title: 'Monthly Analysis', description: 'Received, active and new cessions per month' },
      { icon: Shield, title: 'Outstanding Tracking', description: 'Remaining balance surfaced per client' }
    ],
    stats: [
      { label: 'Payment views', value: 'Ledger + monthly' },
      { label: 'Tracking', value: 'Per cession' }
    ]
  },
  {
    id: 'cessions',
    title: 'Cession Management',
    subtitle: 'Wage-garnishment files from creation to final instalment',
    icon: FileText,
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    images: [
      { src: '/images/projects/1/shots/cessions.png', label: 'Cession List' },
      { src: '/images/projects/1/shots/cession-detail.png', label: 'Cession Detail' }
    ],
    features: [
      { icon: FileText, title: 'Digital Contracts', description: 'Paperless contract management' },
      { icon: CheckCircle2, title: 'Auto Workflows', description: 'Automated approval processes' },
      { icon: Shield, title: 'Legal Compliance', description: 'Built-in compliance checking' }
    ],
    stats: [
      { label: 'Lifecycle', value: 'Tracked' },
      { label: 'History', value: 'Audited' }
    ]
  },
  {
    id: 'mobile-updates',
    title: 'Mobile Sync Vault',
    subtitle: 'Field data on a phone, without an internet connection',
    icon: Smartphone,
    color: 'from-teal-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/1/shots/mobile.png', label: 'Mobile Sync Vault' }
    ],
    features: [
      { icon: Smartphone, title: 'QR Handoff', description: 'Phone scans a code and pulls a fresh copy' },
      { icon: Globe, title: 'Scheduled Exports', description: 'JSON snapshots written on a schedule' },
      { icon: Zap, title: 'No Internet Needed', description: 'Transfer happens over local Wi-Fi' }
    ],
    stats: [
      { label: 'Layout', value: 'Mobile-first' },
      { label: 'Updates', value: 'In-app' }
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
      { src: '/images/projects/1/shots/settings.png', label: 'System Settings' }
    ],
    features: [
      { icon: Settings, title: 'System Config', description: 'Granular control over all settings' },
      { icon: Globe, title: 'Multi-Language', description: 'French, English and Arabic interface' },
      { icon: Shield, title: 'Backups', description: 'Full database export for disaster recovery' }
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory & Selling',
    subtitle: 'Stock, margins and a quick-sell surface for the shop floor',
    icon: Package,
    color: 'from-amber-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10',
    images: [
      { src: '/images/projects/1/shots/inventory.png', label: 'Inventory Grid' },
      { src: '/images/projects/1/shots/selling.png', label: 'Selling Surface' }
    ],
    features: [
      { icon: Package, title: 'Stock States', description: 'In stock, low stock and out of stock at a glance' },
      { icon: DollarSign, title: 'Margin Per Product', description: 'Cost, selling price and margin together' },
      { icon: Zap, title: 'Quick Sell', description: 'Sell or restock without leaving the grid' }
    ],
    stats: [
      { label: 'Stock tracking', value: 'Per product' },
      { label: 'Alerts', value: 'Low stock' }
    ]
  },
  {
    id: 'reports',
    title: 'Bank Reports',
    subtitle: 'The monthly nominal list the banks actually receive',
    icon: FileBarChart2,
    color: 'from-slate-500 to-slate-700',
    gradient: 'bg-gradient-to-br from-slate-500/10 to-slate-700/10',
    images: [
      { src: '/images/projects/1/shots/reports.png', label: 'Nominal Monthly List' }
    ],
    features: [
      { icon: FileBarChart2, title: 'Nominal List', description: 'One row per client, per month' },
      { icon: CheckCircle2, title: 'Totals Included', description: 'Installments and assigned amounts summed' },
      { icon: BarChart3, title: 'Export', description: 'CSV export and a print-ready report' }
    ],
    stats: [
      { label: 'Output', value: 'CSV + print' },
      { label: 'Basis', value: 'Per month' }
    ]
  }
]

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
            Complete Platform Modules
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Screenshots of the running application, module by module: sign-in, clients, payments,
            cessions, inventory, bank reports, mobile handoff and configuration.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-32">
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
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
                          animate={{ opacity: 1, x: 0 }}
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
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: imgIndex * 0.1 }}
                    className="relative group"
                  >
                    <Card className="bg-white border-[var(--color-border)] overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-0">
                        {/* Loading skeleton */}
                        {!loadedImages.has(image.src) && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                        )}

                        {/* Screenshot */}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20 p-12">
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Built on a Conventional Stack
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              Spring Boot and PostgreSQL behind a Svelte frontend, with JWT authentication and
              role-based access control — the boring choices that keep a contract system predictable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Spring Boot', 'Svelte', 'PostgreSQL', 'JWT Auth', 'Role-Based Access', 'Mobile-First'].map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
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
