"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award,
  MapPin,
  Calendar,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  ExternalLink,
  Zap,
  Target,
  Heart,
  Coffee,
  BookOpen,
  Lightbulb
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Achievement {
  title: string
  description: string
  date: string
  icon: any
  color: string
}

interface Experience {
  role: string
  company: string
  duration: string
  description: string
  technologies: string[]
  achievements: string[]
}

interface Education {
  degree: string
  institution: string
  duration: string
  description: string
  highlights: string[]
}

const achievements: Achievement[] = [
  {
    title: 'AI/ML Excellence',
    description: 'Developed CNN model with 92% accuracy for PCB component detection',
    date: '2024',
    icon: Lightbulb,
    color: 'text-yellow-400'
  },
  {
    title: 'Performance Optimization',
    description: 'Achieved 99.9% uptime and 100/100 Lighthouse score',
    date: '2024',
    icon: Zap,
    color: 'text-blue-400'
  },
  {
    title: 'Open Source Impact',
    description: '2.1k+ GitHub stars across multiple projects',
    date: '2023-2024',
    icon: Github,
    color: 'text-green-400'
  },
  {
    title: 'Full-Stack Mastery',
    description: 'Built 15+ production applications across different tech stacks',
    date: '2020-2024',
    icon: Code,
    color: 'text-purple-400'
  }
]

const experiences: Experience[] = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Innovation Labs',
    duration: '2023 - Present',
    description: 'Leading development of enterprise-grade applications with focus on performance and scalability.',
    technologies: ['React', 'Next.js', 'Spring Boot', 'PostgreSQL', 'AWS'],
    achievements: [
      'Reduced application load time by 60%',
      'Implemented microservices architecture',
      'Led team of 5 developers',
      'Achieved 99.9% uptime in production'
    ]
  },
  {
    role: 'AI/ML Engineer',
    company: 'DataVision Solutions',
    duration: '2022 - 2023',
    description: 'Specialized in computer vision and machine learning model development for industrial applications.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Docker', 'Kubernetes'],
    achievements: [
      'Developed real-time object detection system',
      'Optimized model inference time by 75%',
      'Published research on component detection',
      'Trained models on 50,000+ images'
    ]
  },
  {
    role: 'DevOps Engineer',
    company: 'CloudScale Systems',
    duration: '2021 - 2022',
    description: 'Managed cloud infrastructure and implemented CI/CD pipelines for multiple client projects.',
    technologies: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'Jenkins'],
    achievements: [
      'Automated deployment processes',
      'Reduced infrastructure costs by 40%',
      'Implemented monitoring solutions',
      'Managed 50+ production deployments'
    ]
  }
]

const education: Education[] = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'University of Technology',
    duration: '2019 - 2021',
    description: 'Specialized in Artificial Intelligence and Machine Learning with focus on computer vision.',
    highlights: [
      'Thesis on Deep Learning for Object Detection',
      'GPA: 3.8/4.0',
      'Research Assistant in AI Lab',
      'Published 2 conference papers'
    ]
  },
  {
    degree: 'Bachelor of Engineering in Software Engineering',
    institution: 'Engineering Institute',
    duration: '2015 - 2019',
    description: 'Comprehensive software engineering education with emphasis on system design and development.',
    highlights: [
      'Graduated Magna Cum Laude',
      'President of Computer Science Society',
      'Winner of National Programming Contest',
      'Internship at leading tech company'
    ]
  }
]

const personalInfo = {
  name: 'Nassim Maaoui',
  title: 'Full-Stack Developer & AI Engineer',
  location: 'Tunisia',
  experience: '5+ Years',
  email: 'nassimmaaoui@outlook.com',
  github: 'https://github.com/iborntowin',
  linkedin: 'https://www.linkedin.com/in/maaoui-nassim-1a5636279/',
  twitter: 'https://twitter.com/nassimmaaoui'
}

