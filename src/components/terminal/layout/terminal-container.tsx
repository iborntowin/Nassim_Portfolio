"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function TerminalContainer({ 
  children, 
  legendMode,
  onClick 
}: { 
  children: React.ReactNode
  legendMode?: boolean
  onClick?: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: mounted ? 1 : 0,
        scale: mounted ? 1 : 0.98 
      }}
      transition={{ duration: 0.3 }}
      className={`terminal-container h-full flex flex-col ${
        legendMode ? 'border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
