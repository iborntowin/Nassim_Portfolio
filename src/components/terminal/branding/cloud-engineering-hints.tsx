'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CloudEngineeringHintsProps {
  position?: 'top' | 'bottom' | 'sidebar' | 'inline'
  showLogs?: boolean
  showMetrics?: boolean
  showStatus?: boolean
  compact?: boolean
}

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
  icon: string
}

interface SystemMetric {
  name: string
  value: string
  status: 'healthy' | 'warning' | 'critical'
  icon: string
  trend?: 'up' | 'down' | 'stable'
}

const CloudEngineeringHints: React.FC<CloudEngineeringHintsProps> = ({
  position = 'bottom',
  showLogs = true,
  showMetrics = true,
  showStatus = true,
  compact = false
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [metrics, setMetrics] = useState<SystemMetric[]>([])
  const [currentLogIndex, setCurrentLogIndex] = useState(0)

  // Sample cloud engineering logs
  const sampleLogs: LogEntry[] = [
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'k8s-controller',
      message: 'Pod portfolio-web-7d4b8f9c6-xyz12 started successfully',
      icon: '⎈'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'aws-alb',
      message: 'Health check passed for target group portfolio-tg',
      icon: '☁️'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'prometheus',
      message: 'Metrics collection completed for 15 targets',
      icon: '📊'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'gitlab-ci',
      message: 'Pipeline #1247 completed successfully in 3m 42s',
      icon: '🚀'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'terraform',
      message: 'Infrastructure state synchronized with AWS',
      icon: '🏗️'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      service: 'docker-registry',
      message: 'Image pull rate limit approaching threshold',
      icon: '🐳'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'ansible',
      message: 'Configuration playbook executed on 12 hosts',
      icon: '⚙️'
    },
    {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      service: 'grafana',
      message: 'Dashboard "Portfolio Metrics" updated',
      icon: '📈'
    }
  ]

  // Sample system metrics
  const sampleMetrics: SystemMetric[] = [
    { name: 'CPU', value: '23%', status: 'healthy', icon: '🔥', trend: 'stable' },
    { name: 'Memory', value: '67%', status: 'healthy', icon: '💾', trend: 'up' },
    { name: 'Network', value: '1.2MB/s', status: 'healthy', icon: '🌐', trend: 'down' },
    { name: 'Pods', value: '15/20', status: 'healthy', icon: '⎈', trend: 'stable' },
    { name: 'Deployments', value: '12 ✓', status: 'healthy', icon: '🚀', trend: 'stable' },
    { name: 'Services', value: '8 active', status: 'healthy', icon: '🔧', trend: 'stable' }
  ]

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Rotate logs every 3 seconds
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % sampleLogs.length)
    }, 3000)

    // Initialize logs and metrics
    setLogs(sampleLogs.slice(0, 5))
    setMetrics(sampleMetrics)

    return () => {
      clearInterval(timeInterval)
      clearInterval(logInterval)
    }
  }, [])

  const getLogColor = (level: LogEntry['level']): string => {
    switch (level) {
      case 'INFO': return 'text-green-400'
      case 'WARN': return 'text-yellow-400'
      case 'ERROR': return 'text-red-400'
      case 'DEBUG': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getMetricColor = (status: SystemMetric['status']): string => {
    switch (status) {
      case 'healthy': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getTrendIcon = (trend?: SystemMetric['trend']): string => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return ''
    }
  }

  const renderCompactView = () => (
    <div className="flex items-center space-x-4 text-xs font-mono">
      {showStatus && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400">ONLINE</span>
        </div>
      )}
      
      {showMetrics && (
        <div className="flex items-center space-x-3">
          <span className="text-cyan-400">CPU: 23%</span>
          <span className="text-cyan-400">MEM: 67%</span>
          <span className="text-cyan-400">PODS: 15/20</span>
        </div>
      )}
      
      <div className="text-gray-400">
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  )

  const renderFullView = () => (
    <div className="space-y-4">
      {/* System Status Header */}
      {showStatus && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">CLOUD INFRASTRUCTURE ONLINE</span>
            <span className="text-gray-400 text-sm">
              Uptime: 99.9% • Last Deploy: 2h ago
            </span>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            {currentTime.toLocaleString()}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* System Metrics */}
        {showMetrics && (
          <div className="bg-gray-900/50 border border-cyan-400/30 rounded p-3">
            <div className="text-cyan-400 text-sm font-semibold mb-2 flex items-center">
              📊 SYSTEM METRICS
            </div>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-1">
                    <span>{metric.icon}</span>
                    <span className="text-gray-300">{metric.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={getMetricColor(metric.status)}>
                      {metric.value}
                    </span>
                    <span className="text-gray-500">
                      {getTrendIcon(metric.trend)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Live Logs */}
        {showLogs && (
          <div className="bg-gray-900/50 border border-green-400/30 rounded p-3">
            <div className="text-green-400 text-sm font-semibold mb-2 flex items-center">
              📝 LIVE SYSTEM LOGS
            </div>
            <div className="space-y-1 max-h-32 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLogIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-mono"
                >
                  {sampleLogs.slice(currentLogIndex, currentLogIndex + 4).map((log, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-1">
                      <span className="text-gray-500 w-16">
                        {new Date(log.timestamp).toLocaleTimeString().slice(0, 5)}
                      </span>
                      <span className={`w-12 ${getLogColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className="text-blue-400 w-20 truncate">
                        {log.service}
                      </span>
                      <span className="text-gray-300 flex-1 truncate">
                        {log.icon} {log.message}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Cloud Engineering Branding Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-700 pt-2">
        <div className="flex items-center space-x-4">
          <span>☁️ AWS Multi-AZ</span>
          <span>⎈ Kubernetes v1.29</span>
          <span>🐳 Docker 24.0</span>
          <span>🚀 CI/CD Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Powered by</span>
          <span className="text-cyan-400 font-semibold">Cloud-Native Architecture</span>
        </div>
      </div>
    </div>
  )

  const getPositionClasses = (): string => {
    switch (position) {
      case 'top':
        return 'fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-700'
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-gray-700'
      case 'sidebar':
        return 'fixed right-0 top-1/2 transform -translate-y-1/2 z-40 bg-black/90 backdrop-blur-sm border-l border-gray-700 w-80'
      case 'inline':
      default:
        return 'bg-black/50 border border-gray-700 rounded'
    }
  }

  return (
    <div className={`${getPositionClasses()} p-4 font-mono`}>
      {compact ? renderCompactView() : renderFullView()}
    </div>
  )
}

export default CloudEngineeringHints