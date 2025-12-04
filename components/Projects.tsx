'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
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
                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    // Filter to show only featured projects on homepage
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
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-cyber mx-auto mb-6"></div>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            A showcase of my recent work and side projects demonstrating my skills
                            in mobile and web development.
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                    <div className="h-48 bg-white/5"></div>
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
                            <p className="text-6xl mb-4">📂</p>
                            <p className="text-xl text-gray-400 mb-2">No featured projects yet</p>
                            <p className="text-sm text-gray-500">Mark projects as featured in the admin panel to display them here</p>
                        </div>
                    )}

                    {/* Projects Grid - 3 Column Layout */}
                    {!isLoading && projects.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id || project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="glass rounded-2xl overflow-hidden group hover:bg-white/10 transition-all cursor-pointer"
                                    whileHover={{ y: -10 }}
                                    onClick={() => router.push(project.demo)}
                                >
                                    {/* Project Image/Icon */}
                                    <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                                        <motion.div
                                            className="text-8xl"
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {project.image}
                                        </motion.div>

                                        {/* Status Badge */}
                                        {project.status && project.status !== 'completed' && (
                                            <div className="absolute top-3 right-3">
                                                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
                                                    {project.status.replace('-', ' ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Duration & Role */}
                                        {(project.duration || project.role) && (
                                            <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-400">
                                                {project.duration && (
                                                    <span className="flex items-center gap-1">
                                                        ⏱️ {project.duration}
                                                    </span>
                                                )}
                                                {project.role && (
                                                    <span className="flex items-center gap-1">
                                                        👤 {project.role}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <div className="text-gray-400 text-sm mb-4 line-clamp-3">
                                            <HTMLContent content={project.description} />
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-accent-cyan"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* View More */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-5 h-5" />
                            View More on GitHub
                        </motion.a>
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
}
