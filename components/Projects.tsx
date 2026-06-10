'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
                if (Array.isArray(data)) {
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
                        className="mb-12"
                    >
                        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
                            03 — Projects
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            A showcase of recent work demonstrating my skills in mobile and
                            web development.
                        </p>
                    </motion.div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="surface rounded-lg overflow-hidden animate-pulse">
                                    <div className="h-24 border-b border-white/10"></div>
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
                            <p className="text-xl text-muted mb-2">No featured projects yet</p>
                            <p className="text-sm text-muted">Mark projects as featured in the admin panel to display them here</p>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!isLoading && projects.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id || project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="surface rounded-lg overflow-hidden group hover:border-accent/40 transition-colors cursor-pointer"
                                    whileHover={{ y: -4 }}
                                    onClick={() => router.push(project.demo)}
                                >
                                    {/* Card Header */}
                                    <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                                        <span className="font-mono text-3xl text-accent/60">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {project.status && project.status !== 'completed' && (
                                            <span className="font-mono text-xs uppercase text-muted border border-white/10 rounded px-2 py-0.5 capitalize">
                                                {project.status.replace('-', ' ')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Duration & Role */}
                                        {(project.duration || project.role) && (
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 font-mono text-xs text-muted">
                                                {project.duration && <span>Duration: {project.duration}</span>}
                                                {project.duration && project.role && <span>·</span>}
                                                {project.role && <span>Role: {project.role}</span>}
                                            </div>
                                        )}

                                        <div className="text-muted text-sm mb-4 line-clamp-3">
                                            <HTMLContent content={project.description} />
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 border border-white/10 rounded-full text-xs text-muted"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-3 py-1 border border-white/10 rounded-full text-xs text-muted">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
