"use client"

import { motion, useInView } from 'motion/react'
import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { ProjectImage } from '@/lib/projects-data'

interface LazyImageGalleryProps {
  images: ProjectImage[]
  shouldReduceMotion: boolean
}

export default function LazyImageGallery({ images, shouldReduceMotion }: LazyImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }, [])

  if (!isInView) {
    return (
      <div ref={ref} className="mb-16">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((_, index) => (
            <div key={index} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: shouldReduceMotion ? 0.2 : 0.6, 
              delay: shouldReduceMotion ? 0 : index * 0.1,
              ease: "easeOut"
            }}
            className="relative group"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100">
              {/* Loading skeleton */}
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl" />
              )}
              
              {/* Optimized image with lazy loading */}
              <div className={`transition-opacity duration-500 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Futuristic hover effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-accent)]/10 to-[var(--color-secondary-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
              
              {/* Caption with smooth reveal */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}