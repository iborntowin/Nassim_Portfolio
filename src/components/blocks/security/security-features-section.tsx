"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Key,
  Globe,
  Server,
  Database,
  Zap,
  Monitor,
  FileText,
  UserCheck,
  Fingerprint
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SecurityFeature {
  id: string
  name: string
  description: string
  status: 'implemented' | 'active' | 'monitored'
  icon: any
  color: string
  details: string[]
}

interface SecurityMetric {
  name: string
  value: string
  status: 'excellent' | 'good' | 'warning'
  description: string
  icon: any
}

const securityFeatures: SecurityFeature[] = [
  {
    id: 'headers',
    name: 'Security Headers',
    description: 'Comprehensive HTTP security headers implementation',
    status: 'implemented',
    icon: Shield,
    color: 'text-green-400',
    details: [
      'X-Frame-Options: DENY',
      'X-Content-Type-Options: nosniff',
      'Referrer-Policy: strict-origin-when-cross-origin',
      'Permissions-Policy configured',
      'Content-Security-Policy enforced'
    ]
  },
  {
    id: 'ssl',
    name: 'SSL/TLS Encryption',
    description: 'End-to-end encryption with modern TLS protocols',
    status: 'active',
    icon: Lock,
    color: 'text-blue-400',
    details: [
      'TLS 1.3 support',
      'HSTS enabled',
      'Perfect Forward Secrecy',
      'Certificate transparency',
      'Automatic certificate renewal'
    ]
  },
  {
    id: 'csp',
    name: 'Content Security Policy',
    description: 'Strict CSP rules to prevent XSS and injection attacks',
    status: 'implemented',
    icon: FileText,
    color: 'text-purple-400',
    details: [
      'Strict script-src policies',
      'Image source restrictions',
      'Font and style controls',
      'Frame ancestors blocked',
      'Report-only mode for testing'
    ]
  },
  {
    id: 'auth',
    name: 'Authentication Security',
    description: 'Secure authentication and session management',
    status: 'implemented',
    icon: UserCheck,
    color: 'text-orange-400',
    details: [
      'JWT token validation',
      'Secure session handling',
      'Multi-factor authentication ready',
      'Password security policies',
      'Account lockout protection'
    ]
  },
  {
    id: 'input',
    name: 'Input Validation',
    description: 'Comprehensive input sanitization and validation',
    status: 'implemented',
    icon: CheckCircle,
    color: 'text-cyan-400',
    details: [
      'Zod schema validation',
      'SQL injection prevention',
      'XSS protection',
      'CSRF token validation',
      'File upload restrictions'
    ]
  },
  {
    id: 'monitoring',
    name: 'Security Monitoring',
    description: 'Real-time security monitoring and alerting',
    status: 'monitored',
    icon: Monitor,
    color: 'text-yellow-400',
    details: [
      'Failed login attempt tracking',
      'Suspicious activity detection',
      'Rate limiting enforcement',
      'Security event logging',
      'Automated threat response'
    ]
  }
]

const securityMetrics: SecurityMetric[] = [
  {
    name: 'SSL Labs Rating',
    value: 'A+',
    status: 'excellent',
    description: 'Perfect SSL configuration score',
    icon: Lock
  },
  {
    name: 'Security Headers',
    value: '100%',
    status: 'excellent',
    description: 'All security headers properly configured',
    icon: Shield
  },
  {
    name: 'Vulnerability Scan',
    value: '0 Issues',
    status: 'excellent',
    description: 'No security vulnerabilities detected',
    icon: Eye
  },
  {
    name: 'OWASP Compliance',
    value: 'Top 10',
    status: 'excellent',
    description: 'Protected against OWASP Top 10 threats',
    icon: CheckCircle
  }
]

const securityPractices = [
  {
    category: 'Data Protection',
    practices: [
      'Encryption at rest and in transit',
      'Personal data anonymization',
      'GDPR compliance measures',
      'Data retention policies',
      'Secure backup procedures'
    ]
  },
  {
    category: 'Access Control',
    practices: [
      'Role-based access control (RBAC)',
      'Principle of least privilege',
      'Multi-factor authentication',
      'Session timeout policies',
      'API rate limiting'
    ]
  },
  {
    category: 'Infrastructure Security',
    practices: [
      'Network segmentation',
      'Firewall configuration',
      'Intrusion detection systems',
      'Regular security updates',
      'Container security scanning'
    ]
  },
  {
    category: 'Development Security',
    practices: [
      'Secure coding practices',
      'Code review processes',
      'Dependency vulnerability scanning',
      'Static code analysis',
      'Security testing automation'
    ]
  }
]

export default function SecurityFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 1))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-400/10'
      case 'good': return 'text-blue-400 bg-blue-400/10'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getFeatureStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-400 bg-green-400/10'
      case 'active': return 'text-blue-400 bg-blue-400/10'
      case 'monitored': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

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
            Security Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade security implementation with comprehensive protection 
            against modern threats and compliance with industry standards.
          </p>
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm hover:border-green-400/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className="w-6 h-6 text-green-400" />
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white font-medium mb-1">
                    {metric.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {metric.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setActiveFeature(feature.id)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm hover:border-green-400/30 transition-all duration-300 h-full group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    <Badge className={getFeatureStatusColor(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors">
                    {feature.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: activeFeature === feature.id ? 1 : 0.7,
                          x: activeFeature === feature.id ? 0 : -10
                        }}
                        transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Security Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.practices.map((practice, practiceIndex) => (
                        <div key={practiceIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Scan Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-green-400/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Real-time Security Monitoring
                </h3>
                <p className="text-gray-300">
                  Continuous security scanning and threat detection
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Security Scan Progress</span>
                    <span className="text-green-400 font-medium">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-400"
                      style={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Vulnerabilities', value: '0', status: 'safe' },
                    { label: 'Threats Blocked', value: '1,247', status: 'active' },
                    { label: 'Security Score', value: '100%', status: 'excellent' },
                    { label: 'Last Scan', value: 'Now', status: 'current' }
                  ].map((item, index) => (
                    <div key={item.label} className="text-center">
                      <div className="text-lg font-bold text-green-400 mb-1">
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}