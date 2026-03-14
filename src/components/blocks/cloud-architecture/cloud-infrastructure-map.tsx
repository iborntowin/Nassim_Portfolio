"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cloud, Server, Database, Shield, Globe, Zap, Monitor,
  HardDrive, Wifi, Lock, Network, Container, Cpu,
  Activity, CheckCircle, ArrowRight,
  Layers, GitBranch, Eye, Settings, TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CloudNode {
  id: string
  name: string
  type: 'compute' | 'network' | 'storage' | 'security' | 'monitoring' | 'orchestration' | 'cdn' | 'dns'
  provider: 'aws' | 'openstack' | 'k8s' | 'custom'
  icon: React.ElementType
  color: string
  status: 'running' | 'healthy' | 'scaling'
  metrics: { label: string; value: string }[]
  description: string
  x: number
  y: number
}

interface DataFlow {
  from: string
  to: string
  label: string
  throughput: string
  color: string
}

const cloudNodes: CloudNode[] = [
  {
    id: 'dns', name: 'DNS / Route 53', type: 'dns', provider: 'aws',
    icon: Globe, color: 'from-blue-400 to-blue-600', status: 'running',
    metrics: [{ label: 'Latency', value: '<1ms' }, { label: 'Zones', value: '3' }],
    description: 'Global DNS resolution with health-check routing',
    x: 50, y: 5
  },
  {
    id: 'cdn', name: 'CDN / CloudFront', type: 'cdn', provider: 'aws',
    icon: Wifi, color: 'from-cyan-400 to-cyan-600', status: 'running',
    metrics: [{ label: 'Edge Nodes', value: '42' }, { label: 'Cache Hit', value: '96%' }],
    description: 'Global content delivery with edge caching',
    x: 50, y: 18
  },
  {
    id: 'waf', name: 'WAF & Shield', type: 'security', provider: 'aws',
    icon: Shield, color: 'from-red-400 to-red-600', status: 'healthy',
    metrics: [{ label: 'Blocked', value: '12K/hr' }, { label: 'Rules', value: '150+' }],
    description: 'Web application firewall with DDoS protection',
    x: 15, y: 18
  },
  {
    id: 'lb', name: 'Load Balancer', type: 'network', provider: 'aws',
    icon: Network, color: 'from-green-400 to-green-600', status: 'running',
    metrics: [{ label: 'RPS', value: '50K' }, { label: 'Active', value: '3 AZ' }],
    description: 'Application load balancer across availability zones',
    x: 50, y: 32
  },
  {
    id: 'k8s', name: 'Kubernetes Cluster', type: 'orchestration', provider: 'k8s',
    icon: Container, color: 'from-indigo-400 to-indigo-600', status: 'scaling',
    metrics: [{ label: 'Pods', value: '24' }, { label: 'Nodes', value: '6' }],
    description: 'EKS cluster with auto-scaling & self-healing',
    x: 50, y: 48
  },
  {
    id: 'api', name: 'API Gateway', type: 'compute', provider: 'aws',
    icon: Server, color: 'from-purple-400 to-purple-600', status: 'running',
    metrics: [{ label: 'Endpoints', value: '85' }, { label: 'P99', value: '120ms' }],
    description: 'RESTful API gateway with rate limiting & auth',
    x: 25, y: 48
  },
  {
    id: 'nova', name: 'Nova Compute', type: 'compute', provider: 'openstack',
    icon: Cpu, color: 'from-orange-400 to-orange-600', status: 'running',
    metrics: [{ label: 'VMs', value: '12' }, { label: 'vCPUs', value: '48' }],
    description: 'OpenStack compute orchestration for VM lifecycle',
    x: 75, y: 48
  },
  {
    id: 'db', name: 'PostgreSQL (RDS)', type: 'storage', provider: 'aws',
    icon: Database, color: 'from-blue-500 to-blue-700', status: 'healthy',
    metrics: [{ label: 'IOPS', value: '10K' }, { label: 'Replicas', value: '3' }],
    description: 'Multi-AZ RDS with read replicas & point-in-time recovery',
    x: 25, y: 68
  },
  {
    id: 'cache', name: 'Redis Cluster', type: 'storage', provider: 'aws',
    icon: Zap, color: 'from-red-500 to-red-600', status: 'running',
    metrics: [{ label: 'Hit Rate', value: '97%' }, { label: 'Memory', value: '16GB' }],
    description: 'ElastiCache Redis cluster for session & query caching',
    x: 50, y: 68
  },
  {
    id: 'storage', name: 'S3 / Swift Storage', type: 'storage', provider: 'aws',
    icon: HardDrive, color: 'from-yellow-400 to-yellow-600', status: 'healthy',
    metrics: [{ label: 'Objects', value: '2.4M' }, { label: 'Size', value: '1.2TB' }],
    description: 'Object storage with lifecycle policies & versioning',
    x: 75, y: 68
  },
  {
    id: 'monitoring', name: 'Prometheus + Grafana', type: 'monitoring', provider: 'custom',
    icon: Monitor, color: 'from-emerald-400 to-emerald-600', status: 'healthy',
    metrics: [{ label: 'Metrics', value: '2M/min' }, { label: 'Alerts', value: '56' }],
    description: 'Full observability stack with custom dashboards',
    x: 85, y: 32
  },
  {
    id: 'secrets', name: 'Vault / KMS', type: 'security', provider: 'custom',
    icon: Lock, color: 'from-pink-400 to-pink-600', status: 'healthy',
    metrics: [{ label: 'Secrets', value: '230' }, { label: 'Rotations', value: 'Auto' }],
    description: 'Secrets management with automatic rotation',
    x: 15, y: 50
  }
]

