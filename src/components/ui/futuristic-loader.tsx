"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FuturisticLoaderProps {
  isLoading: boolean
  message?: string
  variant?: 'spinner' | 'pulse' | 'wave' | 'matrix'
}

export default function FuturisticLoader({ 
  isLoading, 
  message = "Loading...", 
  variant = 'wave' 
}: FuturisticLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100
          return prev + Math.random() * 15
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
    }
  }, [isLoading])

  if (!isLoading && progress === 100) return null

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <motion.div
            className="w-12 h-12 border-4 border-[var(--color-primary-accent)]/20 border-t-[var(--color-primary-accent)] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )

      case 'pulse':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-[var(--color-primary-accent)] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'matrix':
        return (
          <div className="relative w-16 h-16">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[var(--color-primary-accent)] rounded-sm"
                style={{
                  left: `${(i % 3) * 20}px`,
                  top: `${Math.floor(i / 3) * 20}px`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )

      case 'wave':
      default:
        return (
          <div className="flex items-end space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-gradient-to-t from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] rounded-full"
                animate={{
                  height: [8, 24, 8]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary-background)]/80 backdrop-blur-sm"
    >
      <div className="text-center">
        {/* Futuristic container */}
        <motion.div
          className="relative p-8 rounded-2xl bg-gradient-to-br from-[var(--color-secondary-background)] to-[var(--color-primary-background)] border border-[var(--color-border)] shadow-2xl"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] opacity-30" 
               style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
          
          {/* Loader animation */}
          <div className="relative z-10 mb-6 flex justify-center">
            {renderLoader()}
          </div>

          {/* Progress bar */}
          <div className="relative w-64 h-1 bg-[var(--color-border)] rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-32, 256] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Loading message */}
          <motion.p
            className="text-[var(--color-text-primary)] font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>

          {/* Progress percentage */}
          <motion.div
            className="text-sm text-[var(--color-text-secondary)] mt-2"
            key={Math.floor(progress)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(progress)}%
          </motion.div>

          {/* Particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${30 + (i % 2) * 40}%`
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="w-32 h-32 mx-auto bg-[var(--color-primary-accent)]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}