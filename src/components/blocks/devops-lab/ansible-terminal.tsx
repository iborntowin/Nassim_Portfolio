"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Terminal, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnsibleTask {
  name: string
  module: string
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped'
  duration?: number
  output?: string[]
  changed?: boolean
}

const ansiblePlaybook: AnsibleTask[] = [
  {
    name: "Gathering Facts",
    module: "setup",
    status: 'pending',
    output: ["Gathering facts from target hosts..."]
  },
  {
    name: "Update package cache",
    module: "apt",
    status: 'pending',
    output: ["Reading package lists...", "Building dependency tree..."]
  },
  {
    name: "Install Docker",
    module: "apt",
    status: 'pending',
    output: ["Installing docker.io...", "Setting up docker.io (20.10.21)..."]
  },
  {
    name: "Start Docker service",
    module: "systemd",
    status: 'pending',
    output: ["Starting docker.service...", "Docker daemon started successfully"]
  },
  {
    name: "Create application directory",
    module: "file",
    status: 'pending',
    output: ["Creating /opt/portfolio-app directory..."]
  },
  {
    name: "Deploy application configuration",
    module: "template",
    status: 'pending',
    output: ["Templating docker-compose.yml...", "Configuration deployed successfully"]
  },
  {
    name: "Pull Docker images",
    module: "docker_compose",
    status: 'pending',
    output: ["Pulling nginx:alpine...", "Pulling node:18-alpine...", "Images pulled successfully"]
  },
  {
    name: "Deploy microservices",
    module: "docker_compose",
    status: 'pending',
    output: ["Starting portfolio-frontend...", "Starting portfolio-api...", "Starting nginx-proxy..."]
  },
  {
    name: "Configure load balancer",
    module: "template",
    status: 'pending',
    output: ["Configuring nginx upstream...", "Reloading nginx configuration..."]
  },
  {
    name: "Verify deployment health",
    module: "uri",
    status: 'pending',
    output: ["Checking https://nassimmaaouia.dev/health...", "Health check passed ✓"]
  }
]

const getStatusIcon = (status: AnsibleTask['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-400" />
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-400" />
    case 'running':
      return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
    case 'skipped':
      return <div className="w-4 h-4 rounded-full bg-gray-500" />
    default:
      return <div className="w-4 h-4 rounded-full bg-gray-600" />
  }
}

const getStatusColor = (status: AnsibleTask['status']) => {
  switch (status) {
    case 'success':
      return 'text-green-400'
    case 'failed':
      return 'text-red-400'
    case 'running':
      return 'text-yellow-400'
    case 'skipped':
      return 'text-gray-400'
    default:
      return 'text-gray-500'
  }
}

