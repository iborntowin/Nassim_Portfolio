"use client";

const technologies = [
  "React", "Next.js", "TypeScript", "Python", "TensorFlow",
  "PostgreSQL", "Docker", "Spring Boot", "Node.js", "AWS",
  "Tailwind CSS", "GraphQL", "MongoDB", "Redis", "Kubernetes"
];

export function TechMarquee() {
  return (
    <div className="relative z-20 px-4 py-10 md:px-8 md:py-20 bg-[var(--color-primary-background)]">
      <h2 className="text-center text-2xl font-bold text-[var(--color-text-primary)] md:text-4xl mb-4">
        Technologies I Work With
      </h2>
      <p className="mt-4 text-center text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
        I have experience with a wide range of modern technologies for building robust and scalable solutions.
      </p>

      <div className="relative mx-auto mt-12 overflow-hidden">
        <div className="flex animate-marquee space-x-8">
          {[...technologies, ...technologies].map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="flex-shrink-0 px-6 py-3 bg-[var(--color-secondary-background)] border border-[var(--color-border)] rounded-lg"
            >
              <span className="text-[var(--color-text-primary)] font-medium whitespace-nowrap">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}