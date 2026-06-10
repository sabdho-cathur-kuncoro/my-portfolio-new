# Portfolio Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "AI slop" visual style of the portfolio landing page (rainbow gradients, glassmorphism, floating blur blobs, fake skill percentages, emoji-as-UI) with a minimal editorial dark theme: near-monochrome + single emerald accent, Inter + JetBrains Mono, flat bordered surfaces, restrained motion.

**Architecture:** Add new design tokens (`surface`, `muted`, `accent` DEFAULT, `font-mono`) additively to `tailwind.config.js`/`app/globals.css`/`app/layout.tsx` — existing tokens/classes used by out-of-scope pages (`/admin`, `/login`, `/projects/[slug]`) are untouched. Then rewrite each landing-page component (`Navigation`, `Hero`, `About`, `Skills`, `Projects`, `Contact`, `WhatsAppFab`) to use the new tokens.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3.4, framer-motion, lucide-react, react-icons.

**Spec:** `docs/superpowers/specs/2026-06-11-portfolio-redesign-design.md`

---

### Task 1: Theme foundation (tokens + mono font)

**Files:**
- Modify: `tailwind.config.js` (full rewrite)
- Modify: `app/layout.tsx` (full rewrite)
- Modify: `app/globals.css` (full rewrite)

- [ ] **Step 1: Rewrite `tailwind.config.js`**

Add `surface`, `muted` colors and an `accent.DEFAULT` (emerald) alongside the existing `accent.{purple,pink,cyan,green,orange}`, plus a `mono` font family. Everything else (animations, keyframes, backgroundImage) stays exactly as-is for the out-of-scope pages.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: '#131316',
        muted: '#8a8a8f',
        accent: {
          DEFAULT: '#34d399',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#06b6d4',
          green: '#10b981',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'gradient-flow': 'gradient-flow 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(168, 85, 247, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px)' },
          '75%': { transform: 'translateY(-25px) translateX(5px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-cy ber': 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%)',
        'gradient-purple': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Rewrite `app/layout.tsx`**

Add `JetBrains_Mono` from `next/font/google`, expose it as `--font-mono`, and add it to the `<html>` className alongside `inter.variable`. Metadata block is unchanged from the current file.

```tsx
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
```

- [ ] **Step 3: Rewrite `app/globals.css`**

Add `--font-mono` fallback var, a new `.surface` component class, soften the body background gradient, restyle scrollbar/selection to monochrome+accent, and recolor `.html-content a` links. `.glass`, `.glass-dark`, `.gradient-text`, `.bg-gradient-cyber`, `animate-float`, `animate-gradient-flow` and their keyframes are kept verbatim for the out-of-scope pages.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #0a0a0f;
    --foreground: #f5f5f7;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter);
    line-height: 1.6;
    background-image: radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.04) 0px, transparent 50%);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #13131a;
  }

  ::-webkit-scrollbar-thumb {
    background: #8a8a8f;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #34d399;
  }

  ::selection {
    background-color: rgba(52, 211, 153, 0.3);
    color: #ffffff;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  p {
    line-height: 1.75;
  }
}

@layer components {

  /* Glassmorphism (used by /admin, /login, /projects/[slug]) */
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 8px 32px 0 rgba(0, 0, 0, 0.37),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  }

  .glass-dark {
    background: rgba(10, 10, 15, 0.6);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      0 8px 32px 0 rgba(0, 0, 0, 0.5),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.03);
  }

  /* Gradient Text (used by /admin, /login, /projects/[slug]) */
  .gradient-text {
    background: linear-gradient(135deg, #06b6d4 0%, #a855f7 40%, #ec4899 70%, #f97316 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% auto;
    animation: gradient-shift 8s ease infinite;
  }

  /* Gradient Background (used by /admin, /login, /projects/[slug]) */
  .bg-gradient-cyber {
    background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #ec4899 100%);
    background-size: 200% 200%;
  }

  /* Flat surface (no blur/shadow) - used by the redesigned landing page */
  .surface {
    @apply bg-surface border border-white/10;
  }
}

