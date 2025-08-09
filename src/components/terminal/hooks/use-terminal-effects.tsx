"use client"

import { useCallback, useRef } from 'react'

export function useTerminalEffects() {
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Play sound effect
  const playSound = useCallback((type: 'success' | 'error' | 'deploy' | 'type') => {
    try {
      const audioContext = getAudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configure sound based on type
      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.2)
          break

        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3)
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.3)
          break

        case 'deploy':
          // Deployment success sound - ascending notes
          const frequencies = [440, 554, 659, 880]
          frequencies.forEach((freq, index) => {
            const osc = audioContext.createOscillator()
            const gain = audioContext.createGain()
            
            osc.connect(gain)
            gain.connect(audioContext.destination)
            
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1)
            gain.gain.setValueAtTime(0.05, audioContext.currentTime + index * 0.1)
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.2)
            
            osc.start(audioContext.currentTime + index * 0.1)
            osc.stop(audioContext.currentTime + index * 0.1 + 0.2)
          })
          break

        case 'type':
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
          gainNode.gain.setValueAtTime(0.02, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.05)
          break
      }
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Audio context not available:', error)
    }
  }, [getAudioContext])

  // Add screen shake effect
  const addScreenShake = useCallback(() => {
    const body = document.body
    body.style.animation = 'shake 0.5s ease-in-out'
    
    setTimeout(() => {
      body.style.animation = ''
    }, 500)

    // Add CSS keyframes if not already present
    if (!document.querySelector('#shake-keyframes')) {
      const style = document.createElement('style')
      style.id = 'shake-keyframes'
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Add particle effect
  const addParticleEffect = useCallback((element: HTMLElement, type: 'success' | 'deploy') => {
    const colors = type === 'success' ? ['#22c55e', '#16a34a', '#15803d'] : ['#3b82f6', '#1d4ed8', '#1e40af']
    
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * element.offsetWidth}px;
        top: ${Math.random() * element.offsetHeight}px;
        animation: particle-float 1s ease-out forwards;
      `
      
      element.appendChild(particle)
      
      setTimeout(() => {
        particle.remove()
      }, 1000)
    }

    // Add CSS keyframes for particles if not already present
    if (!document.querySelector('#particle-keyframes')) {
      const style = document.createElement('style')
      style.id = 'particle-keyframes'
      style.textContent = `
        @keyframes particle-float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
          }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return {
    playSound,
    addScreenShake,
    addParticleEffect
  }
}