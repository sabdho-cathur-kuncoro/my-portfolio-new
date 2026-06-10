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
