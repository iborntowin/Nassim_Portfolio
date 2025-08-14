'use client'

import React from 'react'
import TerminalizedSkills from '../terminalized/terminalized-skills'
import { SKILLS_DATA } from '../core/command-registry'

interface SkillsCommandProps {
  args: string[]
  onComplete?: () => void
}

const SkillsCommand: React.FC<SkillsCommandProps> = ({ args, onComplete }) => {
  const category = args[0]?.toLowerCase()

  // If specific category requested, show traditional output for now
  // Later we can enhance this to show terminalized view for specific categories too
  if (category && SKILLS_DATA[category as keyof typeof SKILLS_DATA]) {
    const skillCategory = SKILLS_DATA[category as keyof typeof SKILLS_DATA]
    
    return (
      <div className="font-mono text-sm">
        <div className="border border-green-400/30 rounded p-4 mb-4">
          <div className="text-green-400 text-lg mb-2">
            🎯 {skillCategory.name.toUpperCase()}
          </div>
          <div className="space-y-2">
            {skillCategory.skills.map((skill, index) => {
              const bar = '█'.repeat(Math.floor(skill.level / 10)) + '░'.repeat(10 - Math.floor(skill.level / 10))
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-4">
                    <span className="text-cyan-400 w-32">{skill.name}</span>
                    <span className="text-gray-300">[{bar}]</span>
                    <span className="text-yellow-400">{skill.level}%</span>
                  </div>
                  <div className="text-gray-400 text-xs ml-4">
                    Experience: {skill.experience}
                    {skill.projects && ` • Projects: ${skill.projects}`}
                    {skill.certifications && ` • Certs: ${skill.certifications.join(', ')}`}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Show terminalized skills overview
  return (
    <div>
      <TerminalizedSkills 
        skillsData={SKILLS_DATA}
        displayMode="packages"
        showInstallCommands={true}
        animateOnMount={true}
      />
      
      <div className="mt-4 font-mono text-sm text-gray-400">
        <div className="text-green-400 mb-2">💡 Available Categories:</div>
        <div className="space-y-1 ml-4">
          <div>• <span className="text-cyan-400">cloud</span>      - Cloud & Infrastructure (AWS, K8s, Docker)</div>
          <div>• <span className="text-cyan-400">devops</span>     - DevOps & Automation (Ansible, CI/CD)</div>
          <div>• <span className="text-cyan-400">development</span> - Software Development (Python, Java, TS)</div>
          <div>• <span className="text-cyan-400">ai</span>         - AI & Machine Learning (TensorFlow, PyTorch)</div>
        </div>
        <div className="mt-2 text-xs">
          💡 Usage: <span className="text-yellow-400">skills &lt;category&gt;</span> for detailed breakdown
        </div>
      </div>
    </div>
  )
}

export default SkillsCommand