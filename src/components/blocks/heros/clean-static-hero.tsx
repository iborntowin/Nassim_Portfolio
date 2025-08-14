'use client'

import { useState, useEffect } from 'react'

const DEVELOPER_ROLES = [
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "Cloud Architect",
  "Software Engineer",
  "Innovation Builder"
]

const YAML_CODE = `---
# Ansible Infrastructure Automation
- name: Deploy Web Application
  hosts: production
  become: yes
  vars:
    app_name: "web-app"
    app_version: "v2.1.0"
    
  tasks:
    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: dist
        
    - name: Install Docker
      apt:
        name: docker.io
        state: present
        
    - name: Deploy application
      docker_container:
        name: "{{ app_name }}"
        image: "registry.com/{{ app_name }}:{{ app_version }}"
        state: started
        ports:
          - "80:8080"
        env:
          NODE_ENV: production`

export default function CleanStaticHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("Full-Stack Developer")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const targetText = DEVELOPER_ROLES[currentIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < targetText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
      } else {
        setCurrentIndex((prev) => (prev + 1) % DEVELOPER_ROLES.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isTyping, currentIndex])

  return (
    <div className="relative min-h-screen bg-[var(--color-primary-background)] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        {/* Static background particles for consistent SSR */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '23%', top: '37%', animationDelay: '0s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '40%', top: '50%', animationDelay: '0.1s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '57%', top: '63%', animationDelay: '0.2s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '74%', top: '76%', animationDelay: '0.3s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '91%', top: '89%', animationDelay: '0.4s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '8%', top: '2%', animationDelay: '0.5s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '25%', top: '15%', animationDelay: '0.6s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '42%', top: '28%', animationDelay: '0.7s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '59%', top: '41%', animationDelay: '0.8s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '76%', top: '54%', animationDelay: '0.9s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '93%', top: '67%', animationDelay: '1s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '10%', top: '80%', animationDelay: '1.1s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '27%', top: '93%', animationDelay: '1.2s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '44%', top: '6%', animationDelay: '1.3s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '61%', top: '19%', animationDelay: '1.4s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '78%', top: '32%', animationDelay: '1.5s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '95%', top: '45%', animationDelay: '1.6s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '12%', top: '58%', animationDelay: '1.7s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '29%', top: '71%', animationDelay: '1.8s' }} />
          <div className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20 animate-pulse" style={{ left: '46%', top: '84%', animationDelay: '1.9s' }} />
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Content */}
          <div>
            {/* Status badge */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-[var(--color-primary-accent)] rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-[var(--color-primary-accent)] rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-[var(--color-primary-accent)] font-semibold text-sm">Available for Projects</span>
              </div>
              <div className="h-4 w-px bg-[var(--color-border)]"></div>
              <span className="text-[var(--color-text-secondary)] text-sm">Cloud Solutions</span>
            </div>

            {/* Name and title */}
            <div className="mb-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-4">
                Nassim
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)]">
                  Maaoui
                </span>
              </h1>

              <div className="text-2xl lg:text-3xl font-semibold text-[var(--color-text-secondary)] h-12 flex items-center">
                <span className="mr-2">I'm a</span>
                <span className="text-[var(--color-primary-accent)] min-w-[300px]">
                  {displayText}
                  <span className="ml-1 animate-pulse">|</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
              Full-stack engineer passionate about creating innovative solutions that bridge technology and real-world impact. 
              From AI-powered applications to scalable cloud infrastructure, I build systems that matter.
            </p>

            {/* Terminal Access Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="http://localhost:3000/terminal"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-transparent hover:border-white/20"
              >
                {/* Animated background particles - CSS only */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '20%', top: '30%', animationDelay: '0s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '30%', top: '50%', animationDelay: '0.2s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '40%', top: '70%', animationDelay: '0.4s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '50%', top: '30%', animationDelay: '0.6s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '60%', top: '50%', animationDelay: '0.8s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '70%', top: '70%', animationDelay: '1s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '80%', top: '30%', animationDelay: '1.2s', animationDuration: '2s' }} />
                  <div className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ left: '90%', top: '50%', animationDelay: '1.4s', animationDuration: '2s' }} />
                </div>

                {/* Background gradient shift */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-accent)] to-[var(--color-primary-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center space-x-3">
                  {/* Terminal icon with animation */}
                  <div className="w-7 h-7 border-2 border-current rounded-md relative bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-current rounded-full animate-pulse group-hover:animate-bounce"></div>
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 h-0.5 bg-current opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-current/40 rounded-full"></div>
                  </div>
                  
                  <span className="text-lg font-bold tracking-wide">Launch Terminal</span>
                  
                  {/* Multi-layered arrow animation */}
                  <div className="relative overflow-hidden w-8 h-6">
                    <div className="absolute inset-0 flex items-center">
                      {/* Primary arrow */}
                      <svg 
                        className="w-6 h-6 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      
                      {/* Ghost arrow */}
                      <svg 
                        className="w-6 h-6 absolute -ml-6 opacity-0 group-hover:opacity-60 transform transition-all duration-500 group-hover:translate-x-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      
                      {/* Trail arrow */}
                      <svg 
                        className="w-6 h-6 absolute -ml-12 opacity-0 group-hover:opacity-30 transform transition-all duration-700 group-hover:translate-x-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300 -z-10"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </a>

              {/* Interactive command preview */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] font-mono text-sm bg-[var(--color-secondary-background)] px-3 py-2 rounded-lg border border-[var(--color-border)]">
                  <span className="text-[var(--color-primary-accent)] font-bold">$</span>
                  <span className="text-[var(--color-success-energy)]">cd</span>
                  <span>/terminal</span>
                  <span className="animate-pulse text-[var(--color-primary-accent)]">|</span>
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]/60 font-mono">
                  Interactive development environment
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div>
            <div className="relative">
              {/* Terminal */}
              <div className="bg-[var(--color-secondary-background)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-secondary-background)] border-b border-[var(--color-border)]">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-[var(--color-text-secondary)] text-sm font-mono">
                      ansible-playbook.yaml
                    </span>
                  </div>
                </div>

                {/* Code content */}
                <div className="p-6 h-96 overflow-y-auto bg-[var(--color-secondary-background)]">
                  <pre className="text-[var(--color-text-secondary)] whitespace-pre-wrap text-sm leading-6">
                    {YAML_CODE.split('\n').map((line, index) => (
                      <div key={index} className="min-h-[1.5rem]">
                        {line.split(/(\b(?:name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container)\b|\b(?:yes|no|true|false)\b|\b\d+\.?\d*[a-zA-Z]*\b|["'][^"']*["']|#.*$)/).map((part, partIndex) => {
                          if (!part) return null

                          if (/\b(name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container)\b/.test(part)) {
                            return <span key={partIndex} className="text-[var(--color-primary-accent)] font-semibold">{part}</span>
                          }
                          if (/\b(yes|no|true|false)\b/.test(part)) {
                            return <span key={partIndex} className="text-[var(--color-warning-energy)]">{part}</span>
                          }
                          if (/\b\d+\.?\d*[a-zA-Z]*\b/.test(part)) {
                            return <span key={partIndex} className="text-[var(--color-success-energy)]">{part}</span>
                          }
                          if (/["'][^"']*["']/.test(part)) {
                            return <span key={partIndex} className="text-[var(--color-success-energy)]">{part}</span>
                          }
                          if (/#.*$/.test(part)) {
                            return <span key={partIndex} className="text-[var(--color-text-secondary)]">{part}</span>
                          }

                          return <span key={partIndex}>{part}</span>
                        })}
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}