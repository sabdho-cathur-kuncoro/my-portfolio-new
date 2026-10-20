'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, FolderKanban, Star, AlertTriangle } from 'lucide-react';
import ProjectIcon from '@/components/ProjectIcon';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    demo: string;
    gradient: string;
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

const STATUS_STYLES: Record<string, string> = {
    completed: 'text-accent border-accent/30 bg-accent/5',
    'in-progress': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
    planned: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
    archived: 'text-muted border-white/10 bg-white/[0.02]',
};

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => { fetchProjects(); }, []);

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
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
                setDeleteModal(null);
            }
        } catch (error) {
            console.error('Failed to delete project:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-5xl">
                <div className="mb-10">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Content</p>
                    <div className="h-8 w-36 bg-white/5 rounded animate-pulse mb-2" />
                    <div className="h-4 w-56 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="surface rounded-xl h-20 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-10">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Content</p>
                    <h1 className="text-3xl font-bold mb-1">Projects</h1>
                    <p className="text-muted text-sm">
                        {projects.length} {projects.length === 1 ? 'project' : 'projects'} in your portfolio
                    </p>
                </div>
                <Link href="/admin/projects/new">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shrink-0 mt-1">
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </Link>
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
                <div className="surface rounded-xl py-20 text-center">
                    <FolderKanban className="w-10 h-10 text-muted mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-1">No projects yet</p>
                    <p className="text-muted text-sm mb-6">Add your first project to get started.</p>
                    <Link href="/admin/projects/new">
                        <button className="px-4 py-2 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
                            Create First Project
                        </button>
                    </Link>
                </div>
            )}

            {/* Projects List */}
            <div className="space-y-2">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="surface rounded-xl px-5 py-4 flex items-center gap-4 group hover:border-white/20 transition-all"
                    >
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
                            <ProjectIcon name={project.image} className="w-5 h-5 text-white" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="font-semibold text-sm text-foreground truncate">{project.title}</p>
                                {project.is_featured && (
                                    <Star className="w-3 h-3 text-yellow-400 shrink-0" fill="currentColor" />
                                )}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                {project.status && (
                                    <span className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${STATUS_STYLES[project.status] || STATUS_STYLES.completed}`}>
                                        {project.status}
                                    </span>
                                )}
                                <div className="flex gap-1.5 flex-wrap">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[11px] text-muted font-mono">{tag}</span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="text-[11px] text-muted font-mono">+{project.tags.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Link href={project.demo} target="_blank">
                                <button className="p-2 text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-all" title="View live">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </Link>
                            <Link href={`/admin/projects/${project.id}`}>
                                <button className="p-2 text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-all" title="Edit">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </Link>
                            <button
                                onClick={() => setDeleteModal(project.id)}
                                className="p-2 text-muted hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="surface rounded-xl p-8 max-w-sm w-full"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold">Delete Project?</h3>
                            </div>
                            <p className="text-muted text-sm mb-6 leading-relaxed">
                                This action cannot be undone. The project will be permanently removed from your portfolio.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModal(null)}
                                    className="flex-1 px-4 py-2.5 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteModal)}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
