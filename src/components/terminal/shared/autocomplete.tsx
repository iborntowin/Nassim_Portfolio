"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AutocompleteOption } from '../types/terminal.types'
import { File, Folder, Terminal, Settings } from 'lucide-react'

interface AutocompleteProps {
  input: string
  options: AutocompleteOption[]
  isVisible: boolean
  onSelect: (option: AutocompleteOption) => void
  onClose: () => void
  className?: string
}

const typeIcons = {
  command: Terminal,
  file: File,
  directory: Folder,
  option: Settings
}

export function Autocomplete({ 
  input, 
  options, 
  isVisible, 
  onSelect, 
  onClose,
  className = '' 
}: AutocompleteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedIndex(0)
  }, [options])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % options.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + options.length) % options.length)
          break
        case 'Enter':
        case 'Tab':
          e.preventDefault()
          if (options[selectedIndex]) {
            onSelect(options[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, options, selectedIndex, onSelect, onClose])

  if (!isVisible || options.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`absolute z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto ${className}`}
        style={{ minWidth: '300px' }}
      >
        <div className="p-2">
          <div className="text-xs text-gray-400 mb-2 px-2">
            Suggestions ({options.length})
          </div>
          {options.map((option, index) => {
            const Icon = typeIcons[option.type]
            return (
              <motion.div
                key={`${option.value}-${index}`}
                className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => onSelect(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm truncate">
                    {option.value}
                  </div>
                  {option.description && (
                    <div className="text-xs opacity-75 truncate">
                      {option.description}
                    </div>
                  )}
                </div>
                <div className="text-xs opacity-50 uppercase">
                  {option.type}
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Keyboard hints */}
        <div className="border-t border-gray-600 px-3 py-2 bg-gray-900 text-xs text-gray-400">
          <div className="flex gap-4">
            <span>↑↓ Navigate</span>
            <span>Tab/Enter Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}