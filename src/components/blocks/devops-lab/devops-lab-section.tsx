"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Server, 
  GitBranch, 
  Container, 
  Zap,
  Shield,
  Monitor,
  Cloud,
  Database,
  Activity,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Terminal,
  Code,
  Settings,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface MetricData {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  color: string
}

interface InfrastructureComponent {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'critical'
  uptime: string
  load: number
  icon: any
}

const metrics: MetricData[] = [
  { label: 'Uptime', value: '99.9%', change: '+0.1%', trend: 'up', color: 'text-green-400' },
  { label: 'Response Time', value: '120ms', change: '-15ms', trend: 'up', color: 'text-blue-400' },
  { label: 'Deployments', value: '50+', change: '+12', trend: 'up', color: 'text-purple-400' },
  { label: 'Error Rate', value: '0.01%', change: '-0.02%', trend: 'up', color: 'text-orange-400' }
]

const infrastructureComponents: InfrastructureComponent[] = [
  { id: 'k8s', name: 'Kubernetes Cluster', status: 'healthy', uptime: '99.9%', load: 65, icon: Container },
  { id: 'db', name: 'PostgreSQL', status: 'healthy', uptime: '99.8%', load: 45, icon: Database },
  { id: 'api', name: 'API Gateway', status: 'healthy', uptime: '99.9%', load: 72, icon: Server },
  { id: 'cdn', name: 'CDN', status: 'warning', uptime: '99.5%', load: 88, icon: Cloud },
  { id: 'monitoring', name: 'Monitoring', status: 'healthy', uptime: '100%', load: 32, icon: Monitor },
  { id: 'security', name: 'Security', status: 'healthy', uptime: '100%', load: 28, icon: Shield }
]

const deploymentSteps = [
  { id: 1, name: 'Code Commit', status: 'completed', duration: '2s' },
  { id: 2, name: 'Build & Test', status: 'completed', duration: '45s' },
  { id: 3, name: 'Security Scan', status: 'completed', duration: '12s' },
  { id: 4, name: 'Deploy to Staging', status: 'completed', duration: '30s' },
  { id: 5, name: 'Integration Tests', status: 'running', duration: '18s' },
  { id: 6, name: 'Deploy to Production', status: 'pending', duration: '-' }
]

const codeSnippets = {
  terraform: `# AWS EKS Cluster Configuration
resource "aws_eks_cluster" "main" {
  name     = "production-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"
  
  vpc_config {
    subnet_ids = aws_subnet.private[*].id
    endpoint_private_access = true
    endpoint_public_access  = true
  }
  
  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }
}`,
  kubernetes: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: web-app
        image: registry.company.com/web-app:v2.1.0
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"`,
  monitoring: `# Prometheus Configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true`
}

export default function DevOpsLabSection() {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'deployment' | 'monitoring'>('infrastructure')
  const [isDeploymentRunning, setIsDeploymentRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(4)

  useEffect(() => {
    if (isDeploymentRunning) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 6) {
            setIsDeploymentRunning(false)
            return 6
          }
          return prev + 1
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isDeploymentRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-400/10'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10'
      case 'critical': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep && isDeploymentRunning) return 'running'
    return 'pending'
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
            DevOps Laboratory
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time infrastructure monitoring, automated deployment pipelines, and 
            enterprise-grade DevOps practices in action.
          </p>
        </motion.div>

        {/* Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-medium">{metric.label}</span>
                    <TrendingUp className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className="text-green-400 text-sm font-medium">
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-[#1e293b]/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700">
            {[
              { id: 'infrastructure', label: 'Infrastructure', icon: Server },
              { id: 'deployment', label: 'Deployment', icon: GitBranch },
              { id: 'monitoring', label: 'Monitoring', icon: Activity }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'infrastructure' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Infrastructure Status */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Server className="w-5 h-5 text-blue-400" />
                      Infrastructure Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {infrastructureComponents.map((component) => (
                      <div key={component.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <component.icon className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="text-white font-medium">{component.name}</div>
                            <div className="text-gray-400 text-sm">Uptime: {component.uptime}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-gray-400 text-sm">Load</div>
                            <div className="text-white font-medium">{component.load}%</div>
                          </div>
                          <Badge className={getStatusColor(component.status)}>
                            {component.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Terraform Code */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-400" />
                      Infrastructure as Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{codeSnippets.terraform}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Deployment Pipeline */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-purple-400" />
                      Deployment Pipeline
                    </CardTitle>
                    <Button
                      onClick={() => {
                        setIsDeploymentRunning(!isDeploymentRunning)
                        if (!isDeploymentRunning) setCurrentStep(1)
                      }}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {isDeploymentRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isDeploymentRunning ? 'Pause' : 'Start Deploy'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deploymentSteps.map((step) => {
                      const status = getStepStatus(step.id)
                      return (
                        <div key={step.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex-shrink-0">
                            {status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                            {status === 'running' && <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                            {status === 'pending' && <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{step.name}</div>
                            <div className="text-gray-400 text-sm">Duration: {step.duration}</div>
                          </div>
                          <Badge className={
                            status === 'completed' ? 'text-green-400 bg-green-400/10' :
                            status === 'running' ? 'text-blue-400 bg-blue-400/10' :
                            'text-gray-400 bg-gray-400/10'
                          }>
                            {status}
                          </Badge>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Kubernetes Config */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Container className="w-5 h-5 text-blue-400" />
                      Kubernetes Deployment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{codeSnippets.kubernetes}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Metrics */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-400" />
                      Real-time Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { label: 'CPU Usage', value: 65, color: 'bg-blue-500' },
                        { label: 'Memory Usage', value: 78, color: 'bg-green-500' },
                        { label: 'Disk I/O', value: 45, color: 'bg-purple-500' },
                        { label: 'Network', value: 32, color: 'bg-orange-500' }
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">{metric.label}</span>
                            <span className="text-white">{metric.value}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${metric.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Monitoring Config */}
                <Card className="bg-[#1e293b]/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-yellow-400" />
                      Monitoring Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{codeSnippets.monitoring}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}