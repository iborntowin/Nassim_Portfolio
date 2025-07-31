"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";

export function TestimonialsGridWithCenteredCarousel() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 overflow-hidden h-full ">
      <div className="pb-20">
        <h1 className="pt-4 font-bold text-black text-lg md:text-2xl dark:text-white">
          Trusted by teams worldwide
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-200">
          Nassim has delivered exceptional results for companies across various industries.
        </p>
      </div>

      <div className=" relative">
        <TestimonialsSlider />
        <div className="h-full max-h-screen md:max-h-none overflow-hidden w-full bg-charcoal opacity-30 [mask-image:radial-gradient(circle_at_center,transparent_10%,white_99%)]">
          <TestimonialsGrid />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-gradient-to-t from-charcoal to-transparent"></div>
    </div>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);
  const fourth = testimonials.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto ">
      {grid.map((testimonialsCol, index) => (
        <div key={`testimonials-col-${index}`} className="grid gap-4">
          {testimonialsCol.map((testimonial) => (
            <Card key={`testimonial-${testimonial.src}-${index}`}>
              <Quote>{testimonial.quote}</Quote>
              <div className="flex gap-2 items-center mt-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <QuoteDescription>{testimonial.name}</QuoteDescription>
                  <QuoteDescription className="text-[10px]">
                    {testimonial.designation}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-neutral-100 bg-neutral-200 dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.30)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-xs font-semibold dark:text-white text-black py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal dark:text-neutral-400 text-neutral-600 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "James Sullivan",
    quote:
      "Nassim's work on our session management platform was exceptional. His attention to detail and technical expertise delivered exactly what we needed.",
    src: "/images/avatars/avatar-1.png",
    designation: "CTO, TechFlow Solutions",
  },
  {
    name: "Amira Mansouri",
    quote:
      "The AI component detection system Nassim built has revolutionized our electronics manufacturing process. Incredible accuracy and performance.",
    src: "/images/avatars/avatar-2.png",
    designation: "Engineering Manager, ElectroTech",
  },
  {
    name: "Robert Kim",
    quote:
      "Working with Nassim on our embedded systems project was a game-changer. His expertise in C++ and hardware integration is outstanding.",
    src: "/images/avatars/avatar-3.png",
    designation: "Senior Hardware Engineer, IoT Innovations",
  },
  {
    name: "Lisa Martinez",
    quote:
      "Nassim's full-stack development skills are impressive. He delivered a robust, scalable solution that exceeded our expectations.",
    src: "/images/avatars/avatar-4.png",
    designation: "Product Manager, StartupHub",
  },
  {
    name: "Samuel Thompson",
    quote:
      "The productivity tools Nassim developed have significantly improved our team's workflow. Clean code, great documentation, excellent results.",
    src: "/images/avatars/avatar-5.png",
    designation: "Development Team Lead, CodeCraft",
  },
  {
    name: "Diana Wilson",
    quote:
      "Nassim's machine learning expertise helped us implement computer vision solutions we didn't think were possible. Truly innovative work.",
    src: "/images/avatars/avatar-6.png",
    designation: "AI Research Director, VisionTech",
  },
  {
    name: "Michael Johnson",
    quote:
      "The contract management system Nassim built has streamlined our entire business process. Professional, efficient, and user-friendly.",
    src: "/images/avatars/avatar-7.png",
    designation: "Operations Director, BusinessFlow",
  },
  {
    name: "Nancy Kim",
    quote:
      "Nassim's ability to work across different technologies - from Spring Boot to Svelte - makes him an invaluable full-stack developer.",
    src: "/images/avatars/avatar-8.png",
    designation: "Technical Project Manager, WebSolutions",
  },
  {
    name: "Peter Lee",
    quote:
      "The embedded communication system Nassim developed achieved performance gains we didn't expect. Excellent engineering and optimization.",
    src: "/images/avatars/avatar-9.png",
    designation: "Systems Architect, SpaceTech",
  },
  {
    name: "Quinn Rodriguez",
    quote:
      "Nassim's work on our AI-powered analytics platform has saved us countless hours. His technical skills and problem-solving are top-notch.",
    src: "/images/avatars/avatar-10.png",
    designation: "Data Science Manager, AnalyticsPro",
  },
  {
    name: "Tina Underwood",
    quote:
      "Professional, reliable, and technically excellent. Nassim delivered our desktop application on time and with exceptional quality.",
    src: "/images/avatars/avatar-11.png",
    designation: "Software Consultant, TechAdvice",
  },
  {
    name: "Victor Williams",
    quote:
      "The signal processing algorithms Nassim implemented for our EEG system are impressive. Great understanding of complex technical requirements.",
    src: "/images/avatars/avatar-12.png",
    designation: "Biomedical Engineer, HealthTech",
  },
  {
    name: "Xander Young",
    quote:
      "Nassim's innovative approach to solving complex problems sets him apart. His work on our platform has opened new possibilities for our business.",
    src: "/images/avatars/avatar-13.png",
    designation: "Innovation Lead, FutureTech",
  },
  {
    name: "Zoe Anderson",
    quote:
      "Working with Nassim was a pleasure. His technical expertise, communication skills, and delivery quality make him an outstanding developer.",
    src: "/images/avatars/avatar-14.png",
    designation: "Technology Strategist, DigitalTransform",
  },
];

export const TestimonialsSlider = () => {
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const slicedTestimonials = testimonials.slice(0, 3);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === slicedTestimonials.length ? 0 : (active) => active + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [active, autorotate, slicedTestimonials.length]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        heightFix();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="absolute inset-0 mt-20 md:mt-60">
      <div className="max-w-3xl mx-auto  relative z-40 h-80">
        <div className="relative pb-12 md:pb-20">
          {/* Particles animation */}

          {/* Carousel */}
          <div className="text-center">
            {/* Testimonial image */}
            <div className="relative h-40 [mask-image:_linear-gradient(0deg,transparent,#FFFFFF_30%,#FFFFFF)] md:[mask-image:_linear-gradient(0deg,transparent,#FFFFFF_40%,#FFFFFF)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-neutral-400/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-neutral-200 after:dark:bg-neutral-900 after:m-px before:-z-20 after:-z-20">
                <AnimatePresence mode="wait">
                  {slicedTestimonials.map((item, index) => (
                    active === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ 
                          duration: 0.7, 
                          ease: [0.68, -0.3, 0.32, 1] 
                        }}
                        className="absolute inset-0 h-full -z-10"
                        onAnimationStart={() => heightFix()}
                      >
                        <Image
                          className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                          src={item.src}
                          width={56}
                          height={56}
                          alt={item.name}
                        />
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {/* Text */}
            <div className="mb-10 transition-all duration-150 delay-300 ease-in-out px-8 sm:px-6">
              <div className="relative flex flex-col" ref={testimonialsRef}>
                <AnimatePresence mode="wait">
                  {slicedTestimonials.map((item, index) => (
                    active === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.2,
                          ease: "easeInOut" 
                        }}
                        className="text-base text-black dark:text-white md:text-xl font-bold"
                        onAnimationStart={() => heightFix()}
                      >
                        {item.quote}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap justify-center -m-1.5 px-8 sm:px-6">
              {slicedTestimonials.map((item, index) => (
                <button
                  className={cn(
                    `px-2 py-1 rounded-full m-1.5 text-xs border border-transparent text-neutral-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.neutral.900),_theme(colors.neutral.900))_padding-box,_conic-gradient(theme(colors.neutral.400),_theme(colors.neutral.700)_25%,_theme(colors.neutral.700)_75%,_theme(colors.neutral.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-neutral-800/30 before:rounded-full before:pointer-events-none ${
                      active === index
                        ? "border-secondary/50"
                        : "border-transparent opacity-70"
                    }`
                  )}
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setAutorotate(false);
                  }}
                >
                  <span className="relative">
                    <span className="text-neutral-50 font-bold">
                      {item.name}
                    </span>{" "}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
