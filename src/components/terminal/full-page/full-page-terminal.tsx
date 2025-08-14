"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  executeCommand,
  CommandContext,
  getCommandSuggestions,
  ASCII_BANNERS
} from '../core/command-registry'
import { TerminalContainer } from '../layout/terminal-container'
import { TerminalHeader } from './terminal-header'
import { TerminalOutput } from './terminal-output'
import { TerminalInput } from './terminal-input'
import { MatrixRain } from './matrix-rain'
import { useTerminalEffects } from '../hooks/use-terminal-effects'
import { InlineContactForm, type ContactFormData } from '../forms/inline-contact-form'
import { LegendModeOverlay } from '../effects/legend-mode-overlay'
import { AmbientCursorEffects, SystemActivityAnimations, PageTransition } from '../effects'
import { usePerformanceMonitor } from '../performance/performance-monitor'
import { useMemoryManager, useTerminalHistoryManager, useAnimationCleanup } from '../performance/memory-manager'
import { usePerformanceFallbacks } from '../performance/performance-fallbacks'
import { useMobileOptimizations } from '../mobile/mobile-terminal-optimizations'

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
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactFormData, setContactFormData] = useState<Partial<ContactFormData>>({})

  // Performance monitoring and optimization hooks
  const { metrics, isLowPerformance } = usePerformanceMonitor({
    onPerformanceChange: (metrics) => {
      if (metrics.isLowPerformance) {
        console.warn('🐌 Low performance detected, enabling optimizations')
      }
    }
  })

  const { getOptimizedProps, shouldDisableFeature, performanceLevel } = usePerformanceFallbacks({
    enableFallbacks: true,
    fallbackThresholds: {
      fps: 45,
      memoryUsage: 75,
      renderTime: 20
    }
  })

  const { triggerCleanup, isMemoryPressure } = useMemoryManager(
    {
      maxHistoryLines: 500,
      cleanupInterval: 30000,
      enableAutoCleanup: true
    },
    {
      clearHistory: () => {
        setLines(prev => prev.slice(-100)) // Keep only last 100 lines
        setCommandHistory(prev => prev.slice(-50)) // Keep only last 50 commands
      },
      clearAnimations: () => {
        setShowMatrix(false)
        setLegendMode(false)
      }
    }
  )

  const { registerTimeout, registerAnimation, cleanupAll } = useAnimationCleanup()
  
  const { 
    isMobile, 
    isTablet, 
    getMobilePerformanceSettings,
    optimizeForMobileInput,
    keyboardVisible 
  } = useMobileOptimizations()

  const inputRef = useRef<HTMLInputElement>(null)
  const lineIdCounter = useRef(0)

  const { 
    terminalRef,
    scrollToBottom,
    isScrolledToBottom,
    isUserScrolling,
    handleScroll
  } = useTerminalScroll({
    smoothScroll: !shouldDisableFeature('animations'),
    scrollThreshold: 50,
    scrollDebounce: 150
  })

  // Enhanced scroll function for suggestions
  const scrollForSuggestions = useCallback(() => {
    if (!suggestions.length) return

    // Calculate space needed for suggestions
    const suggestionsHeight = Math.max(suggestions.length * 35 + 100, 250)
    scrollToBottom(suggestionsHeight)
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

  // Terminal effects hook with performance awareness
  const { playSound, addScreenShake } = useTerminalEffects()

  // Get performance-optimized settings
  const mobileSettings = getMobilePerformanceSettings()
  const optimizedTerminalProps = getOptimizedProps({
    enableAnimations: mobileSettings.enableAnimations,
    enableParticles: mobileSettings.enableParticles,
    enableGlow: mobileSettings.enableGlow,
    enableTrails: mobileSettings.enableTrails,
    animationDuration: mobileSettings.animationDuration
  })

  // Command context
  const [context, setContext] = useState<CommandContext>({
    currentPath: '/home/nassim',
    user: 'nassim',
    host: 'cloud-console',
    environment: 'production',
    variables: {},
    history: []
  })

  // Performance-optimized line addition with memory management
  const addLine = useCallback((
    content: string,
    type: TerminalLine['type'] = 'output',
    animation?: TerminalLine['animation'],
    shouldScroll = true
  ) => {
    const newLine: TerminalLine = {
      id: `line-${++lineIdCounter.current}`,
      type,
      content,
      timestamp: lineIdCounter.current,
      animation: shouldDisableFeature('animations') ? undefined : animation
    }

    setLines(prev => {
      let newLines = [...prev, newLine]

      // Auto-trim history on mobile or low performance
      const maxLines = isMobile ? 100 : isLowPerformance ? 200 : 500
      if (newLines.length > maxLines) {
        newLines = newLines.slice(-maxLines)
      }

      // For large outputs, scroll immediately after adding line
      if (shouldScroll && isMounted && !shouldDisableFeature('animations')) {
        const timeout = registerTimeout(setTimeout(() => {
          scrollToBottom(0, true)
        }, 0))
      }

      return newLines
    })
  }, [scrollToBottom, isMounted, shouldDisableFeature, isMobile, isLowPerformance, registerTimeout])

  // Set mounted state and add global focus management
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

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
      if (inputChangeTimeoutRef.current) {
        clearTimeout(inputChangeTimeoutRef.current)
      }
    }
  }, [restoreFocus, isProcessing, isBooting])

  // Boot sequence - only run once when mounted
  useEffect(() => {
    if (hasBooted) return

    // Only start boot sequence after component is mounted and on client side
    if (!isMounted || typeof window === 'undefined') return

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

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      bootSequence()
    }, 100)
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

      // Handle contact form
      if (result.data?.action === 'show-contact-form') {
        setShowContactForm(true)
        setIsProcessing(false)
        return
      }

      // Handle contact form submission
      if (result.data?.action === 'contact-submit') {
        // Store the contact data (in a real app, this would send to an API)
        console.log('Contact form submitted:', result.data)
      }

      // Handle matrix effect
      if (result.animation === 'matrix' || command.includes('matrix')) {
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 3000)
      }

      // Handle legend mode activation
      if (result.data?.action === 'activate-legend-mode') {
        setLegendMode(true)
        addScreenShake()
        playSound('success')
        // Legend mode overlay will handle its own timing
        setTimeout(() => setLegendMode(false), 5000)
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

  // Handle contact form submission
  const handleContactFormSubmit = useCallback((data: ContactFormData) => {
    setShowContactForm(false)

    // Add success message to terminal
    addLine('', 'output')
    addLine('📨 CONTACT FORM SUBMITTED SUCCESSFULLY!', 'success')
    addLine('═══════════════════════════════════════════════════════', 'success')
    addLine('', 'output')
    addLine('✅ Your message has been sent successfully!', 'success')
    addLine('', 'output')
    addLine('📋 Submission Details:', 'info')
    addLine(`   Name: ${data.name}`, 'info')
    addLine(`   Email: ${data.email}`, 'info')
    if (data.project) addLine(`   Project: ${data.project}`, 'info')
    addLine(`   Message: ${data.message}`, 'info')
    addLine('', 'output')
    addLine('🚀 Your message has been queued for processing', 'info')
    addLine('📧 You will receive a response within 24 hours', 'info')
    addLine('🔄 Confirmation email sent to your address', 'info')
    addLine('', 'output')
    addLine('💡 Thank you for reaching out!', 'success')
    addLine('', 'output')

    // Play success sound
    playSound('success')

    // Restore focus after form submission
    setTimeout(() => restoreFocus(), 500)
  }, [addLine, playSound, restoreFocus])

  // Handle contact form cancellation
  const handleContactFormCancel = useCallback(() => {
    setShowContactForm(false)
    addLine('', 'output')
    addLine('❌ Contact form cancelled', 'warning')
    addLine('💡 Use "contact" to view contact options', 'info')
    addLine('', 'output')

    // Restore focus after cancellation
    setTimeout(() => restoreFocus(), 100)
  }, [addLine, restoreFocus])

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

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono">
      {isMounted && (
        <>
          <AmbientCursorEffects
            enabled={!isBooting && optimizedTerminalProps.enableTrails}
            intensity={isMobile ? 'low' : legendMode ? 'high' : 'medium'}
            glowColor={legendMode ? '#fbbf24' : '#00ff41'}
            enableTrails={optimizedTerminalProps.enableTrails}
            enableGlow={optimizedTerminalProps.enableGlow}
            disableAnimations={!optimizedTerminalProps.enableAnimations}
            trailLength={isMobile ? 3 : 8}
          />
          <SystemActivityAnimations
            enabled={!isBooting && !shouldDisableFeature('complex-effects')}
            intensity={isMobile ? 'low' : legendMode ? 'high' : 'medium'}
            showIndicators={!isMobile && !shouldDisableFeature('complex-effects')}
          />
        </>
      )}

      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {showMatrix && <MatrixRain />}
      </AnimatePresence>

      {/* Terminal Container */}
      <PageTransition>
        <TerminalContainer legendMode={legendMode} onClick={handleTerminalClick}>
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
            onScroll={handleScroll}
            className={`relative flex-1 overflow-y-auto p-4 bg-black/95 backdrop-blur-sm ${
              !isScrolledToBottom ? 'scroll-indicator' : ''
            }`}
            style={{
              height: 'calc(100vh - 3rem)',
              maxHeight: 'calc(100vh - 3rem)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#22c55e #000000',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              willChange: 'scroll-position'
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

            {/* Contact Form */}
            <AnimatePresence>
              {showContactForm && (
                <InlineContactForm
                  onSubmit={handleContactFormSubmit}
                  onCancel={handleContactFormCancel}
                  initialData={contactFormData}
                />
              )}
            </AnimatePresence>

            {/* Current Input Line */}
            {!isBooting && !showContactForm && (
              <div className="relative" style={!isMounted ? { display: 'none' } : {}}>
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
                    if (isMounted) {
                      setTimeout(() => {
                        if (showSuggestions) {
                          scrollForSuggestions()
                        } else {
                          scrollToBottom(150, false)
                        }
                      }, 50)
                    }
                  }}
                />

                {/* Enhanced spacing for suggestions visibility */}
                {showSuggestions && (
                  <div className="h-80 w-full" />
                )}
              </div>
            )}

            {/* Additional bottom padding to ensure content is always scrollable */}
            <div className="h-32 w-full" />
          </div>
        </TerminalContainer>
      </PageTransition>

      {/* Legend Mode Overlay */}
      <LegendModeOverlay
        isActive={legendMode}
        onComplete={() => setLegendMode(false)}
        duration={5000}
      />
    </div>
  )
}