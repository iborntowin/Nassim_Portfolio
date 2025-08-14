'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DeploymentStatusProps {
  showPipeline?: boolean
  showServices?: boolean
  showInfrastructure?: boolean
  compact?: boolean
}

interface PipelineStage {
  name: string
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped'
  duration?: string
  icon: string
}

interface ServiceStatus {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  replicas: string
  version: string
  lastDeploy: string
  icon: string
}

interface InfrastructureComponent {
  name: string
  status: 'active' | 'provisioning' | 'error'
  region: string
  cost: string
  icon: string
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  showPipeline = true,
  showServices = true,
  showInfrastructure = true,
  compact = false
}) => {
  const [currentPipeline, setCurrentPipeline] = useState<PipelineStage[]>([])
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [infrastructure, setInfrastructure] = useState<InfrastructureComponent[]>([])
  const [pipelineProgress, setPipelineProgress] = useState(0)

  const samplePipeline: PipelineStage[] = [
    { name: 'Code Quality', status: 'success', duration: '1m 23s', icon: '🔍' },
    { name: 'Unit Tests', status: 'success', duration: '2m 45s', icon: '🧪' },
    { name: 'Build Image', status: 'success', duration: '3m 12s', icon: '🐳' },
    { name: 'Security Scan', status: 'success', duration: '1m 56s', icon: '🔒' },
    { name: 'Deploy Staging', status: 'running', duration: '0m 34s', icon: '🚀' },
    { name: 'Integration Tests', status: 'pending', icon: '🔗' },
    { name: 'Deploy Production', status: 'pending', icon: '🌐' }
  ]

  const sampleServices: ServiceStatus[] = [
    {
      name: 'portfolio-web',
      status: 'healthy',
      replicas: '3/3',
      version: 'v2.1.4',
      lastDeploy: '2h ago',
      icon: '🌐'
    },
    {
      name: 'api-gateway',
      status: 'healthy',
      replicas: '2/2',
      version: 'v1.8.2',
      lastDeploy: '4h ago',
      icon: '🚪'
    },
    {
      name: 'auth-service',
      status: 'healthy',
      replicas: '2/2',
      version: 'v3.0.1',
      lastDeploy: '1d ago',
      icon: '🔐'
    },
    {
      name: 'monitoring',
      status: 'healthy',
      replicas: '1/1',
      version: 'v0.9.8',
      lastDeploy: '3d ago',
      icon: '📊'
    }
  ]

  const sampleInfrastructure: InfrastructureComponent[] = [
    {
      name: 'EKS Cluster',
      status: 'active',
      region: 'us-east-1',
      cost: '$127/mo',
      icon: '⎈'
    },
    {
      name: 'RDS PostgreSQL',
      status: 'active',
      region: 'us-east-1',
      cost: '$45/mo',
      icon: '🗄️'
    },
    {
      name: 'CloudFront CDN',
      status: 'active',
      region: 'global',
      cost: '$12/mo',
      icon: '🌍'
    },
    {
      name: 'S3 Storage',
      status: 'active',
      region: 'us-east-1',
      cost: '$8/mo',
      icon: '📦'
    }
  ]

  useEffect(() => {
    setCurrentPipeline(samplePipeline)
    setServices(sampleServices)
    setInfrastructure(sampleInfrastructure)

    // Simulate pipeline progress
    const interval = setInterval(() => {
      setPipelineProgress(prev => {
        const newProgress = (prev + 1) % 100
        if (newProgress === 0) {
          // Reset pipeline when complete
          setCurrentPipeline(prev => prev.map((stage, index) => ({
            ...stage,
            status: index < 4 ? 'success' : index === 4 ? 'running' : 'pending'
          })))
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return 'text-green-400'
      case 'running':
      case 'provisioning':
        return 'text-yellow-400'
      case 'failed':
      case 'down':
      case 'error':
        return 'text-red-400'
      case 'degraded':
        return 'text-orange-400'
      case 'pending':
      case 'skipped':
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return '✅'
      case 'running':
      case 'provisioning':
        return '🔄'
      case 'failed':
      case 'down':
      case 'error':
        return '❌'
      case 'degraded':
        return '⚠️'
      case 'pending':
        return '⏳'
      case 'skipped':
        return '⏭️'
      default:
        return '⚪'
    }
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-4 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">🚀</span>
          <span className="text-green-400">Pipeline: RUNNING</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">⎈</span>
          <span className="text-green-400">Services: 4/4 UP</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">☁️</span>
          <span className="text-green-400">AWS: HEALTHY</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 font-mono">
      {/* CI/CD Pipeline */}
      {showPipeline && (
        <div className="bg-gray-900/50 border border-blue-400/30 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-blue-400 font-semibold flex items-center space-x-2">
              <span>🚀</span>
              <span>CI/CD PIPELINE</span>
            </div>
            <div className="text-xs text-gray-400">
              Build #1247 • Branch: main • Commit: a7b3c9d
            </div>
          </div>

          <div className="space-y-2">
            {currentPipeline.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(stage.status)}</span>
                  <span className="text-gray-300">{stage.name}</span>
                  <span className={getStatusColor(stage.status)}>
                    {stage.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {stage.duration || '--'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress bar for running stage */}
          <div className="mt-3 bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pipelineProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      )}

      {/* Service Status */}
      {showServices && (
        <div className="bg-gray-900/50 border border-green-400/30 rounded p-4">
          <div className="text-green-400 font-semibold mb-3 flex items-center space-x-2">
            <span>⎈</span>
            <span>KUBERNETES SERVICES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-gray-800/50 rounded p-2"
              >
                <div className="flex items-center space-x-2">
                  <span>{service.icon}</span>
                  <div>
                    <div className="text-gray-300 text-sm">{service.name}</div>
                    <div className="text-xs text-gray-500">
                      {service.version} • {service.lastDeploy}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getStatusColor(service.status)}`}>
                    {service.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {service.replicas}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Infrastructure Status */}
      {showInfrastructure && (
        <div className="bg-gray-900/50 border border-purple-400/30 rounded p-4">
          <div className="text-purple-400 font-semibold mb-3 flex items-center space-x-2">
            <span>☁️</span>
            <span>AWS INFRASTRUCTURE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {infrastructure.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-gray-800/50 rounded p-2"
              >
                <div className="flex items-center space-x-2">
                  <span>{component.icon}</span>
                  <div>
                    <div className="text-gray-300 text-sm">{component.name}</div>
                    <div className="text-xs text-gray-500">
                      {component.region}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getStatusColor(component.status)}`}>
                    {component.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {component.cost}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-xs text-gray-400">
            <span>Total Monthly Cost: $192</span>
            <span>Last Terraform Apply: 6h ago</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeploymentStatus