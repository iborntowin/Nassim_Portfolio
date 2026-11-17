import { NextResponse } from 'next/server'
import { isExaConfigured, searchWeb } from '@/lib/exa-search'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/search?q=<query>
 *
 * Exposes the Exa web search module over HTTP so app surfaces (and agents) can
 * fetch relevant web results without a browser API key.
 */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim()

  if (!query) {
    return NextResponse.json(
      { error: 'Missing required "q" query parameter.' },
      { status: 400 }
    )
  }

  if (!isExaConfigured()) {
    return NextResponse.json(
      { error: 'EXA_API_KEY is not configured on the server.' },
      { status: 503 }
    )
  }

  try {
    const results = await searchWeb(query)
    return NextResponse.json({ query, results })
  } catch (error) {
    console.error('Exa search failed:', error)
    return NextResponse.json({ error: 'Web search failed.' }, { status: 502 })
  }
}
