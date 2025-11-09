"use client"

import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

interface TerminalHeaderProps {
  user: string
  host: string
  path: string
  legendMode?: boolean
}

export function TerminalHeader({ user, host, path, legendMode }: TerminalHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-gray-900 border-b ${
      legendMode ? 'border-yellow-400' : 'border-gray-700'
    }`}>
      {/* Left side - Terminal info */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="text-sm text-gray-300 font-mono">
          {legendMode && <Crown className="w-4 h-4 text-yellow-400 inline mr-2" />}
          {user}@{host}:{path}
        </div>
      </div>

      {/* Center - Title */}
      <motion.div
        animate={legendMode ? {
          textShadow: '0 0 10px #fbbf24, 0 0 20px #fbbf24',
          color: '#fbbf24'
        } : {}}
        className={`text-lg font-bold ${
          legendMode ? 'text-yellow-400' : 'text-green-400'
        }`}
      >
        🚀 CLOUD ENGINEER CONSOLE
      </motion.div>

      {/* Right side - Status */}
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400">ONLINE</span>
        </div>
      </div>
    </div>
  )
}