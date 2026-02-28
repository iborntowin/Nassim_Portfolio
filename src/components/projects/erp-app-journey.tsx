"use client"

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, LogIn, LayoutDashboard, ShoppingCart, FileText, Settings, Database, Users } from 'lucide-react'
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
    id: 'login',
    title: 'Secure Login',
    description: 'Authenticate with Argon2id hashing, session management with configurable timeouts, automatic account lockout after failed attempts, and 256-bit CSPRNG session tokens',
    image: '/images/projects/erp/login.png',
    icon: LogIn,
    color: 'from-blue-500 to-cyan-500',
    features: ['Argon2id password hashing', 'Rate limiting (5/min)', 'Account lock on threshold', 'Session timeout config']
  },
  {
    id: 'dashboard',
    title: 'Real-Time Dashboard',
    description: 'The main overview showing real-time KPI widgets for revenue, orders, and stock levels alongside interactive Recharts graphs, top-selling product rankings, and low stock alerts',
    image: '/images/projects/erp/dashboard.png',
    icon: LayoutDashboard,
    color: 'from-violet-500 to-purple-600',
    features: ['Revenue & order KPIs', 'Interactive Recharts graphs', 'Low stock alerts', 'Recent sales feed']
  },
  {
    id: 'quick-sell',
    title: 'Quick Sell POS',
    description: 'Keyboard-driven point of sale with F2 search, F3 complete sale, F4 clear cart, and 1-9 for category shortcuts. Supports multiple payment methods, tax/discount calculations, and sub-100ms checkout',
    image: '/images/projects/erp/quick_sell.png',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    features: ['F-key shortcuts', 'Category number keys', 'Multi-payment support', 'Sub-100ms checkout']
  },
  {
    id: 'invoicing',
    title: 'Invoice Management',
    description: 'Generate professional invoices with customizable prefixes (INV-, PO-), track payment status across all invoices, and view detailed line items with subtotal, tax, and discount breakdowns',
    image: '/images/projects/erp/factures.png',
    icon: FileText,
    color: 'from-orange-500 to-red-500',
    features: ['Custom prefixes (INV-, PO-)', 'Payment status tracking', 'Detailed line items', 'Date range filtering']
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'Admin-only panel supporting 6 roles (Admin, Manager, Warehouse, Sales, Accountant, Read Only) with 38 granular permissions, account locking/unlocking, password resets, and full audit logging',
    image: '/images/projects/erp/users.png',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    features: ['6 roles & 38 permissions', 'Account locking', 'Bulk operations', 'Audit logging']
  },
  {
    id: 'settings',
    title: 'Settings & Themes',
    description: 'Toggle Light, Dark, or System themes with Framer Motion transitions, switch between full English and French translations covering every UI label, and configure currency and tax rate settings—all persisted in SQLite',
    image: '/images/projects/erp/theme.png',
    icon: Settings,
    color: 'from-teal-500 to-cyan-500',
    features: ['Light/Dark/System themes', 'English & French i18n', 'Currency & tax config', 'Preferences in SQLite']
  },
  {
    id: 'database',
    title: 'Database Maintenance',
    description: 'One-click backup of inventory.db, VACUUM optimization to reclaim space, PRAGMA integrity checks, and WAL mode journaling. Archived data lets you restore past sales, purchases, and customers while keeping the active database lean',
    image: '/images/projects/erp/database_maintainense.png',
    icon: Database,
    color: 'from-indigo-500 to-blue-600',
    features: ['One-click backup', 'VACUUM optimization', 'Integrity checks', 'Data archival & restore']
  }
]

export default function ErpAppJourney() {
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
            User Journey
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Follow the complete workflow — from login to database maintenance — 
            and see how every module connects seamlessly.
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
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary-accent)] via-[var(--color-secondary-accent)] to-[var(--color-primary-accent)] opacity-30" />

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
                          Step {index + 1}
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
