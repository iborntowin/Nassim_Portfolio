"use client"

import React from 'react'

interface SyntaxHighlighterProps {
  code: string
  language?: string
  className?: string
}

const terminalTheme = {
  keyword: 'text-red-400',
  string: 'text-green-300',
  number: 'text-blue-400',
  comment: 'text-gray-400',
  operator: 'text-yellow-400',
  function: 'text-purple-400',
  variable: 'text-cyan-400'
}

export function SyntaxHighlighter({ code, language = 'bash', className = '' }: SyntaxHighlighterProps) {
  const highlightCode = (code: string, lang: string) => {
    const lines = code.split('\n')
    
    return lines.map((line, lineIndex) => {
      let highlightedLine = line

      // Bash/Shell highlighting
      if (lang === 'bash' || lang === 'shell') {
        // Comments
        highlightedLine = highlightedLine.replace(
          /(#.*$)/g,
          `<span class="${terminalTheme.comment}">$1</span>`
        )
        
        // Strings
        highlightedLine = highlightedLine.replace(
          /(".*?"|'.*?')/g,
          `<span class="${terminalTheme.string}">$1</span>`
        )
        
        // Keywords
        highlightedLine = highlightedLine.replace(
          /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|export|source|alias)\b/g,
          `<span class="${terminalTheme.keyword}">$1</span>`
        )
        
        // Variables
        highlightedLine = highlightedLine.replace(
          /(\$\{?[A-Za-z_][A-Za-z0-9_]*\}?)/g,
          `<span class="${terminalTheme.variable}">$1</span>`
        )
      }

      // YAML highlighting
      if (lang === 'yaml' || lang === 'yml') {
        // Keys
        highlightedLine = highlightedLine.replace(
          /^(\s*)([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/g,
          `$1<span class="${terminalTheme.keyword}">$2</span>:`
        )
        
        // Strings
        highlightedLine = highlightedLine.replace(
          /:\s*(".*?"|'.*?')/g,
          `: <span class="${terminalTheme.string}">$1</span>`
        )
        
        // Numbers
        highlightedLine = highlightedLine.replace(
          /:\s*(\d+)/g,
          `: <span class="${terminalTheme.number}">$1</span>`
        )
      }

      // Terraform highlighting
      if (lang === 'terraform' || lang === 'tf') {
        // Resource blocks
        highlightedLine = highlightedLine.replace(
          /\b(resource|data|variable|output|locals|terraform|provider|module)\b/g,
          `<span class="${terminalTheme.keyword}">$1</span>`
        )
        
        // Strings
        highlightedLine = highlightedLine.replace(
          /(".*?")/g,
          `<span class="${terminalTheme.string}">$1</span>`
        )
      }

      return (
        <div key={lineIndex} className="min-h-[1.25rem]">
          <span dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }} />
        </div>
      )
    })
  }

  return (
    <pre className={`text-gray-300 whitespace-pre-wrap text-sm leading-5 ${className}`}>
      {highlightCode(code, language)}
    </pre>
  )
}