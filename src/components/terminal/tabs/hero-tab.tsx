"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { SyntaxHighlighter } from '../shared/syntax-highlighter'
import { TypewriterText, TerminalSlideIn } from '../shared/terminal-animations'
import { Play, Pause, Code, Zap, Cloud, Database } from 'lucide-react'

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "DevOps Specialist",
  "Cloud Architect",
  "System Designer"
]

const codeSnippets = [
  {
    language: "typescript",
    title: "next-app-architecture",
    code: `// Modern Next.js 15 Architecture
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Nassim Maaouia - Portfolio',
  description: 'Full-Stack Developer & AI Engineer'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white">
        <Suspense fallback={<Loading />}>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}`
  },
  {
    language: "python",
    title: "ai-model-training",
    code: `# AI Model Training Pipeline
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

class ComponentDetectionModel:
    def __init__(self, num_classes=50):
        self.model = self.build_cnn_model(num_classes)
        self.accuracy = 0.92  # 92% achieved
        
    def build_cnn_model(self, num_classes):
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', 
                         input_shape=(224, 224, 3)),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.GlobalAveragePooling2D(),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
        
    def train(self, train_data, val_data, epochs=100):
        history = self.model.fit(
            train_data,
            validation_data=val_data,
            epochs=epochs,
            callbacks=[
                tf.keras.callbacks.EarlyStopping(patience=10),
                tf.keras.callbacks.ReduceLROnPlateau(factor=0.2)
            ]
        )
        return history`
  },
  {
    language: "yaml",
    title: "kubernetes-deployment",
    code: `# Production Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-app
  namespace: production
  labels:
    app: portfolio
    version: v2.1.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: portfolio
        image: nassim/portfolio:v2.1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url`
  }
]

const achievements = [
  { number: "25+", label: "Projects Built", icon: Code },
  { number: "99.9%", label: "Uptime", icon: Zap },
  { number: "2.1k+", label: "GitHub Stars", icon: Cloud },
  { number: "92%", label: "AI Accuracy", icon: Database }
]

export function HeroTab({ isActive }: TerminalTabProps) {
  const [currentRole, setCurrentRole] = useState(0)
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  // Role rotation
  useEffect(() => {
    if (!isActive || !isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isActive, isPlaying])

  // Code snippet rotation
  useEffect(() => {
    if (!isActive || !isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSnippet(prev => (prev + 1) % codeSnippets.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [isActive, isPlaying])

  // Welcome message timeout
  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        setShowWelcome(false)
      }, 5000)
      
      return () => clearTimeout(timeout)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-blue-900/20 border-b border-blue-700/30"
          >
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <TypewriterText 
                text="Welcome to Nassim's Interactive Portfolio Terminal!"
                speed={30}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Info */}
            <div className="space-y-6">
              <TerminalSlideIn delay={0.2}>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white">
                    <span className="block">Nassim</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Maaoui
                    </span>
                  </h1>
                  
                  <div className="text-xl text-gray-300">
                    <span className="mr-2">I'm a</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentRole}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-blue-400 font-semibold"
                      >
                        {roles[currentRole]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </TerminalSlideIn>

              <TerminalSlideIn delay={0.4}>
                <p className="text-gray-400 leading-relaxed">
                  Building scalable applications with modern technologies. 
                  Specialized in full-stack development, AI/ML engineering, 
                  and cloud infrastructure.
                </p>
              </TerminalSlideIn>

              {/* Achievements */}
              <TerminalSlideIn delay={0.6}>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <achievement.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">
                        {achievement.number}
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TerminalSlideIn>
            </div>

            {/* Right Side - Code Display */}
            <TerminalSlideIn delay={0.8}>
              <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-300 text-sm font-mono">
                      {codeSnippets[currentSnippet].title}.{codeSnippets[currentSnippet].language}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>

                {/* Code Content */}
                <div className="p-4 h-80 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSnippet}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SyntaxHighlighter 
                        code={codeSnippets[currentSnippet].code}
                        language={codeSnippets[currentSnippet].language}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </TerminalSlideIn>
          </div>

          {/* Terminal Commands Hint */}
          <TerminalSlideIn delay={1.2}>
            <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">
                💡 Try these commands in other tabs:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
                <div className="text-blue-400">git clone [repository]</div>
                <div className="text-green-400">docker-compose up -d</div>
                <div className="text-yellow-400">kubectl get pods</div>
                <div className="text-purple-400">npm run dev</div>
              </div>
            </div>
          </TerminalSlideIn>
        </div>
      </div>
    </div>
  )
}