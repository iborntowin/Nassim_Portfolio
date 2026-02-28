"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { 
  Shield, 
  ShoppingCart, 
  FileText, 
  Users, 
  Settings, 
  Database, 
  BarChart3,
  Globe,
  Lock,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Palette,
  Languages,
  Package,
  HardDrive
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ModuleImage {
  src: string
  label: string
  description: string
}

interface Module {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  gradient: string
  images: ModuleImage[]
  features: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string }[]
  stats?: { label: string; value: string; trend?: string }[]
}

const modules: Module[] = [
  {
    id: 'dashboard',
    title: 'Real-Time Dashboard',
    subtitle: 'KPI widgets, interactive charts, and smart alerts at a glance',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-violet-500/10 to-purple-600/10',
    images: [
      { src: '/images/projects/erp/dashboard.png', label: 'Dashboard', description: 'The main command center of InventoryERP. Displays real-time KPI widgets for revenue, total orders, and current stock levels. Features interactive Recharts graphs, a top-selling products ranking with trend indicators, low stock alerts, and a recent sales activity feed — all refreshed in real time via TanStack Query.' }
    ],
    features: [
      { icon: BarChart3, title: 'Live Analytics', description: 'Revenue, orders, and stock levels updated in real time' },
      { icon: Zap, title: 'Low Stock Alerts', description: 'Automatic notifications when inventory drops below threshold' },
      { icon: Package, title: 'Top Products', description: 'Top-selling products ranked with trend indicators' }
    ],
    stats: [
      { label: 'Response Time', value: '< 5ms', trend: 'Rust-powered' },
      { label: 'KPI Widgets', value: '6+', trend: 'Real-time' }
    ]
  },
  {
    id: 'authentication',
    title: 'Enterprise Security',
    subtitle: 'Argon2id hashing, RBAC, and session management',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/erp/login.png', label: 'Login', description: 'Secure authentication page with Argon2id password hashing (OWASP recommended), rate limiting (5 attempts/minute), and configurable session timeouts. Passwords require uppercase, lowercase, number, and special character. Failed attempts trigger automatic account lockout after the configurable threshold.' },
      { src: '/images/projects/erp/users.png', label: 'Users', description: 'Admin-only user management panel with full CRUD operations. Supports 6 roles (Administrator, Manager, Warehouse, Sales, Accountant, Read Only) across 38 granular permissions. Includes account locking/unlocking, password resets, audit log viewing, and bulk user operations — all secured behind RBAC middleware.' }
    ],
    features: [
      { icon: Lock, title: 'Argon2id Hashing', description: 'Industry-leading password hashing algorithm' },
      { icon: Users, title: 'Role-Based Access', description: '6 roles with 38 granular permissions' },
      { icon: Shield, title: 'Audit Trails', description: 'Complete logging of all user actions for compliance' }
    ],
    stats: [
      { label: 'Roles', value: '6 tiers' },
      { label: 'Permissions', value: '38' }
    ]
  },
  {
    id: 'quick-sell',
    title: 'Quick Sell POS',
    subtitle: 'Keyboard-driven point of sale with category shortcuts',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    images: [
      { src: '/images/projects/erp/quick_sell.png', label: 'Quick Sell', description: 'A keyboard-driven point of sale interface designed for speed. F2 opens search, F3 completes the sale, F4 clears the cart, and keys 1-9 jump to product categories. Supports multiple payment methods, discount and tax calculations, customer association, and instant invoice generation — all with sub-100ms checkout flow powered by the Rust backend.' }
    ],
    features: [
      { icon: Zap, title: 'Keyboard Shortcuts', description: 'F2 Search, F3 Complete, F4 Clear, 1-9 Categories' },
      { icon: ShoppingCart, title: 'Fast Checkout', description: 'Sub-100ms checkout flow optimized for speed' },
      { icon: CheckCircle2, title: 'Multi-Payment', description: 'Cash, card, and split payment support' }
    ],
    stats: [
      { label: 'Checkout', value: '< 100ms' },
      { label: 'Shortcuts', value: '10+ keys' }
    ]
  },
  {
    id: 'invoicing',
    title: 'Invoice Management',
    subtitle: 'Professional invoice generation, tracking, and customization',
    icon: FileText,
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    images: [
      { src: '/images/projects/erp/factures.png', label: 'Factures', description: 'The invoice list view showing all generated invoices with status indicators (paid, pending, overdue). Supports filtering by date range, payment status, and customer. Each invoice row displays the invoice number, customer name, total amount, and payment method at a glance.' },
      { src: '/images/projects/erp/facture_params.png', label: 'Facture Params', description: 'Invoice parameter configuration screen. Allows customizing invoice number prefixes (e.g. INV-), purchase order prefixes (PO-), default currency, and tax rate settings. These settings are stored in the SQLite settings table and apply globally across all new invoices.' },
      { src: '/images/projects/erp/Invoice Details.png', label: 'Invoice Details', description: 'Detailed invoice view displaying line items with product name, quantity, unit price, discount, and line total. Shows the full breakdown of subtotal, tax amount, discount, and grand total. Includes customer information, payment status with visual badge, and the associated payment method.' }
    ],
    features: [
      { icon: FileText, title: 'Pro Invoices', description: 'Generate professional invoices with custom prefixes' },
      { icon: BarChart3, title: 'Payment Tracking', description: 'Track payment status across all invoices' },
      { icon: Settings, title: 'Customizable', description: 'Configure invoice numbering, tax, and templates' }
    ],
    stats: [
      { label: 'Generation', value: 'Instant' },
      { label: 'Formats', value: 'PDF/Print' }
    ]
  },
  {
    id: 'appearance',
    title: 'Themes & Internationalization',
    subtitle: 'Light, Dark, and System themes, plus full English/French i18n',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    images: [
      { src: '/images/projects/erp/theme.png', label: 'Theme', description: 'Appearance settings with three modes: Light, Dark, and System-follow. Theme changes are applied with smooth CSS transitions powered by Framer Motion. The user\'s preference is persisted in the database and restored automatically on login, ensuring a consistent experience across sessions.' },
      { src: '/images/projects/erp/languge.png', label: 'Language', description: 'Full internationalization (i18n) with 100% coverage in English and French. Every label, button, placeholder, error message, and tooltip is translated. The user\'s language preference is stored in the database and persisted across sessions. Locale-aware formatting handles dates, currencies, and numbers per region.' }
    ],
    features: [
      { icon: Palette, title: 'Theme System', description: 'Smooth transitions between Light, Dark, and System modes' },
      { icon: Languages, title: 'Full i18n', description: '100% coverage in English and French with user persistence' },
      { icon: Globe, title: 'Locale Aware', description: 'Date, currency, and number formatting per locale' }
    ]
  },
  {
    id: 'database',
    title: 'Database & Data Management',
    subtitle: 'Maintenance tools, archived data, and backup capabilities',
    icon: Database,
    color: 'from-teal-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/erp/database_maintainense.png', label: 'Database Maintenance', description: 'Database administration panel with one-click backup, VACUUM optimization, and integrity checks. The SQLite database runs in WAL (Write-Ahead Logging) mode for safe concurrent reads/writes. Includes tools for checking database size, running diagnostics, and managing the inventory.db stored in the app data directory.' },
      { src: '/images/projects/erp/archived_data.png', label: 'Archived Data', description: 'Archived data management for historical records and compliance. Allows viewing and restoring archived sales, purchases, and customer records. Old data can be archived to reduce active database size while maintaining a complete audit trail for regulatory and business reporting requirements.' }
    ],
    features: [
      { icon: HardDrive, title: 'Backup & Restore', description: 'One-click database backup with integrity checks' },
      { icon: Database, title: 'Optimization', description: 'VACUUM and WAL mode for peak performance' },
      { icon: Shield, title: 'Data Archival', description: 'Archive old records for compliance and storage savings' }
    ],
    stats: [
      { label: 'DB Engine', value: 'SQLite' },
      { label: 'Mode', value: 'WAL' }
    ]
  }
]

