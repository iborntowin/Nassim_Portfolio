"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system'
  content: string
  timestamp: number
  animation?: 'typing' | 'matrix' | 'deploy' | 'scan'
}

interface TerminalOutputProps {
  line: TerminalLine
  legendMode?: boolean
}

export function TerminalOutput({ line, legendMode }: TerminalOutputProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Typing animation for certain line types
  useEffect(() => {
    if (line.animation === 'typing' || line.type === 'command') {
      setIsTyping(true)
      setDisplayedText('')
      
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < line.content.length) {
          setDisplayedText(line.content.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    } else {
      setDisplayedText(line.content)
      setIsTyping(false)
    }
  }, [line.content, line.animation, line.type])

  // Get line color based on type
  const getLineColor = () => {
    if (legendMode) {
      switch (line.type) {
        case 'command': return 'text-yellow-300'
        case 'success': return 'text-yellow-400'
        case 'error': return 'text-red-400'
        case 'warning': return 'text-orange-400'
        case 'info': return 'text-cyan-400'
        case 'system': return 'text-yellow-400'
        default: return 'text-yellow-200'
      }
    }

    switch (line.type) {
      case 'command': return 'text-white'
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      case 'info': return 'text-blue-400'
      case 'system': return 'text-green-400'
      default: return 'text-green-300'
    }
  }

  // Get animation variants
  const getAnimationVariants = () => {
    switch (line.animation) {
      case 'matrix':
        return {
          initial: { opacity: 0, y: -10 },
          animate: { 
            opacity: [0, 1, 0.8, 1],
            y: 0,
            textShadow: [
              '0 0 0px #00ff00',
              '0 0 10px #00ff00',
              '0 0 5px #00ff00',
              '0 0 0px #00ff00'
            ]
          },
          transition: { duration: 0.8, times: [0, 0.3, 0.7, 1] }
        }
      
      case 'deploy':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3 }
        }
      
      case 'scan':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { 
            opacity: 1, 
            scale: 1,
            boxShadow: [
              '0 0 0px rgba(34, 197, 94, 0)',
              '0 0 20px rgba(34, 197, 94, 0.3)',
              '0 0 0px rgba(34, 197, 94, 0)'
            ]
          },
          transition: { duration: 0.6, times: [0, 0.5, 1] }
        }
      
      default:
        return {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.2 }
        }
    }
  }

  const animationVariants = getAnimationVariants()

  return (
    <motion.div
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      transition={animationVariants.transition}
      className={`font-mono text-sm leading-relaxed ${getLineColor()}`}
    >
      {/* Special handling for ASCII art and system messages */}
      {line.type === 'system' || line.content.includes('╔') || line.content.includes('┌') ? (
        <pre className="whitespace-pre font-mono text-xs leading-tight">
          {displayedText}
        </pre>
      ) : (
        <div className="whitespace-pre-wrap break-words">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              █
            </motion.span>
          )}
        </div>
      )}

      {/* Special effects for certain content */}
      {line.content.includes('DEPLOYMENT SUCCESSFUL') && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, times: [0, 0.6, 1] }}
          className="inline-block ml-2"
        >
          🎉
        </motion.div>
      )}

      {line.content.includes('LEGEND MODE ACTIVATED') && (
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 0.8, times: [0, 0.5, 1] }
          }}
          className="inline-block ml-2"
        >
          👑
        </motion.div>
      )}

      {line.content.includes('ENTERING THE MATRIX') && (
        <motion.div
          animate={{ 
            opacity: [1, 0.3, 1],
            textShadow: [
              '0 0 0px #00ff00',
              '0 0 20px #00ff00',
              '0 0 0px #00ff00'
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block ml-2"
        >
          🔴
        </motion.div>
      )}
    </motion.div>
  )
}