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
