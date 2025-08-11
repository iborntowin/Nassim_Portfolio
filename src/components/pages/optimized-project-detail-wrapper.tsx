"use client"

import { Suspense, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DetailedProject } from '@/lib/projects-data'
import { PerformanceMonitor, getAdaptiveSettings, preloadImages } from '@/lib/performance-utils'
import FuturisticLoader from '@/components/ui/futuristic-loader'
import ProjectDetailPage from './project-detail-page'
import CessionAppDetailPage from './cession-app-detail-page'

interface OptimizedProjectDetailWrapperProps {
  project: DetailedProject
}

export default function OptimizedProjectDetailWrapper({ project }: OptimizedProjectDetailWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null)

  const performanceMonitor = useMemo(() => new PerformanceMonitor(), [])
  const adaptiveSettings = useMemo(() => getAdaptiveSettings(), [])

  useEffect(() => {
    const initializeProject = async () => {
      performanceMonitor.startMeasurement('project-load')

      try {
        // Preload critical images for smooth experience
        if (adaptiveSettings.preloadImages && project.images.length > 0) {
          const imageSources = project.images.slice(0, 3).map(img => img.src) // Preload first 3 images
          await preloadImages(imageSources)
          setImagesPreloaded(true)
        }

        // Simulate minimum loading time for smooth UX
        await new Promise(resolve => setTimeout(resolve, 800))

        const loadTime = performanceMonitor.endMeasurement('project-load')
        setPerformanceMetrics({ loadTime })

        setIsLoading(false)
      } catch (error) {
        console.error('Error loading project:', error)
        setIsLoading(false)
      }
    }

    initializeProject()

    // Cleanup on unmount
    return () => {
      performanceMonitor.logPerformance()
    }
  }, [project.id, performanceMonitor, adaptiveSettings.preloadImages, project.images])

  // Determine which component to render
  const ProjectComponent = project.id === '1' ? CessionAppDetailPage : ProjectDetailPage

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <FuturisticLoader
            key="loader"
            isLoading={isLoading}
            message={`Loading ${project.name}...`}
            variant="wave"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: adaptiveSettings.animationDuration,
              ease: "easeOut"
            }}
          >
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <FuturisticLoader
                    isLoading={true}
                    message="Rendering project details..."
                    variant="matrix"
                  />
                </div>
              }
            >
              <ProjectComponent project={project} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance metrics (dev only) */}
      {process.env.NODE_ENV === 'development' && performanceMetrics && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
          Load: {performanceMetrics.loadTime.toFixed(2)}ms
          {imagesPreloaded && <div>Images: Preloaded ✓</div>}
        </div>
      )}
    </>
  )
}