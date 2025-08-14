"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedMatrixRain } from './enhanced-matrix-rain'
import { GlitchAnimation } from './glitch-animation'

interface LegendModeOverlayProps {
  isActive: boolean
  onComplete?: () => void
  duration?: number
}

export function LegendModeOverlay({ 
  isActive, 
  onComplete,
  duration = 5000 
}: LegendModeOverlayProps) {
  const [phase, setPhase] = useState<'glitch' | 'matrix' | 'complete'>('glitch')
  const [showMatrix, setShowMatrix] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Phase 1: Glitch effect (first 2 seconds)
      setPhase('glitch')
      
      const glitchTimeout = setTimeout(() => {
        setPhase('matrix')
        setShowMatrix(true)
      }, 2000)

      // Phase 2: Matrix effect (remaining duration)
      const completeTimeout = setTimeout(() => {
        setPhase('complete')
        setShowMatrix(false)
        onComplete?.()
      }, duration)

      return () => {
        clearTimeout(glitchTimeout)
        clearTimeout(completeTimeout)
      }
    } else {
      setPhase('complete')
      setShowMatrix(false)
    }
  }, [isActive, duration, onComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
        >
          {/* Glitch Animation */}
          <GlitchAnimation
            trigger={phase === 'glitch'}
            intensity="high"
            duration={2000}
            elements={['body', '.terminal-container', '.terminal-content']}
          />

          {/* Enhanced Matrix Rain */}
          <AnimatePresence>
            {showMatrix && (
              <EnhancedMatrixRain
                mode="legend"
                intensity="high"
                showOverlay={true}
                overlayText="👑 LEGEND MODE ACTIVATED 👑"
              />
            )}
          </AnimatePresence>

          {/* Legend Mode UI Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center">
              {/* Power Level Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 2 }}
                className="mb-8"
              >
                <div className="text-yellow-400 text-xl font-mono mb-2">
                  POWER LEVEL
                </div>
                <div className="w-96 h-4 bg-black border-2 border-yellow-400 relative overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.5, duration: 2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
                    OVER 9000!
                  </div>
                </div>
              </motion.div>

              {/* Status Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="space-y-2 text-yellow-300 font-mono"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Neural networks optimized</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Cloud resources unlimited</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Deployment speed: LUDICROUS</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Legend status: CONFIRMED</span>
                </div>
              </motion.div>

              {/* Achievement Unlocked */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, type: 'spring', stiffness: 200 }}
                className="mt-8 p-4 bg-yellow-400/20 border-2 border-yellow-400 rounded-lg"
              >
                <div className="text-yellow-400 text-2xl font-bold mb-2">
                  🏆 ACHIEVEMENT UNLOCKED
                </div>
                <div className="text-yellow-300 text-lg">
                  "Cloud Legend"
                </div>
                <div className="text-yellow-200 text-sm mt-2">
                  You have ascended to the highest tier of cloud mastery
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -50,
                  x: Math.random() * window.innerWidth
                }}
                transition={{
                  delay: 2 + Math.random() * 2,
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700'
                }}
              />
            ))}
          </div>

          {/* Screen Border Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 1, duration: 3, repeat: Infinity }}
            className="absolute inset-0 border-4 border-yellow-400 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 50px rgba(255, 215, 0, 0.3), 0 0 50px rgba(255, 215, 0, 0.3)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}