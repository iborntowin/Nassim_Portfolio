import Exa from 'exa-js'

/**
 * Server-side Exa web search.
 *
 * The Exa SDK is only imported from route handlers, never from client
 * components, so the API key stays on the server.
 */

const DEFAULT_NUM_RESULTS = 5

export type ExaSearchHit = {
  title: string | null
  url: string
  publishedDate: string | null
  highlights: string[]
}

export function isExaConfigured(): boolean {
  return Boolean(process.env.EXA_API_KEY)
}

function getExaClient(): Exa {
  const apiKey = process.env.EXA_API_KEY

  if (!apiKey) {
    throw new Error('EXA_API_KEY is not set. Add it to .env.local to enable web search.')
  }

  return new Exa(apiKey)
}

/**
 * Search the web with Exa and return the most relevant pages with their
 * highlights, which are the excerpts Exa considers most relevant to the query.
 */
export async function searchWeb(
  query: string,
  options: { numResults?: number } = {}
): Promise<ExaSearchHit[]> {
  const exa = getExaClient()

  const response = await exa.search(query, {
    type: 'auto',
    numResults: options.numResults ?? DEFAULT_NUM_RESULTS,
    contents: {
      highlights: true,
    },
  })

  return response.results.map((result) => ({
    title: result.title ?? null,
    url: result.url,
    publishedDate: result.publishedDate ?? null,
    highlights: result.highlights ?? [],
  }))
}
