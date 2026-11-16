"use client"

import Image from 'next/image'
import { ProjectImage } from '@/lib/projects-data'

interface LazyImageGalleryProps {
  images: ProjectImage[]
  shouldReduceMotion?: boolean
}

export default function LazyImageGallery({ images }: LazyImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        Project gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="group relative">
            <div className="relative overflow-hidden rounded-xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/60">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-64 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            {image.caption && (
              <figcaption className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