export default function ErpPremiumShowcase() {
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
            Complete ERP Modules
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Explore every module of InventoryERP — from the real-time dashboard to database maintenance, 
            each feature is built with Rust performance and modern React UI in mind.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-32">
          {modules.map((module) => (
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

                {/* Images with Side-by-Side Descriptions */}
                {module.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: imgIndex * 0.1 }}
                    className="relative group col-span-full"
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-0">
                        <div className={`flex flex-col ${imgIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                          {/* Image Side */}
                          <div className="relative md:w-3/5 flex-shrink-0 overflow-hidden">
                            {/* Loading skeleton */}
                            {!loadedImages.has(image.src) && (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                            )}

                            <div className={`transition-opacity duration-500 ${loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0'}`}>
                              <Image
                                src={image.src}
                                alt={image.label}
                                width={800}
                                height={600}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onLoad={() => handleImageLoad(image.src)}
                              />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-medium text-sm">
                                  {image.label}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description Side */}
                          <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit bg-gradient-to-r ${module.gradient} text-white`}>
                              <module.icon className="w-3 h-3" />
                              {module.title}
                            </div>
                            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                              {image.label}
                            </h5>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                              {image.description}
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
              A Complete Desktop ERP in ~15 MB
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              From inventory tracking to invoicing, from RBAC security to multi-language support — 
              InventoryERP packs enterprise power into a single native executable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Tauri + Rust', 'Offline-First', 'Argon2id Security', 'SQLite Performance', 'Multi-Language', 'Native Desktop'].map((tag, index) => (
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
