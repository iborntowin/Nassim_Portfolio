"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InlineContactFormProps {
  onSubmit: (data: ContactFormData) => void
  onCancel: () => void
  initialData?: Partial<ContactFormData>
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  project?: string
}

export function InlineContactForm({ onSubmit, onCancel, initialData }: InlineContactFormProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    message: initialData?.message || '',
    project: initialData?.project || ''
  })
  
  const [currentField, setCurrentField] = useState<keyof ContactFormData>('name')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fields: Array<{ key: keyof ContactFormData; label: string; required: boolean; type: 'text' | 'email' | 'textarea' }> = [
    { key: 'name', label: 'Full Name', required: true, type: 'text' },
    { key: 'email', label: 'Email Address', required: true, type: 'email' },
    { key: 'project', label: 'Project Type (optional)', required: false, type: 'text' },
    { key: 'message', label: 'Message', required: true, type: 'textarea' }
  ]

  const currentFieldIndex = fields.findIndex(f => f.key === currentField)
  const currentFieldConfig = fields[currentFieldIndex]

  useEffect(() => {
    if (isMounted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentField, isMounted])

  const validateField = (key: keyof ContactFormData, value: string): string | null => {
    if (key === 'name' && !value.trim()) return 'Name is required'
    if (key === 'email') {
      if (!value.trim()) return 'Email is required'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return 'Please enter a valid email address'
    }
    if (key === 'message' && !value.trim()) return 'Message is required'
    return null
  }

  const handleNext = () => {
    const error = validateField(currentField, formData[currentField])
    if (error) {
      setErrors(prev => ({ ...prev, [currentField]: error }))
      return
    }

    setErrors(prev => ({ ...prev, [currentField]: undefined }))

    if (currentFieldIndex < fields.length - 1) {
      setCurrentField(fields[currentFieldIndex + 1].key)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentField(fields[currentFieldIndex - 1].key)
    }
  }

  const handleSubmit = async () => {
    // Validate all required fields
    const newErrors: Partial<ContactFormData> = {}
    let hasErrors = false

    fields.forEach(field => {
      if (field.required) {
        const error = validateField(field.key, formData[field.key])
        if (error) {
          newErrors[field.key] = error
          hasErrors = true
        }
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      // Go to first field with error
      const firstErrorField = fields.find(f => newErrors[f.key])
      if (firstErrorField) {
        setCurrentField(firstErrorField.key)
      }
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(formData)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (currentFieldConfig.type !== 'textarea') {
        handleNext()
      }
    } else if (e.key === 'Escape') {
      onCancel()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (e.shiftKey) {
        handlePrevious()
      } else {
        handleNext()
      }
    }
  }

  const progress = ((currentFieldIndex + 1) / fields.length) * 100

  if (!isMounted) {
    return (
      <div className="bg-black/90 border border-green-400/30 rounded-lg p-4 my-4 font-mono">
        <div className="text-green-400 animate-pulse">Loading contact form...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-black/90 border border-green-400/30 rounded-lg p-4 my-4 font-mono"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-green-400 font-bold">
          📨 CONTACT FORM - TERMINAL MODE
        </div>
        <div className="text-gray-400 text-sm">
          {currentFieldIndex + 1}/{fields.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-1 mb-4">
        <motion.div
          className="bg-green-400 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Current Field */}
      <div className="mb-4">
        <div className="text-cyan-400 mb-2">
          {currentFieldConfig.label}
          {currentFieldConfig.required && <span className="text-red-400 ml-1">*</span>}
        </div>
        
        <div className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          {currentFieldConfig.type === 'textarea' ? (
            <textarea
              ref={inputRef as any}
              value={formData[currentField]}
              onChange={(e) => setFormData(prev => ({ ...prev, [currentField]: e.target.value }))}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none resize-none min-h-[60px] font-mono"
              placeholder={`Enter your ${currentFieldConfig.label.toLowerCase()}...`}
              disabled={isSubmitting}
            />
          ) : (
            <input
              ref={inputRef}
              type={currentFieldConfig.type}
              value={formData[currentField]}
              onChange={(e) => setFormData(prev => ({ ...prev, [currentField]: e.target.value }))}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none font-mono"
              placeholder={`Enter your ${currentFieldConfig.label.toLowerCase()}...`}
              disabled={isSubmitting}
            />
          )}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errors[currentField] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-2 ml-4"
            >
              ❌ {errors[currentField]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Form Data Preview */}
      <div className="bg-gray-900/50 rounded p-3 mb-4 text-sm">
        <div className="text-gray-400 mb-2">Current Data:</div>
        {fields.map(field => (
          <div key={field.key} className="flex">
            <span className="text-gray-500 w-20">{field.label}:</span>
            <span className={`${formData[field.key] ? 'text-green-400' : 'text-gray-600'}`}>
              {formData[field.key] || '(empty)'}
            </span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-400">
          {isSubmitting ? (
            <span className="text-yellow-400">⏳ Submitting...</span>
          ) : (
            <>
              <kbd className="bg-gray-800 px-2 py-1 rounded mr-2">Enter</kbd>
              {currentFieldIndex === fields.length - 1 ? 'Submit' : 'Next'}
              {currentFieldIndex > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <kbd className="bg-gray-800 px-2 py-1 rounded mr-2">Shift+Tab</kbd>
                  Previous
                </>
              )}
            </>
          )}
        </div>
        
        <div className="text-gray-400">
          <kbd className="bg-gray-800 px-2 py-1 rounded mr-2">Esc</kbd>
          Cancel
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"
          >
            <div className="text-green-400 text-center">
              <div className="animate-spin text-2xl mb-2">⚙️</div>
              <div>Sending message...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}