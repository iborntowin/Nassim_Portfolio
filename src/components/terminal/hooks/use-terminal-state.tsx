"use client"

import { useState, useCallback, useRef } from 'react'
import { TerminalState, TerminalLine, TerminalTab } from '../types/terminal.types'

const initialState: TerminalState = {
  currentDirectory: '~/portfolio',
  user: 'visitor',
  host: 'nassim-terminal',
  environment: 'development',
  isConnected: true,
  commandHistory: []
}

export function useTerminalState() {
  const [state, setState] = useState<TerminalState>(initialState)
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [activeTabId, setActiveTabId] = useState<string>('hero')
  const lineIdCounter = useRef(0)

  const generateLineId = useCallback(() => {
    return `line-${++lineIdCounter.current}-${Date.now()}`
  }, [])

  const addLine = useCallback((
    content: string, 
    type: TerminalLine['type'] = 'output',
    tabId?: string
  ) => {
    const newLine: TerminalLine = {
      id: generateLineId(),
      type,
      content,
      timestamp: Date.now(),
      tabId: tabId || activeTabId
    }
    setLines(prev => [...prev, newLine])
  }, [generateLineId, activeTabId])

  const clearLines = useCallback((tabId?: string) => {
    if (tabId) {
      setLines(prev => prev.filter(line => line.tabId !== tabId))
    } else {
      setLines([])
    }
  }, [])

  const updateState = useCallback((updates: Partial<TerminalState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const addToHistory = useCallback((command: string) => {
    setState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory.filter(cmd => cmd !== command), command],
      lastCommand: command
    }))
  }, [])

  const getPrompt = useCallback(() => {
    return `${state.user}@${state.host}:${state.currentDirectory}$`
  }, [state.user, state.host, state.currentDirectory])

  return {
    state,
    lines,
    activeTabId,
    setActiveTabId,
    addLine,
    clearLines,
    updateState,
    addToHistory,
    getPrompt
  }
}