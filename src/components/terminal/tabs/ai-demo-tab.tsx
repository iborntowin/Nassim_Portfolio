"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import { SyntaxHighlighter } from '../shared/syntax-highlighter'
import { 
  Brain, 
  Zap, 
  Eye,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Target,
  Clock,
  Cpu,
  Database,
  Image as ImageIcon,
  BarChart3
} from 'lucide-react'

interface AIModel {
  id: string
  name: string
  description: string
  accuracy: number
  inferenceTime: string
  dataset: string
  icon: any
  color: string
  status: 'training' | 'ready' | 'deployed'
}

const aiModels: AIModel[] = [
  {
    id: 'board-ai',
    name: 'Board-AI CNN',
    description: 'Electronic component detection on PCB boards',
    accuracy: 92,
    inferenceTime: '120ms',
    dataset: '50,000+ PCB images',
    icon: Eye,
    color: 'text-blue-400',
    status: 'deployed'
  },
  {
    id: 'neurovigil',
    name: 'NeuroVigil EEG',
    description: 'Driver fatigue detection using EEG signals',
    accuracy: 89,
    inferenceTime: '200ms',
    dataset: 'EEG signal patterns',
    icon: Brain,
    color: 'text-purple-400',
    status: 'deployed'
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detector',
    description: 'Real-time system log anomaly detection',
    accuracy: 87,
    inferenceTime: '50ms',
    dataset: 'System logs & metrics',
    icon: Target,
    color: 'text-green-400',
    status: 'ready'
  }
]

const demoCode = {
  'board-ai': `# PCB Component Detection Model
import tensorflow as tf
import cv2
import numpy as np

class ComponentDetectionCNN:
    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)
        self.accuracy = 0.92  # 92% accuracy achieved
        self.inference_time = 0.120  # 120ms average
        
    def preprocess_image(self, image):
        # Resize and normalize
        processed = cv2.resize(image, (224, 224))
        processed = processed.astype(np.float32) / 255.0
        processed = np.expand_dims(processed, axis=0)
        return processed
        
    def detect_components(self, image):
        # Preprocess input
        processed_image = self.preprocess_image(image)
        
        # Run inference
        start_time = time.time()
        predictions = self.model.predict(processed_image)
        inference_time = time.time() - start_time
        
        # Post-process results
        component_classes = [
            'Resistor', 'Capacitor', 'IC', 'Transistor',
            'Diode', 'Inductor', 'Crystal', 'Connector'
        ]
        
        results = []
        for i, prob in enumerate(predictions[0]):
            if prob > 0.5:  # Confidence threshold
                results.append({
                    'component': component_classes[i],
                    'confidence': float(prob),
                    'inference_time': inference_time
                })
                
        return results
        
    def get_model_stats(self):
        return {
            'accuracy': self.accuracy,
            'avg_inference_time': self.inference_time,
            'model_size': '45.2 MB',
            'parameters': '2.3M'
        }`,
  'neurovigil': `# EEG-based Fatigue Detection
import numpy as np
from scipy import signal
from sklearn.ensemble import RandomForestClassifier

class NeuroVigilDetector:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.precision = 0.89  # 89% precision
        self.false_positive_rate = 0.05  # <5% false positives
        
    def extract_eeg_features(self, eeg_data, sampling_rate=256):
        # Extract frequency domain features
        freqs, psd = signal.welch(eeg_data, sampling_rate)
        
        # Define frequency bands
        delta = np.mean(psd[(freqs >= 0.5) & (freqs < 4)])
        theta = np.mean(psd[(freqs >= 4) & (freqs < 8)])
        alpha = np.mean(psd[(freqs >= 8) & (freqs < 13)])
        beta = np.mean(psd[(freqs >= 13) & (freqs < 30)])
        
        # Calculate ratios (fatigue indicators)
        theta_alpha_ratio = theta / alpha
        delta_alpha_ratio = delta / alpha
        
        features = [
            delta, theta, alpha, beta,
            theta_alpha_ratio, delta_alpha_ratio,
            np.std(eeg_data),  # Signal variability
            np.mean(np.abs(eeg_data))  # Signal amplitude
        ]
        
        return np.array(features).reshape(1, -1)
        
    def detect_fatigue(self, eeg_data):
        # Extract features from EEG signal
        features = self.extract_eeg_features(eeg_data)
        
        # Predict fatigue level
        fatigue_prob = self.model.predict_proba(features)[0][1]
        
        # Determine alert level
        if fatigue_prob > 0.8:
            alert_level = "CRITICAL - Pull over immediately"
        elif fatigue_prob > 0.6:
            alert_level = "HIGH - Take a break soon"
        elif fatigue_prob > 0.4:
            alert_level = "MODERATE - Stay alert"
        else:
            alert_level = "LOW - Normal alertness"
            
        return {
            'fatigue_probability': fatigue_prob,
            'alert_level': alert_level,
            'precision': self.precision,
            'false_positive_rate': self.false_positive_rate
        }`
}

