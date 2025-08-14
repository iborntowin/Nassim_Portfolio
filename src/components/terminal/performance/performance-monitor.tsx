"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  animationCount: number
  domNodes: number
  isLowPerformance: boolean
}

interface PerformanceMonitorProps {
  onPerformanceChange?: (metrics: PerformanceMetrics) => void
  enableFallbacks?: boolean
  targetFPS?: number
}

export function usePerformanceMonitor({
  onPerformanceChange,
  enableFallbacks = true,
  targetFPS = 60
}: PerformanceMonitorProps = {}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    animationCount: 0,
    domNodes: 0,
    isLowPerformance: false
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const renderTimesRef = useRef<number[]>([])
  const animationFrameRef = useRef<number>()
  const performanceCheckInterval = useRef<NodeJS.Timeout>()

  // FPS monitoring
  const measureFPS = useCallback(() => {
    const now = performance.now()
    frameCountRef.current++

    if (now - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))
      frameCountRef.current = 0
      lastTimeRef.current = now

      setMetrics(prev => ({
        ...prev,
        fps,
        isLowPerformance: fps < targetFPS * 0.8 // Consider low performance if below 80% of target
      }))
    }

    animationFrameRef.current = requestAnimationFrame(measureFPS)
  }, [targetFPS])

  // Memory usage monitoring
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      }
    }
    return null
  }, [])

  // DOM complexity monitoring
  const measureDOMComplexity = useCallback(() => {
    return {
      nodes: document.querySelectorAll('*').length,
      animations: document.getAnimations?.().length || 0
    }
  }, [])

  // Render time monitoring
  const measureRenderTime = useCallback(() => {
    const startTime = performance.now()
    
    // Force a layout/paint cycle
    document.body.offsetHeight
    
    const endTime = performance.now()
    const renderTime = endTime - startTime

    renderTimesRef.current.push(renderTime)
    if (renderTimesRef.current.length > 10) {
      renderTimesRef.current.shift()
    }

    const avgRenderTime = renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length
    return avgRenderTime
  }, [])

  // Comprehensive performance check
  const performanceCheck = useCallback(() => {
    const memory = measureMemoryUsage()
    const dom = measureDOMComplexity()
    const renderTime = measureRenderTime()

    const newMetrics: PerformanceMetrics = {
      ...metrics,
      memoryUsage: memory ? (memory.used / memory.limit) * 100 : 0,
      renderTime,
      animationCount: dom.animations,
      domNodes: dom.nodes,
      isLowPerformance: metrics.fps < targetFPS * 0.8 || renderTime > 16.67 // 60fps = 16.67ms per frame
    }

    setMetrics(newMetrics)
    onPerformanceChange?.(newMetrics)
  }, [metrics, measureMemoryUsage, measureDOMComplexity, measureRenderTime, targetFPS, onPerformanceChange])

  // Start monitoring
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(measureFPS)
    performanceCheckInterval.current = setInterval(performanceCheck, 2000) // Check every 2 seconds

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (performanceCheckInterval.current) {
        clearInterval(performanceCheckInterval.current)
      }
    }
  }, [measureFPS, performanceCheck])

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = []

    if (metrics.fps < targetFPS * 0.8) {
      suggestions.push('Reduce animation complexity')
      suggestions.push('Enable performance fallbacks')
    }

    if (metrics.memoryUsage > 80) {
      suggestions.push('Clear terminal history')
      suggestions.push('Reduce particle effects')
    }

    if (metrics.renderTime > 16.67) {
      suggestions.push('Optimize DOM structure')
      suggestions.push('Reduce visual effects')
    }

    if (metrics.animationCount > 20) {
      suggestions.push('Limit concurrent animations')
    }

    if (metrics.domNodes > 5000) {
      suggestions.push('Virtualize long lists')
      suggestions.push('Clean up unused elements')
    }

    return suggestions
  }, [metrics, targetFPS])

  return {
    metrics,
    isLowPerformance: metrics.isLowPerformance,
    optimizationSuggestions: getOptimizationSuggestions()
  }
}

// Performance-aware component wrapper
export function withPerformanceOptimization<T extends object>(
  Component: React.ComponentType<T>,
  optimizations: {
    enableFallbacks?: boolean
    reduceAnimations?: boolean
    limitEffects?: boolean
  } = {}
) {
  return function PerformanceOptimizedComponent(props: T) {
    const { metrics, isLowPerformance } = usePerformanceMonitor({
      enableFallbacks: optimizations.enableFallbacks
    })

    const optimizedProps = {
      ...props,
      // Reduce animations on low performance
      ...(isLowPerformance && optimizations.reduceAnimations && {
        animationDuration: 0.1,
        disableComplexAnimations: true
      }),
      // Limit effects on low performance
      ...(isLowPerformance && optimizations.limitEffects && {
        enableParticles: false,
        enableGlow: false,
        reduceTrails: true
      })
    } as T

    return <Component {...optimizedProps} />
  }
}