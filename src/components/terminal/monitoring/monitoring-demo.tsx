'use client'

import React from 'react'
import SystemMetrics from './system-metrics'
import LogStream from './log-stream'

interface MonitoringDemoProps {
  className?: string
}

const MonitoringDemo: React.FC<MonitoringDemoProps> = ({ className = '' }) => {
  return (
    <div className={`relative min-h-screen bg-black ${className}`}>
      {/* System Metrics Overlay */}
      <SystemMetrics position="overlay" />
      
      {/* Background Log Stream */}
      <div className="absolute inset-0 p-4 pt-20">
        <div className="h-full bg-gray-900/20 rounded-lg p-4 border border-gray-700/30">
          <div className="mb-4">
            <h2 className="text-green-400 font-mono text-lg mb-2">System Logs</h2>
            <div className="text-gray-400 text-sm">Real-time DevOps activity stream</div>
          </div>
          <LogStream 
            className="h-full"
            scrollSpeed={2000}
            opacity={0.8}
            logTypes={['deployment', 'monitoring', 'security', 'system']}
          />
        </div>
      </div>
      
      {/* Demo Content */}
      <div className="relative z-10 p-8 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-400 mb-4 font-mono">
            Real-time System Monitoring
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Live dashboard showing system metrics, pod status, and deployment activity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-cyan-400 font-mono text-xl mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time CPU, Memory, and Network monitoring</li>
                <li>• Live Kubernetes pod and deployment tracking</li>
                <li>• System uptime and connection status</li>
                <li>• Animated progress bars and counters</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-cyan-400 font-mono text-xl mb-4">Log Types</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <span className="text-green-400">Deployment</span> - K8s, Docker, CI/CD</li>
                <li>• <span className="text-yellow-400">Monitoring</span> - Prometheus, Grafana</li>
                <li>• <span className="text-red-400">Security</span> - Vault, Certificates</li>
                <li>• <span className="text-blue-400">System</span> - OS, Runtime events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringDemo