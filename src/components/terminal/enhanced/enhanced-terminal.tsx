"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Maximize2, Minimize2, X, Zap, Crown } from 'lucide-react'
import { MatrixRain } from './matrix-rain'
import { LegendModeOverlay } from '../effects/legend-mode-overlay'

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system'
  content: string
  timestamp: number
}

const ENHANCED_COMMANDS = {
  help: {
    description: 'Show available commands',
    handler: () => [
      '',
      '🚀 NASSIM\'S CLOUD ENGINEER CONSOLE - ENHANCED EDITION',
      '═══════════════════════════════════════════════════════════════',
      '',
      '📁 NAVIGATION & SYSTEM:',
      '  help                 - Show this help message',
      '  clear, cls           - Clear terminal screen',
      '  whoami              - Display current user info',
      '  pwd                 - Show current directory',
      '  ls                  - List directory contents',
      '  cat resume          - Display resume/CV',
      '  ps                  - Show running processes',
      '  uptime              - Show system uptime',
      '  free -h             - Show memory usage',
      '  df -h               - Show disk usage',
      '',
      '🚀 PROJECTS & PORTFOLIO:',
      '  projects            - List all projects',
      '  view <project>      - View project details',
      '  deploy <project>    - Simulate project deployment',
      '  status <project>    - Check project status',
      '',
      '☁️  CLOUD & DEVOPS:',
      '  kubectl get pods    - Show Kubernetes pods',
      '  kubectl get services - Show Kubernetes services',
      '  terraform plan      - Show infrastructure plan',
      '  ansible-playbook    - Run automation playbook',
      '  docker ps           - List running containers',
      '  helm list           - List Helm releases',
      '  aws ec2 describe-instances - List EC2 instances',
      '  monitor             - Show system monitoring',
      '  logs <service>      - View service logs',
      '',
      '🧠 AI & SKILLS:',
      '  skills [category]   - Show technical skills',
      '  ai <message>        - Chat with AI assistant',
      '  train <model>       - Simulate model training',
      '  inference <model>   - Run model inference',
      '',
      '🎮 FUN & EASTER EGGS:',
      '  sudo become-legend  - Activate legend mode',
      '  matrix              - Enter the matrix',
      '  hack-the-planet     - Elite hacker mode',
      '  coffee              - Brew some coffee',
      '',
      '💡 TIP: Use Tab for auto-completion, ↑↓ for history',
      '💡 TIP: Try "sudo become-legend" for a surprise!',
      ''
    ]
  },

  clear: {
    description: 'Clear the terminal screen',
    handler: () => ({ action: 'clear' })
  },

  whoami: {
    description: 'Display current user information',
    handler: () => [
      'nassim@cloud-console',
      '',
      '👨‍💻 Nassim Maaoui - Cloud Engineer & DevOps Architect',
      '🌍 Location: Tunisia',
      '🚀 Specialization: Cloud-Native Systems, AI/ML, Automation',
      '⚡ Current Status: Building the future, one deployment at a time',
      '',
      '📊 Quick Stats:',
      '  • 25+ Projects Deployed',
      '  • 99.9% Uptime Achieved',
      '  • 2.1k+ GitHub Stars',
      '  • 5+ Years Experience',
      ''
    ]
  },

  projects: {
    description: 'List all projects',
    handler: () => [
      '',
      '📁 ACTIVE PROJECTS REPOSITORY',
      '═══════════════════════════════════════════════════════════════',
      '',
      '📦 Cession App                    DEPLOYED    ⭐ 194',
      '   Session & Contract Management Platform',
      '   Tech: Spring Boot, Svelte, PostgreSQL, JWT',
      '',
      '📦 Board-AI                       DEPLOYED    ⭐ 271',
      '   CNN-based Electronic Component Detection',
      '   Tech: Python, TensorFlow, OpenCV, TensorRT',
      '   Performance: 92% accuracy, 120ms inference',
      '',
      '📦 NanoSat Comm                   DEPLOYED    ⭐ 305',
      '   Optimized LoRaWAN Communication Module',
      '   Tech: C++, STM32, LoRaWAN, Embedded',
      '   Performance: 1.2 Mbps, 5 platforms',
      '',
      '📦 GoldenTouch                    DEPLOYED    ⭐ 221',
      '   AI-Powered Event Management Platform',
      '   Tech: Symfony, JavaFX, Hugging Face, AI',
      '',
      '💡 Use "view <project-name>" for detailed information',
      '💡 Use "deploy <project-name>" to simulate deployment',
      ''
    ]
  },

  'kubectl get pods': {
    description: 'Show Kubernetes pods',
    handler: () => [
      '',
      'NAME                                READY   STATUS    RESTARTS   AGE',
      'cession-app-7d4b8c5f-2x9k8         1/1     Running   0          2d',
      'cession-app-7d4b8c5f-9m3n7         1/1     Running   0          2d',
      'board-ai-deployment-6b8f9d-4k2l1   1/1     Running   0          1d',
      'goldentouch-api-5c7d8e-3j9m2       1/1     Running   0          3h',
      'redis-cache-8f2a1b-7n5k9           1/1     Running   0          5d',
      'postgres-db-9e3c2d-6h8j4           1/1     Running   0          5d',
      'nginx-ingress-controller-xyz123    1/1     Running   0          7d',
      'prometheus-server-abc456           1/1     Running   0          7d',
      '',
      '✅ All pods are running successfully',
      '📊 Cluster health: OPTIMAL'
    ]
  },

  'docker ps': {
    description: 'List running containers',
    handler: () => [
      '',
      'CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS                    NAMES',
      '7f8a9b2c3d4e   cession-app:latest      "java -jar app.jar"      Up 2 days      0.0.0.0:8080->8080/tcp   cession-app',
      '1e2f3a4b5c6d   postgres:13             "docker-entrypoint.s…"   Up 5 days      0.0.0.0:5432->5432/tcp   postgres-db',
      '9g8h7i6j5k4l   redis:alpine            "docker-entrypoint.s…"   Up 5 days      0.0.0.0:6379->6379/tcp   redis-cache',
      '3m4n5o6p7q8r   nginx:alpine            "/docker-entrypoint.…"   Up 3 days      0.0.0.0:80->80/tcp       nginx-proxy',
      '',
      '📦 4 containers running',
      '💾 Total memory usage: 2.1GB'
    ]
  },

  monitor: {
    description: 'System monitoring dashboard',
    handler: () => [
      '',
      '📊 SYSTEM MONITORING DASHBOARD',
      '═══════════════════════════════════════════════════════════════',
      '',
      '🖥️  System Information:',
      '   OS: Ubuntu 22.04 LTS (Cloud Engineer Edition)',
      '   Kernel: 5.15.0-cloud-optimized',
      '   Uptime: 42 days, 13:37:42',
      '',
      '⚡ Performance Metrics:',
      '   CPU Usage:    [████████░░] 78%',
      '   Memory:       [██████░░░░] 64% (12.8GB / 20GB)',
      '   Disk I/O:     [███░░░░░░░] 32%',
      '   Network:      [██████████] 95% (1.2 Gbps)',
      '',
      '🚀 Active Services:',
      '   ✅ Kubernetes Cluster    (3 nodes, 47 pods)',
      '   ✅ Docker Engine         (12 containers)',
      '   ✅ PostgreSQL            (5 databases)',
      '   ✅ Redis Cache           (2.1GB cached)',
      '   ✅ Nginx Load Balancer   (99.9% uptime)',
      '',
      '📈 Recent Activity:',
      '   • Deployed cession-app v2.1.0 (2 hours ago)',
      '   • Scaled board-ai replicas to 5 (4 hours ago)',
      '   • Updated security patches (1 day ago)',
      '',
      '🎯 Performance Score: 94/100 (Excellent)',
      ''
    ]
  },

  'sudo become-legend': {
    description: 'Activate legend mode',
    handler: () => ({
      action: 'legend',
      output: [
        '',
        '🌟 LEGEND MODE ACTIVATED 🌟',
        '',
        '    ⚡ POWER LEVEL: OVER 9000! ⚡',
        '',
        '  🚀 You are now operating at maximum capacity',
        '  🧠 Neural networks optimized',
        '  ☁️  Cloud resources unlimited',
        '  🔥 Deployment speed: LUDICROUS',
        '',
        '  Welcome to the elite tier, Cloud Legend! 👑',
        '',
        '  💡 Pro tip: With great power comes great responsibility',
        '     Use your newfound abilities wisely...',
        ''
      ]
    })
  },

  matrix: {
    description: 'Enter the matrix',
    handler: () => ({
      action: 'matrix',
      output: [
        '',
        '🔴 ENTERING THE MATRIX... 🔴',
        '',
        '01001000 01100101 01101100 01101100 01101111',
        '01001110 01100101 01101111',
        '',
        '👁️  Wake up, Neo...',
        '💊 The Matrix has you...',
        '🕳️  Follow the white rabbit...',
        '',
        '🌐 Reality.exe has stopped working',
        '🔄 Loading alternative reality...',
        '',
        '✅ Welcome to the real world.',
        ''
      ]
    })
  },

  coffee: {
    description: 'Brew some coffee',
    handler: () => [
      '',
      '☕ BREWING COFFEE...',
      '',
      '🫘 Grinding premium beans...',
      '💧 Heating water to optimal temperature...',
      '⏱️  Extracting perfect espresso...',
      '',
      '✅ Your coffee is ready!',
      '',
      '🧠 +20 Focus',
      '⚡ +15 Energy',
      '💻 +10 Coding Speed',
      '',
      '☕ Enjoy your fuel for innovation!',
      ''
    ]
  }
}

