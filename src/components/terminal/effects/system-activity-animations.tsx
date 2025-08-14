"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Wifi, Database, Server, Zap, CheckCircle, AlertTriangle } from 'lucide-react'

interface ActivityIndicator {
  id: string
  type: 'network' | 'database' | 'server' | 'deployment' | 'monitoring'
  position: { x: number; y: number }
  timestamp: number
  status: 'active' | 'success' | 'warning' | 'error'
}

interface SystemActivityAnimationsProps {
  enabled?: boolean
  intensity?: 'low' | 'medium' | 'high'
  showIndicators?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

export function SystemActivityAnimations({
  enabled = true,
  intensity = 'medium',
  showIndicators = true,
  containerRef
}: SystemActivityAnimationsProps) {
  const [activityIndicators, setActivityIndicators] = useState<ActivityIndicator[]>([])
  const [blinkingElements, setBlinkingElements] = useState<string[]>([])
  const [systemPulse, setSystemPulse] = useState(false)

  // Intensity settings
  const intensitySettings = {
    low: {
      indicatorFrequency: 5000, // Every 5 seconds
      blinkFrequency: 3000,     // Every 3 seconds
      pulseFrequency: 8000,     // Every 8 seconds
      maxIndicators: 3
    },
    medium: {
      indicatorFrequency: 3000, // Every 3 seconds
      blinkFrequency: 2000,     // Every 2 seconds
      pulseFrequency: 5000,     // Every 5 seconds
      maxIndicators: 5
    },
    high: {
      indicatorFrequency: 2000, // Every 2 seconds
      blinkFrequency: 1500,     // Every 1.5 seconds
      pulseFrequency: 3000,     // Every 3 seconds
      maxIndicators: 8
    }
  }

  const settings = intensitySettings[intensity]

  // Performance-aware activity indicator generation
  useEffect(() => {
    if (!enabled || !showIndicators) return

    // Reduce frequency on low performance
    const adjustedFrequency = settings.indicatorFrequency * (
      typeof window !== 'undefined' && window.navigator.hardwareConcurrency <= 2 ? 2 : 1
    )

    const interval = setInterval(() => {
      // Skip if too many indicators already exist
      if (activityIndicators.length >= settings.maxIndicators) return

      const container = containerRef?.current || document.body
      const rect = container.getBoundingClientRect()
      
      // Limit to visible area for performance
      if (rect.width === 0 || rect.height === 0) return
      
      const newIndicator: ActivityIndicator = {
        id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: ['network', 'database', 'server', 'deployment', 'monitoring'][Math.floor(Math.random() * 5)] as ActivityIndicator['type'],
        position: {
          x: Math.random() * Math.max(rect.width - 80, 100) + 40,
          y: Math.random() * Math.max(rect.height - 80, 100) + 40
        },
        timestamp: Date.now(),
        status: ['active', 'success', 'warning'][Math.floor(Math.random() * 3)] as ActivityIndicator['status']
      }

      setActivityIndicators(prev => {
        // More aggressive cleanup for performance
        const now = Date.now()
        const filtered = prev.filter(indicator => now - indicator.timestamp < 3000)
        return [...filtered, newIndicator].slice(-Math.min(settings.maxIndicators, 5))
      })
    }, adjustedFrequency)

    return () => clearInterval(interval)
  }, [enabled, showIndicators, settings.indicatorFrequency, settings.maxIndicators, containerRef, activityIndicators.length])

  // Optimized blinking elements with reduced frequency
  useEffect(() => {
    if (!enabled) return

    // Reduce blinking frequency on low-end devices
    const adjustedFrequency = settings.blinkFrequency * (
      typeof window !== 'undefined' && 
      (window.navigator.hardwareConcurrency <= 2 || window.navigator.deviceMemory <= 2) ? 1.5 : 1
    )

    const interval = setInterval(() => {
      // Limit concurrent blinking elements
      if (blinkingElements.length >= 2) return

      const elements = [
        'status-led',
        'connection-indicator', 
        'activity-monitor'
      ]
      
      const availableElements = elements.filter(el => !blinkingElements.includes(el))
      if (availableElements.length === 0) return

      const randomElement = availableElements[Math.floor(Math.random() * availableElements.length)]
      setBlinkingElements(prev => [...prev, randomElement])
      
      // Remove after blink duration with cleanup
      const timeout = setTimeout(() => {
        setBlinkingElements(prev => prev.filter(el => el !== randomElement))
      }, 400) // Reduced duration for performance

      return () => clearTimeout(timeout)
    }, adjustedFrequency)

    return () => clearInterval(interval)
  }, [enabled, settings.blinkFrequency, blinkingElements.length])

  // System pulse effect
  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      setSystemPulse(true)
      setTimeout(() => setSystemPulse(false), 1000)
    }, settings.pulseFrequency)

    return () => clearInterval(interval)
  }, [enabled, settings.pulseFrequency])

  // Efficient cleanup with batching
  useEffect(() => {
    if (!enabled) return

    const cleanup = setInterval(() => {
      const now = Date.now()
      setActivityIndicators(prev => {
        const filtered = prev.filter(indicator => now - indicator.timestamp < 3000)
        // Only update state if there's actually a change
        return filtered.length !== prev.length ? filtered : prev
      })
    }, 2000) // Less frequent cleanup

    return () => clearInterval(cleanup)
  }, [enabled])

  const getIconForType = (type: ActivityIndicator['type']) => {
    switch (type) {
      case 'network': return Wifi
      case 'database': return Database
      case 'server': return Server
      case 'deployment': return CheckCircle
      case 'monitoring': return Activity
      default: return Zap
    }
  }

  const getColorForStatus = (status: ActivityIndicator['status']) => {
    switch (status) {
      case 'active': return '#00ff41'
      case 'success': return '#00ff88'
      case 'warning': return '#ffaa00'
      case 'error': return '#ff4444'
      default: return '#00ff41'
    }
  }

  if (!enabled) return null

  return (
    <>
      {/* Activity Indicators */}
      {showIndicators && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <AnimatePresence>
            {activityIndicators.map((indicator) => {
              const Icon = getIconForType(indicator.type)
              const color = getColorForStatus(indicator.status)
              
              return (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0.8, 0],
                    scale: [0, 1, 1, 0.8],
                    rotate: [0, 360],
                    x: indicator.position.x,
                    y: indicator.position.y
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.9, 1]
                  }}
                  className="absolute"
                >
                  <div
                    className="relative p-2 rounded-full backdrop-blur-sm"
                    style={{
                      backgroundColor: color + '20',
                      border: `1px solid ${color}60`,
                      boxShadow: `0 0 12px ${color}40`
                    }}
                  >
                    <Icon 
                      className="w-4 h-4" 
                      style={{ color }}
                    />
                    
                    {/* Ripple effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0.6 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: color + '40' }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Blinking Status Indicators */}
      <div className="fixed top-4 right-4 pointer-events-none z-50">
        <div className="flex flex-col gap-2">
          {/* Status LED */}
          <motion.div
            animate={{
              opacity: blinkingElements.includes('status-led') ? [1, 0.3, 1] : 1,
              scale: systemPulse ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-mono"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">SYS</span>
          </motion.div>

          {/* Connection Indicator */}
          <motion.div
            animate={{
              opacity: blinkingElements.includes('connection-indicator') ? [1, 0.3, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-mono"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400">NET</span>
          </motion.div>

          {/* Activity Monitor */}
          <motion.div
            animate={{
              opacity: blinkingElements.includes('activity-monitor') ? [1, 0.3, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-mono"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400">ACT</span>
          </motion.div>
        </div>
      </div>

      {/* System Pulse Overlay */}
      <AnimatePresence>
        {systemPulse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 pointer-events-none z-30"
            style={{
              background: 'radial-gradient(circle at center, #00ff4120 0%, transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle Background Activity Lines */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 0%, #00ff4108 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, #00ff4108 50%, transparent 100%)
            `,
            backgroundSize: '200px 200px',
            animation: 'drift 20s linear infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -10px); }
          50% { transform: translate(10px, -5px); }
          75% { transform: translate(-5px, 10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </>
  )
}