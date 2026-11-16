"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Download } from "lucide-react"

const NAV_LINKS = [
  { title: "Projects", href: "/#technical-portfolio" },
  { title: "Experience", href: "/#experience" },
  { title: "Skills", href: "/#skills" },
  { title: "Contact", href: "/#contact" },
  { title: "Terminal mode", href: "/terminal" },
]

const ELSEWHERE_LINKS = [
  { title: "GitHub", href: "https://github.com/iborntowin", icon: Github },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/maaoui-nassim", icon: Linkedin },
  { title: "Email", href: "mailto:nassimmaaoui@outlook.com", icon: Mail },
  { title: "Download CV", href: "/cv/Nassim-Maaoui-CV.pdf", icon: Download },
]

const LEGAL_LINKS = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
]

export function FooterWithGrid() {
  return (
    <footer className="border-t border-[var(--color-secondary-background)] bg-[var(--color-primary-background)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">Nassim Maaoui</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Cloud &amp; infrastructure engineering student at ESPRIT. I build and operate private
              clouds, automation and the tooling that keeps them observable.
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Available for a 6-month internship from December 2026.
            </p>
          </div>

          <nav aria-label="Sections">
            <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Sections</h2>
            <ul className="space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Profiles">
            <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Elsewhere</h2>
            <ul className="space-y-3">
              {ELSEWHERE_LINKS.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mb-3 mt-8 text-sm font-semibold text-[var(--color-text-primary)]">Legal</h2>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-[var(--color-secondary-background)] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Nassim Maaoui. Built with Next.js, TypeScript and Tailwind CSS.
          </p>
          <p className="text-xs font-mono text-[var(--color-text-secondary)]">
            OpenStack · Kubernetes · Ansible · Terraform
          </p>
        </div>
      </div>
    </footer>
  )
}
