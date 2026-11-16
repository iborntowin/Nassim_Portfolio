"use client"

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { DetailedProject } from '@/lib/projects-data'
import ProjectDetailPage from './project-detail-page'
import CessionAppDetailPage from './cession-app-detail-page'
import NasmyTunesDetailPage from './nasmytunes-detail-page'
import ErpDetailPage from './erp-detail-page'
import OpenStackDetailPage from './openstack-detail-page'

interface OptimizedProjectDetailWrapperProps {
  project: DetailedProject
}

export default function OptimizedProjectDetailWrapper({ project }: OptimizedProjectDetailWrapperProps) {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Project not found</h1>
          <p className="text-gray-600">The requested project could not be loaded.</p>
        </div>
      </div>
    )
  }

  // Determine which component to render
  const ProjectComponent =
    project.id === '8' ? OpenStackDetailPage :
    project.id === '7' ? ErpDetailPage :
    project.id === '1' ? NasmyTunesDetailPage :
    project.id === '2' ? CessionAppDetailPage :
    ProjectDetailPage

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectComponent project={project} />
      </Suspense>
    </motion.div>
  )
}
