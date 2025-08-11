'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Rocket, ArrowDown } from 'lucide-react';

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "Cloud Architect",
  "Software Engineer",
  "Innovation Builder"
];

const codeSnippet = `---
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
          NODE_ENV: production`;

export default function StaticHero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("Full-Stack Developer");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${(i * 17 + 23) % 100}%`,
              top: `${(i * 13 + 37) % 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Content */}
          <div>
            <div>
              {/* Status badge */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-blue-500 font-semibold text-sm">Available for Projects</span>
                </div>
                <div className="h-4 w-px bg-slate-600"></div>
                <span className="text-slate-400 text-sm">Cloud Solutions</span>
              </div>

              {/* Name and title */}
              <div className="mb-6">
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
                  Nassim
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Maaoui
                  </span>
                </h1>

                <div className="text-2xl lg:text-3xl font-semibold text-slate-400 h-12 flex items-center">
                  <span className="mr-2">I'm a</span>
                  <span className="text-blue-500 min-w-[300px]">
                    {displayText}
                    <span className="ml-1 animate-pulse">|</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
                Full-stack engineer passionate about creating innovative solutions that bridge technology and real-world impact. 
                From AI-powered applications to scalable cloud infrastructure, I build systems that matter.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden hover:scale-105 transition-transform">
                  <span className="relative flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Project
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button className="px-8 py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div>
            <div className="relative">
              {/* Terminal */}
              <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-300 text-sm font-mono">
                      ansible-playbook.yaml
                    </span>
                  </div>
                </div>

                {/* Code content */}
                <div className="p-6 h-96 overflow-y-auto bg-slate-900">
                  <pre className="text-slate-300 whitespace-pre-wrap text-sm leading-6">
                    {codeSnippet.split('\n').map((line, index) => (
                      <div key={index} className="min-h-[1.5rem]">
                        {line.split(/(\b(?:name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container)\b|\b(?:yes|no|true|false)\b|\b\d+\.?\d*[a-zA-Z]*\b|["'][^"']*["']|#.*$)/).map((part, partIndex) => {
                          if (!part) return null;

                          if (/\b(name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container)\b/.test(part)) {
                            return <span key={partIndex} className="text-blue-400 font-semibold">{part}</span>;
                          }
                          if (/\b(yes|no|true|false)\b/.test(part)) {
                            return <span key={partIndex} className="text-orange-400">{part}</span>;
                          }
                          if (/\b\d+\.?\d*[a-zA-Z]*\b/.test(part)) {
                            return <span key={partIndex} className="text-green-400">{part}</span>;
                          }
                          if (/["'][^"']*["']/.test(part)) {
                            return <span key={partIndex} className="text-green-300">{part}</span>;
                          }
                          if (/#.*$/.test(part)) {
                            return <span key={partIndex} className="text-slate-400">{part}</span>;
                          }

                          return <span key={partIndex}>{part}</span>;
                        })}
                      </div>
                    ))}
                  </pre>
                </div>
              </div>

              {/* Tech badges */}
              <div className="absolute -top-4 -right-4 space-y-2">
                {['Ansible', 'Docker', 'Nginx', 'Linux'].map((tech, index) => (
                  <div
                    key={tech}
                    className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 px-3 py-1 rounded-full text-blue-500 text-xs font-semibold hover:scale-110 hover:rotate-3 transition-transform cursor-pointer"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-slate-400 animate-bounce">
            <span className="text-sm mb-2">Explore My Work</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}