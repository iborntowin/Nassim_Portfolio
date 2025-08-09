"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  executeCommand,
  CommandContext,
  getCommandSuggestions,
  ASCII_BANNERS
} from '../core/command-registry'
import { TerminalHeader } from './terminal-header'
import { TerminalOutput } from './terminal-output'
import { TerminalInput } from './terminal-input'
import { MatrixRain } from './matrix-rain'
import { useTerminalEffects } from '../hooks/use-terminal-effects'

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system'
  content: string
  timestamp: number
  animation?: 'typing' | 'matrix' | 'deploy' | 'scan'
}

export function FullPageTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [showMatrix, setShowMatrix] = useState(false)
  const [legendMode, setLegendMode] = useState(false)
  const [hasBooted, setHasBooted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lineIdCounter = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Enhanced scroll to bottom function with better reliability
  const scrollToBottom = useCallback((extraSpace = 0, immediate = false) => {
    if (!terminalRef.current) return

    const element = terminalRef.current

    const performScroll = () => {
      const targetScrollTop = element.scrollHeight + extraSpace - element.clientHeight

      if (immediate) {
        element.scrollTop = targetScrollTop
      } else {
        element.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        })
      }
    }

    // Clear any pending scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Multiple scroll attempts for reliability
    performScroll()

    requestAnimationFrame(() => {
      performScroll()
    })

    // Additional attempts with delays to handle dynamic content
    const delays = [50, 100, 200, 300, 500]
    delays.forEach(delay => {
      scrollTimeoutRef.current = setTimeout(() => {
        performScroll()
      }, delay)
    })

    // Ensure the last element is visible
    setTimeout(() => {
      const lastChild = element.lastElementChild
      if (lastChild) {
        lastChild.scrollIntoView({
          behavior: immediate ? 'auto' : 'smooth',
          block: 'end',
          inline: 'nearest'
        })
      }
    }, immediate ? 0 : 100)
  }, [])

  // Enhanced scroll function for suggestions with more space (reduced flicker)
  const scrollForSuggestions = useCallback(() => {
    if (!terminalRef.current) return

    // Calculate space needed for suggestions (more conservative)
    const suggestionsHeight = Math.max(suggestions.length * 35 + 100, 250)

    // Single smooth scroll to reduce flicker
    scrollToBottom(suggestionsHeight, false)

    // One follow-up attempt
    setTimeout(() => {
      scrollToBottom(suggestionsHeight, true)
    }, 100)
  }, [scrollToBottom, suggestions.length])

  // Enhanced focus restoration with better reliability
  const restoreFocus = useCallback(() => {
    if (!inputRef.current || isProcessing || isBooting) return

    const focusInput = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus()
        // Set cursor to end of input
        const length = inputRef.current.value.length
        inputRef.current.setSelectionRange(length, length)
      }
    }

    // Immediate focus
    focusInput()

    // Multiple attempts with delays
    const delays = [0, 10, 50, 100, 200, 300, 500]
    delays.forEach(delay => {
      setTimeout(focusInput, delay)
    })
  }, [isProcessing, isBooting])

  // Terminal effects hook
  const { playSound, addScreenShake } = useTerminalEffects()

  // Command context
  const [context, setContext] = useState<CommandContext>({
    currentPath: '/home/nassim',
    user: 'nassim',
    host: 'cloud-console',
    environment: 'production',
    variables: {},
    history: []
  })

  // Add line to terminal with immediate scroll for large outputs
  const addLine = useCallback((
    content: string,
    type: TerminalLine['type'] = 'output',
    animation?: TerminalLine['animation'],
    shouldScroll = true
  ) => {
    const now = isMounted ? Date.now() : 0
    const newLine: TerminalLine = {
      id: `line-${++lineIdCounter.current}-${now}`,
      type,
      content,
      timestamp: now,
      animation
    }

    setLines(prev => {
      const newLines = [...prev, newLine]

      // For large outputs, scroll immediately after adding line
      if (shouldScroll) {
        setTimeout(() => {
          scrollToBottom(0, true)
        }, 0)
      }

      return newLines
    })
  }, [scrollToBottom, isMounted])

  // Set mounted state and add global focus management
  useEffect(() => {
    setIsMounted(true)

    // Enhanced global focus management
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as Element

      // If clicking inside the terminal area, ensure input is focused
      if (terminalRef.current?.contains(target)) {
        e.preventDefault()
        setTimeout(() => {
          restoreFocus()
        }, 0)
      }
    }

    const handleGlobalFocus = () => {
      // Restore focus when window regains focus
      if (!isProcessing && !isBooting) {
        setTimeout(() => {
          restoreFocus()
        }, 100)
      }
    }

    document.addEventListener('click', handleGlobalClick, { passive: false })
    window.addEventListener('focus', handleGlobalFocus)

    return () => {
      document.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('focus', handleGlobalFocus)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (suggestionsTimeoutRef.current) {
        clearTimeout(suggestionsTimeoutRef.current)
      }
      if (inputChangeTimeoutRef.current) {
        clearTimeout(inputChangeTimeoutRef.current)
      }
    }
  }, [restoreFocus, isProcessing, isBooting])

  // Boot sequence - only run once when mounted
  useEffect(() => {
    if (hasBooted || !isMounted) return

    const bootSequence = async () => {
      const bootMessages = [
        'Initializing Nassim\'s Cloud Engineer Console...',
        'Loading kernel modules... OK',
        'Starting network services... OK',
        'Mounting cloud filesystems... OK',
        'Initializing AI subsystems... OK',
        'Loading DevOps automation tools... OK',
        'Connecting to Kubernetes clusters... OK',
        'Establishing secure connections... OK',
        'System ready. Welcome, Cloud Engineer!'
      ]

      for (let i = 0; i < bootMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        addLine(bootMessages[i], i === bootMessages.length - 1 ? 'success' : 'info')
      }

      // Only show banner and welcome once after boot
      await new Promise(resolve => setTimeout(resolve, 500))
      addLine(ASCII_BANNERS.welcome, 'system')
      addLine('', 'output')
      addLine('🚀 Welcome to the Cloud Engineer Command Console!', 'success')
      addLine('💡 Type "help" to see available commands', 'info')
      addLine('💡 Try "sudo become-legend" for a surprise!', 'info')
      addLine('', 'output')

      setIsBooting(false)
      setHasBooted(true)

      // Focus input after boot
      setTimeout(() => {
        restoreFocus()
      }, 100)
    }

    bootSequence()
  }, [hasBooted, isMounted, addLine, restoreFocus])

  // Enhanced auto-scroll and focus management
  useEffect(() => {
    if (isBooting) return

    // Scroll to bottom when new lines are added
    scrollToBottom(0, false)

    // Additional scrolling attempts for large content
    setTimeout(() => scrollToBottom(0, true), 100)
    setTimeout(() => scrollToBottom(0, true), 300)

    // Restore focus after scrolling
    if (!isProcessing) {
      setTimeout(() => {
        restoreFocus()
      }, 150)
    }
  }, [lines, isBooting, isProcessing, scrollToBottom, restoreFocus])

  // Enhanced suggestions scroll management (prevent flicker)
  const prevSuggestionsLength = useRef(0)
  const suggestionsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Clear any pending suggestion scrolls to prevent flicker
    if (suggestionsTimeoutRef.current) {
      clearTimeout(suggestionsTimeoutRef.current)
    }

    if (showSuggestions && suggestions.length > 0 && suggestions.length !== prevSuggestionsLength.current) {
      // Debounce the scroll to prevent flickering
      suggestionsTimeoutRef.current = setTimeout(() => {
        scrollForSuggestions()
      }, 100)
    } else if (!showSuggestions && prevSuggestionsLength.current !== 0) {
      // Smooth return to normal position
      suggestionsTimeoutRef.current = setTimeout(() => {
        scrollToBottom(100, false)
      }, 50)
    }

    prevSuggestionsLength.current = suggestions.length

    return () => {
      if (suggestionsTimeoutRef.current) {
        clearTimeout(suggestionsTimeoutRef.current)
      }
    }
  }, [showSuggestions, suggestions.length, scrollForSuggestions, scrollToBottom])

  // Handle command execution with enhanced scrolling
  const executeTerminalCommand = useCallback(async (command: string) => {
    if (!command.trim()) return

    setIsProcessing(true)
    setShowSuggestions(false)
    setSuggestions([])

    addLine(`${context.user}@${context.host}:${context.currentPath}$ ${command}`, 'command')

    // Add to history
    const newHistory = [...commandHistory.filter(h => h !== command), command]
    setCommandHistory(newHistory)
    setContext(prev => ({ ...prev, history: newHistory }))
    setHistoryIndex(-1)

    try {
      const result = await executeCommand(command, context)

      // Handle special commands
      if (result.data?.action === 'clear') {
        setLines([])
        setIsProcessing(false)
        setTimeout(() => restoreFocus(), 100)
        return
      }

      // Handle matrix effect
      if (result.animation === 'matrix' || command.includes('matrix')) {
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 3000)
      }

      // Handle legend mode (from registry)
      if (command.includes('become-legend') || result.animation === 'matrix') {
        setLegendMode(true)
        addScreenShake()
        playSound('success')
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 3000)
      }

      // Add output lines with progressive scrolling for large outputs
      if (result.output.length > 10) {
        // For very large outputs, add lines in batches with scrolling
        for (let i = 0; i < result.output.length; i++) {
          addLine(result.output[i], result.type, result.animation)

          // Scroll more frequently for large outputs
          if (i % 5 === 0 || i === result.output.length - 1) {
            setTimeout(() => {
              scrollToBottom(0, true)
            }, i * 10 + 50)
          }
        }
      } else {
        // For smaller outputs, add all lines normally
        result.output.forEach((line) => {
          addLine(line, result.type, result.animation)
        })
      }

      // Play sound effects
      if (result.success) {
        if (command.includes('deploy')) {
          playSound('deploy')
        } else if (result.type === 'success') {
          playSound('success')
        }
      } else {
        playSound('error')
      }

    } catch (error) {
      addLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      playSound('error')
    }

    setIsProcessing(false)

    // Enhanced post-command cleanup
    setTimeout(() => {
      scrollToBottom(0, true)
      restoreFocus()
    }, 100)

    // Additional focus restoration attempts
    setTimeout(() => {
      restoreFocus()
    }, 300)

    setTimeout(() => {
      restoreFocus()
    }, 600)

  }, [context, commandHistory, addLine, addScreenShake, playSound, scrollToBottom, restoreFocus])

  // Handle input changes with better suggestion management (prevent flicker)
  const inputChangeTimeoutRef = useRef<NodeJS.Timeout>()

  const handleInputChange = useCallback((value: string) => {
    setCurrentInput(value)

    // Clear any pending input change processing
    if (inputChangeTimeoutRef.current) {
      clearTimeout(inputChangeTimeoutRef.current)
    }

    if (value.trim()) {
      const newSuggestions = getCommandSuggestions(value.trim())
      setSuggestions(newSuggestions)
      const willShowSuggestions = newSuggestions.length > 0
      setShowSuggestions(willShowSuggestions)

      // Debounced scrolling to prevent flicker
      if (willShowSuggestions && newSuggestions.length > 0) {
        inputChangeTimeoutRef.current = setTimeout(() => {
          scrollForSuggestions()
        }, 150)
      }
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }, [scrollForSuggestions])

  // Enhanced key handling
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (currentInput.trim()) {
          executeTerminalCommand(currentInput.trim())
          setCurrentInput('')
          setShowSuggestions(false)
          setSuggestions([])

          // Immediate focus restoration
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus()
              inputRef.current.setSelectionRange(0, 0)
            }
          }, 0)

          // Additional focus restoration
          setTimeout(() => restoreFocus(), 100)
          setTimeout(() => restoreFocus(), 300)
        }
        break

      case 'Tab':
        e.preventDefault()
        if (suggestions.length === 1) {
          setCurrentInput(suggestions[0] + ' ')
          setShowSuggestions(false)
          setTimeout(() => restoreFocus(), 50)
        } else if (suggestions.length > 1) {
          // Show all suggestions
          addLine('', 'output')
          addLine('Available completions:', 'info')
          suggestions.forEach(suggestion => {
            addLine(`  ${suggestion}`, 'output')
          })
          addLine('', 'output')
          setTimeout(() => restoreFocus(), 100)
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
        break

      case 'ArrowDown':
        e.preventDefault()
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1)
            setCurrentInput('')
          } else {
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[newIndex])
          }
        }
        break

      case 'Escape':
        setShowSuggestions(false)
        setSuggestions([])
        break

      case 'l':
        if (e.ctrlKey) {
          e.preventDefault()
          setLines([])
          setTimeout(() => restoreFocus(), 100)
        }
        break
    }
  }, [currentInput, suggestions, commandHistory, historyIndex, executeTerminalCommand, addLine, restoreFocus])

  // Enhanced terminal click handler
  const handleTerminalClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    restoreFocus()
  }, [restoreFocus])

  // Prevent hydration mismatch by showing loading state until mounted
  if (!isMounted) {
    return (
      <div className="relative h-screen w-full bg-black text-green-400 font-mono overflow-hidden flex items-center justify-center">
        <div className="text-green-400 text-lg">Initializing terminal...</div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full bg-black text-green-400 font-mono overflow-hidden">
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {isMounted && showMatrix && <MatrixRain />}
      </AnimatePresence>

      {/* Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`terminal-container h-full flex flex-col ${isMounted && legendMode ? 'border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20' : ''}`}
        onClick={handleTerminalClick}
      >
        {/* Terminal Header */}
        <TerminalHeader
          user={context.user}
          host={context.host}
          path={context.currentPath}
          legendMode={legendMode}
        />

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 bg-black/95 backdrop-blur-sm"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#22c55e #000000',
          }}
        >
          {/* Terminal Lines */}
          <div className="space-y-1">
            {lines.map((line) => (
              <TerminalOutput
                key={line.id}
                line={line}
                legendMode={legendMode}
              />
            ))}
          </div>

          {/* Current Input Line */}
          {!isBooting && isMounted && (
            <div className="relative">
              <TerminalInput
                ref={inputRef}
                user={context.user}
                host={context.host}
                path={context.currentPath}
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                isProcessing={isProcessing}
                legendMode={legendMode}
                onFocus={() => {
                  // Ensure input area is visible when focused
                  setTimeout(() => {
                    if (showSuggestions) {
                      scrollForSuggestions()
                    } else {
                      scrollToBottom(150, false)
                    }
                  }, 50)
                }}
              />

              {/* Enhanced spacing for suggestions visibility */}
              {isMounted && showSuggestions && (
                <div className="h-80 w-full" />
              )}
            </div>
          )}

          {/* Additional bottom padding to ensure content is always scrollable */}
          <div className="h-32 w-full" />
        </div>
      </motion.div>

      {/* Legend Mode Overlay */}
      <AnimatePresence>
        {isMounted && legendMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-4 right-4 bg-yellow-400/10 border border-yellow-400 rounded-lg p-2">
              <div className="text-yellow-400 text-sm font-bold">
                👑 LEGEND MODE ACTIVE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}