const interests = [
  { name: 'Machine Learning', icon: Lightbulb, color: 'text-yellow-400' },
  { name: 'Cloud Architecture', icon: Target, color: 'text-blue-400' },
  { name: 'Open Source', icon: Heart, color: 'text-red-400' },
  { name: 'Coffee & Code', icon: Coffee, color: 'text-orange-400' },
  { name: 'Continuous Learning', icon: BookOpen, color: 'text-green-400' }
]

export default function ComprehensiveAboutSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'achievements'>('overview')

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            About Me
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Passionate full-stack developer and AI engineer with expertise in building 
            scalable applications and intelligent systems that solve real-world problems.
          </p>
        </motion.div>

        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                    {personalInfo.name}
                  </h3>
                  <p className="text-lg text-[var(--color-primary-accent)] mb-4">
                    {personalInfo.title}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <MapPin className="w-4 h-4" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <Calendar className="w-4 h-4" />
                      <span>{personalInfo.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <Mail className="w-4 h-4" />
                      <span>{personalInfo.email}</span>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="text-center p-4 bg-[var(--color-secondary-background)] rounded-lg border border-[var(--color-border)]">
                    <div className="text-2xl font-bold text-[var(--color-primary-accent)] mb-1">
                      25+
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      Projects Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-secondary-background)] rounded-lg border border-[var(--color-border)]">
                    <div className="text-2xl font-bold text-[var(--color-secondary-accent)] mb-1">
                      2.1k+
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      GitHub Stars
                    </div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-secondary-background)] rounded-lg border border-[var(--color-border)]">
                    <div className="text-2xl font-bold text-[var(--color-warning-energy)] mb-1">
                      99.9%
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      Uptime Achieved
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-[var(--color-secondary-background)] border border-[var(--color-border)]">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="relative flex items-center gap-2 text-xs font-medium transition-all data-[state=active]:bg-[var(--color-primary-accent)] data-[state=active]:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Mission Statement */}
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-text-primary)]">
                      Mission & Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      I'm passionate about creating innovative solutions that bridge the gap between 
                      cutting-edge technology and real-world applications. My mission is to build 
                      scalable, secure, and user-centric applications that make a meaningful impact.
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      With expertise spanning full-stack development, AI/ML engineering, and DevOps, 
                      I bring a holistic approach to software development, ensuring every project 
                      meets the highest standards of quality and performance.
                    </p>
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--color-text-primary)]">
                      Interests & Passions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {interests.map((interest, index) => (
                        <motion.div
                          key={interest.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex flex-col items-center p-4 bg-[var(--color-primary-background)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30 transition-all duration-300"
                        >
                          <interest.icon className={`w-6 h-6 ${interest.color} mb-2`} />
                          <span className="text-sm text-[var(--color-text-primary)] text-center">
                            {interest.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-[var(--color-text-primary)]">
                              {exp.role}
                            </CardTitle>
                            <CardDescription className="text-[var(--color-primary-accent)] font-medium">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-[var(--color-text-secondary)]">
                            {exp.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-[var(--color-text-secondary)]">
                          {exp.description}
                        </p>
                        
                        <div>
                          <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                                <div className="w-1.5 h-1.5 bg-[var(--color-primary-accent)] rounded-full flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-[var(--color-text-primary)]">
                              {edu.degree}
                            </CardTitle>
                            <CardDescription className="text-[var(--color-primary-accent)] font-medium">
                              {edu.institution}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-[var(--color-text-secondary)]">
                            {edu.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-[var(--color-text-secondary)]">
                          {edu.description}
                        </p>
                        
                        <div>
                          <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                            Highlights:
                          </h4>
                          <ul className="space-y-1">
                            {edu.highlights.map((highlight, hlIndex) => (
                              <li key={hlIndex} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                                <div className="w-1.5 h-1.5 bg-[var(--color-secondary-accent)] rounded-full flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] hover:border-[var(--color-primary-accent)]/30 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                          <Badge variant="outline" className="text-xs">
                            {achievement.date}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-[var(--color-text-primary)]">
                          {achievement.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[var(--color-text-secondary)]">
                          {achievement.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 border-[var(--color-primary-accent)]/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
                I'm always excited to work on challenging projects and collaborate with 
                talented teams. Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-accent)]/80">
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}