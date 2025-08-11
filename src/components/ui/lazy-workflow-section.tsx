"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkflowStep } from '@/lib/projects-data'

interface LazyWorkflowSectionProps {
  workflow: WorkflowStep[]
  shouldReduceMotion: boolean
}

export default function LazyWorkflowSection({ workflow, shouldReduceMotion }: LazyWorkflowSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!isInView) {
    return (
      <div ref={ref} className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {workflow.map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        Development Workflow
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {workflow.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: shouldReduceMotion ? 0.2 : 0.6, 
              delay: shouldReduceMotion ? 0 : index * 0.1,
              ease: "easeOut"
            }}
            className="group"
          >
            <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full hover:border-[var(--color-primary-accent)]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-primary-accent)]/10 transform hover:scale-105">
              <CardHeader className="text-center pb-3">
                {/* Animated icon with futuristic glow */}
                <motion.div 
                  className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: shouldReduceMotion ? 0 : 5 }}
                >
                  <span className="inline-block group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary-accent-rgb),0.5)] transition-all duration-300">
                    {step.icon}
                  </span>
                </motion.div>
                
                <CardTitle className="text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-accent)] transition-colors duration-300">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <motion.li 
                      key={detailIndex} 
                      className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2 group-hover:text-[var(--color-text-primary)] transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0.1 : 0.3, 
                        delay: shouldReduceMotion ? 0 : (index * 0.1) + (detailIndex * 0.05)
                      }}
                    >
                      <motion.span 
                        className="w-1.5 h-1.5 bg-[var(--color-primary-accent)] rounded-full mt-1.5 flex-shrink-0 group-hover:shadow-[0_0_4px_var(--color-primary-accent)] transition-all duration-300"
                        whileHover={{ scale: shouldReduceMotion ? 1 : 1.5 }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              
              {/* Futuristic border animation */}
              <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}