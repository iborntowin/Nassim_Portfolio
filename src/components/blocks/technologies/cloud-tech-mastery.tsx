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
  { name: 'Svelte/SvelteKit', category: 'Frontend', proficiency: 88, projects: 8, icon: '🔥', color: 'from-ora