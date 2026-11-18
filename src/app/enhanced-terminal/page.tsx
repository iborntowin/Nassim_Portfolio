import { Metadata } from 'next'
import { EnhancedTerminal } from '@/components/terminal/enhanced/enhanced-terminal'
import { PersonStructuredData } from '@/components/seo/structured-data'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Enhanced Terminal — Advanced Cloud Engineer Console',
  description:
    'The advanced terminal view of Nassim Maaoui’s cloud engineering portfolio: explore OpenStack, Kubernetes, Ansible and Terraform work through an immersive command-line interface.',
  alternates: {
    canonical: '/enhanced-terminal',
  },
  keywords: [
    'Nassim Maaoui enhanced terminal',
    'Nassim Maaoui',
    'advanced cloud engineer console',
    'interactive devops terminal',
    'cloud native cli',
    'kubernetes terminal',
    'terraform console',
    'ansible terminal',
    'cloud engineer portfolio',
  ],
  openGraph: {
    title: `Enhanced Terminal — ${SITE_NAME}`,
    description:
      'An immersive command-line view of Nassim Maaoui’s cloud and infrastructure engineering work.',
    type: 'website',
    url: `${SITE_URL}/enhanced-terminal`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Enhanced Terminal Interface — Nassim Maaoui',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Enhanced Terminal — ${SITE_NAME}`,
    description:
      'An immersive command-line view of Nassim Maaoui’s cloud and infrastructure engineering work.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
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
