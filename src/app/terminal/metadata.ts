import { Metadata } from 'next'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Interactive Terminal — Cloud Engineer Console',
  description:
    'Nassim Maaoui’s portfolio as a command-line interface: browse real infrastructure projects, stack and experience with terminal commands like ls, projects and view 8.',
  keywords: [
    'Nassim Maaoui terminal',
    'Nassim Maaoui',
    'cloud engineer console',
    'devops terminal portfolio',
    'interactive cli portfolio',
    'command line portfolio',
    'kubernetes',
    'openstack',
    'ansible',
    'nassim maaoui',
  ],
  alternates: {
    canonical: '/terminal',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/terminal`,
    siteName: SITE_NAME,
    title: `Interactive Terminal — ${SITE_NAME}`,
    description:
      'Browse the portfolio as a cloud engineer console: projects, stack and experience from the command line.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Nassim Maaoui — terminal portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Interactive Terminal — ${SITE_NAME}`,
    description:
      'Browse the portfolio as a cloud engineer console: projects, stack and experience from the command line.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
}
