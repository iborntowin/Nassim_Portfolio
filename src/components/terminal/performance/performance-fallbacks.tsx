"use client"

import { useEffect, useState, useCallback } from 'react'
import { usePerformanceMonitor } from './performance-monitor'

interface PerformanceFallbacksConfig {
  enableFallbacks?: boolean
  fallbackThresholds?: {
    fps: number
    memoryUsage: number
    renderTime: number
  }
  fallbackSettings?: {
    disableAnimations?: boolean
    reduceParticles?: boolean
    simplifyEffects?: boolean
    disableGlow?: boolean
    reduceTrails?: boolean
    lowerQuality?: boolean
  }
}

interface FallbackState {
  isActive: boolean
  level: 'none' | 'light' | 'moderate' | 'aggressive'
  disabledFeatures: string[]
  reason: string
}

export function usePerformanceFallbacks(config: PerformanceFallbacksConfig = {}) {
  const {
    enableFallbacks = true,
    fallbackThresholds = {
      fps: 45, // Below 45 FPS
      memoryUsage: 75, // Above 75% memory usage
      renderTime: 20 // Above 20ms render time
    },
    fallbackSettings = {
      disableAnimations: true,
      reduceParticles: true,
      simplifyEffects: true,
      disableGlow: true,
      reduceTrails: true,
      lowerQuality: true
    }
  } = config

  const { metrics, isLowPerformance } = usePerformanceMonitor()
  const [fallbackState, setFallbackState] = useState<FallbackState>({
    isActive: false,
    level: 'none',
    disabledFeatures: [],
    reason: ''
  })

  // Determine fallback level based on performance metrics
  const determineFallbackLevel = useCallback(() => {
    if (!enableFallbacks) return 'none'

    const issues: string[] = []
    let severity = 0

    // Check FPS
    if (metrics.fps < fallbackThresholds.fps) {
      issues.push(`Low FPS: ${metrics.fps}`)
      severity += metrics.fps < 30 ? 3 : metrics.fps < 40 ? 2 : 1
    }

    // Check memory usage
    if (metrics.memoryUsage > fallbackThresholds.memoryUsage) {
      issues.push(`High memory: ${metrics.memoryUsage.toFixed(1)}%`)
      severity += metrics.memoryUsage > 90 ? 3 : metrics.memoryUsage > 80 ? 2 : 1
    }

    // Check render time
    if (metrics.renderTime > fallbackThresholds.renderTime) {
      issues.push(`Slow rendering: ${metrics.renderTime.toFixed(1)}ms`)
      severity += metrics.renderTime > 30 ? 3 : metrics.renderTime > 25 ? 2 : 1
    }

    // Determine level based on severity
    if (severity === 0) return 'none'
    if (severity <= 2) return 'light'
    if (severity <= 4) return 'moderate'
    return 'aggressive'
  }, [enableFallbacks, metrics, fallbackThresholds])

  // Update fallback state based on performance
  useEffect(() => {
    const level = determineFallbackLevel()
    const isActive = level !== 'none'
    
    const disabledFeatures: string[] = []
    let reason = ''

    if (isActive) {
      reason = `Performance optimization active (${level})`
      
      // Light fallbacks
      if (level === 'light') {
        if (fallbackSettings.reduceParticles) disabledFeatures.push('particles')
        if (fallbackSettings.reduceTrails) disabledFeatures.push('cursor-trails')
      }
      
      // Moderate fallbacks
      if (level === 'moderate') {
        if (fallbackSettings.reduceParticles) disabledFeatures.push('particles')
        if (fallbackSettings.reduceTrails) disabledFeatures.push('cursor-trails')
        if (fallbackSettings.simplifyEffects) disabledFeatures.push('complex-effects')
        if (fallbackSettings.disableGlow) disabledFeatures.push('glow-effects')
      }
      
      // Aggressive fallbacks
      if (level === 'aggressive') {
        if (fallbackSettings.disableAnimations) disabledFeatures.push('animations')
        if (fallbackSettings.reduceParticles) disabledFeatures.push('particles')
        if (fallbackSettings.simplifyEffects) disabledFeatures.push('complex-effects')
        if (fallbackSettings.disableGlow) disabledFeatures.push('glow-effects')
        if (fallbackSettings.reduceTrails) disabledFeatures.push('cursor-trails')
        if (fallbackSettings.lowerQuality) disabledFeatures.push('high-quality-rendering')
      }
    }

    setFallbackState({
      isActive,
      level,
      disabledFeatures,
      reason
    })
  }, [determineFallbackLevel, fallbackSettings])

  // Helper functions to check if features should be disabled
  const shouldDisableFeature = useCallback((feature: string) => {
    return fallbackState.disabledFeatures.includes(feature)
  }, [fallbackState.disabledFeatures])

  const getOptimizedProps = useCallback((baseProps: any) => {
    if (!fallbackState.isActive) return baseProps

    const optimizedProps = { ...baseProps }

    // Apply fallback optimizations
    if (shouldDisableFeature('animations')) {
      optimizedProps.disableAnimations = true
      optimizedProps.animationDuration = 0
    }

    if (shouldDisableFeature('particles')) {
      optimizedProps.enableParticles = false
      optimizedProps.particleCount = 0
    }

    if (shouldDisableFeature('glow-effects')) {
      optimizedProps.enableGlow = false
      optimizedProps.glowIntensity = 0
    }

    if (shouldDisableFeature('cursor-trails')) {
      optimizedProps.enableTrails = false
      optimizedProps.trailLength = 0
    }

    if (shouldDisableFeature('complex-effects')) {
      optimizedProps.enableComplexEffects = false
      optimizedProps.effectQuality = 'low'
    }

    if (shouldDisableFeature('high-quality-rendering')) {
      optimizedProps.renderQuality = 'low'
      optimizedProps.enableAntialiasing = false
    }

    return optimizedProps
  }, [fallbackState.isActive, shouldDisableFeature])

  return {
    fallbackState,
    shouldDisableFeature,
    getOptimizedProps,
    isPerformanceModeActive: fallbackState.isActive,
    performanceLevel: fallbackState.level
  }
}

