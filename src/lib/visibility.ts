/**
 * Project visibility switch.
 *
 * Add a project id here to hide it from the public site: it disappears from the
 * homepage grid, the timeline, the terminal and the sitemap, and its detail page
 * returns 404. The project itself stays in `src/lib/projects-data.ts` with all of
 * its content, so removing the id from this list publishes it again immediately —
 * no other change is needed.
 *
 * Currently hidden:
 *   '9' — HuaweiHelper (internal Huawei work)
 */
export const HIDDEN_PROJECT_IDS: readonly string[] = ['9']

export function isProjectPublic(id: string): boolean {
  return !HIDDEN_PROJECT_IDS.includes(id)
}
