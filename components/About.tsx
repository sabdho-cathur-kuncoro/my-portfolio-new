'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [localTime, setLocalTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeStr = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).format(now);
            setLocalTime(`${timeStr} WIB`);
        };

        updateTime();
        const timer = setInterval(updateTime, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            01 / About
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            About <span className="text-accent">Me</span>
                        </h2>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                        {/* Bio Paragraphs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-3 space-y-5 text-muted text-lg leading-relaxed"
                        >
                            <p>
                                I&apos;m a front-end developer based in Jakarta, working across{' '}
                                <span className="text-foreground font-semibold">React Native</span>,{' '}
                                <span className="text-foreground font-semibold">Flutter</span>,{' '}
                                <span className="text-foreground font-semibold">React</span>, and{' '}
                                <span className="text-foreground font-semibold">Next.js</span>. Over
                                5+ years I&apos;ve built HR systems, ERP tools, and consumer apps,
                                covering UI architecture, API integration, and deployment.
                            </p>
                            <p>
                                I care about code that&apos;s easy to read a year later, interfaces
                                that don&apos;t make people think, and shipping things that actually
                                get used.
                            </p>
                        </motion.div>

                        {/* Quick Highlights Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="md:col-span-2 surface rounded-lg p-6 space-y-4"
                        >
                            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                                Snapshot
                            </h3>
                            <div className="space-y-3 font-mono text-xs">
                                <div>
                                    <span className="text-muted block mb-0.5">Experience</span>
                                    <span className="text-foreground font-medium text-sm">5+ Years Front-End</span>
                                </div>
                                <div className="border-t border-white/5 pt-2">
                                    <span className="text-muted block mb-0.5">Location &amp; Local Time</span>
                                    <span className="text-foreground font-medium text-sm flex items-center justify-between gap-2">
                                        <span>Jakarta, ID (UTC+7)</span>
                                        {localTime && (
                                            <span className="text-accent text-xs font-mono">{localTime}</span>
                                        )}
                                    </span>
                                </div>
                                <div className="border-t border-white/5 pt-2">
                                    <span className="text-muted block mb-0.5">Core Stack</span>
                                    <span className="text-foreground font-medium text-sm">React Native · Flutter · Next.js</span>
                                </div>
                                <div className="border-t border-white/5 pt-2">
                                    <span className="text-muted block mb-0.5">Availability</span>
                                    <span className="text-accent font-medium text-sm">Open to Projects &amp; Roles</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
