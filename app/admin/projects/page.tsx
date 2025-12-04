'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';

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

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
                setDeleteModal(null);
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-gray-400">Loading projects...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Projects</h1>
                    <p className="text-gray-400">Manage your portfolio projects</p>
                </div>
                <Link href="/admin/projects/new">
                    <motion.button
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent-purple/50 transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus className="w-5 h-5" />
                        New Project
                    </motion.button>
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass rounded-2xl overflow-hidden"
                    >
                        {/* Project Preview */}
                        <div className={`relative h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                            <span className="text-6xl">{project.image}</span>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-white/5 rounded-full text-xs text-accent-cyan"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link href={`/admin/projects/${project.id}`} className="flex-1">
                                    <motion.button
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </motion.button>
                                </Link>
                                <motion.button
                                    onClick={() => setDeleteModal(project.id)}
                                    className="px-4 py-2 glass rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                                <Link href={project.demo} target="_blank">
                                    <motion.button
                                        className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-6xl mb-4">📂</p>
                    <p className="text-xl text-gray-400 mb-4">No projects yet</p>
                    <Link href="/admin/projects/new">
                        <motion.button
                            className="px-6 py-3 bg-gradient-cyber text-white rounded-lg font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create Your First Project
                        </motion.button>
                    </Link>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-2xl p-8 max-w-md w-full"
                    >
                        <h3 className="text-2xl font-bold mb-4">Delete Project?</h3>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 px-4 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteModal)}
                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
