'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  projectType: string;
  outcome: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    content: "Nassim delivered an exceptional full-stack solution that exceeded our expectations. His attention to detail and technical expertise transformed our business operations completely.",
    rating: 5,
    projectType: "Full-Stack Development",
    outcome: "40% efficiency increase",
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "InnovateLab",
    content: "The AI-powered analytics platform Nassim built for us has been game-changing. His deep understanding of machine learning and user experience is remarkable.",
    rating: 5,
    projectType: "AI/ML Platform",
    outcome: "92% accuracy achieved",
    avatar: "MR"
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Research Director",
    company: "BioTech Innovations",
    content: "Working with Nassim on our embedded systems project was fantastic. His expertise in IoT and low-level programming delivered results beyond our initial scope.",
    rating: 5,
    projectType: "Embedded Systems",
    outcome: "60% power optimization",
    avatar: "EW"
  },
  {
    id: 4,
    name: "James Thompson",
    role: "DevOps Lead",
    company: "CloudScale Inc",
    content: "Nassim's cloud architecture and DevOps implementation reduced our deployment time by 75%. His systematic approach to infrastructure is world-class.",
    rating: 5,
    projectType: "Cloud Architecture",
    outcome: "75% faster deployments",
    avatar: "JT"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Startup Founder",
    company: "NextGen Apps",
    content: "From concept to production, Nassim guided our entire technical journey. His full-stack expertise and business understanding made our MVP launch seamless.",
    rating: 5,
    projectType: "MVP Development",
    outcome: "Successful launch in 3 months",
    avatar: "LP"
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Engineering Manager",
    company: "DataDriven Corp",
    content: "The machine learning pipeline Nassim built processes terabytes of data daily with incredible efficiency. His optimization skills are truly exceptional.",
    rating: 5,
    projectType: "Data Pipeline",
    outcome: "10x processing speed",
    avatar: "AH"
  }
];

const stats = [
  { label: "Happy Clients", value: "50+", color: "text-blue-400" },
  { label: "Projects Completed", value: "150+", color: "text-green-400" },
  { label: "Success Rate", value: "98%", color: "text-purple-400" },
  { label: "24/7 Support", value: "Always", color: "text-cyan-400" }
];

export default function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Trusted by startups and enterprises worldwide to deliver exceptional results
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative mb-16">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-blue-400 mx-auto mb-6 opacity-50" />
                
                {/* Testimonial Content */}
                <blockquote className="text-xl lg:text-2xl text-slate-200 leading-relaxed mb-8 max-w-4xl mx-auto">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Client Info */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  
                  {/* Details */}
                  <div className="text-center lg:text-left">
                    <div className="text-white font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-slate-400">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 mt-2">
                      <span className="text-blue-400 text-sm font-medium">
                        {testimonials[currentIndex].projectType}
                      </span>
                      <span className="text-green-400 text-sm font-medium">
                        {testimonials[currentIndex].outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-400 scale-125'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}