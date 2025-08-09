"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalAnimationProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}: { 
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: index * (speed / 1000),
            duration: 0.1,
            onComplete: index === text.length - 1 ? onComplete : undefined
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function BlinkingCursor({ className = '' }: { className?: string }) {
  return (
    <motion.span
      className={`inline-block w-2 h-5 bg-blue-400 ${className}`}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  )
}

export function TerminalSlideIn({ children, delay = 0, className = '' }: TerminalAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  )
}

export function TerminalFadeIn({ children, delay = 0, className = '' }: TerminalAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function TerminalGlitch({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, -2, 2, 0],
        textShadow: [
          '0 0 0 transparent',
          '2px 0 0 #ff0000, -2px 0 0 #00ff00',
          '0 0 0 transparent'
        ]
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3
      }}
    >
      {children}
    </motion.div>
  )
}