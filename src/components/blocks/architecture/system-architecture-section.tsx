"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Layers, 
  Database, 
  Cloud, 
  Server, 
  Globe,
  Shield,
  Zap,
  Monitor,
  GitBranch,
  Container,
  Network,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Eye,
  Settings,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ArchitectureLayer {
  id: string
  name: string
  description: string
  technologies: string[]
  icon: any
  color: string
  features: string[]
}

interface SystemComponent {
  id: string
  name: string
  description: string
  icon: any
  color: string
  connections: string[]
  metrics: { label: string; value: string }[]
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'frontend',
    name: 'Presentation Layer',
    description: 'Modern React-based frontend with Next.js framework',
    technologies: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: Globe,
    color: 'text-blue-400',
    features: [
      'Server-Side Rendering (SSR)',
      'Static Site Generation (SSG)',
      'Progressive Web App (PWA)',
      'Responsive Design',
      'Performance Optimized'
    ]
  },
  {
    id: 'api',
    name: 'API Gateway Layer',
    description: 'RESTful APIs with authentication and rate limiting',
    technologies: ['Spring Boot', 'JWT', 'OpenAPI', 'Rate Limiting', 'CORS'],
    icon: Network,
    color: 'text-green-400',
    features: [
      'RESTful API Design',
      'JWT Authentication',
      'Rate Limiting',
      'API Documentation',
      'Error Handling'
    ]
  },
  {
    id: 'business',
    name: 'Business Logic Layer',
    description: 'Core application logic and business rules',
    technologies: ['Spring Boot', 'Java', 'Microservices', 'Event Sourcing', 'CQRS'],
    icon: Cpu,
    color: 'text-purple-400',
    features: [
      'Domain-Driven Design',
      'Microservices Architecture',
      'Event-Driven Architecture',
      'Business Rule Engine',
      'Workflow Management'
    ]
  },
  {
    id: 'data',
    name: 'Data Access Layer',
    description: 'Database abstraction and data management',
    technologies: ['PostgreSQL', 'Redis', 'JPA/Hibernate', 'Connection Pooling', 'Migrations'],
    icon: Database,
    color: 'text-orange-400',
    features: [
      'Database Abstraction',
      'Connection Pooling',
      'Query Optimization',
      'Data Validation',
      'Migration Management'
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Layer',
    description: 'Cloud infrastructure and deployment automation',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    icon: Cloud,
    color: 'text-cyan-400',
    features: [
      'Container Orchestration',
      'Auto-scaling',
      'Load Balancing',
      'Infrastructure as Code',
      'Monitoring & Logging'
    ]
  }
]

