"use client"
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Send } from "lucide-react";

export function FooterWithGrid() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2500);
    setEmail("");
  };

  return (
    <div className="relative bg-[var(--color-primary-background)] border-t border-[var(--color-secondary-background)] overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animate-gradient-x bg-gradient-to-br from-[var(--primary)] via-[var(--background)] to-[var(--accent)] opacity-60 blur-2xl" />
      {/* Creative SVG Accent */}
      <svg className="absolute left-0 bottom-0 w-64 h-64 opacity-20 z-0" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="100" fill="url(#footer_radial)" />
        <defs>
          <radialGradient id="footer_radial" cx="0" cy="0" r="1" gradientTransform="translate(100 100) scale(100)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 relative z-10">
        <div className="border-b border-[var(--color-secondary-background)] pb-8">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" />
            <p className="mb-4 text-[var(--color-text-secondary)] text-sm">
              Full-stack developer crafting innovative solutions with modern technologies. 
              Specialized in TypeScript, React, and scalable backend architectures.
            </p>
            <div className="text-sm">
              <span className="text-[var(--color-text-secondary)]">Building the future of web development at </span>
              <Link
                href="mailto:nassim@example.com"
                className="font-medium text-[var(--color-primary-accent)] hover:text-[var(--color-secondary-accent)] transition-colors"
              >
                nassim@example.com
              </Link>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-[var(--color-text-secondary)]">Available for consulting at </span>
              <Link
                href="#"
                className="font-medium text-[var(--color-warning-energy)] hover:text-orange-400 transition-colors inline-flex items-center gap-1"
              >
                Book a Call <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-[var(--color-secondary-background)] pb-10 pt-10 md:grid-cols-4">
          {/* Technical Section */}
          <ul className="text-base font-medium">
            <li className="mb-4 text-sm font-bold text-[var(--color-secondary-accent)]">
              Technical
            </li>
            {TECHNICAL_LINKS.map((item, idx) => (
              <li key={"technical" + idx} className="mb-3 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors flex items-center gap-2 group"
                  target={item.external ? "_blank" : undefined}
                >
                  {item.icon && <item.icon className="h-4 w-4 group-hover:scale-125 group-hover:text-[var(--color-primary)] transition-transform duration-200" />}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Business Section */}
          <ul className="text-base font-medium">
            <li className="mb-4 text-sm font-bold text-[var(--color-secondary-accent)]">
              Business
            </li>
            {BUSINESS_LINKS.map((item, idx) => (
              <li key={"business" + idx} className="mb-3 text-sm font-normal">
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors flex items-center gap-2 group",
                    item.highlight 
                      ? "text-[var(--color-warning-energy)] hover:text-orange-400 font-medium"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)]"
                  )}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.icon && <item.icon className="h-4 w-4 group-hover:scale-125 group-hover:text-[var(--color-primary)] transition-transform duration-200" />}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Resources Section */}
          <ul className="text-base font-medium">
            <li className="mb-4 text-sm font-bold text-[var(--color-secondary-accent)]">
              Resources
            </li>
            {RESOURCES_LINKS.map((item, idx) => (
              <li key={"resources" + idx} className="mb-3 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors flex items-center gap-2 group"
                  target={item.external ? "_blank" : undefined}
                >
                  {item.icon && <item.icon className="h-4 w-4 group-hover:scale-125 group-hover:text-[var(--color-primary)] transition-transform duration-200" />}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Newsletter & Legal Section */}
          <div className="space-y-6">
            <div>
              <h4 className="mb-4 text-sm font-bold text-[var(--color-secondary-accent)]">
                Stay Updated
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-[var(--color-secondary-background)] border border-[var(--color-secondary-background)] rounded text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary-accent)] focus:border-[var(--color-primary-accent)] font-mono"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-3 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded text-sm font-medium hover:scale-105 hover:shadow-xl transition-transform flex items-center justify-center gap-2 animate-gradient-x"
                >
                  <Send className="h-3 w-3" />
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
                {subscribed && <p className="text-green-500 text-xs mt-1 text-center">Thank you for subscribing!</p>}
              </form>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold text-[var(--color-secondary-accent)]">
                Legal
              </h4>
              <ul className="space-y-2">
                {LEGAL_LINKS.map((item, idx) => (
                  <li key={"legal" + idx}>
                    <Link
                      href={item.href}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors flex items-center gap-2 text-sm group"
                    >
                      {item.icon && <item.icon className="h-3 w-3 group-hover:scale-125 group-hover:text-[var(--color-primary)] transition-transform duration-200" />}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} Nassim Portfolio. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--color-text-secondary)]">Built with</span>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <span>Next.js</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
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
      `}</style>
    </div>
  );
} 

// Add Logo component to resolve missing reference
const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-shrink-0 items-center justify-center space-x-2 py-2 text-center text-2xl font-bold selection:bg-emerald-500",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-secondary-background)] bg-[var(--color-primary-background)] text-sm antialiased md:h-6 md:w-6">
        <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-white/[0.2] blur-xl" />
        <div className="relative z-20 text-sm text-[var(--color-primary-accent)]">
          <img
            src="/logo.png"
            height="32"
            width="32"
            alt="Logo"
            className="block"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 font-sans text-xl text-[var(--color-text-primary)]">
        Nassim
        <div className="relative rounded-sm border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)] px-2 py-0.5 text-xs font-bold text-[var(--color-text-primary)]">
          dev
        </div>
      </div>
    </Link>
  );
}; 

type FooterLink = {
  title: string;
  href: string;
  icon?: any;
  external?: boolean;
  highlight?: boolean;
};

const TECHNICAL_LINKS: FooterLink[] = [
  {
    title: "GitHub",
    href: "https://github.com/nassim",
    icon: ExternalLink,
    external: true,
  },
  {
    title: "Stack Overflow",
    href: "https://stackoverflow.com/users/nassim",
    icon: ExternalLink,
    external: true,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/nassim",
    icon: ExternalLink,
    external: true,
  },
];

const BUSINESS_LINKS: FooterLink[] = [
  {
    title: "Contact",
    href: "mailto:nassim@example.com",
    icon: ExternalLink,
  },
  {
    title: "Book a Call",
    href: "#",
    icon: ExternalLink,
    highlight: true,
  },
  {
    title: "Services",
    href: "/services",
  },
];

const RESOURCES_LINKS: FooterLink[] = [
  {
    title: "Blog",
    href: "/blog",
    icon: ExternalLink,
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: ExternalLink,
  },
  {
    title: "Open Source",
    href: "https://github.com/nassim?tab=repositories",
    icon: ExternalLink,
    external: true,
  },
];

const LEGAL_LINKS: FooterLink[] = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    icon: ExternalLink,
  },
  {
    title: "Terms of Service",
    href: "/terms",
    icon: ExternalLink,
  },
]; 