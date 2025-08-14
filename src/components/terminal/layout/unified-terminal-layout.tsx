"use client"

import { ReactNode, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2, Wifi, WifiOff, Activity, Cpu, HardDrive, Network } from 'lucide-react'
import { AmbientCursorEffects } from '../effects/ambient-cursor-effects'
import { SystemActivityAnimations } from '../effects/system-activity-animations'
import { SmoothTransitions } from '../effects/smooth-transitions'

interface UnifiedTerminalLayoutProps {
  children: ReactNode
  showSystemMetrics?: boolean
  enableRealTimeElements?: boolean
  enableAmbientEffects?: boolean
  ambientIntensity?: 'low' | 'medium' | 'high'
  title?: string
  className?: string
  onClose?: () => void
}

interface SystemMetrics {
  cpu: number
  memory: number
  network: number
  uptime: string
  podsRunning: number
  deploymentsSucceeded: number
}

export function UnifiedTerminalLayout({
  children,
  showSystemMetrics = true,
  enableRealTimeElements = true,
  enableAmbientEffects = true,
  ambientIntensity = 'medium',
  title = "Nassim's Cloud Engineer Console",
  className = '',
  onClose
}: UnifiedTerminalLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 25,
    memory: 68,
    network: 15,
    uptime: '0d 0h 0m',
    podsRunning: 14,
    deploymentsSucceeded: 127
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Simulate real-time system metrics
  useEffect(() => {
    if (!enableRealTimeElements) return

    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(15, Math.min(45, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(60, Math.min(80, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(5, Math.min(50, prev.network + (Math.random() - 0.5) * 15)),
        uptime: calculateUptime(),
        podsRunning: Math.max(12, Math.min(18, prev.podsRunning + Math.floor((Math.random() - 0.5) * 3))),
        deploymentsSucceeded: prev.deploymentsSucceeded + (Math.random() > 0.95 ? 1 : 0)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [enableRealTimeElements])

  // Calculate uptime (simulated)
  const calculateUptime = () => {
    const now = new Date()
    const start = new Date(now.getTime() - Math.random() * 86400000) // Random uptime up to 1 day
    const diff = now.getTime() - start.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${days}d ${hours}h ${minutes}m`
  }

  // Simulate connection status changes
  useEffect(() => {
    if (!enableRealTimeElements) return

    const interval = setInterval(() => {
      // Rarely disconnect (5% chance every 10 seconds)
      if (Math.random() < 0.05) {
        setIsConnected(false)
        // Reconnect after 2-5 seconds
        setTimeout(() => setIsConnected(true), 2000 + Math.random() * 3000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [enableRealTimeElements])

  // Handle responsive breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {/* Ambient Effects - Disabled on mobile for performance */}
      {enableAmbientEffects && !isMobile && (
        <>
          <AmbientCursorEffects
            enabled={enableAmbientEffects && !isMobile}
            intensity={isMobile ? 'low' : ambientIntensity}
            glowColor="#00ff41"
            enableTrails={!isMobile}
            enableGlow={!isMobile}
          />
          <SystemActivityAnimations
            enabled={enableRealTimeElements && !isMobile}
            intensity={isMobile ? 'low' : ambientIntensity}
            showIndicators={!isMobile}
            containerRef={containerRef}
          />
        </>
      )}

      <SmoothTransitions type="terminal">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: isMobile ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: isMobile ? 0.2 : 0.3 }}
          className={`terminal-window overflow-hidden ${
            isMobile 
              ? 'h-screen w-screen' 
              : isTablet 
                ? 'rounded-md h-[95vh] w-[98vw] shadow-xl' 
                : 'rounded-lg h-[85vh] w-[92vw] max-w-7xl shadow-2xl'
          } ${className}`}
          style={{
            // Optimize for mobile performance
            willChange: isMobile ? 'auto' : 'transform',
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
      {/* Terminal Window Chrome */}
      <div className="terminal-chrome backdrop-blur-sm">
        {/* Window Controls Bar */}
        <div className={`flex items-center justify-between ${isMobile ? 'px-2 py-1' : 'px-4 py-2'}`}>
          <div className="flex items-center gap-3">
            {/* macOS-style window controls */}
            <div className="flex gap-1.5">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            
            {/* Terminal Title */}
            <div className="flex items-center gap-2">
              <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-terminal-green font-mono font-semibold terminal-text ${isMobile ? 'truncate max-w-[120px]' : ''}`}>
                {isMobile ? 'Cloud Console' : title}
              </span>
              <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* System Metrics (if enabled) */}
            {showSystemMetrics && !isMobile && (
              <div className={`${isTablet ? 'hidden lg:flex' : 'hidden md:flex'} items-center gap-4 text-xs font-mono`}>
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-terminal-cyan" />
                  <span className="text-terminal-cyan">CPU:</span>
                  <span className="text-white">{systemMetrics.cpu.toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-terminal-magenta" />
                  <span className="text-terminal-magenta">MEM:</span>
                  <span className="text-white">{systemMetrics.memory.toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Network className="w-3 h-3 text-terminal-yellow" />
                  <span className="text-terminal-yellow">NET:</span>
                  <span className="text-white">{systemMetrics.network.toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-terminal-green" />
                  <span className="text-terminal-green">PODS:</span>
                  <span className="text-white">{systemMetrics.podsRunning}</span>
                </div>
              </div>
            )}
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {isConnected ? (
                  <motion.div
                    key="connected"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Wifi className="w-3 h-3 text-terminal-green" />
                    <span className="text-xs text-terminal-green font-mono">ONLINE</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="disconnected"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <WifiOff className="w-3 h-3 text-terminal-red" />
                    <span className="text-xs text-terminal-red font-mono">OFFLINE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Window Action Buttons */}
            {!isMobile && (
              <div className="flex gap-1">
                <motion.button 
                  className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minimize2 className="w-3 h-3 text-gray-400 hover:text-terminal-green" />
                </motion.button>
                <motion.button 
                  className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize2 className="w-3 h-3 text-gray-400 hover:text-terminal-green" />
                </motion.button>
                <motion.button 
                  className="p-1 hover:bg-red-600/50 rounded transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3 text-gray-400 hover:text-terminal-red" />
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        {showSystemMetrics && (
          <div className={`${isMobile ? 'px-2 py-1' : 'px-4 py-1'} bg-black/50 border-t border-terminal-green/20`}>
            <div className="flex items-center justify-between text-xs font-mono">
              <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
                <span className="text-terminal-green">{isMobile ? 'nassim@cloud' : 'nassim@cloud-engineer'}</span>
                <span className="text-gray-500">~</span>
                {!isMobile && (
                  <>
                    <span className="text-terminal-cyan">uptime: {systemMetrics.uptime}</span>
                    <span className="text-terminal-magenta">deployments: {systemMetrics.deploymentsSucceeded}</span>
                  </>
                )}
                {isMobile && (
                  <span className="text-terminal-cyan">{systemMetrics.podsRunning} pods</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                <span className="text-terminal-green">{isMobile ? 'online' : 'system operational'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Content Area - Optimized for mobile */}
      <div className={`bg-black/95 font-mono text-terminal-green ${
        isMobile 
          ? 'min-h-[calc(100vh-140px)] p-2 text-sm leading-tight overflow-hidden' 
          : isTablet 
            ? 'min-h-[calc(95vh-140px)] p-3 text-sm leading-normal' 
            : 'min-h-[calc(85vh-140px)] p-4 text-base leading-relaxed backdrop-blur-sm'
      }`}
      style={{
        // Mobile-specific optimizations
        ...(isMobile && {
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'none',
          touchAction: 'pan-y',
          // Reduce backdrop blur on mobile for performance
          backdropFilter: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.98)'
        }),
        // Tablet optimizations
        ...(isTablet && {
          backdropFilter: 'blur(2px)'
        })
      }}>
        {children}
      </div>

      {/* Terminal Footer (optional status line) */}
      <div className={`bg-gray-900/95 border-t border-terminal-green/30 ${isMobile ? 'px-2 py-1' : 'px-4 py-1'}`}>
        <div className="flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
            {!isMobile && (
              <>
                <span className="text-gray-500">ESC</span>
                <span className="text-gray-400">Menu</span>
                <span className="text-gray-500">Ctrl+C</span>
                <span className="text-gray-400">Interrupt</span>
                <span className="text-gray-500">Ctrl+L</span>
                <span className="text-gray-400">Clear</span>
              </>
            )}
            {isMobile && (
              <>
                <span className="text-gray-500">TAP</span>
                <span className="text-gray-400">Focus</span>
                <span className="text-gray-500">SWIPE</span>
                <span className="text-gray-400">Scroll</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{isMobile ? 'v2.1.0' : 'Terminal v2.1.0'}</span>
            <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" />
          </div>
        </div>
      </div>
        </motion.div>
      </SmoothTransitions>
    </>
  )
}