// Component wrapper that automatically applies performance fallbacks
export function withPerformanceFallbacks<T extends object>(
  Component: React.ComponentType<T>,
  config?: PerformanceFallbacksConfig
) {
  return function PerformanceFallbackComponent(props: T) {
    const { getOptimizedProps, fallbackState } = usePerformanceFallbacks(config)
    const optimizedProps = getOptimizedProps(props)

    return (
      <>
        {fallbackState.isActive && (
          <div className="fixed top-2 left-2 z-50 bg-yellow-900/80 text-yellow-200 px-2 py-1 rounded text-xs font-mono">
            ⚡ Performance mode: {fallbackState.level}
          </div>
        )}
        <Component {...optimizedProps} />
      </>
    )
  }
}

// Device capability detection
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    supportsWebGL: false,
    supportsWebAudio: false,
    connectionType: 'unknown',
    deviceMemory: 0,
    hardwareConcurrency: 0
  })

  useEffect(() => {
    const detectCapabilities = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
      const isTablet = /tablet|ipad/i.test(userAgent) && !isMobile

      // Detect low-end devices
      const deviceMemory = (navigator as any).deviceMemory || 0
      const hardwareConcurrency = navigator.hardwareConcurrency || 0
      const isLowEnd = deviceMemory <= 2 || hardwareConcurrency <= 2

      // Check WebGL support
      const canvas = document.createElement('canvas')
      const supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))

      // Check Web Audio support
      const supportsWebAudio = !!(window.AudioContext || (window as any).webkitAudioContext)

      // Check connection type
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection?.effectiveType || 'unknown'

      setCapabilities({
        isMobile,
        isTablet,
        isLowEnd,
        supportsWebGL,
        supportsWebAudio,
        connectionType,
        deviceMemory,
        hardwareConcurrency
      })
    }

    detectCapabilities()

    // Listen for connection changes
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      connection.addEventListener('change', detectCapabilities)
      return () => connection.removeEventListener('change', detectCapabilities)
    }
  }, [])

  return capabilities
}

// Adaptive quality settings based on device capabilities
export function useAdaptiveQuality() {
  const capabilities = useDeviceCapabilities()
  const { fallbackState } = usePerformanceFallbacks()

  const getQualitySettings = useCallback(() => {
    let quality = 'high'

    // Reduce quality for low-end devices
    if (capabilities.isLowEnd || capabilities.isMobile) {
      quality = 'medium'
    }

    // Further reduce for slow connections
    if (capabilities.connectionType === 'slow-2g' || capabilities.connectionType === '2g') {
      quality = 'low'
    }

    // Apply performance fallbacks
    if (fallbackState.isActive) {
      if (fallbackState.level === 'aggressive') {
        quality = 'low'
      } else if (fallbackState.level === 'moderate') {
        quality = quality === 'high' ? 'medium' : 'low'
      }
    }

    return {
      quality,
      enableAnimations: quality !== 'low',
      enableParticles: quality === 'high',
      enableGlow: quality !== 'low',
      enableTrails: quality === 'high',
      animationDuration: quality === 'low' ? 0.1 : quality === 'medium' ? 0.3 : 0.5,
      particleCount: quality === 'low' ? 0 : quality === 'medium' ? 5 : 10,
      trailLength: quality === 'low' ? 0 : quality === 'medium' ? 3 : 8
    }
  }, [capabilities, fallbackState])

  return getQualitySettings()
}