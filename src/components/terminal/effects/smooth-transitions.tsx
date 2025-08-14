"use client"

import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface SmoothTransitionsProps {
  children: ReactNode
  transitionKey?: string
  type?: 'fade' | 'slide' | 'scale' | 'terminal'
  duration?: number
  className?: string
}

interface TransitionWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

// Terminal-style transition variants
const terminalVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(2px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

const slideVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3 }
  }
}

const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

export function SmoothTransitions({
  children,
  transitionKey,
  type = 'terminal',
  duration = 0.3,
  className = ''
}: SmoothTransitionsProps) {
  const getVariants = () => {
    switch (type) {
      case 'fade': return fadeVariants
      case 'slide': return slideVariants
      case 'scale': return scaleVariants
      case 'terminal': return terminalVariants
      default: return terminalVariants
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Staggered children animation for lists and grids
export function StaggeredTransition({
  children,
  delay = 0.1,
  className = ''
}: TransitionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(1px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

// Hover transition wrapper for interactive elements
export function HoverTransition({
  children,
  className = ''
}: TransitionWrapperProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Page transition wrapper
export function PageTransition({
  children,
  className = ''
}: TransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        filter: 'blur(4px)',
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Terminal command transition
export function CommandTransition({
  children,
  delay = 0,
  className = ''
}: TransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: {
          delay,
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Loading state transition
export function LoadingTransition({
  children,
  isLoading,
  className = ''
}: TransitionWrapperProps & { isLoading: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex items-center justify-center ${className}`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-terminal-green border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Focus transition for interactive elements
export function FocusTransition({
  children,
  className = ''
}: TransitionWrapperProps) {
  return (
    <motion.div
      whileFocus={{
        scale: 1.01,
        boxShadow: "0 0 0 2px #00ff4140",
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}