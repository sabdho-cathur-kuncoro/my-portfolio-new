'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, Plus, TrendingUp, Eye, ArrowRight, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectStats {
    total: number;
    published: number;
    featured: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<ProjectStats>({ total: 0, published: 0, featured: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/projects');
            const projects = await res.json();
            if (Array.isArray(projects)) {
                setStats({
                    total: projects.length,
                    published: projects.filter(p => p.status === 'completed').length,
                    featured: projects.filter(p => p.is_featured).length,
                });
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statsDisplay = [
        { label: 'Total Projects', value: stats.total, icon: FolderKanban },
        { label: 'Completed', value: stats.published, icon: TrendingUp },
        { label: 'Featured', value: stats.featured, icon: Eye },
    ];

    const quickActions = [
        {
            icon: FolderKanban,
            label: 'Manage Projects',
            description: 'View, edit, or delete projects',
            href: '/admin/projects',
        },
        {
            icon: Plus,
            label: 'Add New Project',
            description: 'Create a new portfolio entry',
            href: '/admin/projects/new',
        },
        {
            icon: FileText,
            label: 'Manage Resume',
            description: 'Upload or replace your CV PDF',
            href: '/admin/cv',
        },
    ];

    return (
        <div className="max-w-4xl">
            {/* Page Header */}
            <div className="mb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                    Overview
                </p>
                <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                <p className="text-muted text-sm">Manage and monitor your portfolio content.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {statsDisplay.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className="surface rounded-xl p-5"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2">{stat.label}</p>
                                {isLoading ? (
                                    <div className="h-8 w-12 bg-white/5 rounded animate-pulse" />
                                ) : (
                                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                )}
                            </div>
                            <div className="p-2 bg-white/[0.04] rounded-lg mt-0.5">
                                <stat.icon className="w-4 h-4 text-accent" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-4">Quick Actions</p>
                <div className="space-y-2">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={action.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
                        >
                            <Link href={action.href}>
                                <div className="surface rounded-xl px-5 py-4 flex items-center gap-4 group hover:border-white/20 transition-all">
                                    <div className="p-2 bg-white/[0.04] rounded-lg group-hover:bg-accent/10 transition-colors">
                                        <action.icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-foreground">{action.label}</p>
                                        <p className="text-xs text-muted">{action.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
