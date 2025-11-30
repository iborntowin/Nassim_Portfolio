"use client"

import { ChevronRight } from 'lucide-react'

export default function SplitWithCodeExample() {
  return (
    <div className="bg-[var(--color-primary-background)] relative">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8FAFC' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[var(--color-primary-accent)] rounded-lg flex items-center justify-center">
                    <span className="text-[var(--color-text-primary)] font-bold text-lg">N</span>
                  </div>
                  <span className="text-[var(--color-text-primary)] font-[var(--font-inter)] font-semibold text-lg">Nassim Maaoui</span>
                </div>
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-[var(--color-warning-energy)]/10 px-3 py-1 text-sm font-[var(--font-inter)] font-semibold text-[var(--color-warning-energy)] ring-1 ring-[var(--color-warning-energy)]/20 ring-inset">
                      Available for Projects
                    </span>
                    <span className="inline-flex items-center space-x-2 text-sm font-[var(--font-inter)] font-medium text-[var(--color-text-secondary)]">
                      <span>Enterprise Solutions</span>
                      <ChevronRight className="size-5 text-[var(--color-text-secondary)]" aria-hidden="true" />
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-5xl font-[var(--font-inter)] font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl">
                  Full-Stack Engineering Leader & Technical Consultant
                </h1>
                <p className="mt-8 text-lg font-[var(--font-inter)] font-medium text-[var(--color-text-secondary)] sm:text-xl leading-8">
                  Delivering scalable, enterprise-grade solutions that drive business growth. Specialized in modern React, TypeScript, and cloud architectures for Fortune 500 companies.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-lg bg-[var(--color-primary-accent)] px-6 py-3 text-sm font-[var(--font-inter)] font-semibold text-[var(--color-text-primary)] shadow-lg hover:bg-[var(--color-primary-accent)]/90 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-accent)]"
                  >
                    Start Your Project
                  </a>
                  <a href="#" className="text-sm font-[var(--font-inter)] font-semibold text-[var(--color-text-primary)]">
                    View Technical Portfolio <span aria-hidden="true" className="text-[var(--color-secondary-accent)]">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-[var(--color-secondary-background)] shadow-2xl ring-1 shadow-[var(--color-secondary-accent)]/20 ring-[var(--color-secondary-background)] md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-2xl md:rounded-3xl">
              <div className="bg-gradient-to-br from-[var(--color-secondary-background)] to-[var(--color-primary-background)] [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-lg))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-[var(--color-secondary-accent)]/10 opacity-20 ring-1 ring-[var(--color-text-primary)]/10 ring-inset md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-[var(--color-primary-background)] border border-[var(--color-secondary-background)]">
                      <div className="flex bg-[var(--color-secondary-background)]/60 ring-1 ring-[var(--color-text-primary)]/5">
                        <div className="-mb-px flex text-sm font-[var(--font-inter)] font-medium text-[var(--color-text-secondary)]">
                          <div className="border-r border-b border-r-[var(--color-text-primary)]/10 border-b-[var(--color-text-primary)]/20 bg-[var(--color-text-primary)]/5 px-4 py-2 text-[var(--color-text-primary)]">
                            UserDashboard.tsx
                          </div>
                          <div className="border-r border-[var(--color-text-primary)]/10 px-4 py-2">hooks/useAuth.ts</div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        <div className="text-sm font-[var(--font-inter)] font-mono">
                          <div className="text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-secondary-accent)]">import</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">&#123; useState, useEffect &#125;</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">from</span>{' '}
                            <span className="text-[var(--color-primary-accent)]">'react'</span>
                          </div>
                          <div className="text-[var(--color-text-secondary)] mt-1">
                            <span className="text-[var(--color-secondary-accent)]">import</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">&#123; User, UserRole &#125;</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">from</span>{' '}
                            <span className="text-[var(--color-primary-accent)]">'@/types'</span>
                          </div>
                          
                          <div className="mt-4 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-secondary-accent)]">interface</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">DashboardProps</span>{' '}
                            <span className="text-[var(--color-text-primary)]">&#123;</span>
                          </div>
                          <div className="ml-4 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-text-primary)]">user:</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">User</span>
                          </div>
                          <div className="ml-4 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-text-primary)]">onUpdate:</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">(user: User)</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">=&gt;</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">Promise</span>&lt;<span className="text-[var(--color-secondary-accent)]">void</span>&gt;
                          </div>
                          <div className="text-[var(--color-text-primary)]">&#125;</div>
                          
                          <div className="mt-4 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-secondary-accent)]">export</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">default</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">function</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">UserDashboard</span><span className="text-[var(--color-text-primary)]">(&#123;</span>
                          </div>
                          <div className="ml-4 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-text-primary)]">user, onUpdate</span>
                          </div>
                          <div className="text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-text-primary)]">&#125;:</span>{' '}
                            <span className="text-[var(--color-secondary-accent)]">DashboardProps</span><span className="text-[var(--color-text-primary)]">) &#123;</span>
                          </div>
                          
                          <div className="ml-4 mt-2 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-secondary-accent)]">const</span>{' '}
                            <span className="text-[var(--color-text-primary)]">[data, setData] =</span>{' '}
                            <span className="text-[var(--color-warning-energy)]">useState</span>&lt;<span className="text-[var(--color-secondary-accent)]">User[]</span>&gt;<span className="text-[var(--color-text-primary)]">([])</span>
                          </div>
                          
                          <div className="ml-4 mt-2 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-secondary-accent)]">return</span>{' '}
                            <span className="text-[var(--color-text-primary)]">(</span>
                          </div>
                          <div className="ml-8 text-[var(--color-text-secondary)]">
                            &lt;<span className="text-[var(--color-secondary-accent)]">div</span>{' '}
                            <span className="text-[var(--color-text-primary)]">className=</span><span className="text-[var(--color-primary-accent)]">"dashboard-container"</span>&gt;
                          </div>
                          <div className="ml-12 text-[var(--color-text-secondary)]">
                            &lt;<span className="text-[var(--color-secondary-accent)]">h1</span>&gt;<span className="text-[var(--color-text-primary)]">Welcome, &#123;user.name&#125;</span>&lt;/<span className="text-[var(--color-secondary-accent)]">h1</span>&gt;
                          </div>
                          <div className="ml-8 text-[var(--color-text-secondary)]">
                            &lt;/<span className="text-[var(--color-secondary-accent)]">div</span>&gt;
                          </div>
                          <div className="ml-4 text-[var(--color-text-primary)]">)</div>
                          <div className="text-[var(--color-text-primary)]">&#125;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-[var(--color-primary-background)]/10 ring-inset md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[var(--color-primary-background)] sm:h-32" />
      </div>
    </div>
  )
}