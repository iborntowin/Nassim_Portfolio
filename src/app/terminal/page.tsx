import { Metadata } from 'next'
import { PersonStructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Terminal Interface - Nassim Maaoui | Cloud Engineer Console',
  description: 'Interactive terminal interface showcasing cloud-native engineering, DevOps automation, and AI-powered systems. Experience the portfolio through a living command-line interface.',
  keywords: [
    'terminal interface',
    'cloud engineer',
    'devops console',
    'interactive cli',
    'command line portfolio',
    'cloud native',
    'kubernetes',
    'terraform',
    'ansible',
    'nassim maaoui'
  ].join(', '),
  openGraph: {
    title: 'Terminal Interface - Nassim Maaoui',
    description: 'Interactive terminal interface for cloud-native engineering portfolio',
    type: 'website',
    url: 'https://nassimmaaoui.dev/terminal',
    images: [
      {
        url: '/images/terminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Interactive Terminal Interface - Cloud Engineer Console',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal Interface - Nassim Maaoui',
    description: 'Interactive terminal interface for cloud-native engineering portfolio',
    images: ['/images/terminal-og.jpg'],
  },
}

import { TerminalClient } from './terminal-client'

export default function TerminalPage() {
  return <TerminalClient />
}