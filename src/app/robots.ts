import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Answer engines can read the structured summary explicitly.
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: ['/', '/llms.txt'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
