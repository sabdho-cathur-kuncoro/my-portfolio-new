import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabdho Cathur Kuncoro - Front-End Developer | React Native, Flutter, React.js, Next.js",
  description: "Front-end developer specializing in React Native, Flutter, React.js, and Next.js. Creating beautiful, responsive, and performant mobile and web applications.",
  keywords: [
    "Front-End Developer",
    "React Native Developer",
    "Flutter Developer",
    "React.js Developer",
    "Next.js Developer",
    "Mobile App Development",
    "Web Development",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Android",
    "iOS",
    "Flutter",
    "React Native",
    "React.js",
    "Next.js",
  ],
  authors: [{ name: "Sabdho Cathur Kuncoro" }],
  creator: "Sabdho Cathur Kuncoro",
  publisher: "Sabdho Cathur Kuncoro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sabdho.dev",
    siteName: "Sabdho Cathur Kuncoro - Portfolio",
    title: "Sabdho Cathur Kuncoro - Front-End Developer",
    description: "Front-end developer specializing in React Native, Flutter, React.js, and Next.js",
    images: [
      {
        url: "https://sabdho.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sabdho Cathur Kuncoro - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabdho Cathur Kuncoro - Front-End Developer",
    description: "Front-end developer specializing in React Native, Flutter, React.js, and Next.js",
    creator: "@sabdho",
    images: ["https://sabdho.dev/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sabdho.dev" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
