"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AutocompleteOption } from '../types/terminal.types'
import { Autocomplete } from '../shared/autocomplete'
import { BlinkingCursor } from '../shared/terminal-animations'

interface TerminalInputProps {
  prompt: string
  onCommand: (command: string) => void
  onTabComplete?: (input: string) => AutocompleteOption[]
  commandHistory?: string[]
  disabled?: boolean
  placeholder?: string
  className?: string
  onAutocompleteShow?: () => void
  onAutocompleteHide?: () => void
}

export function TerminalInput({
  prompt,
  onCommand,
  onTabComplete,
  commandHistory = [],
  disabled = false,
  placeholder = 'Type a command...',
  className = '',
  onAutocompleteShow,
  onAutocompleteHide
}: TerminalInputProps) {
  const [input, setInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [autocompleteOptions, setAutocompleteOptions] = useState<AutocompleteOption[]>([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus()
    }
  }, [disabled])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
        if (input.trim()) {
          onCommand(input.trim())
          setInput('')
          setHistoryIndex(-1)
          setShowAutocomplete(false)
          // Restore focus after command execution
          setTimeout(() => {
            inputRef.current?.focus()
          }, 100)
        }
        break
        
      case 'Tab':
        e.preventDefault()
        if (onTabComplete) {
          const options = onTabComplete(input)
          if (options.length === 1) {
            setInput(options[0].value)
            setShowAutocomplete(false)
          } else if (options.length > 1) {
            setAutocompleteOptions(options)
            setShowAutocomplete(true)
            onAutocompleteShow?.()
          }
        }
        break
        
      case 'ArrowUp':
        e.preventDefault()
        if (!showAutocomplete && commandHistory.length > 0) {
          const newIndex = historyIndex === -1 
            ? commandHistory.length - 1 
            : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
        break
        
      case 'ArrowDown':
        e.preventDefault()
        if (!showAutocomplete && historyIndex !== -1) {
          const newIndex = historyIndex + 1
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1)
            setInput('')
          } else {
            setHistoryIndex(newIndex)
            setInput(commandHistory[newIndex])
          }
        }
        break
        
      case 'Escape':
        setShowAutocomplete(false)
        setAutocompleteOptions([])
        onAutocompleteHide?.()
        break
        
      case 'ArrowLeft':
      case 'ArrowRight':
        // Update cursor position for potential autocomplete positioning
        setTimeout(() => {
          if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart || 0)
          }
        }, 0)
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    setHistoryIndex(-1)
    
    // Hide autocomplete when input changes (unless it's from tab completion)
    if (showAutocomplete) {
      setShowAutocomplete(false)
    }
    
    // Update cursor position
    setCursorPosition(e.target.selectionStart || 0)
  }

  const handleAutocompleteSelect = (option: AutocompleteOption) => {
    setInput(option.value)
    setShowAutocomplete(false)
    setAutocompleteOptions([])
    onAutocompleteHide?.()
    inputRef.current?.focus()
  }

  const handleAutocompleteClose = () => {
    setShowAutocomplete(false)
    setAutocompleteOptions([])
    onAutocompleteHide?.()
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 p-4 bg-gray-900">
        {/* Prompt */}
        <motion.span 
          className="text-blue-400 font-mono text-sm flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {prompt}
        </motion.span>
        
        {/* Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={disabled ? 'Terminal is busy...' : placeholder}
            className="w-full bg-transparent text-white font-mono text-sm outline-none placeholder-gray-500 caret-transparent"
            autoComplete="off"
            spellCheck={false}
          />
          
          {/* Custom Cursor */}
          <div 
            className="absolute top-0 pointer-events-none"
            style={{ 
              left: `${cursorPosition * 0.6}em`,
              height: '1.25rem'
            }}
          >
            <BlinkingCursor />
          </div>
        </div>
        
        {/* Status Indicator */}
        {disabled && (
          <motion.div
            className="flex items-center gap-1 text-yellow-400 text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span>Processing...</span>
          </motion.div>
        )}
      </div>
      
      {/* Autocomplete */}
      <Autocomplete
        input={input}
        options={autocompleteOptions}
        isVisible={showAutocomplete}
        onSelect={handleAutocompleteSelect}
        onClose={handleAutocompleteClose}
        className="top-full left-4 mt-1"
      />
    </div>
  )
}