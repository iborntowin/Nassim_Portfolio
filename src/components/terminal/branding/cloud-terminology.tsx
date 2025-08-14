'use client'

import React from 'react'

// Cloud engineering terminology and branding utilities
export const CloudTerminology = {
  // Convert regular terms to cloud-native equivalents
  translateTerm: (term: string): string => {
    const translations: Record<string, string> = {
      'projects': 'repositories',
      'skills': 'tech-stack',
      'experience': 'deployment-history',
      'contact': 'service-mesh',
      'about': 'system-info',
      'portfolio': 'infrastructure',
      'resume': 'service-manifest',
      'work': 'workloads',
      'education': 'training-pipelines',
      'achievements': 'deployment-metrics',
      'testimonials': 'service-reviews',
      'blog': 'log-stream',
      'home': 'cluster-overview'
    }
    return translations[term.toLowerCase()] || term
  },

  // Get cloud-native command equivalents
  getCloudCommand: (action: string, target?: string): string => {
    const commands: Record<string, string> = {
      'view': 'kubectl get',
      'show': 'kubectl describe',
      'list': 'kubectl get',
      'create': 'kubectl apply -f',
      'update': 'kubectl patch',
      'delete': 'kubectl delete',
      'deploy': 'helm install',
      'scale': 'kubectl scale',
      'logs': 'kubectl logs',
      'exec': 'kubectl exec',
      'port-forward': 'kubectl port-forward'
    }
    
    const baseCommand = commands[action.toLowerCase()] || action
    return target ? `${baseCommand} ${target}` : baseCommand
  },

  // Generate cloud-native file paths
  getCloudPath: (section: string): string => {
    const paths: Record<string, string> = {
      'projects': '/var/lib/kubernetes/manifests',
      'skills': '/etc/ansible/playbooks',
      'experience': '/var/log/deployments',
      'contact': '/etc/service-mesh/config',
      'about': '/proc/system-info',
      'resume': '/etc/kubernetes/manifests/cv.yaml'
    }
    return paths[section.toLowerCase()] || `/opt/${section}`
  },

  // Get appropriate cloud icons
  getCloudIcon: (category: string): string => {
    const icons: Record<string, string> = {
      'cloud': '☁️',
      'kubernetes': '⎈',
      'docker': '🐳',
      'aws': '🟠',
      'devops': '🔧',
      'ci-cd': '🚀',
      'monitoring': '📊',
      'security': '🔒',
      'database': '🗄️',
      'api': '🔌',
      'frontend': '🌐',
      'backend': '⚙️',
      'ai-ml': '🤖',
      'data': '📈',
      'network': '🌍',
      'storage': '📦',
      'compute': '💻',
      'serverless': '⚡'
    }
    return icons[category.toLowerCase()] || '📄'
  },

  // Generate cloud-native status messages
  getStatusMessage: (type: 'success' | 'error' | 'warning' | 'info', context?: string): string => {
    const messages = {
      success: [
        'Deployment completed successfully',
        'Service mesh configuration applied',
        'Pod scaling operation successful',
        'Health checks passing',
        'Infrastructure provisioned',
        'Pipeline execution completed'
      ],
      error: [
        'Pod failed to start',
        'Service endpoint unreachable',
        'Configuration validation failed',
        'Resource quota exceeded',
        'Network policy violation',
        'Image pull failed'
      ],
      warning: [
        'Resource usage approaching limits',
        'Certificate expiring soon',
        'Deprecated API version detected',
        'Node capacity warning',
        'Backup schedule delayed',
        'Security scan found vulnerabilities'
      ],
      info: [
        'Scaling replicas to match demand',
        'Rolling update in progress',
        'Metrics collection active',
        'Load balancer configured',
        'Auto-scaling enabled',
        'Monitoring alerts configured'
      ]
    }
    
    const typeMessages = messages[type]
    const randomMessage = typeMessages[Math.floor(Math.random() * typeMessages.length)]
    return context ? `${context}: ${randomMessage}` : randomMessage
  },

  // Generate cloud-native log entries
  generateLogEntry: (service: string, level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' = 'INFO'): string => {
    const timestamp = new Date().toISOString()
    const logTemplates = {
      INFO: [
        'Service started successfully',
        'Health check passed',
        'Configuration reloaded',
        'Metrics exported',
        'Request processed',
        'Cache updated'
      ],
      WARN: [
        'High memory usage detected',
        'Response time degraded',
        'Rate limit approaching',
        'Connection pool exhausted',
        'Disk space low',
        'Certificate expires soon'
      ],
      ERROR: [
        'Service unavailable',
        'Database connection failed',
        'Authentication failed',
        'Timeout exceeded',
        'Resource not found',
        'Permission denied'
      ],
      DEBUG: [
        'Request received',
        'Processing started',
        'Cache miss',
        'Query executed',
        'Response sent',
        'Cleanup completed'
      ]
    }
    
    const templates = logTemplates[level]
    const message = templates[Math.floor(Math.random() * templates.length)]
    
    return `[${timestamp}] ${level}: ${service} - ${message}`
  },

  // Get cloud-native resource specifications
  getResourceSpec: (type: string): Record<string, any> => {
    const specs: Record<string, Record<string, any>> = {
      'deployment': {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: { name: 'portfolio-web', namespace: 'default' },
        spec: {
          replicas: 3,
          selector: { matchLabels: { app: 'portfolio' } },
          template: {
            metadata: { labels: { app: 'portfolio' } },
            spec: {
              containers: [{
                name: 'web',
                image: 'portfolio:latest',
                ports: [{ containerPort: 3000 }]
              }]
            }
          }
        }
      },
      'service': {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: { name: 'portfolio-service' },
        spec: {
          selector: { app: 'portfolio' },
          ports: [{ port: 80, targetPort: 3000 }],
          type: 'LoadBalancer'
        }
      },
      'configmap': {
        apiVersion: 'v1',
        kind: 'ConfigMap',
        metadata: { name: 'portfolio-config' },
        data: {
          'app.env': 'production',
          'debug.enabled': 'false',
          'metrics.enabled': 'true'
        }
      }
    }
    
    return specs[type.toLowerCase()] || {}
  }
}

