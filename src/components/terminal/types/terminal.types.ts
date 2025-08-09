export interface TerminalTab {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  shortcut: string
  component: React.ComponentType<TerminalTabProps>
  isActive?: boolean
}

export interface TerminalTabProps {
  isActive: boolean
  onCommand?: (command: string) => void
  terminalState?: TerminalState
}

export interface TerminalState {
  currentDirectory: string
  user: string
  host: string
  environment: 'development' | 'production' | 'staging'
  isConnected: boolean
  lastCommand?: string
  commandHistory: string[]
}

export interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'success' | 'warning' | 'info'
  content: string
  timestamp: number
  tabId?: string
}

export interface CommandResult {
  success: boolean
  output: string[]
  type: 'success' | 'error' | 'warning' | 'info'
}

export interface AutocompleteOption {
  value: string
  description?: string
  type: 'command' | 'file' | 'directory' | 'option'
}

export interface TerminalTheme {
  background: {
    primary: string
    secondary: string
    accent: string
  }
  text: {
    primary: string
    secondary: string
    success: string
    error: string
    warning: string
    info: string
  }
  syntax: {
    keyword: string
    string: string
    number: string
    comment: string
    operator: string
  }
  ui: {
    border: string
    selection: string
    cursor: string
    scrollbar: string
  }
}

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  action: () => void
  description: string
}