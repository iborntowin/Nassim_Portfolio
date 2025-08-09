"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import { 
  Terminal as TerminalIcon, 
  Play, 
  Pause,
  RotateCcw,
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  ChevronRight,
  Code,
  Zap,
  BookOpen
} from 'lucide-react'

interface Command {
  id: string
  command: string
  description: string
  output: string[]
  type: "success" | "info" | "warning" | "error"
}

const commands: Command[] = [
  {
    id: "1",
    command: "npm create nassim-project my-app",
    description: "Create a new Nassim project",
    output: [
      "✓ Creating Nassim project in my-app...",
      "✓ Installing dependencies with npm...",
      "✓ Copied project files",
      "✓ Installed dependencies",
      "",
      "Success! Created my-app at /home/user/my-app",
      "",
      "Inside that directory, you can run several commands:",
      "  npm run dev     Starts the development server",
      "  npm run build   Builds the app for production",
      "",
      "Happy coding! 🚀"
    ],
    type: "success"
  },
  {
    id: "2", 
    command: "git clone https://github.com/nassim/portfolio.git",
    description: "Clone a portfolio template",
    output: [
      "Cloning into 'portfolio'...",
      "remote: Enumerating objects: 127, done.",
      "remote: Counting objects: 100% (127/127), done.",
      "remote: Compressing objects: 100% (89/89), done.",
      "remote: Total 127 (delta 38), reused 127 (delta 38), pack-reused 0",
      "Receiving objects: 100% (127/127), 2.34 MiB | 4.12 MiB/s, done.",
      "Resolving deltas: 100% (38/38), done.",
      "",
      "Repository cloned successfully! 📂"
    ],
    type: "info"
  },
  {
    id: "3",
    command: "docker-compose up -d",
    description: "Start development environment",
    output: [
      "Creating network \"portfolio_default\" with the default driver",
      "Creating portfolio_database_1 ... done",
      "Creating portfolio_redis_1    ... done",
      "Creating portfolio_app_1      ... done",
      "",
      "⚠️  Warning: Some containers may take a few moments to initialize",
      "",
      "✓ All services started successfully",
      "✓ Application available at http://localhost:3000",
      "✓ Database ready for connections"
    ],
    type: "warning"
  },
  {
    id: "4",
    command: "npm run test",
    description: "Run test suite",
    output: [
      "$ jest --coverage",
      "",
      "FAIL src/components/Button.test.tsx",
      "  ✕ should render correctly (12ms)",
      "",
      "  ● Button › should render correctly",
      "",
      "    TypeError: Cannot read property 'onClick' of undefined",
      "      at Button (src/components/Button.tsx:15:23)",
      "",
      "Test Suites: 1 failed, 2 passed, 3 total",
      "Tests:       1 failed, 8 passed, 9 total",
      "",
      "❌ Tests failed - fix issues before deploying"
    ],
    type: "error"
  },
  {
    id: "5",
    command: "kubectl get pods --all-namespaces",
    description: "Check Kubernetes cluster status",
    output: [
      "NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE",
      "kube-system   coredns-558bd4d5db-8k7qm           1/1     Running   0          5d",
      "kube-system   coredns-558bd4d5db-qx2rt           1/1     Running   0          5d",
      "kube-system   etcd-minikube                      1/1     Running   0          5d",
      "kube-system   kube-apiserver-minikube            1/1     Running   0          5d",
      "kube-system   kube-controller-manager-minikube   1/1     Running   0          5d",
      "kube-system   kube-proxy-7xvqb                   1/1     Running   0          5d",
      "kube-system   kube-scheduler-minikube            1/1     Running   0          5d",
      "production    web-app-deployment-7d4b8c5f-2x9k8  1/1     Running   0          2d",
      "production    web-app-deployment-7d4b8c5f-9m3n7  1/1     Running   0          2d",
      "",
      "✓ All pods are running successfully"
    ],
    type: "success"
  }
]