// React component for displaying cloud terminology hints
interface CloudTerminologyHintsProps {
  context?: string
  showCommands?: boolean
  showPaths?: boolean
  showLogs?: boolean
}

const CloudTerminologyHints: React.FC<CloudTerminologyHintsProps> = ({
  context = 'general',
  showCommands = true,
  showPaths = true,
  showLogs = false
}) => {
  const contextCommands = {
    projects: [
      'kubectl get deployments',
      'helm list --all-namespaces',
      'kubectl describe pod portfolio-web',
      'kubectl logs -f deployment/portfolio'
    ],
    skills: [
      'ansible-playbook site.yml',
      'terraform plan -out=tfplan',
      'kubectl apply -f k8s/',
      'docker-compose up -d'
    ],
    contact: [
      'kubectl get services',
      'kubectl describe ingress',
      'curl -X POST /api/contact',
      'kubectl port-forward svc/api 8080:80'
    ]
  }

  const contextPaths = {
    projects: [
      '/var/lib/kubernetes/manifests/',
      '/etc/helm/charts/',
      '/opt/docker/compose/',
      '/var/log/deployments/'
    ],
    skills: [
      '/etc/ansible/playbooks/',
      '/var/lib/terraform/modules/',
      '/usr/local/bin/kubectl',
      '/etc/docker/daemon.json'
    ],
    contact: [
      '/etc/nginx/sites-available/',
      '/var/log/nginx/access.log',
      '/etc/ssl/certs/',
      '/etc/service-mesh/config.yaml'
    ]
  }

  const commands = contextCommands[context as keyof typeof contextCommands] || contextCommands.projects
  const paths = contextPaths[context as keyof typeof contextPaths] || contextPaths.projects

  return (
    <div className="bg-gray-900/30 border border-gray-600/30 rounded p-3 font-mono text-xs">
      <div className="text-cyan-400 mb-2 flex items-center space-x-2">
        <span>{CloudTerminology.getCloudIcon('devops')}</span>
        <span>CLOUD-NATIVE CONTEXT</span>
      </div>
      
      {showCommands && (
        <div className="mb-3">
          <div className="text-gray-400 mb-1">Common Commands:</div>
          <div className="space-y-1">
            {commands.slice(0, 2).map((cmd, index) => (
              <div key={index} className="text-green-400">
                $ {cmd}
              </div>
            ))}
          </div>
        </div>
      )}

      {showPaths && (
        <div className="mb-3">
          <div className="text-gray-400 mb-1">System Paths:</div>
          <div className="space-y-1">
            {paths.slice(0, 2).map((path, index) => (
              <div key={index} className="text-blue-400">
                {path}
              </div>
            ))}
          </div>
        </div>
      )}

      {showLogs && (
        <div>
          <div className="text-gray-400 mb-1">Recent Activity:</div>
          <div className="text-gray-300">
            {CloudTerminology.generateLogEntry('portfolio-web', 'INFO')}
          </div>
        </div>
      )}
    </div>
  )
}

export default CloudTerminologyHints