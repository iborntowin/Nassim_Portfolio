"use client"

import { useEffect, useState, useCallback } from 'react'

interface MobileOptimizationsConfig {
  enableTouchOptimizations?: boolean
  enableVirtualKeyboard?: boolean
  enableSwipeGestures?: boolean
  reducedAnimations?: boolean
}

interface TouchState {
  isTouch: boolean
  lastTouchTime: number
  touchCount: number
  swipeDirection: 'none' | 'up' | 'down' | 'left' | 'right'
}

export function useMobileOptimizations(config: MobileOptimizationsConfig = {}) {
  const {
    enableTouchOptimizations = true,
    enableVirtualKeyboard = true,
    enableSwipeGestures = true,
    reducedAnimations = true
  } = config

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [touchState, setTouchState] = useState<TouchState>({
    isTouch: false,
    lastTouchTime: 0,
    touchCount: 0,
    swipeDirection: 'none'
  })
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Detect device type and capabilities
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const width = window.innerWidth
      const height = window.innerHeight
      
      const isMobileDevice = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || width < 768
      const isTabletDevice = /tablet|ipad/i.test(userAgent) || (width >= 768 && width < 1024)
      
      setIsMobile(isMobileDevice)
      setIsTablet(isTabletDevice)
      setOrientation(width > height ? 'landscape' : 'portrait')
      setViewportHeight(height)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 100) // Delay to get accurate dimensions after orientation change
    })

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('orientationchange', checkDevice)
    }
  }, [])

  // Virtual keyboard detection
  useEffect(() => {
    if (!enableVirtualKeyboard || !isMobile) return

    const initialHeight = window.innerHeight
    
    const handleResize = () => {
      const currentHeight = window.innerHeight
      const heightDifference = initialHeight - currentHeight
      
      // Keyboard is likely visible if height decreased by more than 150px
      const isKeyboardVisible = heightDifference > 150
      setKeyboardVisible(isKeyboardVisible)
      
      if (isKeyboardVisible) {
        // Adjust viewport for keyboard
        document.documentElement.style.setProperty('--keyboard-height', `${heightDifference}px`)
      } else {
        document.documentElement.style.removeProperty('--keyboard-height')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.documentElement.style.removeProperty('--keyboard-height')
    }
  }, [enableVirtualKeyboard, isMobile])

  // Touch event handling
  useEffect(() => {
    if (!enableTouchOptimizations) return

    let touchStartX = 0
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartX = touch.clientX
      touchStartY = touch.clientY
      touchStartTime = Date.now()
      
      setTouchState(prev => ({
        ...prev,
        isTouch: true,
        touchCount: e.touches.length
      }))
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!enableSwipeGestures) return

      const touch = e.changedTouches[0]
      const touchEndX = touch.clientX
      const touchEndY = touch.clientY
      const touchEndTime = Date.now()
      
      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY
      const deltaTime = touchEndTime - touchStartTime
      
      // Detect swipe gestures
      const minSwipeDistance = 50
      const maxSwipeTime = 300
      
      if (deltaTime < maxSwipeTime) {
        let swipeDirection: TouchState['swipeDirection'] = 'none'
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (Math.abs(deltaX) > minSwipeDistance) {
            swipeDirection = deltaX > 0 ? 'right' : 'left'
          }
        } else {
          // Vertical swipe
          if (Math.abs(deltaY) > minSwipeDistance) {
            swipeDirection = deltaY > 0 ? 'down' : 'up'
          }
        }
        
        setTouchState(prev => ({
          ...prev,
          swipeDirection,
          lastTouchTime: touchEndTime
        }))
        
        // Reset swipe direction after a short delay
        setTimeout(() => {
          setTouchState(prev => ({ ...prev, swipeDirection: 'none' }))
        }, 100)
      }
      
      setTouchState(prev => ({
        ...prev,
        isTouch: false,
        touchCount: 0
      }))
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enableTouchOptimizations, enableSwipeGestures])

  // Get mobile-optimized styles
  const getMobileStyles = useCallback(() => {
    if (!isMobile && !isTablet) return {}

    return {
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: isMobile ? '1.4' : '1.5',
      padding: isMobile ? '8px' : '12px',
      minTouchTarget: '44px', // iOS/Android recommended minimum
      scrollBehavior: 'smooth' as const,
      WebkitOverflowScrolling: 'touch' as const,
      // Prevent zoom on input focus
      WebkitTextSizeAdjust: '100%' as const,
      // Improve touch responsiveness
      touchAction: 'manipulation' as const
    }
  }, [isMobile, isTablet])

  // Get performance settings for mobile
  const getMobilePerformanceSettings = useCallback(() => {
    return {
      enableAnimations: !reducedAnimations || (!isMobile && !isTablet),
      animationDuration: isMobile ? 0.2 : 0.3,
      enableParticles: !isMobile,
      enableGlow: !isMobile,
      enableTrails: !isMobile,
      maxHistoryLines: isMobile ? 100 : 500,
      updateInterval: isMobile ? 100 : 50
    }
  }, [isMobile, isTablet, reducedAnimations])

  // Handle input focus for mobile
  const handleMobileInputFocus = useCallback((inputElement: HTMLInputElement) => {
    if (!isMobile) return

    // Scroll input into view
    setTimeout(() => {
      inputElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }, 300) // Wait for keyboard animation

    // Prevent zoom on focus
    inputElement.style.fontSize = '16px'
  }, [isMobile])

  // Handle mobile command input
  const optimizeForMobileInput = useCallback((inputProps: any) => {
    if (!isMobile) return inputProps

    return {
      ...inputProps,
      autoComplete: 'off',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      spellCheck: false,
      inputMode: 'text' as const,
      // Larger touch target
      style: {
        ...inputProps.style,
        minHeight: '44px',
        fontSize: '16px', // Prevent zoom
        padding: '12px'
      }
    }
  }, [isMobile])

  return {
    // Device info
    isMobile,
    isTablet,
    orientation,
    keyboardVisible,
    viewportHeight,
    
    // Touch state
    touchState,
    
    // Optimization functions
    getMobileStyles,
    getMobilePerformanceSettings,
    handleMobileInputFocus,
    optimizeForMobileInput,
    
    // Utility functions
    isLandscape: orientation === 'landscape',
    isPortrait: orientation === 'portrait',
    isTouchDevice: isMobile || isTablet,
    hasVirtualKeyboard: keyboardVisible
  }
}

