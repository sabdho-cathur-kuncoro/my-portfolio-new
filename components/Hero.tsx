'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
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
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-accent-cyan">
                            👋 Welcome to my portfolio
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
                        <span className="gradient-text">Sabdho</span>
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
                                    className="text-2xl md:text-4xl font-semibold text-accent-purple"
                                >
                                    {roles[currentRole]}
                                </motion.h2>
                            </AnimatePresence>
                        ) : (
                            <h2 className="text-2xl md:text-4xl font-semibold text-accent-purple">
                                {roles[0]}
                            </h2>
                        )}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                    >
                        Crafting beautiful, responsive, and performant mobile and web applications
                        with modern technologies. Passionate about creating seamless user experiences.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-gradient-cyber text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-accent-purple/50 transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View My Work
                        </motion.a>
                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 glass rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex gap-6 justify-center"
                    >
                        {[
                            { Icon: FaGithub, href: 'https://github.com/sabdho-cathur-kuncoro', label: 'GitHub' },
                            { Icon: FaLinkedin, href: 'https://linkedin.com/in/sabdho-kuncoro', label: 'LinkedIn' },
                            { Icon: Mail, href: 'mailto:sabdhocathurkuncoro@gmail.com', label: 'Email' },
                        ].map(({ Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                                whileHover={{ y: -5 }}
                                aria-label={label}
                            >
                                <Icon className="w-6 h-6" />
                            </motion.a>
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
                <ArrowDown className="w-5 h-5 text-accent-cyan" />
            </motion.button>
        </section>
    );
}