@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-gradient-flow {
    animation: gradient-flow 6s ease infinite;
  }

  /* HTML Content Styles */
  .html-content p {
    margin-bottom: 0.75em;
    line-height: 1.75;
  }

  .html-content p:last-child {
    margin-bottom: 0;
  }

  .html-content strong {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
  }

  .html-content em {
    font-style: italic;
  }

  .html-content u {
    text-decoration: underline;
  }

  .html-content h1,
  .html-content h2,
  .html-content h3 {
    font-weight: 700;
    margin-bottom: 0.5em;
    margin-top: 1em;
  }

  .html-content h1:first-child,
  .html-content h2:first-child,
  .html-content h3:first-child {
    margin-top: 0;
  }

  .html-content h1 {
    font-size: 1.5em;
  }

  .html-content h2 {
    font-size: 1.25em;
  }

  .html-content h3 {
    font-size: 1.1em;
  }

  .html-content ul,
  .html-content ol {
    padding-left: 1.5em;
    margin-bottom: 0.75em;
    list-style-position: outside;
  }

  .html-content ul {
    list-style-type: disc;
  }

  .html-content ol {
    list-style-type: decimal;
  }

  .html-content li {
    margin-bottom: 0.25em;
    line-height: 1.6;
    display: list-item;
  }

  .html-content a {
    color: #34d399;
    text-decoration: underline;
    transition: color 0.2s;
  }

  .html-content a:hover {
    color: #f2f2f0;
  }

  /* Line clamp support for HTML content */
  .line-clamp-3 .html-content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds with no type/lint errors. (This is the foundation — if the new tokens don't compile, nothing downstream will.)

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js app/layout.tsx app/globals.css
git commit -m "Add minimal-editorial design tokens (surface, muted, accent, mono font)"
```

---

### Task 2: Navigation

**Files:**
- Modify: `components/Navigation.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/Navigation.tsx`**

Plain mono-text logo (no icon/gradient), mono uppercase nav links, solid accent active-state underline, flat scrolled background.

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map(item => item.href.substring(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const section = document.querySelector(href);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background border-b border-white/10 py-4' : 'py-6'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
                        className="font-mono text-lg font-bold text-foreground"
                    >
                        sabdho.dev
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                                className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${activeSection === item.href.substring(1)
                                    ? 'text-accent'
                                    : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.href.substring(1) && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                                        initial={false}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 surface rounded-lg overflow-hidden"
                        >
                            <div className="flex flex-col py-2">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                                        className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${activeSection === item.href.substring(1)
                                            ? 'text-accent bg-white/5'
                                            : 'text-muted hover:bg-white/5'
                                            }`}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/Navigation.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navigation.tsx
git commit -m "Restyle Navigation with mono logo and flat accent underline"
```

---

### Task 3: Hero

**Files:**
- Modify: `components/Hero.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/Hero.tsx`**

Remove floating blur blobs and emoji badge, restyle heading/role/CTAs/socials to the new tokens, rewrite the description copy.

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

const roles = ['Front-End Developer', 'React Native Expert', 'Flutter Developer', 'Next.js Specialist'];

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scrollToNext = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="font-mono text-xs uppercase tracking-widest text-muted">
                            Available for work
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Hi, I'm{' '}
                        <span className="text-accent">Sabdho</span>
                    </motion.h1>

                    {/* Rotating Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-16 mb-8"
                        suppressHydrationWarning
                    >
                        {mounted ? (
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={currentRole}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="font-mono text-xl md:text-3xl text-accent"
                                >
                                    {roles[currentRole]}
                                </motion.h2>
                            </AnimatePresence>
                        ) : (
                            <h2 className="font-mono text-xl md:text-3xl text-accent">
                                {roles[0]}
                            </h2>
                        )}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto"
                    >
                        I build cross-platform apps and web products with React Native,
                        Flutter, and Next.js — from internal business systems to
                        client-facing apps, shipped end to end.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 border border-white/15 rounded-lg font-semibold text-lg hover:border-accent hover:text-accent transition-colors"
                        >
                            Get In Touch
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex gap-4 justify-center"
                    >
                        {[
                            { Icon: FaGithub, href: 'https://github.com/sabdho-cathur-kuncoro', label: 'GitHub' },
                            { Icon: FaLinkedin, href: 'https://linkedin.com/in/sabdho-kuncoro', label: 'LinkedIn' },
                            { Icon: Mail, href: 'mailto:sabdhocathurkuncoro@gmail.com', label: 'Email' },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 border border-white/10 rounded-lg hover:border-accent hover:text-accent transition-colors"
                                aria-label={label}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToNext}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-label="Scroll to next section"
            >
                <ArrowDown className="w-5 h-5 text-muted" />
            </motion.button>
        </section>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/Hero.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "Redesign Hero: remove blobs/emoji/gradients, rewrite copy"
```

---

### Task 4: About

**Files:**
- Modify: `components/About.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/About.tsx`**

