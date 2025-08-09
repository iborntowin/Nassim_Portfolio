export interface Command {
  name: string
  description: string
  usage: string
  aliases?: string[]
  options?: CommandOption[]
  handler: (args: string[], options: Record<string, any>) => Promise<CommandResult> | CommandResult
}

export interface CommandOption {
  name: string
  alias?: string
  description: string
  type: 'boolean' | 'string' | 'number'
  required?: boolean
  default?: any
}

export interface CommandResult {
  success: boolean
  output: string[]
  type: 'success' | 'error' | 'warning' | 'info'
  data?: any
}

export interface CommandContext {
  currentDirectory: string
  user: string
  host: string
  environment: string
  variables: Record<string, string>
  history: string[]
}

export interface ParsedCommand {
  command: string
  args: string[]
  options: Record<string, any>
  raw: string
}