export function EnhancedTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [legendMode, setLegendMode] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lineIdCounter = useRef(0)

  // Robust focus restoration function
  const restoreFocus = useCallback(() => {
    const focusAttempts = [50, 100, 200, 300, 500, 1000]
    
    focusAttempts.forEach(delay => {
      setTimeout(() => {
        if (inputRef.current && !isProcessing) {
          inputRef.current.focus()
        }
      }, delay)
    })
  }, [isProcessing])

  // Utility function for smooth scroll to bottom
  const scrollToBottom = useCallback((extraSpace = 0) => {
    if (terminalRef.current) {
      const element = terminalRef.current
      
      // Force immediate scroll to bottom with extra space
      element.scrollTop = element.scrollHeight + extraSpace
      
      // Use requestAnimationFrame for smoother follow-up
      requestAnimationFrame(() => {
        if (element) {
          element.scrollTop = element.scrollHeight + extraSpace
          
          // Additional scroll attempt
          setTimeout(() => {
            element.scrollTop = element.scrollHeight + extraSpace
          }, 10)
        }
      })
      
      // Also try scrollIntoView as a fallback
      const lastChild = element.lastElementChild
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }, [])

  const addLine = useCallback((
    content: string, 
    type: TerminalLine['type'] = 'output'
  ) => {
    const newLine: TerminalLine = {
      id: `line-${++lineIdCounter.current}-${Date.now()}`,
      type,
      content,
      timestamp: Date.now()
    }
    setLines(prev => [...prev, newLine])
  }, [])

  // Set mounted state and add global focus management
  useEffect(() => {
    setIsMounted(true)
    
    // Global focus management
    const handleGlobalClick = (e: MouseEvent) => {
      // If clicking inside the terminal, ensure input is focused
      if (terminalRef.current?.contains(e.target as Node)) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 10)
      }
    }
    
    document.addEventListener('click', handleGlobalClick)
    
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  // Boot sequence
  useEffect(() => {
    if (!isMounted) return
    
    const bootSequence = async () => {
      const bootMessages = [
        'Initializing Enhanced Cloud Engineer Console...',
        'Loading advanced terminal modules... OK',
        'Connecting to cloud infrastructure... OK',
        'Mounting project repositories... OK',
        'Starting AI subsystems... OK',
        'Establishing secure connections... OK',
        'System ready. Welcome, Cloud Engineer!'
      ]

      for (let i = 0; i < bootMessages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400))
        addLine(bootMessages[i], i === bootMessages.length - 1 ? 'success' : 'info')
      }

      await new Promise(resolve => setTimeout(resolve, 500))
      addLine('', 'output')
      addLine('╔═══════════════════════════════════════════════════════════════════════════════╗', 'system')
      addLine('║                                                                               ║', 'system')
      addLine('║    ███╗   ██╗ █████╗ ███████╗███████╗██╗███╗   ███╗    ███╗   ███╗ █████╗     ║', 'system')
      addLine('║    ████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗ ████║    ████╗ ████║██╔══██╗    ║', 'system')
      addLine('║    ██╔██╗ ██║███████║███████╗███████╗██║██╔████╔██║    ██╔████╔██║███████║    ║', 'system')
      addLine('║    ██║╚██╗██║██╔══██║╚════██║╚════██║██║██║╚██╔╝██║    ██║╚██╔╝██║██╔══██║    ║', 'system')
      addLine('║    ██║ ╚████║██║  ██║███████║███████║██║██║ ╚═╝ ██║    ██║ ╚═╝ ██║██║  ██║    ║', 'system')
      addLine('║    ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝    ║', 'system')
      addLine('║                                                                               ║', 'system')
      addLine('║                    🚀 ENHANCED CLOUD ENGINEER CONSOLE 🚀                     ║', 'system')
      addLine('║                                                                               ║', 'system')
      addLine('╚═══════════════════════════════════════════════════════════════════════════════╝', 'system')
      addLine('', 'output')
      addLine('🚀 Welcome to the Enhanced Cloud Engineer Command Console!', 'success')
      addLine('💡 Type "help" to see available commands', 'info')
      addLine('💡 Try "sudo become-legend" for a surprise!', 'info')
      addLine('', 'output')
      
      setIsBooting(false)
      inputRef.current?.focus()
    }

    bootSequence()
  }, [addLine, isMounted])

  // Auto-scroll to bottom and maintain focus
  useEffect(() => {
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      scrollToBottom()
    })
    // Ensure input stays focused with multiple attempts
    if (!isBooting && !isProcessing && inputRef.current) {
      inputRef.current.focus()
      setTimeout(() => inputRef.current?.focus(), 50)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [lines, isBooting, isProcessing, scrollToBottom])

  const executeCommand = useCallback(async (command: string) => {
    if (!command.trim()) return

    setIsProcessing(true)
    addLine(`nassim@cloud-console:~$ ${command}`, 'command')
    
    // Add to history
    const newHistory = [...commandHistory.filter(h => h !== command), command]
    setCommandHistory(newHistory)
    setHistoryIndex(-1)

    const cmd = command.toLowerCase().trim()
    
    // Check for multi-word commands first
    let commandHandler = ENHANCED_COMMANDS[cmd as keyof typeof ENHANCED_COMMANDS]
    
    // If not found, try to find multi-word commands
    if (!commandHandler) {
      const multiWordCommands = Object.keys(ENHANCED_COMMANDS).filter(key => key.includes(' '))
      for (const multiWordCmd of multiWordCommands) {
        if (cmd.startsWith(multiWordCmd)) {
          commandHandler = ENHANCED_COMMANDS[multiWordCmd as keyof typeof ENHANCED_COMMANDS]
          break
        }
      }
    }

    if (commandHandler) {
      const result = commandHandler.handler()
      
      if (typeof result === 'object' && result.action) {
        if (result.action === 'clear') {
          setLines([])
          setIsProcessing(false)
          return
        }
        
        if (result.action === 'legend') {
          setLegendMode(true)
          // LegendModeOverlay will handle its own timing and call onComplete
        }
        
        if (result.action === 'matrix') {
          setShowMatrix(true)
          setTimeout(() => setShowMatrix(false), 5000)
        }
        
        if (result.output) {
          result.output.forEach(line => addLine(line, 'success'))
        }
      } else if (Array.isArray(result)) {
        result.forEach(line => addLine(line, 'output'))
      }
    } else {
      addLine(`Command not found: ${command}`, 'error')
      addLine('Type "help" for available commands', 'info')
    }

    setIsProcessing(false)
    
    // Restore focus and scroll to bottom after command execution
    restoreFocus()
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, [commandHistory, addLine])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (currentInput.trim()) {
          executeCommand(currentInput.trim())
          setCurrentInput('')
          // Robust focus restoration
          restoreFocus()
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
        
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault()
          setLines([])
        }
        break
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand])

  if (!isMounted) {
    return (
      <div className="relative h-screen w-full bg-black text-green-400 font-mono overflow-hidden flex items-center justify-center">
        <div className="text-green-400 text-lg">Initializing enhanced terminal...</div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full bg-black text-green-400 font-mono overflow-hidden">
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div className="h-full w-full bg-black/80">
              <MatrixRain />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-green-400 text-2xl font-bold animate-pulse bg-black/50 px-6 py-3 rounded-lg border border-green-400/30">
                  ENTERING THE MATRIX...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`h-full flex flex-col ${isMounted && legendMode ? 'border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20' : ''}`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <Terminal className="w-4 h-4 text-green-400 ml-2" />
            <span className="text-green-400 text-sm">
              Enhanced Cloud Engineer Console
              {legendMode && <Crown className="w-4 h-4 text-yellow-400 inline ml-2" />}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 bg-black/95 backdrop-blur-sm"
          style={{ scrollBehavior: 'smooth' }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Lines */}
          <div className="space-y-1">
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
                  line.type === 'command' ? 'text-white' :
                  line.type === 'system' ? 'text-cyan-400' :
                  'text-gray-300'
                } ${legendMode ? 'text-shadow-lg' : ''}`}
              >
                {line.content}
              </motion.div>
            ))}
          </div>

          {/* Current Input Line */}
          {!isBooting && (
            <div className="flex items-center mt-2">
              <span className={`text-green-400 mr-2 ${legendMode ? 'text-yellow-400' : ''}`}>
                nassim@cloud-console:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  // Ensure input area is visible when focused
                  setTimeout(() => scrollToBottom(), 100)
                }}
                className={`flex-1 bg-transparent outline-none ${
                  legendMode ? 'text-yellow-400' : 'text-green-400'
                } ${isProcessing ? 'opacity-50' : ''}`}
                disabled={isProcessing}
                autoFocus
              />
              {isProcessing && (
                <div className="ml-2">
                  <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Legend Mode Overlay */}
      <LegendModeOverlay
        isActive={legendMode}
        onComplete={() => setLegendMode(false)}
        duration={10000}
      />
    </div>
  )
}