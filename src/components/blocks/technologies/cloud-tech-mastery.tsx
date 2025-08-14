'use client';

import { useState } from 'react';
import { Code, Cloud, Brain, Smartphone, Cpu, Wrench, ChevronRight } from 'lucide-react';

interface TechSkill {
  name: string;
  category: string;
  proficiency: number;
  projects: number;
  icon: string;
  color: string;
  funFact: string;
}

const techSkills: TechSkill[] = [
  // Frontend
  { name: 'React/Next.js', category: 'Frontend', proficiency: 95, projects: 25, icon: '⚛️', color: 'from-blue-400 to-cyan-500', funFact: 'Built 25+ production apps with 99.9% uptime' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 92, projects: 30, icon: '📘', color: 'from-blue-500 to-blue-600', funFact: 'Reduced bugs by 70% in large codebases' },
  { name: 'Svelte/SvelteKit', category: 'Frontend', proficiency: 88, projects: 8, icon: '🔥', color: 'from-orange-400 to-red-500', funFact: 'Fastest framework for building reactive UIs' }
]

export function CloudTechMastery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cloud Technology Mastery</h2>
      <div className="grid gap-4">
        {techSkills.map((skill, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{skill.icon}</span>
              <h3 className="font-semibold">{skill.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">{skill.funFact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}