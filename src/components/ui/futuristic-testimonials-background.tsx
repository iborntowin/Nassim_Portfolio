"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FuturisticTestimonialsBackground() {
  const shouldReduceMotion = useReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [shouldReduceMotion])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Gradient Mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(var(--color-primary-accent-rgb), 0.15) 0%, 
            rgba(var(--color-secondary-accent-rgb), 0.1) 25%, 
            transparent 50%)`
        }}
        animate={shouldReduceMotion ? {} : {
          background: [
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
             rgba(var(--color-primary-accent-rgb), 0.15) 0%, 
             rgba(var(--color-secondary-accent-rgb), 0.1) 25%, 
             transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x + 10}% ${mousePosition.y + 10}%, 
             rgba(var(--color-secondary-accent-rgb), 0.15) 0%, 
             rgba(var(--color-primary-accent-rgb), 0.1) 25%, 
             transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
             rgba(var(--color-primary-accent-rgb), 0.15) 0%, 
             rgba(var(--color-secondary-accent-rgb), 0.1) 25%, 
             transparent 50%)`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating Geometric Shapes */}
      {!shouldReduceMotion && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + (i * 0.5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-4 h-4 border border-[var(--color-primary-accent)]/20 rotate-45" />
          ) : i % 3 === 1 ? (
            <div className="w-3 h-3 bg-[var(--color-secondary-accent)]/20 rounded-full" />
          ) : (
            <div className="w-5 h-1 bg-[var(--color-primary-accent)]/20 rounded-full" />
          )}
        </motion.div>
      ))}

      {/* Neural Network Lines */}
      {!shouldReduceMotion && (
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(var(--color-primary-accent-rgb), 0.1)" />
              <stop offset="50%" stopColor="rgba(var(--color-secondary-accent-rgb), 0.2)" />
              <stop offset="100%" stopColor="rgba(var(--color-primary-accent-rgb), 0.1)" />
            </linearGradient>
          </defs>
          
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${i * 12.5}%`}
              y1="0%"
              x2={`${100 - (i * 12.5)}%`}
              y2="100%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              opacity="0.3"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      )}

      {/* Pulsing Dots Grid */}
      <div className="absolute inset-0 opacity-20">
        {!shouldReduceMotion && [...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full"
            style={{
              left: `${(i % 10) * 10 + 5}%`,
              top: `${Math.floor(i / 10) * 20 + 10}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: (i % 10) * 0.1 + Math.floor(i / 10) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Scanning Line Effect */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary-accent)] to-transparent opacity-30"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/5 via-transparent to-[var(--color-secondary-accent)]/5 mix-blend-overlay" />
    </div>
  )
}