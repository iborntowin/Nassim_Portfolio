"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GlitchAnimationProps {
  trigger: boolean
  intensity?: 'low' | 'medium' | 'high'
  duration?: number
  elements?: string[] // CSS selectors to affect
  onComplete?: () => void
}

export function GlitchAnimation({ 
  trigger, 
  intensity = 'medium',
  duration = 3000,
  elements = ['body'],
  onComplete
}: GlitchAnimationProps) {
  const [isActive, setIsActive] = useState(false)
  const [glitchFrames, setGlitchFrames] = useState<Array<{
    id: string
    x: number
    y: number
    width: number
    height: number
    color: string
    opacity: number
  }>>([])

  useEffect(() => {
    if (trigger) {
      setIsActive(true)
      
      // Generate random glitch frames
      const frames = Array.from({ length: intensity === 'high' ? 20 : intensity === 'medium' ? 12 : 6 }, (_, i) => ({
        id: `glitch-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        width: 50 + Math.random() * 200,
        height: 2 + Math.random() * 8,
        color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)],
        opacity: 0.3 + Math.random() * 0.7
      }))
      setGlitchFrames(frames)

      // Apply CSS glitch effects to specified elements
      elements.forEach(selector => {
        const element = document.querySelector(selector) as HTMLElement
        if (element) {
          element.style.animation = `glitch-${intensity} ${duration}ms ease-in-out`
        }
      })

      // Clean up after duration
      const timeout = setTimeout(() => {
        setIsActive(false)
        setGlitchFrames([])
        
        // Remove CSS animations
        elements.forEach(selector => {
          const element = document.querySelector(selector) as HTMLElement
          if (element) {
            element.style.animation = ''
          }
        })
        
        onComplete?.()
      }, duration)

      return () => clearTimeout(timeout)
    }
  }, [trigger, intensity, duration, elements, onComplete])

  // Inject CSS keyframes for glitch effects
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes glitch-low {
        0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
        10% { transform: translate(-2px, 1px); filter: hue-rotate(90deg); }
        20% { transform: translate(2px, -1px); filter: hue-rotate(180deg); }
        30% { transform: translate(-1px, 2px); filter: hue-rotate(270deg); }
        40% { transform: translate(1px, -2px); filter: hue-rotate(360deg); }
        50% { transform: translate(-2px, -1px); filter: hue-rotate(90deg); }
        60% { transform: translate(2px, 1px); filter: hue-rotate(180deg); }
        70% { transform: translate(-1px, -2px); filter: hue-rotate(270deg); }
        80% { transform: translate(1px, 2px); filter: hue-rotate(360deg); }
        90% { transform: translate(-2px, -1px); filter: hue-rotate(90deg); }
      }
      
      @keyframes glitch-medium {
        0%, 100% { transform: translate(0) scale(1); filter: hue-rotate(0deg) contrast(1); }
        5% { transform: translate(-5px, 2px) scale(1.01); filter: hue-rotate(90deg) contrast(1.2); }
        10% { transform: translate(5px, -2px) scale(0.99); filter: hue-rotate(180deg) contrast(0.8); }
        15% { transform: translate(-3px, 4px) scale(1.02); filter: hue-rotate(270deg) contrast(1.5); }
        20% { transform: translate(3px, -4px) scale(0.98); filter: hue-rotate(360deg) contrast(0.7); }
        25% { transform: translate(-4px, -2px) scale(1.01); filter: hue-rotate(45deg) contrast(1.3); }
        30% { transform: translate(4px, 2px) scale(0.99); filter: hue-rotate(135deg) contrast(0.9); }
        35% { transform: translate(-2px, -4px) scale(1.02); filter: hue-rotate(225deg) contrast(1.4); }
        40% { transform: translate(2px, 4px) scale(0.98); filter: hue-rotate(315deg) contrast(0.8); }
        45% { transform: translate(-5px, -2px) scale(1.01); filter: hue-rotate(60deg) contrast(1.2); }
        50% { transform: translate(5px, 2px) scale(0.99); filter: hue-rotate(120deg) contrast(1.1); }
        55% { transform: translate(-3px, -4px) scale(1.02); filter: hue-rotate(240deg) contrast(0.9); }
        60% { transform: translate(3px, 4px) scale(0.98); filter: hue-rotate(300deg) contrast(1.3); }
        65% { transform: translate(-4px, 2px) scale(1.01); filter: hue-rotate(30deg) contrast(0.8); }
        70% { transform: translate(4px, -2px) scale(0.99); filter: hue-rotate(150deg) contrast(1.4); }
        75% { transform: translate(-2px, 4px) scale(1.02); filter: hue-rotate(210deg) contrast(0.7); }
        80% { transform: translate(2px, -4px) scale(0.98); filter: hue-rotate(330deg) contrast(1.5); }
        85% { transform: translate(-5px, -2px) scale(1.01); filter: hue-rotate(75deg) contrast(1.1); }
        90% { transform: translate(5px, 2px) scale(0.99); filter: hue-rotate(165deg) contrast(0.9); }
        95% { transform: translate(-3px, -4px) scale(1.02); filter: hue-rotate(255deg) contrast(1.2); }
      }
      
      @keyframes glitch-high {
        0%, 100% { transform: translate(0) scale(1) skew(0deg); filter: hue-rotate(0deg) contrast(1) brightness(1); }
        2% { transform: translate(-8px, 3px) scale(1.05) skew(2deg); filter: hue-rotate(90deg) contrast(1.5) brightness(1.2); }
        4% { transform: translate(8px, -3px) scale(0.95) skew(-2deg); filter: hue-rotate(180deg) contrast(0.5) brightness(0.8); }
        6% { transform: translate(-5px, 6px) scale(1.08) skew(3deg); filter: hue-rotate(270deg) contrast(2) brightness(1.5); }
        8% { transform: translate(5px, -6px) scale(0.92) skew(-3deg); filter: hue-rotate(360deg) contrast(0.3) brightness(0.6); }
        10% { transform: translate(-7px, -3px) scale(1.03) skew(1deg); filter: hue-rotate(45deg) contrast(1.8) brightness(1.3); }
        12% { transform: translate(7px, 3px) scale(0.97) skew(-1deg); filter: hue-rotate(135deg) contrast(0.7) brightness(0.9); }
        14% { transform: translate(-4px, -6px) scale(1.06) skew(4deg); filter: hue-rotate(225deg) contrast(2.2) brightness(1.6); }
        16% { transform: translate(4px, 6px) scale(0.94) skew(-4deg); filter: hue-rotate(315deg) contrast(0.4) brightness(0.7); }
        18% { transform: translate(-9px, -2px) scale(1.04) skew(2deg); filter: hue-rotate(60deg) contrast(1.6) brightness(1.1); }
        20% { transform: translate(9px, 2px) scale(0.96) skew(-2deg); filter: hue-rotate(120deg) contrast(0.8) brightness(1.4); }
        22% { transform: translate(-6px, -5px) scale(1.07) skew(3deg); filter: hue-rotate(240deg) contrast(1.9) brightness(0.8); }
        24% { transform: translate(6px, 5px) scale(0.93) skew(-3deg); filter: hue-rotate(300deg) contrast(0.6) brightness(1.7); }
        26% { transform: translate(-8px, 4px) scale(1.02) skew(1deg); filter: hue-rotate(30deg) contrast(1.3) brightness(0.9); }
        28% { transform: translate(8px, -4px) scale(0.98) skew(-1deg); filter: hue-rotate(150deg) contrast(2.1) brightness(1.8); }
        30% { transform: translate(-3px, 7px) scale(1.09) skew(5deg); filter: hue-rotate(210deg) contrast(0.2) brightness(0.5); }
        32% { transform: translate(3px, -7px) scale(0.91) skew(-5deg); filter: hue-rotate(330deg) contrast(2.5) brightness(2); }
        34% { transform: translate(-10px, -1px) scale(1.01) skew(2deg); filter: hue-rotate(75deg) contrast(1.4) brightness(1.2); }
        36% { transform: translate(10px, 1px) scale(0.99) skew(-2deg); filter: hue-rotate(165deg) contrast(0.9) brightness(0.7); }
        38% { transform: translate(-5px, -8px) scale(1.05) skew(3deg); filter: hue-rotate(255deg) contrast(1.7) brightness(1.5); }
        40% { transform: translate(5px, 8px) scale(0.95) skew(-3deg); filter: hue-rotate(345deg) contrast(0.5) brightness(0.8); }
        42% { transform: translate(-7px, 2px) scale(1.08) skew(4deg); filter: hue-rotate(15deg) contrast(2.3) brightness(1.9); }
        44% { transform: translate(7px, -2px) scale(0.92) skew(-4deg); filter: hue-rotate(105deg) contrast(0.3) brightness(0.6); }
        46% { transform: translate(-4px, 9px) scale(1.06) skew(1deg); filter: hue-rotate(195deg) contrast(1.8) brightness(1.3); }
        48% { transform: translate(4px, -9px) scale(0.94) skew(-1deg); filter: hue-rotate(285deg) contrast(0.7) brightness(1.6); }
        50% { transform: translate(-11px, -3px) scale(1.03) skew(2deg); filter: hue-rotate(45deg) contrast(2) brightness(1.1); }
        52% { transform: translate(11px, 3px) scale(0.97) skew(-2deg); filter: hue-rotate(135deg) contrast(0.6) brightness(1.4); }
        54% { transform: translate(-6px, -7px) scale(1.07) skew(5deg); filter: hue-rotate(225deg) contrast(1.5) brightness(0.9); }
        56% { transform: translate(6px, 7px) scale(0.93) skew(-5deg); filter: hue-rotate(315deg) contrast(2.4) brightness(1.7); }
        58% { transform: translate(-9px, 5px) scale(1.04) skew(3deg); filter: hue-rotate(60deg) contrast(0.4) brightness(0.8); }
        60% { transform: translate(9px, -5px) scale(0.96) skew(-3deg); filter: hue-rotate(120deg) contrast(1.9) brightness(1.8); }
        62% { transform: translate(-2px, 10px) scale(1.09) skew(4deg); filter: hue-rotate(240deg) contrast(0.8) brightness(0.7); }
        64% { transform: translate(2px, -10px) scale(0.91) skew(-4deg); filter: hue-rotate(300deg) contrast(2.2) brightness(2.1); }
        66% { transform: translate(-12px, -4px) scale(1.02) skew(1deg); filter: hue-rotate(30deg) contrast(1.2) brightness(1.2); }
        68% { transform: translate(12px, 4px) scale(0.98) skew(-1deg); filter: hue-rotate(150deg) contrast(0.9) brightness(0.6); }
        70% { transform: translate(-7px, -9px) scale(1.05) skew(2deg); filter: hue-rotate(210deg) contrast(1.6) brightness(1.5); }
        72% { transform: translate(7px, 9px) scale(0.95) skew(-2deg); filter: hue-rotate(330deg) contrast(0.5) brightness(0.9); }
        74% { transform: translate(-8px, 6px) scale(1.08) skew(6deg); filter: hue-rotate(75deg) contrast(2.1) brightness(1.9); }
        76% { transform: translate(8px, -6px) scale(0.92) skew(-6deg); filter: hue-rotate(165deg) contrast(0.3) brightness(0.5); }
        78% { transform: translate(-3px, 11px) scale(1.06) skew(3deg); filter: hue-rotate(255deg) contrast(1.7) brightness(1.3); }
        80% { transform: translate(3px, -11px) scale(0.94) skew(-3deg); filter: hue-rotate(345deg) contrast(0.7) brightness(1.6); }
        82% { transform: translate(-13px, -2px) scale(1.01) skew(4deg); filter: hue-rotate(15deg) contrast(2.3) brightness(1.1); }
        84% { transform: translate(13px, 2px) scale(0.99) skew(-4deg); filter: hue-rotate(105deg) contrast(0.6) brightness(1.4); }
        86% { transform: translate(-5px, -10px) scale(1.07) skew(5deg); filter: hue-rotate(195deg) contrast(1.4) brightness(0.8); }
        88% { transform: translate(5px, 10px) scale(0.93) skew(-5deg); filter: hue-rotate(285deg) contrast(2.5) brightness(1.7); }
        90% { transform: translate(-10px, 7px) scale(1.04) skew(2deg); filter: hue-rotate(45deg) contrast(0.4) brightness(0.7); }
        92% { transform: translate(10px, -7px) scale(0.96) skew(-2deg); filter: hue-rotate(135deg) contrast(1.8) brightness(1.8); }
        94% { transform: translate(-4px, 12px) scale(1.09) skew(1deg); filter: hue-rotate(225deg) contrast(0.8) brightness(0.9); }
        96% { transform: translate(4px, -12px) scale(0.91) skew(-1deg); filter: hue-rotate(315deg) contrast(2.1) brightness(2); }
        98% { transform: translate(-14px, -5px) scale(1.03) skew(3deg); filter: hue-rotate(60deg) contrast(1.3) brightness(1.2); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          {/* Digital noise overlay */}
          <div className="absolute inset-0 bg-black opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                 animation: 'glitch-noise 0.1s infinite'
               }} 
          />

          {/* Glitch bars */}
          {glitchFrames.map((frame) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: [0, frame.opacity, 0],
                scaleX: [0, 1, 0],
                x: [frame.x, frame.x + (Math.random() - 0.5) * 100, frame.x]
              }}
              transition={{ 
                duration: 0.1 + Math.random() * 0.2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="absolute"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
                backgroundColor: frame.color,
                mixBlendMode: 'screen'
              }}
            />
          ))}

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                 animation: 'scanlines 0.1s linear infinite'
               }}
          />

          {/* RGB split effect */}
          <div className="absolute inset-0 mix-blend-screen opacity-30"
               style={{
                 background: 'linear-gradient(90deg, #ff0000 0%, transparent 33%, #00ff00 33%, transparent 66%, #0000ff 66%, transparent 100%)',
                 animation: 'rgb-split 0.05s infinite alternate'
               }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Additional CSS for animations
const additionalStyles = `
  @keyframes glitch-noise {
    0% { transform: translate(0); }
    10% { transform: translate(-5px, -5px); }
    20% { transform: translate(-10px, 5px); }
    30% { transform: translate(5px, -10px); }
    40% { transform: translate(-5px, 15px); }
    50% { transform: translate(-10px, 5px); }
    60% { transform: translate(15px, 0); }
    70% { transform: translate(0, 5px); }
    80% { transform: translate(-15px, 0); }
    90% { transform: translate(10px, 5px); }
    100% { transform: translate(5px, 0); }
  }
  
  @keyframes scanlines {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }
  
  @keyframes rgb-split {
    0% { transform: translate(0); filter: hue-rotate(0deg); }
    33% { transform: translate(-2px, 0); filter: hue-rotate(120deg); }
    66% { transform: translate(2px, 0); filter: hue-rotate(240deg); }
    100% { transform: translate(0); filter: hue-rotate(360deg); }
  }
`

// Inject additional styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = additionalStyles
  document.head.appendChild(styleSheet)
}