"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Award, Cloud, Shield, Server, 
  CheckCircle, Calendar, 
  GitBranch, Container,
  Lock, Monitor, TrendingUp
} from 'lucide-react'

import React from 'react'

interface Certification {
  id: string
  name: string
  issuer: string
  level: 'professional' | 'associate' | 'specialty' | 'expert'
  category: 'cloud' | 'devops' | 'security' | 'database'
  icon: React.ElementType
  color: string
  gradient: string
  year: string
  credentialId?: string
  skills: string[]
  description: string
}

interface Achievement {
  icon: React.ElementType
  value: string
  label: string
  color: string
}

const certifications: Certification[] = [
  {
    id: 'aws-saa',
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    level: 'professional',
    category: 'cloud',
    icon: Cloud,
    color: 'text-orange-400',
    gradient: 'from-orange-500 to-amber-500',
    year: '2024',
    credentialId: 'AWS-SAP-****',
    skills: ['Multi-Region Architecture', 'Cost Optimization', 'High Availability', 'Disaster Recovery'],
    description: 'Designed enterprise-grade architectures with 99.99% SLA across multi-region deployments'
  },
  {
    id: 'cka',
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    level: 'professional',
    category: 'devops',
    icon: Container,
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-indigo-500',
    year: '2024',
    credentialId: 'CKA-****',
    skills: ['Cluster Management', 'Pod Networking', 'RBAC', 'Helm Charts'],
    description: 'Production Kubernetes cluster management with auto-scaling and zero-downtime deployments'
  },
  {
    id: 'terraform',
    name: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    level: 'associate',
    category: 'devops',
    icon: GitBranch,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-violet-500',
    year: '2024',
    credentialId: 'HCT-****',
    skills: ['Infrastructure as Code', 'State Management', 'Module Design', 'Multi-Cloud'],
    description: 'IaC mastery — 100% infrastructure defined, versioned, and reproducible via Terraform'
  },
  {
    id: 'openstack',
    name: 'OpenStack Administrator',
    issuer: 'OpenInfra Foundation',
    level: 'professional',
    category: 'cloud',
    icon: Server,
    color: 'text-red-400',
    gradient: 'from-red-500 to-rose-500',
    year: '2025',
    credentialId: 'COA-****',
    skills: ['Nova Compute', 'Neutron SDN', 'Cinder Storage', 'Heat Orchestration'],
    description: 'Full private cloud deployment: compute, networking, storage, and orchestration'
  },
  {
    id: 'prometheus',
    name: 'Prometheus & Grafana Specialist',
    issuer: 'Linux Foundation',
    level: 'specialty',
    category: 'devops',
    icon: Monitor,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
    year: '2024',
    credentialId: 'PCA-****',
    skills: ['PromQL Mastery', 'Dashboard Design', 'Alert Management', 'Service Discovery'],
    description: 'Enterprise observability: 2M+ metrics/min collection with custom alerting pipelines'
  },
  {
    id: 'security',
    name: 'Cloud Security Professional',
    issuer: 'ISC2 / Cloud Security Alliance',
    level: 'professional',
    category: 'security',
    icon: Shield,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-sky-500',
    year: '2025',
    credentialId: 'CCSP-****',
    skills: ['Zero Trust Architecture', 'IAM Policies', 'Encryption at Rest/Transit', 'Compliance'],
    description: 'Defense-in-depth security across cloud workloads with zero-trust principles'
  }
]

const achievements: Achievement[] = [
  { icon: Cloud, value: '3', label: 'Cloud Platforms Mastered', color: 'text-blue-400' },
  { icon: Award, value: '6', label: 'Professional Certifications', color: 'text-yellow-400' },
  { icon: TrendingUp, value: '99.99%', label: 'SLA Achievement', color: 'text-green-400' },
  { icon: Lock, value: '0', label: 'Security Incidents', color: 'text-red-400' },
]

const levelColors = {
  professional: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black',
  associate: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
  specialty: 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
  expert: 'bg-gradient-to-r from-red-400 to-red-500 text-white',
}

export default function CloudCertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredCerts = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(c => c.category === activeCategory)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Verified Credentials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Cloud </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              Certifications
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Industry-recognized certifications validating expertise across cloud platforms, 
            container orchestration, infrastructure automation, and security engineering.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center hover:border-white/15 transition-all group"
            >
              <ach.icon className={`w-6 h-6 ${ach.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <div className={`text-3xl font-bold ${ach.color} font-mono mb-1`}>{ach.value}</div>
              <div className="text-gray-500 text-xs">{ach.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { id: 'all', label: 'All', icon: Award },
            { id: 'cloud', label: 'Cloud', icon: Cloud },
            { id: 'devops', label: 'DevOps', icon: GitBranch },
            { id: 'security', label: 'Security', icon: Shield },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
                className="cursor-pointer group"
              >
                <div className={`relative bg-white/[0.03] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedCert === cert.id 
                    ? 'border-white/20 shadow-xl ring-1 ring-white/10' 
                    : 'border-white/[0.06] hover:border-white/15'
                }`}>
                  {/* Gradient top bar */}
                  <div className={`h-1 bg-gradient-to-r ${cert.gradient}`} />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cert.gradient} shadow-lg`}>
                          <cert.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">
                            {cert.name}
                          </h3>
                          <p className="text-gray-500 text-xs">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${levelColors[cert.level]}`}>
                        {cert.level.toUpperCase()}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{cert.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-white/5 border border-white/[0.06] rounded-md text-gray-400">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-gray-600" />
                        <span className="text-gray-500 text-xs">{cert.year}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-gray-500 text-xs font-mono">{cert.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Cloud Expertise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Continuous Learning, Proven Expertise
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Every certification is backed by real-world production deployments — 
            not just exam knowledge, but battle-tested infrastructure experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['AWS', 'OpenStack', 'Kubernetes', 'Terraform', 'Prometheus', 'Docker'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
