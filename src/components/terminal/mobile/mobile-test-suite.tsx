"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileOptimizations } from './mobile-terminal-optimizations'
import { TouchButton, TouchInput, SwipeableContainer } from './touch-interactions'

interface TestResult {
  test: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  performance?: number
}

export function MobileTestSuite({ onComplete }: { onComplete?: (results: TestResult[]) => void }) {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState('')
  const [results, setResults] = useState<TestResult[]>([])
  const [progress, setProgress] = useState(0)
  
  const { 
    isMobile, 
    isTablet, 
    orientation, 
    keyboardVisible,
    touchState,
    getMobilePerformanceSettings 
  } = useMobileOptimizations()

  const testContainerRef = useRef<HTMLDivElement>(null)

  const tests = [
    {
      name: 'Device Detection',
      test: () => {
        const userAgent = navigator.userAgent.toLowerCase()
        const isMobileDetected = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        const isTabletDetected = /tablet|ipad/i.test(userAgent)
        
        return {
          status: (isMobileDetected || isTabletDetected) ? 'pass' : 'warning' as const,
          message: `Mobile: ${isMobileDetected}, Tablet: ${isTabletDetected}, UA: ${userAgent.substring(0, 50)}...`
        }
      }
    },
    {
      name: 'Screen Dimensions',
      test: () => {
        const width = window.innerWidth
        const height = window.innerHeight
        const ratio = window.devicePixelRatio || 1
        
        return {
          status: width < 768 ? 'pass' : 'warning' as const,
          message: `${width}x${height}, DPR: ${ratio}, Orientation: ${orientation}`
        }
      }
    },
    {
      name: 'Touch Support',
      test: () => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        const touchPoints = navigator.maxTouchPoints || 0
        
        return {
          status: hasTouch ? 'pass' : 'fail' as const,
          message: `Touch events: ${hasTouch}, Max touch points: ${touchPoints}`
        }
      }
    },
    {
      name: 'Performance Capabilities',
      test: () => {
        const memory = (navigator as any).deviceMemory || 'unknown'
        const cores = navigator.hardwareConcurrency || 'unknown'
        const connection = (navigator as any).connection?.effectiveType || 'unknown'
        
        const isLowEnd = memory <= 2 || cores <= 2
        
        return {
          status: isLowEnd ? 'warning' : 'pass' as const,
          message: `Memory: ${memory}GB, Cores: ${cores}, Connection: ${connection}`
        }
      }
    },
    {
      name: 'Viewport Meta Tag',
      test: () => {
        const viewportMeta = document.querySelector('meta[name="viewport"]')
        const content = viewportMeta?.getAttribute('content') || ''
        
        const hasViewport = !!viewportMeta
        const hasUserScalable = content.includes('user-scalable=no')
        
        return {
          status: hasViewport ? 'pass' : 'fail' as const,
          message: `Viewport meta: ${hasViewport}, Content: ${content.substring(0, 50)}...`
        }
      }
    },
    {
      name: 'Safe Area Support',
      test: () => {
        const style = getComputedStyle(document.documentElement)
        const safeAreaTop = style.getPropertyValue('--safe-area-inset-top')
        const safeAreaBottom = style.getPropertyValue('--safe-area-inset-bottom')
        
        const hasSafeArea = safeAreaTop || safeAreaBottom
        
        return {
          status: hasSafeArea ? 'pass' : 'warning' as const,
          message: `Safe area insets - Top: ${safeAreaTop}, Bottom: ${safeAreaBottom}`
        }
      }
    },
    {
      name: 'Virtual Keyboard Detection',
      test: () => {
        const initialHeight = window.innerHeight
        const currentHeight = window.innerHeight
        const heightDiff = initialHeight - currentHeight
        
        return {
          status: 'pass' as const,
          message: `Keyboard visible: ${keyboardVisible}, Height diff: ${heightDiff}px`
        }
      }
    },
    {
      name: 'Touch Event Performance',
      test: async () => {
        return new Promise<{ status: 'pass' | 'fail' | 'warning', message: string, performance: number }>((resolve) => {
          const startTime = performance.now()
          let touchCount = 0
          
          const testElement = document.createElement('div')
          testElement.style.cssText = 'position: fixed; top: 0; left: 0; width: 100px; height: 100px; z-index: 9999; opacity: 0;'
          document.body.appendChild(testElement)
          
          const handleTouch = () => {
            touchCount++
            if (touchCount >= 10) {
              const endTime = performance.now()
              const avgTime = (endTime - startTime) / touchCount
              
              testElement.removeEventListener('touchstart', handleTouch)
              document.body.removeChild(testElement)
              
              resolve({
                status: avgTime < 16 ? 'pass' : avgTime < 32 ? 'warning' : 'fail',
                message: `Average touch response: ${avgTime.toFixed(2)}ms`,
                performance: avgTime
              })
            }
          }
          
          testElement.addEventListener('touchstart', handleTouch, { passive: true })
          
          // Simulate touches
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              const touchEvent = new TouchEvent('touchstart', {
                touches: [new Touch({
                  identifier: i,
                  target: testElement,
                  clientX: 50,
                  clientY: 50
                })]
              })
              testElement.dispatchEvent(touchEvent)
            }, i * 10)
          }
          
          // Timeout after 2 seconds
          setTimeout(() => {
            if (touchCount < 10) {
              testElement.removeEventListener('touchstart', handleTouch)
              document.body.removeChild(testElement)
              resolve({
                status: 'fail',
                message: 'Touch event test timed out',
                performance: 999
              })
            }
          }, 2000)
        })
      }
    },
    {
      name: 'Scroll Performance',
      test: async () => {
        return new Promise<{ status: 'pass' | 'fail' | 'warning', message: string, performance: number }>((resolve) => {
          const testContainer = document.createElement('div')
          testContainer.style.cssText = `
            position: fixed; top: 0; left: 0; width: 200px; height: 200px; 
            overflow-y: auto; z-index: 9999; opacity: 0;
            -webkit-overflow-scrolling: touch;
          `
          
          // Add content to scroll
          for (let i = 0; i < 100; i++) {
            const item = document.createElement('div')
            item.textContent = `Item ${i}`
            item.style.height = '50px'
            testContainer.appendChild(item)
          }
          
          document.body.appendChild(testContainer)
          
          const startTime = performance.now()
          let frameCount = 0
          let lastTime = startTime
          
          const measureFPS = () => {
            const now = performance.now()
            frameCount++
            
            if (now - lastTime >= 1000) {
              const fps = Math.round((frameCount * 1000) / (now - lastTime))
              
              document.body.removeChild(testContainer)
              
              resolve({
                status: fps >= 50 ? 'pass' : fps >= 30 ? 'warning' : 'fail',
                message: `Scroll FPS: ${fps}`,
                performance: fps
              })
              return
            }
            
            requestAnimationFrame(measureFPS)
          }
          
          // Start scrolling
          testContainer.scrollTop = 0
          let scrollDirection = 1
          const scrollInterval = setInterval(() => {
            testContainer.scrollTop += scrollDirection * 10
            if (testContainer.scrollTop >= testContainer.scrollHeight - testContainer.clientHeight) {
              scrollDirection = -1
            } else if (testContainer.scrollTop <= 0) {
              scrollDirection = 1
            }
          }, 16)
          
          requestAnimationFrame(measureFPS)
          
          // Stop after 2 seconds
          setTimeout(() => {
            clearInterval(scrollInterval)
            if (document.body.contains(testContainer)) {
              document.body.removeChild(testContainer)
              resolve({
                status: 'warning',
                message: 'Scroll test incomplete',
                performance: 0
              })
            }
          }, 2000)
        })
      }
    }
  ]

  const runTests = async () => {
    setIsRunning(true)
    setResults([])
    setProgress(0)
    
    const testResults: TestResult[] = []
    
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i]
      setCurrentTest(test.name)
      setProgress((i / tests.length) * 100)
      
      try {
        const result = await test.test()
        testResults.push({
          test: test.name,
          ...result
        })
      } catch (error) {
        testResults.push({
          test: test.name,
          status: 'fail',
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        })
      }
      
      setResults([...testResults])
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    setProgress(100)
    setCurrentTest('')
    setIsRunning(false)
    onComplete?.(testResults)
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'fail': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return '✓'
      case 'warning': return '⚠'
      case 'fail': return '✗'
      default: return '?'
    }
  }

  return (
    <div ref={testContainerRef} className="mobile-test-suite p-4 bg-black/90 text-green-400 font-mono text-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Mobile Terminal Test Suite</h2>
        <div className="text-xs text-gray-400 mb-4">
          Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} | 
          Orientation: {orientation} | 
          Touch: {touchState.isTouch ? 'Active' : 'Inactive'}
        </div>
      </div>

      {!isRunning && results.length === 0 && (
        <TouchButton
          onClick={runTests}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Run Mobile Tests
        </TouchButton>
      )}

      {isRunning && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span>Running: {currentTest}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-green-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h3 className="font-bold mb-2">Test Results:</h3>
            {results.map((result, index) => (
              <motion.div
                key={result.test}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-600 rounded p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{result.test}</span>
                  <span className={`${getStatusColor(result.status)} font-bold`}>
                    {getStatusIcon(result.status)} {result.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-300 break-words">
                  {result.message}
                </div>
                {result.performance && (
                  <div className="text-xs text-cyan-400 mt-1">
                    Performance: {result.performance.toFixed(2)}ms
                  </div>
                )}
              </motion.div>
            ))}
            
            {!isRunning && (
              <div className="mt-4 p-3 bg-gray-800 rounded">
                <div className="text-sm font-semibold mb-2">Summary:</div>
                <div className="text-xs space-y-1">
                  <div className="text-green-400">
                    Passed: {results.filter(r => r.status === 'pass').length}
                  </div>
                  <div className="text-yellow-400">
                    Warnings: {results.filter(r => r.status === 'warning').length}
                  </div>
                  <div className="text-red-400">
                    Failed: {results.filter(r => r.status === 'fail').length}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Quick mobile compatibility checker
export function MobileCompatibilityChecker() {
  const { isMobile, isTablet, getMobilePerformanceSettings } = useMobileOptimizations()
  const [isVisible, setIsVisible] = useState(false)
  
  const settings = getMobilePerformanceSettings()
  
  useEffect(() => {
    // Show checker on mobile devices
    if (isMobile || isTablet) {
      setIsVisible(true)
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isMobile, isTablet])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 z-50 bg-black/90 border border-green-400 rounded-lg p-3 text-xs font-mono text-green-400 max-w-xs"
    >
      <div className="font-bold mb-2">Mobile Mode Active</div>
      <div className="space-y-1 text-xs">
        <div>Device: {isMobile ? 'Mobile' : 'Tablet'}</div>
        <div>Animations: {settings.enableAnimations ? 'On' : 'Off'}</div>
        <div>Effects: {settings.enableParticles ? 'Full' : 'Reduced'}</div>
        <div>Performance: Optimized</div>
      </div>
      <TouchButton
        onClick={() => setIsVisible(false)}
        className="mt-2 text-xs text-gray-400 hover:text-white"
      >
        Dismiss
      </TouchButton>
    </motion.div>
  )
}