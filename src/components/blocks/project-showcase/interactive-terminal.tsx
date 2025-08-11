"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Folder, FileText, Play, ExternalLink, Github } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  category: string
  techStack: { name: string; color: string }[]
  stats: { stars: number; forks: number; commits: number }
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'success'
  content: string
  timestamp: number
}

interface FileSystemNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileSystemNode[]
}

const projectFileSystems: Record<string, FileSystemNode[]> = {
  'cession-app': [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'main', type: 'folder', children: [
          { name: 'java', type: 'folder', children: [
            { name: 'CessionApplication.java', type: 'file', content: '@SpringBootApplication\npublic class CessionApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(CessionApplication.class, args);\n    }\n}' }
          ]},
          { name: 'resources', type: 'folder', children: [
            { name: 'application.yml', type: 'file', content: 'server:\n  port: 8080\nspring:\n  datasource:\n    url: jdbc:postgresql://localhost:5432/cession\n    username: ${DB_USER:admin}\n    password: ${DB_PASS:secret}' }
          ]}
        ]},
        { name: 'frontend', type: 'folder', children: [
          { name: 'App.svelte', type: 'file', content: '<script>\n  import SessionManager from "./SessionManager.svelte";\n  import ContractView from "./ContractView.svelte";\n</script>\n\n<main>\n  <SessionManager />\n  <ContractView />\n</main>' }
        ]}
      ]
    },
    { name: 'docker-compose.yml', type: 'file', content: 'version: "3.8"\nservices:\n  app:\n    build: .\n    ports:\n      - "8080:8080"\n  postgres:\n    image: postgres:13\n    environment:\n      POSTGRES_DB: cession\n      POSTGRES_USER: admin\n      POSTGRES_PASSWORD: secret' },
    { name: 'README.md', type: 'file', content: '# Cession App\n\nA smart platform for managing session-based contracts with secure authentication, dynamic user roles, and audit trails.\n\n## Features\n- JWT Authentication\n- Role-based Access Control\n- Session Management\n- Contract Lifecycle\n- Audit Trails\n\n## Quick Start\n```bash\ndocker-compose up -d\n```' }
  ],
  'board-ai': [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'models', type: 'folder', children: [
          { name: 'cnn_model.py', type: 'file', content: 'import tensorflow as tf\nfrom tensorflow.keras import layers\n\nclass ComponentDetectionCNN:\n    def __init__(self, num_classes=50):\n        self.model = self.build_model(num_classes)\n    \n    def build_model(self, num_classes):\n        model = tf.keras.Sequential([\n            layers.Conv2D(32, 3, activation="relu"),\n            layers.MaxPooling2D(),\n            layers.Conv2D(64, 3, activation="relu"),\n            layers.MaxPooling2D(),\n            layers.Conv2D(64, 3, activation="relu"),\n            layers.GlobalAveragePooling2D(),\n            layers.Dense(64, activation="relu"),\n            layers.Dense(num_classes, activation="softmax")\n        ])\n        return model' }
        ]},
        { name: 'inference', type: 'folder', children: [
          { name: 'detector.py', type: 'file', content: 'import cv2\nimport numpy as np\nfrom .models.cnn_model import ComponentDetectionCNN\n\nclass PCBComponentDetector:\n    def __init__(self, model_path):\n        self.model = ComponentDetectionCNN()\n        self.model.load_weights(model_path)\n        self.inference_time = 0.120  # 120ms average\n    \n    def detect_components(self, image):\n        # Preprocess image\n        processed = cv2.resize(image, (224, 224))\n        processed = processed / 255.0\n        \n        # Run inference\n        predictions = self.model.predict(processed)\n        return predictions' }
        ]}
      ]
    },
    { name: 'requirements.txt', type: 'file', content: 'tensorflow==2.13.0\nopencv-python==4.8.0\nnumpy==1.24.3\ntensorrt==8.6.1\nmatplotlib==3.7.1\nscikit-learn==1.3.0' },
    { name: 'README.md', type: 'file', content: '# Board-AI: Electronic Component Detection\n\nTrained CNN model achieving 92% accuracy on 50,000+ PCB component images.\n\n## Performance\n- **Accuracy**: 92%\n- **Inference Time**: 120ms (with TensorRT)\n- **Dataset**: 50,000+ labeled PCB images\n- **Components**: 50+ different electronic components\n\n## Usage\n```python\nfrom src.inference.detector import PCBComponentDetector\n\ndetector = PCBComponentDetector("models/best_model.h5")\nresults = detector.detect_components(image)\n```' }
  ],
  'nanosatellite-comm': [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'lorawan', type: 'folder', children: [
          { name: 'lorawan_driver.cpp', type: 'file', content: '#include "lorawan_driver.h"\n#include <STM32L4xx.h>\n\nclass LoRaWANDriver {\npublic:\n    bool initialize() {\n        // Initialize SPI for LoRa module\n        HAL_SPI_Init(&hspi1);\n        \n        // Configure LoRa parameters\n        setFrequency(868000000); // EU868\n        setSpreadingFactor(7);\n        setBandwidth(125000);\n        \n        return true;\n    }\n    \n    int transmit(uint8_t* data, size_t length) {\n        // Optimized transmission achieving 1.2 Mbps\n        return HAL_SPI_Transmit(&hspi1, data, length, 1000);\n    }\n};' }
        ]},
        { name: 'power', type: 'folder', children: [
          { name: 'low_power.cpp', type: 'file', content: '#include "low_power.h"\n\nvoid enterLowPowerMode() {\n    // Disable unnecessary peripherals\n    __HAL_RCC_GPIOA_CLK_DISABLE();\n    __HAL_RCC_GPIOB_CLK_DISABLE();\n    \n    // Enter STOP mode\n    HAL_PWR_EnterSTOPMode(PWR_LOWPOWERREGULATOR_ON, PWR_STOPENTRY_WFI);\n}\n\nvoid optimizePowerConsumption() {\n    // 40% performance gain through power optimization\n    HAL_PWREx_EnableLowPowerRunMode();\n}' }
        ]}
      ]
    },
    { name: 'platformio.ini', type: 'file', content: '[env:nucleo_l476rg]\nplatform = ststm32\nboard = nucleo_l476rg\nframework = arduino\nlib_deps = \n    SPI\n    LoRa\n    LowPower\nbuild_flags = \n    -DLORAWAN_REGION_EU868\n    -DOPTIMIZED_POWER_MODE' },
    { name: 'README.md', type: 'file', content: '# Nanosatellite Communication System\n\nOptimized LoRaWAN communication module for nanosatellites.\n\n## Performance Achievements\n- **Data Rate**: 1.2 Mbps\n- **Performance Gain**: 40% improvement\n- **Platforms**: 5 different hardware platforms\n- **Power Efficiency**: Ultra-low power consumption\n\n## Supported Platforms\n- STM32L4 series\n- ESP32\n- Arduino Uno\n- Raspberry Pi Pico\n- Nordic nRF52\n\n## Build\n```bash\nplatformio run --target upload\n```' }
  ]
}

