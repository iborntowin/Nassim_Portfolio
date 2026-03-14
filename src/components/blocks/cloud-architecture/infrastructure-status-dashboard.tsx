"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, Server, Database, Cloud, Shield, Zap,
  HardDrive, Wifi, Clock,
  ArrowUpRight, Minus,
  Terminal, Cpu, MemoryStick, Network
} from 'lucide-react'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage'
  latency: number
  uptime: string
  region: string
  icon: React.ElementType
}

interface MetricPoint {
  time: string
  value: number
}

const services: ServiceStatus[] = [
  { name: 'Kubernetes Cluster', status: 'operational', latency: 12, uptime: '99.99%', region: 'eu-west-1', icon: Cloud },
  { name: 'PostgreSQL Primary', status: 'operational', latency: 3, uptime: '99.98%', region: 'eu-west-1', icon: Database },
  { name: 'Redis Cache', status: 'operational', latency: 0.5, uptime: '99.99%', region: 'eu-west-1', icon: Zap },
  { name: 'API Gateway', status: 'operational', latency: 23, uptime: '99.99%', region: 'eu-west-1', icon: Server },
  { name: 'CDN Edge Nodes', status: 'operational', latency: 8, uptime: '100%', region: 'Global', icon: Wifi },
  { name: 'Object Storage', status: 'operational', latency: 15, uptime: '99.999%', region: 'eu-west-1', icon: HardDrive },
  { name: 'WAF / DDoS Shield', status: 'operational', latency: 1, uptime: '100%', region: 'Global', icon: Shield },
  { name: 'Monitoring Stack', status: 'operational', latency: 5, uptime: '99.99%', region: 'eu-west-1', icon: Activity },
]

function generateMetrics(baseValue: number, jitter: number, count: number): MetricPoint[] {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => ({
    time: new Date(now.getTime() - (count - i) * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    value: Math.max(0, baseValue + (Math.random() * jitter * 2 - jitter))
  }))
}

function MiniSparkline({ data, color, height = 40 }: { data: MetricPoint[], color: string, height?: number }) {
  const max = Math.max(...data.map(d => d.value)) * 1.1
  const min = Math.min(...data.map(d => d.value)) * 0.9
  const range = max - min || 1
  const width = 200

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d.value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function InfrastructureStatusDashboard() {
  const [currentTime, setCurrentTime] = useState('')
  const [cpuData, setCpuData] = useState<MetricPoint[]>([])
  const [memData, setMemData] = useState<MetricPoint[]>([])
  const [networkData, setNetworkData] = useState<MetricPoint[]>([])
  const [requestData, setRequestData] = useState<MetricPoint[]>([])
  const [incidentDays] = useState(127)

  useEffect(() => {
    setCpuData(generateMetrics(42, 15, 30))
    setMemData(generateMetrics(67, 8, 30))
    setNetworkData(generateMetrics(350, 100, 30))
    setRequestData(generateMetrics(12500, 3000, 30))

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        month: 'short', day: 'numeric', year: 'numeric'
      }))

      setCpuData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(5, Math.min(85, prev[prev.length - 1].value + (Math.random() * 10 - 5)))
        }
        return [...prev.slice(1), newPoint]
      })
      setMemData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(40, Math.min(90, prev[prev.length - 1].value + (Math.random() * 4 - 2)))
        }
        return [...prev.slice(1), newPoint]
      })
      setNetworkData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(50, Math.min(800, prev[prev.length - 1].value + (Math.random() * 100 - 50)))
        }
        return [...prev.slice(1), newPoint]
      })
      setRequestData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(5000, Math.min(25000, prev[prev.length - 1].value + (Math.random() * 2000 - 1000)))
        }
        return [...prev.slice(1), newPoint]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const allOperational = services.every(s => s.status === 'operational')

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a0e1a] via-[#0d1117] to-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Infrastructure </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Status
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Real-time monitoring of all cloud services. SRE-grade observability 
            ensuring reliability across every layer of the stack.
          </p>
          
          {/* Overall Status Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${
              allOperational
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-yellow-500/10 border-yellow-500/30'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${allOperational ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
            <span className={`font-semibold ${allOperational ? 'text-green-400' : 'text-yellow-400'}`}>
              {allOperational ? 'All Systems Operational' : 'Partial Degradation'}
            </span>
            <span className="text-gray-500 text-sm">|</span>
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-400 text-sm font-mono">{currentTime}</span>
          </motion.div>
        </motion.div>

        {/* Key Metrics with Sparklines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              label: 'CPU Utilization', icon: Cpu, color: '#3b82f6',
              value: cpuData.length ? `${Math.round(cpuData[cpuData.length - 1].value)}%` : '—',
              data: cpuData, trend: 'stable' as const
            },
            { 
              label: 'Memory Usage', icon: MemoryStick, color: '#a855f7',
              value: memData.length ? `${Math.round(memData[memData.length - 1].value)}%` : '—',
              data: memData, trend: 'up' as const
            },
            { 
              label: 'Network I/O', icon: Network, color: '#06b6d4',
              value: networkData.length ? `${Math.round(networkData[networkData.length - 1].value)} MB/s` : '—',
              data: networkData, trend: 'stable' as const
            },
            { 
              label: 'Requests/min', icon: Activity, color: '#22c55e',
              value: requestData.length ? `${Math.round(requestData[requestData.length - 1].value).toLocaleString()}` : '—',
              data: requestData, trend: 'up' as const
            },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                  <span className="text-gray-400 text-sm">{metric.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-green-400" />}
                  {metric.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
                </div>
              </div>
              <div className="text-2xl font-bold text-white font-mono mb-3">{metric.value}</div>
              {metric.data.length > 0 && (
                <MiniSparkline data={metric.data} color={metric.color} height={35} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Service Status Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden mb-8"
        >
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <h3 className="text-white font-semibold">Service Health</h3>
            </div>
            <span className="text-gray-500 text-xs font-mono">
              Last check: {currentTime || 'Loading...'}
            </span>
          </div>
          
          <div className="divide-y divide-white/[0.04]">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.03 }}
                className="px-6 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'operational' ? 'bg-green-400' :
                    service.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <service.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-white text-sm font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-gray-500 text-xs">{service.region}</span>
                  <span className="text-gray-400 text-xs font-mono w-16 text-right">{service.latency}ms</span>
                  <span className="text-green-400 text-xs font-mono w-16 text-right">{service.uptime}</span>
                  <span className={`text-xs capitalize px-2 py-0.5 rounded-full ${
                    service.status === 'operational' 
                      ? 'text-green-400 bg-green-400/10' 
                      : service.status === 'degraded'
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-red-400 bg-red-400/10'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Incident-free counter + SLA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-green-400 font-mono mb-2">
              {incidentDays}
            </div>
            <div className="text-gray-400 text-sm">Days Without Incidents</div>
            <div className="text-green-400/60 text-xs mt-1">Since initial deployment</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-blue-400 font-mono mb-2">
              99.99%
            </div>
            <div className="text-gray-400 text-sm">SLA Achievement</div>
            <div className="text-blue-400/60 text-xs mt-1">Rolling 365-day window</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-purple-400 font-mono mb-2">
              &lt;50ms
            </div>
            <div className="text-gray-400 text-sm">Mean Time to Detect</div>
            <div className="text-purple-400/60 text-xs mt-1">Automated alert pipeline</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
