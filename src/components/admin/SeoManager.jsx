'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentManager from '@/lib/contentManager';
import { Search, Globe, Save, Check } from 'lucide-react';

export default function SeoManager() {
    const [seoData, setSeoData] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        linkedin: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Initial load
        setSeoData(contentManager.getSeo());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            setSeoData(content.seo || {
                title: '',
                description: '',
                keywords: '',
                author: '',
                linkedin: ''
            });
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeoData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        contentManager.updateSeo(seoData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">SEO Manager</h2>
                    <p className="text-sm text-secondary">Optimize your portfolio for search engines</p>
                </div>
                <button
                    onClick={handleSave}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-6 py-2 font-semibold text-background transition-all hover:bg-primary/90"
                >
                    {saved ? <Check size={18} /> : <Save size={18} />}
                    <span className="relative z-10">{saved ? 'Saved!' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Editor */}
                <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                        Meta Tags
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Page Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={seoData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="e.g., John Doe - Frontend Developer"
                            />
                            <p className="mt-1 text-xs text-secondary">
                                Recommended length: 50-60 characters
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Meta Description
                            </label>
                            <textarea
                                name="description"
                                value={seoData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="A brief summary of your portfolio..."
                            />
                            <p className="mt-1 text-xs text-secondary">
                                Recommended length: 150-160 characters
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Keywords
                            </label>
                            <input
                                type="text"
                                name="keywords"
                                value={seoData.keywords}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="e.g., developer, react, portfolio"
                            />
                            <p className="mt-1 text-xs text-secondary">
                                Separate keywords with commas
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    Author Name
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={seoData.author}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={seoData.linkedin}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary">
                            <Globe size={16} />
                            Search Preview
                        </h3>

                        {/* Google Search Result Card */}
                        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-[#202124]">
                            <div className="mb-1 flex items-center gap-2 text-sm text-[#202124] dark:text-[#bdc1c6]">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs dark:bg-gray-700">
                                    🌐
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-[#202124] dark:text-[#bdc1c6]">your-portfolio.com</span>
                                    <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">https://your-portfolio.com</span>
                                </div>
                            </div>
                            <h3 className="mb-1 truncate text-xl text-[#1a0dab] hover:underline dark:text-[#8ab4f8]">
                                {seoData.title || 'Your Portfolio Title'}
                            </h3>
                            <p className="line-clamp-2 text-sm text-[#4d5156] dark:text-[#bdc1c6]">
                                {seoData.description || 'This is how your portfolio description will appear in search results. Make it catchy and relevant to attract visitors.'}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div className="flex gap-3">
                            <span className="text-xl">💡</span>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-on-background">Why SEO matters?</p>
                                <p className="text-xs text-secondary">
                                    Good SEO helps recruiters and clients find your portfolio. Use relevant keywords and a clear description of your skills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
