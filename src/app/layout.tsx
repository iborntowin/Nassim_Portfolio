import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  CORE_KEYWORDS,
  GITHUB_URL,
  LINKEDIN_URL,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

const OTHER_META: Record<string, string> = {
  "profile:first_name": "Nassim",
  "profile:last_name": "Maaoui",
  "profile:username": "nassimmaaoui",
};

if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
  OTHER_META["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: CORE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: `${SITE_NAME} — Portfolio`,
  generator: "Next.js",
  category: "technology",
  referrer: "origin-when-cross-origin",
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon.ico" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    firstName: "Nassim",
    lastName: "Maaoui",
    username: "nassimmaaoui",
    images: [
      {
        url: OG_IMAGE,
        type: "image/jpeg",
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
    images: [{ url: OG_IMAGE, alt: "Nassim Maaoui — Cloud & Infrastructure Engineer" }],
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
  other: OTHER_META,
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
      <head>
        {/* Identity signals: confirm the profiles that belong to this person. */}
        <link rel="me" href={GITHUB_URL} />
        <link rel="me" href={LINKEDIN_URL} />
        <link rel="author" href={SITE_URL} />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="Machine-readable site summary"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <main id="main" className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
