import { Metadata } from 'next'
import { EnhancedTerminal } from '@/components/terminal/enhanced/enhanced-terminal'
import { PersonStructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Enhanced Terminal - Nassim Maaouia | Advanced Cloud Engineer Console',
  description: 'Experience the ultimate interactive terminal interface showcasing advanced cloud-native engineering, DevOps automation, and AI-powered systems. The most immersive command-line portfolio experience.',
  keywords: [
    'enhanced terminal interface',
    'advanced cloud engineer console',
    'interactive devops terminal',
    'cloud native cli',
    'kubernetes terminal',
    'terraform console',
    'ansible terminal',
    'ai powered terminal',
    'nassim maaouia enhanced',
    'cloud engineer portfolio'
  ].join(', '),
  openGraph: {
    title: 'Enhanced Terminal Interface - Nassim Maaouia',
    description: 'The ultimate interactive terminal interface for cloud-native engineering portfolio',
    type: 'website',
    url: 'https://nassimmaaouia.dev/enhanced-terminal',
    images: [
      {
        url: '/images/enhanced-terminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Enhanced Terminal Interface - Advanced Cloud Engineer Console',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enhanced Terminal Interface - Nassim Maaouia',
    description: 'The ultimate interactive terminal interface for cloud-native engineering portfolio',
    images: ['/images/enhanced-terminal-og.jpg'],
  },
}

export default function EnhancedTerminalPage() {
  return (
    <>
      <PersonStructuredData />
      <main className="min-h-screen bg-black overflow-hidden">
        <EnhancedTerminal />
      </main>
    </>
  )
}