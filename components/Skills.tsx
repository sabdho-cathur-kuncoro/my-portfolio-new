'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Globe, Palette, Server, Layers, Wrench, LucideIcon } from 'lucide-react';

interface SkillCategory {
    title: string;
    icon: LucideIcon;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        title: 'Mobile Development',
        icon: Smartphone,
        skills: ['React Native', 'Flutter', 'iOS/Android', 'Expo'],
    },
    {
        title: 'Web Development',
        icon: Globe,
        skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript'],
    },
    {
        title: 'Styling & UI',
        icon: Palette,
        skills: ['Tailwind CSS', 'CSS/SASS', 'Material UI', 'Framer Motion'],
    },
    {
        title: 'Backend & APIs',
        icon: Server,
        skills: ['Node.js', 'REST APIs', 'MySQL', 'Firebase'],
    },
    {
        title: 'State Management',
        icon: Layers,
        skills: ['Redux', 'Context API', 'Zustand', 'React Query'],
    },
    {
        title: 'Tools & Others',
        icon: Wrench,
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
                            02 / Skills
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            Skills & <span className="text-accent">Expertise</span>
                        </h2>
                    </motion.div>

                    {/* Skills List */}
                    <div className="space-y-8">
                        {skillCategories.map((category, categoryIndex) => {
                            const CategoryIcon = category.icon;
                            return (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: categoryIndex * 0.05 }}
                                >
                                    <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
                                        <CategoryIcon className="w-3.5 h-3.5 text-accent" />
                                        <span>{category.title}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 surface rounded-md text-sm text-foreground hover:border-accent/40 hover:text-accent hover:bg-white/[0.04] transition-all cursor-default select-none"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Tooling Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-muted"
                    >
                        <p>
                            <span className="text-foreground font-medium">Daily Drivers:</span> React Native, TypeScript, Next.js, and Tailwind CSS.
                        </p>
                        <p>
                            Focus on architecture, performance, and type safety.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