Drop the stat-card grid and the duplicate "Core Technologies" pill list. Single-column eyebrow + heading + rewritten two-paragraph bio.

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            01 — About
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            About <span className="text-accent">Me</span>
                        </h2>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4 text-muted text-lg"
                    >
                        <p>
                            I&apos;m a front-end developer based in Jakarta, working across{' '}
                            <span className="text-foreground font-semibold">React Native</span>,{' '}
                            <span className="text-foreground font-semibold">Flutter</span>,{' '}
                            <span className="text-foreground font-semibold">React</span>, and{' '}
                            <span className="text-foreground font-semibold">Next.js</span>. Over
                            4+ years I&apos;ve built HR systems, ERP tools, and consumer apps —
                            covering UI architecture, API integration, and deployment.
                        </p>
                        <p>
                            I care about code that&apos;s easy to read a year later, interfaces
                            that don&apos;t make people think, and shipping things that actually
                            get used.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/About.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "Redesign About: drop stat cards/tech pills, rewrite bio"
```

---

### Task 5: Skills

**Files:**
- Modify: `components/Skills.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/Skills.tsx`**

Replace category cards + percentage bars with mono category headers and flat bordered skill pills. `icon`, `color`, and `level` fields are dropped from the data array entirely.

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
    {
        title: 'Mobile Development',
        skills: ['React Native', 'Flutter', 'iOS/Android', 'Expo'],
    },
    {
        title: 'Web Development',
        skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript'],
    },
    {
        title: 'Styling & UI',
        skills: ['Tailwind CSS', 'CSS/SASS', 'Material UI', 'Framer Motion'],
    },
    {
        title: 'Backend & APIs',
        skills: ['Node.js', 'REST APIs', 'MySQL', 'Firebase'],
    },
    {
        title: 'State Management',
        skills: ['Redux', 'Context API', 'Zustand', 'React Query'],
    },
    {
        title: 'Tools & Others',
        skills: ['Git/GitHub', 'Webpack/Vite', 'Jest/Testing', 'CI/CD'],
    },
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            02 — Skills
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Skills & <span className="text-accent">Expertise</span>
                        </h2>
                    </motion.div>

                    {/* Skills List */}
                    <div className="space-y-8">
                        {skillCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
                            >
                                <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-3">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 surface rounded-md text-sm text-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12"
                    >
                        <p className="text-muted">
                            Always learning and staying up-to-date with the latest technologies
                            and best practices in the industry.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/Skills.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "Redesign Skills: drop progress bars, use grouped tag lists"
```

---

### Task 6: Projects

**Files:**
- Modify: `components/Projects.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/Projects.tsx`**