// Mobile-specific terminal input component
export function MobileTerminalInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Type command...",
  className = "",
  ...props
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  className?: string
  [key: string]: any
}) {
  const { 
    isMobile, 
    optimizeForMobileInput, 
    handleMobileInputFocus,
    keyboardVisible 
  } = useMobileOptimizations()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleMobileInputFocus(e.target)
    props.onFocus?.(e)
  }

  const optimizedProps = optimizeForMobileInput({
    ...props,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    placeholder,
    className: `${className} ${isMobile ? 'mobile-terminal-input' : ''}`
  })

  return (
    <div className={`relative ${keyboardVisible ? 'keyboard-visible' : ''}`}>
      <input {...optimizedProps} />
      
      {/* Mobile-specific UI enhancements */}
      {isMobile && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <button
            type="button"
            onClick={() => onSubmit(value)}
            className="px-2 py-1 bg-green-600 text-white text-xs rounded touch-manipulation"
            style={{ minHeight: '32px', minWidth: '32px' }}
          >
            ↵
          </button>
        </div>
      )}
      
      <style jsx>{`
        .mobile-terminal-input {
          -webkit-appearance: none;
          border-radius: 4px;
          border: 1px solid #00ff41;
          background: rgba(0, 0, 0, 0.8);
          color: #00ff41;
          font-family: 'Courier New', monospace;
        }
        
        .keyboard-visible {
          margin-bottom: var(--keyboard-height, 0px);
        }
        
        @media (max-width: 768px) {
          .mobile-terminal-input:focus {
            transform: scale(1.02);
            transition: transform 0.2s ease;
          }
        }
      `}</style>
    </div>
  )
}