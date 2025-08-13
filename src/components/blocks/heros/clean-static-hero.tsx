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
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20"
            style={{
              left: `${(i * 17 + 23) % 100}%`,
              top: `${(i * 13 + 37) % 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
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