Replace the emoji/gradient image header with a mono index number, drop emoji from duration/role/empty-state, restyle cards to flat `.surface`. `project.image` and `project.gradient` are no longer read (fields stay in the `Project` type/data for the out-of-scope detail page).

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HTMLContent from '@/components/HTMLContent';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    demo: string;
    gradient: string;

    // Enhanced fields
    status?: string;
    start_date?: string;
    end_date?: string;
    duration?: string;
    team_size?: number;
    role?: string;
    client?: string;
    features?: string[];
    technologies?: string[];
    challenges?: string;
    outcomes?: string;
    screenshots?: string[];
    is_featured?: boolean;
    display_order?: number;
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (Array.isArray(data)) {
                    const featuredProjects = data.filter(project => project.is_featured);
                    setProjects(featuredProjects);
                } else {
                    console.error('API response is not an array:', data);
                    setProjects([]);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            03 — Projects
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            A showcase of recent work demonstrating my skills in mobile and
                            web development.
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="surface rounded-lg overflow-hidden animate-pulse">
                                    <div className="h-24 border-b border-white/10"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-6 bg-white/5 rounded w-3/4"></div>
                                        <div className="h-4 bg-white/5 rounded w-full"></div>
                                        <div className="h-4 bg-white/5 rounded w-5/6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && projects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-muted mb-2">No featured projects yet</p>
                            <p className="text-sm text-muted">Mark projects as featured in the admin panel to display them here</p>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!isLoading && projects.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id || project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="surface rounded-lg overflow-hidden group hover:border-accent/40 transition-colors cursor-pointer"
                                    whileHover={{ y: -4 }}
                                    onClick={() => router.push(project.demo)}
                                >
                                    {/* Card Header */}
                                    <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                                        <span className="font-mono text-3xl text-accent/60">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {project.status && project.status !== 'completed' && (
                                            <span className="font-mono text-xs uppercase text-muted border border-white/10 rounded px-2 py-0.5 capitalize">
                                                {project.status.replace('-', ' ')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Duration & Role */}
                                        {(project.duration || project.role) && (
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 font-mono text-xs text-muted">
                                                {project.duration && <span>Duration: {project.duration}</span>}
                                                {project.duration && project.role && <span>·</span>}
                                                {project.role && <span>Role: {project.role}</span>}
                                            </div>
                                        )}

                                        <div className="text-muted text-sm mb-4 line-clamp-3">
                                            <HTMLContent content={project.description} />
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 border border-white/10 rounded-full text-xs text-muted"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-3 py-1 border border-white/10 rounded-full text-xs text-muted">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/Projects.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "Redesign Projects: index-number headers, drop emoji and gradients"
```

---

### Task 7: Contact

**Files:**
- Modify: `components/Contact.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/Contact.tsx`**

Flat `.surface` cards, accent icons (no per-item gradients), drop the blurred decoration blobs in the CTA panel, restyle footer name.

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'sabdhocathurkuncoro@gmail.com',
        href: 'mailto:sabdhocathurkuncoro@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+62 896 5346 3568',
        href: 'tel:+6289653463568',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Jakarta, Indonesia',
        href: '#',
    },
];

const socialLinks = [
    {
        icon: FaGithub,
        label: 'GitHub',
        href: 'https://github.com/sabdho-cathur-kuncoro',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/sabdho-kuncoro',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://www.instagram.com/sbdcknr/',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            04 — Contact
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            I&apos;m always open to new opportunities, collaborations, and
                            interesting projects. Feel free to reach out.
                        </p>
                    </motion.div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.label}
                                href={method.href}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="surface rounded-lg p-6 hover:border-accent/40 transition-colors group block"
                                whileHover={{ y: -4 }}
                            >
                                <div className="inline-flex p-3 border border-white/10 rounded-lg mb-4 text-accent">
                                    <method.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                                    {method.label}
                                </h3>
                                <p className="text-foreground font-medium group-hover:text-accent transition-colors">
                                    {method.value}
                                </p>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="surface rounded-lg p-12 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Let&apos;s Build Something <span className="text-accent">Amazing</span> Together
                        </h3>
                        <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
                            Whether you have a project in mind or just want to chat about
                            technology, I&apos;d love to hear from you.
                        </p>

                        {/* Email CTA */}
                        <a
                            href="mailto:sabdhocathurkuncoro@gmail.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors mb-8"
                        >
                            <Mail className="w-5 h-5" />
                            Send Me an Email
                        </a>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 border border-white/10 rounded-lg hover:border-accent hover:text-accent transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-20 text-center text-muted"
            >
                <div className="container mx-auto px-6">
                    <div className="border-t border-white/10 pt-8">
                        <p className="mb-2">
                            Designed & Built by <span className="text-accent font-semibold">Sabdho Cathur Kuncoro</span>
                        </p>
                        <p className="text-sm">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.footer>
        </section>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/Contact.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "Redesign Contact: flat surface cards, drop blob decorations"
```

---

### Task 8: WhatsApp FAB

**Files:**
- Modify: `components/WhatsAppFab.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/WhatsAppFab.tsx`**

Drop the infinite pulsing ring and gradient/glow shadow; flat WhatsApp-green circle with a `.surface` tooltip.

```tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab() {
    const phoneNumber = '6289653463568';
    const message = encodeURIComponent('Hi! I found your portfolio and would like to connect.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                <div className="bg-[#25D366] border border-white/10 rounded-full p-4">
                    <MessageCircle className="w-6 h-6 text-background" strokeWidth={2.5} />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="surface px-3 py-2 rounded-lg text-sm font-medium text-foreground">
                        Chat on WhatsApp
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
```

- [ ] **Step 2: Lint check**

Run: `npx eslint components/WhatsAppFab.tsx`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/WhatsAppFab.tsx
git commit -m "Restyle WhatsApp FAB: flat circle, drop pulsing ring"
```

---

### Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: build succeeds with no type errors or lint failures.

- [ ] **Step 2: Lint whole project**

Run: `npm run lint`
Expected: no new errors introduced (pre-existing warnings in out-of-scope files, if any, are unrelated).

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000`, and check:
- No emoji anywhere on the landing page (status badge, project cards, empty states).
- No purple/cyan/pink/orange gradients or glow/blur blobs on the landing page.
- Skills section shows plain tag pills, no percentage bars.
- Project cards show numbered headers (01, 02, ...), no emoji.
- `/admin`, `/login`, `/projects/[slug]` still render with their existing (unchanged) styling.

- [ ] **Step 4: Commit (if any fixes were needed)**

If steps 1–3 required fixes, stage and commit them:

```bash
git add -A
git commit -m "Fix issues found during redesign verification"
```

If no fixes were needed, skip this commit.
