"use client"

import { ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Minimize2, Maximize2, Wifi, Activity, Cpu, HardDrive } from 'lucide-react'

interface SimpleTerminalLayoutProps {
  children: ReactNode
  showSystemMetrics?: boolean
  title?: string
  className?: string
  onClose?: () => void
}

interface SystemMetrics {
  cpu: number
  memory: number
  uptime: string
  podsRunning: number
}

export function SimpleTerminalLayout({
  children,
  showSystemMetrics = true,
  title = "Nassim's Cloud Engineer Console",
  className = '',
  onClose
}: SimpleTerminalLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 25,
    memory: 68,
    uptime: '2d 4h 15m',
    podsRunning: 14
  })

  // Handle responsive breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Simulate system metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.max(15, Math.min(45, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(60, Math.min(80, prev.memory + (Math.random() - 0.5) * 5)),
        podsRunning: Math.max(12, Math.min(18, prev.podsRunning + Math.floor((Math.random() - 0.5) * 3)))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: isMobile ? 1 : 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: isMobile ? 0.2 : 0.3 }}
      className={`terminal-window ${
        isMobile 
          ? 'w-full min-h-screen' 
          : 'rounded-lg h-auto w-full max-w-7xl shadow-2xl mx-auto'
      } ${className}`}
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
              <div className="hidden md:flex items-center gap-4 text-xs font-mono">
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
                  <Activity className="w-3 h-3 text-terminal-green" />
                  <span className="text-terminal-green">PODS:</span>
                  <span className="text-white">{systemMetrics.podsRunning}</span>
                </div>
              </div>
            )}
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-terminal-green" />
                <span className="text-xs text-terminal-green font-mono">ONLINE</span>
              </div>
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

      {/* Terminal Content Area */}
      <div className={`bg-black/95 font-mono text-terminal-green terminal-content ${
        isMobile 
          ? 'p-2 text-sm leading-tight' 
          : 'p-4 text-base leading-relaxed backdrop-blur-sm'
      }`}>
        {children}
      </div>

      {/* Terminal Footer */}
      <div className={`bg-gray-900/95 border-t border-terminal-green/30 ${isMobile ? 'px-2 py-1' : 'px-4 py-1'}`}>
        <div className="flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
            {!isMobile && (
              <>
                <span className="text-gray-500">ESC</span>
                <span className="text-gray-400">Menu</span>
                <span className="text-gray-500">Ctrl+C</span>
                <span className="text-gray-400">Interrupt</span>
              </>
            )}
            {isMobile && (
              <>
                <span className="text-gray-500">TAP</span>
                <span className="text-gray-400">Focus</span>
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
  )
}