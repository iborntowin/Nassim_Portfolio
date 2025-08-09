"use client"

import { motion } from 'framer-motion'
import { 
  Minimize2, 
  Maximize2, 
  X, 
  Wifi, 
  Shield, 
  Cpu, 
  Activity,
  Crown
} from 'lucide-react'

interface TerminalHeaderProps {
  user: string
  host: string
  path: string
  legendMode?: boolean
}

export function TerminalHeader({ user, host, path, legendMode }: TerminalHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-2 bg-gray-900 border-b ${
      legendMode ? 'border-yellow-400' : 'border-gray-700'
    }`}>
      {/* Left side - Window controls */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors" />
        </div>
        
        <div className="text-sm text-gray-400 font-mono">
          {legendMode && <Crown className="w-4 h-4 text-yellow-400 inline mr-2" />}
          {user}@{host}:{path}
        </div>
      </div>

      {/* Center - Title */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={legendMode ? { 
            textShadow: '0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24',
            color: '#fbbf24'
          } : {}}
          className={`text-sm font-bold ${
            legendMode ? 'text-yellow-400' : 'text-green-400'
          }`}
        >
          🚀 CLOUD ENGINEER CONSOLE
        </motion.div>
      </div>

      {/* Right side - Status indicators */}
      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3 text-green-400" />
            <span className="text-green-400">ONLINE</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400">SECURE</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span className="text-purple-400">OPTIMAL</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400">ACTIVE</span>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex gap-1">
          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
            <Minimize2 className="w-3 h-3 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
            <Maximize2 className="w-3 h-3 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-red-600 rounded transition-colors">
            <X className="w-3 h-3 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}