'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LogStreamProps {
  logTypes?: ('deployment' | 'monitoring' | 'security' | 'system')[]
  scrollSpeed?: number
  opacity?: number
  maxLogs?: number
  className?: string
}

interface LogEntry {
  id: string
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
  type: 'deployment' | 'monitoring' | 'security' | 'system'
}

const LogStream: React.FC<LogStreamProps> = ({
  logTypes = ['deployment', 'monitoring', 'security', 'system'],
  scrollSpeed = 3000,
  opacity = 0.6,
  maxLogs = 50,
  className = ''
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Realistic log message templates
  const logTemplates = {
    deployment: [
      { level: 'INFO' as const, service: 'k8s-deploy', message: 'Pod web-app-{id} started successfully' },
      { level: 'INFO' as const, service: 'docker', message: 'Image pulled: nginx:1.21-alpine' },
      { level: 'INFO' as const, service: 'helm', message: 'Release "portfolio-app" upgraded successfully' },
      { level: 'INFO' as const, service: 'argocd', message: 'Application sync completed: portfolio-frontend' },
      { level: 'WARN' as const, service: 'k8s-deploy', message: 'Pod restart detected: api-gateway-{id}' },
      { level: 'INFO' as const, service: 'terraform', message: 'Apply complete! Resources: 3 added, 1 changed' },
      { level: 'INFO' as const, service: 'jenkins', message: 'Build #127 completed successfully' },
      { level: 'ERROR' as const, service: 'docker', message: 'Failed to pull image: connection timeout' }
    ],
    monitoring: [
      { level: 'INFO' as const, service: 'prometheus', message: 'Health check passed for service api-gateway' },
      { level: 'WARN' as const, service: 'grafana', message: 'High memory usage detected on node worker-{id}' },
      { level: 'INFO' as const, service: 'prometheus', message: 'Metric collection successful: 1247 data points' },
      { level: 'INFO' as const, service: 'alertmanager', message: 'Alert resolved: HighCPUUsage' },
      { level: 'WARN' as const, service: 'jaeger', message: 'Trace collection latency increased: 250ms' },
      { level: 'INFO' as const, service: 'datadog', message: 'Dashboard updated: Infrastructure Overview' },
      { level: 'DEBUG' as const, service: 'fluentd', message: 'Log forwarding rate: 1.2k/sec' }
    ],
    security: [
      { level: 'INFO' as const, service: 'vault', message: 'Secret rotation completed: database-credentials' },
      { level: 'WARN' as const, service: 'falco', message: 'Suspicious network activity detected' },
      { level: 'INFO' as const, service: 'cert-manager', message: 'TLS certificate renewed: *.nassimmaaouia.com' },
      { level: 'INFO' as const, service: 'oauth2-proxy', message: 'User authentication successful' },
      { level: 'ERROR' as const, service: 'fail2ban', message: 'IP blocked due to repeated failed attempts' },
      { level: 'INFO' as const, service: 'kube-bench', message: 'Security scan completed: 98% compliance' }
    ],
    system: [
      { level: 'INFO' as const, service: 'systemd', message: 'Service nginx reloaded successfully' },
      { level: 'INFO' as const, service: 'kubelet', message: 'Node ready: worker-node-{id}' },
      { level: 'WARN' as const, service: 'etcd', message: 'Slow request detected: 2.1s duration' },
      { level: 'INFO' as const, service: 'containerd', message: 'Container runtime healthy' },
      { level: 'INFO' as const, service: 'kube-proxy', message: 'Network rules updated successfully' },
      { level: 'DEBUG' as const, service: 'systemd', message: 'Garbage collection completed: 127MB freed' },
      { level: 'INFO' as const, service: 'cron', message: 'Backup job completed: database-backup-{timestamp}' }
    ]
  }

  const generateLogEntry = (): LogEntry => {
    const availableTypes = logTypes.filter(type => type in logTemplates)
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)]
    const templates = logTemplates[randomType]
    const template = templates[Math.floor(Math.random() * templates.length)]
    
    const now = new Date()
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19)
    
    // Replace placeholders in message
    let message = template.message
    message = message.replace('{id}', Math.random().toString(36).substring(2, 8))
    message = message.replace('{timestamp}', now.getTime().toString())
    
    return {
      id: `${now.getTime()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp,
      level: template.level,
      service: template.service,
      message,
      type: randomType
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = generateLogEntry()
      setLogs(prevLogs => {
        const updatedLogs = [newLog, ...prevLogs]
        return updatedLogs.slice(0, maxLogs)
      })
    }, scrollSpeed)

    return () => clearInterval(interval)
  }, [scrollSpeed, maxLogs, logTypes])

  // Auto-scroll to show new logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [logs])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-400'
      case 'WARN':
        return 'text-yellow-400'
      case 'INFO':
        return 'text-green-400'
      case 'DEBUG':
        return 'text-gray-400'
      default:
        return 'text-gray-300'
    }
  }

  const getServiceColor = (service: string) => {
    const colors = [
      'text-cyan-400',
      'text-blue-400',
      'text-purple-400',
      'text-pink-400',
      'text-indigo-400'
    ]
    const hash = service.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div 
      className={`${className}`}
      style={{ opacity }}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-hidden font-mono text-xs leading-relaxed"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              className="flex items-start space-x-2 py-0.5 hover:bg-gray-900/20 transition-colors"
            >
              {/* Timestamp */}
              <span className="text-gray-500 text-xs shrink-0 w-20">
                {log.timestamp.substring(11, 19)}
              </span>
              
              {/* Level */}
              <span className={`${getLevelColor(log.level)} font-semibold w-12 shrink-0`}>
                {log.level}
              </span>
              
              {/* Service */}
              <span className={`${getServiceColor(log.service)} w-20 shrink-0 truncate`}>
                [{log.service}]
              </span>
              
              {/* Message */}
              <span className="text-gray-300 flex-1">
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LogStream