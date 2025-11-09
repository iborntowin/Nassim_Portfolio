"use client"

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HoverTransition, FocusTransition } from '../effects/smooth-transitions'

interface TerminalInputProps {
  user: string
  host: string
  path: string
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  suggestions: string[]
  showSuggestions: boolean
  isProcessing: boolean
  legendMode?: boolean
  onFocus?: () => void
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ 
    user, 
    host, 
    path, 
    value, 
    onChange, 
    onKeyDown, 
    suggestions, 
    showSuggestions, 
    isProcessing,
    legendMode,
    onFocus
  }, ref) => {
    const promptColor = legendMode ? 'text-yellow-400' : 'text-green-400'
    const inputColor = legendMode ? 'text-yellow-200' : 'text-white'

    return (
      <div className="relative">
        {/* Command Input Line */}
        <motion.div 
          className="flex items-center gap-2 mt-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Prompt */}
          <motion.span 
            className={`font-mono text-sm ${promptColor} flex-shrink-0`}
            animate={legendMode ? {
              textShadow: '0 0 10px #fbbf24'
            } : {}}
          >
            {user}@{host}:{path}$
          </motion.span>
          
          {/* Input */}
          <FocusTransition className="flex-1 relative">
            <input
              ref={ref}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={(e) => {
                // Ensure cursor is at the end
                e.target.setSelectionRange(e.target.value.length, e.target.value.length)
                onFocus?.()
              }}
              onBlur={(e) => {
                // Prevent losing focus unless clicking outside terminal
                if (!e.relatedTarget || !e.currentTarget.closest('.terminal-container')?.contains(e.relatedTarget as Node)) {
                  setTimeout(() => {
                    if (ref && 'current' in ref && ref.current) {
                      ref.current.focus()
                    }
                  }, 100)
                }
              }}
              disabled={isProcessing}
              className={`w-full bg-transparent border-none outline-none font-mono text-sm ${inputColor} placeholder-gray-500 caret-transparent`}
            aria-label="Terminal input"
              placeholder={isProcessing ? "Processing..." : "Type a command..."}
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            
            {/* Custom Cursor */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`absolute top-0 ${legendMode ? 'bg-yellow-400' : 'bg-green-400'} w-2 h-5`}
              style={{ 
                left: `${value.length * 0.6}em`,
                display: isProcessing ? 'none' : 'block'
              }}
            />
          </FocusTransition>

          {/* Processing Indicator */}
          {isProcessing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className={`w-4 h-4 border-2 border-t-transparent rounded-full ${
                legendMode ? 'border-yellow-400' : 'border-green-400'
              }`}
            />
          )}
        </motion.div>

        {/* Auto-completion Suggestions */}
        <AnimatePresence mode="wait">
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute top-full left-0 mt-2 bg-gray-900/98 backdrop-blur-md border-2 ${
                legendMode ? 'border-yellow-400/40' : 'border-green-400/40'
              } rounded-lg shadow-2xl z-50 w-full max-w-2xl`}
              style={{
                maxHeight: '380px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: legendMode ? '#fbbf24 #1f2937' : '#22c55e #1f2937'
              }}
            >
              <div className="p-3">
                <div className={`text-xs font-bold ${
                  legendMode ? 'text-yellow-400' : 'text-green-400'
                } mb-2 px-2 sticky top-0 bg-gray-900/98 backdrop-blur-md pb-2 z-10 border-b ${
                  legendMode ? 'border-yellow-400/30' : 'border-green-400/30'
                }`}>
                  💡 Available Commands ({suggestions.length})
                </div>
                <div className="space-y-1 mt-2">
                {suggestions.map((suggestion, index) => (
                  <HoverTransition key={`${suggestion}-${index}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.2 }}
                      className={`px-4 py-2.5 text-sm font-mono cursor-pointer rounded-md transition-all duration-150 ${
                        legendMode 
                          ? 'text-yellow-100 hover:bg-yellow-400/20 hover:text-yellow-50 hover:border-yellow-400/50' 
                          : 'text-green-200 hover:bg-green-400/20 hover:text-green-50 hover:border-green-400/50'
                      } border border-transparent hover:shadow-md hover:translate-x-1`}
                      onClick={() => {
                        onChange(suggestion + ' ')
                      }}
                    >
                      <span className={`mr-2 ${legendMode ? 'text-yellow-400' : 'text-green-400'}`}>›</span>
                      {suggestion}
                    </motion.div>
                  </HoverTransition>
                ))}
                </div>
                
                {/* Keyboard hints */}
                <div className={`border-t ${
                  legendMode ? 'border-yellow-400/30' : 'border-green-400/30'
                } mt-3 pt-3 px-2 sticky bottom-0 bg-gray-900/98 backdrop-blur-md`}>
                  <div className="text-xs text-gray-400 flex gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px]">Tab</kbd> Complete
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px]">↑↓</kbd> History
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px]">Esc</kbd> Close
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

TerminalInput.displayName = 'TerminalInput'