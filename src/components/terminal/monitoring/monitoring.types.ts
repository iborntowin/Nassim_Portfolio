export interface SystemMetricsData {
  cpu: number
  memory: number
  network: number
  podsRunning: number
  deploymentsSucceeded: number
  uptime: string
  connectionStatus: 'connected' | 'connecting' | 'disconnected'
}

export interface LogEntry {
  id: string
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
  type: 'deployment' | 'monitoring' | 'security' | 'system'
}

export interface LogTemplate {
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  service: string
  message: string
}

export interface SystemMetricsProps {
  position?: 'overlay' | 'sidebar' | 'footer'
  updateInterval?: number
  showGraphs?: boolean
  className?: string
}

export interface LogStreamProps {
  logTypes?: ('deployment' | 'monitoring' | 'security' | 'system')[]
  scrollSpeed?: number
  opacity?: number
  maxLogs?: number
  className?: string
}

export interface MetricBarProps {
  label: string
  value: number
  max: number
  color: string
  unit?: string
}

export interface StatusIndicatorProps {
  status: string
  color: string
}