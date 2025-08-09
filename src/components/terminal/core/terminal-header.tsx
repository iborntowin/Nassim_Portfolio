"use client"

import { motion } from 'framer-motion'
import { TerminalTab } from '../types/terminal.types'
import { X, Minimize2, Maximize2, Settings, Wifi, WifiOff } from 'lucide-react'

interface TerminalHeaderProps {
  tabs: TerminalTab[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  onClose?: () => void
  isConnected?: boolean
  className?: string
}

export function TerminalHeader({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onClose,
  isConnected = true,
  className = '' 
}: TerminalHeaderProps) {
  return (
    <div className={`bg-gray-800 border-b border-gray-700 ${className}`}>
      {/* Window Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-3">
            Nassim's Interactive Terminal
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Connection Status */}
          <div className="flex items-center gap-1">
            {isConnected ? (
              <Wifi className="w-3 h-3 text-green-400" />
            ) : (
              <WifiOff className="w-3 h-3 text-red-400" />
            )}
            <span className="text-xs text-gray-400">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {/* Window Controls */}
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Minimize2 className="w-3 h-3 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
              <Maximize2 className="w-3 h-3 text-gray-400" />
            </button>
            <button 
              className="p-1 hover:bg-red-600 rounded transition-colors"
              onClick={onClose}
            >
              <X className="w-3 h-3 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = tab.id === activeTabId
          
          return (
            <motion.button
              key={tab.id}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-r border-gray-700 min-w-0 ${
                isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-750'
              }`}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{tab.name}</span>
              
              {/* Keyboard Shortcut */}
              <span className="text-xs opacity-50 ml-1 hidden sm:inline">
                {tab.shortcut}
              </span>
              
              {/* Active Tab Indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
        
        {/* Add Tab Button */}
        <button className="p-3 text-gray-400 hover:text-gray-200 hover:bg-gray-750 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}