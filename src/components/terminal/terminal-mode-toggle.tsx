"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Terminal, Monitor, Zap, Crown } from 'lucide-react'

export function TerminalModeToggle() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2"
      >
        {/* Classic Mode Indicator */}
        <motion.div
          className="flex items-center gap-2 px-3 py-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg text-sm text-gray-300"
          whileHover={{ scale: 1.05 }}
        >
          <Monitor className="w-4 h-4" />
          <span>Classic Mode</span>
        </motion.div>

        {/* Toggle Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/terminal">
            <motion.button
              className="relative group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-medium rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-4 h-4" />
              <span className="text-sm">Terminal</span>
            </motion.button>
          </Link>

          <Link href="/enhanced-terminal">
            <motion.button
              className="relative group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg shadow-lg transition-all duration-300"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Enhanced</span>
              <Zap className="w-4 h-4" />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                animate={isHovered ? { 
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)' 
                } : {}}
              />
            </motion.button>
          </Link>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 20 }}
              className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 border border-purple-400/30 rounded-lg text-sm text-purple-400 whitespace-nowrap shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span>Enhanced Cloud Engineer Console</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Ultimate terminal experience with advanced features!
              </div>
              <div className="text-xs text-gray-500 mt-1">
                • Legend Mode • Matrix Effects • Advanced Commands
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}