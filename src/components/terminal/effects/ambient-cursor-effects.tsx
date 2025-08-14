"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerformanceFallbacks } from '../performance/performance-fallbacks'
import { useAnimationCleanup } from '../performance/memory-manager'

interface CursorPosition {
  x: number
  y: number
}

interface CursorTrail {
  id: string
  x: number
  y: number
  timestamp: number
}

interface AmbientCursorEffectsProps {
  enabled?: boolean
  intensity?: 'low' | 'medium' | 'high'
  glowColor?: string
  trailLength?: number
  enableTrails?: boolean
  enableGlow?: boolean
  disableAnimations?: boolean
}

export function AmbientCursorEffects({
  enabled = true,
  intensity = 'medium',
  glowColor = '#00ff41',
  trailLength = 8,
  enableTrails = true,
  enableGlow = true,
  disableAnimations = false
}: AmbientCursorEffectsProps) {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([])
  const [isMoving, setIsMoving] = useState(false)
  const [lastMoveTime, setLastMoveTime] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const trailIdCounter = useRef(0)
  const rafRef = useRef<number>()
  const cleanupTimeoutRef = useRef<NodeJS.Timeout>()

  // Performance optimizations
  const { getOptimizedProps, shouldDisableFeature } = usePerformanceFallbacks()
  const { registerTimeout, registerAnimation, cleanupAll } = useAnimationCleanup()

  // Apply performance optimizations
  const optimizedProps = getOptimizedProps({
    enableTrails,
    enableGlow,
    disableAnimations,
    trailLength
  })

  // Intensity settings with performance considerations
  const intensitySettings = {
    low: {
      glowSize: 20,
      trailOpacity: 0.3,
      pulseScale: 1.1,
      updateInterval: 100,
      maxTrailPoints: 3
    },
    medium: {
      glowSize: 30,
      trailOpacity: 0.5,
      pulseScale: 1.2,
      updateInterval: 50,
      maxTrailPoints: 5
    },
    high: {
      glowSize: 40,
      trailOpacity: 0.7,
      pulseScale: 1.3,
      updateInterval: 30,
      maxTrailPoints: 8
    }
  }

  const settings = intensitySettings[intensity]
  const effectiveTrailLength = Math.min(optimizedProps.trailLength || trailLength, settings.maxTrailPoints)

  // Optimized mouse movement tracking with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    
    // Throttle updates based on performance
    if (now - lastMoveTime < settings.updateInterval / 2) {
      return
    }

    setCursorPosition({ x: e.clientX, y: e.clientY })
    setIsMoving(true)
    setLastMoveTime(now)

    // Add to trail only if trails are enabled
    if (optimizedProps.enableTrails && !shouldDisableFeature('cursor-trails')) {
      setCursorTrail(prev => {
        const newTrail: CursorTrail = {
          id: `trail-${trailIdCounter.current++}`,
          x: e.clientX,
          y: e.clientY,
          timestamp: now
        }
        
        // Keep only recent trail points with performance-aware limits
        const maxAge = shouldDisableFeature('complex-effects') ? 500 : 1000
        const filtered = prev.filter(point => now - point.timestamp < maxAge)
        return [...filtered, newTrail].slice(-effectiveTrailLength)
      })
    }
  }, [settings.updateInterval, lastMoveTime, optimizedProps.enableTrails, shouldDisableFeature, effectiveTrailLength])

  const handleMouseLeave = useCallback(() => {
    setIsMoving(false)
  }, [])

  // Track mouse movement
  useEffect(() => {
    if (!enabled || optimizedProps.disableAnimations) return

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, optimizedProps.disableAnimations, handleMouseMove, handleMouseLeave])

  // Optimized moving detection with RAF
  useEffect(() => {
    if (!enabled || optimizedProps.disableAnimations) return

    const checkMoving = () => {
      const now = Date.now()
      if (now - lastMoveTime > 150) {
        setIsMoving(false)
      }
      rafRef.current = requestAnimationFrame(checkMoving)
    }

    rafRef.current = requestAnimationFrame(checkMoving)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [enabled, optimizedProps.disableAnimations, lastMoveTime])

  // Efficient trail cleanup with batching
  useEffect(() => {
    if (!enabled || !optimizedProps.enableTrails) return

    const cleanup = () => {
      const now = Date.now()
      const maxAge = shouldDisableFeature('complex-effects') ? 500 : 1000
      
      setCursorTrail(prev => {
        const filtered = prev.filter(point => now - point.timestamp < maxAge)
        // Only update if there's a significant change to reduce re-renders
        return filtered.length !== prev.length ? filtered : prev
      })
    }

    const interval = registerTimeout(setInterval(cleanup, settings.updateInterval * 2))

    return () => clearInterval(interval)
  }, [enabled, optimizedProps.enableTrails, settings.updateInterval, shouldDisableFeature, registerTimeout])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAll()
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current)
      }
    }
  }, [cleanupAll])

  // Don't render if disabled or performance fallbacks are too aggressive
  if (!enabled || optimizedProps.disableAnimations || shouldDisableFeature('cursor-trails')) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        mixBlendMode: shouldDisableFeature('complex-effects') ? 'normal' : 'screen',
        willChange: 'transform' // Optimize for animations
      }}
    >
      {/* Main cursor glow - only if glow is enabled */}
      {optimizedProps.enableGlow && !shouldDisableFeature('glow-effects') && (
        <AnimatePresence mode="wait">
          {isMoving && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: shouldDisableFeature('complex-effects') ? 0.3 : 0.6, 
                scale: 1,
                x: cursorPosition.x - settings.glowSize / 2,
                y: cursorPosition.y - settings.glowSize / 2
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                type: shouldDisableFeature('complex-effects') ? "tween" : "spring", 
                stiffness: 500, 
                damping: 30,
                duration: shouldDisableFeature('complex-effects') ? 0.1 : 0.2
              }}
              className="absolute rounded-full"
              style={{
                width: settings.glowSize,
                height: settings.glowSize,
                background: shouldDisableFeature('complex-effects') 
                  ? glowColor + '20'
                  : `radial-gradient(circle, ${glowColor}40 0%, ${glowColor}20 50%, transparent 100%)`,
                boxShadow: shouldDisableFeature('complex-effects') 
                  ? 'none' 
                  : `0 0 ${settings.glowSize}px ${glowColor}30`,
                filter: shouldDisableFeature('complex-effects') ? 'none' : 'blur(1px)'
              }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Cursor trail - only if trails are enabled and not disabled by performance */}
      {optimizedProps.enableTrails && !shouldDisableFeature('cursor-trails') && (
        <AnimatePresence mode="popLayout">
          {cursorTrail.slice(-effectiveTrailLength).map((point, index) => {
            const age = Date.now() - point.timestamp
            const maxAge = shouldDisableFeature('complex-effects') ? 500 : 1000
            const opacity = Math.max(0, (maxAge - age) / maxAge) * settings.trailOpacity
            const scale = 0.3 + (opacity * 0.7)
            
            // Skip rendering very faded trails for performance
            if (opacity < 0.1) return null
            
            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity,
                  scale,
                  x: point.x - 4,
                  y: point.y - 4
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: shouldDisableFeature('complex-effects') ? 0.05 : 0.1,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: glowColor,
                  boxShadow: shouldDisableFeature('complex-effects') 
                    ? 'none' 
                    : `0 0 8px ${glowColor}60`,
                  willChange: 'transform, opacity'
                }}
              />
            )
          })}
        </AnimatePresence>
      )}

      {/* Pulse effect - only for high performance mode */}
      {!shouldDisableFeature('complex-effects') && optimizedProps.enableGlow && (
        <AnimatePresence>
          {isMoving && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.4, 0],
                scale: [1, settings.pulseScale],
                x: cursorPosition.x - settings.glowSize / 2,
                y: cursorPosition.y - settings.glowSize / 2
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute rounded-full border-2"
              style={{
                width: settings.glowSize,
                height: settings.glowSize,
                borderColor: glowColor + '60',
                willChange: 'transform, opacity'
              }}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}