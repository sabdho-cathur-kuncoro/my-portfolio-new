'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Redirecting...
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
        { icon: Settings, label: 'Settings', href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 h-16 glass-dark border-b border-white/5 z-50">
                <div className="h-full px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center text-xl">
                            🎨
                        </div>
                        <h1 className="text-xl font-bold">
                            Admin <span className="gradient-text">Portal</span>
                        </h1>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium">{user.email?.split('@')[0]}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 text-accent-pink" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside className="fixed left-0 top-16 bottom-0 w-64 glass-dark border-r border-white/5 p-6 hidden md:block">
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                    whileHover={{ x: 5 }}
                                >
                                    <item.icon className="w-5 h-5 text-accent-cyan" />
                                    <span className="font-medium">{item.label}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
