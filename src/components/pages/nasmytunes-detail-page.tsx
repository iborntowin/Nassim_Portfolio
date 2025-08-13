"use client"

import { DetailedProject } from '@/lib/projects-data'
import ProjectDetailPage from './project-detail-page'
import NasmyTunesJourney from '@/components/projects/nasmytunes-journey'

interface NasmyTunesDetailPageProps {
  project: DetailedProject
}

export default function NasmyTunesDetailPage({ project }: NasmyTunesDetailPageProps) {
  return (
    <>
      <ProjectDetailPage project={project} />
      <NasmyTunesJourney />
    </>
  )
}