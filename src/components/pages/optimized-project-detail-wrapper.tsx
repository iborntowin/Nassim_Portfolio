"use client"

import { Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DetailedProject } from '@/lib/projects-data'
import FuturisticLoader from '@/components/ui/futuristic-loader'
import ProjectDetailPage from './project-detail-page'
import CessionAppDetailPage from './cession-app-detail-page'
import NasmyTunesDetailPage from './nasmytunes-detail-page'

interface OptimizedProjectDetailWrapperProps {
  project: DetailedProject
}

export default function OptimizedProjectDetailWrapper({ project }: OptimizedProjectDetailWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Safety check for project data
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Project Not Found</h1>
          <p className="text-gray-600">The requested project could not be loaded.</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const initializeProject = async () => {
      try {
        // Simulate minimum loading time for smooth UX
        await new Promise(resolve => setTimeout(resolve, 500))
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading project:', error)
        setIsLoading(false)
      }
    }

    initializeProject()
  }, [project.id])

  // Determine which component to render
  const ProjectComponent = project.id === '1' ? NasmyTunesDetailPage : 
                           project.id === '2' ? CessionAppDetailPage : 
                           ProjectDetailPage

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
              duration: 0.6,
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
    </>
  )
}