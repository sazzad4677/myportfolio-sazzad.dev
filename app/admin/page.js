'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, User, Code2, Briefcase, FileText, Mail, Image, Settings, Globe } from 'lucide-react';
import HeroEditor from '@/components/admin/HeroEditor';
import AboutEditor from '@/components/admin/AboutEditor';
import SkillsManager from '@/components/admin/SkillsManager';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ExperienceManager from '@/components/admin/ExperienceManager';
import ContactEditor from '@/components/admin/ContactEditor';
import DashboardOverview from '@/components/admin/DashboardOverview';
import SettingsManager from '@/components/admin/SettingsManager';
import MediaManager from '@/components/admin/MediaManager';
import SeoManager from '@/components/admin/SeoManager';
import Login from '@/components/admin/Login';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        // Check for existing session
        const session = localStorage.getItem('admin_session');
        if (session === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = () => {
        localStorage.setItem('admin_session', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        setIsAuthenticated(false);
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'hero', label: 'Hero Section', icon: <LayoutDashboard size={18} /> }, // Using LayoutDashboard as placeholder if needed, or specific icon
        { id: 'about', label: 'About', icon: <User size={18} /> },
        { id: 'skills', label: 'Skills', icon: <Code2 size={18} /> },
        { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
        { id: 'experience', label: 'Experience', icon: <FileText size={18} /> },
        { id: 'media', label: 'Media Library', icon: <Image size={18} /> },
        { id: 'seo', label: 'SEO', icon: <Globe size={18} /> },
        { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardOverview onNavigate={setActiveTab} />;
            case 'hero': return <HeroEditor />;
            case 'about': return <AboutEditor />;
            case 'skills': return <SkillsManager />;
            case 'projects': return <ProjectsManager />;
            case 'experience': return <ExperienceManager />;
            case 'media': return <MediaManager />;
            case 'seo': return <SeoManager />;
            case 'contact': return <ContactEditor />;
            case 'settings': return <SettingsManager />;
            default: return <DashboardOverview onNavigate={setActiveTab} />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-surface-variant bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                                ⚡
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-on-background">Portfolio CMS</h1>
                                <p className="text-xs text-secondary">v2.0 • Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="/"
                                target="_blank"
                                className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(100,255,218,0.1)]"
                            >
                                <span>View Live Site</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-full border border-surface-variant bg-surface/50 px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                                title="Logout"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <aside className="relative">
                        <div className="sticky top-24 space-y-6">
                            <div className="overflow-hidden rounded-xl border border-surface-variant bg-surface/50 p-4 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                                <h2 className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-secondary/80">
                                    Navigation
                                </h2>
                                <nav className="space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            title={tab.label}
                                            className={`group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all duration-200 ${activeTab === tab.id
                                                ? 'text-primary font-semibold'
                                                : 'text-secondary hover:text-on-background hover:bg-surface-variant/50'
                                                }`}
                                        >
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-lg border-2 border-primary bg-primary/5"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10 text-lg transition-transform group-hover:scale-110">{tab.icon}</span>
                                            <span className="relative z-10">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* User Profile */}
                            <div className="rounded-xl border border-surface-variant bg-surface/50 p-4 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-sm font-bold text-white shadow-lg">
                                        AD
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="truncate text-sm font-bold text-on-background">Admin User</h3>
                                        <p className="truncate text-xs text-secondary">admin@sazzad.dev</p>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="rounded-xl border border-surface-variant bg-surface/30 p-4 text-center backdrop-blur-sm">
                                <p className="text-xs text-secondary">
                                    Last login: {new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="rounded-xl border border-surface-variant bg-surface/50 p-8 shadow-xl backdrop-blur-sm"
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
