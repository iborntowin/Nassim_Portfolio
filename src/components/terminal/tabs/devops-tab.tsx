"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import { SyntaxHighlighter } from '../shared/syntax-highlighter'
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
  Settings,
  TrendingUp,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react'

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

export function DevOpsTab({ isActive }: TerminalTabProps) {
  const [activeView, setActiveView] = useState<'infrastructure' | 'deployment' | 'monitoring'>('infrastructure')
  const [isDeploymentRunning, setIsDeploymentRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(4)
  const [animatedMetrics, setAnimatedMetrics] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setAnimatedMetrics(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isActive])

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

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">DevOps Laboratory</h3>
          </div>
        </div>
        
        <TerminalSlideIn delay={0.1}>
          <TypewriterText 
            text="Real-time infrastructure monitoring, automated deployment pipelines, and enterprise-grade DevOps practices in action."
            speed={20}
            className="text-gray-400 text-sm"
          />
        </TerminalSlideIn>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {/* Metrics Dashboard */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              System Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: animatedMetrics ? 1 : 0,
                    scale: animatedMetrics ? 1 : 0.9
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-xs font-medium">{metric.label}</span>
                    <TrendingUp className={`w-3 h-3 ${metric.color}`} />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className={`text-lg font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className="text-green-400 text-xs font-medium">
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex gap-2">
              {[
                { id: 'infrastructure', label: 'Infrastructure', icon: Server },
                { id: 'deployment', label: 'Deployment', icon: GitBranch },
                { id: 'monitoring', label: 'Monitoring', icon: Activity }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeView === id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {activeView === 'infrastructure' && (
                  <div className="space-y-6">
                    {/* Infrastructure Status */}
                    <div>
                      <h5 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Server className="w-4 h-4 text-blue-400" />
                        Infrastructure Status
                      </h5>
                      <div className="space-y-3">
                        {infrastructureComponents.map((component, index) => (
                          <TerminalSlideIn key={component.id} delay={index * 0.1}>
                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="flex items-center gap-3">
                                <component.icon className="w-5 h-5 text-blue-400" />
                                <div>
                                  <div className="text-white font-medium text-sm">{component.name}</div>
                                  <div className="text-gray-400 text-xs">Uptime: {component.uptime}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-gray-400 text-xs">Load</div>
                                  <div className="text-white font-medium text-sm">{component.load}%</div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(component.status)}`}>
                                  {component.status}
                                </span>
                              </div>
                            </div>
                          </TerminalSlideIn>
                        ))}
                      </div>
                    </div>

                    {/* Terraform Code */}
                    <div>
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-green-400" />
                        Infrastructure as Code
                      </h5>
                      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-sm text-gray-300 font-mono">infrastructure.tf</span>
                          <span className="text-xs text-gray-400">Terraform</span>
                        </div>
                        <div className="p-4 max-h-64 overflow-y-auto">
                          <SyntaxHighlighter 
                            code={codeSnippets.terraform}
                            language="terraform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'deployment' && (
                  <div className="space-y-6">
                    {/* Deployment Pipeline */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-white font-medium flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-purple-400" />
                          Deployment Pipeline
                        </h5>
                        <button
                          onClick={() => {
                            setIsDeploymentRunning(!isDeploymentRunning)
                            if (!isDeploymentRunning) setCurrentStep(1)
                          }}
                          className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition-colors ${
                            isDeploymentRunning 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-purple-600 hover:bg-purple-700 text-white'
                          }`}
                        >
                          {isDeploymentRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          {isDeploymentRunning ? 'Pause' : 'Start Deploy'}
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {deploymentSteps.map((step) => {
                          const status = getStepStatus(step.id)
                          return (
                            <div key={step.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="flex-shrink-0">
                                {status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                {status === 'running' && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                                {status === 'pending' && <div className="w-4 h-4 border-2 border-gray-600 rounded-full" />}
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">{step.name}</div>
                                <div className="text-gray-400 text-xs">Duration: {step.duration}</div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded ${
                                status === 'completed' ? 'text-green-400 bg-green-400/10' :
                                status === 'running' ? 'text-blue-400 bg-blue-400/10' :
                                'text-gray-400 bg-gray-400/10'
                              }`}>
                                {status}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Kubernetes Config */}
                    <div>
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Container className="w-4 h-4 text-blue-400" />
                        Kubernetes Deployment
                      </h5>
                      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-sm text-gray-300 font-mono">deployment.yaml</span>
                          <span className="text-xs text-gray-400">Kubernetes</span>
                        </div>
                        <div className="p-4 max-h-64 overflow-y-auto">
                          <SyntaxHighlighter 
                            code={codeSnippets.kubernetes}
                            language="yaml"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'monitoring' && (
                  <div className="space-y-6">
                    {/* System Metrics */}
                    <div>
                      <h5 className="text-white font-medium mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-orange-400" />
                        Real-time System Metrics
                      </h5>
                      <div className="space-y-4">
                        {[
                          { label: 'CPU Usage', value: 65, color: 'bg-blue-500', icon: Cpu },
                          { label: 'Memory Usage', value: 78, color: 'bg-green-500', icon: HardDrive },
                          { label: 'Disk I/O', value: 45, color: 'bg-purple-500', icon: HardDrive },
                          { label: 'Network', value: 32, color: 'bg-orange-500', icon: Network }
                        ].map((metric, index) => (
                          <TerminalSlideIn key={metric.label} delay={index * 0.1}>
                            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <div className="flex items-center gap-2">
                                  <metric.icon className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-400">{metric.label}</span>
                                </div>
                                <span className="text-white font-medium">{metric.value}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className={`h-2 rounded-full ${metric.color}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: animatedMetrics ? `${metric.value}%` : '0%' }}
                                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                />
                              </div>
                            </div>
                          </TerminalSlideIn>
                        ))}
                      </div>
                    </div>

                    {/* Monitoring Config */}
                    <div>
                      <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-yellow-400" />
                        Monitoring Configuration
                      </h5>
                      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <span className="text-sm text-gray-300 font-mono">prometheus.yml</span>
                          <span className="text-xs text-gray-400">Prometheus</span>
                        </div>
                        <div className="p-4 max-h-64 overflow-y-auto">
                          <SyntaxHighlighter 
                            code={codeSnippets.monitoring}
                            language="yaml"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}