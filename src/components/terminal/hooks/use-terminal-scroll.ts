"use client"

import { useRef, useCallback, useState, useEffect } from 'react'

interface UseTerminalScrollOptions {
  smoothScroll?: boolean
  scrollThreshold?: number
  scrollDebounce?: number
  useDocumentScroll?: boolean
}

export function useTerminalScroll({
  smoothScroll = true,
  scrollThreshold = 100,
  scrollDebounce = 100,
  useDocumentScroll = false
}: UseTerminalScrollOptions = {}) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const userScrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Get the scrolling element (either the terminal container or document)
  const getScrollElement = useCallback(() => {
    if (useDocumentScroll) {
      return document.documentElement || document.body
    }
    return terminalRef.current
  }, [useDocumentScroll])

  // Check if terminal is scrolled to bottom
  const checkScrolledToBottom = useCallback(() => {
    const element = getScrollElement()
    if (!element) return true

    const { scrollTop, scrollHeight, clientHeight } = element
    const scrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < scrollThreshold
    setIsScrolledToBottom(scrolledToBottom)
    return scrolledToBottom
  }, [scrollThreshold, getScrollElement])

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
    const element = getScrollElement()
    if (!element || (isUserScrolling && !isScrolledToBottom)) return

    const targetScrollTop = element.scrollHeight + extraSpace - element.clientHeight

    const performScroll = () => {
      try {
        if (useDocumentScroll) {
          window.scrollTo({
            top: targetScrollTop,
            behavior: immediate || !smoothScroll ? 'auto' : 'smooth'
          })
        } else {
          element.scrollTo({
            top: targetScrollTop,
            behavior: immediate || !smoothScroll ? 'auto' : 'smooth'
          })
        }
      } catch (e) {
        // Fallback for older browsers
        if (useDocumentScroll) {
          window.scrollTo(0, targetScrollTop)
        } else {
          element.scrollTop = targetScrollTop
        }
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

    // Final check and correction with scrollIntoView
    setTimeout(() => {
      if (!checkScrolledToBottom()) {
        const element = getScrollElement()
        const lastChild = element?.lastElementChild
        if (lastChild) {
          lastChild.scrollIntoView({
            behavior: immediate || !smoothScroll ? 'auto' : 'smooth',
            block: 'end'
          })
        }
      }
    }, Math.max(...delays) + 50)
  }, [isUserScrolling, isScrolledToBottom, smoothScroll, checkScrolledToBottom, getScrollElement, useDocumentScroll])

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
