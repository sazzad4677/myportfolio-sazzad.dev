'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function HeroEditor() {
    const [formData, setFormData] = useState({
        greeting: '',
        name: '',
        tagline: '',
        description: '',
        ctaText: '',
        ctaLink: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const heroData = contentManager.getHero();
        setFormData(heroData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        contentManager.updateHero(formData);
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
                    <h2 className="text-2xl font-bold text-on-background">Hero Section</h2>
                    <p className="text-sm text-secondary">Edit the main landing section of your portfolio</p>
                </div>
                <button
                    onClick={handleSave}
                    className="group relative overflow-hidden rounded-lg bg-transparent px-6 py-2 font-semibold tracking-wide text-primary border-2 border-primary transition-all hover:bg-primary/10"
                >
                    <span className="relative z-10">{saved ? '✓ Saved!' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Edit Form */}
                <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                        Edit Content
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Greeting
                            </label>
                            <input
                                type="text"
                                name="greeting"
                                value={formData.greeting}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Hi, my name is"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Tagline
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="I build things for the web."
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="A brief description about yourself..."
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    CTA Button Text
                                </label>
                                <input
                                    type="text"
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Get In Touch"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    CTA Link
                                </label>
                                <input
                                    type="text"
                                    name="ctaLink"
                                    value={formData.ctaLink}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="mailto:your@email.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                            Live Preview
                        </h3>
                        <div className="rounded-lg border border-primary/10 bg-background p-8 shadow-lg">
                            <div className="space-y-5">
                                <p className="font-mono text-sm text-primary">{formData.greeting || 'Hi, my name is'}</p>
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold text-on-background sm:text-5xl">
                                        {formData.name || 'John Doe'}
                                    </h1>
                                    <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
                                        {formData.tagline || 'I build things for the web.'}
                                    </h2>
                                </div>
                                <p className="max-w-lg text-lg text-secondary">
                                    {formData.description || 'A brief description about yourself...'}
                                </p>
                                <div className="pt-4">
                                    <button className="rounded-md border-2 border-primary px-6 py-3 font-mono text-sm text-primary transition-colors hover:bg-primary/10">
                                        {formData.ctaText || 'Get In Touch'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                        <div className="flex gap-3">
                            <span className="text-xl">💡</span>
                            <p className="text-sm text-secondary">
                                <strong className="text-on-background">Pro Tip:</strong> Keep your tagline punchy and your description focused on value. This is the first thing visitors see!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
