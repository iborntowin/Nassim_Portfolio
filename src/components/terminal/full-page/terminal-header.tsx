"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"

interface TerminalHeaderProps {
  user: string
  host: string
  path: string
  legendMode?: boolean
}

export function TerminalHeader({ user, host, path, legendMode }: TerminalHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-3 px-3 py-3 sm:px-4 bg-gray-900 border-b ${
      legendMode ? 'border-yellow-400' : 'border-gray-700'
    }`}>
      {/* Left side - Terminal info */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden gap-2 sm:flex">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="truncate text-xs font-mono text-gray-400 sm:text-sm sm:text-gray-300">
          {legendMode && <Crown className="w-4 h-4 text-yellow-400 inline mr-2" />}
          <span className="text-gray-300">{user}@{host}</span>
          <span className="hidden sm:inline">:{path}</span>
        </div>
      </div>

      {/* Center - Title */}
      <motion.div
        animate={legendMode ? {
          textShadow: '0 0 10px #fbbf24, 0 0 20px #fbbf24',
          color: '#fbbf24'
        } : {}}
        className={`shrink-0 text-xs font-bold sm:text-base ${
          legendMode ? 'text-yellow-400' : 'text-green-400'
        }`}
      >
        🚀 CLOUD ENGINEER CONSOLE
      </motion.div>

      {/* Right side - Status */}
      <div className="flex shrink-0 items-center gap-2 text-xs">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="hidden text-green-400 sm:inline">ONLINE</span>
      </div>
    </div>
  )
}
