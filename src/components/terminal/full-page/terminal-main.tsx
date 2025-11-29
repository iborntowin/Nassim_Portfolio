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
import { InlineContactForm, type ContactFormData } from '../forms/inline-contact-form'
import { LegendModeOverlay } from '../effects/legend-mode-overlay'

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
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactFormData, setContactFormData] = useState<Partial<ContactFormData>>({})

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const lineIdCounter = useRef(0)

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      })
    }
  }, [])

  // Scroll to show suggestions properly
  const scrollToShowSuggestions = useCallback(() => {
    if (!terminalRef.current) return

    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    })
  }, [])

  // Auto-scroll when suggestions appear
  useEffect(() => {
    if (showSuggestions && suggestions.length > 0) {
      scrollToShowSuggestions()
    }
  }, [showSuggestions, suggestions.length, scrollToShowSuggestions])

  // Context
  const [context, setContext] = useState<CommandContext>({
    currentPath: '/home/nassim',
    user: 'nassim',
    host: 'cloud-console',
    environment: 'production',
    variables: {},
    history: []
  })

  // Add line
  const addLine = useCallback((
    content: string,
    type: TerminalLine['type'] = 'output',
    animation?: TerminalLine['animation']
  ) => {
    const newLine: TerminalLine = {
      id: `line-${++lineIdCounter.current}`,
      type,
      content,
      timestamp: lineIdCounter.current,
      animation
    }

    setLines(prev => [...prev, newLine])
    scrollToBottom()
  }, [scrollToBottom])

  // Boot sequence
  useEffect(() => {
    // Prevent double execution in strict mode
    let isCancelled = false

    const bootSequence = async () => {
      if (isCancelled) return

      const bootMessages = [
        { text: '█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 2%', delay: 100 },
        { text: '████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 8%', delay: 80 },
        { text: '████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 16%', delay: 80 },
        { text: '███████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 22%', delay: 100 },
        { text: '██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 28%', delay: 80 },
        { text: '███████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 38%', delay: 100 },
        { text: '████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ 48%', delay: 80 },
        { text: '█████████████████████████████░░░░░░░░░░░░░░░░░░░░░ 58%', delay: 100 },
        { text: '██████████████████████████████████░░░░░░░░░░░░░░░░ 68%', delay: 80 },
        { text: '███████████████████████████████████████░░░░░░░░░░░ 78%', delay: 100 },
        { text: '████████████████████████████████████████████░░░░░░ 88%', delay: 80 },
        { text: '████████████████████████████████████████████████░░ 96%', delay: 100 },
        { text: '██████████████████████████████████████████████████ 100%', delay: 150 },
      ]

      // Progress bar animation
      for (const msg of bootMessages) {
        if (isCancelled) return
        await new Promise(resolve => setTimeout(resolve, msg.delay))
        setLines(prev => {
          const filtered = prev.filter(l => !l.content.includes('█') || !l.content.includes('%'))
          return [...filtered, {
            id: `boot-progress-${Date.now()}`,
            type: 'info',
            content: msg.text,
            timestamp: Date.now()
          }]
        })
      }

      if (isCancelled) return
      await new Promise(resolve => setTimeout(resolve, 300))

      // Clear progress bar and show boot messages
      setLines([])

      const systemMessages = [
        { text: '[  OK  ] Started Cloud Engineer Console', type: 'success' as const },
        { text: '[  OK  ] Loaded kernel modules', type: 'success' as const },
        { text: '[  OK  ] Network services initialized', type: 'success' as const },
        { text: '[  OK  ] Connected to Kubernetes clusters', type: 'success' as const },
        { text: '[  OK  ] AI subsystems online', type: 'success' as const },
        { text: '[  OK  ] DevOps automation tools ready', type: 'success' as const },
      ]

      for (const msg of systemMessages) {
        if (isCancelled) return
        await new Promise(resolve => setTimeout(resolve, 150))
        addLine(msg.text, msg.type)
      }

      if (isCancelled) return
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Add the ASCII banner
      addLine(ASCII_BANNERS.welcome, 'system')
      
      await new Promise(resolve => setTimeout(resolve, 200))
      addLine('', 'output')
      addLine('🚀 Welcome to the Cloud Engineer Command Console!', 'success')
      addLine('💡 Type "help" to see available commands', 'info')
      addLine('💡 Try "sudo become-legend" for a surprise!', 'info')
      addLine('', 'output')

      setIsBooting(false)

      // Focus input
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }

    bootSequence()

    return () => {
      isCancelled = true
    }
  }, []) // Empty dependency array - run only once

  // Execute command
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
        setTimeout(() => inputRef.current?.focus(), 100)
        return
      }

      if (result.data?.action === 'show-contact-form') {
        setShowContactForm(true)
        setIsProcessing(false)
        return
      }

      if (result.animation === 'matrix' || command.includes('matrix')) {
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 3000)
      }

      if (result.data?.action === 'activate-legend-mode') {
        setLegendMode(true)
        setTimeout(() => setLegendMode(false), 5000)
      }

      result.output.forEach((line) => {
        addLine(line, result.type, result.animation)
      })

    } catch (error) {
      addLine(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
    }

    setIsProcessing(false)
    setTimeout(() => inputRef.current?.focus(), 100)

  }, [context, commandHistory, addLine])

  // Handle contact form
  const handleContactFormSubmit = useCallback((data: ContactFormData) => {
    setShowContactForm(false)
    addLine('', 'output')
    addLine('📨 CONTACT FORM SUBMITTED SUCCESSFULLY!', 'success')
    addLine(`Name: ${data.name}`, 'info')
    addLine(`Email: ${data.email}`, 'info')
    addLine('Thank you for reaching out!', 'success')
    addLine('', 'output')
    setTimeout(() => inputRef.current?.focus(), 500)
  }, [addLine])

  const handleContactFormCancel = useCallback(() => {
    setShowContactForm(false)
    addLine('Contact form cancelled', 'warning')
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [addLine])

  // Handle input
  const handleInputChange = useCallback((value: string) => {
    setCurrentInput(value)

    if (value.trim()) {
      const newSuggestions = getCommandSuggestions(value.trim())
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        if (currentInput.trim()) {
          executeTerminalCommand(currentInput.trim())
          setCurrentInput('')
          setShowSuggestions(false)
          setSuggestions([])
        }
        break

      case 'Tab':
        e.preventDefault()
        if (suggestions.length === 1) {
          setCurrentInput(suggestions[0] + ' ')
          setShowSuggestions(false)
        } else if (suggestions.length > 1) {
          addLine('Available completions:', 'info')
          suggestions.forEach(suggestion => {
            addLine(`  ${suggestion}`, 'output')
          })
          addLine('', 'output')
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
        }
        break
    }
  }, [currentInput, suggestions, commandHistory, historyIndex, executeTerminalCommand, addLine])

  return (
    <div className="h-screen bg-black text-green-400 font-mono">
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {showMatrix && <MatrixRain />}
      </AnimatePresence>

      {/* Terminal Container */}
      <TerminalContainer legendMode={legendMode}>
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
          className="flex-1 p-4 bg-black/95 overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#22c55e #000000'
          }}
        >
          {/* Terminal Lines */}
          <div className="space-y-1 pb-4">
            {lines.map((line) => (
              <TerminalOutput
                key={line.id}
                line={line}
                legendMode={legendMode}
              />
            ))}

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
              <div className="mt-4 pt-4 border-t border-gray-800/30">
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
                />

                {/* Dynamic spacing for suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div 
                    ref={suggestionsRef}
                    style={{ 
                      height: `${Math.min(suggestions.length * 42 + 120, 400)}px`,
                      pointerEvents: 'none'
                    }} 
                  />
                )}
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-8" />
          </div>
        </div>
      </TerminalContainer>

      {/* Legend Mode Overlay */}
      <LegendModeOverlay
        isActive={legendMode}
        onComplete={() => setLegendMode(false)}
        duration={5000}
      />
    </div>
  )
}

export default FullPageTerminal