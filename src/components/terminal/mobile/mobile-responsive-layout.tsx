"use client"

import { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMobileOptimizations } from './mobile-terminal-optimizations'

interface MobileResponsiveLayoutProps {
  children: ReactNode
  className?: string
}

export function MobileResponsiveLayout({ children, className = '' }: MobileResponsiveLayoutProps) {
  const { 
    isMobile, 
    isTablet, 
    orientation, 
    keyboardVisible, 
    getMobileStyles 
  } = useMobileOptimizations()

  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  // Detect safe area insets for devices with notches/home indicators
  useEffect(() => {
    const updateSafeArea = () => {
      const computedStyle = getComputedStyle(document.documentElement)
      setSafeAreaInsets({
        top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0'),
        right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0')
      })
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
    return () => window.removeEventListener('resize', updateSafeArea)
  }, [])

  const mobileStyles = getMobileStyles()

  if (!isMobile && !isTablet) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`mobile-responsive-layout ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        ...mobileStyles,
        paddingTop: `max(${safeAreaInsets.top}px, 8px)`,
        paddingBottom: keyboardVisible 
          ? '8px' 
          : `max(${safeAreaInsets.bottom}px, 8px)`,
        paddingLeft: `max(${safeAreaInsets.left}px, 8px)`,
        paddingRight: `max(${safeAreaInsets.right}px, 8px)`,
        minHeight: keyboardVisible 
          ? 'calc(100vh - var(--keyboard-height, 0px))' 
          : '100vh',
        overflow: 'hidden'
      }}
    >
      {children}
      
      <style jsx>{`
        .mobile-responsive-layout {
          /* Prevent overscroll bounce on iOS */
          overscroll-behavior: none;
          
          /* Improve touch scrolling */
          -webkit-overflow-scrolling: touch;
          
          /* Prevent zoom on double tap */
          touch-action: manipulation;
          
          /* Optimize for mobile rendering */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          
          /* Ensure proper text sizing */
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        /* Landscape optimizations */
        @media screen and (orientation: landscape) and (max-height: 500px) {
          .mobile-responsive-layout {
            padding-top: 4px;
            padding-bottom: 4px;
          }
        }
        
        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .mobile-responsive-layout {
            /* Sharper text rendering on high DPI displays */
            text-rendering: optimizeLegibility;
          }
        }
      `}</style>
    </motion.div>
  )
}

// Hook for responsive terminal sizing
export function useResponsiveTerminalSize() {
  const [terminalSize, setTerminalSize] = useState({
    width: '100%',
    height: '100vh',
    fontSize: '14px',
    lineHeight: '1.4'
  })

  const { isMobile, isTablet, orientation, keyboardVisible } = useMobileOptimizations()

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      let fontSize = '16px'
      let lineHeight = '1.5'
      let terminalWidth = '100%'
      let terminalHeight = '100vh'

      if (isMobile) {
        fontSize = width < 375 ? '12px' : '14px'
        lineHeight = '1.3'
        terminalHeight = keyboardVisible 
          ? 'calc(100vh - var(--keyboard-height, 0px))' 
          : '100vh'
      } else if (isTablet) {
        fontSize = orientation === 'portrait' ? '14px' : '16px'
        lineHeight = '1.4'
        terminalWidth = orientation === 'portrait' ? '100%' : '95%'
        terminalHeight = '95vh'
      }

      setTerminalSize({
        width: terminalWidth,
        height: terminalHeight,
        fontSize,
        lineHeight
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    window.addEventListener('orientationchange', () => {
      setTimeout(updateSize, 100)
    })

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('orientationchange', updateSize)
    }
  }, [isMobile, isTablet, orientation, keyboardVisible])

  return terminalSize
}

// Mobile-optimized terminal header
export function MobileTerminalHeader({ 
  title = "Terminal", 
  showMetrics = false,
  onClose 
}: {
  title?: string
  showMetrics?: boolean
  onClose?: () => void
}) {
  const { isMobile, isTablet } = useMobileOptimizations()

  if (!isMobile && !isTablet) return null

  return (
    <div className="mobile-terminal-header">
      <div className="flex items-center justify-between p-2 bg-black/90 border-b border-green-400/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-green-400 text-sm font-mono truncate max-w-[120px]">
            {title}
          </span>
        </div>
        
        {showMetrics && !isMobile && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-cyan-400">CPU: 25%</span>
            <span className="text-magenta-400">MEM: 68%</span>
          </div>
        )}
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Close terminal"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Mobile-optimized scrollable content
export function MobileScrollableContent({ 
  children, 
  className = "",
  enablePullToRefresh = false,
  onRefresh
}: {
  children: ReactNode
  className?: string
  enablePullToRefresh?: boolean
  onRefresh?: () => void
}) {
  const { isMobile, isTablet } = useMobileOptimizations()
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)

  useEffect(() => {
    if (!enablePullToRefresh || (!isMobile && !isTablet)) return

    let startY = 0
    let currentY = 0
    let isScrolledToTop = true

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      const scrollTop = (e.target as HTMLElement).scrollTop
      isScrolledToTop = scrollTop === 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolledToTop) return

      currentY = e.touches[0].clientY
      const distance = currentY - startY

      if (distance > 0 && distance < 100) {
        setIsPulling(true)
        setPullDistance(distance)
        e.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      if (isPulling && pullDistance > 50) {
        onRefresh?.()
      }
      setIsPulling(false)
      setPullDistance(0)
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enablePullToRefresh, isMobile, isTablet, isPulling, pullDistance, onRefresh])

  return (
    <div 
      className={`mobile-scrollable-content ${className}`}
      style={{
        transform: isPulling ? `translateY(${pullDistance * 0.5}px)` : 'none',
        transition: isPulling ? 'none' : 'transform 0.3s ease'
      }}
    >
      {isPulling && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center p-2 text-green-400 text-sm">
          {pullDistance > 50 ? 'Release to refresh' : 'Pull to refresh'}
        </div>
      )}
      
      <div 
        className="overflow-y-auto h-full"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#22c55e transparent'
        }}
      >
        {children}
      </div>
      
      <style jsx>{`
        .mobile-scrollable-content {
          position: relative;
          height: 100%;
        }
        
        .mobile-scrollable-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .mobile-scrollable-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .mobile-scrollable-content::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 2px;
        }
        
        .mobile-scrollable-content::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
      `}</style>
    </div>
  )
}