const dataFlows: DataFlow[] = [
  { from: 'dns', to: 'cdn', label: 'DNS Resolution', throughput: '100K req/s', color: '#60a5fa' },
  { from: 'cdn', to: 'lb', label: 'Cache Miss', throughput: '10K req/s', color: '#22d3ee' },
  { from: 'waf', to: 'lb', label: 'Filtered Traffic', throughput: '45K req/s', color: '#f87171' },
  { from: 'lb', to: 'k8s', label: 'Load Distribution', throughput: '15K req/s', color: '#4ade80' },
  { from: 'lb', to: 'api', label: 'API Requests', throughput: '20K req/s', color: '#a78bfa' },
  { from: 'lb', to: 'nova', label: 'VM Routing', throughput: '5K req/s', color: '#fb923c' },
  { from: 'k8s', to: 'db', label: 'Queries', throughput: '8K q/s', color: '#3b82f6' },
  { from: 'k8s', to: 'cache', label: 'Cache R/W', throughput: '25K ops/s', color: '#ef4444' },
  { from: 'api', to: 'db', label: 'Data Access', throughput: '5K q/s', color: '#8b5cf6' },
  { from: 'nova', to: 'storage', label: 'Object I/O', throughput: '2K ops/s', color: '#eab308' },
  { from: 'monitoring', to: 'k8s', label: 'Scrape Metrics', throughput: '500/s', color: '#10b981' },
  { from: 'secrets', to: 'api', label: 'Secret Fetch', throughput: 'On-demand', color: '#ec4899' },
]

const providerColors = {
  aws: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  openstack: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  k8s: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  custom: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' }
}

