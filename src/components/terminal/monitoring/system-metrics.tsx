'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SystemMetricsProps {
  position?: 'overlay' | 'sidebar' | 'footer'
  updateInterval?: number
  showGraphs?: boolean
  className?: string
}

interface MetricData {
  cpu: number
  memory: number
  network: number
  podsRunning: number
  deploymentsSucceeded: number
  uptime: string
  connectionStatus: 'connected' | 'connecting' | 'disconnected'
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({
  position = 'overlay',
  updateInterval = 2000,
  showGraphs = false,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<MetricData>({
    cpu: 25,
    memory: 68,
    network: 0,
    podsRunning: 14,
    deploymentsSucceeded: 127,
    uptime: '0d 0h 0m',
    connectionStatus: 'connected'
  })

  const [startTime] = useState(Date.now())

  // Simulate realistic metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        // CPU: fluctuate between 15-45%
        const cpuChange = (Math.random() - 0.5) * 8
        const newCpu = Math.max(15, Math.min(45, prev.cpu + cpuChange))

        // Memory: slowly fluctuate between 60-80%
        const memoryChange = (Math.random() - 0.5) * 3
        const newMemory = Math.max(60, Math.min(80, prev.memory + memoryChange))

        // Network: occasional spikes
        const networkSpike = Math.random() < 0.3 ? Math.random() * 100 : Math.random() * 20
        
        // Pods: occasionally change between 12-18
        const podsChange = Math.random() < 0.1 ? (Math.random() > 0.5 ? 1 : -1) : 0
        const newPods = Math.max(12, Math.min(18, prev.podsRunning + podsChange))

        // Deployments: occasionally increment
        const deploymentIncrement = Math.random() < 0.05 ? 1 : 0

        // Calculate uptime
        const uptimeMs = Date.now() - startTime
        const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24))
        const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60))
        const uptime = `${days}d ${hours}h ${minutes}m`

        return {
          cpu: Math.round(newCpu * 10) / 10,
          memory: Math.round(newMemory * 10) / 10,
          network: Math.round(networkSpike * 10) / 10,
          podsRunning: newPods,
          deploymentsSucceeded: prev.deploymentsSucceeded + deploymentIncrement,
          uptime,
          connectionStatus: 'connected' as const
        }
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval, startTime])

  const getPositionClasses = () => {
    switch (position) {
      case 'overlay':
        return 'fixed top-4 right-4 z-50'
      case 'sidebar':
        return 'w-full'
      case 'footer':
        return 'w-full'
      default:
        return 'fixed top-4 right-4 z-50'
    }
  }

  const MetricBar: React.FC<{ label: string; value: number; max: number; color: string; unit?: string }> = ({
    label,
    value,
    max,
    color,
    unit = '%'
  }) => (
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="text-gray-400 min-w-[3rem]">{label}:</span>
      <div className="flex items-center flex-1 ml-2">
        <div className="flex-1 bg-gray-800 rounded-full h-1.5 mr-2">
          <motion.div
            className={`h-full rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${(value / max) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <motion.span
          className="text-green-400 font-mono text-xs min-w-[3rem] text-right"
          key={value}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{unit}
        </motion.span>
      </div>
    </div>
  )

  const StatusIndicator: React.FC<{ status: string; color: string }> = ({ status, color }) => (
    <div className="flex items-center">
      <motion.div
        className={`w-2 h-2 rounded-full mr-2 ${color}`}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs text-gray-300">{status}</span>
    </div>
  )

  return (
    <motion.div
      className={`${getPositionClasses()} ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-black/90 border border-green-500/30 rounded-lg p-3 backdrop-blur-sm min-w-[280px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
          <div className="flex items-center">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full mr-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-green-400 text-sm font-mono">SYSTEM STATUS</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">{metrics.uptime}</span>
        </div>

        {/* Metrics */}
        <div className="space-y-2 mb-3">
          <MetricBar
            label="CPU"
            value={metrics.cpu}
            max={100}
            color="bg-gradient-to-r from-green-500 to-cyan-500"
          />
          <MetricBar
            label="MEM"
            value={metrics.memory}
            max={100}
            color="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <MetricBar
            label="NET"
            value={metrics.network}
            max={100}
            color="bg-gradient-to-r from-yellow-500 to-orange-500"
          />
        </div>

        {/* Pod and Deployment Stats */}
        <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
          <div className="bg-gray-900/50 rounded p-2">
            <div className="text-gray-400 mb-1">Pods Running</div>
            <motion.div
              className="text-green-400 font-mono text-lg"
              key={metrics.podsRunning}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {metrics.podsRunning}
            </motion.div>
          </div>
          <div className="bg-gray-900/50 rounded p-2">
            <div className="text-gray-400 mb-1">Deployments</div>
            <motion.div
              className="text-cyan-400 font-mono text-lg"
              key={metrics.deploymentsSucceeded}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {metrics.deploymentsSucceeded}
            </motion.div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <StatusIndicator status="Cloud Connected" color="bg-green-400" />
          <StatusIndicator status="K8s Ready" color="bg-cyan-400" />
        </div>
      </div>
    </motion.div>
  )
}

export default SystemMetrics