export function AIDemoTab({ isActive }: TerminalTabProps) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (isRunning && selectedModel) {
      const interval = setInterval(() => {
        setDemoProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false)
            setShowResults(true)
            return 100
          }
          return prev + 2
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isRunning, selectedModel])

  const handleRunDemo = () => {
    setIsRunning(true)
    setDemoProgress(0)
    setShowResults(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setDemoProgress(0)
    setShowResults(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-400/10'
      case 'ready': return 'text-blue-400 bg-blue-400/10'
      case 'training': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">AI/ML Demonstrations</h3>
          </div>
        </div>
        
        <TerminalSlideIn delay={0.1}>
          <TypewriterText 
            text="Interactive demonstrations of machine learning models with real-time inference, performance metrics, and code examples."
            speed={20}
            className="text-gray-400 text-sm"
          />
        </TerminalSlideIn>
      </div>

      <div className="flex-1 overflow-hidden">
        {!selectedModel ? (
          /* Model Selection */
          <div className="h-full overflow-y-auto p-4">
            <TerminalSlideIn delay={0.2}>
              <div className="mb-6">
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  Available AI Models
                </h4>
                <p className="text-gray-400 text-sm">
                  Select a model to see interactive demonstrations and performance metrics.
                </p>
              </div>
            </TerminalSlideIn>

            <div className="grid grid-cols-1 gap-4">
              {aiModels.map((model, index) => (
                <TerminalSlideIn key={model.id} delay={0.3 + index * 0.1}>
                  <motion.div
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedModel(model)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <model.icon className={`w-6 h-6 ${model.color}`} />
                        <div>
                          <h5 className="font-semibold text-white">{model.name}</h5>
                          <p className="text-gray-400 text-sm">{model.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-gray-700">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${model.color}`}>
                          {model.accuracy}%
                        </div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                          {model.inferenceTime}
                        </div>
                        <div className="text-xs text-gray-400">Inference</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">
                          {model.dataset.split(' ')[0]}
                        </div>
                        <div className="text-xs text-gray-400">Dataset</div>
                      </div>
                    </div>
                  </motion.div>
                </TerminalSlideIn>
              ))}
            </div>
          </div>
        ) : (
          /* Model Detail View */
          <div className="h-full overflow-y-auto">
            {/* Model Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800/30">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  ← Back to models
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm rounded transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Run Demo
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-2">
                <selectedModel.icon className={`w-6 h-6 ${selectedModel.color}`} />
                <h3 className="text-xl font-bold text-white">{selectedModel.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(selectedModel.status)}`}>
                  {selectedModel.status}
                </span>
              </div>
              <p className="text-gray-400">{selectedModel.description}</p>
            </div>

            {/* Demo Content */}
            <div className="p-4 space-y-6">
              {/* Progress Bar */}
              {(isRunning || showResults) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Model Inference</span>
                    <span className="text-blue-400 font-medium">{demoProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                      style={{ width: `${demoProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  {isRunning && (
                    <div className="text-sm text-gray-400 mt-2">
                      Processing input data...
                    </div>
                  )}
                </motion.div>
              )}

              {/* Results */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                >
                  <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Inference Results
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-900/50 rounded">
                      <div className={`text-xl font-bold ${selectedModel.color}`}>
                        {selectedModel.accuracy}%
                      </div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded">
                      <div className="text-xl font-bold text-green-400">
                        {selectedModel.inferenceTime}
                      </div>
                      <div className="text-xs text-gray-400">Inference Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded">
                      <div className="text-xl font-bold text-blue-400">
                        {selectedModel.id === 'neurovigil' ? '<5%' : '98.5%'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {selectedModel.id === 'neurovigil' ? 'False Positives' : 'Precision'}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded">
                      <div className="text-xl font-bold text-purple-400">
                        {selectedModel.id === 'board-ai' ? '50k+' : 
                         selectedModel.id === 'neurovigil' ? '89%' : '87%'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {selectedModel.id === 'board-ai' ? 'Dataset Size' : 'Precision'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Code Example */}
              <div>
                <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  Model Implementation
                </h5>
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <span className="text-sm text-gray-300 font-mono">
                      {selectedModel.id}.py
                    </span>
                    <span className="text-xs text-gray-400">Python</span>
                  </div>
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <SyntaxHighlighter 
                      code={demoCode[selectedModel.id as keyof typeof demoCode] || '# Code example not available'}
                      language="python"
                    />
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  Model Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Dataset:</div>
                    <div className="text-white">{selectedModel.dataset}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Status:</div>
                    <div className="text-white capitalize">{selectedModel.status}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Accuracy:</div>
                    <div className="text-white">{selectedModel.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Inference Time:</div>
                    <div className="text-white">{selectedModel.inferenceTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}