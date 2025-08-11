// Performance optimization utilities for smooth project details

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  imageLoadTime: number
  animationFrames: number
}

// Debounce utility for smooth scrolling and interactions
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance-critical operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

// Image preloader for smooth transitions
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Batch image preloader
export async function preloadImages(srcs: string[]): Promise<void[]> {
  const promises = srcs.map(src => preloadImage(src))
  return Promise.all(promises)
}

// Performance monitoring
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private startTime: number = 0

  startMeasurement(name: string): void {
    this.startTime = performance.now()
    performance.mark(`${name}-start`)
  }

  endMeasurement(name: string): number {
    const endTime = performance.now()
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const duration = endTime - this.startTime
    return duration
  }

  measureImageLoad(callback: () => void): Promise<number> {
    return new Promise((resolve) => {
      const startTime = performance.now()
      callback()
      
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const endTime = performance.now()
        resolve(endTime - startTime)
      })
    })
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  logPerformance(): void {
    const entries = performance.getEntriesByType('measure')
    entries.forEach(entry => {
      console.log(`🚀 ${entry.name}: ${entry.duration.toFixed(2)}ms`)
    })
  }
}

// Smooth scroll utility
export function smoothScrollTo(element: HTMLElement, offset: number = 0): void {
  const targetPosition = element.offsetTop - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 800
  let start: number | null = null

  function animation(currentTime: number) {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

// Viewport utilities
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Animation frame utilities
export function requestIdleCallback(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback)
  } else {
    setTimeout(callback, 1)
  }
}

// Memory management
export function cleanupResources(): void {
  // Clear performance marks and measures
  performance.clearMarks()
  performance.clearMeasures()
  
  // Force garbage collection if available (dev only)
  if (process.env.NODE_ENV === 'development' && 'gc' in window) {
    (window as any).gc()
  }
}

// CSS animation utilities
export const ANIMATION_PRESETS = {
  smooth: {
    duration: 0.6,
    ease: "easeOut"
  },
  fast: {
    duration: 0.3,
    ease: "easeOut"
  },
  slow: {
    duration: 1.2,
    ease: "easeInOut"
  },
  bounce: {
    duration: 0.8,
    ease: [0.68, -0.55, 0.265, 1.55]
  }
} as const

// Device performance detection
export function getDevicePerformance(): 'high' | 'medium' | 'low' {
  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  
  // Check for device memory (if available)
  const memory = (navigator as any).deviceMemory || 4
  
  // Check for connection speed
  const connection = (navigator as any).connection
  const effectiveType = connection?.effectiveType || '4g'
  
  if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
    return 'high'
  } else if (cores >= 4 && memory >= 4) {
    return 'medium'
  } else {
    return 'low'
  }
}

// Adaptive performance settings
export function getAdaptiveSettings() {
  const performance = getDevicePerformance()
  
  switch (performance) {
    case 'high':
      return {
        enableAnimations: true,
        imageQuality: 'high',
        preloadImages: true,
        staggerDelay: 0.1,
        animationDuration: 0.6
      }
    case 'medium':
      return {
        enableAnimations: true,
        imageQuality: 'medium',
        preloadImages: false,
        staggerDelay: 0.05,
        animationDuration: 0.4
      }
    case 'low':
      return {
        enableAnimations: false,
        imageQuality: 'low',
        preloadImages: false,
        staggerDelay: 0,
        animationDuration: 0.2
      }
  }
}