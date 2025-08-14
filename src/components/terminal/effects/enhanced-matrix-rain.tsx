"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface EnhancedMatrixRainProps {
  mode?: 'normal' | 'legend' | 'cloud'
  intensity?: 'low' | 'medium' | 'high'
  showOverlay?: boolean
  overlayText?: string
}

export function EnhancedMatrixRain({ 
  mode = 'normal', 
  intensity = 'medium',
  showOverlay = true,
  overlayText = 'ENTERING THE MATRIX'
}: EnhancedMatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Character sets based on mode
    const getCharacterSet = () => {
      const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const symbols = '@#$%^&*()_+-=[]{}|;:,.<>?'
      
      switch (mode) {
        case 'cloud':
          return base + symbols + '☁⚡🔧📊⎈🐳📦🚀💻🌐🔥⚙️🛡️📈🔍💾🌟'
        case 'legend':
          return base + symbols + '👑⚡🌟💎🔥🚀💫⭐✨🎯🏆💪🦾🧠🎮'
        default:
          return base + symbols
      }
    }

    const chars = getCharacterSet()
    const charArray = chars.split('')

    // Animation settings based on intensity
    const getSettings = () => {
      switch (intensity) {
        case 'low':
          return { fontSize: 16, speed: 50, resetChance: 0.98 }
        case 'high':
          return { fontSize: 12, speed: 20, resetChance: 0.96 }
        default:
          return { fontSize: 14, speed: 33, resetChance: 0.975 }
      }
    }

    const settings = getSettings()
    const columns = Math.floor(canvas.width / settings.fontSize)

    // Array to store y position and properties of each column
    const drops: Array<{
      y: number
      speed: number
      brightness: number
      isSpecial: boolean
    }> = []

    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * canvas.height / settings.fontSize,
        speed: 0.5 + Math.random() * 1.5,
        brightness: 0.3 + Math.random() * 0.7,
        isSpecial: Math.random() < 0.1 // 10% chance for special characters
      }
    }

    // Color schemes based on mode
    const getColors = () => {
      switch (mode) {
        case 'cloud':
          return {
            primary: '#00ffff', // Cyan
            secondary: '#00ff88', // Green-cyan
            special: '#ff6b35', // Orange for cloud symbols
            glow: 'rgba(0, 255, 255, 0.3)'
          }
        case 'legend':
          return {
            primary: '#ffd700', // Gold
            secondary: '#ff6b35', // Orange
            special: '#ff1493', // Deep pink for legend symbols
            glow: 'rgba(255, 215, 0, 0.3)'
          }
        default:
          return {
            primary: '#00ff00', // Classic green
            secondary: '#88ff88',
            special: '#ffff00', // Yellow for special chars
            glow: 'rgba(0, 255, 0, 0.3)'
          }
      }
    }

    const colors = getColors()

    // Animation function
    const draw = () => {
      // Black background with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${settings.fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        
        // Determine color and effects
        let color = colors.primary
        if (drop.isSpecial && (mode === 'cloud' || mode === 'legend')) {
          color = colors.special
          // Add glow effect for special characters
          ctx.shadowColor = color
          ctx.shadowBlur = 10
        } else {
          ctx.shadowBlur = 0
        }

        // Apply brightness
        const alpha = drop.brightness
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        
        const x = i * settings.fontSize
        const y = drop.y * settings.fontSize

        ctx.fillText(char, x, y)

        // Update drop position
        drop.y += drop.speed

        // Reset drop to top randomly or when it goes off screen
        if (drop.y * settings.fontSize > canvas.height && Math.random() > settings.resetChance) {
          drop.y = 0
          drop.speed = 0.5 + Math.random() * 1.5
          drop.brightness = 0.3 + Math.random() * 0.7
          drop.isSpecial = Math.random() < (mode === 'normal' ? 0.05 : 0.15)
        }
      }

      // Reset shadow for next frame
      ctx.shadowBlur = 0
    }

    // Start animation
    const interval = setInterval(draw, settings.speed)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [mode, intensity])

  const getOverlayContent = () => {
    switch (mode) {
      case 'cloud':
        return {
          title: '☁️ CLOUD MATRIX ACTIVATED ☁️',
          subtitle: 'Connecting to cloud infrastructure...'
        }
      case 'legend':
        return {
          title: '👑 LEGEND MODE MATRIX 👑',
          subtitle: 'Maximum power level achieved...'
        }
      default:
        return {
          title: overlayText,
          subtitle: 'Reality.exe has stopped working...'
        }
    }
  }

  const overlayContent = getOverlayContent()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-10 pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Overlay text */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className={`text-4xl font-bold mb-4 font-mono ${
              mode === 'cloud' ? 'text-cyan-400' :
              mode === 'legend' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {overlayContent.title}
            </div>
            <div className={`text-lg font-mono ${
              mode === 'cloud' ? 'text-cyan-300' :
              mode === 'legend' ? 'text-yellow-300' :
              'text-green-300'
            }`}>
              {overlayContent.subtitle}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}