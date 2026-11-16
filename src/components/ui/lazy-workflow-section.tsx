"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WorkflowStep } from '@/lib/projects-data'

interface LazyWorkflowSectionProps {
  workflow: WorkflowStep[]
  shouldReduceMotion?: boolean
}

export default function LazyWorkflowSection({ workflow }: LazyWorkflowSectionProps) {
  if (workflow.length === 0) return null

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        How it was built
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {workflow.map((step) => (
          <Card
            key={step.title}
            className="h-full border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40"
          >
            <CardHeader className="pb-3">
              <div className="text-3xl mb-2" aria-hidden="true">
                {step.icon}
              </div>
              <CardTitle className="text-base text-[var(--color-text-primary)]">
                {step.title}
              </CardTitle>
              <CardDescription className="text-sm text-[var(--color-text-secondary)]">
                {step.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2 text-xs leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-secondary-accent)]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
