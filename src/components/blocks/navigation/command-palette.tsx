'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  Command,
  CornerDownLeft,
  Download,
  FolderGit2,
  Github,
  Layers,
  Linkedin,
  Mail,
  Search,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import { getAllProjects } from '@/lib/projects-data'
import { cn } from '@/lib/utils'

interface PaletteItem {
  id: string
  label: string
  hint?: string
  group: 'Sections' | 'Projects' | 'Elsewhere'
  href: string
  icon: LucideIcon
  external?: boolean
  internal?: boolean
}

const SECTION_ITEMS: PaletteItem[] = [
  { id: 'work', label: 'Selected work', hint: 'Case studies', group: 'Sections', href: '/#technical-portfolio', icon: Layers },

  { id: 'experience', label: 'Experience & education', hint: 'Huawei, Tech4IoT, Eleonetech', group: 'Sections', href: '/#experience', icon: Layers },
  { id: 'skills', label: 'Technical skills', hint: 'Cloud, automation, observability', group: 'Sections', href: '/#skills', icon: Layers },
  { id: 'faq', label: 'Recruiter FAQ', hint: 'Start date, visa, roles', group: 'Sections', href: '/#faq', icon: Layers },
  { id: 'contact', label: 'Contact', hint: 'Email and CV', group: 'Sections', href: '/#contact', icon: Mail },
  { id: 'terminal', label: 'Terminal mode', hint: 'The site as a shell', group: 'Sections', href: '/terminal', icon: Terminal, internal: true },
]

const ELSEWHERE_ITEMS: PaletteItem[] = [
  { id: 'github', label: 'GitHub', hint: 'github.com/iborntowin', group: 'Elsewhere', href: 'https://github.com/iborntowin', icon: Github, external: true },
  { id: 'linkedin', label: 'LinkedIn', hint: 'maaoui-nassim', group: 'Elsewhere', href: 'https://www.linkedin.com/in/maaoui-nassim', icon: Linkedin, external: true },
  { id: 'email', label: 'Email Nassim', hint: 'nassimmaaoui@outlook.com', group: 'Elsewhere', href: 'mailto:nassimmaaoui@outlook.com', icon: Mail },
  { id: 'cv', label: 'Download CV', hint: 'PDF, one page', group: 'Elsewhere', href: '/cv/Nassim-Maaoui-CV.pdf', icon: Download, external: true },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const items = useMemo<PaletteItem[]>(() => {
    const projectItems: PaletteItem[] = getAllProjects().map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      hint: project.category,
      group: 'Projects',
      href: `/projects/${project.id}`,
      icon: FolderGit2,
      internal: true,
    }))
    return [...SECTION_ITEMS, ...projectItems, ...ELSEWHERE_ITEMS]
  }, [])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return items
    return items.filter((item) =>
      `${item.label} ${item.hint ?? ''} ${item.group}`.toLowerCase().includes(needle)
    )
  }, [items, query])

  // Global ⌘K / Ctrl+K shortcuts
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  // Focus the search field, reset the query and lock background scrolling
  useEffect(() => {
    if (!open) return
    setQuery('')
    setSelected(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const element = document.getElementById(`palette-item-${selected}`)
    element?.scrollIntoView({ block: 'nearest' })
  }, [open, selected])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const go = (item: PaletteItem) => {
    onOpenChange(false)
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (item.href.startsWith('mailto:')) {
      window.location.href = item.href
      return
    }
    if (item.internal) {
      router.push(item.href)
      return
    }
    if (item.href.startsWith('/#')) {
      const hash = item.href.slice(1)
      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', hash)
      })
      return
    }
    window.location.assign(item.href)
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((current) => (results.length ? (current + 1) % results.length : 0))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((current) => (results.length ? (current - 1 + results.length) % results.length : 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const item = results[selected]
      if (item) go(item)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--color-text-secondary)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Jump to a section, project or profile…"
            aria-label="Search the portfolio"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-autocomplete="list"
            className="h-8 w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]/70"
          />
          <kbd className="hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-secondary)] sm:block">
            esc
          </kbd>
        </div>

        <ul
          id="command-palette-results"
          role="listbox"
          aria-label="Results"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-[var(--color-text-secondary)]">
              Nothing matches “{query}”. Try “impact”, “OpenStack” or “CV”.
            </li>
          )}

          {results.map((item, index) => {
            const Icon = item.icon
            const isSelected = index === selected
            const showGroup = index === 0 || results[index - 1]?.group !== item.group
            return (
              <li key={item.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]/70">
                    {item.group}
                  </p>
                )}
                <button
                  id={`palette-item-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => go(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                    isSelected ? 'bg-cyan-400/10 text-white' : 'text-[var(--color-text-secondary)]'
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', isSelected ? 'text-cyan-300' : '')} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{item.label}</span>
                    {item.hint && (
                      <span className="block truncate text-xs text-[var(--color-text-secondary)]/70">
                        {item.hint}
                      </span>
                    )}
                  </span>
                  {item.external ? (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  ) : isSelected ? (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]/70">
          <span>↑↓ to move · ↵ to open</span>
          <span className="flex items-center gap-1.5">
            <Command className="h-3 w-3" /> K
          </span>
        </div>
      </div>
    </div>
  )
}
