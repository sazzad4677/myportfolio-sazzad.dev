'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function DashboardOverview({ onNavigate }) {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        experience: 0,
        lastUpdated: new Date().toLocaleDateString()
    });

    useEffect(() => {
        const updateStats = (content) => {
            setStats({
                projects: (content.projects || []).length,
                skills: (content.skills || []).length,
                experience: (content.experience || []).length,
                lastUpdated: new Date().toLocaleDateString()
            });
        };

        // Initial load
        updateStats(contentManager.getAllContent());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe(updateStats);

        return () => unsubscribe();
    }, []);

    const cards = [
        {
            title: 'Total Projects',
            value: stats.projects,
            icon: '💼',
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20',
            action: 'projects',
            actionLabel: 'Manage Projects'
        },
        {
            title: 'Skills Listed',
            value: stats.skills,
            icon: '⚡',
            color: 'text-yellow-400',
            bg: 'bg-yellow-400/10',
            border: 'border-yellow-400/20',
            action: 'skills',
            actionLabel: 'Update Skills'
        },
        {
            title: 'Experience',
            value: stats.experience,
            icon: '🎯',
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            border: 'border-green-400/20',
            action: 'experience',
            actionLabel: 'Edit Experience'
        }
    ];

    const quickActions = [
        { label: 'Update Hero Section', icon: '🏠', tab: 'hero' },
        { label: 'Edit About Me', icon: '👤', tab: 'about' },
        { label: 'Update Contact Info', icon: '📧', tab: 'contact' },
        { label: 'Backup Data', icon: '💾', tab: 'data' }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-on-background">Welcome back, Sazzad! 👋</h2>
                    <p className="mt-2 text-lg text-secondary">
                        Here's what's happening with your portfolio today.
                    </p>
                </div>
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl border ${card.border} ${card.bg} p-6 backdrop-blur-sm transition-transform hover:-translate-y-1`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-secondary">{card.title}</p>
                                <h3 className="mt-2 text-3xl font-bold text-on-background">{card.value}</h3>
                            </div>
                            <span className={`rounded-lg p-2 text-2xl ${card.bg} ${card.color}`}>
                                {card.icon}
                            </span>
                        </div>
                        <button
                            onClick={() => onNavigate(card.action)}
                            className={`mt-4 text-sm font-medium ${card.color} hover:underline`}
                        >
                            {card.actionLabel} →
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="mb-4 text-xl font-bold text-on-background">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickActions.map((action, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate(action.tab)}
                            className="flex items-center gap-3 rounded-xl border border-surface-variant bg-surface p-4 text-left transition-colors hover:border-primary/50 hover:bg-surface-variant/50"
                        >
                            <span className="rounded-lg bg-surface-variant p-2 text-xl">
                                {action.icon}
                            </span>
                            <span className="font-medium text-on-background">
                                {action.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}
