"use client"

import { useEffect, useRef, useCallback } from 'react'

interface MemoryManagerConfig {
  maxHistoryLines?: number
  maxTrailPoints?: number
  maxAnimations?: number
  cleanupInterval?: number
  enableAutoCleanup?: boolean
}

interface CleanupCallbacks {
  clearHistory?: () => void
  clearTrails?: () => void
  clearAnimations?: () => void
  clearCache?: () => void
}

export function useMemoryManager(
  config: MemoryManagerConfig = {},
  callbacks: CleanupCallbacks = {}
) {
  const {
    maxHistoryLines = 1000,
    maxTrailPoints = 50,
    maxAnimations = 10,
    cleanupInterval = 30000, // 30 seconds
    enableAutoCleanup = true
  } = config

  const cleanupIntervalRef = useRef<NodeJS.Timeout>()
  const memoryPressureRef = useRef(false)
  const lastCleanupRef = useRef(Date.now())

  // Memory pressure detection
  const detectMemoryPressure = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit
      return usageRatio > 0.8 // Consider high memory usage above 80%
    }
    
    // Fallback: detect based on DOM complexity and performance
    const domNodes = document.querySelectorAll('*').length
    const animations = document.getAnimations?.().length || 0
    
    return domNodes > 5000 || animations > 20
  }, [])

  // Aggressive cleanup for memory pressure
  const performAggressiveCleanup = useCallback(() => {
    console.log('🧹 Performing aggressive memory cleanup...')
    
    // Clear terminal history
    callbacks.clearHistory?.()
    
    // Clear animation trails
    callbacks.clearTrails?.()
    
    // Stop non-essential animations
    callbacks.clearAnimations?.()
    
    // Clear any cached data
    callbacks.clearCache?.()
    
    // Force garbage collection if available
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc()
    }
    
    lastCleanupRef.current = Date.now()
  }, [callbacks])

  // Regular cleanup
  const performRegularCleanup = useCallback(() => {
    console.log('🧽 Performing regular cleanup...')
    
    // Limit history lines
    if (callbacks.clearHistory) {
      // This should be implemented in the calling component to limit lines
      callbacks.clearHistory()
    }
    
    // Clean up old trail points
    if (callbacks.clearTrails) {
      callbacks.clearTrails()
    }
    
    lastCleanupRef.current = Date.now()
  }, [callbacks])

  // Main cleanup function
  const cleanup = useCallback((force = false) => {
    const now = Date.now()
    const timeSinceLastCleanup = now - lastCleanupRef.current
    
    // Skip if cleaned up recently (unless forced)
    if (!force && timeSinceLastCleanup < cleanupInterval / 2) {
      return
    }
    
    const isMemoryPressure = detectMemoryPressure()
    memoryPressureRef.current = isMemoryPressure
    
    if (isMemoryPressure || force) {
      performAggressiveCleanup()
    } else {
      performRegularCleanup()
    }
  }, [cleanupInterval, detectMemoryPressure, performAggressiveCleanup, performRegularCleanup])

  // Set up automatic cleanup
  useEffect(() => {
    if (!enableAutoCleanup) return

    cleanupIntervalRef.current = setInterval(() => {
      cleanup()
    }, cleanupInterval)

    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current)
      }
    }
  }, [enableAutoCleanup, cleanupInterval, cleanup])

  // Listen for memory pressure events
  useEffect(() => {
    const handleMemoryPressure = () => {
      console.warn('⚠️ Memory pressure detected, performing cleanup...')
      cleanup(true)
    }

    // Listen for page visibility changes (cleanup when hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanup(true)
      }
    }

    // Listen for beforeunload (cleanup before page unload)
    const handleBeforeUnload = () => {
      cleanup(true)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Custom memory pressure event (can be triggered by performance monitor)
    window.addEventListener('memorypressure', handleMemoryPressure)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('memorypressure', handleMemoryPressure)
    }
  }, [cleanup])

  // Provide manual cleanup trigger
  const triggerCleanup = useCallback((aggressive = false) => {
    cleanup(aggressive)
  }, [cleanup])

  // Get memory status
  const getMemoryStatus = useCallback(() => {
    const isMemoryPressure = detectMemoryPressure()
    const timeSinceLastCleanup = Date.now() - lastCleanupRef.current
    
    return {
      isMemoryPressure,
      timeSinceLastCleanup,
      needsCleanup: timeSinceLastCleanup > cleanupInterval
    }
  }, [detectMemoryPressure, cleanupInterval])

  return {
    triggerCleanup,
    getMemoryStatus,
    isMemoryPressure: memoryPressureRef.current
  }
}

// Hook for managing terminal history with automatic cleanup
export function useTerminalHistoryManager(maxLines = 1000) {
  const historyRef = useRef<any[]>([])
  
  const addToHistory = useCallback((item: any) => {
    historyRef.current.push(item)
    
    // Auto-trim if exceeding max lines
    if (historyRef.current.length > maxLines) {
      const excess = historyRef.current.length - maxLines
      historyRef.current.splice(0, excess)
    }
  }, [maxLines])
  
  const clearHistory = useCallback(() => {
    historyRef.current = []
  }, [])
  
  const trimHistory = useCallback((keepLines = Math.floor(maxLines / 2)) => {
    if (historyRef.current.length > keepLines) {
      const excess = historyRef.current.length - keepLines
      historyRef.current.splice(0, excess)
    }
  }, [maxLines])
  
  return {
    history: historyRef.current,
    addToHistory,
    clearHistory,
    trimHistory
  }
}

// Hook for managing animation cleanup
export function useAnimationCleanup() {
  const animationsRef = useRef<Set<Animation>>(new Set())
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const intervalsRef = useRef<Set<NodeJS.Timeout>>(new Set())
  
  const registerAnimation = useCallback((animation: Animation) => {
    animationsRef.current.add(animation)
    
    // Auto-remove when animation finishes
    animation.addEventListener('finish', () => {
      animationsRef.current.delete(animation)
    })
    
    animation.addEventListener('cancel', () => {
      animationsRef.current.delete(animation)
    })
  }, [])
  
  const registerTimeout = useCallback((timeout: NodeJS.Timeout) => {
    timeoutsRef.current.add(timeout)
    return timeout
  }, [])
  
  const registerInterval = useCallback((interval: NodeJS.Timeout) => {
    intervalsRef.current.add(interval)
    return interval
  }, [])
  
  const cleanupAll = useCallback(() => {
    // Cancel all animations
    animationsRef.current.forEach(animation => {
      try {
        animation.cancel()
      } catch (e) {
        // Animation might already be finished
      }
    })
    animationsRef.current.clear()
    
    // Clear all timeouts
    timeoutsRef.current.forEach(timeout => {
      clearTimeout(timeout)
    })
    timeoutsRef.current.clear()
    
    // Clear all intervals
    intervalsRef.current.forEach(interval => {
      clearInterval(interval)
    })
    intervalsRef.current.clear()
  }, [])
  
  // Cleanup on unmount
  useEffect(() => {
    return cleanupAll
  }, [cleanupAll])
  
  return {
    registerAnimation,
    registerTimeout,
    registerInterval,
    cleanupAll,
    activeAnimations: animationsRef.current.size,
    activeTimeouts: timeoutsRef.current.size,
    activeIntervals: intervalsRef.current.size
  }
}