import { getAllProjects } from '@/lib/projects-data'
import {
  CV_PATH,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo-config'

export const dynamic = 'force-static'

/**
 * Plain-text summary for AI answer engines (ChatGPT, Perplexity, Claude,
 * Copilot) so "who is Nassim Maaoui" resolves to this site.
 */
export function GET() {
  const projects = getAllProjects()

  const projectLines = projects
    .map(
      (project) =>
        `- [${project.name}](${SITE_URL}/projects/${project.id}): ${project.description}`
    )
    .join('\n')

  const body = [
    `# ${SITE_NAME}`,
    '',
    '> Nassim Maaoui is a cloud and infrastructure engineer from Tunis, Tunisia. He is a final-year computer engineering student at ESPRIT (graduating June 2027), working with OpenStack, Kubernetes, Ansible, Terraform, Prometheus, Grafana and Linux.',
    '',
    '## Profile',
    '',
    '- Full name: Nassim Maaoui (also written Nassim Maoui)',
    `- Role: Cloud & Infrastructure Engineer, DevOps / Platform / SRE`,
    '- Location: Tunis, Tunisia — remote-friendly, open to relocation to the EU/EEA with sponsorship',
    '- Education: ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies; previously Faculté des Sciences de Bizerte',
    '- Availability: six-month end-of-studies internship, December 2026 – May 2027',
    '- Languages: English, French, Arabic',
    '',
    '## Highlights',
    '',
    '- Built a private OpenStack cloud from bare metal (Nova, Neutron, Cinder, Swift, Glance, Heat) with a Kubernetes layer via Kubespray and Calico.',
    '- Shipped an internal automation and monitoring platform at Huawei Technologies, used by the network operations team across 23 radio sites; it replaced a 30–60 minute manual check with a 4 second query.',
    '- Works end to end on Linux administration, Ansible automation, observability with Prometheus and Grafana, and Python tooling.',
    '',
    '## Projects',
    '',
    projectLines,
    '',
    '## Pages',
    '',
    `- [Portfolio home](${SITE_URL}/): profile, case studies, experience, skills and recruiter FAQ.`,
    `- [Interactive terminal](${SITE_URL}/terminal): the portfolio as a command-line interface.`,
    `- [CV (PDF)](${SITE_URL}${CV_PATH}): one-page curriculum vitae.`,
    '',
    '## Contact',
    '',
    `- Email: ${SITE_EMAIL}`,
    `- GitHub: ${GITHUB_URL}`,
    `- LinkedIn: ${LINKEDIN_URL}`,
    `- Website: ${SITE_URL}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