export default function CloudInfrastructureMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeProvider, setActiveProvider] = useState<string>('all')
  const [animatedFlows] = useState(true)
  const [totalRequests, setTotalRequests] = useState(1247832)

  // Simulate live request counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRequests(prev => prev + Math.floor(Math.random() * 50) + 10)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const filteredNodes = activeProvider === 'all' 
    ? cloudNodes 
    : cloudNodes.filter(n => n.provider === activeProvider)

  const filteredFlows = dataFlows.filter(flow => {
    if (activeProvider === 'all') return true
    const fromNode = cloudNodes.find(n => n.id === flow.from)
    const toNode = cloudNodes.find(n => n.id === flow.to)
    return fromNode?.provider === activeProvider || toNode?.provider === activeProvider
  })

  const selectedNodeData = selectedNode ? cloudNodes.find(n => n.id === selectedNode) : null

  const connectedFlows = hoveredNode || selectedNode
    ? dataFlows.filter(f => f.from === (hoveredNode || selectedNode) || f.to === (hoveredNode || selectedNode))
    : []

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-sm font-medium">Live Infrastructure Map</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Cloud </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Architecture
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Multi-cloud infrastructure spanning AWS, OpenStack, and Kubernetes — 
            designed for 99.99% availability, auto-scaling, and zero-downtime deployments.
          </p>
        </motion.div>

        {/* Live Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Requests Processed', value: totalRequests.toLocaleString(), icon: Activity, color: 'text-blue-400' },
            { label: 'Active Services', value: '12/12', icon: CheckCircle, color: 'text-green-400' },
            { label: 'Global Latency', value: '23ms', icon: Zap, color: 'text-yellow-400' },
            { label: 'Uptime', value: '99.99%', icon: TrendingUp, color: 'text-purple-400' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-gray-400 text-xs">{metric.label}</span>
              </div>
              <div className={`text-xl font-bold ${metric.color} font-mono`}>
                {metric.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Provider Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { id: 'all', label: 'All Services', icon: Layers },
            { id: 'aws', label: 'AWS', icon: Cloud },
            { id: 'openstack', label: 'OpenStack', icon: Server },
            { id: 'k8s', label: 'Kubernetes', icon: Container },
            { id: 'custom', label: 'Custom Stack', icon: Settings },
          ].map(provider => (
            <button
              key={provider.id}
              onClick={() => setActiveProvider(provider.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                activeProvider === provider.id
                  ? 'bg-blue-500/20 border-blue-400/50 text-blue-400 shadow-lg shadow-blue-500/10'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
              }`}
            >
              <provider.icon className="w-4 h-4" />
              {provider.label}
            </button>
          ))}
        </motion.div>

        {/* Main Architecture Map */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Infrastructure Grid */}
          <div className="lg:col-span-3">
            <div className="relative bg-[#0d1117]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-h-[600px] overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Animated data flow lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 85">
                {filteredFlows.map((flow, i) => {
                  const fromNode = cloudNodes.find(n => n.id === flow.from)
                  const toNode = cloudNodes.find(n => n.id === flow.to)
                  if (!fromNode || !toNode) return null
                  
                  const isActive = connectedFlows.some(f => f.from === flow.from && f.to === flow.to)

                  return (
                    <g key={i}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y + 4}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isActive ? flow.color : 'rgba(255,255,255,0.06)'}
                        strokeWidth={isActive ? 0.4 : 0.15}
                        strokeDasharray={animatedFlows ? "2 2" : "0"}
                      >
                        {animatedFlows && (
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;-4"
                            dur={`${1 + (i % 3) * 0.5}s`}
                            repeatCount="indefinite"
                          />
                        )}
                      </line>
                    </g>
                  )
                })}
              </svg>

              {/* Cloud Nodes */}
              <div className="relative z-10 grid grid-cols-4 gap-4" style={{ minHeight: '560px' }}>
                {filteredNodes.map((node, index) => {
                  const pColors = providerColors[node.provider]
                  const isSelected = selectedNode === node.id
                  const isHovered = hoveredNode === node.id

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex justify-center"
                      style={{ gridColumn: 'auto', gridRow: 'auto' }}
                    >
                      <button
                        onClick={() => setSelectedNode(isSelected ? null : node.id)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`relative group w-full max-w-[180px] p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                          isSelected
                            ? `${pColors.bg} ${pColors.border} shadow-lg ring-1 ring-blue-400/30`
                            : isHovered
                              ? `bg-white/[0.06] border-white/20 shadow-md`
                              : `bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]`
                        }`}
                      >
                        {/* Status indicator */}
                        <div className="absolute -top-1 -right-1">
                          <div className={`w-3 h-3 rounded-full ${
                            node.status === 'running' ? 'bg-green-400' :
                            node.status === 'healthy' ? 'bg-blue-400' :
                            'bg-yellow-400'
                          } shadow-lg`}>
                            <div className={`w-3 h-3 rounded-full ${
                              node.status === 'running' ? 'bg-green-400' :
                              node.status === 'healthy' ? 'bg-blue-400' :
                              'bg-yellow-400'
                            } animate-ping opacity-75`} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${node.color}`}>
                            <node.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-semibold truncate">
                              {node.name}
                            </div>
                            <div className={`text-[10px] ${pColors.text} uppercase tracking-wider`}>
                              {node.provider}
                            </div>
                          </div>
                        </div>
                        
                        {/* Mini metrics */}
                        <div className="space-y-1">
                          {node.metrics.map((m, mi) => (
                            <div key={mi} className="flex justify-between items-center">
                              <span className="text-gray-500 text-[10px]">{m.label}</span>
                              <span className="text-gray-300 text-[10px] font-mono">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatePresence mode="wait">
              {selectedNodeData ? (
                <motion.div
                  key={selectedNodeData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedNodeData.color}`}>
                          <selectedNodeData.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">
                            {selectedNodeData.name}
                          </CardTitle>
                          <Badge className={`mt-1 ${providerColors[selectedNodeData.provider].text} ${providerColors[selectedNodeData.provider].bg} border-none text-[10px]`}>
                            {selectedNodeData.provider.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedNodeData.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-white text-sm font-semibold">Metrics</h4>
                        {selectedNodeData.metrics.map((m, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2">
                            <span className="text-gray-400 text-sm">{m.label}</span>
                            <span className="text-white font-mono text-sm font-semibold">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-white text-sm font-semibold">Connected Services</h4>
                        {dataFlows
                          .filter(f => f.from === selectedNodeData.id || f.to === selectedNodeData.id)
                          .map((flow, i) => {
                            const connectedId = flow.from === selectedNodeData.id ? flow.to : flow.from
                            const connectedNode = cloudNodes.find(n => n.id === connectedId)
                            return connectedNode ? (
                              <button
                                key={i}
                                onClick={() => setSelectedNode(connectedId)}
                                className="w-full flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors"
                              >
                                <ArrowRight className="w-3 h-3 text-gray-500" />
                                <span className="text-gray-300 text-sm flex-1">{connectedNode.name}</span>
                                <span className="text-gray-500 text-xs">{flow.throughput}</span>
                              </button>
                            ) : null
                          })}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedNodeData.status === 'running' ? 'bg-green-400' :
                          selectedNodeData.status === 'healthy' ? 'bg-blue-400' : 'bg-yellow-400'
                        }`} />
                        <span className="text-gray-400 text-xs capitalize">{selectedNodeData.status}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Cloud className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Click a service node to view details, connections, and live metrics.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Architecture Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="p-5 space-y-4">
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Infrastructure Summary
                </h4>
                {[
                  { label: 'Total Services', value: '12', color: 'text-blue-400' },
                  { label: 'Availability Zones', value: '3', color: 'text-green-400' },
                  { label: 'Auto-Scaling Groups', value: '4', color: 'text-purple-400' },
                  { label: 'Security Rules', value: '150+', color: 'text-red-400' },
                  { label: 'Monitored Metrics', value: '2M/min', color: 'text-yellow-400' },
                  { label: 'Infra as Code', value: '100%', color: 'text-cyan-400' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className={`${stat.color} font-mono text-sm font-semibold`}>{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cloud Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Shield, label: 'Zero Trust Security', desc: 'Defense in depth across all layers', color: 'text-red-400' },
            { icon: TrendingUp, label: 'Auto-Scaling', desc: 'Horizontal pod & VM auto-scaling', color: 'text-green-400' },
            { icon: GitBranch, label: 'GitOps Driven', desc: 'Infrastructure changes via PRs', color: 'text-purple-400' },
            { icon: Eye, label: 'Full Observability', desc: 'Metrics, logs, traces — unified', color: 'text-blue-400' },
          ].map((principle, i) => (
            <motion.div
              key={principle.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 hover:border-white/15 transition-all duration-300 group"
            >
              <principle.icon className={`w-8 h-8 ${principle.color} mb-3 group-hover:scale-110 transition-transform`} />
              <h4 className="text-white font-semibold text-sm mb-1">{principle.label}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{principle.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
