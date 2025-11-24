'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, User } from 'lucide-react';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                onLogin();
            } else {
                setError('Invalid credentials. Please try again.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-surface-variant bg-surface/50 shadow-2xl backdrop-blur-xl"
            >
                <div className="bg-primary/5 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                        ⚡
                    </div>
                    <h1 className="text-2xl font-bold text-on-background">Welcome Back</h1>
                    <p className="text-sm text-secondary">Enter your credentials to access the dashboard</p>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 pl-10 pr-4 py-3 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="admin"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 pl-10 pr-4 py-3 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !username || !password}
                            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-background transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                            ) : (
                                <>
                                    Access Dashboard
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="border-t border-surface-variant bg-surface/30 p-4 text-center">
                    <p className="text-xs text-secondary">
                        Protected Area • Authorized Personnel Only
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
