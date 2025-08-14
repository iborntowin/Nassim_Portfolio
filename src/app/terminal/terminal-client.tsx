"use client"

import dynamic from 'next/dynamic'

const FullPageTerminal = dynamic(
  () => import('@/components/terminal/full-page/full-page-terminal').then(mod => ({ default: mod.FullPageTerminal })),
  { ssr: false }
)

export function TerminalClient() {
  return <FullPageTerminal />
}
