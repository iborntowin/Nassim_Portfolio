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
    default: 'Nassim Maaoui - Full-Stack Developer & AI Engineer',
    template: '%s | Nassim Maaoui Portfolio'
  },
  description: 'Experienced Full-Stack Developer and AI Engineer specializing in modern web technologies, machine learning, embedded systems, and productivity tools. Explore my portfolio of innovative projects.',
  keywords: [
    'Nassim Maaoui',
    'Full-Stack Developer',
    'AI Engineer',
    'Machine Learning',
    'Software Engineer',
    'React',
    'Next.js',
    'Python',
    'TensorFlow',
    'Spring Boot',
    'Svelte',
    'Embedded Systems',
    'Portfolio',
    'Web Development',
    'Computer Vision',
    'Deep Learning',
    'JavaScript',
    'TypeScript',
    'C++',
    'Java',
    'PostgreSQL',
    'DevOps'
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
    title: 'Nassim Maaoui - Full-Stack Developer & AI Engineer',
    description: 'Experienced Full-Stack Developer and AI Engineer specializing in modern web technologies, machine learning, embedded systems, and productivity tools.',
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
    title: 'Nassim Maaoui - Full-Stack Developer & AI Engineer',
    description: 'Experienced Full-Stack Developer and AI Engineer specializing in modern web technologies, machine learning, embedded systems, and productivity tools.',
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
