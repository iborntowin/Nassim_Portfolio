import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Nassim Maaoui - Cloud Engineer & DevOps Architect',
    template: '%s | Nassim Maaoui Portfolio'
  },
  description: 'Cloud Engineer & DevOps Architect specializing in AWS, OpenStack, Kubernetes, Terraform, and CI/CD automation. Building production-grade infrastructure at scale with 99.99% uptime.',
  keywords: [
    'Nassim Maaoui',
    'Cloud Engineer',
    'DevOps Architect',
    'AWS',
    'OpenStack',
    'Kubernetes',
    'Terraform',
    'Docker',
    'CI/CD',
    'Infrastructure as Code',
    'Cloud Architecture',
    'Full-Stack Developer',
    'SRE',
    'Site Reliability Engineering',
    'Prometheus',
    'Grafana',
    'Ansible',
    'Linux',
    'Private Cloud',
    'Container Orchestration',
    'Python',
    'TypeScript',
    'DevOps',
    'GitOps'
  ],
  authors: [{ name: 'Nassim Maaoui' }],
  creator: 'Nassim Maaoui',
  publisher: 'Nassim Maaoui',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nassimmaaoui.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nassimmaaoui.dev',
    title: 'Nassim Maaoui - Cloud Engineer & DevOps Architect',
    description: 'Cloud Engineer & DevOps Architect building production-grade infrastructure with AWS, OpenStack, Kubernetes, and Terraform. 99.99% uptime, zero-downtime deployments.',
    siteName: 'Nassim Maaoui Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nassim Maaoui - Full-Stack Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nassim Maaoui - Cloud Engineer & DevOps Architect',
    description: 'Cloud Engineer building production-grade infrastructure with AWS, OpenStack, Kubernetes, and Terraform. 99.99% uptime, IaC-first, zero-trust security.',
    creator: '@nassimmaaoui',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
