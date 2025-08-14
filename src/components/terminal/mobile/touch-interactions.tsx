"use client"

import { useEffect, useRef, useCallback } from 'react'

interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch'
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  scale?: number
}

interface TouchInteractionsConfig {
  enableTap?: boolean
  enableDoubleTap?: boolean
  enableLongPress?: boolean
  enableSwipe?: boolean
  enablePinch?: boolean
  tapThreshold?: number
  doubleTapDelay?: number
  longPressDelay?: number
  swipeThreshold?: number
  pinchThreshold?: number
}

export function useTouchInteractions(
  elementRef: React.RefObject<HTMLElement>,
  onGesture: (gesture: TouchGesture) => void,
  config: TouchInteractionsConfig = {}
) {
  const {
    enableTap = true,
    enableDoubleTap = true,
    enableLongPress = true,
    enableSwipe = true,
    enablePinch = false,
    tapThreshold = 10,
    doubleTapDelay = 300,
    longPressDelay = 500,
    swipeThreshold = 50,
    pinchThreshold = 0.1
  } = config

  const touchState = useRef({
    startTime: 0,
    startX: 0,
    startY: 0,
    lastTapTime: 0,
    longPressTimer: null as NodeJS.Timeout | null,
    initialDistance: 0,
    initialScale: 1
  })

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    const now = Date.now()
    
    touchState.current.startTime = now
    touchState.current.startX = touch.clientX
    touchState.current.startY = touch.clientY

    // Handle pinch gesture
    if (enablePinch && e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      touchState.current.initialDistance = distance
      touchState.current.initialScale = 1
    }

    // Start long press timer
    if (enableLongPress && e.touches.length === 1) {
      touchState.current.longPressTimer = setTimeout(() => {
        onGesture({ type: 'long-press' })
      }, longPressDelay)
    }
  }, [enablePinch, enableLongPress, longPressDelay, onGesture])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchState.current.startX
    const deltaY = touch.clientY - touchState.current.startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Cancel long press if moved too much
    if (distance > tapThreshold && touchState.current.longPressTimer) {
      clearTimeout(touchState.current.longPressTimer)
      touchState.current.longPressTimer = null
    }

    // Handle pinch gesture
    if (enablePinch && e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      
      const scale = currentDistance / touchState.current.initialDistance
      const scaleChange = Math.abs(scale - touchState.current.initialScale)
      
      if (scaleChange > pinchThreshold) {
        onGesture({ 
          type: 'pinch', 
          scale: scale 
        })
        touchState.current.initialScale = scale
      }
    }
  }, [enablePinch, tapThreshold, pinchThreshold, onGesture])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const now = Date.now()
    const duration = now - touchState.current.startTime
    const deltaX = touch.clientX - touchState.current.startX
    const deltaY = touch.clientY - touchState.current.startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Clear long press timer
    if (touchState.current.longPressTimer) {
      clearTimeout(touchState.current.longPressTimer)
      touchState.current.longPressTimer = null
    }

    // Handle tap gestures
    if (distance < tapThreshold && duration < 500) {
      const timeSinceLastTap = now - touchState.current.lastTapTime

      if (enableDoubleTap && timeSinceLastTap < doubleTapDelay) {
        onGesture({ type: 'double-tap' })
        touchState.current.lastTapTime = 0 // Reset to prevent triple tap
      } else if (enableTap) {
        // Delay single tap to check for double tap
        setTimeout(() => {
          if (now - touchState.current.lastTapTime >= doubleTapDelay) {
            onGesture({ type: 'tap' })
          }
        }, doubleTapDelay)
        touchState.current.lastTapTime = now
      }
    }

    // Handle swipe gestures
    if (enableSwipe && distance > swipeThreshold && duration < 500) {
      let direction: 'up' | 'down' | 'left' | 'right'
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }

      onGesture({
        type: 'swipe',
        direction,
        distance,
        duration
      })
    }
  }, [enableTap, enableDoubleTap, enableSwipe, tapThreshold, doubleTapDelay, swipeThreshold, onGesture])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      
      // Cleanup timer
      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer)
      }
    }
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd])
}

// Touch-optimized button component
export function TouchButton({
  children,
  onClick,
  onLongPress,
  className = "",
  disabled = false,
  hapticFeedback = true,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  onLongPress?: () => void
  className?: string
  disabled?: boolean
  hapticFeedback?: boolean
  [key: string]: any
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const triggerHapticFeedback = useCallback(() => {
    if (!hapticFeedback) return
    
    // Use Vibration API if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10) // Short vibration
    }
  }, [hapticFeedback])

  useTouchInteractions(
    buttonRef,
    (gesture) => {
      if (disabled) return

      switch (gesture.type) {
        case 'tap':
          triggerHapticFeedback()
          onClick?.()
          break
        case 'long-press':
          triggerHapticFeedback()
          onLongPress?.()
          break
      }
    },
    {
      enableTap: true,
      enableLongPress: !!onLongPress,
      enableDoubleTap: false,
      enableSwipe: false
    }
  )

  return (
    <button
      ref={buttonRef}
      className={`touch-button ${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      {...props}
      style={{
        minHeight: '44px', // iOS/Android recommended minimum
        minWidth: '44px',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        ...props.style
      }}
    >
      {children}
      
      <style jsx>{`
        .touch-button {
          position: relative;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        
        .touch-button:active:not(.disabled) {
          transform: scale(0.95);
          opacity: 0.8;
        }
        
        .touch-button.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .touch-button::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: inherit;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .touch-button:active:not(.disabled)::before {
          opacity: 1;
        }
      `}</style>
    </button>
  )
}

// Swipeable container for mobile navigation
export function SwipeableContainer({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = "",
  swipeThreshold = 50
}: {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  swipeThreshold?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useTouchInteractions(
    containerRef,
    (gesture) => {
      if (gesture.type === 'swipe') {
        switch (gesture.direction) {
          case 'left':
            onSwipeLeft?.()
            break
          case 'right':
            onSwipeRight?.()
            break
          case 'up':
            onSwipeUp?.()
            break
          case 'down':
            onSwipeDown?.()
            break
        }
      }
    },
    {
      enableSwipe: true,
      swipeThreshold,
      enableTap: false,
      enableDoubleTap: false,
      enableLongPress: false
    }
  )

  return (
    <div
      ref={containerRef}
      className={`swipeable-container ${className}`}
      style={{
        touchAction: 'pan-y', // Allow vertical scrolling but capture horizontal swipes
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {children}
    </div>
  )
}

// Touch-optimized input with better mobile UX
export function TouchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  className = "",
  autoFocus = false,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
  [key: string]: any
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault()
      onSubmit(value)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Scroll input into view on mobile
    setTimeout(() => {
      e.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }, 300)
    
    props.onFocus?.(e)
  }

  return (
    <div className="touch-input-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={`touch-input ${className}`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        autoFocus={autoFocus}
        {...props}
        style={{
          fontSize: '16px', // Prevent zoom on iOS
          minHeight: '44px',
          padding: '12px',
          border: '1px solid #00ff41',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#00ff41',
          borderRadius: '4px',
          fontFamily: 'monospace',
          ...props.style
        }}
      />
      
      <style jsx>{`
        .touch-input-container {
          position: relative;
        }
        
        .touch-input {
          width: 100%;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        .touch-input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
        }
        
        /* Prevent zoom on focus for iOS */
        @media screen and (max-width: 768px) {
          .touch-input {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}