export default function AnsibleTerminal() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1)
  const [tasks, setTasks] = useState<AnsibleTask[]>(ansiblePlaybook)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [showStats, setShowStats] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const resetPlaybook = () => {
    setIsRunning(false)
    setCurrentTaskIndex(-1)
    setShowStats(false)
    setTasks(ansiblePlaybook.map(task => ({ ...task, status: 'pending' })))
    setTerminalOutput([
      "PLAY [Deploy Portfolio Infrastructure] *****************************************",
      "",
      "TASK [Gathering Facts] *********************************************************"
    ])
  }

  const runPlaybook = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }

    setIsRunning(true)
    setShowStats(false)
    
    // Initialize terminal
    setTerminalOutput([
      "$ ansible-playbook -i inventory/production deploy-portfolio.yml",
      "",
      "PLAY [Deploy Portfolio Infrastructure] *****************************************",
      ""
    ])

    for (let i = 0; i < tasks.length; i++) {
      if (!isRunning) break

      setCurrentTaskIndex(i)
      
      // Update task status to running
      setTasks(prev => prev.map((task, index) => 
        index === i ? { ...task, status: 'running' } : task
      ))

      // Add task header to terminal
      setTerminalOutput(prev => [
        ...prev,
        `TASK [${tasks[i].name}] ${'*'.repeat(50 - tasks[i].name.length)}`
      ])

      // Simulate task execution time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Add task output
      if (tasks[i].output) {
        for (const line of tasks[i].output) {
          setTerminalOutput(prev => [...prev, `${line}`])
          await new Promise(resolve => setTimeout(resolve, 200))
        }
      }

      // Determine success/failure (90% success rate)
      const success = Math.random() > 0.1
      const status = success ? 'success' : 'failed'
      const changed = success && Math.random() > 0.3

      // Update task status
      setTasks(prev => prev.map((task, index) => 
        index === i ? { 
          ...task, 
          status, 
          changed,
          duration: Math.round((1500 + Math.random() * 1000) / 1000 * 100) / 100
        } : task
      ))

      // Add result to terminal
      const changeStatus = changed ? 'changed' : 'ok'
      const resultColor = success ? 'text-green-400' : 'text-red-400'
      setTerminalOutput(prev => [
        ...prev,
        success 
          ? `${changed ? 'changed' : 'ok'}: [production-server]`
          : `fatal: [production-server]: FAILED!`,
        ""
      ])

      if (!success) {
        setIsRunning(false)
        setTerminalOutput(prev => [
          ...prev,
          "PLAY RECAP *********************************************************************",
          "production-server : ok=0    changed=0    unreachable=0    failed=1    skipped=0    rescued=0    ignored=0",
          "",
          "❌ Playbook execution failed!"
        ])
        return
      }
    }

    // Playbook completed successfully
    setIsRunning(false)
    setShowStats(true)
    const successCount = tasks.filter(t => t.status === 'success').length
    const changedCount = tasks.filter(t => t.changed).length
    
    setTerminalOutput(prev => [
      ...prev,
      "PLAY RECAP *********************************************************************",
      `production-server : ok=${successCount}    changed=${changedCount}    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0`,
      "",
      "✅ Portfolio infrastructure deployed successfully!",
      "🚀 Application available at: https://nassimmaaouia.dev",
      "📊 Monitoring dashboard: https://grafana.nassimmaaouia.dev"
    ])
  }

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  useEffect(() => {
    resetPlaybook()
  }, [])

  return (
    <div className="bg-[#0d1117] rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm font-mono">ansible-playbook</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={runPlaybook}
            disabled={currentTaskIndex >= 0 && currentTaskIndex < tasks.length - 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Deploy Infrastructure
              </>
            )}
          </Button>
          
          <Button
            onClick={resetPlaybook}
            className="px-4 py-2 text-sm font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Task List */}
        <div className="lg:col-span-1 bg-[#0d1117] border-r border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            Ansible Tasks
          </h3>
          
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  index === currentTaskIndex
                    ? 'bg-blue-500/10 border border-blue-500/20'
                    : index < currentTaskIndex
                    ? 'bg-gray-800/50'
                    : 'bg-gray-900/30'
                }`}
              >
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.name}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {task.module}
                    {task.duration && (
                      <span className="ml-2">({task.duration}s)</span>
                    )}
                  </div>
                </div>
                {task.changed && (
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                    changed
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <h4 className="text-sm font-semibold text-green-400 mb-2">Deployment Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-300">
                    <span className="text-green-400">{tasks.filter(t => t.status === 'success').length}</span> successful
                  </div>
                  <div className="text-gray-300">
                    <span className="text-orange-400">{tasks.filter(t => t.changed).length}</span> changed
                  </div>
                  <div className="text-gray-300">
                    <span className="text-red-400">{tasks.filter(t => t.status === 'failed').length}</span> failed
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400">{tasks.filter(t => t.status === 'skipped').length}</span> skipped
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Output */}
        <div className="lg:col-span-2 bg-[#0d1117]">
          <div
            ref={terminalRef}
            className="h-96 lg:h-[500px] overflow-y-auto p-4 font-mono text-sm"
          >
            <AnimatePresence>
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  className={`mb-1 ${
                    line.includes('TASK [') ? 'text-blue-400 font-semibold' :
                    line.includes('PLAY [') ? 'text-purple-400 font-semibold' :
                    line.includes('PLAY RECAP') ? 'text-yellow-400 font-semibold' :
                    line.includes('✅') ? 'text-green-400 font-semibold' :
                    line.includes('❌') ? 'text-red-400 font-semibold' :
                    line.includes('🚀') ? 'text-blue-400' :
                    line.includes('📊') ? 'text-purple-400' :
                    line.includes('changed:') ? 'text-orange-400' :
                    line.includes('ok:') ? 'text-green-400' :
                    line.includes('fatal:') ? 'text-red-400' :
                    line.includes('failed=') ? 'text-red-400' :
                    'text-gray-300'
                  }`}
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isRunning && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-green-400"
              >
                ▊
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}