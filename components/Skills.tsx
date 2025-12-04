'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Globe, Database, Layers, Palette, Zap } from 'lucide-react';

const skillCategories = [
    {
        title: 'Mobile Development',
        icon: Smartphone,
        color: 'from-accent-purple to-accent-pink',
        skills: [
            { name: 'React Native', level: 95 },
            { name: 'Flutter', level: 90 },
            { name: 'iOS/Android', level: 85 },
            { name: 'Expo', level: 90 },
        ],
    },
    {
        title: 'Web Development',
        icon: Globe,
        color: 'from-accent-cyan to-accent-purple',
        skills: [
            { name: 'React.js', level: 95 },
            { name: 'Next.js', level: 92 },
            { name: 'TypeScript', level: 90 },
            { name: 'JavaScript', level: 95 },
        ],
    },
    {
        title: 'Styling & UI',
        icon: Palette,
        color: 'from-accent-pink to-accent-orange',
        skills: [
            { name: 'Tailwind CSS', level: 95 },
            { name: 'CSS/SASS', level: 90 },
            { name: 'Material UI', level: 85 },
            { name: 'Framer Motion', level: 88 },
        ],
    },
    {
        title: 'Backend & APIs',
        icon: Database,
        color: 'from-accent-green to-accent-cyan',
        skills: [
            { name: 'Node.js', level: 85 },
            { name: 'REST APIs', level: 90 },
            { name: 'MySql', level: 80 },
            { name: 'Firebase', level: 88 },
        ],
    },
    {
        title: 'State Management',
        icon: Layers,
        color: 'from-accent-purple to-accent-cyan',
        skills: [
            { name: 'Redux', level: 92 },
            { name: 'Context API', level: 90 },
            { name: 'Zustand', level: 85 },
            { name: 'React Query', level: 87 },
        ],
    },
    {
        title: 'Tools & Others',
        icon: Zap,
        color: 'from-accent-orange to-accent-pink',
        skills: [
            { name: 'Git/GitHub', level: 95 },
            { name: 'Webpack/Vite', level: 85 },
            { name: 'Jest/Testing', level: 82 },
            { name: 'CI/CD', level: 80 },
        ],
    },
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" ref={ref} className="py-20 md:py-32 relative">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Skills & <span className="gradient-text">Expertise</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-6"></div>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            A comprehensive overview of my technical skills and proficiency levels
                            across various technologies and frameworks.
                        </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skillCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group"
                                whileHover={{ y: -10 }}
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                                        <category.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold">{category.title}</h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm font-medium text-accent-cyan">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                                    transition={{
                                                        duration: 1,
                                                        delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                                        ease: 'easeOut',
                                                    }}
                                                    className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gray-400">
                            Always learning and staying up-to-date with the latest technologies
                            and best practices in the industry.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
