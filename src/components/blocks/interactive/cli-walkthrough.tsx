"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Terminal, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"

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
  }
]

export default function CLIWalkthrough() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [commandHistory, setCommandHistory] = useState<Command[]>([])

  const progressValue = useMotionValue(0)
  const progressWidth = useTransform(progressValue, [0, 1], ["0%", "100%"])

  const currentCommand = commands[currentCommandIndex]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentCommand && currentOutputIndex === 0) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
        typeOutput()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentCommandIndex])

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

  useEffect(() => {
    const progress = (currentCommandIndex + (currentOutputIndex / currentCommand?.output.length || 1)) / commands.length
    animate(progressValue, progress, { duration: 0.3 })
  }, [currentCommandIndex, currentOutputIndex])

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

  const getTypeIcon = (type: Command["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning-energy" />
      case "info":
        return <Info className="w-4 h-4 text-accent" />
    }
  }

  const getOutputColor = (line: string) => {
    if (line.includes("✓") || line.includes("Success")) return "text-primary"
    if (line.includes("❌") || line.includes("FAIL") || line.includes("failed")) return "text-destructive"
    if (line.includes("⚠️") || line.includes("Warning")) return "text-warning-energy"
    if (line.includes("Creating") || line.includes("Cloning") || line.includes("http://")) return "text-accent"
    return "text-muted-foreground"
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-primary-background border border-secondary-background rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-secondary-background px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-text-primary">nassim@terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning-energy"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-secondary-background px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getTypeIcon(currentCommand?.type)}
            <span className="text-sm text-text-primary">{currentCommand?.description}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {currentCommandIndex + 1} of {commands.length}
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-1">
          <motion.div
            className="h-1 bg-primary rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="bg-primary-background p-4 min-h-[400px] font-mono text-sm">
        {/* Command History */}
        {commandHistory.map((cmd, index) => (
          <div key={cmd.id} className="mb-6">
            <div className="flex items-center gap-1 text-primary mb-2">
              <span className="text-accent">$</span>
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
            <div className="flex items-center gap-1 text-primary mb-2">
              <span className="text-accent">$</span>
              <span>{currentCommand.command}</span>
              {isTyping && showCursor && <span className="animate-pulse">|</span>}
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
                  <span className="animate-pulse text-primary">|</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="bg-secondary-background px-4 py-3 border-t border-border">
        <Button
          onClick={handleNextCommand}
          disabled={isTyping || currentOutputIndex < currentCommand?.output.length}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
        >
          {currentCommandIndex === commands.length - 1 ? (
            "Start Over"
          ) : (
            <>
              Try Next Command
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 