"use client";

import React, { useState } from "react";
import { IconMailFilled } from "@tabler/icons-react";

export function SimpleCenteredContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      setShowConfetti(false);
      return;
    }
    setSubmitted(true);
    setErrors({});
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="relative flex justify-center items-center min-h-[60vh] py-16 px-2 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animate-gradient-x bg-gradient-to-br from-[var(--primary)] via-[var(--background)] to-[var(--accent)] opacity-80 blur-2xl" />
      {/* Floating Mail Icon */}
      <IconMailFilled className="absolute top-8 right-8 z-10 w-16 h-16 text-[var(--primary)] opacity-30 animate-float" aria-hidden="true" />
      {/* Confetti/Checkmark Animation */}
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="animate-pop">
            <circle cx="60" cy="60" r="50" fill="url(#confetti)" opacity="0.2" />
            <path d="M40 65l15 15 25-35" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <radialGradient id="confetti" cx="0" cy="0" r="1" gradientTransform="translate(60 60) scale(60)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#7c3aed" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )}
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border-2 border-[var(--primary)] bg-white/80 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-lg p-8 md:p-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--primary-dark)] dark:text-[var(--accent)]">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--primary)] bg-white/70 dark:bg-neutral-900/70 px-4 py-2 text-[var(--primary-dark)] dark:text-[var(--accent)] placeholder-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--primary-dark)] dark:text-[var(--accent)]">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--primary)] bg-white/70 dark:bg-neutral-900/70 px-4 py-2 text-[var(--primary-dark)] dark:text-[var(--accent)] placeholder-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[var(--primary-dark)] dark:text-[var(--accent)]">Company</label>
            <input
              id="company"
              type="text"
              placeholder="Your Company (optional)"
              value={form.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--primary)] bg-white/70 dark:bg-neutral-900/70 px-4 py-2 text-[var(--primary-dark)] dark:text-[var(--accent)] placeholder-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--primary-dark)] dark:text-[var(--accent)]">Message</label>
            <textarea
              rows={5}
              id="message"
              placeholder="Type your message here..."
              value={form.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-[var(--primary)] bg-white/70 dark:bg-neutral-900/70 px-4 py-2 text-[var(--primary-dark)] dark:text-[var(--accent)] placeholder-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition"
              aria-invalid={!!errors.message}
              aria-describedby="message-error"
            />
            {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg font-bold text-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] animate-gradient-x"
            >
              {submitted ? 'Sent!' : 'Send Message'}
            </button>
          </div>
          {submitted && <p className="text-green-600 text-center text-sm mt-2">Thank you! Your message has been received.</p>}
        </form>
      </div>
      {/* Extra creative animated background SVGs */}
      <svg className="absolute left-0 bottom-0 w-48 h-48 opacity-20 z-0" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="100" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(100 100) scale(100)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="absolute right-0 top-0 w-32 h-32 opacity-10 z-0" viewBox="0 0 100 100" fill="none">
        <rect x="0" y="0" width="100" height="100" rx="30" fill="url(#paint1_radial)" />
        <defs>
          <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(50 50) scale(50)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-pop {
          animation: pop 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes pop {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 