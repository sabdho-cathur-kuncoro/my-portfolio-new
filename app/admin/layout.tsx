'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
    { icon: FileText, label: 'Resume / CV', href: '/admin/cv' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-3" />
                    <p className="font-mono text-xs text-muted uppercase tracking-widest">Loading</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-white/[0.06] z-50 flex items-center px-6 gap-4">
                {/* Mobile toggle */}
                <button
                    className="md:hidden text-muted hover:text-foreground transition-colors"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Logo */}
                <Link href="/admin/dashboard" className="font-mono text-sm font-bold tracking-tight flex items-center gap-2">
                    <span className="text-accent">admin</span>
                    <span className="text-muted">/</span>
                    <span className="text-foreground">sabdho.dev</span>
                </Link>

                <div className="flex-1" />

                {/* Right: user + logout */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-xs font-medium text-foreground">{user.email?.split('@')[0]}</span>
                        <span className="text-[11px] text-muted font-mono">{user.email}</span>
                    </div>
                    <button
                        onClick={logout}
                        title="Logout"
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-md text-xs text-muted hover:text-foreground hover:border-white/20 transition-all font-mono"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="flex pt-14">
                {/* Desktop Sidebar */}
                <aside className="fixed left-0 top-14 bottom-0 w-60 border-r border-white/[0.06] hidden md:flex flex-col">
                    <nav className="flex-1 p-4 space-y-0.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                                            isActive
                                                ? 'bg-white/[0.05] text-foreground border border-white/[0.08]'
                                                : 'text-muted hover:text-foreground hover:bg-white/[0.03]'
                                        }`}
                                    >
                                        <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'group-hover:text-accent transition-colors'}`} />
                                        <span className="font-mono text-xs tracking-wide">{item.label}</span>
                                        {isActive && (
                                            <ChevronRight className="w-3 h-3 text-accent ml-auto" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-white/[0.06]">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-3 py-2 text-xs text-muted hover:text-accent font-mono transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            View live site
                        </Link>
                    </div>
                </aside>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                            />
                            <motion.aside
                                initial={{ x: -260 }}
                                animate={{ x: 0 }}
                                exit={{ x: -260 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-white/[0.06] z-50 md:hidden flex flex-col"
                            >
                                <div className="h-14 flex items-center justify-between px-4 border-b border-white/[0.06]">
                                    <span className="font-mono text-sm font-bold">
                                        <span className="text-accent">admin</span>
                                        <span className="text-muted"> / </span>
                                        <span>sabdho.dev</span>
                                    </span>
                                    <button onClick={() => setMobileOpen(false)} className="text-muted hover:text-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <nav className="flex-1 p-4 space-y-0.5">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                                                <div
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                                                        isActive
                                                            ? 'bg-white/[0.05] text-foreground border border-white/[0.08]'
                                                            : 'text-muted hover:text-foreground hover:bg-white/[0.03]'
                                                    }`}
                                                >
                                                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : ''}`} />
                                                    <span className="font-mono text-xs tracking-wide">{item.label}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 md:ml-60 min-h-[calc(100vh-3.5rem)] p-6 md:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