const systemComponents: SystemComponent[] = [
  {
    id: 'loadbalancer',
    name: 'Load Balancer',
    description: 'Distributes incoming requests across multiple servers',
    icon: Network,
    color: 'text-blue-400',
    connections: ['api-gateway'],
    metrics: [
      { label: 'Requests/sec', value: '10k+' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: 'Central entry point for all API requests',
    icon: Server,
    color: 'text-green-400',
    connections: ['auth-service', 'business-services'],
    metrics: [
      { label: 'Response Time', value: '120ms' },
      { label: 'Success Rate', value: '99.8%' }
    ]
  },
  {
    id: 'auth-service',
    name: 'Authentication Service',
    description: 'Handles user authentication and authorization',
    icon: Lock,
    color: 'text-purple-400',
    connections: ['database'],
    metrics: [
      { label: 'Auth Time', value: '50ms' },
      { label: 'Security Score', value: 'A+' }
    ]
  },
  {
    id: 'business-services',
    name: 'Business Services',
    description: 'Core application microservices',
    icon: Cpu,
    color: 'text-orange-400',
    connections: ['database', 'cache'],
    metrics: [
      { label: 'Processing Time', value: '200ms' },
      { label: 'Throughput', value: '5k/sec' }
    ]
  },
  {
    id: 'database',
    name: 'PostgreSQL Database',
    description: 'Primary data storage with ACID compliance',
    icon: Database,
    color: 'text-blue-500',
    connections: [],
    metrics: [
      { label: 'Query Time', value: '15ms' },
      { label: 'Availability', value: '99.9%' }
    ]
  },
  {
    id: 'cache',
    name: 'Redis Cache',
    description: 'In-memory caching for improved performance',
    icon: Zap,
    color: 'text-red-400',
    connections: [],
    metrics: [
      { label: 'Hit Rate', value: '95%' },
      { label: 'Response Time', value: '1ms' }
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring System',
    description: 'Real-time monitoring and alerting',
    icon: Monitor,
    color: 'text-yellow-400',
    connections: ['all'],
    metrics: [
      { label: 'Metrics Collected', value: '1M+/min' },
      { label: 'Alert Response', value: '<30s' }
    ]
  }
]

const designPrinciples = [
  {
    title: 'Scalability',
    description: 'Horizontal scaling with microservices and container orchestration',
    icon: Layers,
    color: 'text-blue-400'
  },
  {
    title: 'Reliability',
    description: 'High availability with redundancy and failover mechanisms',
    icon: Shield,
    color: 'text-green-400'
  },
  {
    title: 'Performance',
    description: 'Optimized for speed with caching and efficient algorithms',
    icon: Zap,
    color: 'text-yellow-400'
  },
  {
    title: 'Security',
    description: 'Defense in depth with multiple security layers',
    icon: Lock,
    color: 'text-red-400'
  },
  {
    title: 'Maintainability',
    description: 'Clean code architecture with comprehensive testing',
    icon: Settings,
    color: 'text-purple-400'
  },
  {
    title: 'Observability',
    description: 'Comprehensive monitoring, logging, and tracing',
    icon: Eye,
    color: 'text-cyan-400'
  }
]

export default function SystemArchitectureSection() {
  const [activeView, setActiveView] = useState<'layers' | 'components' | 'principles'>('layers')
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            System Architecture
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Scalable, secure, and maintainable architecture designed for enterprise-grade 
            applications with modern development practices and cloud-native technologies.
          </p>
        </motion.div>

        {/* View Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Tabs value={activeView} onValueChange={setActiveView as any} className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 bg-[#1e293b]/50 backdrop-blur-sm border border-gray-700">
              {[
                { id: 'layers', label: 'Architecture Layers', icon: Layers },
                { id: 'components', label: 'System Components', icon: Server },
                { id: 'principles', label: 'Design Principles', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="relative flex items-center gap-2 text-xs font-medium transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-400 hover:text-white"
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeView === 'layers' && (
              <div className="space-y-6">
                {architectureLayers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <layer.icon className={`w-6 h-6 ${layer.color}`} />
                          <CardTitle className="text-xl text-white">
                            {layer.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-300">
                          {layer.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className={`${layer.color} border-current/20 bg-current/5`}>
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {layer.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className={`w-3 h-3 ${layer.color} flex-shrink-0`} />
                                <span className="text-gray-300 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeView === 'components' && (
              <div>
                {/* System Diagram */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">
                    System Component Diagram
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {systemComponents.map((component, index) => (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedComponent(
                          selectedComponent === component.id ? null : component.id
                        )}
                        className="cursor-pointer"
                      >
                        <Card className={`bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm transition-all duration-300 ${
                          selectedComponent === component.id 
                            ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                            : 'hover:border-gray-500'
                        }`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3 mb-2">
                              <component.icon className={`w-5 h-5 ${component.color}`} />
                              <CardTitle className="text-lg text-white">
                                {component.name}
                              </CardTitle>
                            </div>
                            <CardDescription className="text-gray-400 text-sm">
                              {component.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {component.metrics.map((metric, metricIndex) => (
                                <div key={metricIndex} className="flex justify-between text-sm">
                                  <span className="text-gray-400">{metric.label}:</span>
                                  <span className={`font-medium ${component.color}`}>
                                    {metric.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Data Flow */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                      Data Flow Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                      {['Client', 'Load Balancer', 'API Gateway', 'Auth Service', 'Business Logic', 'Database'].map((step, index, array) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="px-3 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-400 font-medium">
                            {step}
                          </div>
                          {index < array.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'principles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm hover:border-gray-500 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <principle.icon className={`w-6 h-6 ${principle.color}`} />
                          <CardTitle className="text-lg text-white">
                            {principle.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Architecture Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border-blue-400/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Architecture Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                  <div className="text-sm text-gray-300">Architecture Layers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-300">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10k+</div>
                  <div className="text-sm text-gray-300">Requests/Second</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}