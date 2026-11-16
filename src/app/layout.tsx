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

const SITE_URL = "https://nassimmaaoui.vercel.app";
const TITLE = "Nassim Maaoui — Cloud & Infrastructure Engineer";
const DESCRIPTION =
  "Cloud and infrastructure engineering student at ESPRIT, graduating June 2027. OpenStack, Kubernetes, Ansible, Terraform, Prometheus and Linux — with an internal monitoring platform shipped at Huawei Technologies and used across 23 radio sites.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Nassim Maaoui",
  },
  description: DESCRIPTION,
  keywords: [
    "Nassim Maaoui",
    "Cloud Engineer",
    "Infrastructure Engineer",
    "DevOps Engineer",
    "OpenStack",
    "Kubernetes",
    "Ansible",
    "Terraform",
    "Prometheus",
    "Grafana",
    "Linux",
    "Infrastructure as Code",
    "Private Cloud",
    "Site Reliability Engineering",
    "Internship",
    "ESPRIT",
    "Tunisia",
  ],
  authors: [{ name: "Nassim Maaoui", url: SITE_URL }],
  creator: "Nassim Maaoui",
  publisher: "Nassim Maaoui",
  applicationName: "Nassim Maaoui — Portfolio",
  category: "technology",
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Nassim Maaoui",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nassim Maaoui — Cloud & Infrastructure Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
