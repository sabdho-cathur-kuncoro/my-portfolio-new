'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, Plus, TrendingUp, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectStats {
    total: number;
    published: number;
    featured: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<ProjectStats>({
        total: 0,
        published: 0,
        featured: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/projects');
            const projects = await res.json();

            if (Array.isArray(projects)) {
                const total = projects.length;
                const published = projects.filter(p => p.status === 'completed').length;
                const featured = projects.filter(p => p.is_featured).length;

                setStats({ total, published, featured });
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statsDisplay = [
        { label: 'Total Projects', value: stats.total, icon: FolderKanban, color: 'accent-purple' },
        { label: 'Published', value: stats.published, icon: TrendingUp, color: 'accent-cyan' },
        { label: 'Featured', value: stats.featured, icon: Eye, color: 'accent-pink' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back! 👋
                </h1>
                <p className="text-gray-400">Manage your portfolio projects from here</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {statsDisplay.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                {isLoading ? (
                                    <div className="h-10 w-16 bg-white/5 rounded animate-pulse"></div>
                                ) : (
                                    <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                                )}
                            </div>
                            <div className={`p-4 rounded-xl bg-${stat.color}/10`}>
                                <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/admin/projects">
                        <motion.div
                            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-cyan/10 rounded-lg">
                                    <FolderKanban className="w-5 h-5 text-accent-cyan" />
                                </div>
                                <div>
                                    <p className="font-semibold">Manage Projects</p>
                                    <p className="text-sm text-gray-400">View, edit, or delete projects</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/projects/new">
                        <motion.div
                            className="p-4 glass rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent-purple/10 rounded-lg">
                                    <Plus className="w-5 h-5 text-accent-purple" />
                                </div>
                                <div>
                                    <p className="font-semibold">Add New Project</p>
                                    <p className="text-sm text-gray-400">Create a new portfolio project</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