const validRepos = [
  'cession-app',
  'board-ai', 
  'nanosatellite-comm',
  'goldentouch',
  'neurovigil',
  'bridgetrack',
  'folder-lock',
  'sticky-notes',
  'listen-to-notes',
  'ml-anomaly-detection',
  'epma-platform'
]

export function InteractiveTerminal({ projects }: { projects: Project[] }) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  
  const [currentInput, setCurrentInput] = useState('')
  const [currentDirectory, setCurrentDirectory] = useState('~/technical-portfolio')
  const [clonedRepo, setClonedRepo] = useState<string | null>(null)
  const [fileSystem, setFileSystem] = useState<FileSystemNode[]>([])
  const [isInRepo, setIsInRepo] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (!isInitialized) {
      const generateWelcomeId = (index: number) => `welcome-${index}-${Date.now()}`
      
      const welcomeMessages: TerminalLine[] = [
        {
          id: generateWelcomeId(1),
          type: 'output',
          content: 'Welcome to Nassim\'s Interactive Portfolio Terminal!',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(2), 
          type: 'output',
          content: 'This is a fully interactive terminal - try typing commands!',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(3),
          type: 'success', 
          content: '💡 Quick Tutorial:',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(4),
          type: 'output', 
          content: '   • Type "git c" and press Tab to see auto-completion',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(5),
          type: 'output', 
          content: '   • Use ↑↓ arrows to navigate command history',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(6),
          type: 'output', 
          content: '   • Type "help" for all available commands',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(7),
          type: 'output', 
          content: '',
          timestamp: Date.now()
        },
        {
          id: generateWelcomeId(8),
          type: 'output', 
          content: 'Try: git clone https://github.com/nassimmaaoui/cession-app.git',
          timestamp: Date.now()
        }
      ]
      
      setLines(welcomeMessages)
      setIsInitialized(true)
    }
  }, [isInitialized])

  const generateUniqueId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const addLine = (content: string, type: 'command' | 'output' | 'error' | 'success' = 'output') => {
    const newLine: TerminalLine = {
      id: generateUniqueId(),
      type,
      content,
      timestamp: Date.now()
    }
    setLines(prev => [...prev, newLine])
  }

  const getAvailableCommands = () => {
    const baseCommands = ['help', 'clear', 'tutorial', 'pwd', 'whoami', 'date', 'history']
    const gitCommands = validRepos.map(repo => `git clone https://github.com/nassimmaaoui/${repo}.git`)
    
    if (clonedRepo && !isInRepo) {
      return [...baseCommands, ...gitCommands, `cd ${clonedRepo}`]
    }
    
    if (isInRepo) {
      const fileCommands = fileSystem
        .filter(item => item.type === 'file')
        .map(file => `cat ${file.name}`)
      
      return [
        ...baseCommands,
        'ls',
        'ls -la',
        'npm start',
        'docker-compose up -d',
        'details',
        'cd ..',
        'echo ',
        ...fileCommands
      ]
    }
    
    return [...baseCommands, ...gitCommands]
  }

  const getTabCompletions = (input: string) => {
    const commands = getAvailableCommands()
    return commands.filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
  }

  const handleTabCompletion = () => {
    const completions = getTabCompletions(currentInput)
    
    if (completions.length === 1) {
      // Single match - complete it
      setCurrentInput(completions[0])
      setShowSuggestions(false)
    } else if (completions.length > 1) {
      // Multiple matches - show suggestions
      setTabSuggestions(completions)
      setShowSuggestions(true)
      
      // Find common prefix
      const commonPrefix = completions.reduce((prefix, cmd) => {
        let i = 0
        while (i < prefix.length && i < cmd.length && prefix[i].toLowerCase() === cmd[i].toLowerCase()) {
          i++
        }
        return prefix.substring(0, i)
      })
      
      if (commonPrefix.length > currentInput.length) {
        setCurrentInput(commonPrefix)
      }
    }
  }

  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return
    
    let newIndex = historyIndex
    
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1)
      if (newIndex === commandHistory.length - 1) newIndex = -1
    }
    
    setHistoryIndex(newIndex)
    setCurrentInput(newIndex === -1 ? '' : commandHistory[newIndex])
  }

  const simulateCloning = async (repoName: string) => {
    addLine(`git clone https://github.com/nassimmaaoui/${repoName}.git`, 'command')
    
    // Simulate cloning process
    await new Promise(resolve => setTimeout(resolve, 500))
    addLine('Cloning into \'' + repoName + '\'...', 'output')
    
    await new Promise(resolve => setTimeout(resolve, 800))
    addLine('remote: Enumerating objects: 247, done.', 'output')
    
    await new Promise(resolve => setTimeout(resolve, 600))
    addLine('remote: Counting objects: 100% (247/247), done.', 'output')
    
    await new Promise(resolve => setTimeout(resolve, 700))
    addLine('remote: Compressing objects: 100% (156/156), done.', 'output')
    
    await new Promise(resolve => setTimeout(resolve, 900))
    addLine('Receiving objects: 100% (247/247), 2.34 MiB | 1.85 MiB/s, done.', 'output')
    
    await new Promise(resolve => setTimeout(resolve, 400))
    addLine('Resolving deltas: 100% (89/89), done.', 'success')
    
    setClonedRepo(repoName)
    if (projectFileSystems[repoName]) {
      setFileSystem(projectFileSystems[repoName])
    }
    
    // Show next steps
    await new Promise(resolve => setTimeout(resolve, 500))
    addLine('', 'output')
    addLine('✓ Repository cloned successfully!', 'success')
    addLine('', 'output')
    addLine('Available commands:', 'output')
    addLine('  cd ' + repoName + '     - Enter the project directory', 'output')
    addLine('  ls              - List files and folders', 'output')
    addLine('  cat [file]      - View file contents', 'output')
    addLine('  npm start       - Run the project (if applicable)', 'output')
    addLine('  details         - View detailed project information', 'output')
    addLine('  clear           - Clear terminal', 'output')
  }

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    
    if (trimmedCommand === '') return

    // Add to command history
    if (trimmedCommand !== '' && !commandHistory.includes(trimmedCommand)) {
      setCommandHistory(prev => [...prev, trimmedCommand])
    }
    setHistoryIndex(-1)
    setShowSuggestions(false)

    if (trimmedCommand === 'help') {
      addLine('help', 'command')
      addLine('', 'output')
      addLine('🚀 INTERACTIVE PORTFOLIO TERMINAL', 'success')
      addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'output')
      addLine('', 'output')
      addLine('📁 Navigation Commands:', 'output')
      addLine('  git clone https://github.com/nassimmaaoui/[repo].git - Clone repository', 'output')
      addLine('  cd [directory]  - Change directory', 'output')
      addLine('  cd ..           - Go back to parent directory', 'output')
      addLine('  ls              - List files and folders', 'output')
      addLine('  ls -la          - List files with details', 'output')
      addLine('  pwd             - Show current directory', 'output')
      addLine('', 'output')
      addLine('📄 File Commands:', 'output')
      addLine('  cat [file]      - View file contents', 'output')
      addLine('  details         - Show project information', 'output')
      addLine('', 'output')
      addLine('🔧 System Commands:', 'output')
      addLine('  npm start       - Start the application', 'output')
      addLine('  docker-compose up -d - Run with Docker', 'output')
      addLine('  whoami          - Show current user', 'output')
      addLine('  date            - Show current date/time', 'output')
      addLine('  echo [message]  - Print message', 'output')
      addLine('  history         - Show command history', 'output')
      addLine('  clear           - Clear terminal', 'output')
      addLine('  tutorial        - Interactive terminal tutorial', 'output')
      addLine('  help            - Show this help message', 'output')
      addLine('', 'output')
      addLine('⌨️  Terminal Features:', 'output')
      addLine('  Tab             - Auto-complete commands', 'output')
      addLine('  ↑/↓ Arrows      - Navigate command history', 'output')
      addLine('  Esc             - Hide suggestions', 'output')
      addLine('', 'output')
      addLine('📦 Available Repositories:', 'output')
      validRepos.forEach(repo => {
        addLine(`  ${repo}`, 'output')
      })
      addLine('', 'output')
      addLine('💡 Try: git clone https://github.com/nassimmaaoui/cession-app.git', 'success')
      return
    }

    // Add base commands that work from any directory
    if (trimmedCommand === 'pwd') {
      addLine('pwd', 'command')
      addLine(currentDirectory, 'output')
      return
    }

    if (trimmedCommand === 'whoami') {
      addLine('whoami', 'command')
      addLine('visitor', 'output')
      return
    }

    if (trimmedCommand === 'date') {
      addLine('date', 'command')
      addLine(new Date().toString(), 'output')
      return
    }

    if (trimmedCommand.startsWith('echo ')) {
      const message = trimmedCommand.substring(5)
      addLine(trimmedCommand, 'command')
      addLine(message, 'output')
      return
    }

    if (trimmedCommand === 'history') {
      addLine('history', 'command')
      commandHistory.forEach((cmd, index) => {
        addLine(`${(index + 1).toString().padStart(4)} ${cmd}`, 'output')
      })
      return
    }

    if (trimmedCommand === 'clear') {
      setLines([])
      setIsInitialized(false)
      return
    }

    if (trimmedCommand === 'tutorial') {
      addLine('tutorial', 'command')
      addLine('', 'output')
      addLine('🎓 INTERACTIVE TERMINAL TUTORIAL', 'success')
      addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'output')
      addLine('', 'output')
      addLine('This terminal supports advanced features just like a real terminal:', 'output')
      addLine('', 'output')
      addLine('🔤 Tab Completion:', 'success')
      addLine('  1. Type "git c" and press Tab', 'output')
      addLine('  2. See how it completes to "git clone"', 'output')
      addLine('  3. Continue typing and Tab again for repository suggestions', 'output')
      addLine('', 'output')
      addLine('📚 Command History:', 'success')
      addLine('  1. Type any command and press Enter', 'output')
      addLine('  2. Use ↑ arrow to go back to previous commands', 'output')
      addLine('  3. Use ↓ arrow to go forward in history', 'output')
      addLine('', 'output')
      addLine('🎯 Try This Exercise:', 'success')
      addLine('  1. Type "git c" + Tab (should complete to "git clone")', 'output')
      addLine('  2. Add "https://github.com/nassimmaaoui/c" + Tab', 'output')
      addLine('  3. Select "cession-app" from suggestions', 'output')
      addLine('  4. Press Enter to clone the repository', 'output')
      addLine('  5. Type "cd c" + Tab to enter the directory', 'output')
      addLine('  6. Use "ls" to explore files', 'output')
      addLine('', 'output')
      addLine('💡 Pro Tips:', 'success')
      addLine('  • Press Esc to hide suggestion popup', 'output')
      addLine('  • Click on suggestions to select them', 'output')
      addLine('  • All commands are context-aware', 'output')
      addLine('  • File names auto-complete after cloning', 'output')
      addLine('', 'output')
      addLine('Ready to try? Start with: git c + Tab', 'success')
      return
    }

    if (trimmedCommand.startsWith('git clone')) {
      const match = trimmedCommand.match(/git clone https:\/\/github\.com\/nassimmaaoui\/(.+)\.git/)
      if (match) {
        const repoName = match[1]
        if (validRepos.includes(repoName)) {
          await simulateCloning(repoName)
          return
        } else {
          addLine(trimmedCommand, 'command')
          addLine('Repository not found. Type "help" to see available repositories.', 'error')
          return
        }
      }
    }

    if (clonedRepo) {
      if (trimmedCommand === `cd ${clonedRepo}`) {
        addLine(trimmedCommand, 'command')
        setCurrentDirectory(`~/technical-portfolio/${clonedRepo}`)
        setIsInRepo(true)
        addLine('✓ Entered project directory', 'success')
        return
      }

      if (isInRepo) {
        if (trimmedCommand === 'cd ..') {
          addLine('cd ..', 'command')
          setCurrentDirectory('~/technical-portfolio')
          setIsInRepo(false)
          addLine('✓ Back to portfolio directory', 'success')
          return
        }

        if (trimmedCommand === 'ls' || trimmedCommand === 'ls -la') {
          addLine(trimmedCommand, 'command')
          
          if (trimmedCommand === 'ls -la') {
            addLine('total 42', 'output')
            addLine('drwxr-xr-x  8 nassim nassim  256 Dec 15 10:30 .', 'output')
            addLine('drwxr-xr-x  3 nassim nassim   96 Dec 15 10:25 ..', 'output')
            addLine('drwxr-xr-x  8 nassim nassim  256 Dec 15 10:30 .git', 'output')
          }
          
          fileSystem.forEach(item => {
            const icon = item.type === 'folder' ? '📁' : '📄'
            const permissions = item.type === 'folder' ? 'drwxr-xr-x' : '-rw-r--r--'
            const size = item.type === 'folder' ? '4096' : Math.floor(Math.random() * 10000 + 1000).toString()
            const date = 'Dec 15 10:30'
            
            if (trimmedCommand === 'ls -la') {
              addLine(`${permissions}  1 nassim nassim ${size.padStart(6)} ${date} ${item.name}`, 'output')
            } else {
              addLine(`${icon} ${item.name}`, 'output')
            }
          })
          return
        }

        if (trimmedCommand.startsWith('cat ')) {
          const fileName = trimmedCommand.substring(4)
          addLine(trimmedCommand, 'command')
          
          const findFile = (nodes: FileSystemNode[], name: string): FileSystemNode | null => {
            for (const node of nodes) {
              if (node.name === name && node.type === 'file') {
                return node
              }
              if (node.children) {
                const found = findFile(node.children, name)
                if (found) return found
              }
            }
            return null
          }

          const file = findFile(fileSystem, fileName)
          if (file && file.content) {
            addLine('', 'output')
            file.content.split('\n').forEach(line => {
              addLine(line, 'output')
            })
            addLine('', 'output')
          } else {
            addLine(`cat: ${fileName}: No such file`, 'error')
          }
          return
        }

        if (trimmedCommand === 'npm start' || trimmedCommand === 'docker-compose up -d') {
          addLine(trimmedCommand, 'command')
          addLine('Starting application...', 'output')
          
          await new Promise(resolve => setTimeout(resolve, 1000))
          addLine('✓ Dependencies installed', 'success')
          
          await new Promise(resolve => setTimeout(resolve, 800))
          addLine('✓ Database connected', 'success')
          
          await new Promise(resolve => setTimeout(resolve, 600))
          addLine('✓ Server started on http://localhost:8080', 'success')
          
          addLine('', 'output')
          addLine('🚀 Application is now running!', 'success')
          addLine('   Open http://localhost:8080 in your browser', 'output')
          return
        }

        if (trimmedCommand === 'details') {
          addLine('details', 'command')
          const project = projects.find(p => p.githubUrl.includes(clonedRepo!))
          if (project) {
            addLine('', 'output')
            addLine('📋 PROJECT DETAILS', 'success')
            addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'output')
            addLine(`Name: ${project.name}`, 'output')
            addLine(`Description: ${project.description}`, 'output')
            addLine(`Category: ${project.category}`, 'output')
            addLine(`Stars: ⭐ ${project.stats.stars}`, 'output')
            addLine(`Forks: 🍴 ${project.stats.forks}`, 'output')
            addLine(`Commits: 📝 ${project.stats.commits}`, 'output')
            addLine('', 'output')
            addLine('Tech Stack:', 'output')
            project.techStack.forEach(tech => {
              addLine(`  • ${tech.name}`, 'output')
            })
            addLine('', 'output')
            addLine('🔗 Links:', 'output')
            addLine(`   GitHub: ${project.githubUrl}`, 'output')
            if (project.liveUrl) {
              addLine(`   Live Demo: ${project.liveUrl}`, 'output')
            }
            addLine(`   Portfolio Details: /projects/${project.id}`, 'output')
          }
          return
        }


      }
    }

    // Default case - command not recognized
    addLine(trimmedCommand, 'command')
    addLine(`Command not found: ${trimmedCommand}`, 'error')
    addLine('Type "help" for available commands', 'output')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTabCompletion()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory('down')
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setTabSuggestions([])
    } else {
      // Hide suggestions when typing
      if (showSuggestions) {
        setShowSuggestions(false)
      }
    }
  }

  const getPrompt = () => {
    const user = 'visitor'
    const host = 'nassim-portfolio'
    return `${user}@${host}:${currentDirectory}$`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16 bg-black border border-[var(--color-border)] rounded-lg overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-300 font-mono">Interactive Portfolio Terminal</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 bg-black font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {!isInitialized ? (
          <div className="text-gray-400 animate-pulse">
            Initializing terminal...
          </div>
        ) : (
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mb-1 ${
                  line.type === 'command' ? 'text-white' :
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'success' ? 'text-green-400' :
                  'text-gray-300'
                }`}
              >
                {line.type === 'command' && (
                  <span className="text-blue-400">{getPrompt()} </span>
                )}
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Tab Suggestions */}
        {showSuggestions && tabSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 p-2 bg-gray-800 border border-gray-600 rounded text-xs"
          >
            <div className="text-gray-400 mb-1">Suggestions:</div>
            <div className="grid grid-cols-1 gap-1">
              {tabSuggestions.slice(0, 8).map((suggestion, index) => (
                <div
                  key={index}
                  className="text-yellow-300 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer"
                  onClick={() => {
                    setCurrentInput(suggestion)
                    setShowSuggestions(false)
                    inputRef.current?.focus()
                  }}
                >
                  {suggestion}
                </div>
              ))}
              {tabSuggestions.length > 8 && (
                <div className="text-gray-500 px-2 py-1">
                  ... and {tabSuggestions.length - 8} more
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Input Line */}
        {isInitialized && (
          <div className="flex items-center text-white">
            <span className="text-blue-400 mr-2">{getPrompt()}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-pulse text-white">|</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}