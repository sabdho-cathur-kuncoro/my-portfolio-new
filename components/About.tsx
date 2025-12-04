'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Smartphone, Rocket, Users } from 'lucide-react';

const stats = [
    { icon: Code2, label: 'Years Experience', value: '4+' },
    { icon: Rocket, label: 'Milestones Achieved', value: '8+' },
    { icon: Users, label: 'Happy Clients', value: '10+' },
    { icon: Smartphone, label: 'Apps Published', value: '15+' },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="py-20 md:py-32 relative">
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
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-cyber mx-auto"></div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                Passionate Developer Creating Amazing Digital Experiences
                            </h3>
                            <div className="space-y-4 text-gray-300 text-lg">
                                <p>
                                    I'm a dedicated front-end developer with expertise in building modern,
                                    scalable mobile and web applications. My journey in development started
                                    over 4 years ago, and I've been passionate about creating intuitive user
                                    interfaces ever since.
                                </p>
                                <p>
                                    Specializing in <span className="text-accent-cyan font-semibold">React Native</span>,{' '}
                                    <span className="text-accent-purple font-semibold">Flutter</span>,{' '}
                                    <span className="text-accent-pink font-semibold">React.js</span>, and{' '}
                                    <span className="text-accent-green font-semibold">Next.js</span>, I bring ideas
                                    to life with clean code and beautiful designs.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me exploring new technologies or sharing knowledge with the developer community.
                                </p>
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-all group"
                                    whileHover={{ y: -5 }}
                                >
                                    <stat.icon className="w-10 h-10 mx-auto mb-4 text-accent-purple group-hover:text-accent-cyan transition-colors" />
                                    <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Skills Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="glass rounded-2xl p-8 text-center"
                    >
                        <h4 className="text-xl font-semibold mb-4">Core Technologies</h4>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['React Native', 'Flutter', 'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Firebase'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
