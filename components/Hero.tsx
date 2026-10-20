'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Hero() {
    const scrollToNext = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Ambient Background Spotlight */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/[0.07] rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 border border-white/10 rounded-full"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest text-muted">
                            Available for work
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        Hi, I&apos;m{' '}
                        <span className="text-accent">Sabdho</span>
                    </motion.h1>

                    {/* Role Statement */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-mono text-2xl md:text-3xl text-accent font-medium mb-6"
                    >
                        Front-End &amp; Mobile Engineer
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Building cross-platform mobile apps and web products with React Native,
                        Flutter, and Next.js, focused on clean architecture, performance, and real-world usability.
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
                            href="/api/cv?download=1"
                            className="px-8 py-4 border border-white/15 rounded-lg font-semibold text-lg hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Download Resume
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
