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
                        Hi, I&apos;m{' '}
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
