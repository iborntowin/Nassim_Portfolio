"use client"

import { useRef, useCallback, useState, useEffect } from 'react'

interface UseTerminalScrollOptions {
  smoothScroll?: boolean
  scrollThreshold?: number
  scrollDebounce?: number
}

export function useTerminalScroll({
  smoothScroll = true,
  scrollThreshold = 100,
  scrollDebounce = 100
}: UseTerminalScrollOptions = {}) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const userScrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Check if terminal is scrolled to bottom
  const checkScrolledToBottom = useCallback(() => {
    if (!terminalRef.current) return true

    const { scrollTop, scrollHeight, clientHeight } = terminalRef.current
    const scrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < scrollThreshold
    setIsScrolledToBottom(scrolledToBottom)
    return scrolledToBottom
  }, [scrollThreshold])

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current)
    }

    setIsUserScrolling(true)
    checkScrolledToBottom()

    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false)
    }, scrollDebounce)
  }, [checkScrolledToBottom, scrollDebounce])

  // Scroll to bottom with improved reliability
  const scrollToBottom = useCallback((extraSpace = 0, immediate = false) => {
    if (!terminalRef.current || (isUserScrolling && !isScrolledToBottom)) return

    const element = terminalRef.current
    const targetScrollTop = element.scrollHeight + extraSpace - element.clientHeight

    const performScroll = () => {
      try {
        element.scrollTo({
          top: targetScrollTop,
          behavior: immediate || !smoothScroll ? 'auto' : 'smooth'
        })
      } catch (e) {
        // Fallback for older browsers
        element.scrollTop = targetScrollTop
      }
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Initial scroll
    performScroll()

    // Ensure scroll with RAF for smooth animation
    requestAnimationFrame(() => {
      performScroll()
    })

    // Additional attempts for reliability with dynamic content
    const delays = [50, 100, 200]
    delays.forEach(delay => {
      scrollTimeoutRef.current = setTimeout(performScroll, delay)
    })

    // Final check and correction
    setTimeout(() => {
      if (checkScrolledToBottom()) {
        const lastChild = element.lastElementChild
        if (lastChild) {
          lastChild.scrollIntoView({
            behavior: immediate || !smoothScroll ? 'auto' : 'smooth',
            block: 'end'
          })
        }
      }
    }, Math.max(...delays) + 50)
  }, [isUserScrolling, isScrolledToBottom, smoothScroll, checkScrolledToBottom])

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
    }
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
    }
  }, [])

  return {
    terminalRef,
    scrollToBottom,
    isScrolledToBottom,
    isUserScrolling,
    handleScroll
  }
}
