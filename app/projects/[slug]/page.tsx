'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, Tag, Users, Clock, Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HTMLContent from '@/components/HTMLContent';

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    imageAlt: string;
    onClose: () => void;
}

function ImageModal({ isOpen, imageUrl, imageAlt, onClose }: ImageModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-foreground hover:text-accent transition-colors z-10 border border-white/10 bg-black/50 px-4 py-2 rounded-lg"
            >
                <span className="text-sm">Press ESC or click outside to close</span>
            </button>
            <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}

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

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalImage, setModalImage] = useState<{ url: string; alt: string } | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();

                if (Array.isArray(data)) {
                    // Find project by matching demo URL slug
                    const foundProject = data.find((p: Project) =>
                        p.demo.includes(slug) || p.id === slug
                    );

                    if (foundProject) {
                        setProject(foundProject);
                    } else {
                        setError('Project not found');
                    }
                } else {
                    setError('Failed to load projects');
                }
            } catch (err) {
                console.error('Failed to fetch project:', err);
                setError('Failed to load project');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setModalImage(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-6 pt-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse space-y-8">
                            <div className="h-8 bg-white/5 rounded w-1/4"></div>
                            <div className="h-16 bg-white/5 rounded w-3/4"></div>
                            <div className="h-96 bg-white/5 rounded"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !project) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto px-6 pt-24">
                    <Link href="/#projects">
                        <motion.button
                            className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
                            whileHover={{ x: -5 }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Portfolio
                        </motion.button>
                    </Link>
                    <div className="max-w-4xl mx-auto text-center py-20">
                        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                        <p className="text-muted mb-8">{error || 'The project you’re looking for doesn’t exist.'}</p>
                        <Link href="/#projects">
                            <button className="px-6 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                                View All Projects
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            {/* Image Modal */}
            {modalImage && (
                <ImageModal
                    isOpen={!!modalImage}
                    imageUrl={modalImage.url}
                    imageAlt={modalImage.alt}
                    onClose={() => setModalImage(null)}
                />
            )}

            <main className="min-h-screen bg-background">
                {/* Back Button */}
                <div className="container mx-auto px-6 pt-24">
                    <Link href="/#projects">
                        <motion.button
                            className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
                            whileHover={{ x: -5 }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Portfolio
                        </motion.button>
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="container mx-auto px-6 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        {/* Status Badge */}
                        {project.status && (
                            <div className="inline-block px-4 py-2 border border-white/10 rounded-full font-mono text-xs uppercase tracking-widest text-accent mb-6">
                                {project.status.replace('-', ' ')}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            {project.title}
                        </h1>
                        <div className="text-xl text-muted mb-8">
                            <HTMLContent content={project.description} />
                        </div>

                        {/* Project Meta */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
                            {project.duration && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {project.duration}
                                </div>
                            )}
                            {project.role && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    {project.role}
                                </div>
                            )}
                            {project.team_size && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {project.team_size} {project.team_size === 1 ? 'Person' : 'People'}
                                </div>
                            )}
                            {project.client && (
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {project.client}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mb-20"
                    >
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg hover:border-accent hover:text-accent transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                View Code
                            </a>
                        )}
                    </motion.div>
                </section>

                {/* Project Overview */}
                {(project.challenges || project.outcomes) && (
                    <section className="container mx-auto px-6 py-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Project <span className="text-accent">Overview</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {project.challenges && (
                                    <div className="surface rounded-lg p-6">
                                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                                            Challenges &amp; Solutions
                                        </h3>
                                        <div className="text-muted">
                                            <HTMLContent content={project.challenges} />
                                        </div>
                                    </div>
                                )}
                                {project.outcomes && (
                                    <div className="surface rounded-lg p-6">
                                        <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                                            Outcomes &amp; Results
                                        </h3>
                                        <div className="text-muted">
                                            <HTMLContent content={project.outcomes} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Technologies Used */}
                {project.technologies && project.technologies.length > 0 && (
                    <section className="container mx-auto px-6 py-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Technologies <span className="text-accent">Used</span>
                            </h2>
                            <div className="flex flex-wrap justify-center gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 surface rounded-md text-sm text-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                    <section className="container mx-auto px-6 py-20">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Key <span className="text-accent">Features</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {project.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="surface rounded-lg p-6 hover:border-accent/40 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                                            <p className="text-muted">{feature}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Screenshots Gallery */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <section className="container mx-auto px-6 py-20">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Project <span className="text-accent">Gallery</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                                {project.screenshots.map((screenshot, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="surface rounded-lg p-2 cursor-pointer group hover:border-accent/40 transition-colors"
                                        onClick={() => setModalImage({ url: screenshot, alt: `${project.title} - Screenshot ${index + 1}` })}
                                    >
                                        <div className="aspect-video bg-white/5 rounded-md overflow-hidden relative">
                                            <img
                                                src={screenshot}
                                                alt={`${project.title} - Screenshot ${index + 1}`}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><p class="text-muted">Image unavailable</p></div>`;
                                                    }
                                                }}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <p className="text-foreground text-sm font-medium">Click to view full size</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <section className="container mx-auto px-6 py-20">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Tech <span className="text-accent">Stack</span>
                            </h2>
                            <div className="flex flex-wrap justify-center gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 surface rounded-md text-sm text-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-20">
                    <div className="max-w-3xl mx-auto text-center surface rounded-lg p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Interested in <span className="text-accent">Working Together?</span>
                        </h2>
                        <p className="text-muted mb-8">
                            I&apos;d love to discuss your next project or opportunity.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex px-8 py-4 bg-accent text-background rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
