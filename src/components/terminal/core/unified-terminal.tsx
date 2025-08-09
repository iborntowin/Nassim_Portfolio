"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTab, KeyboardShortcut } from '../types/terminal.types'
import { useTerminalState } from '../hooks/use-terminal-state'
import { useKeyboardShortcuts } from '../hooks/use-keyboard-shortcuts'
import { TerminalHeader } from './terminal-header'
import { TerminalInput } from './terminal-input'
import { HeroTab } from '../tabs/hero-tab'
import { 
  Home, 
  FolderOpen, 
  Server, 
  Brain, 
  Terminal as TerminalIcon,
  Code,
  Zap,
  Database,
  Layers,
  BookOpen
} from 'lucide-react'

// Import tab components
import { ProjectsTab } from '../tabs/projects-tab'
import { TechnologiesTab } from '../tabs/technologies-tab'
import { CLITutorialTab } from '../tabs/cli-tutorial-tab'
import { DevOpsTab } from '../tabs/devops-tab'
import { AIDemoTab } from '../tabs/ai-demo-tab'

// Placeholder components for remaining tabs

// All tabs are now implemented with their actual components

interface UnifiedTerminalProps {
  className?: string
  initialTab?: string
  onClose?: () => void
}

export function UnifiedTerminal({ 
  className = '', 
  initialTab = 'hero',
  onClose 
}: UnifiedTerminalProps) {
  const {
    state,
    lines,
    activeTabId,
    setActiveTabId,
    addLine,
    clearLines,
    updateState,
    addToHistory,
    getPrompt
  } = useTerminalState()

  const [isBooting, setIsBooting] = useState(true)
  const [bootMessages] = useState([
    'Initializing Nassim\'s Portfolio Terminal...',
    'Loading system modules...',
    'Connecting to portfolio services...',
    'Mounting project repositories...',
    'Starting interactive shell...',
    'Welcome! Terminal ready for commands.'
  ])

  const terminalContentRef = useRef<HTMLDivElement>(null)

  // Utility function for smooth scroll to bottom
  const scrollToBottom = useCallback((extraSpace = 0) => {
    if (terminalContentRef.current) {
      const element = terminalContentRef.current
      const targetScroll = element.scrollHeight + extraSpace
      element.scrollTop = targetScroll
    }
  }, [])

  // Define tabs
  const tabs: TerminalTab[] = [
    {
      id: 'hero',
      name: 'Welcome',
      icon: Home,
      shortcut: 'Ctrl+1',
      component: HeroTab
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderOpen,
      shortcut: 'Ctrl+2',
      component: ProjectsTab
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: Server,
      shortcut: 'Ctrl+3',
      component: DevOpsTab
    },
    {
      id: 'ai-demo',
      name: 'AI Demo',
      icon: Brain,
      shortcut: 'Ctrl+4',
      component: AIDemoTab
    },
    {
      id: 'cli-tutorial',
      name: 'CLI Tutorial',
      icon: TerminalIcon,
      shortcut: 'Ctrl+5',
      component: CLITutorialTab
    },
    {
      id: 'technologies',
      name: 'Technologies',
      icon: Layers,
      shortcut: 'Ctrl+6',
      component: TechnologiesTab
    },
    {
      id: 'portfolio-terminal',
      name: 'Portfolio Terminal',
      icon: BookOpen,
      shortcut: 'Ctrl+7',
      component: CLITutorialTab
    }
  ]

  // Keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: '1',
      ctrlKey: true,
      action: () => setActiveTabId('hero'),
      description: 'Switch to Welcome tab'
    },
    {
      key: '2',
      ctrlKey: true,
      action: () => setActiveTabId('projects'),
      description: 'Switch to Projects tab'
    },
    {
      key: '3',
      ctrlKey: true,
      action: () => setActiveTabId('devops'),
      description: 'Switch to DevOps tab'
    },
    {
      key: '4',
      ctrlKey: true,
      action: () => setActiveTabId('ai-demo'),
      description: 'Switch to AI Demo tab'
    },
    {
      key: '5',
      ctrlKey: true,
      action: () => setActiveTabId('cli-tutorial'),
      description: 'Switch to CLI Tutorial tab'
    },
    {
      key: '6',
      ctrlKey: true,
      action: () => setActiveTabId('technologies'),
      description: 'Switch to Technologies tab'
    },
    {
      key: '7',
      ctrlKey: true,
      action: () => setActiveTabId('portfolio-terminal'),
      description: 'Switch to Portfolio Terminal tab'
    }
  ]

  useKeyboardShortcuts(shortcuts)

  // Auto-scroll when lines are added
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom()
    })
  }, [lines, scrollToBottom])

  // Boot sequence
  useEffect(() => {
    if (isBooting) {
      const bootSequence = async () => {
        for (let i = 0; i < bootMessages.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 800))
          addLine(bootMessages[i], i === bootMessages.length - 1 ? 'success' : 'info')
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsBooting(false)
        setActiveTabId(initialTab)
      }
      
      bootSequence()
    }
  }, [isBooting, bootMessages, addLine, initialTab, setActiveTabId])

  const handleCommand = (command: string) => {
    addLine(`${getPrompt()} ${command}`, 'command')
    addToHistory(command)
    
    // Handle global commands
    const cmd = command.toLowerCase().trim()
    
    switch (cmd) {
      case 'clear':
        clearLines()
        break
      case 'help':
        addLine('Available commands:', 'info')
        addLine('  clear    - Clear terminal', 'output')
        addLine('  help     - Show this help', 'output')
        addLine('  tabs     - List available tabs', 'output')
        addLine('  whoami   - Show current user', 'output')
        addLine('  pwd      - Show current directory', 'output')
        break
      case 'tabs':
        addLine('Available tabs:', 'info')
        tabs.forEach(tab => {
          addLine(`  ${tab.shortcut.padEnd(8)} - ${tab.name}`, 'output')
        })
        break
      case 'whoami':
        addLine(state.user, 'output')
        break
      case 'pwd':
        addLine(state.currentDirectory, 'output')
        break
      default:
        addLine(`Command not found: ${command}`, 'error')
        addLine('Type "help" for available commands', 'info')
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
  }

  const getAutocompleteOptions = (input: string) => {
    const commands = ['clear', 'help', 'tabs', 'whoami', 'pwd']
    return commands
      .filter(cmd => cmd.startsWith(input.toLowerCase()))
      .map(cmd => ({
        value: cmd,
        description: `Execute ${cmd} command`,
        type: 'command' as const
      }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl ${className}`}
      style={{ height: '600px' }}
      onClick={() => {
        // Focus the terminal input when container is clicked
        const input = document.querySelector('input[type="text"]') as HTMLInputElement
        if (input) input.focus()
      }}
    >
      {/* Terminal Header */}
      <TerminalHeader
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
        onClose={onClose}
        isConnected={state.isConnected}
      />

      {/* Terminal Content */}
      <div className="flex flex-col h-full">
        {/* Boot Sequence or Tab Content */}
        <div ref={terminalContentRef} className="flex-1 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
          <AnimatePresence mode="wait">
            {isBooting ? (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-6 bg-gray-900 font-mono text-sm"
              >
                <div className="space-y-2">
                  {lines.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${
                        line.type === 'success' ? 'text-green-400' :
                        line.type === 'error' ? 'text-red-400' :
                        line.type === 'warning' ? 'text-yellow-400' :
                        line.type === 'info' ? 'text-blue-400' :
                        'text-gray-300'
                      }`}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                {tabs.map((tab) => {
                  const TabComponent = tab.component
                  return (
                    <TabComponent
                      key={tab.id}
                      isActive={tab.id === activeTabId}
                      onCommand={handleCommand}
                      terminalState={state}
                    />
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Input */}
        {!isBooting && (
          <TerminalInput
            prompt={getPrompt()}
            onCommand={handleCommand}
            onTabComplete={getAutocompleteOptions}
            commandHistory={state.commandHistory}
            disabled={isBooting}
            onAutocompleteShow={() => {
              setTimeout(() => {
                scrollToBottom(200) // Add extra space for autocomplete
              }, 100)
            }}
            onAutocompleteHide={() => {
              setTimeout(() => {
                scrollToBottom()
              }, 50)
            }}
          />
        )}
      </div>
    </motion.div>
  )
}