export function CLITutorialTab({ isActive }: TerminalTabProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [showCursor, setShowCursor] = useState(true)

  const currentCommand = commands[currentCommandIndex]

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isActive || !isPlaying) return

    if (currentCommand && currentOutputIndex === 0) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
        typeOutput()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentCommandIndex, isPlaying, isActive])

  const typeOutput = () => {
    if (currentOutputIndex < currentCommand.output.length) {
      const timeout = setTimeout(() => {
        setCurrentOutputIndex(prev => prev + 1)
      }, Math.random() * 200 + 100)

      return () => clearTimeout(timeout)
    }
  }

  useEffect(() => {
    if (currentOutputIndex > 0 && currentOutputIndex < currentCommand.output.length) {
      typeOutput()
    }
  }, [currentOutputIndex])

  const handleNextCommand = () => {
    if (currentCommandIndex < commands.length - 1) {
      setCommandHistory(prev => [...prev, currentCommand])
      setCurrentCommandIndex(prev => prev + 1)
      setCurrentOutputIndex(0)
    } else {
      // Reset to beginning
      setCommandHistory([])
      setCurrentCommandIndex(0)
      setCurrentOutputIndex(0)
    }
  }

  const handleReset = () => {
    setCommandHistory([])
    setCurrentCommandIndex(0)
    setCurrentOutputIndex(0)
    setIsPlaying(false)
    setIsTyping(false)
  }

  const getTypeIcon = (type: Command["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />
    }
  }

  const getOutputColor = (line: string) => {
    if (line.includes("✓") || line.includes("Success")) return "text-green-400"
    if (line.includes("❌") || line.includes("FAIL") || line.includes("failed")) return "text-red-500"
    if (line.includes("⚠️") || line.includes("Warning")) return "text-yellow-400"
    if (line.includes("Creating") || line.includes("Cloning") || line.includes("http://")) return "text-blue-400"
    if (line.includes("NAMESPACE") || line.includes("NAME")) return "text-cyan-400"
    return "text-gray-300"
  }

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Interactive Portfolio Terminal</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isPlaying ? 'Pause' : 'Auto Play'}
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
        
        <TerminalSlideIn delay={0.1}>
          <TypewriterText 
            text="Experience the development workflow with interactive CLI demonstrations. See how modern tooling and best practices come together in real-time."
            speed={20}
            className="text-gray-400 text-sm"
          />
        </TerminalSlideIn>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Tutorial Content */}
        <div className="h-full flex">
          {/* Terminal Simulation */}
          <div className="flex-1 flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-300 text-sm font-mono">nassim@terminal</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Command {currentCommandIndex + 1} of {commands.length}</span>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(currentCommand?.type)}
                  <span className="text-sm text-white">{currentCommand?.description}</span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <motion.div
                  className="h-1 bg-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentCommandIndex + (currentOutputIndex / (currentCommand?.output.length || 1))) / commands.length) * 100}%` 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-900 font-mono text-sm">
              {/* Command History */}
              {commandHistory.map((cmd, index) => (
                <div key={cmd.id} className="mb-6">
                  <div className="flex items-center gap-1 text-white mb-2">
                    <span className="text-blue-400">$</span>
                    <span>{cmd.command}</span>
                  </div>
                  {cmd.output.map((line, lineIndex) => (
                    <div key={lineIndex} className={`${getOutputColor(line)} leading-relaxed`}>
                      {line || "\u00A0"}
                    </div>
                  ))}
                </div>
              ))}

              {/* Current Command */}
              {currentCommand && (
                <div>
                  <div className="flex items-center gap-1 text-white mb-2">
                    <span className="text-blue-400">$</span>
                    <span>{currentCommand.command}</span>
                    {isTyping && showCursor && <span className="animate-pulse text-blue-400">|</span>}
                  </div>
                  
                  {/* Current Output */}
                  {!isTyping && (
                    <div className="space-y-0">
                      {currentCommand.output.slice(0, currentOutputIndex).map((line, lineIndex) => (
                        <motion.div
                          key={lineIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.1 }}
                          className={`${getOutputColor(line)} leading-relaxed`}
                        >
                          {line || "\u00A0"}
                        </motion.div>
                      ))}
                      {currentOutputIndex < currentCommand.output.length && showCursor && (
                        <span className="animate-pulse text-blue-400">|</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
              <button
                onClick={handleNextCommand}
                disabled={isTyping || currentOutputIndex < (currentCommand?.output.length || 0)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-all duration-200 flex items-center justify-center gap-2"
              >
                {currentCommandIndex === commands.length - 1 ? (
                  "Start Over"
                ) : (
                  <>
                    Try Next Command
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tutorial Guide */}
          <div className="w-80 border-l border-gray-700 bg-gray-800/30">
            <div className="p-4 border-b border-gray-700">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Tutorial Guide
              </h4>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="text-sm">
                <h5 className="text-white font-medium mb-2">What you'll learn:</h5>
                <ul className="space-y-1 text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    Project scaffolding with npm
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Git repository management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    Docker containerization
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                    Testing and debugging
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    Kubernetes deployment
                  </li>
                </ul>
              </div>

              <div className="text-sm">
                <h5 className="text-white font-medium mb-2">Commands covered:</h5>
                <div className="space-y-2">
                  {commands.map((cmd, index) => (
                    <div 
                      key={cmd.id}
                      className={`p-2 rounded text-xs ${
                        index === currentCommandIndex 
                          ? 'bg-blue-600/20 border border-blue-500/30' 
                          : index < currentCommandIndex 
                            ? 'bg-green-600/20 border border-green-500/30'
                            : 'bg-gray-700/50 border border-gray-600/30'
                      }`}
                    >
                      <div className="font-mono text-white truncate">
                        {cmd.command.split(' ')[0]}
                      </div>
                      <div className="text-gray-400 mt-1">
                        {cmd.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <h5 className="text-white font-medium mb-2">Tips:</h5>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Use Auto Play for continuous demonstration</li>
                  <li>• Click "Try Next Command" to proceed manually</li>
                  <li>• Reset anytime to start over</li>
                  <li>• Each command shows real-world output</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}